// frontend/src/app/core/services/notificacion/notificacion-integration.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionIntegrationService {
  private apiUrl = 'http://localhost:9001/api-v1/notificaciones/automatica';

  constructor(private http: HttpClient) {}

  // ✅ NOTIFICACIONES DE PROYECTOS
  onProyectoEditado(
    proyectoId: string, 
    proyectoNombre: string, 
    editorId: string, 
    editorNombre: string, 
    miembrosProyecto: string[]
  ): Observable<any> {
    console.log(`🔔 Frontend: Disparando notificación edición proyecto "${proyectoNombre}"`);
    return this.http.post(`${this.apiUrl}/edicion-proyecto`, {
      proyectoId,
      proyectoNombre,
      editorId,
      editorNombre,
      miembrosProyecto
    });
  }

  // ✅ NOTIFICACIONES DE TAREAS
  onTareaEditada(
    tareaId: string, 
    tareaTitulo: string, 
    proyectoNombre: string, 
    editorId: string, 
    editorNombre: string, 
    usuariosANotificar: string[]
  ): Observable<any> {
    console.log(`🔔 Frontend: Disparando notificación edición tarea "${tareaTitulo}"`);
    return this.http.post(`${this.apiUrl}/edicion-tarea`, {
      tareaId,
      tareaTitulo,
      proyectoNombre,
      editorId,
      editorNombre,
      usuariosANotificar
    });
  }

  onComentarioCreado(
    tareaId: string, 
    tareaTitulo: string, 
    proyectoNombre: string, 
    autorId: string, 
    autorNombre: string, 
    usuariosANotificar: string[]
  ): Observable<any> {
    console.log(`🔔 Frontend: Disparando notificación comentario en "${tareaTitulo}"`);
    return this.http.post(`${this.apiUrl}/comentario`, {
      tareaId,
      tareaTitulo,
      proyectoNombre,
      autorId,
      autorNombre,
      usuariosANotificar
    });
  }

  onEstadoCambiado(
    tareaId: string, 
    tareaTitulo: string, 
    proyectoNombre: string, 
    nuevoEstado: string, 
    autorId: string, 
    autorNombre: string, 
    usuariosANotificar: string[]
  ): Observable<any> {
    console.log(`🔔 Frontend: Disparando notificación cambio estado "${tareaTitulo}" -> "${nuevoEstado}"`);
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

  onTareaAsignada(
    tareaId: string, 
    tareaTitulo: string, 
    proyectoNombre: string, 
    usuarioAsignadoId: string, 
    asignadorId: string, 
    asignadorNombre: string
  ): Observable<any> {
    console.log(`🔔 Frontend: Disparando notificación asignación tarea "${tareaTitulo}"`);
    return this.http.post(`${this.apiUrl}/asignacion`, {
      tareaId,
      tareaTitulo,
      proyectoNombre,
      usuarioAsignadoId,
      asignadorId,
      asignadorNombre
    });
  }

  onResponsableCambiado(
    tareaId: string, 
    tareaTitulo: string, 
    proyectoNombre: string, 
    anteriorResponsableId: string, 
    nuevoResponsableId: string, 
    autorId: string, 
    autorNombre: string, 
    otrosMiembros: string[]
  ): Observable<any> {
    console.log(`🔔 Frontend: Disparando notificación cambio responsable "${tareaTitulo}"`);
    return this.http.post(`${this.apiUrl}/cambio-responsable`, {
      tareaId,
      tareaTitulo,
      proyectoNombre,
      anteriorResponsableId,
      nuevoResponsableId,
      autorId,
      autorNombre,
      otrosMiembros
    });
  }

  onTareaEliminada(
    tareaTitulo: string, 
    proyectoNombre: string, 
    eliminadorId: string, 
    eliminadorNombre: string, 
    usuariosANotificar: string[]
  ): Observable<any> {
    console.log(`🔔 Frontend: Disparando notificación eliminación tarea "${tareaTitulo}"`);
    return this.http.post(`${this.apiUrl}/eliminacion-tarea`, {
      tareaTitulo,
      proyectoNombre,
      eliminadorId,
      eliminadorNombre,
      usuariosANotificar
    });
  }

  onArchivoSubido(
    recursoId: string, 
    recursoNombre: string, 
    recursoTipo: 'proyecto' | 'tarea', 
    autorId: string, 
    autorNombre: string, 
    usuariosANotificar: string[]
  ): Observable<any> {
    console.log(`🔔 Frontend: Disparando notificación subida archivo a "${recursoNombre}"`);
    return this.http.post(`${this.apiUrl}/subida-archivo`, {
      recursoId,
      recursoNombre,
      recursoTipo,
      autorId,
      autorNombre,
      usuariosANotificar
    });
  }

  onTareaCreada(
    tareaId: string, 
    tareaTitulo: string, 
    proyectoId: string, 
    proyectoNombre: string, 
    creadorId: string, 
    creadorNombre: string, 
    miembrosProyecto: string[]
  ): Observable<any> {
    console.log(`🔔 Frontend: Disparando notificación creación tarea "${tareaTitulo}"`);
    return this.http.post(`${this.apiUrl}/creacion-tarea`, {
      tareaId,
      tareaTitulo,
      proyectoId,
      proyectoNombre,
      creadorId,
      creadorNombre,
      miembrosProyecto
    });
  }

  onInvitacionProyecto(
    proyectoId: string, 
    proyectoNombre: string, 
    invitadorId: string, 
    invitadorNombre: string, 
    usuarioInvitadoId: string
  ): Observable<any> {
    console.log(`🔔 Frontend: Disparando notificación invitación a "${proyectoNombre}"`);
    return this.http.post(`${this.apiUrl}/invitacion-proyecto`, {
      proyectoId,
      proyectoNombre,
      invitadorId,
      invitadorNombre,
      usuarioInvitadoId
    });
  }
}