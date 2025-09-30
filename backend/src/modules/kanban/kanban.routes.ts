
// 4to archivo a modificar



import { Router } from 'express';

import { KanbanController } from './kanban.controller.js';
import { kanbanSer } from './kanban.service.js';                // esto lo importas del kanban service en las lineas finales




const routerKanbantask = Router();

const controladorDeF = new KanbanController(kanbanSer);

routerKanbantask.delete('/:projectId', controladorDeF.requestDeleteTask.bind(KanbanController));
routerKanbantask.put('/:id', controladorDeF.requestUpdateTask.bind(KanbanController));
routerKanbantask.post('/:id', controladorDeF.requestCreateTask.bind(KanbanController));


export default routerKanbantask;