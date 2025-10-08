import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  avatarUrl?: string;
}

interface MiembroProyecto {
  usuario: Usuario;
  rol: any;
}

export interface Responsable {
  usuario: Usuario;
}

export interface Etiqueta {
  id: number;
  nombre: string;
}

export interface BloqueContenido {
  id: string;
  tipo: 'PARAGRAPH' | 'HEADING_1' | 'HEADING_2' | 'CHECKLIST' | 'IMAGE' | 'CODE';
  contenido: string;
  posicion: number;
}

export interface Task {
  id: string;
  titulo?: string;
  fechaLimite?: string;
  posicion: number;
  createdAt: string;
  estadoId: number;
  proyectoId: string;

  // Relaciones
  responsables?: Responsable[];
  etiquetas?: Etiqueta[];
  bloquesContenido?: BloqueContenido[];

  // Campos adicionales opcionales para el frontend
  priority?: string;
  description?: string;
}

export interface Estado {
  id: number;
  nombre: string;
  posicion: number;
  proyectoId: string;
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {

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

  /**
   * Obtener tareas por proyecto
   * Cambiado a ruta RESTful del backend
   */
  getTareasPorProyecto(proyectoId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/projects/${proyectoId}/tasks`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Obtener columnas/estados del tablero de un proyecto
   */
  getEstadosDelProyecto(proyectoId: string): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.apiUrl}/estados/${proyectoId}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Crear una nueva tarea
   * payload debe incluir: titulo, estadoId, proyectoId, responsablesIds[], posicion, etc.
   */
  createTask(data: Partial<Task> & {
    responsablesIds?: string[];
    etiquetaIds?: number[]; // corregido de etiquetasIds a etiquetaIds para coherencia con backend
    bloquesContenido?: Partial<BloqueContenido>[];
  }): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, data).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Update parcial de una tarea (mover de columna, cambiar posición, etc)
   * Usamos PATCH y URL correcta
   */
  updateTask(taskId: string, data: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${taskId}`, data).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Eliminar una tarea
   */
  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${taskId}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * (Opcional) Reordenar varias tareas en una columna
   * No implementado en backend aún, eliminar o comentar por ahora
   */
  // reordenarTareas(tareas: { id: string; posicion: number }[]): Observable<void> {
  //   return this.http.post<void>(`${this.apiUrl}/tasks/reordenar`, { tareas }).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  // Miembros con tareas asignadas (responsables actuales)
  getMiembrosDelProyecto(proyectoId: string): Observable<Responsable[]> {
    return this.http.get<Responsable[]>(`${this.apiUrl}/proyectos/${proyectoId}/miembros`).pipe(
      catchError(this.handleError)
    );
  }

  // Todos los miembros del proyecto (para usarlos en el formulario)
  getEquipoProyecto(proyectoId: string): Observable<MiembroProyecto[]> {
    return this.http.get<MiembroProyecto[]>(`${this.apiUrl}/proyectos/${proyectoId}/equipo`).pipe(
      catchError(this.handleError)
    );
  }



}
