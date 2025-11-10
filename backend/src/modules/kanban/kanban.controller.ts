import { Color, Tarea, TipoDeBloque  } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { KanbanService } from "./kanban.service.js";

interface BloqueContenidoInput {
  contenido: string;
  id: string;      // <-- Falta en tu tipo
  posicion: number;
  tareaId: string; // <-- Falta en tu tipo
  tipo: TipoDeBloque;
}

interface CreateColorBody {
  codigo: string;
  nombre: string;
}
interface CreateEstadoBody {
  colorId: number;
  nombre: string;
  posicion: number;
  proyectoId: string;
}
interface CreateEtiquetaBody {
  colorId: number; // obligatorio, no opcional
  nombre: string;
  proyectoId: string;
}


interface CreateTareaInput {
  bloquesContenido?: BloqueContenidoInput[];
  estadoId: number;
  etiquetaIds?: number[];
  fechaLimite?: Date;
  posicion?: number;
  proyectoId: string;
  responsablesIds?: string[];
  titulo: string;
}

interface ResponsableConUsuario {
  id: number;
  usuario: {
    apellido: string;
    email: string;
    id: string;
    nombre: string;
  };
}


interface UpdateColorBody {
  codigo: string;
  nombre: string;
}

interface UpdateEstadoBody {
  colorId?: number;
  nombre?: string;
  posicion?: number;
}

interface UpdateColorBody {
  codigo: string;
  nombre: string;
}

interface UpdateEstadoBody {
  colorId?: number;
  nombre?: string;
  posicion?: number;
}

interface UpdateEtiquetaBody {
  colorId: number; // opcional para actualizar color, ahora por ID
  nombre?: string;
  proyectoId: string; // obligatorio para validar proyecto
}

export class KanbanController {
  constructor(private readonly KanbanSer: KanbanService) { }

  public async createColor(
    req: Request<Record<string, never>, unknown, CreateColorBody>,
    res: Response
  ): Promise<void> {
    const { codigo, nombre } = req.body;
    try {
      const color: Color = await this.KanbanSer.createColor(nombre, codigo);
      res.status(201).json(color);
    } catch (error) {
      console.error('Error creando color:', error);
      res.status(500).json({ message: 'Error al crear el color.' });
    }
  }

  // Crear nuevo estado
  public async createEstado(
    req: Request<Record<string, never>, unknown, CreateEstadoBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { colorId, nombre, posicion, proyectoId } = req.body;
    try {
      const estado = await this.KanbanSer.createEstado(nombre, posicion, proyectoId, colorId);
      res.status(201).json(estado);
    } catch (error) {
      console.error("Error creando estado:", error);
      next(error);
    }
  }

  // Eliminar color
  public async deleteColor(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> {
    const id = Number(req.params.id);
    try {
      await this.KanbanSer.deleteColor(id);
      res.json({ message: 'Color eliminado correctamente.' });
    } catch (error) {
      console.error('Error eliminando color:', error);
      res.status(500).json({ message: 'Error al eliminar el color.' });
    }
  }

  // Eliminar estado
  public async deleteEstado(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = Number(req.params.id);
    try {
      await this.KanbanSer.deleteEstado(id);
      res.json({ message: "Estado eliminado correctamente." });
    } catch (error) {
      console.error("Error eliminando estado:", error);
      next(error);
    }
  }

  // Obtener todos los colores
  public async getAllColors(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const colors: Color[] = await this.KanbanSer.getAllColors();
      res.json(colors);
    } catch (error) {
      console.error('Error obteniendo colores:', error);
      res.status(500).json({ message: 'Error al obtener los colores.' });
    }
  }

  // Obtener un color por ID
  public async getColorById(
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> {
    const id = Number(req.params.id);
    try {
      const color: Color = await this.KanbanSer.getColorById(id);
      res.json(color);
    } catch (error) {
      console.error('Error obteniendo color:', error);
      res.status(404).json({ message: 'Color no encontrado.' });
    }
  }


  // Método para obtener estados por proyectoId
  public async obtenerEstados(req: Request, res: Response) {
    const { proyectoId } = req.params;
    try {
      const estados = await this.KanbanSer.obtenerEstados(proyectoId);
      res.json(estados);
    } catch (error) {
      console.error('Error obteniendo estados:', error);
      res.status(500).json({ message: 'Error al obtener los estados del proyecto.' });
    }
  }

  public async requestCreateEtiqueta(
    req: Request<Record<string, never>, unknown, CreateEtiquetaBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { colorId, nombre, proyectoId } = req.body;

      if (!colorId || typeof colorId !== "number") {
        res.status(400).json({ message: "El colorId es obligatorio y debe ser un número." });
        return;
      }
      if (typeof nombre !== "string" || !nombre.trim()) {
        res.status(400).json({ message: "El nombre de la etiqueta es obligatorio." });
        return;
      }
      if (typeof proyectoId !== "string" || !proyectoId.trim()) {
        res.status(400).json({ message: "El proyectoId es obligatorio." });
        return;
      }

      const nuevaEtiqueta = await this.KanbanSer.createEtiqueta(nombre.trim(), proyectoId.trim(), colorId);
      res.status(201).json(nuevaEtiqueta);
    } catch (error) {
      next(error);
    }
  }

  public async requestCreateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tareaData = req.body as CreateTareaInput;

      const { estadoId, fechaLimite, proyectoId, titulo } = tareaData;

      if (!titulo || !estadoId || !proyectoId) {
        res.status(400).json({ message: "Título, estadoId y proyectoId son obligatorios." });
        return;
      }

      // Convertir fechaLimite a Date si viene como string
      if (fechaLimite && typeof fechaLimite === "string") {
        tareaData.fechaLimite = new Date(fechaLimite);
      }

      const nuevaTarea = await this.KanbanSer.createTask(tareaData);
      res.status(201).json(nuevaTarea);
    } catch (error) {
      const err = error as Error;

      if (
        typeof err.message === "string" &&
        (
          err.message.includes("responsables") ||
          err.message.includes("etiquetas") ||
          err.message.includes("título") ||
          err.message.includes("proyectoId") ||
          err.message.includes("estadoId")
        )
      ) {
        res.status(400).json({ message: err.message });
      } else {
        next(error);
      }
    }
  }

  public async requestDeleteEtiqueta(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const proyectoId = req.query.proyectoId as string;

      if (!id || isNaN(id)) {
        res.status(400).json({ message: "ID de etiqueta inválido." });
        return;
      }
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      if (!proyectoId || !proyectoId.trim()) {
        res.status(400).json({ message: "El proyectoId es obligatorio." });
        return;
      }

      const etiquetaEliminada = await this.KanbanSer.deleteEtiqueta(id, proyectoId.trim());
      res.status(200).json(etiquetaEliminada);
    } catch (error) {
      next(error);
    }
  }

  public async requestDeleteTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;

      if (!id.trim()) {
        res.status(400).json({ message: "El ID de la tarea es requerido." });
        return;
      }

      const deletedTask = await this.KanbanSer.deleteOneTask(id);
      res.status(200).json(deletedTask);
    } catch (e) {
      next(e);
    }
  }

  public async requestGetAllEtiquetas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const proyectoId = req.query.proyectoId as string;

      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      if (!proyectoId || !proyectoId.trim()) {
        res.status(400).json({ message: "El proyectoId es obligatorio." });
        return;
      }

      const etiquetas = await this.KanbanSer.getAllEtiquetas(proyectoId.trim());
      res.status(200).json(etiquetas);
    } catch (error) {
      console.error("Error al obtener etiquetas:", error);
      next(error);
    }
  }

  public async requestgetAllTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { proyectoId } = req.params;

      if (!proyectoId.trim()) {
        res.status(400).json({ error: "ID de proyecto inválido." });
        return;
      }

      const tareas = await this.KanbanSer.getAlltasks(proyectoId);
      res.status(200).json(tareas);
    } catch (e) {
      console.error("Error al obtener tareas:", e);
      next(e);
    }
  }


  // Miembros relacionados al proyecto
  public async requestGetEquipoProyecto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { proyectoId } = req.params;

      if (!proyectoId || proyectoId.trim() === "") {
        res.status(400).json({ message: "El ID del proyecto es requerido." });
        return;
      }

      const miembros = await this.KanbanSer.obtenerMiembrosProyecto(proyectoId);

      const miembrosFormateados = miembros.map((m) => ({
        id: m.id,
        usuario: {
          apellido: m.usuario.apellido,
          email: m.usuario.email,
          id: m.usuario.id,
          nombre: m.usuario.nombre,
        },
      }));

      res.status(200).json(miembrosFormateados);
    } catch (error) {
      console.error("Error al obtener miembros del proyecto:", error);
      next(error);
    }
  }

  public async requestGetEtiquetaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id);
      const proyectoId = req.query.proyectoId as string | undefined;
      console.log('ProyectoId recibido = ', proyectoId)

      if (!id || isNaN(id)) {
        res.status(400).json({ message: "ID de etiqueta inválido." });
        return;
      }

      const etiqueta = await this.KanbanSer.getEtiquetaById({ id, proyectoId: proyectoId?.trim() });

      res.status(200).json(etiqueta);
    } catch (error) {
      next(error);
    }
  }

  // Relacionados a 1 tarea
  public async requestGetMiembrosDelProyecto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { proyectoId } = req.params;

      if (!proyectoId.trim()) {
        res.status(400).json({ message: "El ID del proyecto es requerido." });
        return;
      }

      const miembros = await this.KanbanSer.getMiembrosDelProyecto(proyectoId);

      const miembrosFormateados: ResponsableConUsuario[] = miembros.map(m => ({
        id: m.id,
        usuario: {
          apellido: m.usuario.apellido,
          email: m.usuario.email,
          id: m.usuario.id,
          nombre: m.usuario.nombre,
        }
      }));

      res.status(200).json(miembrosFormateados);
    } catch (error) {
      console.error("Error al obtener miembros del proyecto:", error);
      next(error);
    }
  }

  public async requestGetTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const tarea = await this.KanbanSer.getTaskById(id);
      res.status(200).json(tarea);
    } catch (error) {
      next(error);
    }
  }

  public async requestUpdateEtiqueta(
    req: Request<{ id: string }, unknown, UpdateEtiquetaBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { colorId, nombre, proyectoId } = req.body;

      if (!id || isNaN(id)) {
        res.status(400).json({ message: "ID de etiqueta inválido." });
        return;
      }
      if (typeof nombre !== "string" || !nombre.trim()) {
        res.status(400).json({ message: "El nombre de la etiqueta es obligatorio." });
        return;
      }
      if (typeof proyectoId !== "string" || !proyectoId.trim()) {
        res.status(400).json({ message: "El proyectoId es obligatorio." });
        return;
      }

      const etiquetaActualizada = await this.KanbanSer.updateEtiqueta(id, nombre.trim(), proyectoId.trim(), colorId);
      res.status(200).json(etiquetaActualizada);
    } catch (error) {
      next(error);
    }
  }

  public async requestUpdateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = req.params.id;

      if (!id.trim()) {
        res.status(400).json({ message: "El ID de la tarea es requerido." });
        return;
      }

      const body = req.body as {
        data?: Partial<Tarea>;
        estadoId?: number;
        etiquetasToAdd?: number[];
        etiquetasToRemove?: number[];
        proyectoId?: string;
        responsablesToAdd?: string[];
        responsablesToRemove?: string[];
      };

      const {
        data,
        estadoId,
        etiquetasToAdd,
        etiquetasToRemove,
        proyectoId,
        responsablesToAdd,
        responsablesToRemove,
      } = body;

      const tareaActualizada = await this.KanbanSer.updateTaskConRelaciones({
        data,
        estadoId,
        etiquetasToAdd,
        etiquetasToRemove,
        id,
        proyectoId,
        responsablesToAdd,
        responsablesToRemove,
      });

      res.status(200).json(tareaActualizada);
    } catch (error) {
      next(error);
    }
  }

  public async requestUpdateTaskv2(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    console.log('🔔 Llegó petición PATCH /tasks/:id', req.params, req.body);
    try {
      const tareaId = req.params.id;
      const data = { ...req.body } as Partial<Tarea>;
      console.log('Cuerpo:', data);
      if (!tareaId.trim()) {
        res.status(400).json({ message: "El ID de la tarea es requerido en la URL." });
        return;
      }

      if (!Object.keys(data).length) {
        res.status(400).json({ message: "Debes proporcionar al menos un campo para actualizar." });
        return;
      }

      // No permitimos actualizar campos no editables
      delete data.id;
      delete data.createdAt;

      // Llamamos a updateTaskSimple enviando id y data
      const tareaActualizada = await this.KanbanSer.updateTaskSimple({
        data,
        id: tareaId,
      });

      res.status(200).json(tareaActualizada);
    } catch (e) {
      next(e);
    }
  }
  // Actualizar color
  public async updateColor(
    req: Request<{ id: string }, unknown, UpdateColorBody>,
    res: Response
  ): Promise<void> {
    const id = Number(req.params.id);
    const { codigo, nombre } = req.body;
    try {
      const updatedColor: Color = await this.KanbanSer.updateColor(id, nombre, codigo);
      res.json(updatedColor);
    } catch (error) {
      console.error('Error actualizando color:', error);
      res.status(500).json({ message: 'Error al actualizar el color.' });
    }
  }

  // Actualización parcial de estado
  public async updateEstado(
    req: Request<{ id: string }, unknown, UpdateEstadoBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = Number(req.params.id);
    const data = req.body;
    try {
      const estadoActualizado = await this.KanbanSer.updateEstado(id, data);
      res.json(estadoActualizado);
    } catch (error) {
      console.error("Error actualizando estado:", error);
      next(error);
    }
  }

}
