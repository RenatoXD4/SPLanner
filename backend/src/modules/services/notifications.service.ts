import { prisma } from '../../lib/prisma.js';

export class NotificationService {
  
  // Contador de no leídas
  async contarNoLeidas(usuarioId: string) {
    return prisma.notificacion.count({
      where: { 
        leida: false,
        usuarioId 
      }
    });
  }

  // Crear notificaciones para todos los miembros del proyecto
async crearNotificacionesProyecto(data: {
  mensaje: string;
  proyectoId: string;
  tareaId?: string;
  tipo: string;
  usuarioCreadorId?: string;
}) {
  try {
    // Obtener información del proyecto para el mensaje
    const proyecto = await prisma.proyectos.findUnique({
      select: { nombre: true },
      where: { id: data.proyectoId }
    });

    // Obtener información de la tarea si existe
    let infoTarea = '';
    if (data.tareaId) {
      const tarea = await prisma.tarea.findUnique({
        include: {
          estado: { include: { color: true } },
          etiquetas: { include: { etiqueta: { include: { color: true } } } },
          responsables: { include: { usuario: true } }
        },
        where: { id: data.tareaId }
      });
      
      if (tarea) {
        const responsables = tarea.responsables.map(r => r.usuario.nombre).join(', ');;
        
        //  FORMATO MEJORADO Y MÁS LEGIBLE
        infoTarea =`\n Asignado a:  ${responsables || 'Sin asignar'}` 
      }
    }

    const nombreProyecto = proyecto?.nombre ?? 'Proyecto';
    
    //  MENSAJE PRINCIPAL MEJORADO
    let mensajePrincipal = '';
    switch(data.tipo) {
      case 'tarea_creada':
        mensajePrincipal = ` Nueva tarea creada en:  `;
        break;
      case 'tarea_editada':
        mensajePrincipal = ` Tarea actualizada en:  `;
        break;
      case 'tarea_eliminada':
        mensajePrincipal = ` Tarea eliminada en:  `;
        break;
      case 'tarea_por_vencer':
        mensajePrincipal = ` Tarea por vencer en: `;
        break;
      default:
        mensajePrincipal = ` Actualización en:  `;
    }

    // ESTRUCTURA COMPLETA MEJORADA
    const mensajeCompleto = 
      `${mensajePrincipal}\n` +
      ` Proyecto  ${nombreProyecto}\n`  +
      infoTarea;

    // Obtener todos los miembros del proyecto (excepto el creador si existe)
    const miembros = await prisma.miembro.findMany({
      include: { usuario: true },
      where: {
        proyectoId: data.proyectoId,
        ...(data.usuarioCreadorId ? {
          usuarioId: { not: data.usuarioCreadorId }
        } : {})
      }
    });

    // Crear notificaciones para cada miembro
    const notificaciones = miembros.map(miembro => ({
      mensaje: mensajeCompleto,
      proyectoId: data.proyectoId,
      tareaId: data.tareaId,
      tipo: data.tipo,
      usuarioId: miembro.usuarioId
    }));

    if (notificaciones.length > 0) {
      await prisma.notificacion.createMany({
        data: notificaciones
      });
    }

    return notificaciones.length;
  } catch (error) {
    console.error('Error creando notificaciones:', error);
    return 0;
  }
}

  // Marcar notificación como leída
  async marcarComoLeida(notificacionId: string, usuarioId: string) {
    return prisma.notificacion.updateMany({
      data: { leida: true },
      where: { 
        id: notificacionId,
        usuarioId 
      }
    });
  }

  // Marcar todas como leídas
  async marcarTodasLeidas(usuarioId: string) {
    return prisma.notificacion.updateMany({
      data: { leida: true },
      where: { 
        leida: false,
        usuarioId 
      }
    });
  }

  // Obtener notificaciones de un usuario
  async obtenerNotificacionesUsuario(usuarioId: string) {
  try {

    
    const notificaciones = await prisma.notificacion.findMany({
      include: {
        proyecto: {
          select: { nombre: true }
        },
        tarea: {
          select: {
            id: true,
            proyecto: {
              select: { nombre: true }
            },
            titulo: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      where: { usuarioId }
    });


    return notificaciones;
  } catch (error) {
    console.error('Error en obtenerNotificacionesUsuario:', error); //no eliminar :v
    
    throw error;
  }
}
}