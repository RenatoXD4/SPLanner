/**
 * Rutas para gestión de tareas (Kanban).
 *
 * Flujo de actualización de una tarea:
 *
 * 1. Cliente envía PUT a /tasks/:id con los campos a actualizar.
 * 2. Router dirige al controlador `requestUpdateTaskv2`.
 * 3. Controlador extrae `id` y body.
 * 4. Controlador llama al servicio `updateTaskv2`.
 * 5. Servicio valida `id` y body, y llama al repositorio.
 * 6. Repositorio usa Prisma para actualizar.
 * 7. La tarea actualizada es enviada como respuesta.
 * 8. Errores se manejan con middleware.
 */

import { Router } from 'express';

import { KanbanController } from './kanban.controller.js';
import { kanbanSer } from './kanban.service.js';

const routerKanbantask = Router();
const controladorDeF = new KanbanController(kanbanSer);

// Crear nueva tarea
routerKanbantask.post('/tasks', controladorDeF.requestCreateTask.bind(controladorDeF));

// Obtener todas las tareas de un proyecto (RESTful mejor así)
routerKanbantask.get('/projects/:proyectoId/tasks', controladorDeF.requestgetAllTask.bind(controladorDeF));

// Obtener tarea por ID
routerKanbantask.get('/tasks/:id', controladorDeF.requestGetTaskById.bind(controladorDeF));

// Eliminar tarea por ID
routerKanbantask.delete('/tasks/:id', controladorDeF.requestDeleteTask.bind(controladorDeF));

// Actualizar tarea (requiere objeto completo)
routerKanbantask.put('/tasks/full/:id', controladorDeF.requestUpdateTask.bind(controladorDeF));

// Actualización parcial (solo campos modificados) — usar PATCH semánticamente
routerKanbantask.patch('/tasks/:id', controladorDeF.requestUpdateTaskv2.bind(controladorDeF));

// Obtener estados por proyectoId
routerKanbantask.get('/estados/:proyectoId', controladorDeF.obtenerEstados.bind(controladorDeF));

// Obtener miembros del proyecto por proyectoId (responsables de tareas)
routerKanbantask.get('/proyectos/:proyectoId/miembros', controladorDeF.requestGetMiembrosDelProyecto.bind(controladorDeF));

// Obtener equipo completo del proyecto (todos los miembros)
routerKanbantask.get('/proyectos/:proyectoId/equipo', controladorDeF.requestGetEquipoProyecto.bind(controladorDeF));



// para usar postman>> http://localhost:9001/api-v1/kanban/tasks/2c1a2523-c447-4b65-a595-17324cad1532       --> debe de ser un Id de proyecto valido   http://localhost:9001/api-v1/kanban/tasks/idproyectoaqui

// Si hay problemas probar con lo siguiente --> en vez de controladorDef usar KanbanController
// routerKanbantask.get('/project/:proyectoId', controladorDeF.requestgetAllTask.bind(KanbanController));

export default routerKanbantask;



/// POSTMAN INTRUCCIONES

// POST
// http://localhost:9001/api-v1/kanban/tasks
//JSON
//{
//  "titulo": "Nueva tarea de prueba",
//  "proyectoId": "1fc2cb1f-7580-47dd-b28e-49f139dbfb44",
//  "estadoId": 1
//}

// GET
// http://localhost:9001/api-v1/kanban/tasks/project/1fc2cb1f-7580-47dd-b28e-49f139dbfb44                  // RECUERDA TENER UN PROYECTO YA CREADO EN BD DE POSTGRESQL

// PUT
//http://localhost:9001/api-v1/kanban/tasks/abc123                      // DEBE DE SER UN ID DE TAREA VALIDO, SACA EL TUYO DE LA BD, RECUERDA QUE DEBE DE TENER UN ID DE PROYECTO ASOCIADO
//{
//  "titulo": "Tarea actualizada desde Postman",
//  "posicion": 2
//}

// DELETE // 
