import { Request, Response } from 'express';

import { CommentsService } from "./comentario.service.js";

export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  // POST: Crear comentario
  public handleCrearComentario = async (req: Request, res: Response) => {
    try {
      const { tareaId, usuarioId } = req.params;
      const { contenido }  = req.body as { contenido: string };

      const nuevoComentario = await this.commentsService.agregarComentario(tareaId, usuarioId, contenido);
      
      return res.status(201).json(nuevoComentario);
    } catch (error: unknown) {
      console.error('Error al crear comentario:', error);
      
      let message = 'Error al crear comentario';
      if (error instanceof Error) {
        message = error.message;
      }

      return res.status(400).json({ message });
    }
  }

  // PUT: Editar comentario
  public handleEditarComentario = async (req: Request, res: Response) => {
    try {
      // Nota: comentarioId viene como string en params, hay que convertirlo a Int
      const comentarioId = parseInt(req.params.comentarioId); 
      const { usuarioId } = req.params; // Necesitamos saber quién intenta editar
      const { contenido } = req.body as { contenido: string };

      if (isNaN(comentarioId)) {
        return res.status(400).json({ message: 'ID de comentario inválido' });
      }

      const comentarioActualizado = await this.commentsService.editarComentario(comentarioId, usuarioId, contenido);
      return res.status(200).json(comentarioActualizado);

    } catch (error: unknown) {
      let errorMessage = 'Error al editar';

        if (error instanceof Error) {
            errorMessage = error.message;
        } 
        else if (typeof error === 'string') {
            errorMessage = error;
        }

        console.error('Error capturado:', error);

        if (errorMessage.includes('No tienes permiso')) {
            return res.status(403).json({ message: errorMessage });
        }

        return res.status(500).json({ message: errorMessage });
    }
  }

  // DELETE: Eliminar comentario
  public handleEliminarComentario = async (req: Request, res: Response) => {
    try {
      const comentarioId = parseInt(req.params.comentarioId);
      const { usuarioId } = req.params;

      if (isNaN(comentarioId)) {
        return res.status(400).json({ message: 'ID de comentario inválido' });
      }

      await this.commentsService.borrarComentario(comentarioId, usuarioId);
      return res.status(200).json({ message: 'Comentario eliminado correctamente' });

    } catch (error: unknown) {
        let errorMessage = 'Error al eliminar';

        if (error instanceof Error) {
            errorMessage = error.message;
        } 
        else if (typeof error === 'string') {
            errorMessage = error;
        }

        console.error('Error capturado:', error);

        if (errorMessage.includes('No tienes permiso')) {
            return res.status(403).json({ message: errorMessage });
        }

        return res.status(500).json({ message: errorMessage });
    }
  }

  // GET: Listar comentarios de una tarea
  public handleObtenerComentarios = async (req: Request, res: Response) => {
    try {
      const { tareaId } = req.params;
      const comentarios = await this.commentsService.listarComentarios(tareaId);
      
      return res.status(200).json(comentarios);
    } catch (error: unknown) {
      console.error('Error al obtener comentarios:', error);
      return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}