// dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
  completionPercentage: number;
  userPendingTasks: number;
  userResponsibleTasks: number;
}

export interface RecentProject {
  id: string;
  nombre: string;
  descripcion: string;
  totalTareas: number;
  tareasCompletadas: number;
  createdAt: string;
  porcentajeCompletado: number;
}

export interface DashboardData {
  userInfo: {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    createdAt: string;
  };
  stats: DashboardStats;
  recentProjects: RecentProject[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:9001/api-v1/usuarios';

  constructor(private http: HttpClient) { }

  getDashboardData(userId: string): Observable<{success: boolean; data: DashboardData; message: string}> {
    return this.http.get<{success: boolean; data: DashboardData; message: string}>(
      `${this.apiUrl}/${userId}/dashboard`
    );
  }

}
