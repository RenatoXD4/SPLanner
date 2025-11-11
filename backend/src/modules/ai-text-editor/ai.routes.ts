// src/ai/ai.routes.ts
import { Router } from 'express';

import { AiController } from './ai.controller.js';
import { aiServ } from './ai.service.js';

const aiController = new AiController(aiServ);

const aiRouter = Router();

aiRouter.post(
  '/generate',
  aiController.handleGenerateText.bind(aiController)
);

export default aiRouter;