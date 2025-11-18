// frontend/src/app/core/services/notificacion/proyecto.service.ts (PARTE CORREGIDA)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { NotificacionIntegrationService } from './notificacion-integration.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private apiUrl = 'http://localhost:9001/api-v1/projects';

  constructor(
    private http: HttpClient,
    private notificacionIntegration: NotificacionIntegrationService
  ) {}

  // ✅ EDITAR PROYECTO CON NOTIFICACIÓN AUTOMÁTICA INDIVIDUAL
  editarProyecto(proyectoId: string, datos: { nombre?: string; descripcion?: string }, usuarioActual: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${proyectoId}`, datos).pipe(
      tap((proyectoActualizado: any) => {
        // ✅ OBTENER MIEMBROS Y NOTIFICAR A CADA UNO INDIVIDUALMENTE
        this.obtenerMiembrosProyecto(proyectoId).subscribe({
          next: (miembros: any[]) => {
            const idsMiembros = miembros.map(miembro => miembro.usuarioId);
            
            // ✅ FILTRAR: Excluir al editor
            const usuariosANotificar = idsMiembros.filter(id => id !== usuarioActual.id);
            
            if (usuariosANotificar.length > 0) {
              console.log(`🔔 Enviando notificaciones INDIVIDUALES a:`, usuariosANotificar);
              
              this.notificacionIntegration.onProyectoEditado(
                proyectoId,           // ✅ MISMO PROYECTO_ID PARA TODOS
                proyectoActualizado.nombre,
                usuarioActual.id,
                `${usuarioActual.nombre} ${usuarioActual.apellido}`,
                usuariosANotificar    // ✅ CADA USUARIO RECIBE NOTIFICACIÓN INDIVIDUAL
              ).subscribe({
                next: () => console.log(`🔔 Notificaciones INDIVIDUALES enviadas a ${usuariosANotificar.length} usuarios`),
                error: (error: any) => console.error('❌ Error enviando notificaciones individuales:', error)
              });
            }
          }
        });
      })
    );
  }

  obtenerMiembrosProyecto(proyectoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${proyectoId}/miembros`);
  }
}