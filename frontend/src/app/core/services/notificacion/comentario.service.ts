// frontend/src/app/core/services/notificacion/comentario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap } from 'rxjs';
import { NotificacionIntegrationService } from './notificacion-integration.service';

export interface Comentario {
  id: number;
  contenido: string;
  usuarioId: string;
  tareaId: string;
  autor: UsuarioComentario;
  createdAt: string;
}

export interface UsuarioComentario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
}

export interface TareaComentario {
  id: string;
  titulo: string;
  proyecto: {
    id: string;
    nombre: string;
    miembros: any[];
  };
  responsables: any[];
  comentarios: Comentario[];
}

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private apiUrl = 'http://localhost:9001/api-v1';

  constructor(
    private http: HttpClient,
    private notificacionIntegration: NotificacionIntegrationService
  ) {}

  // ✅ OBTENER COMENTARIOS DE TAREA
  obtenerComentariosTarea(tareaId: string): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/tareas/${tareaId}/comentarios`);
  }

  // ✅ CREAR COMENTARIO CON NOTIFICACIÓN AUTOMÁTICA
  crearComentario(tareaId: string, contenido: string, usuarioActual: UsuarioComentario): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/tareas/${tareaId}/comentarios`, { contenido }).pipe(
      switchMap((nuevoComentario: any) => {
        return this.obtenerTareaCompleta(tareaId).pipe(
          tap((tareaCompleta: TareaComentario) => {
            // ✅ USUARIOS A NOTIFICAR: 
            // - Responsables de la tarea
            // - Otros que hayan comentado
            const idsResponsables = tareaCompleta.responsables.map((r: any) => r.usuarioId);
            const idsComentaristas = tareaCompleta.comentarios.map((c: Comentario) => c.usuarioId);
            
            // ✅ COMBINAR Y ELIMINAR DUPLICADOS, EXCLUIR AL AUTOR
            const usuariosANotificar = [...new Set([...idsResponsables, ...idsComentaristas])]
              .filter(usuarioId => usuarioId !== usuarioActual.id);

            if (usuariosANotificar.length > 0) {
              this.notificacionIntegration.onComentarioCreado(
                tareaId,
                tareaCompleta.titulo,
                tareaCompleta.proyecto.nombre,
                usuarioActual.id,
                `${usuarioActual.nombre} ${usuarioActual.apellido}`,
                usuariosANotificar
              ).subscribe({
                next: () => console.log(`🔔 Notificaciones de comentario enviadas a ${usuariosANotificar.length} usuarios`),
                error: (error: any) => console.error('Error enviando notificaciones:', error)
              });
            }
          })
        );
      })
    );
  }

  // ✅ ELIMINAR COMENTARIO
  eliminarComentario(tareaId: string, comentarioId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tareas/${tareaId}/comentarios/${comentarioId}`);
  }

  // ✅ EDITAR COMENTARIO
  editarComentario(tareaId: string, comentarioId: number, contenido: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/tareas/${tareaId}/comentarios/${comentarioId}`, { contenido });
  }

  // ✅ MÉTODO AUXILIAR MEJORADO
  private obtenerTareaCompleta(tareaId: string): Observable<TareaComentario> {
    return this.http.get<TareaComentario>(`http://localhost:9001/api-v1/kanban/${tareaId}`);
  }
}