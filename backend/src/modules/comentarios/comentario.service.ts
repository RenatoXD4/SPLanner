import { CommentsRepository } from "./comentario.repository.js";

export class CommentsService {

    private commentsRepository: CommentsRepository;

    constructor() {
        this.commentsRepository = new CommentsRepository();
    }

  async agregarComentario(tareaId: string, usuarioId: string, contenido: string) {
    if (!contenido || contenido.trim() === '') {
      throw new Error('El contenido del comentario no puede estar vacío.');
    }
    return await this.commentsRepository.crearComentario(tareaId, usuarioId, contenido);
  }

  async borrarComentario(comentarioId: number, usuarioId: string) {
    const comentario = await this.commentsRepository.obtenerComentarioPorId(comentarioId);
    
    if (!comentario) {
      throw new Error('Comentario no encontrado');
    }

    if (comentario.usuarioId !== usuarioId) {
      throw new Error('No tienes permiso para eliminar este comentario');
    }

    return await this.commentsRepository.eliminarComentario(comentarioId);
  }

  async editarComentario(comentarioId: number, usuarioId: string, nuevoContenido: string) {
    const comentario = await this.commentsRepository.obtenerComentarioPorId(comentarioId);
    
    if (!comentario) {
      throw new Error('Comentario no encontrado');
    }

    if (comentario.usuarioId !== usuarioId) {
      throw new Error('No tienes permiso para editar este comentario');
    }

    return await this.commentsRepository.actualizarComentario(comentarioId, nuevoContenido);
  }

  async listarComentarios(tareaId: string) {
    return await this.commentsRepository.obtenerComentariosPorTarea(tareaId);
  }
}


const commentSer = new CommentsService();
export { commentSer };