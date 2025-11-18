import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NotiService, Notificacion } from '../../../services/notificacion/noti.service';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noti.html',
  styleUrls: ['./noti.css']
})
export class NotificacionComponent implements OnInit, OnDestroy {
  // ✅ ESTADO DEL COMPONENTE
  mostrarDropdown = false;
  notificaciones: Notificacion[] = [];
  contadorNoLeidas = 0;
  cargando = false;
  error = '';
  
  private intervalo: any;
  private isBrowser: boolean;
  private usuarioId: string | null = null;
  
  constructor(
    private notiService: NotiService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  // ✅ INICIALIZACIÓN
  ngOnInit() {
    console.log('🔔 Componente de notificaciones iniciado');
    
    if (this.isBrowser) {
      this.inicializarUsuario();
      
      // Escuchar cambios en la autenticación
      this.authService.currentUser$.subscribe(user => {
        console.log('🔄 Cambio detectado en usuario autenticado');
        this.inicializarUsuario();
      });
    }
  }

  private inicializarUsuario() {
    this.usuarioId = this.authService.getCurrentUserId();
    
    console.log('👤 Inicializando notificaciones para usuario:', this.usuarioId);

    if (this.usuarioId) {
      // ✅ USUARIO AUTENTICADO - Cargar notificaciones reales
      this.cargarContadorNoLeidas();
      this.cargarNotificaciones();
      
      // Configurar actualización periódica
      this.configurarActualizacionPeriodica();
    } else {
      // ❌ NO AUTENTICADO - Mostrar estado vacío
      console.log('⚠️ Usuario no autenticado');
      this.notificaciones = [];
      this.contadorNoLeidas = 0;
    }
  }

  private configurarActualizacionPeriodica() {
    // Limpiar intervalo anterior si existe
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
    
    // Actualizar cada 30 segundos
    this.intervalo = setInterval(() => {
      if (this.usuarioId && !this.mostrarDropdown) {
        this.cargarContadorNoLeidas();
      }
    }, 30000);
  }

  ngOnDestroy() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  // ✅ MANEJO DE EVENTOS
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.notificacion-container')) {
      this.mostrarDropdown = false;
    }
  }

  // ✅ MÉTODOS PRINCIPALES
  toggleDropdown() {
    this.mostrarDropdown = !this.mostrarDropdown;
    if (this.mostrarDropdown && this.usuarioId) {
      this.cargarNotificaciones();
    }
  }

  cargarNotificaciones() {
    if (this.cargando || !this.usuarioId) return;
    
    this.cargando = true;
    this.error = '';
    console.log('🔄 Cargando notificaciones para usuario:', this.usuarioId);
    
    this.notiService.obtenerNotificaciones().subscribe({
      next: (notificaciones: Notificacion[]) => {
        console.log('✅ Notificaciones cargadas correctamente:', notificaciones.length);
        this.notificaciones = notificaciones;
        this.actualizarContadorDesdeLista();
        this.cargando = false;
        
        if (notificaciones.length === 0) {
          console.log('ℹ️ No hay notificaciones para este usuario');
        }
      },
      error: (error: any) => {
        console.error('❌ Error cargando notificaciones:', error);
        this.error = 'Error al cargar notificaciones';
        this.cargando = false;
      }
    });
  }

  cargarContadorNoLeidas() {
    if (!this.usuarioId) return;
    
    this.notiService.contarNoLeidas().subscribe({
      next: (response: { count: number }) => {
        this.contadorNoLeidas = response.count;
        console.log('🔢 Contador de no leídas actualizado:', this.contadorNoLeidas);
      },
      error: (error: any) => {
        console.error('❌ Error cargando contador:', error);
        // Fallback: calcular basado en notificaciones locales
        this.actualizarContadorDesdeLista();
      }
    });
  }

  private actualizarContadorDesdeLista() {
    this.contadorNoLeidas = this.notificaciones.filter(n => !n.leida).length;
  }

  marcarComoLeida(notificacionId: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    if (!this.usuarioId) {
      console.warn('⚠️ No se puede marcar como leída - usuario no autenticado');
      return;
    }
    
    console.log('📌 Marcando como leída:', notificacionId);
    
    this.notiService.marcarComoLeida(notificacionId).subscribe({
      next: (notificacionActualizada: Notificacion) => {
        console.log('✅ Notificación marcada como leída');
        // Actualizar localmente
        const notificacion = this.notificaciones.find(n => n.id === notificacionId);
        if (notificacion) {
          notificacion.leida = true;
        }
        this.actualizarContadorDesdeLista();
      },
      error: (error: any) => {
        console.error('❌ Error marcando como leída:', error);
        // Fallback: marcar localmente aunque falle el backend
        const notificacion = this.notificaciones.find(n => n.id === notificacionId);
        if (notificacion) {
          notificacion.leida = true;
          this.actualizarContadorDesdeLista();
        }
      }
    });
  }

  marcarTodasComoLeidas(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    if (!this.usuarioId) {
      console.warn('⚠️ No se pueden marcar todas como leídas - usuario no autenticado');
      return;
    }
    
    this.notiService.marcarTodasComoLeidas().subscribe({
      next: (response: { message: string }) => {
        console.log('✅ Todas las notificaciones marcadas como leídas');
        this.notificaciones.forEach(notificacion => notificacion.leida = true);
        this.contadorNoLeidas = 0;
      },
      error: (error: any) => {
        console.error('❌ Error marcando todas como leídas:', error);
        // Fallback: marcar localmente
        this.notificaciones.forEach(notificacion => notificacion.leida = true);
        this.contadorNoLeidas = 0;
      }
    });
  }

  eliminarNotificacion(notificacionId: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    
    if (!this.usuarioId) {
      console.warn('⚠️ No se puede eliminar notificación - usuario no autenticado');
      return;
    }
    
    this.notiService.eliminarNotificacion(notificacionId).subscribe({
      next: (response: { message: string }) => {
        console.log('🗑️ Notificación eliminada');
        const notificacionEliminada = this.notificaciones.find(n => n.id === notificacionId);
        this.notificaciones = this.notificaciones.filter(n => n.id !== notificacionId);
        
        if (notificacionEliminada && !notificacionEliminada.leida) {
          this.actualizarContadorDesdeLista();
        }
      },
      error: (error: any) => {
        console.error('❌ Error eliminando notificación:', error);
        // Fallback: eliminar localmente
        const notificacionEliminada = this.notificaciones.find(n => n.id === notificacionId);
        this.notificaciones = this.notificaciones.filter(n => n.id !== notificacionId);
        
        if (notificacionEliminada && !notificacionEliminada.leida) {
          this.actualizarContadorDesdeLista();
        }
      }
    });
  }

  // ✅ MÉTODOS AUXILIARES
  obtenerTextoAmigable(tipo: string): string {
    const textos: { [key: string]: string } = {
      'edicion_proyecto': 'Edición de Proyecto',
      'tarea_creada': 'Tarea Creada',
      'edicion_tarea': 'Edición de Tarea',
      'comentario': 'Comentario',
      'cambio_estado': 'Cambio de Estado',
      'asignacion': 'Asignación',
      'cambio_responsable': 'Cambio de Responsable',
      'tarea_eliminada': 'Tarea Eliminada',
      'archivo_subido': 'Archivo Subido',
      'fecha_limite': 'Fecha Límite',
      'invitacion_proyecto': 'Invitación a Proyecto',
      'prueba': 'Prueba del Sistema',
      'sistema': 'Sistema'
    };
    
    return textos[tipo] || tipo;
  }

  formatearFecha(fechaString: string): string {
    try {
      const fecha = new Date(fechaString);
      const ahora = new Date();
      const diffMs = ahora.getTime() - fecha.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Ahora mismo';
      if (diffMins < 60) return `Hace ${diffMins} min`;
      if (diffHours < 24) return `Hace ${diffHours} h`;
      if (diffDays < 7) return `Hace ${diffDays} d`;
      
      return fecha.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short'
      });
    } catch (error) {
      return 'Fecha inválida';
    }
  }

  // ✅ MÉTODO PARA OBTENER NOMBRE DE PROYECTO DE FORMA SEGURA
  obtenerNombreProyecto(notificacion: Notificacion): string | null {
    return notificacion.tarea?.proyecto?.nombre || null;
  }

  // ✅ MÉTODOS DE DEBUG
  crearNotificacionPrueba() {
    const usuarioId = this.authService.getCurrentUserId();
    if (!usuarioId) {
      console.warn('⚠️ No se puede crear notificación de prueba - usuario no autenticado');
      return;
    }
    
    console.log('🧪 Creando notificación de prueba...');
    this.notiService.crearNotificacionPrueba(usuarioId).subscribe({
      next: (notificacionCreada: Notificacion) => {
        console.log('✅ Notificación de prueba creada:', notificacionCreada);
        this.recargarNotificaciones();
      },
      error: (error: any) => {
        console.error('❌ Error creando notificación de prueba:', error);
      }
    });
  }

  recargarNotificaciones() {
    console.log('🔄 Recargando notificaciones...');
    this.cargarNotificaciones();
    this.cargarContadorNoLeidas();
  }
}