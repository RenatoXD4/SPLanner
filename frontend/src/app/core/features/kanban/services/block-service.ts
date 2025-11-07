import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditorJSOutputData } from '../types/block-interfaces';
import { environment } from '../../../../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  private http = inject(HttpClient)

  private apiUrl = `${environment.apiUrl}/blocks`;

  obtenerBloquesDeTarea(tareaId: string): Observable<EditorJSOutputData> {
    return this.http.get<EditorJSOutputData>(`${this.apiUrl}/${tareaId}/blocks`);
  }

  actualizarBloquesDeTarea(tareaId: string, data: EditorJSOutputData): Observable<EditorJSOutputData> {
    return this.http.put<EditorJSOutputData>(`${this.apiUrl}/${tareaId}/blocks`, data);
  }
}
