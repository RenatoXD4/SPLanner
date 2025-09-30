
// 3cer archivo a modificar


import { Tarea } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { KanbanService } from "./kanban.service.js";



export class KanbanController {
    constructor(private readonly KanbanSer: KanbanService) { }


    public async requestCreateTask(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const tarea = req.body as Tarea;            // Esto es para entregar un Objecto completo

            // para hacer validaciones debes de desectructurar el objecto 

            const createT = await this.KanbanSer.createTASK(tarea)

            res.status(200).json(createT);
        } catch (e) {
            next(e);
        }

    }

    public async requestDeleteTask(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = req.params;

            // VALIDACIONES
            // Ejemplo de Validación de ser necesaria
            /*
            if (!id || !ownerId) {
                res.status(400).json({ message: "Se requiere el ID del usuario y el ID del proyecto" });
                return;
            }*/

            // ACA ABAJO CONSTRUIR EN CASO DE QUE PASE LA VALIDACIÓN

            // Proceso para eliminar la tarea
            const deletedTask = await this.KanbanSer.deleteOneTask(
                id
            );

            res.status(200).json(deletedTask);
        } catch (e) {   // Esto atrapa el error y envia el resultado al middlewares <-- aqui se maneja la logica de como maneja el error
            next(e);
        }
    }

    public async requestUpdateTask(req: Request, res: Response, next: NextFunction): Promise<void>{

        try {

            const T = req.body as Tarea;

            // Valida si existe la tarea
            if (!T.id){
                res.status(400).json({ message: "La tarea no existe"})
            }

            const UpdateT = await this.KanbanSer.updateTask(T);
            

            res.status(200).json(UpdateT);
        } catch (e) {
            next(e);
        }

    }

}