
// 1mer archivo a modificar en caso de crear una nueva función

import { Tarea } from "@prisma/client";

import { prisma } from "../../lib/prisma.js";


export class KanbanRepository {

    // Función para borrar una tarea
    public async deleteTask(id: string): Promise<null | Tarea> {
        return await prisma.tarea.delete({
            where: {
                id: id,
            },
        });
    }

    // Función para crear una nueva tarea, la cual recibe todo los datos de la tabla
    public async insertNuevaTarea(data: Tarea): Promise<Tarea> {
        return await prisma.tarea.create({
            data
        });
    }

    // Función para Actualizar una Tarea

    public async UpdateTask(data: Tarea): Promise<Tarea> {

        return await prisma.tarea.update({
            
            // Recibe un Json con los datos actuales y cambiados del frontend
            data: data, 

            // Id de la tarea
            where: {
                id: data.id,
            }
        });
    }


}