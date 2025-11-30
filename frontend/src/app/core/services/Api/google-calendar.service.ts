import { Injectable } from '@angular/core';
import { environment } from '../../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private CLIENT_ID = environment.googleClientId;
  private API_KEY = environment.googleApiKey;
  private SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  private tokenClient: any;
  private isInitialized = false;

  constructor() {}

  // Inicializar Google APIs
  async initializeGoogleAuth(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        // Cargar Google Identity Services
        await this.loadGoogleIdentityServices();

        // Cargar Google API Client
        await this.loadGoogleApiClient();

        // Configurar el token client
        this.tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
          client_id: this.CLIENT_ID,
          scope: this.SCOPES,
          callback: (response: any) => {
            if (response.error !== undefined) {
              reject(response);
            }
            // Token manejado automáticamente
          },
        });

        this.isInitialized = true;
        console.log(' Google Auth inicializado correctamente');
        resolve();
      } catch (error) {
        console.error(' Error inicializando Google Auth:', error);
        reject(error);
      }
    });
  }

  private loadGoogleIdentityServices(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).google?.accounts?.oauth2) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log(' Google Identity Services cargado');
        resolve();
      };
      script.onerror = () => reject(new Error('Error cargando Google Identity Services'));
      document.head.appendChild(script);
    });
  }

  private loadGoogleApiClient(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).gapi?.client) {
        console.log(' Google API Client ya cargado');
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log(' Google API Client cargado, inicializando...');
        (window as any).gapi.load('client', () => {
          (window as any).gapi.client.init({
            apiKey: this.API_KEY,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
          }).then(() => {
            console.log(' Google API Client inicializado');
            resolve();
          }).catch(reject);
        });
      };
      script.onerror = () => reject(new Error('Error cargando Google API Client'));
      document.head.appendChild(script);
    });
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Obtener token
  private getToken(): string | null {
    return localStorage.getItem('google_access_token');
  }

  // Iniciar sesión
  async signIn(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.tokenClient) {
        reject(new Error('Google Auth no inicializado'));
        return;
      }

      this.tokenClient.callback = async (response: any) => {
        if (response.error !== undefined) {
          reject(response);
          return;
        }

        // Guardar token
        localStorage.setItem('google_access_token', response.access_token);
        console.log(' Usuario autenticado');
        resolve(response);
      };

      this.tokenClient.requestAccessToken();
    });
  }

  // Cerrar sesión
  async signOut(): Promise<any> {
    const token = this.getToken();
    if (token && (window as any).google?.accounts?.oauth2) {
      (window as any).google.accounts.oauth2.revoke(token, () => {
        console.log(' Token revocado');
      });
    }
    localStorage.removeItem('google_access_token');
    console.log(' Sesión cerrada');
  }

  // Crear evento en Google Calendar
  async createEventFromTask(task: any): Promise<any> {
    if (!this.isAuthenticated()) {
      throw new Error('Usuario no autenticado');
    }

    if (!(window as any).gapi?.client?.calendar) {
      throw new Error('Google Calendar API no disponible');
    }

    const eventTitle = task.title || task.titulo || 'Tarea sin título';
    const dueDate = task.dueDate || task.fechaLimite;

    const event = {
      summary: eventTitle,
      description: this.buildEventDescription(task),
      start: {
        dateTime: dueDate ? new Date(dueDate).toISOString() : new Date().toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      end: {
        dateTime: dueDate ?
          new Date(new Date(dueDate).getTime() + 60 * 60 * 1000).toISOString() : // +1 hora
          new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    };

    try {
      const response = await (window as any).gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      console.log(' Evento creado en Google Calendar:', response.result.id);
      return response.result;
    } catch (error) {
      console.error(' Error creating calendar event:', error);
      throw error;
    }
  }

  // Obtener eventos del calendario
  async getEvents(maxResults: number = 10): Promise<any[]> {
    if (!this.isAuthenticated()) {
      return [];
    }

    if (!(window as any).gapi?.client?.calendar) {
      console.error('Google Calendar API no disponible');
      return [];
    }

    try {
      const response = await (window as any).gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: maxResults,
        orderBy: 'startTime'
      });

      return response.result.items || [];
    } catch (error) {
      console.error(' Error loading events:', error);
      return [];
    }
  }

  // Helper: Construir descripción del evento
  private buildEventDescription(task: any): string {
    let description = `Tarea: ${task.title || task.titulo}\n`;

    if (task.description) {
      description += `Descripción: ${task.description}\n`;
    }

    description += `\nSincronizado desde tu aplicación`;

    return description;
  }

  // Obtener perfil del usuario
  getCurrentUser(): any {
    // Con GIS, el perfil no está disponible directamente
    return null;
  }
  // Método para obtener información básica del usuario (opcional)
async getUserInfo(): Promise<any> {
  if (!this.isAuthenticated()) {
    return null;
  }

  try {
    // Puedes intentar obtener información del usuario desde la API de People
    // Nota: Esto requiere el scope adicional de People API
    const response = await (window as any).gapi.client.people.people.get({
      resourceName: 'people/me',
      personFields: 'names,emailAddresses'
    });

    return response.result;
  } catch (error) {
    console.log('No se pudo obtener información del usuario, usando valores por defecto');
    return {
      names: [{ displayName: 'Usuario' }],
      emailAddresses: [{ value: 'usuario@ejemplo.com' }]
    };
  }
}
}
