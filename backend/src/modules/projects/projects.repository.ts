import { Prisma, PrismaClient, Proyectos } from "@prisma/client";

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

const prisma = new PrismaClient();

export class ProjectRepository {

  public async deleteProject(id: string): Promise<Proyectos> {
    return await prisma.proyectos.delete({ where: { id } });
  }

  // Método para obtener todos los proyectos (si aún lo necesitas)
  
  public async getAllProjects(): Promise<unknown[]> {
    return await prisma.proyectos.findMany({
      include: {
        _count: {
          select: {
            miembros: true
          }
        },
        creadoPor: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  public async getProjectById(id: string): Promise<unknown> {
    return await prisma.proyectos.findUnique({
      include: {
        _count: {
          select: {
            miembros: true
          }
        },
        creadoPor: true
      },
      where: { id }
    });
  }

  // CORRECCIÓN: Cambia this.prisma por prisma (sin this)
  async getProjectsByMember(userId: string): Promise<ProyectoConCount[]> {
    return await prisma.proyectos.findMany({ // ← Quita el "this."
      include: {
        _count: {
          select: {
            miembros: true
          }
        },
        creadoPor: {
          select: {
            apellido: true,
            email: true,
            id: true,
            nombre: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        miembros: {
          some: {
            usuarioId: userId
          }
        }
      }
    });
  }

  // Método actualizado para filtrar por usuario
  public async getProjectsByUser(creadoPorId: string): Promise<unknown[]> {
    return await prisma.proyectos.findMany({
      include: {
        _count: {
          select: {
            miembros: true 
          }
        },
        creadoPor: true
      },
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