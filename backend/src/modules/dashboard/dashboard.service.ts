import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface DashboardStats {
  activeProjects: number;
  completedTasks: number;
  pendingTasks: number;
  teams: number;
  totalProjects: number;
  totalTasks: number;
}

export interface ProjectDashboard {
  createdAt: Date;
  descripcion?: string;
  id: string;
  lastUpdate: string;
  nombre: string;
  progress: number;
  status: string;
  tareasCount: number;
}

export interface UserDashboardInfo {
  apellido: string;
  createdAt: Date;
  email: string;
  id: string;
  miembroDe: number;
  nombre: string;
  proyectosCreados: number;
}

export class DashboardService {
  
  
  async getRecentProjects(userId: string, limit = 5): Promise<ProjectDashboard[]> {
    try {
      const recentProjects = await prisma.miembro.findMany({
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
        },
        orderBy: {
          proyecto: {
            createdAt: 'desc'
          }
        },
        take: limit,
        where: { usuarioId: userId }
      });

      const projects = recentProjects.map(member => {
        const project = member.proyecto;
        const totalTasks = project.tareas.length;
        
        const completedTasks = project.tareas.filter(task => 
          task.estado.nombre.toLowerCase().includes('completado') ||
          task.estado.nombre.toLowerCase().includes('hecho') ||
          task.estado.nombre.toLowerCase().includes('done')
        ).length;
        
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        let status = 'Activo';
        if (progress >= 90) status = 'Casi listo';
        else if (progress >= 50) status = 'En progreso';

        const lastUpdate = this.calculateLastUpdate(project.createdAt);
        return {
          createdAt: project.createdAt,
          descripcion: project.descripcion ?? undefined, 
          id: project.id,
          lastUpdate,
          nombre: project.nombre,
          progress,
          status,
          tareasCount: totalTasks
        };
      });

      return projects;

    } catch (error) {
      console.error('Error en getRecentProjects:', error);
      throw error;
    }
  }

  // Obtener información del usuario para el dashboard
  async getUserInfo(userId: string): Promise<UserDashboardInfo> {
    const user = await prisma.usuario.findUnique({
      include: {
        miembroDe: {
          include: {
            proyecto: true
          }
        },
        proyectosCreados: true
      },
      where: { id: userId }
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const proyectosCreados = user.proyectosCreados.length;
    const miembroDe = user.miembroDe.length;

    return {
      apellido: user.apellido,
      createdAt: user.createdAt,
      email: user.email,
      id: user.id,
      miembroDe,
      nombre: user.nombre,
      proyectosCreados
    };
  }

  // Obtener estadísticas del usuario
  async getUserStats(userId: string): Promise<DashboardStats> {
    // Total de proyectos donde el usuario es miembro
    const totalProjects = await prisma.miembro.count({
      where: { usuarioId: userId }
    });

    // Obtener todos los proyectos del usuario con sus tareas
    const userProjects = await prisma.miembro.findMany({
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
      },
      where: { usuarioId: userId }
    });

    let totalTasks = 0;
    let completedTasks = 0;

    // Calcular estadísticas de tareas
    userProjects.forEach(member => {
      const projectTasks = member.proyecto.tareas;
      totalTasks += projectTasks.length;
      
      // Considerar tareas completadas si están en estado "completado" o similar
      const completed = projectTasks.filter(task => 
        task.estado.nombre.toLowerCase().includes('completado') ||
        task.estado.nombre.toLowerCase().includes('hecho') ||
        task.estado.nombre.toLowerCase().includes('done') ||
        task.estado.nombre.toLowerCase().includes('finalizado')
      ).length;
      
      completedTasks += completed;
    });

    const pendingTasks = totalTasks - completedTasks;

    // Proyectos activos (creados en los últimos 30 días)
    const activeProjects = await prisma.miembro.count({
      where: {
        proyecto: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        },
        usuarioId: userId
      }
    });

    // Número de equipos únicos (proyectos distintos)
    const teams = await prisma.miembro.groupBy({
      _count: true,
      by: ['proyectoId'],
      where: { usuarioId: userId }
    });

    return {
      activeProjects,
      completedTasks,
      pendingTasks,
      teams: teams.length,
      totalProjects,
      totalTasks
    };
  }

  private calculateLastUpdate(createdAt: Date): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - createdAt.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'hoy';
    if (diffDays === 2) return 'ayer';
    if (diffDays <= 7) return `hace ${(diffDays - 1).toString()} días`;
    if (diffDays <= 30) return `hace ${Math.floor(diffDays / 7).toString()} semanas`;
    return `hace ${Math.floor(diffDays / 30).toString()} meses`;
  }
}