import { Router } from 'express';

import { commentSer } from './comentario.service.js';
import { CommentsController } from './comentarios.controller.js';



const commentsRouter = Router();
const commentsController = new CommentsController(commentSer);

// 1. Crear comentario en una tarea
// POST /api-v1/comments/:tareaId/:usuarioId
commentsRouter.post(
  '/:tareaId/:usuarioId', 
  commentsController.handleCrearComentario
);

// 2. Obtener todos los comentarios de una tarea
// GET /api-v1/comments/:tareaId/
commentsRouter.get(
  '/:tareaId', 
  commentsController.handleObtenerComentarios
);

// 3. Editar un comentario (Requiere usuarioId para validar propiedad)
// PUT /api-v1/comments/:comentarioId/:usuarioId
commentsRouter.put(
  '/:comentarioId/:usuarioId', 
  commentsController.handleEditarComentario
);

// 4. Eliminar un comentario
// DELETE /api-v1/comments/:comentarioId/:usuarioId
commentsRouter.delete(
  '/:comentarioId/:usuarioId', 
  commentsController.handleEliminarComentario
);

export default commentsRouter;