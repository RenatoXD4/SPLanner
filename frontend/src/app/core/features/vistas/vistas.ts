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
import { Sidebar } from '../../shared/ui/sidebar/sidebar';
import { VistasService, Proyecto, ProyectoConUsuario } from './service/vista-service';
import { AuthService } from '../../services/auth-service';
import { Subscription } from 'rxjs';

interface CreateProjectRequest {
  nombre: string;
  descripcion?: string;
  creadoPorId: string;
}

@Component({
  selector: 'app-vistas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, Sidebar],
  templateUrl: './vistas.html',
  styleUrls: ['./vistas.css'],
  providers: [VistasService]
})
export class Vistas implements OnInit, OnDestroy {

  mostrarSidebar = true;
  filtroTexto = '';
  proyectos: ProyectoConUsuario[] = [];
  proyectosFiltrados: ProyectoConUsuario[] = [];
  proyectoAEliminar: ProyectoConUsuario | null = null;
  nuevoProyectoData: Proyecto = { nombre: '', descripcion: '', creadoPorId: '' };
  usuarioLogeado: any = null;
  private isBrowser: boolean;
  cargando = true;
  modalAbierto = false;
  confirmacionAbierta = false;
  private proyectosSubscription?: Subscription;

  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;
  @ViewChild('modalTemplate', { read: TemplateRef }) modalTemplate!: TemplateRef<any>;

  @ViewChild('confirmContainer', { read: ViewContainerRef }) confirmContainer!: ViewContainerRef;
  @ViewChild('confirmTemplate', { read: TemplateRef }) confirmTemplate!: TemplateRef<any>;

  @ViewChild('mensajeContainer', { read: ViewContainerRef }) mensajeContainer!: ViewContainerRef;
  @ViewChild('mensajeTemplate', { read: TemplateRef }) mensajeTemplate!: TemplateRef<any>;

  private vistasService = inject(VistasService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

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
      console.log('Inicializando componente...');
      await this.obtenerUsuarioLogeado();

      // SUSCRIBIRSE A LOS CAMBIOS DE PROYECTOS
      this.suscribirseAProyectos();

      // CARGAR PROYECTOS INICIALES
      await this.cargarProyectos();

      this.nuevoProyectoData = this.crearProyectoVacio();
      this.cargando = false;
      this.cdr.detectChanges();
      console.log('Componente inicializado correctamente');
    } catch (error) {
      console.error('Error inicializando componente:', error);
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  // SUSCRIBIRSE A LOS CAMBIOS DEL BEHAVIORSUBJECT
  private suscribirseAProyectos(): void {
  this.proyectosSubscription = this.vistasService.proyectos$.subscribe({
    next: (proyectos) => {
      console.log('Actualización recibida de BehaviorSubject:', proyectos.length);

      // Obtener usuario actual para asegurar datos frescos
      const usuarioActual = this.authService.getCurrentUser();
      if (usuarioActual && usuarioActual !== this.usuarioLogeado) {
        this.usuarioLogeado = usuarioActual;
      }

      this.proyectos = proyectos.map(p => this.normalizarProyecto(p));
      this.actualizarProyectosFiltrados();

      // Forzar detección de cambios
      this.cdr.detectChanges();
      setTimeout(() => this.cdr.detectChanges(), 0);
    },
    error: (error) => {
      console.error('Error en suscripción a proyectos:', error);
    }
  });
}

  // === USUARIO ACTUAL ===
  async obtenerUsuarioLogeado(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.isBrowser) {
        resolve();
        return;
      }

      this.usuarioLogeado = this.authService.getCurrentUser();

      if (!this.usuarioLogeado) {
        console.warn(' No se encontró usuario logeado.');
      } else {
        console.log('Usuario logeado:', this.usuarioLogeado);
      }
      resolve();
    });
  }

  // === CARGAR PROYECTOS ===
  cargarProyectos(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isBrowser) {
        resolve();
        return;
      }

      console.log('Iniciando carga de proyectos...');
      this.vistasService.getProyectos().subscribe({
        next: (res: ProyectoConUsuario[]) => {
          console.log('Proyectos recibidos del API:', res.length);
          // El BehaviorSubject se actualiza automáticamente y la suscripción se encarga del resto
          resolve();
        },
        error: (error) => {
          console.error('Error al cargar proyectos:', error);
          this.mostrarMensaje('Error al cargar proyectos');
          this.cargando = false;
          this.cdr.detectChanges();
          reject(error);
        }
      });
    });
  }

  guardarProyecto(): void {
  if (!this.nuevoProyectoData.nombre.trim()) {
    this.mostrarMensaje('El nombre del proyecto es requerido');
    return;
  }

  const usuarioId = this.authService.getCurrentUserId();
  if (!usuarioId) {
    this.mostrarMensaje('Error: No se pudo identificar al usuario.');
    return;
  }

  // --- CREAR ---
  if (!this.nuevoProyectoData.id) {
    const datos: CreateProjectRequest = {
      nombre: this.nuevoProyectoData.nombre.trim(),
      descripcion: this.nuevoProyectoData.descripcion?.trim() || '',
      creadoPorId: usuarioId
    };

    console.log('Creando proyecto:', datos);
    this.vistasService.crearProyecto(datos).subscribe({
      next: (res: ProyectoConUsuario) => {
        console.log('Proyecto creado:', res);
        this.mostrarMensaje('Proyecto creado correctamente');
        this.cerrarModal();
        // El BehaviorSubject se actualiza automáticamente
      },
      error: (error) => {
        console.error('Error al crear proyecto:', error);
        this.mostrarMensaje('Error al crear proyecto');
      }
    });
  }

  // --- EDITAR ---
  else {
    const datos: Partial<Proyecto> = {
      nombre: this.nuevoProyectoData.nombre.trim(),
      descripcion: this.nuevoProyectoData.descripcion?.trim() || ''
    };

    console.log('Editando proyecto:', this.nuevoProyectoData.id, datos);
    this.vistasService.editarProyecto(this.nuevoProyectoData.id, datos).subscribe({
      next: (res: ProyectoConUsuario) => {
        console.log('Proyecto editado recibido del backend:', res);

        // ACTUALIZACIÓN MANUAL INMEDIATA EN EL COMPONENTE
        const proyectoActualizado = this.normalizarProyecto(res);
        const proyectosActualizados = this.proyectos.map(p =>
          p.id === proyectoActualizado.id ? proyectoActualizado : p
        );

        // Forzar actualización inmediata mientras el BehaviorSubject se procesa
        this.proyectos = proyectosActualizados;
        this.actualizarProyectosFiltrados();

        this.mostrarMensaje('Proyecto editado correctamente');
        this.cerrarModal();

        // Forzar detección de cambios múltiple
        this.cdr.detectChanges();
        setTimeout(() => this.cdr.detectChanges(), 0);
      },
      error: (error) => {
        console.error('Error al editar proyecto:', error);
        this.mostrarMensaje('Error al editar proyecto');
      }
    });
  }
}

  // === FILTRO ===
  actualizarProyectosFiltrados(): void {
    const texto = this.filtroTexto.trim().toLowerCase();
    this.proyectosFiltrados = this.proyectos.filter(p =>
      !texto || p.nombre.toLowerCase().includes(texto)
    );
    console.log('Proyectos filtrados:', this.proyectosFiltrados.length);
    this.cdr.detectChanges();
  }

  onFiltroChange(): void {
    this.actualizarProyectosFiltrados();
  }

  // === EDITAR / ELIMINAR ===
  editarProyecto(proyecto: ProyectoConUsuario): void {
    console.log('Editando proyecto:', proyecto);
    this.nuevoProyectoData = { ...proyecto };
    this.abrirModal();
  }

  confirmarEliminar(proyecto: ProyectoConUsuario): void {
    this.proyectoAEliminar = proyecto;
    this.confirmContainer.clear();
    this.confirmContainer.createEmbeddedView(this.confirmTemplate);
    this.confirmacionAbierta = true;
    this.cdr.detectChanges();

    // Agregar event listener para ESC
    if (this.isBrowser) {
      document.addEventListener('keydown', this.manejarTecladoConfirmacion);
    }
  }

  eliminarProyecto(): void {
    if (!this.proyectoAEliminar?.id) return;

    console.log('Eliminando proyecto:', this.proyectoAEliminar.id);
    this.vistasService.eliminarProyecto(this.proyectoAEliminar.id).subscribe({
      next: () => {
        console.log(' Proyecto eliminado');
        this.cancelarEliminar();
        this.mostrarMensaje('Proyecto eliminado');
        // El BehaviorSubject se actualiza automáticamente
      },
      error: (error) => {
        console.error('Error al eliminar proyecto:', error);
        this.mostrarMensaje('Error al eliminar');
      }
    });
  }

  cancelarEliminar(): void {
    this.proyectoAEliminar = null;
    this.confirmContainer.clear();
    this.confirmacionAbierta = false;
    this.cdr.detectChanges();

    // Remover event listener
    if (this.isBrowser) {
      document.removeEventListener('keydown', this.manejarTecladoConfirmacion);
    }
  }

  // === MODAL ===
  abrirModal(): void {
    if (!this.nuevoProyectoData.id) {
      this.nuevoProyectoData = this.crearProyectoVacio();
    }
    this.modalContainer.clear();
    this.modalContainer.createEmbeddedView(this.modalTemplate);
    this.modalAbierto = true;
    this.cdr.detectChanges();

    // Agregar event listener para ESC key
    if (this.isBrowser) {
      document.addEventListener('keydown', this.manejarTecladoModal);
    }
  }

  cerrarModal(): void {
    this.nuevoProyectoData = this.crearProyectoVacio();
    this.modalContainer.clear();
    this.modalAbierto = false;
    this.cdr.detectChanges();

    // Remover event listener
    if (this.isBrowser) {
      document.removeEventListener('keydown', this.manejarTecladoModal);
    }
  }

  // Manejar tecla ESC para cerrar modal
  private manejarTecladoModal = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.modalAbierto) {
      this.cerrarModal();
    }
  }

  // Manejar tecla ESC para cerrar confirmación
  private manejarTecladoConfirmacion = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.confirmacionAbierta) {
      this.cancelarEliminar();
    }
  }

  // Prevenir cierre cuando se hace click dentro del modal
  prevenirCierreModal(event: Event): void {
    event.stopPropagation();
  }

  // Prevenir cierre cuando se hace click dentro de la confirmación
  prevenirCierreConfirmacion(event: Event): void {
    event.stopPropagation();
  }

  // === UTILIDADES ===
  crearProyectoVacio(): Proyecto {
    const usuarioId = this.authService.getCurrentUserId();
    return { nombre: '', descripcion: '', creadoPorId: usuarioId || '' };
  }

 normalizarProyecto(p: ProyectoConUsuario): ProyectoConUsuario {
  const usuarioActual = this.authService.getCurrentUser();

  return {
    ...p,
    creadoPor: p.creadoPor || {
      id: usuarioActual?.id || p.creadoPorId,
      nombre: usuarioActual?.nombre || 'Desconocido'
    },
    createdAt: p.createdAt || new Date().toISOString()
  };
}

  mostrarMensaje(msg: string): void {
    const view = this.mensajeContainer.createEmbeddedView(this.mensajeTemplate, { $implicit: msg });
    setTimeout(() => {
      view.destroy();
      this.cdr.detectChanges();
    }, 3000);
    this.cdr.detectChanges();
  }

  toggleSidebar(): void {
    this.mostrarSidebar = !this.mostrarSidebar;
    this.cdr.detectChanges();
  }

  obtenerInicialUsuario(): string {
    return this.usuarioLogeado?.nombre?.charAt(0) || 'U';
  }

  obtenerNombreCompleto(): string {
    return `${this.usuarioLogeado?.nombre || ''} ${this.usuarioLogeado?.apellido || ''}`.trim();
  }

  obtenerNombreUsuario(): string {
    return this.usuarioLogeado?.nombre || '';
  }

  // Método para recargar proyectos manualmente
  recargarProyectos(): void {
    this.cargando = true;
    this.cdr.detectChanges();
    this.cargarProyectos().finally(() => {
      this.cargando = false;
      this.cdr.detectChanges();
    });
  }
}
