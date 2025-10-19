// src/modules/usuario/user.repository.ts
import { config } from 'dotenv';
config();
import { PrismaClient, Usuario } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  public async createUser(data: {
    apellido: string;
    email: string;
    nombre: string;
    password: string;
  }) {
    return await prisma.usuario.create({
      data: {
        ...data,
      },
    });
  }

  public async findUserByEmail(email: string) {
    return await prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });
  }

  public async getUserById(userId: string) {
    return await prisma.usuario.findUnique({
      where: { id: userId }
    });
  } 

  public async getUserDashboardStats(userId: string) {
    const user = await prisma.usuario.findUnique({
      include: {
        miembroDe: {
          include: {
            proyecto: {
              include: {
                tareas: {
                  include: {
                    estado: true
                  }
                }
              }
            }
          }
        },
        proyectosCreados: {
          include: {
            tareas: {
              include: {
                estado: true
              }
            }
          }
        },
        responsableDe: {
          include: {
            tarea: {
              include: {
                estado: true,
                proyecto: true
              }
            }
          }
        }
      },
      where: { id: userId }
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    // Combinar proyectos creados y proyectos donde es miembro
    const allProjects = [
      ...user.proyectosCreados,
      ...user.miembroDe.map(m => m.proyecto)
    ];

    // Eliminar duplicados
    const uniqueProjects = allProjects.filter((project, index, self) =>
      index === self.findIndex(p => p.id === project.id)
    );

    // Calcular estadísticas
    const totalProjects = uniqueProjects.length;
    
    // Todas las tareas de todos los proyectos del usuario
    const allTasks = uniqueProjects.flatMap(project => project.tareas);
    const totalTasks = allTasks.length;
    
    // Tareas pendientes (estado que no sea "Done" o similar)
    const pendingTasks = allTasks.filter(task => 
      task.estado.nombre.toLowerCase() !== 'done' && 
      task.estado.nombre.toLowerCase() !== 'completado'
    ).length;
    
    const completedTasks = totalTasks - pendingTasks;
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Tareas donde el usuario es responsable
    const userResponsibleTasks = user.responsableDe.map(r => r.tarea);
    const userPendingTasks = userResponsibleTasks.filter(task => 
      task.estado.nombre.toLowerCase() !== 'done' && 
      task.estado.nombre.toLowerCase() !== 'completado'
    ).length;

    return {
      recentProjects: uniqueProjects
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map(project => ({
          createdAt: project.createdAt,
          descripcion: project.descripcion,
          id: project.id,
          nombre: project.nombre,
          porcentajeCompletado: project.tareas.length > 0 ? 
            Math.round((project.tareas.filter(t => 
              t.estado.nombre.toLowerCase() === 'done' || 
              t.estado.nombre.toLowerCase() === 'completado'
            ).length / project.tareas.length) * 100) : 0,
          tareasCompletadas: project.tareas.filter(t => 
            t.estado.nombre.toLowerCase() === 'done' || 
            t.estado.nombre.toLowerCase() === 'completado'
          ).length,
          totalTareas: project.tareas.length
        })),
      stats: {
        completedTasks,
        completionPercentage,
        pendingTasks,
        totalProjects,
        totalTasks,
        userPendingTasks,
        userResponsibleTasks: userResponsibleTasks.length
      },
      userInfo: {
        apellido: user.apellido,
        createdAt: user.createdAt,
        email: user.email,
        id: user.id,
        nombre: user.nombre
      }
    };
  }

 public async updateUser(userId: string, data: {
  apellido?: string;
  nombre?: string;
  password?: string;
}): Promise<Usuario> {
  return await prisma.usuario.update({
    data: {
      ...data,
    },
    where: { id: userId }
  });
}

  public async verifyCredentials(email: string, password: string) {
    return await prisma.usuario.findFirst({
      where: {
        email: email,
        password: password,
      },
    });
  }
}