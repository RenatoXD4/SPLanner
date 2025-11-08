import { Router } from 'express';

import { DashboardController } from './dashboard.controller.js';

const router = Router();
const dashboardController = new DashboardController();

// Dashboard de proyecto específico
router.get('/proyectos/:projectId/dashboard', (req, res) => {
  void dashboardController.getProjectDashboard(req, res);
});

// Dashboard del usuario
router.get('/usuarios/:userId/dashboard', (req, res) => {
  void dashboardController.getUserDashboard(req, res);
});

// Estadísticas del dashboard
router.get('/dashboard/stats', (req, res) => {
  void dashboardController.getDashboardStats(req, res);
});

// Proyectos recientes
router.get('/dashboard/proyectos-recientes', (req, res) => {
  void dashboardController.getRecentProjects(req, res);
});

// Información del usuario
router.get('/dashboard/user-info', (req, res) => {
  void dashboardController.getUserInfo(req, res);
});

// ✅ NUEVAS RUTAS PARA EXPORTACIÓN MEJORADA

// Exportación de datos del proyecto
router.get('/proyectos/:projectId/export', (req, res) => {
  void dashboardController.exportProjectData(req, res);
});

// Reportes ejecutivos
router.get('/proyectos/:projectId/report', (req, res) => {
  void dashboardController.generateProjectReport(req, res);
});

// Exportación rápida del dashboard actual
router.get('/proyectos/:projectId/export-dashboard', (req, res) => {
  void dashboardController.getProjectDashboard(req, res); // Reutiliza el existente
});

export default router;