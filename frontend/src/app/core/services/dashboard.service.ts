 //  RUTA: \Users\diego\Documents\GitHub\SPLanner\frontend\src\app\core\services\dashboard.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

export interface ProjectDashboardMetrics {
  proyecto: {
    id: string;
    nombre: string;
    descripcion: string;
    createdAt: string;
  };
  stats: {
    totalTareas: number;
    tareasCompletadas: number;
    tareasEnProgreso: number;
    tareasPendientes: number;
    porcentajeCompletado: number;
  };
  tareasPorEstado: Array<{ estado: string; cantidad: number }>;
  tareasPorPrioridad: Array<{ prioridad: string; cantidad: number }>;
  tendenciaUltimaSemana: Array<{ completadas: number; fecha: string }>;
  actividadReciente?: Array<{
    id: string;
    accion: string;
    usuario: string;
    tarea: string;
    fecha: string;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = '/api/dashboard';

  getProjectDashboard(projectId: string): Observable<{ success: boolean; data: ProjectDashboardMetrics }> {
    return this.http.get<{ success: boolean; data: ProjectDashboardMetrics }>(
      `${this.apiUrl}/proyectos/${projectId}/dashboard`
    );
  }

  getDashboardStats(userId: string): Observable<{ success: boolean; data: DashboardStats }> {
    return this.http.get<{ success: boolean; data: DashboardStats }>(
      `${this.apiUrl}/stats?userId=${userId}`
    );
  }

  getRecentProjects(userId: string, limit: number = 5): Observable<{ success: boolean; data: ProjectDashboard[] }> {
    return this.http.get<{ success: boolean; data: ProjectDashboard[] }>(
      `${this.apiUrl}/proyectos-recientes?userId=${userId}&limit=${limit}`
    );
  }

  getUserInfo(userId: string): Observable<{ success: boolean; data: UserDashboardInfo }> {
    return this.http.get<{ success: boolean; data: UserDashboardInfo }>(
      `${this.apiUrl}/user-info?userId=${userId}`
    );
  }

  getUserDashboard(userId: string): Observable<{ success: boolean; data: any }> {
    return this.http.get<{ success: boolean; data: any }>(
      `${this.apiUrl}/usuarios/${userId}/dashboard`
    );
  }

  exportProjectData(projectId: string, format: string = 'json'): Observable<any> {
    return this.http.get(`${this.apiUrl}/proyectos/${projectId}/export?format=${format}`);
  }

  generateProjectReport(projectId: string, reportType: string = 'summary'): Observable<any> {
    return this.http.get(`${this.apiUrl}/proyectos/${projectId}/report?type=${reportType}`);
  }
}