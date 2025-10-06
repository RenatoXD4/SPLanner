import { Proyectos } from "@prisma/client";

import { prisma } from "../../lib/prisma.js";

export class ProjectRepository {
  public async deleteProject(id: string): Promise<null | Proyectos> {
    return await prisma.proyectos.delete({
      where: {
        id: id,
      },
    });
  }

  // Esta se debe modificar, por temas de reglas de negocio.Debería devolver todos los proyectos en los que esté el usuario. 
  public async getAllProjects(): Promise<Proyectos[]> { 
    return await prisma.proyectos.findMany();
  }

  public async getProject(id: string): Promise<null | Proyectos> {
    return await prisma.proyectos.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async insertProject(data: Proyectos): Promise<Proyectos> {
    return await prisma.proyectos.create({
      data
    });
  }
}
