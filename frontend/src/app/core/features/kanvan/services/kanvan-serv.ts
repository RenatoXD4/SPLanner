// services/kanvan-serv.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Task {
  id: string;
  titulo: string;
  posicion: number;
  createdAt: string;
  proyectoId: string;
  estadoId: number;
  fechaLimite: string;
}

export interface Estado {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class KanvanServ {

  private apiUrl = 'http://localhost:9001/api-v1/kanban';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error && typeof error.error === 'object' && 'message' in error.error) {
      console.error('Error detallado:', error.error.message);
    } else {
      console.error(`Backend retornó código ${error.status}, cuerpo del error:`, error.error);
    }
    return throwError(() => new Error('Error en la comunicación con el servidor, intente nuevamente.'));
  }

  getTareas(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  createTask(data: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método para actualización parcial (update parcial)
  updateTask(taskId: string, data: Partial<Task>): Observable<Task> {
    // Esta llamada debe coincidir con PUT /tasks/:id en backend
    return this.http.put<Task>(`${this.apiUrl}/tasks/${taskId}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${taskId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Nuevo método para obtener estados por proyectoId
  getEstadosDelProyecto(proyectoId: string): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.apiUrl}/estados/${proyectoId}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
