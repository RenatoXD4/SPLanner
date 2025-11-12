import { Request, Response } from 'express';

import { UserRepository } from './dashboard.repository.js';
import { DashboardService } from './dashboard.service.js';

// Interface para proyecto específico con propiedades opcionales
interface ProyectoEspecifico {
  createdAt: Date;
  descripcion: null|string;
  id: string;
  nombre: string;
  porcentajeCompletado: number;
  tareasCompletadas: number;
  tareasEnProgreso?: number;
  tareasPendientes?: number;
  totalTareas: number;
}

export class DashboardController {
  private dashboardService: DashboardService;
  private userRepository: UserRepository;

  constructor() {
    this.dashboardService = new DashboardService();
    this.userRepository = new UserRepository();
  }

  /**
   * Exportar datos completos del proyecto
   */
  public async exportProjectData(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const projectId = req.params.projectId;
      const format = req.query.format as string || 'json';
      
      if (!projectId) {
        res.status(400).json({ 
          error: 'projectId es requerido',
          success: false 
        });
        return;
      }

      console.log('📤 Exportando datos del proyecto:', projectId, 'Formato:', format);
      
      // Obtener datos completos para exportación
      const exportData = await this.userRepository.getProjectExportData(projectId);
      
      // Diferentes respuestas según el formato solicitado
      switch (format.toLowerCase()) {
        case 'json':
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Content-Disposition', `attachment; filename="proyecto-${projectId}-${new Date().toISOString().split('T')[0]}.json"`);
          res.json({
            data: exportData,
            success: true
          });
          break;

        default:
          res.json({
            data: exportData,
            format: 'json',
            note: `Formato ${format} no implementado. Se devuelve JSON.`,
            success: true
          });
      }

    } catch (error) {
      console.error('Error exporting project data:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor al exportar datos',
        success: false 
      });
    }
  }

  /**
   * Generar reporte ejecutivo del proyecto
   */
  public async generateProjectReport(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const projectId = req.params.projectId;
      const reportType = req.query.type as string || 'summary';
      
      if (!projectId) {
        res.status(400).json({ 
          error: 'projectId es requerido',
          success: false 
        });
        return;
      }

      console.log('📊 Generando reporte del proyecto:', projectId, 'Tipo:', reportType);
      
      const reportData = await this.userRepository.getProjectSummary(projectId);
      
      res.json({
        data: reportData,
        generatedAt: new Date().toISOString(),
        reportType: reportType,
        success: true
      });

    } catch (error) {
      console.error('Error generating project report:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor al generar reporte',
        success: false 
      });
    }
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
   * Obtener dashboard de un proyecto específico - ACTUALIZADO CON EVOLUCIÓN REAL
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

      // ✅ OBTENER DATOS REALES incluyendo evolución basada en fechas límite
      const [
        tareasPorEstado, 
        tareasPorPrioridad, 
        actividadReciente, 
        tareasEnRevision, 
        usuariosEficiencia,
        evolucionProyecto  // ✅ NUEVO: Datos reales de evolución
      ] = await Promise.all([
        this.getTareasPorEstado(projectId),
        this.getTareasPorPrioridad(projectId),
        this.getActividadReciente(),
        this.userRepository.getTareasEnRevisionCount(projectId),
        this.userRepository.getEficienciaPorMiembro(projectId),
        this.userRepository.getEvolucionProyecto(projectId) // ✅ NUEVO
      ]);

      // ✅ CORREGIDO: Usar valores de forma segura sin 'any'
      const proyecto = proyectoEspecifico as ProyectoEspecifico;
      const tareasEnProgreso = proyecto.tareasEnProgreso ?? Math.floor(proyecto.totalTareas * 0.3);
      const tareasPendientes = proyecto.tareasPendientes ?? (proyecto.totalTareas - proyecto.tareasCompletadas);

      // Estructurar la respuesta para el dashboard del proyecto
      const projectDashboard = {
        actividadReciente,
        // ✅ NUEVO: Incluir evolución real del proyecto
        evolucionProyecto: evolucionProyecto,
        proyecto: {
          createdAt: proyectoEspecifico.createdAt,
          descripcion: proyectoEspecifico.descripcion,
          id: proyectoEspecifico.id,
          nombre: proyectoEspecifico.nombre
        },
        stats: {
          porcentajeCompletado: proyectoEspecifico.porcentajeCompletado,
          tareasCompletadas: proyectoEspecifico.tareasCompletadas,
          tareasEnProgreso: tareasEnProgreso,
          tareasEnRevision: tareasEnRevision,
          tareasPendientes: tareasPendientes,
          totalTareas: proyectoEspecifico.totalTareas
        },
        // ✅ Estos ahora son datos REALES del repository
        tareasPorEstado,
        tareasPorPrioridad,
        tendenciaUltimaSemana: this.generateTrendData(proyectoEspecifico.tareasCompletadas),
        // ✅ NUEVO: Incluir eficiencia de todos los miembros
        usuariosEficiencia: usuariosEficiencia
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

  // ========== MÉTODOS PRIVADOS AUXILIARES ACTUALIZADOS ==========

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
   * Obtener actividad reciente del proyecto - ACTUALIZADO
   */
  private async getActividadReciente(): Promise<{
    accion: string;
    fecha: string;
    id: string;
    tarea: string;
    usuario: string;
  }[]> {
    try {
      // TODO: Implementar con consulta real a la base de datos
      // Por ahora retornamos array vacío
      await new Promise(resolve => setTimeout(resolve, 10));
      return [];
    } catch (error) {
      console.error('Error obteniendo actividad reciente:', error);
      return [];
    }
  }

  /**
   * Obtener distribución de tareas por estado - ACTUALIZADO
   */
  private async getTareasPorEstado(projectId: string): Promise<{ cantidad: number; estado: string; }[]> {
    try {
      // ✅ CORRECCIÓN: Usar el método real del repository
      return await this.userRepository.getTareasPorEstado(projectId);
    } catch (error) {
      console.error('Error obteniendo tareas por estado:', error);
      return [];
    }
  }

  /**
   * Obtener distribución de tareas por prioridad - ACTUALIZADO
   */
  private async getTareasPorPrioridad(projectId: string): Promise<{ cantidad: number; prioridad: string; }[]> {
    try {
      // ✅ CORRECCIÓN: Usar el método real del repository
      return await this.userRepository.getTareasPorPrioridad(projectId);
    } catch (error) {
      console.error('Error obteniendo tareas por prioridad:', error);
      return [];
    }
  }
}