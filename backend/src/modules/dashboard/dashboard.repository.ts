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
  console.log('🔄 getUserDashboardStats CORREGIDO para user:', userId);
  
  const user = await prisma.usuario.findUnique({
    include: {
      miembroDe: {
        include: {
          proyecto: {
            include: {
              tareas: {
                include: {
                  estado: true  // ✅ CRÍTICO: Incluir el estado
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
              estado: true  // ✅ CRÍTICO: Incluir el estado
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
    console.log('❌ User not found');
    return null;
  }

  // ✅ USAR LA MISMA LÓGICA QUE EN PROJECT DASHBOARD
  const allProjects = [
    ...user.proyectosCreados,
    ...user.miembroDe.map(m => m.proyecto)
  ];

  // Eliminar duplicados
  const uniqueProjects = allProjects.filter((project, index, self) =>
    index === self.findIndex(p => p.id === project.id)
  );

  // Calcular estadísticas CON LA LÓGICA CORRECTA
  const totalProjects = uniqueProjects.length;
  
  // Todas las tareas de todos los proyectos
  const allTasks = uniqueProjects.flatMap(project => project.tareas);
  const totalTasks = allTasks.length;
  
  // ✅ LÓGICA CRÍTICA: Calcular tareas completadas igual que en project dashboard
  const completedTasks = allTasks.filter(task => 
    this.isTaskCompleted(task.estado.nombre)
  ).length;
  
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Tareas donde el usuario es responsable
  const userResponsibleTasks = user.responsableDe.map(r => r.tarea);
  const userPendingTasks = userResponsibleTasks.filter(task => 
    !this.isTaskCompleted(task.estado.nombre)
  ).length;


  return {
    recentProjects: uniqueProjects
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map(project => {
        const tareasCompletadas = project.tareas.filter(t => 
          this.isTaskCompleted(t.estado.nombre)
        ).length;
        const totalTareas = project.tareas.length;
        const porcentajeCompletado = totalTareas > 0 ? 
          Math.round((tareasCompletadas / totalTareas) * 100) : 0;

        return {
          createdAt: project.createdAt,
          descripcion: project.descripcion,
          id: project.id,
          nombre: project.nombre,
          porcentajeCompletado,
          tareasCompletadas,
          totalTareas
        };
      }),
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

  // Función adicional para clasificar todos los estados
  private getTaskStatus(estadoNombre: string): string {
    const normalized = estadoNombre.toLowerCase().trim();
    
    if (this.isTaskCompleted(estadoNombre)) {
      return 'completed';
    }
    
    // Estados en proceso
    const inProgressStates = [
      'en proceso', 'en progreso', 'en desarrollo',
      'procesando', 'trabajando', 'en curso',
      'activo', 'en ejecución'
    ];
    
    if (inProgressStates.some(state => normalized.includes(state))) {
      return 'in_progress';
    }
    
    // Estados sin empezar
    const notStartedStates = [
      'sin empezar', 'sin comenzar', 'pendiente',
      'por hacer', 'to do', 'no iniciado',
      'en espera', 'pausado'
    ];
    
    if (notStartedStates.some(state => normalized.includes(state))) {
      return 'not_started';
    }
    
    return 'unknown';
  }


  // Función auxiliar para determinar si una tarea está completada
  private isTaskCompleted(estadoNombre: string): boolean {
  const normalized = estadoNombre.toLowerCase().trim();
  console.log(`🔍 Verificando estado: "${estadoNombre}" -> normalizado: "${normalized}"`);
  
  const completedStates = ['finalizado', 'completado', 'done', 'hecho', 'terminado'];
  const isCompleted = completedStates.some(state => normalized.includes(state));
  

  return isCompleted;
}
}