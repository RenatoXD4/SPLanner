import { Proyectos } from "@prisma/client";

import { ProjectRepository } from "./projects.repository.js";

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  async deleteOneProject(
    id: string,
    currentUserId: string
  ): Promise<Proyectos> {
    const project = await this.projectRepository.deleteProject(id);

    if (!project) {
      throw new Error(`El proyecto con ID ${id} no fue encontrado.`);
    }

    if (project.creadoPorId !== currentUserId) {
      throw new Error(
        "Permiso denegado. No tienes autorización para borrar este proyecto."
      );
    }
    return project;
  }

  async getOneProject(id: string): Promise<Proyectos> {
    const project = await this.projectRepository.getProject(id);

    if (!project) {
      throw new Error("El proyecto no fue encontrado");
    }

    return project;
  }

  async getProjects(): Promise<Proyectos[]> {
   
    const proyectos = await this.projectRepository.getAllProjects();
    
    return proyectos.map(p => ({
          ...p,
          esOno: p.id == "Cancelado" ? true : false, // Esto es un ejemplo para manipular consultas y devolver propiedades personalizadas
    }));
  }
}

const projectService = new ProjectService();


export { projectService };
