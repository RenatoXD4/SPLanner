import { Router } from 'express';

import { ProjectController } from './project.controller.js';
import { projectService } from './projects.service.js';

const routerProject = Router();

const projectController = new ProjectController(projectService)

routerProject.delete('/:projectId/:ownerId', projectController.requestDeleteProject.bind(projectController));

export default routerProject;