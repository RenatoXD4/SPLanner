import { Request, Response } from 'express';

import { UserRepository } from './dashboard.repository.js';
import { DashboardService } from './dashboard.service.js';

export class DashboardController {
  private dashboardService: DashboardService;
  private userRepository: UserRepository;

  constructor() {
    this.dashboardService = new DashboardService();
    this.userRepository = new UserRepository();
  }

  /**
   * Obtener estadísticas del dashboard
   */
  public async getDashboardStats(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.query.userId as string;
      
      if (!userId) {
        res.status(400).json({ 
          error: 'userId es requerido',
          success: false 
        });
        return;
      }

      console.log('Obteniendo stats para userId:', userId);
      const stats = await this.dashboardService.getUserStats(userId);
      
      res.json({
        data: stats,
        success: true
      });

    } catch (error) {
      console.error('Error getting dashboard stats:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        success: false 
      });
    }
  }

  /**
   * Obtener dashboard de un proyecto específico
   */
  public async getProjectDashboard(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const projectId = req.params.projectId;
      const userId = req.query.userId as string;
      
      if (!projectId) {
        res.status(400).json({ 
          error: 'projectId es requerido',
          success: false 
        });
        return;
      }

      if (!userId) {
        res.status(400).json({ 
          error: 'userId es requerido',
          success: false 
        });
        return;
      }

      console.log('Obteniendo dashboard para proyecto:', projectId);
      
      // Usar el método del repository que ya tienes
      const dashboardData = await this.userRepository.getUserDashboardStats(userId);
      
      if (!dashboardData) {
        res.status(404).json({ 
          error: 'No se encontraron datos para el proyecto',
          success: false 
        });
        return;
      }

      // Filtrar para obtener solo el proyecto específico
      const proyectoEspecifico = dashboardData.recentProjects.find(
        p => p.id === projectId
      );
      
      if (!proyectoEspecifico) {
        res.status(404).json({ 
          error: 'Proyecto no encontrado',
          success: false 
        });
        return;
      }

      // Obtener datos adicionales para el dashboard del proyecto
      const [tareasPorEstado, tareasPorPrioridad, actividadReciente] = await Promise.all([
        this.getTareasPorEstado(),
        this.getTareasPorPrioridad(),
        this.getActividadReciente()
      ]);

      // Estructurar la respuesta para el dashboard del proyecto
      const projectDashboard = {
        actividadReciente,
        proyecto: {
          createdAt: proyectoEspecifico.createdAt,
          descripcion: proyectoEspecifico.descripcion,
          id: proyectoEspecifico.id,
          nombre: proyectoEspecifico.nombre
        },
        stats: {
          porcentajeCompletado: proyectoEspecifico.porcentajeCompletado,
          tareasCompletadas: proyectoEspecifico.tareasCompletadas,
          tareasEnProgreso: Math.floor(proyectoEspecifico.totalTareas * 0.3),
          tareasEnRevision: Math.floor(proyectoEspecifico.totalTareas * 0.1),
          tareasPendientes: proyectoEspecifico.totalTareas - proyectoEspecifico.tareasCompletadas,
          totalTareas: proyectoEspecifico.totalTareas
        },
        tareasPorEstado,
        tareasPorPrioridad,
        tendenciaUltimaSemana: this.generateTrendData(proyectoEspecifico.tareasCompletadas)
      };

      res.json({
        data: projectDashboard,
        success: true
      });

    } catch (error) {
      console.error('Error getting project dashboard:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        success: false 
      });
    }
  }

  /**
   * Obtener proyectos recientes
   */
  public async getRecentProjects(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.query.userId as string;
      const limit = parseInt(req.query.limit as string) || 5;
      
      if (!userId) {
        res.status(400).json({ 
          error: 'userId es requerido',
          success: false 
        });
        return;
      }

      console.log('Obteniendo proyectos para userId:', userId);
      const projects = await this.dashboardService.getRecentProjects(userId, limit);
      
      res.json({
        data: projects,
        success: true
      });

    } catch (error) {
      console.error('Error getting recent projects:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        success: false 
      });
    }
  }

  /**
   * Obtener dashboard del usuario
   */
  public async getUserDashboard(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.params.userId;
      
      if (!userId) {
        res.status(400).json({ 
          error: 'userId es requerido',
          success: false 
        });
        return;
      }

      console.log('Obteniendo dashboard para usuario:', userId);
      const dashboardData = await this.userRepository.getUserDashboardStats(userId);
      
      if (!dashboardData) {
        res.status(404).json({ 
          error: 'Usuario no encontrado',
          success: false 
        });
        return;
      }

      res.json({
        data: dashboardData,
        success: true
      });

    } catch (error) {
      console.error('Error getting user dashboard:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        success: false 
      });
    }
  }

  /**
   * Obtener información del usuario para el dashboard
   */
  public async getUserInfo(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.query.userId as string;
      
      if (!userId) {
        res.status(400).json({ 
          error: 'userId es requerido',
          success: false 
        });
        return;
      }

      console.log('Obteniendo info para userId:', userId);
      const userInfo = await this.dashboardService.getUserInfo(userId);
      
      res.json({
        data: userInfo,
        success: true
      });

    } catch (error) {
      console.error('Error getting user info:', error);
      if (error instanceof Error && error.message === 'Usuario no encontrado') {
        res.status(404).json({ 
          error: error.message,
          success: false 
        });
        return;
      }
      res.status(500).json({ 
        error: 'Error interno del servidor',
        success: false 
      });
    }
  }

  // ========== MÉTODOS PRIVADOS AUXILIARES ==========

  /**
   * Generar datos de tendencia para la última semana
   */
  private generateTrendData(currentCompleted: number): { completadas: number; fecha: string; }[] {
    const trend = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simular progresión lineal (en producción esto vendría de la BD)
      const completadas = Math.max(0, Math.floor(currentCompleted * (i / 6)));
      
      trend.push({
        completadas,
        fecha: date.toISOString().split('T')[0]
      });
    }
    
    return trend;
  }

/**
 * Obtener actividad reciente del proyecto
 */
private async getActividadReciente(): Promise<{
  accion: string;
  fecha: string;
  id: string;
  tarea: string;
  usuario: string;
}[]> {
  // TODO: Implementar con consulta real a la base de datos
  // Por ahora retornamos array vacío
  await new Promise(resolve => setTimeout(resolve, 10));
  return [];
}

/**
 * Obtener distribución de tareas por estado
 */
private async getTareasPorEstado(): Promise<{ cantidad: number; estado: string; }[]> {
  // TODO: Implementar con consulta real a la base de datos
  // Por ahora retornamos array vacío
  await new Promise(resolve => setTimeout(resolve, 10));
  return [];
}

/**
 * Obtener distribución de tareas por prioridad
 */
private async getTareasPorPrioridad(): Promise<{ cantidad: number; prioridad: string; }[]> {
  // TODO: Implementar con consulta real a la base de datos
  // Por ahora retornamos array vacío
  await new Promise(resolve => setTimeout(resolve, 10));
  return [];
}
}