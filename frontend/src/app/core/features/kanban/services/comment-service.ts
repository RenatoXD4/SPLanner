import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../Environments/environment';
import { Observable } from 'rxjs';
import { Comentario } from '../types/comment-interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/comments`; 

  // 1. Obtener comentarios
  getComments(tareaId: string): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/${tareaId}`);
  }

  // 2. Crear comentario (POST /:tareaId/:usuarioId)
  createComment(tareaId: string, usuarioId: string, contenido: string): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.apiUrl}/${tareaId}/${usuarioId}`, { contenido });
  }

  // 3. Editar comentario (PUT /:comentarioId/:usuarioId)
  updateComment(comentarioId: number, usuarioId: string, contenido: string): Observable<Comentario> {
    return this.http.put<Comentario>(`${this.apiUrl}/${comentarioId}/${usuarioId}`, { contenido });
  }

  // 4. Eliminar comentario (DELETE /:comentarioId/:usuarioId)
  deleteComment(comentarioId: number, usuarioId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${comentarioId}/${usuarioId}`);
  }
}
