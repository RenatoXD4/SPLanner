// frontend/src/app/core/services/notificacion/tarea.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap } from 'rxjs';
import { NotificacionIntegrationService } from './notificacion-integration.service';

export interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string;
  fechaLimite?: string;
  posicion: number;
  estadoId: number;
  estado: EstadoTarea;
  proyectoId: string;
  proyecto: ProyectoTarea;
  responsables: ResponsableTarea[];
  comentarios: ComentarioTarea[];
  createdAt: string;
}

export interface ProyectoTarea {
  id: string;
  nombre: string;
  descripcion: string;
  miembros: MiembroProyectoTarea[];
}

export interface MiembroProyectoTarea {
  id: string;
  usuarioId: string;
  usuario: UsuarioTarea;
}

export interface UsuarioTarea {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

export interface ResponsableTarea {
  id: string;
  usuarioId: string;
  usuario: UsuarioTarea;
  tareaId: string;
}

export interface ComentarioTarea {
  id: number;
  contenido: string;
  usuarioId: string;
  autor: UsuarioTarea;
  createdAt: string;
}

export interface EstadoTarea {
  id: number;
  nombre: string;
  posicion: number;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = 'http://localhost:9001/api-v1/kanban';

  constructor(
    private http: HttpClient,
    private notificacionIntegration: NotificacionIntegrationService
  ) {}

  // ✅ OBTENER TAREAS POR PROYECTO
  obtenerTareasPorProyecto(proyectoId: string): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.apiUrl}/proyecto/${proyectoId}`);
  }

  // ✅ OBTENER TAREA POR ID COMPLETA
  obtenerTareaPorId(tareaId: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.apiUrl}/${tareaId}`);
  }

  // ✅ CREAR TAREA CON NOTIFICACIÓN AUTOMÁTICA
  crearTarea(tareaData: {
    titulo: string;
    descripcion?: string;
    fechaLimite?: string;
    proyectoId: string;
    estadoId: number;
  }, usuarioActual: UsuarioTarea): Observable<any> {
    return this.http.post<any>(this.apiUrl, tareaData).pipe(
      switchMap((nuevaTarea: any) => {
        return this.obtenerProyectoCompleto(nuevaTarea.proyectoId).pipe(
          tap((proyecto: ProyectoTarea) => {
            const idsMiembros = proyecto.miembros.map(miembro => miembro.usuarioId);
            
            // ✅ NOTIFICAR A OTROS MIEMBROS (excluir al creador)
            const usuariosANotificar = idsMiembros.filter(id => id !== usuarioActual.id);
            
            if (usuariosANotificar.length > 0) {
              this.notificacionIntegration.onTareaCreada(
                nuevaTarea.id,
                nuevaTarea.titulo,
                proyecto.id,
                proyecto.nombre,
                usuarioActual.id,
                `${usuarioActual.nombre} ${usuarioActual.apellido}`,
                usuariosANotificar
              ).subscribe({
                next: () => console.log(`🔔 Notificaciones de creación enviadas a ${usuariosANotificar.length} miembros`),
                error: (error: any) => console.error('Error enviando notificaciones:', error)
              });
            }
          })
        );
      })
    );
  }

  // ✅ EDITAR TAREA CON NOTIFICACIÓN AUTOMÁTICA
  editarTarea(tareaId: string, datos: {
    titulo?: string;
    descripcion?: string;
    fechaLimite?: string;
  }, usuarioActual: UsuarioTarea): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${tareaId}`, datos).pipe(
      switchMap((tareaActualizada: any) => {
        return this.obtenerTareaCompleta(tareaId).pipe(
          tap((tareaCompleta: Tarea) => {
            // ✅ USUARIOS A NOTIFICAR: responsables + miembros del proyecto
            const idsResponsables = tareaCompleta.responsables.map(r => r.usuarioId);
            const idsMiembros = tareaCompleta.proyecto.miembros.map(m => m.usuarioId);
            const usuariosANotificar = [...new Set([...idsResponsables, ...idsMiembros])];
            
            // ✅ FILTRAR: Excluir al editor
            const usuariosFiltrados = usuariosANotificar.filter(id => id !== usuarioActual.id);
            
            if (usuariosFiltrados.length > 0) {
              this.notificacionIntegration.onTareaEditada(
                tareaId,
                tareaActualizada.titulo,
                tareaCompleta.proyecto.nombre,
                usuarioActual.id,
                `${usuarioActual.nombre} ${usuarioActual.apellido}`,
                usuariosFiltrados
              ).subscribe({
                next: () => console.log(`🔔 Notificaciones de edición enviadas a ${usuariosFiltrados.length} usuarios`),
                error: (error: any) => console.error('Error enviando notificaciones:', error)
              });
            }
          })
        );
      })
    );
  }

  // ✅ CAMBIAR ESTADO CON NOTIFICACIÓN AUTOMÁTICA
  cambiarEstadoTarea(tareaId: string, nuevoEstadoId: number, usuarioActual: UsuarioTarea): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${tareaId}/estado`, { estadoId: nuevoEstadoId }).pipe(
      switchMap((tareaActualizada: any) => {
        return this.obtenerTareaCompleta(tareaId).pipe(
          tap((tareaCompleta: Tarea) => {
            const nombreEstado = tareaActualizada.estado?.nombre || `Estado ${nuevoEstadoId}`;
            
            // ✅ USUARIOS A NOTIFICAR: responsables + miembros del proyecto
            const idsResponsables = tareaCompleta.responsables.map(r => r.usuarioId);
            const idsMiembros = tareaCompleta.proyecto.miembros.map(m => m.usuarioId);
            const usuariosANotificar = [...new Set([...idsResponsables, ...idsMiembros])];
            
            // ✅ FILTRAR: Excluir al que cambió el estado
            const usuariosFiltrados = usuariosANotificar.filter(id => id !== usuarioActual.id);
            
            if (usuariosFiltrados.length > 0) {
              this.notificacionIntegration.onEstadoCambiado(
                tareaId,
                tareaCompleta.titulo,
                tareaCompleta.proyecto.nombre,
                nombreEstado,
                usuarioActual.id,
                `${usuarioActual.nombre} ${usuarioActual.apellido}`,
                usuariosFiltrados
              ).subscribe({
                next: () => console.log(`🔔 Notificaciones de cambio de estado enviadas a ${usuariosFiltrados.length} usuarios`),
                error: (error: any) => console.error('Error enviando notificaciones:', error)
              });
            }
          })
        );
      })
    );
  }

  // ✅ ASIGNAR RESPONSABLE CON NOTIFICACIÓN AUTOMÁTICA
  asignarResponsable(tareaId: string, usuarioId: string, usuarioActual: UsuarioTarea): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${tareaId}/responsables`, { usuarioId }).pipe(
      switchMap(() => {
        return this.obtenerTareaCompleta(tareaId).pipe(
          tap((tareaCompleta: Tarea) => {
            // ✅ NOTIFICAR SOLO AL USUARIO ASIGNADO (si es diferente)
            if (usuarioId !== usuarioActual.id) {
              this.notificacionIntegration.onTareaAsignada(
                tareaId,
                tareaCompleta.titulo,
                tareaCompleta.proyecto.nombre,
                usuarioId,
                usuarioActual.id,
                `${usuarioActual.nombre} ${usuarioActual.apellido}`
              ).subscribe({
                next: () => console.log(`🔔 Notificación de asignación enviada a ${usuarioId}`),
                error: (error: any) => console.error('Error enviando notificación:', error)
              });
            }
          })
        );
      })
    );
  }

  // ✅ ELIMINAR TAREA CON NOTIFICACIÓN AUTOMÁTICA
  eliminarTarea(tareaId: string, usuarioActual: UsuarioTarea): Observable<any> {
    return this.obtenerTareaCompleta(tareaId).pipe(
      switchMap((tareaCompleta: Tarea) => {
        // ✅ USUARIOS A NOTIFICAR: responsables + miembros del proyecto
        const idsResponsables = tareaCompleta.responsables.map(r => r.usuarioId);
        const idsMiembros = tareaCompleta.proyecto.miembros.map(m => m.usuarioId);
        const usuariosANotificar = [...new Set([...idsResponsables, ...idsMiembros])];
        
        // ✅ FILTRAR: Excluir al que elimina
        const usuariosFiltrados = usuariosANotificar.filter(id => id !== usuarioActual.id);
        
        return this.http.delete<any>(`${this.apiUrl}/${tareaId}`).pipe(
          tap(() => {
            if (usuariosFiltrados.length > 0) {
              this.notificacionIntegration.onTareaEliminada(
                tareaCompleta.titulo,
                tareaCompleta.proyecto.nombre,
                usuarioActual.id,
                `${usuarioActual.nombre} ${usuarioActual.apellido}`,
                usuariosFiltrados
              ).subscribe({
                next: () => console.log(`🔔 Notificaciones de eliminación enviadas a ${usuariosFiltrados.length} usuarios`),
                error: (error: any) => console.error('Error enviando notificaciones:', error)
              });
            }
          })
        );
      })
    );
  }

  // ✅ MÉTODOS AUXILIARES
  private obtenerProyectoCompleto(proyectoId: string): Observable<ProyectoTarea> {
    return this.http.get<ProyectoTarea>(`http://localhost:9001/api-v1/projects/${proyectoId}`);
  }

  private obtenerTareaCompleta(tareaId: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.apiUrl}/${tareaId}`);
  }

  // ✅ OBTENER ESTADOS DISPONIBLES
  obtenerEstados(proyectoId: string): Observable<EstadoTarea[]> {
    return this.http.get<EstadoTarea[]>(`${this.apiUrl}/proyecto/${proyectoId}/estados`);
  }

  // ✅ REMOVER RESPONSABLE
  removerResponsable(tareaId: string, usuarioId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${tareaId}/responsables/${usuarioId}`);
  }
}