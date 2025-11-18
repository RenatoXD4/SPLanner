// backend/src/modules/notificacion/noti.service.ts
import { NotificacionRepository } from "./noti.repository.js";

export class NotificacionService {
  private notificacionRepository: NotificacionRepository;

  constructor() {
    this.notificacionRepository = new NotificacionRepository();
  }

  async crearNotificacion(data: {
    tipo: string;
    mensaje: string;
    usuarioId: string;
    tareaId?: string;
  }) {
    console.log('📝 Service: Creando notificación en BD para usuario:', data.usuarioId);
    
    const notificacion = await this.notificacionRepository.crearNotificacion(data);
    console.log('✅ Service: Notificación creada con ID:', notificacion.id);
    
    return notificacion;
  }

  async obtenerNotificaciones(usuarioId: string) {
    console.log('🔍 Service: Obteniendo notificaciones para usuario:', usuarioId);
    
    const notificaciones = await this.notificacionRepository.obtenerNotificacionesPorUsuario(usuarioId);
    console.log('✅ Service: Notificaciones obtenidas:', notificaciones.length, 'para usuario:', usuarioId);
    
    return notificaciones;
  }

  async marcarComoLeida(notificacionId: number, usuarioId: string) {
    console.log('📌 Service: Marcando como leída:', notificacionId, 'para usuario:', usuarioId);
    
    const notificacion = await this.notificacionRepository.marcarComoLeida(notificacionId, usuarioId);
    console.log('✅ Service: Notificación marcada como leída para usuario:', usuarioId);
    
    return notificacion;
  }

  async marcarTodasComoLeidas(usuarioId: string) {
    console.log('📌 Service: Marcando todas como leídas para usuario:', usuarioId);
    
    const result = await this.notificacionRepository.marcarTodasComoLeidas(usuarioId);
    console.log('✅ Service: Todas las notificaciones marcadas como leídas para usuario:', usuarioId);
    
    return result;
  }

  async contarNoLeidas(usuarioId: string): Promise<number> {
    console.log('🔢 Service: Contando no leídas para usuario:', usuarioId);
    
    const count = await this.notificacionRepository.contarNoLeidas(usuarioId);
    console.log('✅ Service: No leídas contadas:', count, 'para usuario:', usuarioId);
    
    return count;
  }

  async eliminarNotificacion(notificacionId: number, usuarioId: string) {
    console.log('🗑️ Service: Eliminando notificación:', notificacionId, 'para usuario:', usuarioId);
    
    await this.notificacionRepository.eliminarNotificacion(notificacionId, usuarioId);
    console.log('✅ Service: Notificación eliminada para usuario:', usuarioId);
  }

  // ✅ MÉTODO GENÉRICO PARA NOTIFICACIONES AUTOMÁTICAS
  async notificarAccion(
    tipo: string,
    entidadId: string,
    entidadNombre: string,
    proyectoNombre: string,
    usuarioActorId: string,
    usuarioActorNombre: string,
    usuariosANotificar: string[],
    datosAdicionales?: any
  ): Promise<void> {
    try {
      console.log(`🔔 Service: Notificando acción ${tipo} para ${entidadNombre}`);
      console.log(`👤 Actor: ${usuarioActorNombre} (${usuarioActorId})`);
      console.log(`👥 Usuarios a notificar: ${usuariosANotificar.length} usuarios específicos`);
      
      const usuariosFiltrados = usuariosANotificar.filter(
        usuarioId => usuarioId !== usuarioActorId
      );

      if (usuariosFiltrados.length === 0) {
        console.log(`ℹ️ No hay usuarios para notificar en ${tipo} (solo el actor)`);
        return;
      }

      const mensajes = {
        'edicion_proyecto': `${usuarioActorNombre} editó el proyecto "${entidadNombre}"`,
        'edicion_tarea': `${usuarioActorNombre} editó la tarea "${entidadNombre}" en "${proyectoNombre}"`,
        'comentario': `${usuarioActorNombre} comentó en la tarea "${entidadNombre}" de "${proyectoNombre}"`,
        'cambio_estado': `${usuarioActorNombre} cambió el estado de "${entidadNombre}" a "${datosAdicionales?.nuevoEstado}" en "${proyectoNombre}"`,
        'asignacion': `${usuarioActorNombre} te asignó la tarea "${entidadNombre}" en "${proyectoNombre}"`,
        'cambio_responsable': `${usuarioActorNombre} cambió el responsable de "${entidadNombre}" en "${proyectoNombre}"`,
        'tarea_eliminada': `${usuarioActorNombre} eliminó la tarea "${entidadNombre}" de "${proyectoNombre}"`,
        'archivo_subido': `${usuarioActorNombre} subió un archivo a "${entidadNombre}" en "${proyectoNombre}"`,
        'tarea_creada': `${usuarioActorNombre} creó la tarea "${entidadNombre}" en "${proyectoNombre}"`,
        'invitacion_proyecto': `${usuarioActorNombre} te invitó al proyecto "${entidadNombre}"`
      };

      const mensaje = mensajes[tipo] || `${usuarioActorNombre} realizó una acción en ${entidadNombre}`;

      console.log(`💬 Mensaje de notificación: "${mensaje}"`);

      const promises = usuariosFiltrados.map(usuarioId =>
        this.crearNotificacion({
          tipo,
          mensaje,
          usuarioId,
          tareaId: tipo.includes('tarea') ? entidadId : undefined
        })
      );

      const resultados = await Promise.all(promises);
      console.log(`✅ Notificaciones de ${tipo} enviadas a ${usuariosFiltrados.length} usuarios específicos`);
      
    } catch (error: any) {
      console.error(`❌ Service: Error en notificación de ${tipo}:`, error);
      throw error;
    }
  }

  // ✅ MÉTODOS ESPECÍFICOS
  async notificarEdicionProyecto(
    proyectoId: string, 
    proyectoNombre: string, 
    editorId: string, 
    editorNombre: string, 
    miembrosProyecto: string[]
  ): Promise<void> {
    await this.notificarAccion(
      'edicion_proyecto',
      proyectoId,
      proyectoNombre,
      proyectoNombre,
      editorId,
      editorNombre,
      miembrosProyecto
    );
  }

  async notificarEdicionTarea(
    tareaId: string, 
    tareaTitulo: string, 
    proyectoNombre: string, 
    editorId: string, 
    editorNombre: string, 
    usuariosANotificar: string[]
  ): Promise<void> {
    await this.notificarAccion(
      'edicion_tarea',
      tareaId,
      tareaTitulo,
      proyectoNombre,
      editorId,
      editorNombre,
      usuariosANotificar
    );
  }

  async notificarComentarioTarea(
    tareaId: string, 
    tareaTitulo: string, 
    proyectoNombre: string, 
    autorId: string, 
    autorNombre: string, 
    usuariosANotificar: string[]
  ): Promise<void> {
    await this.notificarAccion(
      'comentario',
      tareaId,
      tareaTitulo,
      proyectoNombre,
      autorId,
      autorNombre,
      usuariosANotificar
    );
  }

  async notificarCambioEstado(
    tareaId: string, 
    tareaTitulo: string, 
    proyectoNombre: string, 
    nuevoEstado: string, 
    autorId: string, 
    autorNombre: string, 
    usuariosANotificar: string[]
  ): Promise<void> {
    await this.notificarAccion(
      'cambio_estado',
      tareaId,
      tareaTitulo,
      proyectoNombre,
      autorId,
      autorNombre,
      usuariosANotificar,
      { nuevoEstado }
    );
  }

  async notificarAsignacionTarea(
    tareaId: string, 
    tareaTitulo: string, 
    proyectoNombre: string, 
    usuarioAsignadoId: string, 
    asignadorId: string, 
    asignadorNombre: string
  ): Promise<void> {
    await this.notificarAccion(
      'asignacion',
      tareaId,
      tareaTitulo,
      proyectoNombre,
      asignadorId,
      asignadorNombre,
      [usuarioAsignadoId]
    );
  }

  async notificarCambioResponsable(
    tareaId: string, 
    tareaTitulo: string, 
    proyectoNombre: string, 
    anteriorResponsableId: string, 
    nuevoResponsableId: string, 
    autorId: string, 
    autorNombre: string, 
    otrosMiembros: string[]
  ): Promise<void> {
    const usuariosANotificar: string[] = [];

    if (anteriorResponsableId && anteriorResponsableId !== autorId) {
      usuariosANotificar.push(anteriorResponsableId);
    }

    if (nuevoResponsableId && nuevoResponsableId !== autorId) {
      usuariosANotificar.push(nuevoResponsableId);
    }

    const usuariosRestantes = otrosMiembros.filter(
      usuarioId => usuarioId !== anteriorResponsableId && 
                   usuarioId !== nuevoResponsableId && 
                   usuarioId !== autorId
    );

    usuariosANotificar.push(...usuariosRestantes);

    if (usuariosANotificar.length > 0) {
      await this.notificarAccion(
        'cambio_responsable',
        tareaId,
        tareaTitulo,
        proyectoNombre,
        autorId,
        autorNombre,
        usuariosANotificar
      );
    }
  }

  async notificarEliminacionTarea(
    tareaTitulo: string, 
    proyectoNombre: string, 
    eliminadorId: string, 
    eliminadorNombre: string, 
    usuariosANotificar: string[]
  ): Promise<void> {
    await this.notificarAccion(
      'tarea_eliminada',
      'deleted',
      tareaTitulo,
      proyectoNombre,
      eliminadorId,
      eliminadorNombre,
      usuariosANotificar
    );
  }

  async notificarSubidaArchivo(
    recursoId: string, 
    recursoNombre: string, 
    recursoTipo: 'proyecto' | 'tarea', 
    autorId: string, 
    autorNombre: string, 
    usuariosANotificar: string[]
  ): Promise<void> {
    await this.notificarAccion(
      'archivo_subido',
      recursoId,
      recursoNombre,
      recursoNombre,
      autorId,
      autorNombre,
      usuariosANotificar
    );
  }

  async notificarCreacionTarea(
    tareaId: string, 
    tareaTitulo: string, 
    proyectoId: string, 
    proyectoNombre: string, 
    creadorId: string, 
    creadorNombre: string, 
    miembrosProyecto: string[]
  ): Promise<void> {
    await this.notificarAccion(
      'tarea_creada',
      tareaId,
      tareaTitulo,
      proyectoNombre,
      creadorId,
      creadorNombre,
      miembrosProyecto
    );
  }

  async notificarInvitacionProyecto(
    proyectoId: string, 
    proyectoNombre: string, 
    invitadorId: string, 
    invitadorNombre: string, 
    usuarioInvitadoId: string
  ): Promise<void> {
    await this.notificarAccion(
      'invitacion_proyecto',
      proyectoId,
      proyectoNombre,
      proyectoNombre,
      invitadorId,
      invitadorNombre,
      [usuarioInvitadoId]
    );
  }

  async obtenerTodasNotificaciones() {
    console.log('🔍 Service: Obteniendo TODAS las notificaciones');
    const notificaciones = await this.notificacionRepository.obtenerTodasNotificaciones();
    console.log('✅ Service: Todas las notificaciones obtenidas:', notificaciones.length);
    return notificaciones;
  }
}

export const notificacionService = new NotificacionService();