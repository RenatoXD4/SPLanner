// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Color, Estado, Etiqueta, BloqueContenido as PrismaBloqueContenido, Tarea, Usuario } from "@prisma/client";

import { prisma } from "../../lib/prisma.js";


export interface ResponsableConUsuario {
    id: number;
    tareaId?: string;
    usuario: {
        apellido: string;
        email: string;
        id: string;
        nombre: string;
    };
    usuarioId: string;
}

// Extender Tarea para incluir relaciones con el mismo tipo que Prisma devuelve con include
export interface TareaConRelaciones extends Tarea {
  BloqueContenido: BloqueContenido[];  // Con mayúscula, como en tu schema
  estado: Estado & {
    color: Color;
  };
  etiquetas: {
    etiqueta: Etiqueta & {
      color: Color;
    };
  }[];
  proyecto: {
    id: string;
    nombre: string;
  };
  responsables: {
    usuario: Usuario;
  }[];
}


interface BloqueContenido {
    contenido: string;
    posicion: number;
    tipo: TipoDeBloque;
}

interface EstadoUpdateData {
    colorId?: number;
    nombre?: string;
    posicion?: number;
}


const defaultColors = [
    { codigo: '#2b3a42', nombre: 'Slate' },      // bg-slate-900
    { codigo: '#374151', nombre: 'Gray' },       // bg-gray-900
    { codigo: '#7f1d1d', nombre: 'Red' },        // bg-red-900
    { codigo: '#713f12', nombre: 'Yellow' },     // bg-yellow-900
    { codigo: '#14532d', nombre: 'Green' },      // bg-green-900
    { codigo: '#1e3a8a', nombre: 'Blue' },       // bg-blue-900
    { codigo: '#312e81', nombre: 'Indigo' },     // bg-indigo-900
    { codigo: '#4c1d95', nombre: 'Purple' },     // bg-purple-900
    { codigo: '#831843', nombre: 'Pink' },       // bg-pink-900
];

// Definición correcta del tipo TipoDeBloque (usa solo comillas simples o dobles sin mezclar)
type TipoDeBloque = 'CHECKLIST' | 'CODE' | 'HEADING_1' | 'HEADING_2' | 'IMAGE' | 'PARAGRAPH';

export class KanbanRepository {


    public async createColor(nombre: string, codigo: string): Promise<Color> {
        return prisma.color.create({ data: { codigo, nombre } });
    }
    public async createDefaultColorsIfNotExist(): Promise<void> {
        for (const colorData of defaultColors) {
            const exists = await prisma.color.findFirst({
                where: { codigo: colorData.codigo, nombre: colorData.nombre },
            });
            if (!exists) {
                await prisma.color.create({ data: colorData });
            }
        }
    }

    public async createDefaultEstados(proyectoId: string): Promise<void> {
        // Nombres de colores que quieres usar
        const colorNombres = ["Slate", "Blue", "Green"];

        // Buscar los colores por nombre
        const colores = await prisma.color.findMany({
            where: {
                nombre: { in: colorNombres }
            }
        });

        // Mapear nombre a id para fácil acceso
        const colorMap = colores.reduce<Record<string, number>>((acc, color) => {
            acc[color.nombre] = color.id;
            return acc;
        }, {});

        const estadosPorDefecto = [
            { colorNombre: "Slate", nombre: "Sin empezar", posicion: 1 },
            { colorNombre: "Blue", nombre: "En proceso", posicion: 2 },
            { colorNombre: "Green", nombre: "Finalizado", posicion: 3 }
        ];

        for (const estado of estadosPorDefecto) {
            const colorId = colorMap[estado.colorNombre];
            if (!colorId) {
                throw new Error(`No existe color con nombre ${estado.colorNombre}`);
            }
            await prisma.estado.upsert({
                create: {
                    colorId,
                    nombre: estado.nombre,
                    posicion: estado.posicion,
                    proyectoId
                },
                update: {},
                where: {
                    nombre_proyectoId: {
                        nombre: estado.nombre,
                        proyectoId,
                    }
                }
            });
        }
    }

    // Crear etiquetas por defecto (prioridades)                                    // RELACIONADO CON ETIQUETAS
    // Ahora necesita un proyectoId para asignar las etiquetas por defecto a un proyecto
    public async createDefaultPriorities(proyectoId: string): Promise<void> {
        const defaultPriorities = [
            { colorNombre: "Red", nombre: "Alta" },
            { colorNombre: "Yellow", nombre: "Media" },
            { colorNombre: "Green", nombre: "Baja" },
        ];
        for (const prioridad of defaultPriorities) {
            // Obtener el colorId a partir del nombre del color
            const color = await prisma.color.findFirst({
                where: { nombre: prioridad.colorNombre }
            });
            if (!color) {
                throw new Error(`Color ${prioridad.colorNombre} no encontrado en la base de datos.`);
            }
            await prisma.etiqueta.upsert({
                create: {
                    colorId: color.id,
                    nombre: prioridad.nombre,
                    proyectoId: proyectoId,
                },
                update: {
                    // En update podrías actualizar el colorId si quieres forzar el color por prioridad
                    colorId: color.id,
                },
                where: {
                    nombre_proyectoId: {
                        nombre: prioridad.nombre,
                        proyectoId: proyectoId,
                    }
                }
            });
        }
    }

    // Crear un estado nuevo con color (nombre, posición, proyectoId, colorId)
    public async createEstado(nombre: string, posicion: number, proyectoId: string, colorId: number) {
        if (!nombre.trim()) throw new Error("El nombre es obligatorio");
        if (!proyectoId.trim()) throw new Error("El ID del proyecto es obligatorio");
        if (!colorId) throw new Error("El colorId es obligatorio");

        // Validar existencia de color
        const color = await prisma.color.findUnique({ where: { id: colorId } });
        if (!color) {
            throw new Error(`El colorId ${colorId.toString()} no existe.`);
        }

        // Validar duplicado
        const estadoExistente = await prisma.estado.findFirst({
            where: {
                nombre: nombre.trim(),
                proyectoId: proyectoId.trim(),
            },
        });
        if (estadoExistente) {
            // Adjunta status a Error y lanza
            const error = new Error('Ya existe un estado con ese nombre en este proyecto.') as Error & { status?: number };
            error.status = 409;
            throw error;
        }

        // Crear estado nuevo
        return prisma.estado.create({
            data: {
                colorId,
                nombre: nombre.trim(),
                posicion,
                proyectoId: proyectoId.trim(),
            },
            include: { color: true },
        });
    }


    public async deleteColor(id: number) {
        return prisma.color.delete({ where: { id } });
    }


    // Eliminar un estado por ID
    public async deleteEstado(id: number) {
        if (!id) throw new Error("ID del estado es obligatorio");

        return prisma.$transaction(async (tx) => {
            // Primero eliminar todas las tareas relacionadas a este estado
            await tx.tarea.deleteMany({
                where: { estadoId: id }
            });

            // Luego eliminar el estado
            return tx.estado.delete({
                where: { id }
            });
        });
    }


    public async deleteEtiqueta(id: number, proyectoId: string): Promise<Etiqueta> {
        const etiqueta = await prisma.etiqueta.findFirst({
            where: { id, proyectoId },
        });

        if (!etiqueta) {
            throw new Error("Etiqueta no encontrada o no pertenece al proyecto");
        }

        // Borra todas las relaciones en tareasEtiquetas
        await prisma.tareasEtiquetas.deleteMany({
            where: { etiquetaId: id },
        });

        // Ahora borra la etiqueta
        return prisma.etiqueta.delete({
            where: { id },
        });
    }


    // Elimina tarea por id
    public async deleteTask(id: string): Promise<Tarea> {
        const task = await prisma.tarea.findUnique({
            where: { id },
        });

        if (!task) {
            throw new Error(`La tarea con ID ${id} no existe.`);
        }

        return prisma.tarea.delete({ where: { id } });
    }

    // Obtener todos los colores disponibles
    public async getAllColores(): Promise<Color[]> {
        return prisma.color.findMany();
    }

    public async getAllColors() {
        return prisma.color.findMany({ orderBy: { nombre: 'asc' } });
    }

    // Obtener todas las etiquetas de un proyecto, incluyendo el color
    public async getAllEtiquetas(proyectoId: string): Promise<Etiqueta[]> {
        if (!proyectoId.trim()) throw new Error("El proyectoId es obligatorio");

        return prisma.etiqueta.findMany({
            include: { color: true }, // Incluir la relación con Color
            orderBy: { nombre: "asc" },
            where: { proyectoId },
        });
    }


    // Obtiene todas las tareas de un proyecto, con relaciones
    // Obtiene todas las tareas de un proyecto, con relaciones
public async getAllTask(proyectoId: string): Promise<TareaConRelaciones[]> {
    if (!proyectoId.trim()) throw new Error("Se requiere un ID de proyecto válido.");

    return prisma.tarea.findMany({
        include: {
            BloqueContenido: true,
            editores: { 
            include: { usuario: true } 
        },
            estado: {
                include: {
                    color: true,
                },
            },
            etiquetas: {
                include: {
                    etiqueta: {
                        include: {
                            color: true,
                        },
                    },
                },
            },
            lastModifiedBy: { 
            select: { apellido: true, id: true, nombre: true } 
        },
        proyecto: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
            responsables: {
                include: {
                    usuario: true,
                },
            },
        },
        orderBy: { posicion: 'asc' },
        where: { proyectoId }
    }) as Promise<TareaConRelaciones[]>;
}

    public async getColorById(id: number) {
        return prisma.color.findUnique({ where: { id } });
    }

    // Obtener todos los estados de un proyecto con sus tareas y color incluidos
    public async getEstadosByProyectoId(proyectoId: string) {
        if (!proyectoId.trim()) {
            throw new Error("El ID del proyecto es requerido.");
        }
        return prisma.estado.findMany({
            include: {
                color: true,   // incluir color relacionado
                tareas: {
                    include: {
                        BloqueContenido: true,
                        etiquetas: { include: { etiqueta: true } },
                        responsables: { include: { usuario: true } },
                    },
                    orderBy: { posicion: 'asc' }
                },
            },
            orderBy: { posicion: 'asc' },
            where: { proyectoId },
        });
    }

    // Obtener una etiqueta por ID, incluyendo el color
    public async getEtiquetaById(id: number, proyectoId?: string): Promise<Etiqueta | null> {
        return prisma.etiqueta.findFirst({
            include: { color: true }, // Incluir la relación con Color
            where: {
                id,
                ...(proyectoId ? { proyectoId } : {}),
            },
        });
    }


    // Miembros asignados a 1 proyecto
    public async getMiembrosProyecto(proyectoId: string): Promise<ResponsableConUsuario[]> {
        const miembrosRaw = await prisma.miembro.findMany({
            include: {
                usuario: {
                    select: {
                        apellido: true,
                        email: true,
                        id: true,
                        nombre: true,
                    }
                }
            },
            where: { proyectoId }
        });

        return miembrosRaw.map(m => ({
            id: m.id, // id del miembro en la tabla Miembro
            tareaId: '', // aquí no hay tareaId, puedes dejar vacio o cambiar interfaz
            usuario: m.usuario,
            usuarioId: m.usuario.id
        }));
    }

    // Obtener miembros del proyecto asignados a 1 tarea
    public async getResponsablesDelProyecto(proyectoId: string): Promise<ResponsableConUsuario[]> {
        const responsablesRaw = await prisma.responsable.findMany({
            select: {
                id: true,
                tareaId: true,
                usuario: {
                    select: {
                        apellido: true,
                        email: true,
                        id: true,
                        nombre: true,
                    },
                },
                usuarioId: true,
            },
            where: {
                tarea: { proyectoId },
            },
        });

        // Mapeo para asegurar que cumple con ResponsableConUsuario
        const responsables: ResponsableConUsuario[] = responsablesRaw.map(r => ({
            id: r.id,
            tareaId: r.tareaId,
            usuario: r.usuario,
            usuarioId: r.usuarioId,
        }));

        return responsables;
    }


    // Obtener tarea específica con relaciones
    public async getTaskById(id: string): Promise<TareaConRelaciones> {
  const tarea = await prisma.tarea.findUnique({
    include: {
      BloqueContenido: true,  // Con mayúscula
      estado: {
        include: {
          color: true,
        },
      },
      etiquetas: {
        include: {
          etiqueta: {
            include: {
              color: true,
            },
          },
        },
      },
      proyecto: {
        select: {
          id: true,
          nombre: true,
        },
      },
      responsables: {
        include: {
          usuario: true,
        },
      },
    },
    where: { id },
  });

  if (!tarea) {
    throw new Error(`Tarea con ID ${id} no encontrada`);
  }

  return tarea as TareaConRelaciones;
}

    // Crear nueva etiqueta con color (asociado a un proyecto)
    public async insertNuevaEtiqueta(nombre: string, proyectoId: string, colorId: number): Promise<Omit<Etiqueta, 'color'> & { color: Color }> {
        if (!nombre.trim()) throw new Error("El nombre de la etiqueta es obligatorio");
        if (!proyectoId.trim()) throw new Error("El proyectoId es obligatorio");
        if (!colorId) throw new Error("El colorId es obligatorio");

        return prisma.etiqueta.create({
            data: {
                colorId, // Relación con el color
                nombre,
                proyectoId,
            },
            include: {
                color: true // <--- Incluye objeto color
            }
        });
    }

    // Crear tarea, con posibilidad de asignar responsables, etiquetas y bloques
    public async insertNuevaTarea(data: {
    bloquesContenido?: { contenido: string; posicion: number; tipo: TipoDeBloque; }[];
    estadoId: number;
    etiquetaIds?: number[];
    fechaLimite?: Date;
    posicion?: number;
    proyectoId: string;
    responsablesIds?: string[];
    titulo: string;
}): Promise<TareaConRelaciones> {
    return prisma.tarea.create({
        data: {
            BloqueContenido: data.bloquesContenido?.length
                ? {
                    create: data.bloquesContenido.map(bloque => ({
                        contenido: bloque.contenido,
                        posicion: bloque.posicion,
                        tipo: bloque.tipo,
                    })),
                }
                : undefined,

            estadoId: data.estadoId,

            etiquetas: data.etiquetaIds?.length
                ? {
                    create: data.etiquetaIds.map(etiquetaId => ({
                        etiquetaId,
                    })),
                }
                : undefined,

            fechaLimite: data.fechaLimite,

            posicion: data.posicion ?? 0,
            proyectoId: data.proyectoId,
            responsables: data.responsablesIds?.length
                ? {
                    create: data.responsablesIds.map(usuarioId => ({
                        usuarioId,
                    })),
                }
                : undefined,
            titulo: data.titulo,
        },
        include: {
            BloqueContenido: true,
            estado: {
                include: {
                    color: true,
                },
            },
            etiquetas: {
                include: {
                    etiqueta: {
                        include: {
                            color: true,
                        },
                    },
                },
            },
            proyecto: {
                select: {
                    id: true,
                    nombre: true,
                },
            },
            responsables: {
                include: {
                    usuario: true,  
                },
            },
        },
    });
}

    public async updateColor(id: number, nombre: string, codigo: string) {
        return prisma.color.update({ data: { codigo, nombre }, where: { id } });
    }

    // Actualizar un estado existente (nombre, posición, color)
    public async updateEstado(id: number, data: EstadoUpdateData) {
        if (!id) throw new Error("ID del estado es obligatorio");

        // Si se envía colorId, validar que exista el color
        if (data.colorId !== undefined) {
            const color = await prisma.color.findUnique({ where: { id: data.colorId } });
            if (!color) {
                throw new Error(`El colorId ${data.colorId.toString()} no existe.`);
            }
        }

        // Validar nombre si es que se envió
        if (data.nombre !== undefined && !data.nombre.trim()) {
            throw new Error("El nombre no puede estar vacío.");
        }

        return prisma.estado.update({
            data, // solo los campos que vengan en data se actualizan
            include: { color: true },
            where: { id },
        });
    }

    // Actualizar etiqueta con color
    public async updateEtiqueta(id: number, nombre: string, proyectoId: string, colorId: number): Promise<Etiqueta> {
        if (!nombre.trim()) throw new Error("El nombre de la etiqueta es obligatorio");
        if (!proyectoId.trim()) throw new Error("El proyectoId es obligatorio");
        if (!colorId) throw new Error("El colorId es obligatorio");

        return prisma.etiqueta.update({
            data: {
                colorId, // Relación con el color
                nombre,
                proyectoId,
            },
            where: { id },
        });
    }

    public async updateTaskPartial(params: {
    data?: Partial<Tarea>;
    estadoId?: number;
    etiquetasToAdd?: number[];
    etiquetasToRemove?: number[];
    id: string;
    proyectoId?: string;
    responsablesToAdd?: string[];
    responsablesToRemove?: string[];
}): Promise<TareaConRelaciones> {
    const {
        data = {},
        estadoId,
        etiquetasToAdd,
        etiquetasToRemove,
        id,
        proyectoId,
        responsablesToAdd,
        responsablesToRemove,
    } = params;

    // Construimos el objeto con los campos a actualizar directamente en la tarea
    const updateData: Partial<Tarea> = { ...data };

    if (estadoId !== undefined) updateData.estadoId = estadoId;
    if (proyectoId !== undefined) updateData.proyectoId = proyectoId;
    if (typeof updateData.fechaLimite === "string" && updateData.fechaLimite === "") {
        updateData.fechaLimite = null;
    }

    return prisma.$transaction(async (tx) => {
        // Actualizar los campos simples de la tarea
        await tx.tarea.update({
            data: updateData,
            where: { id },
        });

        // Remover responsables si hay
        if (responsablesToRemove && responsablesToRemove.length > 0) {
            console.log('BORRANDO responsables:', responsablesToRemove, 'DE tarea:', id);
            await tx.responsable.deleteMany({
                where: {
                    tareaId: id,
                    usuarioId: { in: responsablesToRemove },
                },
            });
        }

        // Agregar responsables si hay
        if (responsablesToAdd && responsablesToAdd.length > 0) {
            const nuevosResponsables = responsablesToAdd.map(usuarioId => ({
                tareaId: id,
                usuarioId,
            }));

            await tx.responsable.createMany({
                data: nuevosResponsables,
                skipDuplicates: true,
            });
        }

        // Remover etiquetas si hay
        if (etiquetasToRemove && etiquetasToRemove.length > 0) {
            console.log('etiquetasToRemove', etiquetasToRemove);
            await tx.tareasEtiquetas.deleteMany({
                where: {
                    etiquetaId: { in: etiquetasToRemove },
                    tareaId: id,
                },
            });
        }

        // Agregar etiquetas si hay
        if (etiquetasToAdd && etiquetasToAdd.length > 0) {
            const nuevasEtiquetas = etiquetasToAdd.map(etiquetaId => ({
                etiquetaId,
                tareaId: id,
            }));

            await tx.tareasEtiquetas.createMany({
                data: nuevasEtiquetas,
                skipDuplicates: true,
            });
        }

        // Finalmente, retornamos la tarea actualizada con relaciones completas
        const tareaActualizada = await tx.tarea.findUnique({
            include: {
                BloqueContenido: true,
                estado: {
                    include: {
                        color: true,
                    },
                },
                etiquetas: {
                    include: {
                        etiqueta: {
                            include: {
                                color: true,
                            },
                        },
                    },
                },
                proyecto: {
                    select: {
                        id: true,
                        nombre: true,
                    },
                },
                responsables: {
                    include: {
                        usuario: true,
                    },
                },
            },
            where: { id },
        });

        if (!tareaActualizada) {
            throw new Error(`Tarea con ID ${id} no encontrada después de la actualización`);
        }

        return tareaActualizada as TareaConRelaciones;
    });
}

    // Actualización parcial solo en campos simples (sin relaciones)
    public async UpdateTaskv2(params: {
        data: Partial<Tarea>;
        where: { id: string };
    }): Promise<Tarea> {
        return prisma.tarea.update({
            data: params.data,
            where: params.where,
        });
    }
}
