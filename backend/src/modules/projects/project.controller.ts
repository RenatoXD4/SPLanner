import { NextFunction, Request, Response } from "express";

import { kanbanSer } from "../kanban/kanban.service.js";
import { ProjectService } from "./projects.service.js";

// Interfaces para los requests
interface CreateProjectRequest {
  creadoPorId: string;
  descripcion?: string;
  nombre: string;
}

interface DeleteProjectRequest {
  userId?: string;
}

interface ProjectResponse {
  deleted?: unknown;
  message: string;
  updated?: unknown;
}

interface UpdateProjectRequest {
  descripcion?: string;
  nombre?: string;
  userId?: string;
}

export class ProjectController {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  // Crear proyecto
  public async requestCreateProject(
    req: Request<object, unknown, CreateProjectRequest>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;

      if (!data.nombre || !data.creadoPorId) {
        res.status(400).json({ message: "Faltan datos requeridos (nombre, creadoPorId)" });
        return;
      }

      const userExists = await this.projectService.checkUserExists(data.creadoPorId);
      if (!userExists) {
        res.status(400).json({ message: "Usuario no encontrado" });
        return;
      }

      const newProject = await this.projectService.createProject({
        creadoPor: {
          connect: { id: data.creadoPorId }
        },
        descripcion: data.descripcion ?? null,
        nombre: data.nombre
      });

      //Crear estados x defecto
      await kanbanSer.createDefaultEstados(newProject.id);

      // Crear etiquetas por defecto después de crear proyecto
      await kanbanSer.createDefaultPriorities(newProject.id);

      res.status(201).json(newProject);
    } catch (error: unknown) {
      next(error);
    }
  }

  // Borrar proyecto
  public async requestDeleteProject(
    req: Request<{ id: string }, unknown, DeleteProjectRequest>,
    res: Response<ProjectResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { userId } = req.body;

      if (!id) {
        res.status(400).json({ message: "Se requiere el ID del proyecto" });
        return;
      }

      if (!userId) {
        res.status(400).json({ message: "Se requiere el ID del usuario" });
        return;
      }

      const deleted = await this.projectService.removeProject(id, userId);
      res.status(200).json({ deleted, message: "Proyecto eliminado" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const prismaError = error as { code?: string };
        if (prismaError.code === "P2025") {
          res.status(404).json({ message: "Proyecto no encontrado" });
        } else if (error.message === "No tienes permisos para eliminar este proyecto") {
          res.status(403).json({ message: error.message });
        } else {
          next(error);
        }
      } else {
        next(error);
      }
    }
  }

  // Listar proyectos del usuario
  public async requestListProjects(
    req: Request<object, unknown, unknown, { userId: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.query;

      if (!userId) {
        res.status(400).json({ message: "Se requiere el ID del usuario" });
        return;
      }

      const projects = await this.projectService.listProjectsByUser(userId);
      res.status(200).json(projects);
    } catch (error: unknown) {
      next(error);
    }
  }

  // Actualizar proyecto
  public async requestUpdateProject(
    req: Request<{ id: string }, unknown, UpdateProjectRequest>,
    res: Response<ProjectResponse>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { userId, ...updateData } = req.body;

      if (!id) {
        res.status(400).json({ message: "Se requiere ID del proyecto" });
        return;
      }

      if (!userId) {
        res.status(400).json({ message: "Se requiere el ID del usuario" });
        return;
      }

      const updated = await this.projectService.modifyProject(id, updateData, userId);
      res.status(200).json({ message: "Proyecto actualizado", updated });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const prismaError = error as { code?: string };
        if (prismaError.code === "P2025") {
          res.status(404).json({ message: "Proyecto no encontrado" });
        } else if (error.message === "No tienes permisos para editar este proyecto") {
          res.status(403).json({ message: error.message });
        } else {
          next(error);
        }
      } else {
        next(error);
      }
    }
  }
}