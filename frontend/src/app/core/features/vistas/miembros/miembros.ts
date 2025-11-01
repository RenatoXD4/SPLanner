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

  async inicializarComponente(): Promise<void> {
    try {
      await this.obtenerUsuarioLogeado();
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

    if (this.rolesPorProyecto.has(proyectoId)) {
      return this.rolesPorProyecto.get(proyectoId)!;
    }

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
        this.rolesPorProyecto.set(proyectoId, nombreRol);

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
  irAlBoard(proyectoId: string): void {
    if (!this.isBrowser || !proyectoId || proyectoId === '') {
      console.error('ID de proyecto no válido');
      this.mostrarMensaje('Error: No se puede acceder al proyecto');
      return;
    }

    this.proyectoGuard.setProyectoActual(proyectoId);
    this.router.navigate(['/board']);
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
}
