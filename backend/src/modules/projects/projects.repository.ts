import { Prisma, PrismaClient, Proyectos } from "@prisma/client";

const prisma = new PrismaClient();

export class ProjectRepository {
  public async deleteProject(id: string): Promise<Proyectos> {
    return await prisma.proyectos.delete({ where: { id } });
  }

  // Método para obtener todos los proyectos (si aún lo necesitas)
  public async getAllProjects(): Promise<Proyectos[]> {
    return await prisma.proyectos.findMany();
  }

  // Método actualizado para filtrar por usuario
  public async getProjectsByUser(creadoPorId: string): Promise<Proyectos[]> {
    return await prisma.proyectos.findMany({
      where: { creadoPorId }
    });
  }

  public async insertProject(data: Prisma.ProyectosCreateInput): Promise<Proyectos> {
    return await prisma.proyectos.create({ data });
  }

  // Método para verificar si el proyecto pertenece al usuario
  public async isProjectOwner(projectId: string, userId: string): Promise<boolean> {
    const project = await prisma.proyectos.findFirst({
      where: { 
        creadoPorId: userId,
        id: projectId 
      }
    });
    return !!project;
  }

  public async updateProject(id: string, data: Prisma.ProyectosUpdateInput): Promise<Proyectos> {
    return await prisma.proyectos.update({
      data,
      where: { id },
    });
  }

  public async userExists(id: string): Promise<boolean> {
    const user = await prisma.usuario.findUnique({ where: { id } });
    return !!user;
  }
}