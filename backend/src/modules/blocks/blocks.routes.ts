import { Router } from 'express';

import { BlocksController } from './blocks.controller.js';
import { blockSer } from './blocks.services.js';


const blocksRouter = Router();

const bloquesController = new BlocksController(blockSer);


blocksRouter.put(
  '/:tareaId/blocks/:usuarioId', 
  bloquesController.handleActualizarBloques
);

blocksRouter.get(
  '/:tareaId/blocks',
  bloquesController.handleObtenerBloques
);

blocksRouter.get(
  '/fetchUrl', 
  bloquesController.fetchUrlData
)


export default blocksRouter;