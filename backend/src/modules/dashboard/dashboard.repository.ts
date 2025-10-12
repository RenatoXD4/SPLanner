import { PrismaClient, Usuario } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  
  // Crear nuevo usuario
  async createUser(userData: {
    apellido: string;
    email: string;
    nombre: string;
    password: string;
  }): Promise<Omit<Usuario, "password">> {
    return await prisma.usuario.create({
      data: userData,
      select: {
        apellido: true,
        createdAt: true,
        email: true,
        id: true,
        nombre: true
      }
    });
  }

  // Eliminar usuario
  async deleteUser(id: string): Promise<Omit<Usuario, 'createdAt' | 'password'>> {
    return await prisma.usuario.delete({
      select: {
        apellido: true,
        email: true,
        id: true,
        nombre: true
      },
      where: { id }
    });
  }

  // Obtener todos los usuarios
  async getAllUsers(): Promise<Omit<Usuario, "password">[]> {
    return await prisma.usuario.findMany({
      select: {
        apellido: true,
        createdAt: true,
        email: true,
        id: true,
        nombre: true,
        proyectosCreados: true
      }
    });
  }

  // Obtener usuario por email
  async getUserByEmail(email: string): Promise<null | Usuario> {
    return await prisma.usuario.findUnique({
      where: { email }
    });
  }

  // Obtener usuario por ID
  async getUserById(id: string): Promise<null | Omit<Usuario, 'password'>>  {
    return await prisma.usuario.findUnique({
      select: {
        apellido: true,
        createdAt: true,
        email: true,
        id: true,
        miembroDe: {
          include: {
            proyecto: {
              include: {
                estados: true,
                tareas: {
                  include: {
                    estado: true
                  }
                }
              }
            },
            rol: true
          }
        },
        nombre: true,
        proyectosCreados: {
          include: {
            estados: true,
            tareas: {
              include: {
                estado: true,
                responsables: {
                  include: {
                    usuario: {
                      select: {
                        apellido: true,
                        email: true,
                        id: true,
                        nombre: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      where: { id }
    });
  }

  // Obtener estadísticas del dashboard para un usuario
  async getUserDashboardStats(userId: string) {
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
      return null;
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

  // Actualizar usuario
  async updateUser(id: string, userData: {
    apellido?: string;
    email?: string;
    nombre?: string;
    password?: string;
  }): Promise<Omit<Usuario, 'password'>>{
    return await prisma.usuario.update({
      data: userData,
      select: {
        apellido: true,
        createdAt: true,
        email: true,
        id: true,
        nombre: true
      },
      where: { id }
    });
  }
}