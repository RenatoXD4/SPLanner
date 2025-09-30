
// 1mer archivo a modificar en caso de crear una nueva función

import { Tarea } from "@prisma/client";

import { prisma } from "../../lib/prisma.js";

export class KanbanRepository {

    // Función para borrar una tarea
    public async deleteTask(id: string): Promise<Tarea> {

        return await prisma.tarea.delete({
            where: { id },
        });

    }

    // Función para obtener las tareas

    public async getAllTask(idP: string): Promise<Tarea[]> {
        // Validar que el ID del proyecto sea válido (no vacío ni solo espacios)
        if (!idP || idP.trim() === '') {
            throw new Error("Se requiere un ID de proyecto válido.");
        }

        // Buscar tareas donde proyectoId coincida con idP
        const tareas = await prisma.tarea.findMany({
            where: {
                proyectoId: idP,
            },
        });

        return tareas;
    }


    public async insertNuevaTarea(data: Tarea): Promise<Tarea> {
        // Validación de ejemplo, título es obligatorio
        //if (!data.titulo || data.titulo.trim() === '') {
        //    throw new Error("El título de la tarea es obligatorio.");
        //}

        // Crear la tarea en la base de datos
        return await prisma.tarea.create({
            data
        });
    }


    // Función para Actualizar una Tarea

    public async UpdateTask(data: Tarea): Promise<Tarea> {           // VERIFICAR SI ES NULL O VOID

        return await prisma.tarea.update({

            // Recibe un Json con los datos actuales y cambiados del frontend
            data: data,

            // Id de la tarea
            where: {
                id: data.id,
            }
        });
    }

    public async UpdateTaskv2(params: { data: Partial<Tarea>; where: { id: string }, }): Promise<Tarea> {
        return await prisma.tarea.update({
            data: params.data,      // campos a actualizar
            where: params.where,    // qué registro actualizar
        });
    }




}