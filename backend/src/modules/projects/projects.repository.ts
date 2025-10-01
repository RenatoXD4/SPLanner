import { PrismaClient, Proyectos, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export class ProjectRepository {
  public async insertProject(data: Prisma.ProyectosCreateInput): Promise<Proyectos> {
    return await prisma.proyectos.create({ data });
  }

  public async deleteProject(id: string): Promise<Proyectos> {
    return await prisma.proyectos.delete({ where: { id } });
  }

  public async getAllProjects(): Promise<Proyectos[]> {
    return await prisma.proyectos.findMany();
  }

  public async updateProject(id: string, data: Prisma.ProyectosUpdateInput): Promise<Proyectos> {
    return await prisma.proyectos.update({
      where: { id },
      data,
    });
  }

  public async userExists(id: string): Promise<boolean> {
    const user = await prisma.usuario.findUnique({ where: { id } });
    return !!user;
  }
}
