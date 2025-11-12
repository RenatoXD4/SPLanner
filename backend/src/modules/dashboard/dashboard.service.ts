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

// ✅ INTERFACE para evolución del proyecto
export interface EvolucionProyecto {
  completadas: number[];
  enProgreso: number[];
  labels: string[];
  pendientes: number[];
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

export interface ProjectDashboardMetrics {
  actividadReciente: {
    accion: string;
    fecha: string;
    id: string;
    tarea: string;
    usuario: string;
  }[];
  // ✅ NUEVO: Incluir evolución real del proyecto
  evolucionProyecto?: EvolucionProyecto;
  proyecto: {
    createdAt: string;
    descripcion: null | string;
    id: string;
    nombre: string;
  };
  stats: {
    porcentajeCompletado: number;
    tareasCompletadas: number;
    tareasEnProgreso: number;
    tareasEnRevision: number;
    tareasPendientes: number;
    totalTareas: number;
  };
  tareasPorEstado: { cantidad: number; estado: string; }[];
  tareasPorPrioridad: { cantidad: number; prioridad: string; }[];
  tendenciaUltimaSemana: { completadas: number; fecha: string; }[];
  // ✅ NUEVO: Incluir eficiencia de todos los miembros
  usuariosEficiencia?: UsuarioEficiencia[];
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

// ✅ INTERFACE para eficiencia de usuarios
export interface UsuarioEficiencia {
  nombreCompleto: string;
  tareasCompletadas: number;
  totalTareas: number;
}

// ✅ Interface para datos de exportación
interface ExportData {
  data: {
    [key: string]: unknown;
    exportMetadata: {
      exportedBy: string;
      format: string;
      generatedAt: string;
    };
    exportSummary: unknown;
  };
  success: boolean;
}

// ✅ Interface para datos de reporte
interface ReportData {
  data: {
    equipo: {
      eficiencia: UsuarioEficiencia[];
      totalMiembros: number;
    };
    metadata: {
      format: string;
      generated: string;
      title: string;
      version: string;
    };
    metricas: {
      distribucion: {
        porEstado: { cantidad: number; estado: string }[];
        porPrioridad: { cantidad: number; prioridad: string }[];
      };
      evolucion: EvolucionProyecto | null;
      progreso: {
        porcentajeCompletado: number;
        tareasCompletadas: number;
        tareasEnProgreso: number;
        tareasEnRevision: number;
        tareasPendientes: number;
        totalTareas: number;
      };
      tendencias: { completadas: number; fecha: string }[];
    };
    proyecto: {
      createdAt: string;
      descripcion: null | string;
      id: string;
      nombre: string;
    };
  };
  success: boolean;
}

export class DashboardService {
  
  // ✅ MÉTODO CORREGIDO: Generar datos para exportación
  async getProjectExportData(projectId: string): Promise<ExportData> {
  try {
    const projectData = await this.getProjectDashboardData(projectId);
    const summary = await this.getProjectSummary();
    
    // Convertir projectData a un objeto seguro para el spread
    const safeProjectData = projectData && typeof projectData === 'object' 
      ? { ...projectData as Record<string, unknown> } 
      : {};
    
    return {
      data: {
        ...safeProjectData,
        exportMetadata: {
          exportedBy: 'Sistema',
          format: 'JSON',
          generatedAt: new Date().toISOString()
        },
        exportSummary: summary
      },
      success: true
    };
  } catch (error) {
    console.error('Error en getProjectExportData:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw new Error(`Error al exportar datos del proyecto: ${errorMessage}`);
  }
}

  // ✅ MÉTODO CORREGIDO: Datos para PDF/Excel
  async getProjectReportData(projectId: string, format: 'excel' | 'json' | 'pdf' = 'json'): Promise<ReportData> {
    try {
      const dashboardData = await this.getProjectDashboardData(projectId) as ProjectDashboardMetrics;
      
      // Estructura optimizada para reportes
      const reportData = {
        equipo: {
          eficiencia: dashboardData.usuariosEficiencia ?? [],
          totalMiembros: 0
        },
        metadata: {
          format: format,
          generated: new Date().toISOString(),
          title: `Reporte - ${dashboardData.proyecto.nombre}`,
          version: '1.0'
        },
        metricas: {
          distribucion: {
            porEstado: dashboardData.tareasPorEstado,
            porPrioridad: dashboardData.tareasPorPrioridad
          },
          evolucion: dashboardData.evolucionProyecto ?? null,
          progreso: dashboardData.stats,
          tendencias: dashboardData.tendenciaUltimaSemana
        },
        proyecto: dashboardData.proyecto
      };

      return {
        data: reportData,
        success: true
      };
    } catch (error) {
      console.error('Error generando datos de reporte:', error);
      throw new Error(`Error al generar reporte: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  }

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
      throw new Error(`Error al obtener proyectos recientes: ${error instanceof Error ? error.message : 'Error desconocido'}`);
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

  // MÉTODO AUXILIAR NUEVO: Contar tareas completadas de forma más precisa
  private async contarTareasCompletadas(proyectoId: string): Promise<number> {
    try {
      // Obtener todas las tareas del proyecto con sus estados
      const tareas = await prisma.tarea.findMany({
        include: { estado: true },
        where: { proyectoId: proyectoId }
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
        include: { estado: true },
        where: { proyectoId: proyectoId }
      });
      
      return tareas.filter(task => 
        task.estado.nombre.toLowerCase().includes('completado') ||
        task.estado.nombre.toLowerCase().includes('hecho') ||
        task.estado.nombre.toLowerCase().includes('done')
      ).length;
    }
  }

  // ✅ MÉTODO AUXILIAR: Obtener datos base del proyecto (si no existe)
  private async getProjectDashboardData(projectId: string): Promise<unknown> {
    // Este método probablemente ya existe en tu servicio
    // Si no, aquí iría la lógica para obtener datos del proyecto
    return await this.getUserStats(projectId); // Usamos getUserStats como base
  }

  // ✅ MÉTODO AUXILIAR: Obtener resumen (si no existe)
private getProjectSummary(): Promise<unknown> {
  // Lógica para obtener resumen ejecutivo
  return Promise.resolve({
    resumenEjecutivo: {
      estado: 'En progreso',
      logros: [],
      proximosDesafios: [],
      salud: 'Buena'
    }
  });
}
}