import { prisma } from "../../lib/prisma.js";

export class CommentsRepository {
  
  // Editar comentario
  async actualizarComentario(comentarioId: number, contenido: string) {
    return await prisma.comentario.update({
      data: { contenido },
      include: {
        autor: { select: { apellido: true, nombre: true } }
      },
      where: { id: comentarioId }
    });
  }

  // Crear un comentario
  async crearComentario(tareaId: string, usuarioId: string, contenido: string) {
    return await prisma.comentario.create({
      data: {
        contenido,
        tareaId,
        usuarioId,
      },
      include: {
        autor: {
          select: {
            apellido: true,
            email: true,
            id: true,
            nombre: true
          }
        }
      }
    });
  }

  async eliminarComentario(comentarioId: number) {
    return await prisma.comentario.delete({
      where: { id: comentarioId }
    });
  }

  // Obtener un comentario por ID (Útil para validar autoría antes de editar/borrar)
  async obtenerComentarioPorId(comentarioId: number) {
    return await prisma.comentario.findUnique({
      where: { id: comentarioId }
    });
  }

  async obtenerComentariosPorTarea(tareaId: string) {
    return await prisma.comentario.findMany({
      include: {
        autor: {
          select: {
            apellido: true,
            id: true,
            nombre: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc', 
      },
      where: {
        tareaId: tareaId,
      }
    });
  }
}