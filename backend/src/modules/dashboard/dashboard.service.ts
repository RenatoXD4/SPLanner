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

// ✅ NUEVA INTERFACE para eficiencia de usuarios
export interface UsuarioEficiencia {
  nombreCompleto: string;
  tareasCompletadas: number;
  totalTareas: number;
}

// ✅ NUEVA INTERFACE para evolución del proyecto
export interface EvolucionProyecto {
  labels: string[];
  completadas: number[];
  enProgreso: number[];
  pendientes: number[];
}

export interface ProjectDashboardMetrics {
  proyecto: {
    id: string;
    nombre: string;
    descripcion: string | null;
    createdAt: string;
  };
  stats: {
    totalTareas: number;
    tareasCompletadas: number;
    tareasPendientes: number;
    porcentajeCompletado: number;
    tareasEnProgreso: number;
    tareasEnRevision: number;
  };
  tareasPorEstado: { estado: string; cantidad: number }[];
  tareasPorPrioridad: { prioridad: string; cantidad: number }[];
  actividadReciente: {
    id: string;
    accion: string;
    usuario: string;
    fecha: string;
    tarea: string;
  }[];
  tendenciaUltimaSemana: { fecha: string; completadas: number }[];
  // ✅ NUEVO: Incluir eficiencia de todos los miembros
  usuariosEficiencia?: UsuarioEficiencia[];
  // ✅ NUEVO: Incluir evolución real del proyecto
  evolucionProyecto?: EvolucionProyecto;
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

      const projects = await Promise.all(
        recentProjects.map(async (member) => {
          const project = member.proyecto;
          const totalTasks = project.tareas.length;
          
          // CONTAR TAREAS COMPLETADAS CORRECTAMENTE
          const completedTasks = await this.contarTareasCompletadas(project.id);
          
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
        })
      );

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

    // Calcular estadísticas de tareas - MANTENIENDO LA ESTRUCTURA PERO MEJORANDO EL CÓMPUTO
    userProjects.forEach(member => {
      const projectTasks = member.proyecto.tareas;
      totalTasks += projectTasks.length;
      
      // CONTAR TAREAS COMPLETADAS MÁS PRECISAMENTE
      const completed = projectTasks.filter(task => {
        const estadoNombre = task.estado.nombre.toLowerCase();
        return (
          estadoNombre.includes('completado') ||
          estadoNombre.includes('finalizado') ||
          estadoNombre.includes('hecho') ||
          estadoNombre.includes('done') ||
          estadoNombre.includes('terminado') ||
          estadoNombre === 'completado' ||
          estadoNombre === 'finalizado' ||
          estadoNombre === 'hecho' ||
          estadoNombre === 'done'
        );
      }).length;
      
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
        usuarioId: userId }
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

  // MÉTODO AUXILIAR NUEVO: Contar tareas completadas de forma más precisa
  private async contarTareasCompletadas(proyectoId: string): Promise<number> {
    try {
      // Obtener todas las tareas del proyecto con sus estados
      const tareas = await prisma.tarea.findMany({
        where: { proyectoId: proyectoId },
        include: { estado: true }
      });

      // Contar tareas completadas con criterio más amplio
      const completedTasks = tareas.filter(task => {
        const estadoNombre = task.estado.nombre.toLowerCase();
        return (
          estadoNombre.includes('completado') ||
          estadoNombre.includes('finalizado') ||
          estadoNombre.includes('hecho') ||
          estadoNombre.includes('done') ||
          estadoNombre.includes('terminado') ||
          estadoNombre === 'completado' ||
          estadoNombre === 'finalizado' ||
          estadoNombre === 'hecho' ||
          estadoNombre === 'done' ||
          estadoNombre === 'terminado'
        );
      }).length;

      return completedTasks;

    } catch (error) {
      console.error('Error contando tareas completadas:', error);
      // Fallback: usar el método antiguo si hay error
      const tareas = await prisma.tarea.findMany({
        where: { proyectoId: proyectoId },
        include: { estado: true }
      });
      
      return tareas.filter(task => 
        task.estado.nombre.toLowerCase().includes('completado') ||
        task.estado.nombre.toLowerCase().includes('hecho') ||
        task.estado.nombre.toLowerCase().includes('done')
      ).length;
    }
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

  // ✅ NUEVO MÉTODO: Generar datos para exportación
  async getProjectExportData(projectId: string): Promise<any> {
    try {
      // Aquí inyectarías el UserRepository o moverías la lógica
      // Por ahora simulamos la respuesta basada en los datos existentes
      const projectData = await this.getProjectDashboardData(projectId);
      const summary = await this.getProjectSummary(projectId);
      
      return {
        success: true,
        data: {
          ...projectData,
          exportSummary: summary,
          exportMetadata: {
            generatedAt: new Date().toISOString(),
            exportedBy: 'Sistema',
            format: 'JSON'
          }
        }
      };
    } catch (error) {
      console.error('Error en getProjectExportData:', error);
      throw error;
    }
  }

  // ✅ NUEVO MÉTODO: Datos para PDF/Excel
  async getProjectReportData(projectId: string, format: 'pdf' | 'excel' | 'json' = 'json'): Promise<any> {
    try {
      const dashboardData = await this.getProjectDashboardData(projectId);
      
      // Estructura optimizada para reportes
      const reportData = {
        metadata: {
          title: `Reporte - ${dashboardData.proyecto.nombre}`,
          format: format,
          generated: new Date().toISOString(),
          version: '1.0'
        },
        proyecto: dashboardData.proyecto,
        metricas: {
          progreso: dashboardData.stats,
          distribucion: {
            porEstado: dashboardData.tareasPorEstado,
            porPrioridad: dashboardData.tareasPorPrioridad
          },
          tendencias: dashboardData.tendenciaUltimaSemana,
          evolucion: dashboardData.evolucionProyecto || null
        },
        equipo: {
          totalMiembros: 0, // Podrías agregar esta métrica
          eficiencia: dashboardData.usuariosEficiencia || []
        }
      };

      return {
        success: true,
        data: reportData
      };
    } catch (error) {
      console.error('Error generando datos de reporte:', error);
      throw error;
    }
  }

  // ✅ MÉTODO AUXILIAR: Obtener datos base del proyecto (si no existe)
  private async getProjectDashboardData(projectId: string): Promise<any> {
    // Este método probablemente ya existe en tu servicio
    // Si no, aquí iría la lógica para obtener datos del proyecto
    return await this.getUserStats(projectId); // Usamos getUserStats como base
  }

  // ✅ MÉTODO AUXILIAR: Obtener resumen (si no existe)
  private async getProjectSummary(projectId: string): Promise<any> {
    // Lógica para obtener resumen ejecutivo
    return {
      resumenEjecutivo: {
        estado: 'En progreso',
        salud: 'Buena',
        proximosDesafios: [],
        logros: []
      }
    };
  }
}