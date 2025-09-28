import { NextFunction, Request, Response } from "express";

import { ProjectService } from "./projects.service.js";

export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  public async requestDeleteProject(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id, ownerId } = req.params;

      if (!id || !ownerId) {
        res.status(400).json({ message: "Se requiere el ID del usuario y el ID del proyecto" });
        return;
      }

      const deletedProject = await this.projectService.deleteOneProject(
        id,
        ownerId
      );

      res.status(200).json(deletedProject);
    } catch (e) {
      next(e);
    }
  }
}
