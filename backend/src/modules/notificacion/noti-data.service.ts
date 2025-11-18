// backend/src/modules/notificacion/noti-data.service.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class NotificacionDataService {
  
  /**
   * Obtener todos los miembros de un proyecto
   */
  async obtenerMiembrosProyecto(proyectoId: string): Promise<string[]> {
    try {
      const miembros = await prisma.miembro.findMany({
        where: { proyectoId },
        select: { usuarioId: true }
      });
      
      return miembros.map(m => m.usuarioId);
    } catch (error) {
      console.error('Error al obtener miembros del proyecto:', error);
      return [];
    }
  }

  /**
   * Obtener responsables de una tarea
   */
  async obtenerResponsablesTarea(tareaId: string): Promise<string[]> {
    try {
      const responsables = await prisma.responsable.findMany({
        where: { tareaId },
        select: { usuarioId: true }
      });
      
      return responsables.map(r => r.usuarioId);
    } catch (error) {
      console.error('Error al obtener responsables de tarea:', error);
      return [];
    }
  }

  /**
   * Obtener información básica de un proyecto
   */
  async obtenerProyecto(proyectoId: string): Promise<{ id: string; nombre: string } | null> {
    try {
      const proyecto = await prisma.proyectos.findUnique({
        where: { id: proyectoId },
        select: { id: true, nombre: true }
      });
      
      return proyecto;
    } catch (error) {
      console.error('Error al obtener proyecto:', error);
      return null;
    }
  }

  /**
   * Obtener información básica de una tarea
   */
  async obtenerTarea(tareaId: string): Promise<{ id: string; titulo: string; proyectoId: string } | null> {
    try {
      const tarea = await prisma.tarea.findUnique({
        where: { id: tareaId },
        select: { id: true, titulo: true, proyectoId: true }
      });
      
      return tarea;
    } catch (error) {
      console.error('Error al obtener tarea:', error);
      return null;
    }
  }

  /**
   * Obtener información básica de un usuario
   */
  async obtenerUsuario(usuarioId: string): Promise<{ id: string; nombre: string; apellido: string } | null> {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id: usuarioId },
        select: { id: true, nombre: true, apellido: true }
      });
      
      return usuario;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  }

  /**
   * Obtener usuarios únicos para notificar (miembros + responsables)
   */
  async obtenerUsuariosParaNotificar(proyectoId: string, tareaId?: string): Promise<string[]> {
    try {
      const miembrosProyecto = await this.obtenerMiembrosProyecto(proyectoId);
      
      let responsablesTarea: string[] = [];
      if (tareaId) {
        responsablesTarea = await this.obtenerResponsablesTarea(tareaId);
      }
      
      // Combinar y eliminar duplicados
      const todosUsuarios = [...miembrosProyecto, ...responsablesTarea];
      return [...new Set(todosUsuarios)];
    } catch (error) {
      console.error('Error al obtener usuarios para notificar:', error);
      return [];
    }
  }
}