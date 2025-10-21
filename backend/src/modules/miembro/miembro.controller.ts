import { Request, Response } from 'express';

import { prisma } from '../../lib/prisma.js';
import { MiembroService } from './miembro.service.js';
import { 
  DatosInvalidosError, 
  UsuarioNoEncontradoError, 
  UsuarioYaEsMiembroError 
} from './miembro.service.js';

interface ActualizarRolBody {
  rolId?: number | string;
}

interface ActualizarRolParams {
  miembroId?: string;
}

// Interfaces para las respuestas
interface ApiResponse<T> {
  data?: T;
  message: string;
  success: boolean;
}

// Interfaces para las requests
interface BuscarUsuarioQuery {
  email?: string;
}

interface EliminarMiembroQuery {
  proyectoId?: string;
  usuarioId?: string;
}

interface ErrorResponse {
  error?: string;
  message: string;
  success: false;
}

interface InvitarUsuarioBody {
  proyectoId?: string;
  rolId?: number;
  usuarioId?: string;
}

interface ObtenerMiembrosParams {
  proyectoId?: string;
}

export class MiembroController {
  private miembroService: MiembroService;

  constructor() {
    this.miembroService = new MiembroService();
  }

  // Actualizar rol de miembro
  async actualizarRolMiembro(
    req: Request<ActualizarRolParams, unknown, ActualizarRolBody, unknown>, 
    res: Response
  ): Promise<void> {
    try {
      const { miembroId } = req.params;
      const { rolId } = req.body;

      if (!miembroId || rolId === undefined) {
        const errorResponse: ErrorResponse = {
          message: 'miembroId y rolId son requeridos',
          success: false
        };
        res.status(400).json(errorResponse);
        return;
      }

      // Validar y convertir miembroId
      const miembroIdNumero = parseInt(miembroId, 10);
      if (isNaN(miembroIdNumero)) {
        const errorResponse: ErrorResponse = {
          message: 'miembroId debe ser un número válido',
          success: false
        };
        res.status(400).json(errorResponse);
        return;
      }

      // Validar y convertir rolId
      let rolIdNumero: number;
      
      if (typeof rolId === 'string') {
        rolIdNumero = parseInt(rolId, 10);
      } else {
        rolIdNumero = rolId;
      }
      
      if (isNaN(rolIdNumero)) {
        const errorResponse: ErrorResponse = {
          message: 'rolId debe ser un número válido',
          success: false
        };
        res.status(400).json(errorResponse);
        return;
      }

      // Verificar que el rol existe
      const rolExistente = await prisma.roles.findUnique({
        where: { id: rolIdNumero }
      });

      if (!rolExistente) {
        const errorResponse: ErrorResponse = {
          message: 'El rol especificado no existe',
          success: false
        };
        res.status(400).json(errorResponse);
        return;
      }

      // Verificar que el miembro existe
      const miembroExistente = await prisma.miembro.findUnique({
        where: { id: miembroIdNumero }
      });

      if (!miembroExistente) {
        const errorResponse: ErrorResponse = {
          message: 'El miembro especificado no existe',
          success: false
        };
        res.status(404).json(errorResponse);
        return;
      }

      // Actualizar el rol del miembro
      const miembroActualizado = await prisma.miembro.update({
        data: { rolId: rolIdNumero },
        include: {
          rol: { 
            select: { 
              id: true, 
              nombre: true 
            } 
          },
          usuario: { 
            select: { 
              apellido: true, 
              email: true, 
              id: true, 
              nombre: true 
            } 
          }
        },
        where: { id: miembroIdNumero }
      });

      const successResponse: ApiResponse<typeof miembroActualizado> = {
        data: miembroActualizado,
        message: 'Rol actualizado exitosamente',
        success: true
      };

      res.json(successResponse);

    } catch (error) {
      console.error('Error actualizando rol del miembro:', error);
      
      const errorResponse: ErrorResponse = {
        message: 'Error interno del servidor al actualizar el rol',
        success: false
      };

      // Manejar errores específicos de Prisma
      if (error instanceof Error) {
        if (error.message.includes('Record to update not found')) {
          errorResponse.message = 'El miembro no existe';
          res.status(404).json(errorResponse);
          return;
        }
      }

      res.status(500).json(errorResponse);
    }
  }

  // Buscar usuario por email
  async buscarUsuarioPorEmail(
    req: Request<unknown, unknown, unknown, BuscarUsuarioQuery>, 
    res: Response
  ): Promise<void> {
    try {
      const { email } = req.query;
      
      if (!email || typeof email !== 'string') {
        const errorResponse: ErrorResponse = {
          message: 'El parámetro email es requerido y debe ser una cadena de texto',
          success: false
        };
        res.status(400).json(errorResponse);
        return;
      }

      const usuario = await this.miembroService.buscarUsuarioPorEmail(email);
      
      const successResponse: ApiResponse<typeof usuario> = {
        data: usuario,
        message: 'Usuario encontrado exitosamente',
        success: true
      };

      res.json(successResponse);

    } catch (error) {
      this.manejarError(res, error, 'buscando usuario por email');
    }
  }

  // Eliminar miembro de proyecto
  async eliminarMiembroProyecto(
    req: Request<unknown, unknown, unknown, EliminarMiembroQuery>, 
    res: Response
  ): Promise<void> {
    try {
      const { proyectoId, usuarioId } = req.query;

      if (!proyectoId || typeof proyectoId !== 'string') {
        const errorResponse: ErrorResponse = {
          message: 'proyectoId es requerido y debe ser una cadena de texto',
          success: false
        };
        res.status(400).json(errorResponse);
        return;
      }

      if (!usuarioId || typeof usuarioId !== 'string') {
        const errorResponse: ErrorResponse = {
          message: 'usuarioId es requerido y debe ser una cadena de texto',
          success: false
        };
        res.status(400).json(errorResponse);
        return;
      }

      await this.miembroService.eliminarMiembroProyecto(proyectoId, usuarioId);

      const successResponse: ApiResponse<null> = {
        message: 'Miembro eliminado del proyecto exitosamente',
        success: true
      };

      res.json(successResponse);

    } catch (error) {
      this.manejarError(res, error, 'eliminando miembro del proyecto');
    }
  }

  // Invitar usuario a proyecto
  async invitarUsuarioAProyecto(
    req: Request<unknown, unknown, InvitarUsuarioBody, unknown>, 
    res: Response
  ): Promise<void> {
    try {
      const { proyectoId, rolId, usuarioId } = req.body;

      if (!proyectoId || typeof proyectoId !== 'string') {
        const errorResponse: ErrorResponse = {
          message: 'proyectoId es requerido en el body y debe ser una cadena de texto',
          success: false
        };
        res.status(400).json(errorResponse);
        return;
      }

      if (!usuarioId || typeof usuarioId !== 'string') {
        const errorResponse: ErrorResponse = {
          message: 'usuarioId es requerido en el body y debe ser una cadena de texto',
          success: false
        };
        res.status(400).json(errorResponse);
        return;
      }

      if (!rolId || typeof rolId !== 'number') {
        const errorResponse: ErrorResponse = {
          message: 'rolId es requerido en el body y debe ser un número',
          success: false
        };
        res.status(400).json(errorResponse);
        return;
      }

      const resultado = await this.miembroService.invitarUsuarioAProyecto(
        proyectoId, 
        usuarioId, 
        rolId
      );

      const successResponse: ApiResponse<typeof resultado> = {
        data: resultado,
        message: 'Usuario invitado al proyecto exitosamente',
        success: true
      };

      res.status(201).json(successResponse);

    } catch (error) {
      this.manejarError(res, error, 'invitando usuario a proyecto');
    }
  }

  // Obtener miembros de un proyecto
  async obtenerMiembrosProyecto(
    req: Request<ObtenerMiembrosParams, unknown, unknown, unknown>, 
    res: Response
  ): Promise<void> {
    try {
      const { proyectoId } = req.params;

      if (!proyectoId || typeof proyectoId !== 'string') {
        const errorResponse: ErrorResponse = {
          message: 'proyectoId es requerido en los parámetros de la ruta y debe ser una cadena de texto',
          success: false
        };
        res.status(400).json(errorResponse);
        return;
      }

      const miembros = await this.miembroService.obtenerMiembrosProyecto(proyectoId);

      const successResponse: ApiResponse<typeof miembros> = {
        data: miembros,
        message: 'Miembros del proyecto obtenidos exitosamente',
        success: true
      };

      res.json(successResponse);

    } catch (error) {
      this.manejarError(res, error, 'obteniendo miembros del proyecto');
    }
  }

  // Método privado para manejo centralizado de errores
  private manejarError(res: Response, error: unknown, contexto: string): void {
    console.error(`Error ${contexto}:`, error);

    const errorResponse: ErrorResponse = {
      message: 'Error interno del servidor',
      success: false
    };

    if (error instanceof UsuarioNoEncontradoError) {
      errorResponse.message = error.message;
      res.status(404).json(errorResponse);
      return;
    }

    if (error instanceof UsuarioYaEsMiembroError) {
      errorResponse.message = error.message;
      res.status(409).json(errorResponse);
      return;
    }

    if (error instanceof DatosInvalidosError) {
      errorResponse.message = error.message;
      res.status(400).json(errorResponse);
      return;
    }

    // Error genérico del servidor
    if (process.env.NODE_ENV === 'development') {
      errorResponse.error = error instanceof Error ? error.message : 'Error desconocido';
    }

    res.status(500).json(errorResponse);
  }
}