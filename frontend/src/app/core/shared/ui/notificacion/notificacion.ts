import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, catchError, interval, tap, of } from 'rxjs';
import { AuthService } from '../../../services/auth-service';

export interface INotificacion {
  id: string;
  tipo: string;
  mensaje: string;
  leida: boolean;
  createdAt: string;
  tareaId?: string;
  usuarioId: string;
  tarea?: {
    id: string;
    titulo: string;
    proyecto?: {
      nombre: string;
    };
  };
  usuario?: {
    nombre: string;
    apellido: string;
  };
}

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificacion.html',
  styleUrls: ['./notificacion.css']
})
export class Notificacion implements OnInit, OnDestroy {
  notificaciones: INotificacion[] = [];
  showDropdown = false;
  unreadCount = 0;
  private refreshSubscription?: Subscription;

  // URL ABSOLUTA DEL BACKEND
  private readonly API_BASE_URL = 'http://localhost:9001/api-v1/kanban';

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadNotificaciones();
    // Refrescar notificaciones cada 30 segundos
    this.refreshSubscription = interval(30000).subscribe(() => {
      this.loadNotificaciones();
    });
  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  loadNotificaciones() {
    this.getNotificaciones().subscribe({
      next: (notificaciones) => {
        this.notificaciones = notificaciones;
        this.updateUnreadCount();
        this.cdRef.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando notificaciones:', error);
        this.toastr.error('Error al cargar notificaciones', 'Error');
        this.cdRef.detectChanges();
      }
    });
  }

  getNotificaciones(): Observable<INotificacion[]> {
    const usuarioId = this.authService.getCurrentUserId();
    if (!usuarioId) {
      console.warn('Usuario no autenticado');
      return of([]);
    }

    console.log('Solicitando notificaciones para usuario:', usuarioId);

    return this.http.get<INotificacion[]>(`${this.API_BASE_URL}/notificaciones/${usuarioId}`).pipe(
      tap(response => console.log('Notificaciones recibidas:', response)),
      catchError(error => {
        console.error('Error obteniendo notificaciones:', error);
        // Datos de ejemplo en caso de error - CORREGIDO
        const fallbackData: INotificacion[] = [
          {
            id: 'fallback-1',
            tipo: 'tarea_creada',
            mensaje: 'Sistema de notificaciones cargado',
            leida: true,
            createdAt: new Date().toISOString(),
            usuarioId: usuarioId,
            tareaId: 'task-1',
            tarea: {
              id: 'task-1',
              titulo: 'Tarea de ejemplo',
              proyecto: {
                nombre: 'Sistema'
              }
            },
            usuario: {
              nombre: 'Sistema',
              apellido: ''
            }
          }
        ];
        return of(fallbackData);
      })
    );
  }

markAllAsRead() {
  const usuarioId = this.authService.getCurrentUserId();
  if (!usuarioId) {
    this.toastr.error('Usuario no autenticado', 'Error');
    return;
  }

  const url = `http://localhost:9001/api-v1/kanban/notificaciones/marcar-todas-leidas/${usuarioId}`;


  // Marcar como leídas localmente inmediatamente
  this.notificaciones.forEach(notificacion => notificacion.leida = true);
  this.updateUnreadCount();
  this.cdRef.detectChanges();

  // Usar fetch API que funciona consistentemente
  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({})
  })
  .then(async response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  })
  .catch(error => {
    console.error(' Error con fetch:', error);
    this.toastr.info('Cambios aplicados localmente', 'Info');
  });
}

markAsRead(notificacion: INotificacion) {
  const usuarioId = this.authService.getCurrentUserId();
  if (!usuarioId || notificacion.leida) return;

  const url = `http://localhost:9001/api-v1/kanban/notificaciones/${notificacion.id}/leer`;


  // Marcar localmente primero
  notificacion.leida = true;
  this.updateUnreadCount();
  this.cdRef.detectChanges();

  fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ usuarioId })
  })
  .then(async response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

  })
  .catch(error => {
    console.error(' Error marcando notificación con fetch:', error);
  });
}


testConnection() {
  const testUrl = 'http://localhost:9001/api-v1/kanban/notificaciones/test';
  console.log(' Probando conexión a:', testUrl);

  this.http.get(testUrl).subscribe({
    next: (response) => console.log(' Conexión exitosa:', response),
    error: (error) => console.error(' Error de conexión:', error)
  });
}
  updateUnreadCount() {
    this.unreadCount = this.notificaciones.filter(notificacion => !notificacion.leida).length;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.loadNotificaciones();
    }
  }

  navigateToTask(notificacion: INotificacion) {
    if (notificacion.tareaId) {
      // Navegar a la tarea específica
      console.log('Navegar a tarea:', notificacion.tareaId);
      // Ejemplo: this.router.navigate(['/tarea', notificacion.tareaId]);
    }
    // Marcar como leída al hacer clic
    this.markAsRead(notificacion);
    this.showDropdown = false;
  }

  getNotificationIcon(tipo: string): string {
    const icons: { [key: string]: string } = {
      'tarea_creada': 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      'tarea_editada': 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      'tarea_eliminada': 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
      'tarea_por_vencer': 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      'comentario': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      'asignacion': 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
    };
    return icons[tipo] || 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
  }

  getNotificationColor(tipo: string): string {
    const colors: { [key: string]: string } = {
      'tarea_creada': 'bg-green-500/20 text-green-400',
      'tarea_editada': 'bg-blue-500/20 text-blue-400',
      'tarea_eliminada': 'bg-red-500/20 text-red-400',
      'tarea_por_vencer': 'bg-yellow-500/20 text-yellow-400',
      'comentario': 'bg-purple-500/20 text-purple-400',
      'asignacion': 'bg-indigo-500/20 text-indigo-400'
    };
    return colors[tipo] || 'bg-gray-500/20 text-gray-400';
  }

  getNotificationTypeText(tipo: string): string {
    const types: { [key: string]: string } = {
      'tarea_creada': 'Tarea Creada',
      'tarea_editada': 'Tarea Editada',
      'tarea_eliminada': 'Tarea Eliminada',
      'tarea_por_vencer': 'Tarea por Vencer',
      'comentario': 'Nuevo Comentario',
      'asignacion': 'Asignación'
    };
    return types[tipo] || 'Notificación';
  }

  formatTime(timestamp: string): string {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now.getTime() - time.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `Hace ${minutes} min`;
    if (hours < 24) return `Hace ${hours} h`;
    if (days < 7) return `Hace ${days} días`;

    return time.toLocaleDateString('es-CL');
  }
}
