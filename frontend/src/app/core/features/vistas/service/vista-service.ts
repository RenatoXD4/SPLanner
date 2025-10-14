import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthService } from '../../../services/auth-service';

export interface Usuario {
  id: string;
  nombre: string;
  apellido?: string;
  email?: string;
}

export interface Proyecto {
  id?: string;
  nombre: string;
  descripcion?: string;
  creadoPorId: string;
  createdAt?: string;
}

export interface ProyectoConUsuario extends Proyecto {
  creadoPor?: Usuario;
}

interface CreateProjectRequest {
  nombre: string;
  descripcion?: string;
  creadoPorId: string;
}

interface UpdateProjectRequest {
  nombre?: string;
  descripcion?: string;
  userId?: string;
}

interface DeleteProjectRequest {
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class VistasService {
  private apiUrl = 'http://localhost:9001/api-v1/projects';

  private proyectosSubject = new BehaviorSubject<ProyectoConUsuario[]>([]);
  proyectos$ = this.proyectosSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    });
  }

  getProyectos(): Observable<ProyectoConUsuario[]> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) throw new Error('Usuario no autenticado');

    const params = new HttpParams().set('userId', userId);

    return this.http.get<ProyectoConUsuario[]>(this.apiUrl, {
      headers: this.getHeaders(),
      params
    }).pipe(
      tap((proyectos) => {
        this.proyectosSubject.next(proyectos);
      })
    );
  }

  crearProyecto(data: CreateProjectRequest): Observable<ProyectoConUsuario> {
    return this.http.post<ProyectoConUsuario>(this.apiUrl, data, {
      headers: this.getHeaders()
    }).pipe(
      tap((nuevoProyecto) => {
        const actual = this.proyectosSubject.value;
        this.proyectosSubject.next([...actual, nuevoProyecto]);
      })
    );
  }

  editarProyecto(id: string, data: Partial<Proyecto>): Observable<ProyectoConUsuario> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) throw new Error('Usuario no autenticado');

    const updateData: UpdateProjectRequest = { ...data, userId };

    return this.http.patch<ProyectoConUsuario>(`${this.apiUrl}/${id}`, updateData, {
      headers: this.getHeaders()
    }).pipe(
      tap((proyectoEditado) => {

        const actualizados = this.proyectosSubject.value.map(p =>
          p.id === proyectoEditado.id ? proyectoEditado : p
        );
        this.proyectosSubject.next(actualizados);
      })
    );
  }

  eliminarProyecto(id: string): Observable<void> {
    const userId = this.authService.getCurrentUserId();
    if (!userId) throw new Error('Usuario no autenticado');

    const deleteData: DeleteProjectRequest = { userId };

    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
      body: deleteData
    }).pipe(
      tap(() => {

        const restantes = this.proyectosSubject.value.filter(p => p.id !== id);
        this.proyectosSubject.next(restantes);
      })
    );
  }

  get proyectosActuales(): ProyectoConUsuario[] {
    return this.proyectosSubject.value;
  }

  // Método para forzar actualización desde el componente si es necesario
  actualizarProyectosManualmente(proyectos: ProyectoConUsuario[]): void {

    this.proyectosSubject.next(proyectos);
  }
}
