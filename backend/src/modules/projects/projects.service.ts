import { Prisma, Proyectos } from "@prisma/client";

import { ProjectRepository } from "./projects.repository.js";

// Definir interfaces para los proyectos con counts
interface ProyectoConCount extends Proyectos {
  _count?: {
    miembros: number;
  };
  creadoPor?: {
    apellido: string;
    email: string;
    id: string;
    nombre: string;
  };
}

interface ProyectoConMiembrosCount extends Proyectos {
  creadoPor?: {
    apellido: string;
    email: string;
    id: string;
    nombre: string;
  };
  miembrosCount: number;
}

export class ProjectService {
  private projectRepository: ProjectRepository;

  constructor() {
    this.projectRepository = new ProjectRepository();
  }

  async checkUserExists(userId: string): Promise<boolean> {
    return this.projectRepository.userExists(userId);
  }

  async createProject(data: Prisma.ProyectosCreateInput): Promise<Proyectos> {
    return this.projectRepository.insertProject(data);
  }

  // Mantener este método si lo necesitas para admin
  async listAllProjects(): Promise<ProyectoConMiembrosCount[]> {
    const projects = await this.projectRepository.getAllProjects() as ProyectoConCount[];
    return projects.map(project => ({
      ...project,
      miembrosCount: project._count?.miembros ?? 0
    }));
  }

  async listProjectsByMember(userId: string): Promise<ProyectoConMiembrosCount[]> {
  const projects = await this.projectRepository.getProjectsByMember(userId) as ProyectoConCount[];
  return projects.map(project => ({
    ...project,
    miembrosCount: project._count?.miembros ?? 0
  }));
}

  // Nuevo método para obtener proyectos por usuario
  async listProjectsByUser(userId: string): Promise<ProyectoConMiembrosCount[]> {
    const projects = await this.projectRepository.getProjectsByUser(userId) as ProyectoConCount[];
    return projects.map(project => ({
      ...project,
      miembrosCount: project._count?.miembros ?? 0
    }));
  }

  async modifyProject(id: string, data: Prisma.ProyectosUpdateInput, userId: string): Promise<Proyectos> {
    // Verificar que el proyecto pertenezca al usuario
    const isOwner = await this.projectRepository.isProjectOwner(id, userId);
    if (!isOwner) {
      throw new Error("No tienes permisos para editar este proyecto");
    }
    return this.projectRepository.updateProject(id, data);
  }
  async removeProject(id: string, userId: string): Promise<Proyectos> {
    // Verificar que el proyecto pertenezca al usuario
    const isOwner = await this.projectRepository.isProjectOwner(id, userId);
    if (!isOwner) {
      throw new Error("No tienes permisos para eliminar este proyecto");
    }
    return this.projectRepository.deleteProject(id);
  }


}