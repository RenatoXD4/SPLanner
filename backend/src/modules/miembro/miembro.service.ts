import { MiembroRepository } from "./miembro.repository.js";

interface MiembroConUsuario {
  id: number;
  proyectoId: string;
  rol: {
    id: number;
    nombre: string;
  };
  rolId: number;
  usuario: UsuarioBasico;
  usuarioId: string;
}

// Interfaces para los tipos
interface UsuarioBasico {
  apellido: string;
  email: string;
  id: string;
  nombre: string;
}


export class DatosInvalidosError extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = 'DatosInvalidosError';
  }
}

export class MiembroService {
  private miembroRepository: MiembroRepository;

  constructor() {
    this.miembroRepository = new MiembroRepository();
  }

  async buscarUsuarioPorEmail(email: string): Promise<UsuarioBasico> {
    if (!email || typeof email !== 'string') {
      throw new DatosInvalidosError('El email es requerido y debe ser una cadena de texto');
    }

    const usuario = await this.miembroRepository.buscarUsuarioPorEmail(email);
    
    if (!usuario) {
      throw new UsuarioNoEncontradoError(email);
    }

    return usuario;
  }

  async contarMiembrosProyecto(proyectoId: string): Promise<number> {
    if (!proyectoId || typeof proyectoId !== 'string') {
      throw new DatosInvalidosError('El proyectoId es requerido y debe ser una cadena de texto');
    }

    return await this.miembroRepository.contarMiembrosProyecto(proyectoId);
  }

  async eliminarMiembroProyecto(proyectoId: string, usuarioId: string): Promise<void> {
    if (!proyectoId || !usuarioId) {
      throw new DatosInvalidosError('proyectoId y usuarioId son requeridos');
    }

    await this.miembroRepository.eliminarMiembroProyecto(proyectoId, usuarioId);
  }

  async invitarUsuarioAProyecto(
    proyectoId: string, 
    usuarioId: string, 
    rolId: number
  ): Promise<MiembroConUsuario> {
    // Validaciones de entrada
    this.validarDatosInvitacion(proyectoId, usuarioId, rolId);

    // Verificar si el usuario ya es miembro del proyecto
    const miembroExistente = await this.miembroRepository.verificarMiembroExistente(proyectoId, usuarioId);
    
    if (miembroExistente) {
      throw new UsuarioYaEsMiembroError();
    }

    // Invitar al usuario
    return await this.miembroRepository.crearMiembro(proyectoId, usuarioId, rolId);
  }

  async obtenerMiembrosProyecto(proyectoId: string): Promise<MiembroConUsuario[]> {
    if (!proyectoId || typeof proyectoId !== 'string') {
      throw new DatosInvalidosError('El proyectoId es requerido y debe ser una cadena de texto');
    }

    return await this.miembroRepository.obtenerMiembrosProyecto(proyectoId);
  }

  // Método privado para validaciones
  private validarDatosInvitacion(proyectoId: string, usuarioId: string, rolId: number): void {
    const errores: string[] = [];

    if (!proyectoId || typeof proyectoId !== 'string') {
      errores.push('proyectoId es requerido y debe ser una cadena de texto');
    }

    if (!usuarioId || typeof usuarioId !== 'string') {
      errores.push('usuarioId es requerido y debe ser una cadena de texto');
    }

    if (!rolId || typeof rolId !== 'number' || rolId <= 0) {
      errores.push('rolId es requerido y debe ser un número positivo');
    }

    if (errores.length > 0) {
      throw new DatosInvalidosError(errores.join(', '));
    }
  }
}

// Excepciones personalizadas para mejor manejo de errores
export class UsuarioNoEncontradoError extends Error {
  constructor(email: string) {
    super(`No se encontró ningún usuario con el email: ${email}`);
    this.name = 'UsuarioNoEncontradoError';
  }
}

export class UsuarioYaEsMiembroError extends Error {
  constructor() {
    super('Este usuario ya es miembro del proyecto');
    this.name = 'UsuarioYaEsMiembroError';
  }
  
}