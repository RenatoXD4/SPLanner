import { Router } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';

import { BlocksController } from './blocks.controller.js';
import { blockSer } from './blocks.services.js';


const blocksRouter = Router();

const bloquesController = new BlocksController(blockSer);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    // Crear carpeta 
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // fecha + nombre original
    const uniqueSuffix = Date.now().toString() + '-' + Math.round(Math.random() * 1E9).toString();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

blocksRouter.post(
  '/uploads/image', 
  upload.single('image'), 
  bloquesController.uploadImage
);

blocksRouter.post(
  '/uploads/fetchImageUrl', 
  bloquesController.fetchImageUrl
);

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