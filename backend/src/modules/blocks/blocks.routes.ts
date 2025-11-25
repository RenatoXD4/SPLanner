import { Router } from 'express';

import { BlocksController } from './blocks.controller.js';
import { blockSer } from './blocks.services.js';


const blocksRouter = Router();

const bloquesController = new BlocksController(blockSer);


blocksRouter.put(
  '/:tareaId/blocks/:usuarioId', 
  bloquesController.handleActualizarBloques.bind(bloquesController)
);

blocksRouter.get(
  '/:tareaId/blocks',
  bloquesController.handleObtenerBloques.bind(bloquesController) 
);


export default blocksRouter;