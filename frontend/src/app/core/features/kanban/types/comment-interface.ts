export interface UsuarioAutor {
  id: string;
  nombre: string;
  apellido: string;
  email?: string;
}

export interface Comentario {
  id: number;
  contenido: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  usuarioId: string;
  tareaId: string;
  autor: UsuarioAutor; // Esta propiedad de autor viene del backend
}