import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: string;
  nombre: string;
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

@Injectable({
  providedIn: 'root'
})
export class VistasService {
  private apiUrl = 'http://localhost:9001/api-v1/projects';

  constructor(private http: HttpClient) {}

  getProyectos(): Observable<ProyectoConUsuario[]> {
    return this.http.get<ProyectoConUsuario[]>(this.apiUrl);
  }

  crearProyecto(data: Partial<Proyecto>): Observable<ProyectoConUsuario> {
    return this.http.post<ProyectoConUsuario>(this.apiUrl, data);
  }

  editarProyecto(id: string, data: Partial<Proyecto>): Observable<ProyectoConUsuario> {
    return this.http.patch<ProyectoConUsuario>(`${this.apiUrl}/${id}`, data);
  }

  eliminarProyecto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
