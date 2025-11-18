// frontend/src/app/core/services/notificacion/noti.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notificacion {
  id: number;
  tipo: string;
  mensaje: string;
  leida: boolean;
  createdAt: string;
  usuarioId: string;
  tarea?: {
    id: string;
    titulo: string;
    proyecto: {
      id: string;
      nombre: string;
    };
  } | null;
}

@Injectable({
  providedIn: 'root'
})
export class NotiService {
  private apiUrl = 'http://localhost:9001/api-v1/notificaciones';

  constructor(private http: HttpClient) {}

  // ✅ OBTENER NOTIFICACIONES DEL USUARIO ACTUAL
  obtenerNotificaciones(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(this.apiUrl);
  }

  // ✅ CONTAR NOTIFICACIONES NO LEÍDAS
  contarNoLeidas(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/contar-no-leidas`);
  }

  // ✅ MARCAR NOTIFICACIÓN COMO LEÍDA
  marcarComoLeida(notificacionId: number): Observable<Notificacion> {
    return this.http.put<Notificacion>(`${this.apiUrl}/${notificacionId}/marcar-leida`, {});
  }

  // ✅ MARCAR TODAS COMO LEÍDAS
  marcarTodasComoLeidas(): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiUrl}/marcar-todas-leidas`, {});
  }

  // ✅ ELIMINAR NOTIFICACIÓN
  eliminarNotificacion(notificacionId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${notificacionId}`);
  }

  // ✅ CREAR NOTIFICACIÓN DE PRUEBA
  crearNotificacionPrueba(usuarioId: string): Observable<Notificacion> {
    return this.http.post<Notificacion>(`${this.apiUrl}/prueba`, {
      mensaje: 'Notificación de prueba del sistema SPLanner 🎉',
      tipo: 'prueba',
      usuarioId
    });
  }

  // ✅ CREAR NOTIFICACIÓN REAL
  crearNotificacionReal(data: {
    tipo: string;
    mensaje: string;
    usuarioId: string;
    tareaId?: string;
  }): Observable<Notificacion> {
    return this.http.post<Notificacion>(`${this.apiUrl}/crear`, data);
  }

  // ✅ OBTENER TODAS LAS NOTIFICACIONES (DEBUG)
  obtenerTodasNotificacionesDebug(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.apiUrl}/debug/todas`);
  }

  // ✅ VERIFICAR NOTIFICACIONES DE USUARIO ESPECÍFICO
  verificarNotificacionesUsuario(usuarioId: string): Observable<{ usuarioId: string; totalNotificaciones: number }> {
    return this.http.get<{ usuarioId: string; totalNotificaciones: number }>(
      `${this.apiUrl}/debug/usuario/${usuarioId}`
    );
  }
}