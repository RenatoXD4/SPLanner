import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { AuthService } from '../../../services/auth-service';
import { InvitationEmailService } from './invitation-email.service';
export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

export interface Proyecto {
  id?: string;
  nombre: string;
  descripcion?: string;
  creadoPorId: string;
  createdAt?: string;
  miembrosCount?: number;
}

export interface ProyectoConUsuario extends Proyecto {
  creadoPor?: Usuario;
  _count?: {
    miembros: number;
  };
}

// Interface para la respuesta del backend de miembros
interface MiembroBackend {
  id: number;
  proyectoId: string;
  rolId: number;
  usuarioId: string;
  rol: {
    id: number;
    nombre: string;
  };
  usuario: Usuario;
}

interface ApiResponse<T> {
  data?: T;
  message: string;
  success: boolean;
}

interface CreateProjectRequest {
  nombre: string;
  descripcion?: string;
  creadoPorId: string;
}

interface UpdateProjectRequest {
  nombre?: string;
  descripcion?: string;
  userId?: string;
}

interface DeleteProjectRequest {
  userId: string;
}

interface InvitarMiembroRequest {
  proyectoId: string;
  usuarioId: string;
  rolId: number;
}

// Interface para miembros del proyecto en el frontend
export interface MiembroProyecto {
  id: number;
  usuarioId: string;
  proyectoId: string;
  rolId: number;
  rol?: {
    id: number;
    nombre: string;
  };
  usuario?: Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class VistasService {
  private apiUrl = 'http://localhost:9001/api-v1/projects';
  private usuariosUrl = 'http://localhost:9001/api-v1/users';
  private miembrosUrl = 'http://localhost:9001/api-v1/members';

  private proyectosSubject = new BehaviorSubject<ProyectoConUsuario[]>([]);
  proyectos$ = this.proyectosSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private invitationEmailService: InvitationEmailService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }

  getProyectos(): Observable<ProyectoConUsuario[]> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) throw new Error('Usuario no autenticado');

    const params = new HttpParams().set('userId', userId);

    return this.http.get<any[]>(this.apiUrl, {
      headers: this.getHeaders(),
      params
    }).pipe(
      map(proyectos => proyectos.map(proyecto => ({
        id: proyecto.id,
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        creadoPorId: proyecto.creadoPorId,
        createdAt: proyecto.createdAt,
        creadoPor: proyecto.creadoPor,
        miembrosCount: proyecto.miembrosCount || proyecto._count?.miembros || 0,
        _count: proyecto._count
      }))),
      tap((proyectos) => {
        console.log(' Proyectos recibidos con miembrosCount:', proyectos.map(p => ({
          nombre: p.nombre,
          miembrosCount: p.miembrosCount,
          tieneCountBackend: !!p._count
        })));
        this.proyectosSubject.next(proyectos);
      })
    );
  }

  crearProyecto(data: CreateProjectRequest): Observable<ProyectoConUsuario> {
    return this.http.post<ProyectoConUsuario>(this.apiUrl, data, {
      headers: this.getHeaders()
    }).pipe(
      tap((nuevoProyecto) => {
        const actual = this.proyectosSubject.value;
        this.proyectosSubject.next([...actual, nuevoProyecto]);
      })
    );
  }

  editarProyecto(id: string, data: Partial<Proyecto>): Observable<ProyectoConUsuario> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) throw new Error('Usuario no autenticado');

    const updateData: UpdateProjectRequest = { ...data, userId };

    return this.http.patch<ProyectoConUsuario>(`${this.apiUrl}/${id}`, updateData, {
      headers: this.getHeaders()
    }).pipe(
      tap((proyectoEditado) => {
        const actualizados = this.proyectosSubject.value.map(p =>
          p.id === proyectoEditado.id ? proyectoEditado : p
        );
        this.proyectosSubject.next(actualizados);
      })
    );
  }

  eliminarProyecto(id: string): Observable<void> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) throw new Error('Usuario no autenticado');

    const deleteData: DeleteProjectRequest = { userId };

    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
      body: deleteData
    }).pipe(
      tap(() => {
        const restantes = this.proyectosSubject.value.filter(p => p.id !== id);
        this.proyectosSubject.next(restantes);
      })
    );
  }

  // === MÉTODOS PARA INVITAR MIEMBROS ===

  /**
   * Busca un usuario por su correo electrónico
   * @param email Correo electrónico del usuario a buscar
   * @returns Observable con los datos del usuario encontrado
   */
  buscarUsuarioPorEmail(email: string): Observable<Usuario> {
    const params = new HttpParams().set('email', email);

    return this.http.get<ApiResponse<Usuario>>(`${this.usuariosUrl}/search`, {
      headers: this.getHeaders(),
      params
    }).pipe(
      map(response => {
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Usuario no encontrado');
        }
        return response.data;
      })
    );
  }

  /**
   * Invita a un usuario a un proyecto con un rol específico
   * @param proyectoId ID del proyecto
   * @param usuarioId ID del usuario a invitar
   * @param rolId ID del rol (1: Admin, 2: Miembro)
   * @returns Observable con la respuesta de la invitación
   */
  async invitarUsuarioAProyecto(
    proyectoId: string,
    usuarioId: string,
    rolId: number,
    proyectoNombre?: string,
    usuarioInvitadoEmail?: string
  ): Promise<any> {

    const invitacionData: InvitarMiembroRequest = {
      proyectoId,
      usuarioId,
      rolId
    };

    try {
      // 1. Primero hacer la invitación en la base de datos
      const resultado = await this.http.post(`${this.miembrosUrl}/invitar`, invitacionData, {
        headers: this.getHeaders()
      }).toPromise();

      // 2. Si tenemos la información necesaria, enviar el correo
      if (usuarioInvitadoEmail && proyectoNombre) {
        const usuarioActual = this.authService.getCurrentUser();
        const nombreRol = this.obtenerNombreRol(rolId);

        this.enviarCorreoInvitacion(
          usuarioInvitadoEmail,
          proyectoNombre,
          usuarioActual?.nombre || 'Un usuario',
          nombreRol
        );
      }

      return resultado;

    } catch (error) {
      console.error('Error en invitarUsuarioAProyecto:', error);
      throw error;
    }
  }

  /**
   * Envía el correo de invitación (manejo asíncrono sin await)
   */
  private enviarCorreoInvitacion(
    email: string,
    proyectoNombre: string,
    inviterName: string,
    roleName: string
  ): void {
    this.invitationEmailService.sendSimpleInvitation(
      email,
      proyectoNombre,
      inviterName,
      roleName
    ).then(result => {
      if (result.success) {
        console.log('Correo de invitación enviado exitosamente');
      } else {
        console.warn('Correo de invitación no pudo enviarse:', result.message);
      }
    }).catch(error => {
      console.error('Error enviando correo de invitación:', error);
    });
  }

  /**
   * Obtiene el nombre del rol basado en el ID
   */
  private obtenerNombreRol(rolId: number): string {
    switch (rolId) {
      case 1: return 'Administrador';
      case 2: return 'Editor';
      case 3: return 'Visualizador';
      default: return 'Miembro';
    }
  }

  /**
   * Obtiene los miembros de un proyecto específico
   * @param proyectoId ID del proyecto
   * @returns Observable con la lista de miembros
   */
  obtenerMiembrosProyecto(proyectoId: string): Observable<MiembroProyecto[]> {
    return this.http.get<ApiResponse<MiembroBackend[]>>(`${this.miembrosUrl}/proyecto/${proyectoId}`, {
      headers: this.getHeaders()
    }).pipe(
      map(response => {
        if (!response.success || !response.data) {
          throw new Error(response.message || 'Error al obtener miembros');
        }

        // Mapear la respuesta del backend al formato del frontend
        return response.data.map(miembro => ({
          id: miembro.id,
          usuarioId: miembro.usuarioId,
          proyectoId: miembro.proyectoId,
          rolId: miembro.rolId,
          rol: miembro.rol,
          usuario: miembro.usuario
        }));
      })
    );
  }

  /**
   * Actualiza el rol de un miembro
   * @param miembroId ID del miembro
   * @param nuevoRolId Nuevo ID del rol
   * @returns Observable con la respuesta
   */
  actualizarRolMiembro(miembroId: number, nuevoRolId: number): Observable<any> {
  // Validar que los parámetros sean números válidos
  if (typeof miembroId !== 'number' || isNaN(miembroId) || miembroId <= 0) {
    throw new Error('miembroId debe ser un número válido');
  }

  if (typeof nuevoRolId !== 'number' || isNaN(nuevoRolId) || nuevoRolId <= 0) {
    throw new Error('nuevoRolId debe ser un número válido');
  }


  return this.http.patch<ApiResponse<any>>(
    `${this.miembrosUrl}/rol/${miembroId.toString()}`,
    { rolId: nuevoRolId },
    { headers: this.getHeaders() }
  ).pipe(
    map(response => {
      if (!response.success) {
        throw new Error(response.message || 'Error al actualizar el rol');
      }
      return response;
    })
  );
}

  /**
   * Elimina a un miembro de un proyecto
   * @param proyectoId ID del proyecto
   * @param usuarioId ID del usuario a eliminar
   * @returns Observable con la respuesta
   */
  eliminarMiembroProyecto(proyectoId: string, usuarioId: string): Observable<void> {
    const params = new HttpParams()
      .set('proyectoId', proyectoId)
      .set('usuarioId', usuarioId);

    return this.http.delete<ApiResponse<void>>(`${this.miembrosUrl}/eliminar`, {
      headers: this.getHeaders(),
      params
    }).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.message || 'Error al eliminar miembro');
        }
        // No retornamos datos, solo confirmación
      })
    );
  }

  /**
   * Actualiza el contador de miembros para un proyecto específico
   * Esto se puede usar para mantener actualizado el contador en la UI
   * @param proyectoId ID del proyecto
   * @param nuevoCount Nuevo número de miembros
   */
  actualizarContadorMiembros(proyectoId: string, nuevoCount: number): void {
    const proyectosActualizados = this.proyectosSubject.value.map(proyecto => {
      if (proyecto.id === proyectoId) {
        return {
          ...proyecto,
          miembrosCount: nuevoCount
        };
      }
      return proyecto;
    });

    this.proyectosSubject.next(proyectosActualizados);
  }

  get proyectosActuales(): ProyectoConUsuario[] {
    return this.proyectosSubject.value;
  }

  // Método para forzar actualización desde el componente si es necesario
  actualizarProyectosManualmente(proyectos: ProyectoConUsuario[]): void {
    this.proyectosSubject.next(proyectos);
  }



/**
 * Obtiene los proyectos donde el usuario es miembro (no necesariamente el creador)
 * @param usuarioId ID del usuario
 * @returns Observable con la lista de proyectos donde el usuario es miembro
 */

obtenerProyectosComoMiembro(usuarioId: string): Observable<ProyectoConUsuario[]> {
  const params = new HttpParams().set('userId', usuarioId);

  return this.http.get<any[]>(`${this.apiUrl}/member`, {
    headers: this.getHeaders(),
    params
  }).pipe(
    map(proyectos => proyectos.map(proyecto => ({
      id: proyecto.id,
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      creadoPorId: proyecto.creadoPorId,
      createdAt: proyecto.createdAt,
      creadoPor: proyecto.creadoPor,
      miembrosCount: proyecto.miembrosCount || proyecto._count?.miembros || 0,
      _count: proyecto._count
    })))
  );
}


/**
 * Obtiene los proyectos donde el usuario es miembro pero NO el creador
 * @param usuarioId ID del usuario
 * @returns Observable con la lista de proyectos donde el usuario es miembro pero no creador
 */
obtenerProyectosComoMiembroNoCreador(usuarioId: string): Observable<ProyectoConUsuario[]> {
  const params = new HttpParams().set('userId', usuarioId);

  return this.http.get<any[]>(`${this.apiUrl}/member`, {
    headers: this.getHeaders(),
    params
  }).pipe(
    map(proyectos => proyectos
      .filter(proyecto => proyecto.creadoPorId !== usuarioId)
      .map(proyecto => ({
        id: proyecto.id,
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        creadoPorId: proyecto.creadoPorId,
        createdAt: proyecto.createdAt,
        creadoPor: proyecto.creadoPor,
        miembrosCount: proyecto.miembrosCount || proyecto._count?.miembros || 0,
        _count: proyecto._count
      }))
    ),
    tap(proyectosFiltrados => {
      console.log('Proyectos como miembro (excluyendo creados):', proyectosFiltrados.length);
    })
  );
}
}
