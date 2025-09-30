
// 3cer archivo a modificar


import { Tarea } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { KanbanService } from "./kanban.service.js";



export class KanbanController {
    constructor(private readonly KanbanSer: KanbanService) { }


    // controller.ts
    public async requestCreateTask(
        req: Request,              // solicitud entrante
        res: Response,            // respuesta para el cliente
        next: NextFunction        // para pasar errores al middleware
    ): Promise<void> {
        try {
            const tareaData = req.body as Tarea;

            // Validar que el cuerpo no esté vacío
            if (Object.keys(tareaData).length === 0) {
                res.status(400).json({ message: "Datos de tarea incompletos o vacíos." });
                return;
            }

            // Llamar al servicio para crear la tarea
            const nuevaTarea = await this.KanbanSer.createTask(tareaData);

            // Enviar la tarea creada en la respuesta
            res.status(201).json(nuevaTarea);

        } catch (error) {
            // Manejo de errores, por ejemplo errores de validación o base de datos
            next(error);
        }
    }


    public async requestDeleteTask(
        req: Request,               // la solicitud entrante (params, body, etc.)
        res: Response,              // la respuesta que se enviará al cliente
        next: NextFunction          // pasa errores al middleware de manejo de errores
    ): Promise<void> {
        try {
            const { id } = req.params;

            // Validación: asegurarse de que se envió un ID válido
            if (!id || id.trim() === '') {
                res.status(400).json({ message: "El ID de la tarea es requerido." });
                return;
            }

            // Lógica de negocio: eliminar la tarea usando el service
            const deletedTask = await this.KanbanSer.deleteOneTask(id);

            // Respuesta exitosa con la tarea eliminada
            res.status(200).json(deletedTask);

        } catch (e) {
            // Captura cualquier error y lo pasa al middleware de manejo de errores
            next(e);
        }
    }


    public async requestgetAllTask(
        req: Request,               // la solicitud entrante (con params, body, etc.).
        res: Response,              // la respuesta que se enviará al cliente.
        next: NextFunction          // para pasar errores al middleware de manejo de errores.
    ): Promise<void> {
        try {
            const { proyectoId } = req.params;

            // Validar que el ID del proyecto no sea vacío o solo espacios
            if (!proyectoId || proyectoId.trim() === '') {
                res.status(400).json({ error: "ID de proyecto inválido." });
                return;
            }

            // Llamar al servicio para obtener todas las tareas del proyecto
            const tareas = await this.KanbanSer.getAlltasks(proyectoId);

            // Enviar la lista de tareas en la respuesta
            res.status(200).json(tareas);
        } catch (e) {
            console.error("Error al obtener tareas:", e);
            next(e);  // Pasar el error al middleware de manejo de errores
        }
    }



    public async requestUpdateTask(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const T = req.body as Tarea;

            if (!T.id) {            // Valida si existe la tarea
                res.status(400).json({ message: "La tarea no existe" })
                return
            }

            const UpdateT = await this.KanbanSer.updateTask(T);
            res.status(200).json(UpdateT);
        } catch (e) {
            next(e);
        }

    }

    public async requestUpdateTaskv2(
        req: Request,               // la solicitud entrante (con params, body, etc.).
        res: Response,              // la respuesta que se enviará al cliente.
        next: NextFunction          // para pasar errores al middleware de manejo de errores.
    ): Promise<void> {
        try {
            const tareaId = req.params.id;
            const data = { ...req.body } as Partial<Tarea>; // Clonamos para no mutar req.body

            // Validar ID en URL
            if (!tareaId || tareaId.trim() === '') {
                res.status(400).json({ message: "El ID de la tarea es requerido en la URL." });
                return;
            }

            // Validar que haya al menos un campo para actualizar
            if (Object.keys(data).length === 0) {
                res.status(400).json({ message: "Debes proporcionar al menos un campo para actualizar." });
                return;
            }

            // Eliminar campos que no deben modificarse
            delete data.id;
            delete data.createdAt;

            // Llamar al service para actualizar la tarea
            const tareaActualizada = await this.KanbanSer.updateTaskv2(tareaId, data);

            res.status(200).json(tareaActualizada);

        } catch (e) {
            // Errores no controlados pasan al middleware
            next(e);
        }
    }












}