
// 2do archivo a modificar 


import { Tarea } from "@prisma/client";

import { KanbanRepository } from "./kanban.repository.js";


export class KanbanService {

    private kanbanrepo: KanbanRepository;

    constructor() {
        this.kanbanrepo = new KanbanRepository();
    }


    public async createTask(data: Tarea): Promise<Tarea> {
        // Validar datos mínimos requeridos (se puede ampliar según necesidad)
        if (!data.titulo || data.titulo.trim() === '') {
            throw new Error("El título de la tarea es obligatorio.");
        }
        if (!data.proyectoId || data.proyectoId.trim() === '') {
            throw new Error("El ID del proyecto es obligatorio.");
        }
        if (!data.estadoId) {
            throw new Error("El ID del estado es obligatorio.");
        }

        // Delegar al repositorio para crear la tarea
        return await this.kanbanrepo.insertNuevaTarea(data);
    }

    async deleteOneTask(id: string): Promise<Tarea> {
        // Llamada al repositorio para eliminar la tarea
        const task = await this.kanbanrepo.deleteTask(id);

        // Prisma lanza error si no existe, pero si por algún motivo
        // regresa null o undefined, aquí lo controlamos:
        //if (!task) {
        //    throw new Error(`La tarea con ID ${id} no fue encontrada.`);
        //}

        // Ejemplo para validar permisos antes de eliminar
        /*
        if (task.ownerId !== currentUserId) {
            throw new Error("Permiso denegado. No tienes autorización para borrar esta tarea.");
        }
        */
        return task;  // Retornamos la tarea eliminada
    }


    //        VERIFICAR SI ES CORRECTA ESTA FORMA DE OBTENER TODAS LAS TAREAS
    async getAlltasks(idproyecto: string): Promise<Tarea[]> {
        // Validar que se proporcione un ID válido (no vacío ni solo espacios)
        if (!idproyecto || idproyecto.trim() === '') {
            throw new Error("Se requiere un ID de proyecto válido.");
        }

        // Obtener las tareas que pertenecen al proyecto indicado
        const tareas = await this.kanbanrepo.getAllTask(idproyecto);

        return tareas;
    }


    // ACTUALIZA TODO EL ARREGLO, INCLUSO CUANDO SOLO LE MODIFICO 1 DATO
    async updateTask(tareaDatos: Tarea): Promise<Tarea> {

        if (!tareaDatos.id) {
            throw new Error("El ID de la tarea es requerido para actualizar.");
        }

        const tareaActualizada = await this.kanbanrepo.UpdateTask(tareaDatos);

        return tareaActualizada;     // retorna el resultado
    }

    // ESTE UPDATE SOLO ACTUALIZA CAMPOS MODIFICADOS EN VEZ DE TODO EL ARREGLO
    async updateTaskv2(id: string, data: Partial<Tarea>): Promise<Tarea> {
        // Validar que el ID no esté vacío o sea solo espacios
        if (!id || id.trim() === '') {
            throw new Error("El ID de la tarea es requerido.");
        }

        // Validar que se haya enviado al menos un campo para actualizar
        if (Object.keys(data).length === 0) {
            throw new Error("Debe proporcionar al menos un campo para actualizar.");
        }

        // Llamar al repositorio para hacer la actualización en la base de datos
        return await this.kanbanrepo.UpdateTaskv2({
            data,           // Campos con los valores a actualizar
            where: { id },  // Condición para buscar la tarea por su ID
        });
    }






}

const kanbanSer = new KanbanService();


export { kanbanSer };


