// backend/src/modules/notificacion/noti.controller.ts
import { Request, Response } from 'express';
import { notificacionService } from './noti.service.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ✅ FUNCIÓN AUXILIAR PARA OBTENER USUARIO CON NOMBRE
async function obtenerUsuarioConNombre(req: Request): Promise<{id: string, nombreCompleto: string}> {
  try {
    // Obtener usuario del token JWT (ajusta según tu implementación de auth)
    const usuarioDesdeToken = (req as any).user;
    
    if (usuarioDesdeToken?.id && usuarioDesdeToken?.nombre) {
      const nombreCompleto = `${usuarioDesdeToken.nombre} ${usuarioDesdeToken.apellido || ''}`.trim();
      return {
        id: usuarioDesdeToken.id,
        nombreCompleto: nombreCompleto || usuarioDesdeToken.nombre
      };
    }

    // Fallback: buscar usuario en BD
    const usuario = await prisma.usuario.findFirst({
      select: { id: true, nombre: true, apellido: true }
    });

    if (!usuario) {
      throw new Error('No se pudo obtener usuario ID');
    }

    const nombreCompleto = `${usuario.nombre} ${usuario.apellido || ''}`.trim();
    
    return {
      id: usuario.id,
      nombreCompleto: nombreCompleto || usuario.nombre
    };
  } catch (error) {
    console.error('❌ Error obteniendo usuario ID:', error);
    throw new Error('No se pudo autenticar al usuario');
  }
}

// ✅ CONTROLADOR COMO OBJETO EXPORTADO
export const notificacionController = {
  
  // ✅ MÉTODOS COMO FUNCIONES INDEPENDIENTES
  async obtenerNotificaciones(req: Request, res: Response) {
    try {
      const usuario = await obtenerUsuarioConNombre(req);
      console.log('🔍 Controller: Obteniendo notificaciones para usuario:', usuario.nombreCompleto, `(${usuario.id})`);

      const notificaciones = await notificacionService.obtenerNotificaciones(usuario.id);
      console.log('✅ Controller: Notificaciones encontradas:', notificaciones.length, 'para usuario:', usuario.nombreCompleto);
      
      res.json(notificaciones);
    } catch (error: any) {
      console.error('❌ Controller: Error al obtener notificaciones:', error);
      res.status(500).json({ 
        error: 'Error al obtener notificaciones',
        details: error.message 
      });
    }
  },

  async marcarComoLeida(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await obtenerUsuarioConNombre(req);

      console.log('📌 Controller: Marcando como leída:', id, 'para usuario:', usuario.nombreCompleto);

      const notificacion = await notificacionService.marcarComoLeida(parseInt(id), usuario.id);
      console.log('✅ Controller: Notificación marcada como leída:', id, 'por usuario:', usuario.nombreCompleto);
      
      res.json(notificacion);
    } catch (error: any) {
      console.error('❌ Controller: Error al marcar como leída:', error);
      res.status(500).json({ 
        error: 'Error al marcar notificación como leída',
        details: error.message 
      });
    }
  },

  async marcarTodasComoLeidas(req: Request, res: Response) {
    try {
      const usuario = await obtenerUsuarioConNombre(req);
      console.log('📌 Controller: Marcando todas como leídas para usuario:', usuario.nombreCompleto);

      await notificacionService.marcarTodasComoLeidas(usuario.id);
      console.log('✅ Controller: Todas las notificaciones marcadas como leídas para usuario:', usuario.nombreCompleto);
      
      res.json({ message: 'Todas las notificaciones marcadas como leídas' });
    } catch (error: any) {
      console.error('❌ Controller: Error al marcar todas como leídas:', error);
      res.status(500).json({ 
        error: 'Error al marcar notificaciones como leídas',
        details: error.message 
      });
    }
  },

  async contarNoLeidas(req: Request, res: Response) {
    try {
      const usuario = await obtenerUsuarioConNombre(req);
      console.log('🔢 Controller: Contando no leídas para usuario:', usuario.nombreCompleto, `(${usuario.id})`);

      const count = await notificacionService.contarNoLeidas(usuario.id);
      console.log('✅ Controller: No leídas contadas:', count, 'para usuario:', usuario.nombreCompleto);
      
      res.json({ count });
    } catch (error: any) {
      console.error('❌ Controller: Error al contar no leídas:', error);
      res.status(500).json({ 
        error: 'Error al contar notificaciones no leídas',
        details: error.message 
      });
    }
  },

  async eliminarNotificacion(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await obtenerUsuarioConNombre(req);

      console.log('🗑️ Controller: Eliminando notificación:', id, 'para usuario:', usuario.nombreCompleto);

      await notificacionService.eliminarNotificacion(parseInt(id), usuario.id);
      console.log('✅ Controller: Notificación eliminada:', id, 'por usuario:', usuario.nombreCompleto);
      
      res.json({ message: 'Notificación eliminada' });
    } catch (error: any) {
      console.error('❌ Controller: Error al eliminar notificación:', error);
      res.status(500).json({ 
        error: 'Error al eliminar notificación',
        details: error.message 
      });
    }
  },

  // ✅ ENDPOINTS DE NOTIFICACIONES AUTOMÁTICAS
  async notificarEdicionProyecto(req: Request, res: Response) {
    try {
      const { proyectoId, proyectoNombre, editorId, editorNombre, miembrosProyecto } = req.body;
      
      console.log('🏗️ Controller: Notificando edición de proyecto:', proyectoNombre);
      console.log('👤 Editor:', editorNombre, `(${editorId})`);
      console.log('👥 Miembros a notificar:', miembrosProyecto.length);
      
      await notificacionService.notificarEdicionProyecto(
        proyectoId, 
        proyectoNombre, 
        editorId, 
        editorNombre, 
        miembrosProyecto
      );
      
      res.json({ 
        message: 'Notificaciones de edición de proyecto enviadas',
        usuariosNotificados: miembrosProyecto.filter((id: string) => id !== editorId).length
      });
    } catch (error: any) {
      console.error('❌ Controller: Error en notificación de proyecto:', error);
      res.status(500).json({ error: 'Error al enviar notificaciones de proyecto' });
    }
  },

  async notificarEdicionTarea(req: Request, res: Response) {
    try {
      const { tareaId, tareaTitulo, proyectoNombre, editorId, editorNombre, usuariosANotificar } = req.body;
      
      console.log('📝 Controller: Notificando edición de tarea:', tareaTitulo);
      console.log('👤 Editor:', editorNombre, `(${editorId})`);
      console.log('👥 Usuarios a notificar:', usuariosANotificar.length);
      
      await notificacionService.notificarEdicionTarea(
        tareaId, 
        tareaTitulo, 
        proyectoNombre, 
        editorId, 
        editorNombre, 
        usuariosANotificar
      );
      
      res.json({ 
        message: 'Notificaciones de edición de tarea enviadas',
        usuariosNotificados: usuariosANotificar.filter((id: string) => id !== editorId).length
      });
    } catch (error: any) {
      console.error('❌ Controller: Error en notificación de tarea:', error);
      res.status(500).json({ error: 'Error al enviar notificaciones de tarea' });
    }
  },

  async notificarComentarioTarea(req: Request, res: Response) {
    try {
      const { tareaId, tareaTitulo, proyectoNombre, autorId, autorNombre, usuariosANotificar } = req.body;
      
      console.log('💬 Controller: Notificando comentario en tarea:', tareaTitulo);
      console.log('👤 Autor:', autorNombre, `(${autorId})`);
      console.log('👥 Usuarios a notificar:', usuariosANotificar.length);
      
      await notificacionService.notificarComentarioTarea(
        tareaId, 
        tareaTitulo, 
        proyectoNombre, 
        autorId, 
        autorNombre, 
        usuariosANotificar
      );
      
      res.json({ 
        message: 'Notificaciones de comentario enviadas',
        usuariosNotificados: usuariosANotificar.filter((id: string) => id !== autorId).length
      });
    } catch (error: any) {
      console.error('❌ Controller: Error en notificación de comentario:', error);
      res.status(500).json({ error: 'Error al enviar notificaciones de comentario' });
    }
  },

  async notificarCambioEstado(req: Request, res: Response) {
    try {
      const { tareaId, tareaTitulo, proyectoNombre, nuevoEstado, autorId, autorNombre, usuariosANotificar } = req.body;
      
      console.log('🔄 Controller: Notificando cambio de estado:', tareaTitulo, '->', nuevoEstado);
      console.log('👤 Autor:', autorNombre, `(${autorId})`);
      console.log('👥 Usuarios a notificar:', usuariosANotificar.length);
      
      await notificacionService.notificarCambioEstado(
        tareaId, 
        tareaTitulo, 
        proyectoNombre, 
        nuevoEstado, 
        autorId, 
        autorNombre, 
        usuariosANotificar
      );
      
      res.json({ 
        message: 'Notificaciones de cambio de estado enviadas',
        usuariosNotificados: usuariosANotificar.filter((id: string) => id !== autorId).length
      });
    } catch (error: any) {
      console.error('❌ Controller: Error en notificación de cambio de estado:', error);
      res.status(500).json({ error: 'Error al enviar notificaciones de cambio de estado' });
    }
  },

  async notificarAsignacionTarea(req: Request, res: Response) {
    try {
      const { tareaId, tareaTitulo, proyectoNombre, usuarioAsignadoId, asignadorId, asignadorNombre } = req.body;
      
      console.log('👤 Controller: Notificando asignación de tarea:', tareaTitulo);
      console.log('🎯 Asignador:', asignadorNombre, `(${asignadorId})`);
      console.log('👤 Usuario asignado:', usuarioAsignadoId);
      
      await notificacionService.notificarAsignacionTarea(
        tareaId, 
        tareaTitulo, 
        proyectoNombre, 
        usuarioAsignadoId, 
        asignadorId, 
        asignadorNombre
      );
      
      res.json({ 
        message: 'Notificación de asignación enviada',
        usuarioNotificado: usuarioAsignadoId !== asignadorId ? usuarioAsignadoId : 'ninguno (mismo usuario)'
      });
    } catch (error: any) {
      console.error('❌ Controller: Error en notificación de asignación:', error);
      res.status(500).json({ error: 'Error al enviar notificación de asignación' });
    }
  },

  async notificarCambioResponsable(req: Request, res: Response) {
    try {
      const { tareaId, tareaTitulo, proyectoNombre, anteriorResponsableId, nuevoResponsableId, autorId, autorNombre, otrosMiembros } = req.body;
      
      console.log('🔄 Controller: Notificando cambio de responsable:', tareaTitulo);
      console.log('👤 Autor:', autorNombre, `(${autorId})`);
      console.log('👥 Anterior responsable:', anteriorResponsableId);
      console.log('👥 Nuevo responsable:', nuevoResponsableId);
      console.log('👥 Otros miembros:', otrosMiembros.length);
      
      await notificacionService.notificarCambioResponsable(
        tareaId, 
        tareaTitulo, 
        proyectoNombre, 
        anteriorResponsableId, 
        nuevoResponsableId, 
        autorId, 
        autorNombre, 
        otrosMiembros
      );
      
      res.json({ message: 'Notificaciones de cambio de responsable enviadas' });
    } catch (error: any) {
      console.error('❌ Controller: Error en notificación de cambio de responsable:', error);
      res.status(500).json({ error: 'Error al enviar notificaciones de cambio de responsable' });
    }
  },

  async notificarEliminacionTarea(req: Request, res: Response) {
    try {
      const { tareaTitulo, proyectoNombre, eliminadorId, eliminadorNombre, usuariosANotificar } = req.body;
      
      console.log('🗑️ Controller: Notificando eliminación de tarea:', tareaTitulo);
      console.log('👤 Eliminador:', eliminadorNombre, `(${eliminadorId})`);
      console.log('👥 Usuarios a notificar:', usuariosANotificar.length);
      
      await notificacionService.notificarEliminacionTarea(
        tareaTitulo, 
        proyectoNombre, 
        eliminadorId, 
        eliminadorNombre, 
        usuariosANotificar
      );
      
      res.json({ 
        message: 'Notificaciones de eliminación enviadas',
        usuariosNotificados: usuariosANotificar.filter((id: string) => id !== eliminadorId).length
      });
    } catch (error: any) {
      console.error('❌ Controller: Error en notificación de eliminación:', error);
      res.status(500).json({ error: 'Error al enviar notificaciones de eliminación' });
    }
  },

  async notificarSubidaArchivo(req: Request, res: Response) {
    try {
      const { recursoId, recursoNombre, recursoTipo, autorId, autorNombre, usuariosANotificar } = req.body;
      
      console.log('📎 Controller: Notificando subida de archivo:', recursoNombre);
      console.log('👤 Autor:', autorNombre, `(${autorId})`);
      console.log('👥 Usuarios a notificar:', usuariosANotificar.length);
      
      await notificacionService.notificarSubidaArchivo(
        recursoId, 
        recursoNombre, 
        recursoTipo, 
        autorId, 
        autorNombre, 
        usuariosANotificar
      );
      
      res.json({ 
        message: 'Notificaciones de subida de archivo enviadas',
        usuariosNotificados: usuariosANotificar.filter((id: string) => id !== autorId).length
      });
    } catch (error: any) {
      console.error('❌ Controller: Error en notificación de archivo:', error);
      res.status(500).json({ error: 'Error al enviar notificaciones de archivo' });
    }
  },

  async notificarCreacionTarea(req: Request, res: Response) {
    try {
      const { tareaId, tareaTitulo, proyectoId, proyectoNombre, creadorId, creadorNombre, miembrosProyecto } = req.body;
      
      console.log('📋 Controller: Notificando creación de tarea:', tareaTitulo);
      console.log('👤 Creador:', creadorNombre, `(${creadorId})`);
      console.log('👥 Miembros a notificar:', miembrosProyecto.length);
      
      await notificacionService.notificarCreacionTarea(
        tareaId, 
        tareaTitulo, 
        proyectoId, 
        proyectoNombre, 
        creadorId, 
        creadorNombre, 
        miembrosProyecto
      );
      
      res.json({ 
        message: 'Notificaciones de creación de tarea enviadas',
        usuariosNotificados: miembrosProyecto.filter((id: string) => id !== creadorId).length
      });
    } catch (error: any) {
      console.error('❌ Controller: Error en notificación de creación de tarea:', error);
      res.status(500).json({ error: 'Error al enviar notificaciones de creación de tarea' });
    }
  },

  async notificarInvitacionProyecto(req: Request, res: Response) {
    try {
      const { proyectoId, proyectoNombre, invitadorId, invitadorNombre, usuarioInvitadoId } = req.body;
      
      console.log('📨 Controller: Notificando invitación a proyecto:', proyectoNombre);
      console.log('👤 Invitador:', invitadorNombre, `(${invitadorId})`);
      console.log('👤 Usuario invitado:', usuarioInvitadoId);
      
      await notificacionService.notificarInvitacionProyecto(
        proyectoId, 
        proyectoNombre, 
        invitadorId, 
        invitadorNombre, 
        usuarioInvitadoId
      );
      
      res.json({ message: 'Notificación de invitación enviada' });
    } catch (error: any) {
      console.error('❌ Controller: Error en notificación de invitación:', error);
      res.status(500).json({ error: 'Error al enviar notificación de invitación' });
    }
  },

  async crearNotificacionPrueba(req: Request, res: Response) {
    try {
      const usuario = await obtenerUsuarioConNombre(req);
      const { mensaje, tipo } = req.body;
      
      const mensajeFinal = mensaje || '¡Notificación de prueba del sistema!';
      const tipoFinal = tipo || 'prueba';

      console.log('🧪 Controller: Creando notificación de prueba para usuario:', usuario.nombreCompleto);

      const notificacion = await notificacionService.crearNotificacion({
        tipo: tipoFinal,
        mensaje: mensajeFinal,
        usuarioId: usuario.id
      });
      
      res.json(notificacion);
    } catch (error: any) {
      console.error('❌ Controller: Error al crear notificación de prueba:', error);
      res.status(500).json({ 
        error: 'Error al crear notificación de prueba',
        details: error.message 
      });
    }
  },

  async obtenerTodasNotificaciones(req: Request, res: Response) {
    try {
      console.log('🔍 Controller: Obteniendo TODAS las notificaciones del sistema');
      const notificaciones = await notificacionService.obtenerTodasNotificaciones();
      console.log('✅ Controller: Total notificaciones en sistema:', notificaciones.length);
      res.json(notificaciones);
    } catch (error: any) {
      console.error('❌ Controller: Error obteniendo todas las notificaciones:', error);
      res.status(500).json({ 
        error: 'Error obteniendo todas las notificaciones',
        details: error.message 
      });
    }
  }
};