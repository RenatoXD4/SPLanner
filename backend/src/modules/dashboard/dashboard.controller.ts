import { Request, Response } from 'express';

import { DashboardService } from './dashboard.service.js';

export class DashboardController {
  private dashboardService: DashboardService;

  constructor() {
    this.dashboardService = new DashboardService();
  }

  // Obtener estadísticas del dashboard
  public async getDashboardStats(
    req: Request,
    res: Response,

  ): Promise<void> {
    try {
      const userId = req.query.userId as string;
      
      if (!userId) {
        res.status(400).json({ error: "userId es requerido" });
        return;
      }

      console.log('bteniendo stats para userId:', userId);
      const stats = await this.dashboardService.getUserStats(userId);
      
      res.json({
        data: stats,
        success: true
      });

    } catch (error) {
      console.error("Error getting dashboard stats:", error);
      res.status(500).json({ 
        error: "Error interno del servidor",
        success: false 
      });
    }
  }

  // Obtener proyectos recientes
  public async getRecentProjects(
    req: Request,
    res: Response,

  ): Promise<void> {
    try {
      const userId = req.query.userId as string;
      const limit = parseInt(req.query.limit as string) || 5;
      
      if (!userId) {
        res.status(400).json({ error: "userId es requerido" });
        return;
      }

      console.log('Obteniendo proyectos para userId:', userId);
      const projects = await this.dashboardService.getRecentProjects(userId, limit);
      
      res.json({
        data: projects,
        success: true
      });

    } catch (error) {
      console.error("Error getting recent projects:", error);
      res.status(500).json({ 
        error: "Error interno del servidor",
        success: false 
      });
    }
  }

  // Obtener información del usuario para el dashboard
  public async getUserInfo(
    req: Request,
    res: Response,

  ): Promise<void> {
    try {
      const userId = req.query.userId as string;
      
      if (!userId) {
        res.status(400).json({ error: "userId es requerido" });
        return;
      }

      console.log('Obteniendo info para userId:', userId);
      const userInfo = await this.dashboardService.getUserInfo(userId);
      
      res.json({
        data: userInfo,
        success: true
      });

    } catch (error) {
      console.error("Error getting user info:", error);
      if (error instanceof Error && error.message === 'Usuario no encontrado') {
        res.status(404).json({ 
          error: error.message,
          success: false 
        });
        return;
      }
      res.status(500).json({ 
        error: "Error interno del servidor",
        success: false 
      });
    }
  }
}