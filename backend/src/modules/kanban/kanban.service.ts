import type { Tarea } from "@prisma/client";

import { KanbanRepository, ResponsableConUsuario, TareaConRelaciones } from "./kanban.repository.js";

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

type TipoDeBloque = 'CHECKLIST' | 'CODE' | 'HEADING_1' | 'HEADING_2' | 'IMAGE' | 'PARAGRAPH';

export class KanbanService {
  private kanbanrepo: KanbanRepository;

  constructor() {
    this.kanbanrepo = new KanbanRepository();
  }

  // Crear tarea -> retorna tarea con relaciones completas
  public async createTask(data: CreateTareaInput): Promise<TareaConRelaciones> {
    const { estadoId, proyectoId, titulo } = data;

    if (!titulo.trim()) throw new Error("El título de la tarea es obligatorio.");
    if (!proyectoId.trim()) throw new Error("El ID del proyecto es obligatorio.");
    if (!estadoId) throw new Error("El ID del estado es obligatorio.");

    return this.kanbanrepo.insertNuevaTarea(data);
  }

  // Eliminar tarea (solo devuelve tarea base)
  public async deleteOneTask(id: string): Promise<Tarea> {
    return this.kanbanrepo.deleteTask(id);
  }

  // Obtener tareas por proyecto -> con relaciones

  public async getAlltasks(idproyecto: string): Promise<TareaConRelaciones[]> {
    if (!idproyecto.trim()) {
      throw new Error("Se requiere un ID de proyecto válido.");
    }

    return this.kanbanrepo.getAllTask(idproyecto);
  }

  // Obtener responsables asignados a tareas
  public async getMiembrosDelProyecto(proyectoId: string): Promise<ResponsableConUsuario[]> {
    if (!proyectoId.trim()) {
      throw new Error("ProyectoId inválido");
    }
    return this.kanbanrepo.getResponsablesDelProyecto(proyectoId); // <---- CORRECTO
  }

  // Obtener una tarea por ID -> con relaciones
  public async getTaskById(id: string): Promise<TareaConRelaciones> {
    if (!id || id.trim() === '') {
      throw new Error("El ID de la tarea es requerido.");
    }

    const tarea = await this.kanbanrepo.getTaskById(id);

    if (!tarea) {
      throw new Error("Tarea no encontrada.");
    }

    return tarea;
  }

  // Obtener estados por proyecto (puede incluir tareas con relaciones, se deja igual)
  public async obtenerEstados(proyectoId: string) {
    return this.kanbanrepo.getEstadosByProyectoId(proyectoId);
  }


  //miembros a 1 tarea
  public async obtenerMiembrosProyecto(proyectoId: string): Promise<ResponsableConUsuario[]> {
    if (!proyectoId.trim()) {
      throw new Error("ProyectoId inválido");
    }
    return this.kanbanrepo.getMiembrosProyecto(proyectoId); // <---- CORRECTO
  }

  // Actualización con relaciones (responsables, etiquetas, etc.)
  public async updateTaskConRelaciones(params: {
    data?: Partial<Tarea>;
    estadoId?: number;
    etiquetasToAdd?: number[];
    etiquetasToRemove?: number[];
    id: string;
    proyectoId?: string;
    responsablesToAdd?: string[];
    responsablesToRemove?: string[];
  }): Promise<TareaConRelaciones> {
    if (!params.id) {
      throw new Error("El ID de la tarea es requerido para actualizar.");
    }

    return this.kanbanrepo.updateTaskPartial(params);
  }

  // Actualización simple (solo campos directos)
  public async updateTaskSimple(params: { data: Partial<Tarea>; id: string; }): Promise<Tarea> {
    const { data, id } = params;

    if (!id) {
      throw new Error("El ID de la tarea es requerido para actualizar.");
    }

    return this.kanbanrepo.UpdateTaskv2({
      data,
      where: { id },
    });
  }
}

const kanbanSer = new KanbanService();
export { kanbanSer };
