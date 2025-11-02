import type { Color, Etiqueta, Tarea } from "@prisma/client";

import { prisma } from "../../lib/prisma.js";
import { KanbanRepository, ResponsableConUsuario, TareaConRelaciones } from "./kanban.repository.js";

export interface EstadoUpdateData {
  colorId?: number;
  nombre?: string;
  posicion?: number;
}

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
  public async createColor(nombre: string, codigo: string): Promise<Color> {
    if (!nombre.trim()) throw new Error('Nombre es obligatorio');
    if (!codigo.trim()) throw new Error('Código hexadecimal es obligatorio');
    if (!/^#([0-9a-fA-F]{6})$/.test(codigo))
      throw new Error('Código hexadecimal inválido');
    return this.kanbanrepo.createColor(nombre, codigo);
  }

  // ESTO CREA X DEFAULT 3 COLUMNAS --> Sin empezar, En proceso, Finalizado
  public async createDefaultEstados(proyectoId: string): Promise<void> {
    await this.kanbanrepo.createDefaultEstados(proyectoId);
  }

  // Crear etiquetas por defecto (prioridades)
  public async createDefaultPriorities(proyectoId: string): Promise<void> {
    await this.kanbanrepo.createDefaultPriorities(proyectoId);
  }

  // Crear estado nuevo con validaciones
  public async createEstado(nombre: string, posicion: number, proyectoId: string, colorId: number) {
    console.log(nombre)
    console.log(proyectoId)
    if (!nombre.trim()) throw new Error("El nombre es obligatorio");
    if (!proyectoId.trim()) throw new Error("El ID del proyecto es obligatorio");
    if (!colorId) throw new Error("El colorId es obligatorio");

    // Validar que color exista
    const color = await prisma.color.findUnique({ where: { id: colorId } });
    if (!color) {
      throw new Error(`El colorId ${colorId.toString()} no existe.`);
    }

    return this.kanbanrepo.createEstado(nombre, posicion, proyectoId, colorId);
  }

  // Crear nueva etiqueta
  public async createEtiqueta(nombre: string, proyectoId: string, colorId: number): Promise<Etiqueta> {
    if (!nombre.trim()) throw new Error("El nombre de la etiqueta es obligatorio");
    if (!proyectoId.trim()) throw new Error("El ID del proyecto es obligatorio");

    // Validar que colorId exista
    const color = await prisma.color.findUnique({ where: { id: colorId } });
    if (!color) {
      throw new Error(`El colorId ${colorId.toString()} no existe.`);
    }

    return this.kanbanrepo.insertNuevaEtiqueta(nombre, proyectoId, colorId);
  }
  // Crear tarea -> retorna tarea con relaciones completas    // Obtener tareas por proyecto -> con relaciones
  public async createTask(data: CreateTareaInput): Promise<TareaConRelaciones> {
    const { estadoId, etiquetaIds = [], fechaLimite, proyectoId, responsablesIds = [], titulo } = data;

    if (!titulo.trim()) throw new Error("El título de la tarea es obligatorio.");
    if (!proyectoId.trim()) throw new Error("El ID del proyecto es obligatorio.");
    if (!estadoId) throw new Error("El ID del estado es obligatorio.");

    // Validar responsables si vienen
    if (responsablesIds.length > 0) {
      const usuarios = await prisma.usuario.findMany({
        select: { id: true },
        where: { id: { in: responsablesIds } },
      });
      if (usuarios.length !== responsablesIds.length) {
        throw new Error("Algunos responsables no existen.");
      }
    }

    // Validar etiquetas si vienen
    if (etiquetaIds.length > 0) {
      const etiquetas = await prisma.etiqueta.findMany({
        select: { id: true },
        where: {
          id: { in: etiquetaIds },
          proyectoId: proyectoId,
        },
      });
      if (etiquetas.length !== etiquetaIds.length) {
        throw new Error("Algunas etiquetas no existen o no pertenecen al proyecto.");
      }
    }

    // Si fechaLimite viene como string, convertir a Date
    let fechaLimiteDate: Date | undefined = undefined;
    if (fechaLimite) {
      if (typeof fechaLimite === "string") {
        fechaLimiteDate = new Date(fechaLimite);
      } else {
        fechaLimiteDate = fechaLimite;
      }
    }

    return this.kanbanrepo.insertNuevaTarea({
      ...data,
      fechaLimite: fechaLimiteDate,
    });
  }

  public async deleteColor(id: number) {
    await this.getColorById(id); // validar que existe
    return this.kanbanrepo.deleteColor(id);
  }
  // Eliminar estado por ID
  public async deleteEstado(id: number) {
    if (!id) throw new Error("ID del estado es obligatorio");
    return this.kanbanrepo.deleteEstado(id);
  }

  // Eliminar etiqueta
  public async deleteEtiqueta(id: number, proyectoId: string): Promise<Etiqueta> {
    if (!id) throw new Error("El ID de la etiqueta es requerido");
    if (!proyectoId.trim()) throw new Error("El ID del proyecto es obligatorio");

    return this.kanbanrepo.deleteEtiqueta(id, proyectoId);
  }

  // Eliminar tarea (solo devuelve tarea base)
  public async deleteOneTask(id: string): Promise<Tarea> {
    return this.kanbanrepo.deleteTask(id);
  }


  public async getAllColors() {
    return this.kanbanrepo.getAllColors();
  }

  // Obtener todas las etiquetas
  public async getAllEtiquetas(proyectoId: string): Promise<Etiqueta[]> {
    if (!proyectoId.trim()) throw new Error("El ID del proyecto es obligatorio");

    return this.kanbanrepo.getAllEtiquetas(proyectoId);
  }


  public async getAlltasks(idproyecto: string): Promise<TareaConRelaciones[]> {
    if (!idproyecto.trim()) {
      throw new Error("Se requiere un ID de proyecto válido.");
    }

    return this.kanbanrepo.getAllTask(idproyecto);
  }

  public async getColorById(id: number) {
    const color = await this.kanbanrepo.getColorById(id);
    if (!color) throw new Error('Color no encontrado');
    return color;
  }

  // Obtener etiqueta por ID
  public async getEtiquetaById(params: { id: number; proyectoId?: string }): Promise<Etiqueta> {
    const { id, proyectoId } = params;

    if (!id) throw new Error("El ID de la etiqueta es requerido");

    // Aquí pasamos ambos parámetros al repo, ajusta según el repo
    const etiqueta = await this.kanbanrepo.getEtiquetaById(id, proyectoId);

    if (!etiqueta) throw new Error("Etiqueta no encontrada");

    return etiqueta;
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
    if (!proyectoId.trim()) throw new Error("El ID del proyecto es obligatorio");
    return this.kanbanrepo.getEstadosByProyectoId(proyectoId);
  }

  //miembros a 1 tarea
  public async obtenerMiembrosProyecto(proyectoId: string): Promise<ResponsableConUsuario[]> {
    if (!proyectoId.trim()) {
      throw new Error("ProyectoId inválido");
    }
    return this.kanbanrepo.getMiembrosProyecto(proyectoId); // <---- CORRECTO
  }


  public async updateColor(id: number, nombre: string, codigo: string) {
    if (!nombre.trim()) throw new Error('Nombre es obligatorio');
    if (!codigo.trim()) throw new Error('Código hexadecimal es obligatorio');
    if (!/^#([0-9a-fA-F]{6})$/.test(codigo))
      throw new Error('Código hexadecimal inválido');
    await this.getColorById(id); // validar que existe
    return this.kanbanrepo.updateColor(id, nombre, codigo);
  }

  // Actualización parcial del estado
  public async updateEstado(id: number, data: EstadoUpdateData) {
    if (!id) throw new Error("ID del estado es obligatorio");

    // Validar color si se envía
    if (data.colorId !== undefined) {
      const color = await prisma.color.findUnique({ where: { id: data.colorId } });
      if (!color) {
        throw new Error(`El colorId ${data.colorId.toString()} no existe.`);
      }
    }

    // Validar nombre si se envía
    if (data.nombre !== undefined && !data.nombre.trim()) {
      throw new Error("El nombre no puede estar vacío.");
    }

    return this.kanbanrepo.updateEstado(id, data);
  }

  // Actualizar etiqueta
  public async updateEtiqueta(id: number, nombre: string, proyectoId: string, colorId: number): Promise<Etiqueta> {
    console.log("colorId recibido:", colorId);
    if (!id) throw new Error("El ID de la etiqueta es requerido");
    if (!nombre.trim()) throw new Error("El nombre de la etiqueta es obligatorio");
    if (!proyectoId.trim()) throw new Error("El ID del proyecto es obligatorio");

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-conversion
    const colorIdNum = Number(colorId);
    if (isNaN(colorIdNum)) {
      throw new Error("El colorId debe ser un número válido");
    }

    const color = await prisma.color.findUnique({
      where: { id: colorIdNum },
    });
    if (!color) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`El colorId ${colorIdNum} no existe.`);
    }

    return this.kanbanrepo.updateEtiqueta(id, nombre, proyectoId, colorIdNum);
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








