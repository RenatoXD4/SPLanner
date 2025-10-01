import { Request, Response, NextFunction } from "express";
import { ProjectService } from "./projects.service.js";

export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  // Crear proyecto
  public async requestCreateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body;
      if (!data || !data.nombre || !data.creadoPorId) {
        res.status(400).json({ message: "Faltan datos requeridos (nombre, creadoPorId)" });
        return;
      }

      const userExists = await this.projectService.checkUserExists(data.creadoPorId);
      if (!userExists) {
        res.status(400).json({ message: "Usuario no encontrado" });
        return;
      }

      const newProject = await this.projectService.createProject(data);
      res.status(201).json(newProject);
    } catch (e) {
      next(e);
    }
  }

  // Borrar proyecto
  public async requestDeleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: "Se requiere el ID del proyecto" });
        return;
      }

      const deleted = await this.projectService.removeProject(id);
      res.status(200).json({ message: "Proyecto eliminado", deleted });
    } catch (e: any) {
      if (e.code === "P2025") {
        res.status(404).json({ message: "Proyecto no encontrado" });
      } else {
        next(e);
      }
    }
  }

  // Listar proyectos
  public async requestListProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const projects = await this.projectService.listProjects();
      res.status(200).json(projects);
    } catch (e) {
      next(e);
    }
  }

  // Actualizar proyecto
  public async requestUpdateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!id || !data) {
        res.status(400).json({ message: "Se requiere ID y datos para actualizar" });
        return;
      }

      const updated = await this.projectService.modifyProject(id, data);
      res.status(200).json({ message: "Proyecto actualizado", updated });
    } catch (e: any) {
      if (e.code === "P2025") {
        res.status(404).json({ message: "Proyecto no encontrado" });
      } else {
        next(e);
      }
    }
  }
}
