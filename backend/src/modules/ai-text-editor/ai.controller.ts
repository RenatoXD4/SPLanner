import { Request, Response } from 'express';

import { AiGenerateRequestBody } from './ai-interface.js';
import { AiService } from './ai.service.js';



export class AiController {
  constructor(private aiService: AiService) {}

  public handleGenerateText = async (req: Request, res: Response): Promise<void> => {
    try {
      const { prompt } = req.body as AiGenerateRequestBody;

      if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({ message: 'Se requiere un "prompt" en el cuerpo.' });
        return;
      }

      const generatedText = await this.aiService.generateText(prompt);
      
      res.status(200).json({ text: generatedText });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno al generar texto.' });
    }
  }
}