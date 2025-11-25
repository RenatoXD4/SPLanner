import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ColorObj, Estado, Etiqueta, MiembroProyecto, ResponsableTarea, Task, UpdateEstadoBody } from '../types/kanban-interfaces';
import { EditorJSOutputData } from '../types/block-interfaces';



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

  /*Obtener tareas por proyecto*/
  getTareasPorProyecto(proyectoId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/projects/${proyectoId}/tasks`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /*Obtener columnas/estados del tablero de un proyecto*/
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
    etiquetaIds?: number[];
    bloquesContenido?: Partial<EditorJSOutputData>[];
  }): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, data).pipe(
      catchError(this.handleError)
    );
  }

  /*Update parcial de una tarea (mover de columna, cambiar posición, etc)*/
  updateTask(taskId: string, data: Partial<Task>): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${taskId}`, data).pipe(
      catchError(this.handleError)
    );
  }

  updateTaskFull(params: {
    id: string;
    data?: Partial<Task>;
    estadoId?: number;
    proyectoId?: string;
    responsablesToAdd?: string[];
    responsablesToRemove?: string[];
    etiquetasToAdd?: number[];
    etiquetasToRemove?: number[];
  }): Observable<Task> {
    return this.http.put<Task>(
      `${this.apiUrl}/tasks/full/${params.id}`,
      params
    ).pipe(
      catchError(this.handleError)
    );
  }

  /* Eliminar una tarea */
  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tasks/${taskId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Miembros con tareas asignadas (responsables actuales)
  getMiembrosDelProyecto(proyectoId: string): Observable<ResponsableTarea[]> {
    return this.http.get<ResponsableTarea[]>(`${this.apiUrl}/proyectos/${proyectoId}/miembros`).pipe(
      catchError(this.handleError)
    );
  }

  // Todos los miembros del proyecto (para usarlos en el formulario)
  getEquipoProyecto(proyectoId: string): Observable<MiembroProyecto[]> {
    return this.http.get<MiembroProyecto[]>(`${this.apiUrl}/proyectos/${proyectoId}/equipo`).pipe(
      catchError(this.handleError)
    );
  }

  /*Obtener todas las etiquetas de un proyecto específico*/
  getAllEtiquetas(proyectoId: string): Observable<Etiqueta[]> {
    return this.http.get<Etiqueta[]>(`${this.apiUrl}/etiquetas?proyectoId=${proyectoId}`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /* Obtener etiqueta por ID (opcionalmente por proyectoId)*/
  getEtiquetaById(id: number, proyectoId?: string): Observable<Etiqueta> {
    // Construir params opcional para proyectoId
    const params = proyectoId ? { proyectoId } : undefined;

    return this.http.get<Etiqueta>(`${this.apiUrl}/etiquetas/${id}`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  /*Crear una etiqueta*/
  createEtiqueta(nombre: string, proyectoId: string, colorId: number): Observable<Etiqueta> {
    // Ajusta el body enviado al API
    const body = { nombre, proyectoId, colorId };
    return this.http.post<Etiqueta>(`${this.apiUrl}/etiquetas`, body).pipe(
      catchError(this.handleError)
    );
  }

  /*Actualizar etiqueta (por ID)*/
  updateEtiqueta(id: number, nombre: string, proyectoId: string, colorId: number): Observable<Etiqueta> {
    return this.http.put<Etiqueta>(`${this.apiUrl}/etiquetas/${id}`, { nombre, proyectoId, colorId }).pipe(
      catchError(this.handleError)
    );
  }

  /*Eliminar etiqueta (por ID)*/
  deleteEtiqueta(id: number, proyectoId: string): Observable<Etiqueta> {
    return this.http.delete<Etiqueta>(
      `${this.apiUrl}/etiquetas/${id}?proyectoId=${encodeURIComponent(proyectoId)}`
    ).pipe(
      catchError(this.handleError)
    );
  }
  /*Obtener todos los colores*/
  getAllColors(): Observable<ColorObj[]> {
    return this.http.get<ColorObj[]>(`${this.apiUrl}/colores`).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  /**
   * Obtener un color por ID
   */
  getColorById(id: number): Observable<ColorObj> {
    return this.http.get<ColorObj>(`${this.apiUrl}/colores/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Crear un nuevo color
   */
  createColor(nombre: string, codigo: string): Observable<ColorObj> {
    return this.http.post<ColorObj>(`${this.apiUrl}/colores`, { nombre, codigo }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Actualizar un color existente por ID
   */
  updateColor(id: number, nombre: string, codigo: string): Observable<ColorObj> {
    return this.http.put<ColorObj>(`${this.apiUrl}/colores/${id}`, { nombre, codigo }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Eliminar un color por ID
   */
  deleteColor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/colores/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Crear estado
  createEstado(nombre: string, posicion: number, proyectoId: string, colorId: number): Observable<Estado> {
    return this.http.post<Estado>(`${this.apiUrl}/estados`, { nombre, posicion, proyectoId, colorId }).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar estado parcialmente
  updateEstado(id: number, data: UpdateEstadoBody): Observable<Estado> {
    return this.http.patch<Estado>(`${this.apiUrl}/estados/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar estado
  deleteEstado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/estados/${id}`).pipe(
      catchError(this.handleError)
    );
  }


}
