import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:9001/api-v1/usuarios';

  constructor(private http: HttpClient) { }

  getDashboardData(userId: string): Observable<DashboardApiResponse> {

    return this.http.get<DashboardApiResponse>(`${this.apiUrl}/${userId}/dashboard`);
  }
}
