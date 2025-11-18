// backend/src/modules/notificacion/noti.repository.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class NotificacionRepository {
  
  async crearNotificacion(data: {
    tipo: string;
    mensaje: string;
    usuarioId: string;  // ✅ INDIVIDUAL POR USUARIO
    tareaId?: string;   // ✅ PUEDEN COMPARTIR TAREA_ID
  }) {
    try {
      console.log('📝 Repository: Creando notificación INDIVIDUAL para usuario:', data.usuarioId);
      
      const notificacion = await prisma.notificacion.create({
        data: {
          tipo: data.tipo,
          mensaje: data.mensaje,
          usuarioId: data.usuarioId,  // ✅ CADA USUARIO TIENE SU NOTIFICACIÓN
          tareaId: data.tareaId,      // ✅ PERO PUEDEN COMPARTIR LA MISMA TAREA
          leida: false,
        },
      });

      console.log('✅ Repository: Notificación INDIVIDUAL creada para usuario:', data.usuarioId, 'con tareaId:', data.tareaId);
      return notificacion;
    } catch (error) {
      console.error('❌ Repository: Error creando notificación individual:', error);
      throw error;
    }
  }

  async obtenerNotificacionesPorUsuario(usuarioId: string) {
    try {
      console.log('🔍 Repository: Buscando notificaciones INDIVIDUALES para usuario:', usuarioId);
      
      const notificaciones = await prisma.notificacion.findMany({
        where: { 
          usuarioId: usuarioId  // ✅ SOLO LAS DEL USUARIO ESPECÍFICO
        },
        include: {
          tarea: {
            include: {
              proyecto: {
                select: {
                  id: true,
                  nombre: true
                }
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      console.log('✅ Repository: Notificaciones INDIVIDUALES encontradas:', notificaciones.length, 'para usuario:', usuarioId);
      return notificaciones;
    } catch (error) {
      console.error('❌ Repository: Error obteniendo notificaciones individuales:', error);
      throw error;
    }
  }

  async marcarComoLeida(notificacionId: number, usuarioId: string) {
    try {
      console.log('📌 Repository: Marcando como leída NOTIFICACIÓN INDIVIDUAL, ID:', notificacionId, 'para usuario:', usuarioId);
      
      // ✅ VERIFICAR QUE LA NOTIFICACIÓN PERTENECE AL USUARIO
      const notificacion = await prisma.notificacion.update({
        where: { 
          id: notificacionId,
          usuarioId: usuarioId  // ✅ SEGURIDAD: Solo notificaciones del usuario
        },
        data: { leida: true },
      });

      console.log('✅ Repository: Notificación INDIVIDUAL marcada como leída para usuario:', usuarioId);
      return notificacion;
    } catch (error) {
      console.error('❌ Repository: Error marcando notificación individual como leída:', error);
      throw new Error('Notificación no encontrada o no pertenece al usuario');
    }
  }

  async marcarTodasComoLeidas(usuarioId: string) {
    try {
      console.log('📌 Repository: Marcando TODAS como leídas para usuario INDIVIDUAL:', usuarioId);
      
      const result = await prisma.notificacion.updateMany({
        where: { 
          usuarioId: usuarioId,  // ✅ SOLO DEL USUARIO ACTUAL
          leida: false 
        },
        data: { leida: true },
      });

      console.log('✅ Repository: Notificaciones INDIVIDUALES marcadas como leídas. Actualizadas:', result.count, 'para usuario:', usuarioId);
      return result;
    } catch (error) {
      console.error('❌ Repository: Error marcando todas como leídas individuales:', error);
      throw error;
    }
  }

  async contarNoLeidas(usuarioId: string) {
    try {
      console.log('🔢 Repository: Contando no leídas INDIVIDUALES para usuario:', usuarioId);
      
      const count = await prisma.notificacion.count({
        where: { 
          usuarioId: usuarioId,  // ✅ SOLO DEL USUARIO ACTUAL
          leida: false 
        },
      });

      console.log('✅ Repository: No leídas INDIVIDUALES contadas:', count, 'para usuario:', usuarioId);
      return count;
    } catch (error) {
      console.error('❌ Repository: Error contando no leídas individuales:', error);
      throw error;
    }
  }

  async eliminarNotificacion(notificacionId: number, usuarioId: string) {
    try {
      console.log('🗑️ Repository: Eliminando notificación INDIVIDUAL:', notificacionId, 'para usuario:', usuarioId);
      
      // ✅ VERIFICAR QUE LA NOTIFICACIÓN PERTENECE AL USUARIO
      await prisma.notificacion.delete({
        where: { 
          id: notificacionId,
          usuarioId: usuarioId  // ✅ SEGURIDAD: Solo notificaciones del usuario
        },
      });

      console.log('✅ Repository: Notificación INDIVIDUAL eliminada para usuario:', usuarioId);
    } catch (error) {
      console.error('❌ Repository: Error eliminando notificación individual:', error);
      throw new Error('Notificación no encontrada o no pertenece al usuario');
    }
  }
}