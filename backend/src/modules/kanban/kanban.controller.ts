import { Tarea } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { KanbanService } from "./kanban.service.js";

interface BloqueContenidoInput {
  contenido: string;
  posicion: number;
  tipo: TipoDeBloque;
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



// Tipo personalizado (como el que espera el repositorio)
type TipoDeBloque = 'CHECKLIST' | 'CODE' | 'HEADING_1' | 'HEADING_2' | 'IMAGE' | 'PARAGRAPH';

export class KanbanController {
  constructor(private readonly KanbanSer: KanbanService) { }

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

  public async requestCreateTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const tareaData = req.body as CreateTareaInput;

      if (!Object.keys(tareaData).length) {
        res.status(400).json({ message: "Datos de tarea incompletos o vacíos." });
        return;
      }

      const nuevaTarea = await this.KanbanSer.createTask(tareaData);
      res.status(201).json(nuevaTarea);
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
    try {
      const tareaId = req.params.id;
      const data = { ...req.body } as Partial<Tarea>;

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



}
