import { ProjectRepository } from "./projects.repository.js";
import { Proyectos, Prisma } from "@prisma/client";

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  async createProject(data: Prisma.ProyectosCreateInput): Promise<Proyectos> {
    return this.projectRepository.insertProject(data);
  }

  async removeProject(id: string): Promise<Proyectos> {
    return this.projectRepository.deleteProject(id);
  }

  async listProjects(): Promise<Proyectos[]> {
    return this.projectRepository.getAllProjects();
  }

  async modifyProject(id: string, data: Prisma.ProyectosUpdateInput): Promise<Proyectos> {
    return this.projectRepository.updateProject(id, data);
  }

  async checkUserExists(userId: string): Promise<boolean> {
    return this.projectRepository.userExists(userId);
  }
}
