import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionIntegrationService {
  private apiUrl = 'http://localhost:9001/api-v1/notificaciones/automatica';

  constructor(private http: HttpClient) {}

  // Métodos para ser llamados desde otros servicios

  onProyectoEditado(proyectoId: string, proyectoNombre: string, editorId: string, editorNombre: string, miembrosProyecto: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/edicion-proyecto`, {
      proyectoId,
      proyectoNombre,
      editorId,
      editorNombre,
      miembrosProyecto
    });
  }

  onTareaEditada(tareaId: string, tareaTitulo: string, proyectoNombre: string, editorId: string, editorNombre: string, usuariosANotificar: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/edicion-tarea`, {
      tareaId,
      tareaTitulo,
      proyectoNombre,
      editorId,
      editorNombre,
      usuariosANotificar
    });
  }

  onComentarioCreado(tareaId: string, tareaTitulo: string, proyectoNombre: string, autorId: string, autorNombre: string, usuariosANotificar: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/comentario`, {
      tareaId,
      tareaTitulo,
      proyectoNombre,
      autorId,
      autorNombre,
      usuariosANotificar
    });
  }

  onEstadoCambiado(tareaId: string, tareaTitulo: string, proyectoNombre: string, nuevoEstado: string, autorId: string, autorNombre: string, usuariosANotificar: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/cambio-estado`, {
      tareaId,
      tareaTitulo,
      proyectoNombre,
      nuevoEstado,
      autorId,
      autorNombre,
      usuariosANotificar
    });
  }

  onTareaAsignada(tareaId: string, tareaTitulo: string, proyectoNombre: string, usuarioAsignadoId: string, asignadorId: string, asignadorNombre: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/asignacion`, {
      tareaId,
      tareaTitulo,
      proyectoNombre,
      usuarioAsignadoId,
      asignadorId,
      asignadorNombre
    });
  }

  onTareaEliminada(tareaTitulo: string, proyectoNombre: string, eliminadorId: string, eliminadorNombre: string, usuariosANotificar: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/eliminacion-tarea`, {
      tareaTitulo,
      proyectoNombre,
      eliminadorId,
      eliminadorNombre,
      usuariosANotificar
    });
  }

  onArchivoSubido(recursoId: string, recursoNombre: string, recursoTipo: 'proyecto' | 'tarea', autorId: string, autorNombre: string, usuariosANotificar: string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/subida-archivo`, {
      recursoId,
      recursoNombre,
      recursoTipo,
      autorId,
      autorNombre,
      usuariosANotificar
    });
  }
}