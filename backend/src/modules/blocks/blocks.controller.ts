import { Request, Response } from 'express';

import { BlocksService } from "./blocks.services.js";
import { EditorJSOutputData } from "./interface.js";


export class BlocksController {
  constructor(private bloquesService: BlocksService) {}

  public handleActualizarBloques = async (req: Request, res: Response): Promise<void> => {
    try {
      const { tareaId, usuarioId } = req.params;
      
      const outputData = req.body as EditorJSOutputData; 

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!outputData || !Array.isArray(outputData.blocks)) {
        res.status(400).json({ 
          message: 'Cuerpo de la petición inválido.' 
        });
        return;
      }

      const bloquesActualizados = await this.bloquesService.actualizarBloques(tareaId, outputData, usuarioId);
      res.status(200).json(bloquesActualizados);

    } catch (error) {
      console.error('Error al actualizar bloques:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

  public handleObtenerBloques = async (req: Request, res: Response): Promise<void> => {
    try {
      const { tareaId } = req.params;
      
      const outputData = await this.bloquesService.obtenerBloques(tareaId);
      
      res.status(200).json(outputData);

    } catch (error) {
      console.error('Error al obtener bloques:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }

}