
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth-service';

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
}

export interface DashboardApiResponse {
  success: boolean;
  message?: string;
  data: {
    userInfo: {
      id: string;
      nombre: string;
      apellido: string;
      email: string;
      createdAt: string;
    };
    stats: {
      totalProjects: number;
      totalTasks: number;
      pendingTasks: number;
      completedTasks: number;
      completionPercentage: number;
      userPendingTasks: number;
      userResponsibleTasks: number;
    };
    recentProjects: Array<{
      id: string;
      nombre: string;
      descripcion: string | null;
      totalTareas: number;
      tareasCompletadas: number;
      createdAt: string;
      porcentajeCompletado: number;
    }>;
  };
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:9001/api-v1';

  // Obtener dashboard de un proyecto específico
getProjectDashboard(projectId: string): Observable<{ success: boolean; data: ProjectDashboardMetrics }> {
  const userId = this.authService.getCurrentUserId();
  if (!userId) {
    // En lugar de lanzar error, retornar un Observable con error
    return new Observable(observer => {
      observer.error(new Error('Usuario no autenticado'));
    });
  }

  return this.http.get<{ success: boolean; data: ProjectDashboardMetrics }>(
    `${this.apiUrl}/proyectos/${projectId}/dashboard?userId=${userId}`
  );
}

    getDashboardData(userId: string): Observable<DashboardApiResponse> {

    return this.http.get<DashboardApiResponse>(
      `${this.apiUrl}/usuarios/${userId}/dashboard`
    );
  }

  // En dashboard.service.ts - actualizar generateChartData
generateChartData(metrics: ProjectDashboardMetrics): {
  tareasPorEstado: { estado: string; cantidad: number }[],
  tareasPorPrioridad: { prioridad: string; cantidad: number }[],
  tendenciaCompletadas: { fecha: string; completadas: number }[]
} {
  // Si no hay datos de estado, generarlos desde las stats
  const tareasPorEstado = metrics.tareasPorEstado && metrics.tareasPorEstado.length > 0
    ? metrics.tareasPorEstado
    : [
        { estado: 'finalizado', cantidad: metrics.stats.tareasCompletadas },
        { estado: 'Pendientes', cantidad: metrics.stats.tareasPendientes },
        { estado: 'En Progreso', cantidad: metrics.stats.tareasEnProgreso || 0 },
        { estado: 'En Revisión', cantidad: metrics.stats.tareasEnRevision || 0 }
      ].filter(item => item.cantidad > 0); // Solo mostrar estados con tareas

  // Si no hay datos de prioridad, mostrar un mensaje
  const tareasPorPrioridad = metrics.tareasPorPrioridad && metrics.tareasPorPrioridad.length > 0
    ? metrics.tareasPorPrioridad
    : [{ prioridad: 'Datos no disponibles', cantidad: 1 }];

  return {
    tareasPorEstado,
    tareasPorPrioridad,
    tendenciaCompletadas: metrics.tendenciaUltimaSemana || this.generateTrendData(metrics.stats.tareasCompletadas)
  };
}

  // En dashboard.service.ts - mejorar generateTrendData
private generateTrendData(currentCompleted: number): { fecha: string; completadas: number }[] {
  const trend = [];
  const today = new Date();

  // Si no hay tareas completadas, mostrar progreso desde 0
  const startValue = currentCompleted === 0 ? 0 : Math.max(0, currentCompleted - 6);

  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Progresión más realista
    const completadas = startValue + Math.floor((currentCompleted - startValue) * (i / 6));

    trend.push({
      fecha: date.toISOString().split('T')[0],
      completadas: Math.max(0, completadas)
    });
  }

  return trend;
}
}
