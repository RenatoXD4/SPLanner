
// 2do archivo a modificar 


import { Tarea } from "@prisma/client";

import { KanbanRepository } from "./kanban.repository.js";


export class KanbanService {

    private kanbanrepo: KanbanRepository;

    constructor() {
        this.kanbanrepo = new KanbanRepository();
    }


    async createTASK(datosTarea: Tarea ): Promise<Tarea>{

        const tareaCreada = await this.kanbanrepo.insertNuevaTarea(datosTarea)

        return tareaCreada;        // retorna el resultado
    }

    async deleteOneTask(
        // Variables 
        id: string,

    ): Promise<Tarea> {
        // Logica para eliminar una tarea
        const task = await this.kanbanrepo.deleteTask(id);      // Referencia a funcion del ts de este modulo

        if (!task) {
            throw new Error(`La tarea con ID ${id} no fue encontrado.`);
        }

        // ejemplo para una condicional
        /* 
        if (task. !== currentUserId) {
          throw new Error(
            "Permiso denegado. No tienes autorización para borrar este proyecto."
          );
        }*/

        return task;        // retorna el resultado
    }

    async updateTask(tareaDatos: Tarea): Promise<Tarea>{

        const update = await this.kanbanrepo.UpdateTask(tareaDatos);

        return update;        // retorna el resultado
    }

}

const kanbanSer = new KanbanService();


export { kanbanSer };


