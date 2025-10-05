import { Router } from "express";
import { ProjectController } from "./project.controller.js";

const routerProject = Router();
const projectController = new ProjectController();

routerProject.post("/", projectController.requestCreateProject.bind(projectController));
routerProject.get("/", projectController.requestListProjects.bind(projectController));
routerProject.delete("/:id", projectController.requestDeleteProject.bind(projectController));
routerProject.patch("/:id", projectController.requestUpdateProject.bind(projectController));

export default routerProject;
