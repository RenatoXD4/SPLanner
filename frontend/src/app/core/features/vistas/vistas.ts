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
  OnDestroy,
  HostListener
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Sidebar } from '../../shared/ui/sidebar/sidebar';
import { VistasService, Proyecto, ProyectoConUsuario } from './service/vista-service';
import { AuthService } from '../../services/auth-service';
import { Subscription } from 'rxjs';
import { ProyectoGuard } from '../../../guards/proyecto.guard';

interface CreateProjectRequest {
  nombre: string;
  descripcion?: string;
  creadoPorId: string;
}

interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

interface MiembroProyecto {
  id: number;
  usuarioId: string;
  proyectoId: string;
  rolId: number;
  usuario?: Usuario;
}

// Interface para el proyecto en administración
interface ProyectoAdministrar extends ProyectoConUsuario {
  nombre: string;
  descripcion?: string;
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

  dropdownOpen: string | null = null;
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

  // Variables para la invitación de miembros
  invitacionAbierta = false;
  proyectoAInvitar: ProyectoConUsuario | null = null;
  correoInvitacion = '';
  rolInvitacion = '1';
  buscandoUsuario = false;
  usuarioEncontrado: Usuario | null = null;
  errorInvitacion = '';

  // Variables para administrar proyecto
  administrarAbierto = false;
  proyectoAAdministrar: ProyectoAdministrar | null = null;
  seccionAdministrar: 'proyecto' | 'usuarios' = 'proyecto';
  miembrosProyecto: MiembroProyecto[] = [];
  correoInvitacionAdministrar = '';
  rolInvitacionAdministrar = '1';
  cargandoMiembros = false;

  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;
  @ViewChild('modalTemplate', { read: TemplateRef }) modalTemplate!: TemplateRef<any>;

  @ViewChild('confirmContainer', { read: ViewContainerRef }) confirmContainer!: ViewContainerRef;
  @ViewChild('confirmTemplate', { read: TemplateRef }) confirmTemplate!: TemplateRef<any>;

  @ViewChild('invitacionContainer', { read: ViewContainerRef }) invitacionContainer!: ViewContainerRef;
  @ViewChild('invitacionTemplate', { read: TemplateRef }) invitacionTemplate!: TemplateRef<any>;

  @ViewChild('mensajeContainer', { read: ViewContainerRef }) mensajeContainer!: ViewContainerRef;
  @ViewChild('mensajeTemplate', { read: TemplateRef }) mensajeTemplate!: TemplateRef<any>;

  @ViewChild('administrarContainer', { read: ViewContainerRef }) administrarContainer!: ViewContainerRef;
  @ViewChild('administrarTemplate', { read: TemplateRef }) administrarTemplate!: TemplateRef<any>;

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
      this.suscribirseAProyectos();
      await this.cargarProyectos();
      this.nuevoProyectoData = this.crearProyectoVacio();
      this.cargando = false;
      this.cdr.detectChanges();
    } catch (error) {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  // === ADMINISTRAR PROYECTO ===

  abrirModalAdministrar(proyecto: ProyectoConUsuario): void {
    this.dropdownOpen = null;

    // Crear una copia segura del proyecto para administrar
    this.proyectoAAdministrar = {
      ...proyecto,
      nombre: proyecto.nombre || '',
      descripcion: proyecto.descripcion || ''
    };

    this.seccionAdministrar = 'proyecto';
    this.correoInvitacionAdministrar = '';
    this.rolInvitacionAdministrar = '1';
    this.miembrosProyecto = [];

    this.administrarContainer.clear();
    this.administrarContainer.createEmbeddedView(this.administrarTemplate);
    this.administrarAbierto = true;
    this.cdr.detectChanges();

    // Cargar miembros del proyecto
    this.cargarMiembrosProyecto(proyecto.id!);

    if (this.isBrowser) {
      document.addEventListener('keydown', this.manejarTecladoAdministrar);
    }
  }

  cerrarAdministrar(): void {
    this.administrarContainer.clear();
    this.administrarAbierto = false;
    this.proyectoAAdministrar = null;
    this.miembrosProyecto = [];
    this.cdr.detectChanges();

    if (this.isBrowser) {
      document.removeEventListener('keydown', this.manejarTecladoAdministrar);
    }
  }

  cambiarSeccionAdministrar(seccion: 'proyecto' | 'usuarios'): void {
    this.seccionAdministrar = seccion;
    this.cdr.detectChanges();
  }

  private manejarTecladoAdministrar = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.administrarAbierto) {
      this.cerrarAdministrar();
    }
  }

async cargarMiembrosProyecto(proyectoId: string): Promise<void> {
  this.cargandoMiembros = true;
  try {
    const miembros = await this.vistasService.obtenerMiembrosProyecto(proyectoId).toPromise();


    this.miembrosProyecto = (miembros || []).map(miembro => ({
      ...miembro,
      rolId: Number(miembro.rolId) // Convertir a número
    }));

    console.log('Miembros cargados:', this.miembrosProyecto);
  } catch (error) {
    console.error('Error al cargar miembros:', error);
    this.mostrarMensaje('Error al cargar miembros del proyecto');
  } finally {
    this.cargandoMiembros = false;
    this.cdr.detectChanges();
  }
}

  async invitarDesdeAdministrar(): Promise<void> {
    if (!this.proyectoAAdministrar?.id || !this.correoInvitacionAdministrar.trim()) {
      return;
    }

    try {
      const usuario = await this.vistasService.buscarUsuarioPorEmail(this.correoInvitacionAdministrar).toPromise();

      if (!usuario || !usuario.id) {
        this.mostrarMensaje('No se encontró ningún usuario con ese correo electrónico');
        return;
      }

      await this.vistasService.invitarUsuarioAProyecto(
        this.proyectoAAdministrar.id!,
        usuario.id,
        parseInt(this.rolInvitacionAdministrar)
      );

      this.mostrarMensaje(`¡${usuario.nombre} ha sido invitado al proyecto!`);
      this.correoInvitacionAdministrar = '';

      // Recargar miembros
      this.cargarMiembrosProyecto(this.proyectoAAdministrar.id!);
      // Recargar proyectos para actualizar contador
      this.recargarProyectos();

    } catch (error: any) {
      if (error.status === 409) {
        this.mostrarMensaje('Este usuario ya es miembro del proyecto');
      } else {
        this.mostrarMensaje('Error al invitar usuario');
      }
    }
  }

  async actualizarRolMiembro(miembro: MiembroProyecto): Promise<void> {
  try {
    const nuevoRolId = Number(miembro.rolId);

    if (isNaN(nuevoRolId)) {
      this.mostrarMensaje('Error: El rol seleccionado no es válido');
      return;
    }
    await this.vistasService.actualizarRolMiembro(miembro.id, nuevoRolId).toPromise();
    this.mostrarMensaje('Rol actualizado correctamente');

  } catch (error) {
    console.error('Error al actualizar rol:', error);
    this.mostrarMensaje('Error al actualizar el rol');
  }
}

  async eliminarMiembro(miembro: MiembroProyecto): Promise<void> {
  if (!this.proyectoAAdministrar?.id) return;

  try {
    await this.vistasService.eliminarMiembroProyecto(
      this.proyectoAAdministrar.id,
      miembro.usuarioId
    ).toPromise();

    this.mostrarMensaje('Miembro eliminado del proyecto');
    // Recargar miembros
    this.cargarMiembrosProyecto(this.proyectoAAdministrar.id);
    // Recargar proyectos para actualizar contador
    this.recargarProyectos();

  } catch (error) {
    console.error('Error al eliminar miembro:', error);
    this.mostrarMensaje('Error al eliminar miembro');
  }
}

  guardarProyectoDesdeAdministrar(): void {
    if (!this.proyectoAAdministrar?.id || !this.proyectoAAdministrar.nombre.trim()) {
      this.mostrarMensaje('El nombre del proyecto es requerido');
      return;
    }

    const datos: Partial<Proyecto> = {
      nombre: this.proyectoAAdministrar.nombre.trim(),
      descripcion: this.proyectoAAdministrar.descripcion?.trim() || ''
    };

    this.vistasService.editarProyecto(this.proyectoAAdministrar.id, datos).subscribe({
      next: (res: ProyectoConUsuario) => {
        const proyectoActualizado = this.normalizarProyecto(res);
        const proyectosActualizados = this.proyectos.map(p =>
          p.id === proyectoActualizado.id ? proyectoActualizado : p
        );

        this.proyectos = proyectosActualizados;
        this.actualizarProyectosFiltrados();

        this.mostrarMensaje('Proyecto actualizado correctamente');
        this.cerrarAdministrar();

        this.cdr.detectChanges();
      },
      error: (error) => {
        this.mostrarMensaje('Error al actualizar proyecto');
      }
    });
  }

  // === INVITACIÓN DE MIEMBROS ===

  invitarMiembro(proyecto: ProyectoConUsuario): void {
    this.dropdownOpen = null;
    this.proyectoAInvitar = proyecto;
    this.correoInvitacion = '';
    this.rolInvitacion = '1';
    this.buscandoUsuario = false;
    this.usuarioEncontrado = null;
    this.errorInvitacion = '';

    this.invitacionContainer.clear();
    this.invitacionContainer.createEmbeddedView(this.invitacionTemplate);
    this.invitacionAbierta = true;
    this.cdr.detectChanges();

    if (this.isBrowser) {
      document.addEventListener('keydown', this.manejarTecladoInvitacion);
    }
  }

  async enviarInvitacion(): Promise<void> {
  if (!this.proyectoAInvitar?.id || !this.correoInvitacion.trim()) {
    this.errorInvitacion = 'El correo electrónico es requerido';
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.correoInvitacion)) {
    this.errorInvitacion = 'Por favor ingresa un correo electrónico válido';
    return;
  }

  this.buscandoUsuario = true;
  this.errorInvitacion = '';
  this.usuarioEncontrado = null;
  this.cdr.detectChanges();

  try {
    console.log(' [DEBUG] Llamando a buscarUsuarioPorEmail...');
    const usuario = await this.vistasService.buscarUsuarioPorEmail(this.correoInvitacion).toPromise();
    console.log('[DEBUG] Usuario encontrado (datos extraídos):', usuario);

    if (!usuario) {
      this.errorInvitacion = 'No se encontró ningún usuario con ese correo electrónico';
      return;
    }

    if (!usuario.id) {
      console.error(' [DEBUG] ERROR CRÍTICO: El usuario no tiene ID');
      this.errorInvitacion = 'Error: El usuario encontrado no tiene un ID válido';
      return;
    }

    if (!usuario.nombre) {
      console.warn(' [DEBUG] El usuario no tiene nombre, usando valor por defecto');
      usuario.nombre = 'Usuario';
    }

    this.usuarioEncontrado = usuario;

    console.log(' [DEBUG] Enviando invitación con:', {
      proyectoId: this.proyectoAInvitar.id,
      usuarioId: usuario.id,
      rolId: this.rolInvitacion,
      proyectoNombre: this.proyectoAInvitar.nombre,
      usuarioEmail: this.correoInvitacion
    });


    const resultado = await this.vistasService.invitarUsuarioAProyecto(
      this.proyectoAInvitar.id!,
      usuario.id,
      parseInt(this.rolInvitacion),
      this.proyectoAInvitar.nombre, // Nombre del proyecto para el correo
      this.correoInvitacion // Email del usuario invitado para el correo
    );

    console.log('[DEBUG] Invitación exitosa');
    this.mostrarMensaje(`¡${usuario.nombre} ha sido invitado al proyecto! Se ha enviado un correo de notificación.`);

    // Recargar los proyectos para obtener los contadores actualizados del backend
    this.recargarProyectos();

    this.cerrarInvitacion();

  } catch (error: any) {
    console.error('[DEBUG] Error:', error);

    if (error.status === 404) {
      this.errorInvitacion = 'No se encontró ningún usuario con ese correo electrónico';
    } else if (error.status === 409) {
      this.errorInvitacion = 'Este usuario ya es miembro del proyecto';
    } else if (error.message?.includes('Usuario no encontrado')) {
      this.errorInvitacion = 'No se encontró ningún usuario con ese correo electrónico';
    } else {
      this.errorInvitacion = 'Error al invitar usuario. Intenta nuevamente.';
    }
  } finally {
    this.buscandoUsuario = false;
    this.cdr.detectChanges();
  }
}

  cerrarInvitacion(): void {
    this.invitacionContainer.clear();
    this.invitacionAbierta = false;
    this.proyectoAInvitar = null;
    this.correoInvitacion = '';
    this.usuarioEncontrado = null;
    this.errorInvitacion = '';
    this.cdr.detectChanges();

    if (this.isBrowser) {
      document.removeEventListener('keydown', this.manejarTecladoInvitacion);
    }
  }

  private manejarTecladoInvitacion = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.invitacionAbierta) {
      this.cerrarInvitacion();
    }
  }

  prevenirCierreInvitacion(event: Event): void {
    event.stopPropagation();
  }

  // === NAVEGACIÓN Y PROYECTOS ===

  irAlBoard(proyectoId: string): void {
    if (!this.isBrowser || !proyectoId || proyectoId === '') {
      console.error('ID de proyecto no válido');
      this.mostrarMensaje('Error: No se puede acceder al proyecto');
      return;
    }

    this.proyectoGuard.setProyectoActual(proyectoId);
    this.router.navigate(['/board']);
  }

  private suscribirseAProyectos(): void {
    this.proyectosSubscription = this.vistasService.proyectos$.subscribe({
      next: (proyectos) => {
        const usuarioActual = this.authService.getCurrentUser();
        if (usuarioActual && usuarioActual !== this.usuarioLogeado) {
          this.usuarioLogeado = usuarioActual;
        }

        console.log('[DEBUG] Proyectos recibidos del backend:', proyectos.length, 'proyectos');

        // Verificar si los proyectos tienen miembrosCount
        proyectos.forEach((p, index) => {
          console.log(`[DEBUG] Proyecto ${index}:`, {
            id: p.id,
            nombre: p.nombre,
            miembrosCount: p.miembrosCount,
            tieneMiembrosCount: 'miembrosCount' in p,
            todasLasPropiedades: Object.keys(p)
          });
        });

        this.proyectos = proyectos.map(p => this.normalizarProyecto(p));
        this.actualizarProyectosFiltrados();
        this.cdr.detectChanges();
        setTimeout(() => this.cdr.detectChanges(), 0);
      },
      error: (error) => {
        console.error('Error en suscripción a proyectos:', error);
      }
    });
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

  cargarProyectos(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isBrowser) {
        resolve();
        return;
      }

      this.vistasService.getProyectos().subscribe({
        next: (res: ProyectoConUsuario[]) => {
          resolve();
        },
        error: (error) => {
          this.mostrarMensaje('Error al cargar proyectos');
          this.cargando = false;
          this.cdr.detectChanges();
          reject(error);
        }
      });
    });
  }

  // === GESTIÓN DE PROYECTOS ===

  async guardarProyecto(): Promise<void> {
  if (!this.nuevoProyectoData.nombre.trim()) {
    this.mostrarMensaje('El nombre del proyecto es requerido');
    return;
  }

  const usuarioId = this.authService.getCurrentUserId();
  if (!usuarioId) {
    this.mostrarMensaje('Error: No se pudo identificar al usuario.');
    return;
  }

  if (!this.nuevoProyectoData.id) {
    const datos: CreateProjectRequest = {
      nombre: this.nuevoProyectoData.nombre.trim(),
      descripcion: this.nuevoProyectoData.descripcion?.trim() || '',
      creadoPorId: usuarioId
    };

    this.vistasService.crearProyecto(datos).subscribe({
      next: async (res: ProyectoConUsuario) => {
        try {
          await this.autoInsertarComoMiembro(res.id!, usuarioId);
          this.mostrarMensaje('Proyecto creado correctamente y te has unido como miembro');
          this.recargarProyectos();
        } catch (error) {
          console.error('Error al auto-insertar como miembro:', error);
          this.mostrarMensaje('Proyecto creado correctamente');
        }

        this.cerrarModal();
      },
      error: (error) => {
        console.error('Error al crear proyecto:', error);
        this.mostrarMensaje('Error al crear proyecto');
      }
    });
  } else {
    const datos: Partial<Proyecto> = {
      nombre: this.nuevoProyectoData.nombre.trim(),
      descripcion: this.nuevoProyectoData.descripcion?.trim() || ''
    };

    this.vistasService.editarProyecto(this.nuevoProyectoData.id, datos).subscribe({
      next: (res: ProyectoConUsuario) => {
        const proyectoActualizado = this.normalizarProyecto(res);
        const proyectosActualizados = this.proyectos.map(p =>
          p.id === proyectoActualizado.id ? proyectoActualizado : p
        );

        this.proyectos = proyectosActualizados;
        this.actualizarProyectosFiltrados();

        this.mostrarMensaje('Proyecto editado correctamente');
        this.cerrarModal();

        this.cdr.detectChanges();
        setTimeout(() => this.cdr.detectChanges(), 0);
      },
      error: (error) => {
        this.mostrarMensaje('Error al editar proyecto');
      }
    });
  }
}
private async autoInsertarComoMiembro(proyectoId: string, usuarioId: string): Promise<void> {
  try {
    // Verificar si ya es miembro (opcional, por seguridad)
    const miembros = await this.vistasService.obtenerMiembrosProyecto(proyectoId).toPromise();
    const yaEsMiembro = miembros?.some(miembro => miembro.usuarioId === usuarioId);

    if (yaEsMiembro) {
      console.log('El usuario ya es miembro del proyecto');
      return;
    }

    // Auto-insertar como administrador
    await this.vistasService.invitarUsuarioAProyecto(
      proyectoId,
      usuarioId,
      1 // Rol de administrador
    );

    console.log('Usuario auto-insertado como miembro del proyecto');

  } catch (error) {
    console.error('Error al auto-insertar como miembro:', error);
    throw error;
  }
}
  actualizarProyectosFiltrados(): void {
    const texto = this.filtroTexto.trim().toLowerCase();
    this.proyectosFiltrados = this.proyectos.filter(p =>
      !texto || p.nombre.toLowerCase().includes(texto)
    );

    this.cdr.detectChanges();
  }

  onFiltroChange(): void {
    this.actualizarProyectosFiltrados();
  }

  confirmarEliminar(proyecto: ProyectoConUsuario): void {
    this.proyectoAEliminar = proyecto;
    this.confirmContainer.clear();
    this.confirmContainer.createEmbeddedView(this.confirmTemplate);
    this.confirmacionAbierta = true;
    this.cdr.detectChanges();

    if (this.isBrowser) {
      document.addEventListener('keydown', this.manejarTecladoConfirmacion);
    }
  }

  eliminarProyecto(): void {
    if (!this.proyectoAEliminar?.id) return;

    this.vistasService.eliminarProyecto(this.proyectoAEliminar.id).subscribe({
      next: () => {
        this.cancelarEliminar();
        this.mostrarMensaje('Proyecto eliminado');
      },
      error: (error) => {
        this.mostrarMensaje('Error al eliminar');
      }
    });
  }

  cancelarEliminar(): void {
    this.proyectoAEliminar = null;
    this.confirmContainer.clear();
    this.confirmacionAbierta = false;
    this.cdr.detectChanges();

    if (this.isBrowser) {
      document.removeEventListener('keydown', this.manejarTecladoConfirmacion);
    }
  }

  // === MODALES ===

  abrirModal(): void {
    this.dropdownOpen = null;
    if (!this.nuevoProyectoData.id) {
      this.nuevoProyectoData = this.crearProyectoVacio();
    }
    this.modalContainer.clear();
    this.modalContainer.createEmbeddedView(this.modalTemplate);
    this.modalAbierto = true;
    this.cdr.detectChanges();

    if (this.isBrowser) {
      document.addEventListener('keydown', this.manejarTecladoModal);
    }
  }

  cerrarModal(): void {
    this.dropdownOpen = null;
    this.nuevoProyectoData = this.crearProyectoVacio();
    this.modalContainer.clear();
    this.modalAbierto = false;
    this.cdr.detectChanges();

    if (this.isBrowser) {
      document.removeEventListener('keydown', this.manejarTecladoModal);
    }
  }

  private manejarTecladoModal = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.modalAbierto) {
      this.cerrarModal();
    }
  }

  private manejarTecladoConfirmacion = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.confirmacionAbierta) {
      this.cancelarEliminar();
    }
  }

  prevenirCierreModal(event: Event): void {
    event.stopPropagation();
  }

  prevenirCierreConfirmacion(event: Event): void {
    event.stopPropagation();
  }

  // === UTILIDADES ===

  crearProyectoVacio(): Proyecto {
    const usuarioId = this.authService.getCurrentUserId();
    return { nombre: '', descripcion: '', creadoPorId: usuarioId || '' };
  }

  normalizarProyecto(p: any): ProyectoConUsuario {
    const usuarioActual = this.authService.getCurrentUser();

    const proyectoNormalizado = {
      ...p,
      // Asegurar que miembrosCount se obtiene correctamente
      miembrosCount: p.miembrosCount || p._count?.miembros || 0,
      creadoPor: p.creadoPor || {
        id: usuarioActual?.id || p.creadoPorId,
        nombre: usuarioActual?.nombre || 'Desconocido',
        apellido: usuarioActual?.apellido || '',
        email: usuarioActual?.email || ''
      },
      createdAt: p.createdAt || new Date().toISOString()
    };

    console.log('[DEBUG] Proyecto normalizado:', {
      id: proyectoNormalizado.id,
      nombre: proyectoNormalizado.nombre,
      miembrosCount: proyectoNormalizado.miembrosCount,
      tiene_count: !!p._count,
      count_miembros: p._count?.miembros
    });

    return proyectoNormalizado;
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

  toggleDropdown(projectId: string): void {
    this.dropdownOpen = this.dropdownOpen === projectId ? null : projectId;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.dropdownOpen) {
      this.dropdownOpen = null;
    }
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

  recargarProyectos(): void {
    this.cargando = true;
    this.cdr.detectChanges();
    this.cargarProyectos().finally(() => {
      this.cargando = false;
      this.cdr.detectChanges();
    });
  }

  obtenerInicialUsuarioEncontrado(): string {
    if (!this.usuarioEncontrado?.nombre) {
      return 'U';
    }
    return this.usuarioEncontrado.nombre.charAt(0).toUpperCase();
  }

  // Método simplificado para forzar actualización visual
  private forzarActualizacionVisual(): void {
    this.cdr.detectChanges();
    setTimeout(() => this.cdr.detectChanges(), 0);
  }
}
