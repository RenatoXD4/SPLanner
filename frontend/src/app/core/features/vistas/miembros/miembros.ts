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
  proyectos: ProyectoMiembro[] = [];
  proyectosFiltrados: ProyectoMiembro[] = [];
  usuarioLogeado: any = null;
  private isBrowser: boolean;
  cargando = true;
  private proyectosSubscription?: Subscription;

  // Almacenar información de roles por proyecto
  private rolesPorProyecto: Map<string, string> = new Map();

  @ViewChild('mensajeContainer', { read: ViewContainerRef }) mensajeContainer!: ViewContainerRef;
  @ViewChild('mensajeTemplate', { read: TemplateRef }) mensajeTemplate!: TemplateRef<any>;

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

    // Usar el nuevo método que solo trae proyectos donde el usuario es miembro
    const proyectos = await this.vistasService.obtenerProyectosComoMiembro(userId).toPromise();

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

  irAlBoard(proyectoId: string): void {
    if (!this.isBrowser || !proyectoId || proyectoId === '') {
      console.error('ID de proyecto no válido');
      this.mostrarMensaje('Error: No se puede acceder al proyecto');
      return;
    }

    this.proyectoGuard.setProyectoActual(proyectoId);
    this.router.navigate(['/board']);
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
}
