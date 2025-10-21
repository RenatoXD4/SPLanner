import { Router } from "express";

import { ProjectController } from "./project.controller.js";

const routerProject = Router();
const projectController = new ProjectController();

// Definir las rutas directamente en el router de proyectos

routerProject.get('/', projectController.requestListProjects.bind(projectController));
routerProject.get('/member', projectController.requestListProjectsAsMember.bind(projectController));
routerProject.post('/', projectController.requestCreateProject.bind(projectController));
routerProject.patch('/:id', projectController.requestUpdateProject.bind(projectController));
routerProject.delete('/:id', projectController.requestDeleteProject.bind(projectController));

export default routerProject;