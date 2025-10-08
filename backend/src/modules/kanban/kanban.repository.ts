// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Etiqueta, BloqueContenido as PrismaBloqueContenido, Tarea, Usuario } from "@prisma/client";

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
    BloqueContenido: BloqueContenido[];
    etiquetas: TareaEtiqueta[];
    responsables: TareaResponsable[];
}

interface BloqueContenido {
    contenido: string;
    posicion: number;
    tipo: TipoDeBloque;
}

// Para las etiquetas con el join y datos de etiqueta
interface TareaEtiqueta {
    etiqueta: Etiqueta;
}

// Para los responsables con datos de usuario
interface TareaResponsable {
    usuario: Usuario;
}


// Definición correcta del tipo TipoDeBloque (usa solo comillas simples o dobles sin mezclar)
type TipoDeBloque = 'CHECKLIST' | 'CODE' | 'HEADING_1' | 'HEADING_2' | 'IMAGE' | 'PARAGRAPH';

export class KanbanRepository {

    // Elimina tarea por id
    public async deleteTask(id: string): Promise<Tarea> {
        return prisma.tarea.delete({ where: { id } });
    }

    // Obtiene todas las tareas de un proyecto, con relaciones
    public async getAllTask(proyectoId: string): Promise<TareaConRelaciones[]> {
        if (!proyectoId.trim()) throw new Error("Se requiere un ID de proyecto válido.");

        return prisma.tarea.findMany({
            include: {
                BloqueContenido: true,
                etiquetas: { include: { etiqueta: true } },
                responsables: { include: { usuario: true } },
            },
            orderBy: { posicion: 'asc' },
            where: { proyectoId }
        });
    }


    // Obtener estados del proyecto con tareas
    public async getEstadosByProyectoId(proyectoId: string) {
        return prisma.estado.findMany({
            include: {
                tareas: {
                    include: {
                        BloqueContenido: true,
                        etiquetas: { include: { etiqueta: true } },
                        responsables: { include: { usuario: true } },
                    },
                    orderBy: { posicion: 'asc' }
                }
            },
            orderBy: { posicion: 'asc' },
            where: { proyectoId }
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
    public async getTaskById(id: string): Promise<null | TareaConRelaciones> {
        return prisma.tarea.findUnique({
            include: {
                BloqueContenido: true,
                etiquetas: { include: { etiqueta: true } },
                responsables: { include: { usuario: true } },
            },
            where: { id },
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
                BloqueContenido: data.bloquesContenido && data.bloquesContenido.length > 0
                    ? {
                        create: data.bloquesContenido.map(bloque => ({
                            contenido: bloque.contenido,
                            posicion: bloque.posicion,
                            tipo: bloque.tipo,
                        })),
                    }
                    : undefined,
                estadoId: data.estadoId,
                etiquetas: data.etiquetaIds && data.etiquetaIds.length > 0
                    ? {
                        create: data.etiquetaIds.map(etiquetaId => ({
                            etiquetaId: etiquetaId,
                        })),
                    }
                    : undefined,
                fechaLimite: data.fechaLimite,
                posicion: data.posicion ?? 0,
                proyectoId: data.proyectoId,
                responsables: data.responsablesIds && data.responsablesIds.length > 0
                    ? {
                        create: data.responsablesIds.map(usuarioId => ({
                            usuarioId: usuarioId,
                        })),
                    }
                    : undefined,
                titulo: data.titulo,
            },
            include: {
                BloqueContenido: true,
                etiquetas: { include: { etiqueta: true } },
                responsables: { include: { usuario: true } },
            },
        });
    }

    // En tu KanbanRepository (ej: kanbanRepository.ts)

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

        return prisma.$transaction(async (tx) => {
            // Actualizar los campos simples de la tarea
            await tx.tarea.update({
                data: updateData,
                where: { id },
            });

            // Remover responsables si hay
            if (responsablesToRemove && responsablesToRemove.length > 0) {
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
            return tx.tarea.findUnique({
                include: {
                    BloqueContenido: true,
                    etiquetas: { include: { etiqueta: true } },
                    responsables: { include: { usuario: true } },
                },
                where: { id },
            }) as Promise<TareaConRelaciones>;
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
