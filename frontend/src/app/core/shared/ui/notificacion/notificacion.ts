import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, interval } from 'rxjs';

export interface Notificacion {
  id: number;
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
  @ViewChild('dropdownTemplate', { read: TemplateRef }) dropdownTemplate!: TemplateRef<any>;
  notificaciones: Notificacion[] = [];
  showDropdown = false;
  unreadCount = 0;
  private refreshSubscription?: Subscription;

   constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private viewContainerRef: ViewContainerRef
  ) {}
  private dropdownView: any;

  ngOnInit() {
    this.loadNotificaciones();
    // Refrescar notificaciones cada 30 segundos
    this.refreshSubscription = interval(30000).subscribe(() => {
      this.loadNotificaciones();
    });
  }

  ngOnDestroy() {
    if (this.dropdownView) {
      this.dropdownView.destroy();
    }
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  loadNotificaciones() {
    this.getNotificaciones().subscribe({
      next: (notificaciones) => {
        this.notificaciones = notificaciones;
        this.updateUnreadCount();
      },
      error: (error) => {
        console.error('Error cargando notificaciones:', error);
        this.toastr.error('Error al cargar notificaciones', 'Error');
      }
    });
  }

  getNotificaciones(): Observable<Notificacion[]> {
    // TODO: Reemplazar con tu endpoint real
    return this.http.get<Notificacion[]>('/api/notificaciones');
  }

  markAsRead(notificacion: Notificacion) {
    if (!notificacion.leida) {
      this.http.patch(`/api/notificaciones/${notificacion.id}/leer`, {})
        .subscribe({
          next: () => {
            notificacion.leida = true;
            this.updateUnreadCount();
          },
          error: (error) => {
            console.error('Error marcando notificación como leída:', error);
          }
        });
    }
  }

  markAllAsRead() {
    this.http.patch('/api/notificaciones/marcar-todas-leidas', {})
      .subscribe({
        next: () => {
          this.notificaciones.forEach(notificacion => notificacion.leida = true);
          this.updateUnreadCount();
          this.toastr.success('Todas las notificaciones marcadas como leídas');
        },
        error: (error) => {
          console.error('Error marcando todas como leídas:', error);
          this.toastr.error('Error al marcar notificaciones como leídas');
        }
      });
  }

  updateUnreadCount() {
    this.unreadCount = this.notificaciones.filter(notificacion => !notificacion.leida).length;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;

    if (this.showDropdown) {
      // Crear el dropdown en el body
      this.dropdownView = this.viewContainerRef.createEmbeddedView(this.dropdownTemplate);
      this.dropdownView.detectChanges();
    } else {
      // Destruir el dropdown
      if (this.dropdownView) {
        this.dropdownView.destroy();
        this.dropdownView = null;
      }
    }
  }

  getNotificationIcon(tipo: string): string {
    const icons: { [key: string]: string } = {
      tarea_creada: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      tarea_editada: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      tarea_eliminada: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
      tarea_por_vencer: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      comentario: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      asignacion: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
    };
    return icons[tipo] || 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
  }

  getNotificationColor(tipo: string): string {
    const colors: { [key: string]: string } = {
      tarea_creada: 'text-green-500 bg-green-100',
      tarea_editada: 'text-blue-500 bg-blue-100',
      tarea_eliminada: 'text-red-500 bg-red-100',
      tarea_por_vencer: 'text-yellow-500 bg-yellow-100',
      comentario: 'text-purple-500 bg-purple-100',
      asignacion: 'text-indigo-500 bg-indigo-100'
    };
    return colors[tipo] || 'text-gray-500 bg-gray-100';
  }

  getNotificationTypeText(tipo: string): string {
    const types: { [key: string]: string } = {
      tarea_creada: 'Tarea Creada',
      tarea_editada: 'Tarea Editada',
      tarea_eliminada: 'Tarea Eliminada',
      tarea_por_vencer: 'Tarea por Vencer',
      comentario: 'Nuevo Comentario',
      asignacion: 'Asignación'
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

  navigateToTask(notificacion: Notificacion) {
    if (notificacion.tareaId) {
      // TODO: Navegar a la tarea específica
      console.log('Navegar a tarea:', notificacion.tareaId);
      // Ejemplo: this.router.navigate(['/tarea', notificacion.tareaId]);
    }
  }
}
