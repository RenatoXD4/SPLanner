import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  ChangeDetectorRef,
  inject,
  PLATFORM_ID,
  Inject,
  OnDestroy
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Sidebar } from '../../../shared/ui/sidebar/sidebar';
import { VistasService, ProyectoConUsuario } from '../service/vista-service';
import { AuthService } from '../../../services/auth-service';
import { Subscription } from 'rxjs';
import { ProyectoGuard } from '../../../../guards/proyecto.guard';

interface ProyectoMiembro extends ProyectoConUsuario {
  miRol?: string;
  updatedAt?: string;
}

@Component({
  selector: 'app-miembros',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, Sidebar],
  templateUrl: './miembros.html',
  styleUrls: ['./miembros.css'],
  providers: [VistasService]
})
export class Miembros implements OnInit, OnDestroy {

  mostrarSidebar = true;
  filtroTexto = '';
  filtroRol = '';
  proyectos: ProyectoMiembro[] = [];
  proyectosFiltrados: ProyectoMiembro[] = [];
  usuarioLogeado: any = null;
  private isBrowser: boolean;
  cargando = true;
  private proyectosSubscription?: Subscription;

  // Estados para modales
  detallesAbierto = false;
  proyectoDetalles: ProyectoMiembro | null = null;

  // Almacenar información de roles por proyecto
  private rolesPorProyecto: Map<string, string> = new Map();

  @ViewChild('mensajeContainer', { read: ViewContainerRef }) mensajeContainer!: ViewContainerRef;
  @ViewChild('mensajeTemplate', { read: TemplateRef }) mensajeTemplate!: TemplateRef<any>;
  @ViewChild('detallesContainer', { read: ViewContainerRef }) detallesContainer!: ViewContainerRef;
  @ViewChild('detallesTemplate', { read: TemplateRef }) detallesTemplate!: TemplateRef<any>;

  private vistasService = inject(VistasService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  private proyectoGuard = inject(ProyectoGuard);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.inicializarComponente();
    }
  }

  ngOnDestroy(): void {
    if (this.proyectosSubscription) {
      this.proyectosSubscription.unsubscribe();
    }
  }
private cargarRolesDesdeLocalStorage(): void {
  if (!this.isBrowser) return;

  const rolesCache = this.obtenerRolesDeLocalStorage();

  rolesCache.forEach((rol, proyectoId) => {
    this.rolesPorProyecto.set(proyectoId, rol);

    // Actualizar los proyectos que ya están cargados
    const proyectoIndex = this.proyectos.findIndex(p => p.id === proyectoId);
    if (proyectoIndex !== -1) {
      this.proyectos[proyectoIndex].miRol = rol;
    }
  });
}
  async inicializarComponente(): Promise<void> {
    try {
      await this.obtenerUsuarioLogeado();
      this.cargarRolesDesdeLocalStorage();
      await this.cargarProyectosComoMiembro();
      this.cargando = false;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error al inicializar componente:', error);
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  async obtenerUsuarioLogeado(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isBrowser) {
        resolve();
        return;
      }

      this.usuarioLogeado = this.authService.getCurrentUser();
      resolve();
    });
  }

  async cargarProyectosComoMiembro(): Promise<void> {
  try {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      throw new Error('Usuario no autenticado');
    }

    const proyectos = await this.vistasService.obtenerProyectosComoMiembroNoCreador(userId).toPromise();

    this.proyectos = (proyectos || []).map(proyecto => ({
      ...proyecto,
      miRol: 'Visualizador' // Valor temporal hasta que carguemos el rol real
    }));

    // Cargar los roles para cada proyecto
    await this.cargarRolesParaProyectos();

    this.actualizarProyectosFiltrados();

  } catch (error) {
    console.error('Error al cargar proyectos como miembro:', error);
    this.mostrarMensaje('Error al cargar proyectos');
  }
}

  private async cargarRolesParaProyectos(): Promise<void> {
    const promises = this.proyectos.map(async (proyecto) => {
      if (proyecto.id) {
        await this.cargarRolUsuarioEnProyecto(proyecto.id);
      }
    });

    await Promise.all(promises);
  }

  obtenerRolProyecto(proyectoId: string | undefined): string {
  if (!proyectoId) {
    return 'Visualizador';
  }

  // Primero verificar en localStorage (caché)
  const rolCache = this.obtenerRolDeLocalStorage(proyectoId);
  if (rolCache) {
    return rolCache;
  }

  // Si no está en caché, verificar en el mapa local
  if (this.rolesPorProyecto.has(proyectoId)) {
    const rol = this.rolesPorProyecto.get(proyectoId)!;
    // Guardar en localStorage para futuras consultas
    this.guardarRolEnLocalStorage(proyectoId, rol);
    return rol;
  }

  // Si no está en ningún lado, cargar del servidor
  this.cargarRolUsuarioEnProyecto(proyectoId);
  return 'Visualizador';
}

  private async cargarRolUsuarioEnProyecto(proyectoId: string): Promise<void> {
  try {
    const miembros = await this.vistasService.obtenerMiembrosProyecto(proyectoId).toPromise();
    const userId = this.authService.getCurrentUserId();

    const miembro = miembros?.find(m => m.usuarioId === userId);
    if (miembro) {
      const nombreRol = this.obtenerNombreRol(miembro.rolId);

      // Actualizar el mapa local
      this.rolesPorProyecto.set(proyectoId, nombreRol);

      // Guardar en localStorage
      this.guardarRolEnLocalStorage(proyectoId, nombreRol);

      // Actualizar el proyecto con el rol
      const proyectoIndex = this.proyectos.findIndex(p => p.id === proyectoId);
      if (proyectoIndex !== -1) {
        this.proyectos[proyectoIndex].miRol = nombreRol;
        this.actualizarProyectosFiltrados();
      }
    }
  } catch (error) {
    console.error('Error al cargar rol del usuario:', error);
  }
}

  private obtenerNombreRol(rolId: number): string {
    switch (rolId) {
      case 1: return 'Administrador';
      case 2: return 'Editor';
      case 3: return 'Visualizador';
      default: return 'Visualizador';
    }
  }

  // NUEVAS FUNCIONALIDADES

  /**
   * Actualiza la lista de proyectos filtrados según texto y rol
   */
  actualizarProyectosFiltrados(): void {
    const texto = this.filtroTexto.trim().toLowerCase();
    const rol = this.filtroRol.trim();

    this.proyectosFiltrados = this.proyectos.filter(p => {
      const coincideTexto = !texto || p.nombre.toLowerCase().includes(texto);
      const coincideRol = !rol || this.obtenerRolProyecto(p.id) === rol;

      return coincideTexto && coincideRol;
    });

    this.cdr.detectChanges();
  }

  onFiltroChange(): void {
    this.actualizarProyectosFiltrados();
  }

  /**
   * Cuenta proyectos por rol para las estadísticas
   */
 contarProyectosPorRol(rol: string): number {
  return this.proyectos.filter(p => {
    // Asegurarnos de que el usuario no sea el creador
    const esCreador = p.creadoPorId === this.authService.getCurrentUserId();
    return !esCreador && this.obtenerRolProyecto(p.id) === rol;
  }).length;
}

  /**
   * Abre el modal de detalles del proyecto
   */
  verDetallesProyecto(proyecto: ProyectoMiembro): void {
    this.proyectoDetalles = proyecto;
    this.detallesAbierto = true;

    // Renderizar el modal
    if (this.detallesContainer && this.detallesTemplate) {
      this.detallesContainer.clear();
      this.detallesContainer.createEmbeddedView(this.detallesTemplate);
      this.cdr.detectChanges();
    }
  }

  /**
   * Cierra el modal de detalles
   */
  cerrarDetalles(): void {
    this.detallesAbierto = false;
    this.proyectoDetalles = null;

    if (this.detallesContainer) {
      this.detallesContainer.clear();
      this.cdr.detectChanges();
    }
  }

  /**
   * Navega al board del proyecto
   */
  /**
 * Navega al board del proyecto guardando el rol primero
 */
async irAlBoard(proyectoId: string): Promise<void> {
  if (!this.isBrowser || !proyectoId || proyectoId === '') {
    console.error('ID de proyecto no válido');
    this.mostrarMensaje('Error: No se puede acceder al proyecto');
    return;
  }

  try {
    // Obtener el rol actual del usuario en este proyecto
    const rol = this.obtenerRolProyecto(proyectoId);

    // Guardar el rol en localStorage antes de redirigir
    this.guardarRolEnLocalStorage(proyectoId, rol);

    // También guardar el proyecto actual y rol en el servicio de guards
    this.proyectoGuard.setProyectoActual(proyectoId);

    // Guardar información adicional para usar en la siguiente página
    this.guardarInformacionProyectoActual(proyectoId, rol);

    // Redirigir al board
    this.router.navigate(['/board']);

  } catch (error) {
    console.error('Error al acceder al proyecto:', error);
    this.mostrarMensaje('Error al acceder al proyecto');
  }
}
/**
 * Guarda información completa del proyecto actual para usar en el board
 */
private guardarInformacionProyectoActual(proyectoId: string, rol: string): void {
  if (!this.isBrowser) return;

  try {
    const proyecto = this.proyectos.find(p => p.id === proyectoId);

    const proyectoInfo = {
      proyectoId: proyectoId,
      rol: rol,
      nombre: proyecto?.nombre || '',
      descripcion: proyecto?.descripcion || '',
      creadoPor: proyecto?.creadoPor?.nombre || 'Usuario',
      fechaAcceso: new Date().toISOString()
    };

    localStorage.setItem('proyectoActual', JSON.stringify(proyectoInfo));

    // También guardar solo el ID y rol por separado para fácil acceso
    localStorage.setItem('proyectoIdActual', proyectoId);
    localStorage.setItem('rolActual', rol);

  } catch (error) {
    console.error('Error al guardar información del proyecto:', error);
  }
}
  /**
   * Muestra un mensaje toast
   */
  mostrarMensaje(msg: string): void {
    if (!this.mensajeContainer || !this.mensajeTemplate) {
      console.warn('Contenedor de mensajes no disponible');
      return;
    }

    const view = this.mensajeContainer.createEmbeddedView(this.mensajeTemplate, { $implicit: msg });
    setTimeout(() => {
      if (view) {
        view.destroy();
        this.cdr.detectChanges();
      }
    }, 3000);
    this.cdr.detectChanges();
  }

  /**
   * Alterna la visibilidad del sidebar
   */
  toggleSidebar(): void {
    this.mostrarSidebar = !this.mostrarSidebar;
    this.cdr.detectChanges();
  }

  /**
   * Obtiene la inicial del usuario para avatares
   */
  obtenerInicialUsuario(): string {
    return this.usuarioLogeado?.nombre?.charAt(0) || 'U';
  }

  /**
   * Obtiene el nombre completo del usuario
   */
  obtenerNombreCompleto(): string {
    return `${this.usuarioLogeado?.nombre || ''} ${this.usuarioLogeado?.apellido || ''}`.trim();
  }

  /**
   * Obtiene el email del usuario
   */
  obtenerEmailUsuario(): string {
    return this.usuarioLogeado?.email || '';
  }

  /**
   * Verifica si el usuario tiene permisos de administrador en un proyecto
   */
  esAdministrador(proyectoId: string | undefined): boolean {
    if (!proyectoId) return false;
    return this.obtenerRolProyecto(proyectoId) === 'Administrador';
  }

  /**
   * Verifica si el usuario tiene permisos de editor en un proyecto
   */
  esEditor(proyectoId: string | undefined): boolean {
    if (!proyectoId) return false;
    return this.obtenerRolProyecto(proyectoId) === 'Editor';
  }

  /**
   * Verifica si el usuario es solo visualizador en un proyecto
   */
  esVisualizador(proyectoId: string | undefined): boolean {
    if (!proyectoId) return false;
    return this.obtenerRolProyecto(proyectoId) === 'Visualizador';
  }

  /**
   * Obtiene el color del badge según el rol
   */
  obtenerColorRol(rol: string): string {
    switch (rol) {
      case 'Administrador': return 'red';
      case 'Editor': return 'green';
      case 'Visualizador': return 'blue';
      default: return 'gray';
    }
  }

  /**
   * Formatea la fecha para mostrar de manera más legible
   */
  formatearFecha(fecha: string | Date | undefined): string {
    if (!fecha) return 'Fecha no disponible';

    const date = new Date(fecha);
    const ahora = new Date();
    const diffTiempo = ahora.getTime() - date.getTime();
    const diffDias = Math.floor(diffTiempo / (1000 * 3600 * 24));

    if (diffDias === 0) {
      return 'Hoy';
    } else if (diffDias === 1) {
      return 'Ayer';
    } else if (diffDias < 7) {
      return `Hace ${diffDias} días`;
    } else if (diffDias < 30) {
      const semanas = Math.floor(diffDias / 7);
      return `Hace ${semanas} semana${semanas > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }

  /**
   * Obtiene el estado de actividad del proyecto basado en la fecha de creación
   */
  obtenerEstadoProyecto(proyecto: ProyectoMiembro): string {
    // Usamos createdAt como referencia ya que updatedAt podría no estar disponible
    if (!proyecto.createdAt) return 'Inactivo';

    const fechaReferencia = new Date(proyecto.createdAt);
    const ahora = new Date();
    const diffHoras = (ahora.getTime() - fechaReferencia.getTime()) / (1000 * 3600);

    if (diffHoras < 24) {
      return 'Muy activo';
    } else if (diffHoras < 168) { // 7 días
      return 'Activo';
    } else {
      return 'Inactivo';
    }
  }

  /**
   * Obtiene el color del estado del proyecto
   */
  obtenerColorEstado(estado: string): string {
    switch (estado) {
      case 'Muy activo': return 'green';
      case 'Activo': return 'blue';
      case 'Inactivo': return 'gray';
      default: return 'gray';
    }
  }

  /**
   * Obtiene la fecha de última actualización o creación como fallback
   */
  obtenerFechaActualizacion(proyecto: ProyectoMiembro): Date {
    return new Date(proyecto.updatedAt || proyecto.createdAt || new Date());
  }

  /**
   * Verifica si un proyecto es reciente (creado en los últimos 7 días)
   */
  esProyectoReciente(proyecto: ProyectoMiembro): boolean {
    if (!proyecto.createdAt) return false;

    const fechaCreacion = new Date(proyecto.createdAt);
    const ahora = new Date();
    const diffDias = (ahora.getTime() - fechaCreacion.getTime()) / (1000 * 3600 * 24);

    return diffDias < 7;
  }

  /**
   * Obtiene el tiempo transcurrido desde la creación del proyecto
   */
  obtenerTiempoTranscurrido(proyecto: ProyectoMiembro): string {
    if (!proyecto.createdAt) return 'Tiempo no disponible';

    const fechaCreacion = new Date(proyecto.createdAt);
    const ahora = new Date();
    const diffMs = ahora.getTime() - fechaCreacion.getTime();
    const diffDias = Math.floor(diffMs / (1000 * 3600 * 24));

    if (diffDias === 0) {
      const diffHoras = Math.floor(diffMs / (1000 * 3600));
      return `Creado hace ${diffHoras} hora${diffHoras !== 1 ? 's' : ''}`;
    } else if (diffDias === 1) {
      return 'Creado ayer';
    } else if (diffDias < 7) {
      return `Creado hace ${diffDias} días`;
    } else if (diffDias < 30) {
      const semanas = Math.floor(diffDias / 7);
      return `Creado hace ${semanas} semana${semanas > 1 ? 's' : ''}`;
    } else {
      const meses = Math.floor(diffDias / 30);
      return `Creado hace ${meses} mes${meses > 1 ? 'es' : ''}`;
    }
  }

  /**
 * Guarda el rol del usuario para un proyecto específico en localStorage
 */
guardarRolEnLocalStorage(proyectoId: string, rol: string): void {
  if (!this.isBrowser || !proyectoId) return;

  try {
    const rolesKey = 'proyectoRoles';
    let roles = this.obtenerRolesDeLocalStorage();

    // Actualizar o agregar el rol para este proyecto
    roles.set(proyectoId, rol);

    // Guardar en localStorage
    localStorage.setItem(rolesKey, JSON.stringify(Array.from(roles.entries())));

    console.log(`Rol ${rol} guardado para proyecto ${proyectoId}`);
  } catch (error) {
    console.error('Error al guardar rol en localStorage:', error);
  }
}

/**
 * Obtiene todos los roles guardados en localStorage
 */
obtenerRolesDeLocalStorage(): Map<string, string> {
  if (!this.isBrowser) return new Map();

  try {
    const rolesKey = 'proyectoRoles';
    const rolesData = localStorage.getItem(rolesKey);

    if (rolesData) {
      const rolesArray = JSON.parse(rolesData) as [string, string][];
      return new Map(rolesArray);
    }
  } catch (error) {
    console.error('Error al obtener roles de localStorage:', error);
  }

  return new Map();
}

/**
 * Obtiene el rol de un proyecto específico desde localStorage
 */
obtenerRolDeLocalStorage(proyectoId: string): string | null {
  if (!this.isBrowser || !proyectoId) return null;

  try {
    const roles = this.obtenerRolesDeLocalStorage();
    return roles.get(proyectoId) || null;
  } catch (error) {
    console.error('Error al obtener rol de localStorage:', error);
    return null;
  }
}

/**
 * Elimina el rol de un proyecto específico de localStorage
 */
eliminarRolDeLocalStorage(proyectoId: string): void {
  if (!this.isBrowser || !proyectoId) return;

  try {
    const roles = this.obtenerRolesDeLocalStorage();
    roles.delete(proyectoId);

    localStorage.setItem('proyectoRoles', JSON.stringify(Array.from(roles.entries())));
  } catch (error) {
    console.error('Error al eliminar rol de localStorage:', error);
  }
}

/**
 * Limpia todos los roles guardados en localStorage
 */
limpiarRolesLocalStorage(): void {
  if (!this.isBrowser) return;

  try {
    localStorage.removeItem('proyectoRoles');
  } catch (error) {
    console.error('Error al limpiar roles de localStorage:', error);
  }
}
/**
 * Obtiene la información del proyecto actual desde localStorage
 */
obtenerProyectoActual(): any {
  if (!this.isBrowser) return null;

  try {
    const proyectoData = localStorage.getItem('proyectoActual');
    return proyectoData ? JSON.parse(proyectoData) : null;
  } catch (error) {
    console.error('Error al obtener proyecto actual:', error);
    return null;
  }
}

/**
 * Obtiene solo el rol actual desde localStorage
 */
obtenerRolActual(): string | null {
  if (!this.isBrowser) return null;
  return localStorage.getItem('rolActual');
}

/**
 * Obtiene solo el ID del proyecto actual desde localStorage
 */
obtenerProyectoIdActual(): string | null {
  if (!this.isBrowser) return null;
  return localStorage.getItem('proyectoIdActual');
}
}
