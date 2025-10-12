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

    // Crear etiquetas por defecto (prioridades)                                    // RELACIONADO CON ETIQUETAS
    // Ahora necesita un proyectoId para asignar las etiquetas por defecto a un proyecto
    public async createDefaultPriorities(proyectoId: string): Promise<void> {
        const defaultPriorities = ["Alta", "Media", "Baja"];

        for (const nombre of defaultPriorities) {
            await prisma.etiqueta.upsert({      // upsert es basicamente insertar y actualizar, en caso de que ya exista lo actualiza, en caso de que no exista lo crea 
                create: {
                    nombre,
                    proyectoId,
                },
                update: {},
                where: {
                    // La clave única ahora es compuesta: nombre + proyectoId       // esto se ve en la tabla etiquetas en el unique que es donde estan estas 2 relaciones
                    nombre_proyectoId: {
                        nombre,
                        proyectoId,
                    }
                },
            });
        }
    }

    // Eliminar etiqueta por ID y proyecto, devolviendo la etiqueta eliminada
    public async deleteEtiqueta(id: number, proyectoId: string): Promise<Etiqueta> {
        const etiqueta = await prisma.etiqueta.findFirst({
            where: { id, proyectoId },
        });

        if (!etiqueta) {
            throw new Error("Etiqueta no encontrada o no pertenece al proyecto");
        }

        return prisma.etiqueta.delete({
            where: { id },
        });
    }

    // Elimina tarea por id
    public async deleteTask(id: string): Promise<Tarea> {
        return prisma.tarea.delete({ where: { id } });
    }

    // Obtener todas las etiquetas ordenadas alfabéticamente
    // Debe recibir proyectoId para filtrar etiquetas de ese proyecto
    public async getAllEtiquetas(proyectoId: string): Promise<Etiqueta[]> {
        if (!proyectoId.trim()) throw new Error("El proyectoId es obligatorio");

        return prisma.etiqueta.findMany({
            orderBy: { nombre: "asc" },
            where: { proyectoId },
        });
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
        if (!proyectoId.trim()) {
            throw new Error("El ID del proyecto es requerido.");
        }
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


    // Obtener una etiqueta por ID    // Para evitar que un usuario acceda a etiquetas de otro proyecto, opcionalmente se puede recibir proyectoId y validar
    public async getEtiquetaById(id: number, proyectoId?: string): Promise<Etiqueta | null> {
        return prisma.etiqueta.findFirst({
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

    // Crear nueva etiqueta   // Recibir proyectoId y guardarlo
    public async insertNuevaEtiqueta(nombre: string, proyectoId: string): Promise<Etiqueta> {
        if (!nombre.trim()) throw new Error("El nombre de la etiqueta es obligatorio");
        if (!proyectoId.trim()) throw new Error("El proyectoId es obligatorio");

        return prisma.etiqueta.create({
            data: { nombre, proyectoId },
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

    // Actualizar etiqueta
    public async updateEtiqueta(id: number, nombre: string, proyectoId: string): Promise<Etiqueta> {
        if (!nombre.trim()) throw new Error("El nombre de la etiqueta es obligatorio");
        if (!proyectoId.trim()) throw new Error("El proyectoId es obligatorio");

        return prisma.etiqueta.update({
            data: { nombre, proyectoId },
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
