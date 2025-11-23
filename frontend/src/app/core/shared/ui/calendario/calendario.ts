import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GoogleCalendarService } from '../../../services/Api/google-calendar.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.html',
  styleUrls: ['./calendario.css']
})
export class Calendario implements OnInit {
  @Input() tasks: any[] = [];
  @Output() taskSynced = new EventEmitter<any>();

  // Nueva propiedad para controlar la visibilidad
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  isAuthenticated = false;
  isLoading = false;
  events: any[] = [];
  userProfile: any = null;

  constructor(private calendarService: GoogleCalendarService) {}

  async ngOnInit() {
    await this.loadGoogleAuth();
  }

  async loadGoogleAuth() {
    try {
      await this.calendarService.initializeGoogleAuth();
      this.isAuthenticated = this.calendarService.isAuthenticated();

      if (this.isAuthenticated) {
        this.userProfile = await this.getUserProfile();
        await this.loadEvents();
      }
    } catch (error) {
      console.error('Error loading Google Auth', error);
    }
  }

  async handleAuthClick() {
    this.isLoading = true;
    try {
      await this.calendarService.signIn();
      this.isAuthenticated = true;
      this.userProfile = await this.getUserProfile();
      await this.loadEvents();
    } catch (error) {
      console.error('Error signing in', error);
      alert('Error al conectar con Google Calendar');
    } finally {
      this.isLoading = false;
    }
  }

  async handleSignoutClick() {
    this.isLoading = true;
    try {
      await this.calendarService.signOut();
      this.isAuthenticated = false;
      this.userProfile = null;
      this.events = [];
    } catch (error) {
      console.error('Error signing out', error);
    } finally {
      this.isLoading = false;
    }
  }

  async loadEvents() {
    try {
      this.events = await this.calendarService.getEvents(5);
    } catch (error) {
      console.error('Error loading events', error);
    }
  }

  // Método para obtener información del usuario
  private async getUserProfile(): Promise<any> {
    return {
      getName: () => 'Usuario Conectado',
      getEmail: () => 'Google Calendar'
    };
  }

  async syncTaskToCalendar(task: any) {
    if (!this.isAuthenticated) {
      alert('Primero debes conectar con Google Calendar');
      return;
    }

    this.isLoading = true;
    try {
      const event = await this.calendarService.createEventFromTask(task);

      // Marcar tarea como sincronizada
      task.syncedWithCalendar = true;
      task.calendarEventId = event.id;

      this.taskSynced.emit(task);
      await this.loadEvents();

    } catch (error: any) {
      console.error('Error syncing task:', error);
      alert(`Error al sincronizar: ${error.message}`);
    } finally {
      this.isLoading = false;
    }
  }

  canSyncTask(task: any): boolean {
    const hasDueDate = !!(task.dueDate || task.fechaLimite);
    const alreadySynced = task.syncedWithCalendar;
    return hasDueDate && !alreadySynced;
  }

  getTaskStatus(task: any): string {
    const hasDueDate = !!(task.dueDate || task.fechaLimite);

    if (!hasDueDate) return 'no-date';
    if (task.syncedWithCalendar) return 'synced';
    return 'can-sync';
  }

  getTaskDueDate(task: any): string {
    const dueDate = task.dueDate || task.fechaLimite;
    if (!dueDate) return 'Sin fecha';
    return this.formatDate(dueDate);
  }

  getStatusClasses(task: any): string {
    const status = this.getTaskStatus(task);
    switch (status) {
      case 'synced':
        return 'bg-green-100 text-green-800';
      case 'can-sync':
        return 'bg-blue-100 text-blue-800';
      case 'no-date':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatDate(dateString: string, format: string = 'medium'): string {
    const date = new Date(dateString);
    if (format === 'medium') {
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (format === 'MMM d, y, h:mm a') {
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    return date.toLocaleString();
  }

  // Métodos para controlar el modal
  closeModal() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
  }

  openModal() {
    this.isOpen = true;
    this.isOpenChange.emit(true);
  }
}
