
// 4to archivo a modificar


/**
 * Rutas para gestión de tareas (Kanban).
 * 
 * Flujo de actualización de una tarea:
 * 
 * 1. El cliente envía una petición PUT a /tasks/:id con los campos a actualizar en el body.
 * 2. El router direcciona la petición al controlador `requestUpdateTaskv2`.
 * 3. El controlador extrae el `id` de la URL y los datos del body.
 * 4. El controlador llama al servicio `updateTaskv2`, delegando validaciones.
 * 5. El servicio valida el `id` y los datos, luego llama al repositorio.
 * 6. El repositorio ejecuta la consulta Prisma para actualizar la tarea en la base de datos.
 * 7. La tarea actualizada es retornada y finalmente enviada como respuesta al cliente.
 * 8. En caso de error, se manejan adecuadamente los códigos HTTP y mensajes.
 */


import { Router } from 'express';

import { KanbanController } from './kanban.controller.js';
import { kanbanSer } from './kanban.service.js';                // esto lo importas del kanban service en las lineas finales




const routerKanbantask = Router();

const controladorDeF = new KanbanController(kanbanSer);

// update v1 con json completo como paremetro
routerKanbantask.put('/:id', controladorDeF.requestUpdateTask.bind(KanbanController));

// Update solo lo necesario
routerKanbantask.put('/tasks/:id', controladorDeF.requestUpdateTaskv2.bind(controladorDeF));    // /tasks/:id --> task hace referencia al modulo y id es lo que recibe y lo unico necesario para identificar una tarea y realizar el proceso del update

// CREAR NUEVA TAREA    --> no necesita un ID para crear una tarea
routerKanbantask.post('/', controladorDeF.requestCreateTask.bind(controladorDeF));

// Eliminar una tarea específica por su ID
routerKanbantask.delete('/task/:id', controladorDeF.requestDeleteTask.bind(KanbanController));

// Ruta para obtener todas las tareas de un proyecto específico
routerKanbantask.get('/project/:proyectoId', controladorDeF.requestgetAllTask.bind(controladorDeF));

//                                                  LEER
// En caso de que las peticiones no funcionen, 
//routerKanbantask.get('/project/:proyectoId', controladorDeF.requestgetAllTask.bind(controladorDeF));      v1
//routerKanbantask.get('/project/:proyectoId', controladorDeF.requestgetAllTask.bind(KanbanController));    v2  caso de error usar este para todos

export default routerKanbantask;