
import { Component, OnInit } from '@angular/core';
import { Sidebar } from '../../shared/ui/sidebar/sidebar';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

// Interfaces para los datos del dashboard
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
  descripcion: string | null;
  totalTareas: number;
  tareasCompletadas: number;
  createdAt: string;
  porcentajeCompletado: number;
}

export interface UserInfo {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  createdAt: string;
}

export interface DashboardData {
  userInfo: UserInfo;
  stats: DashboardStats;
  recentProjects: RecentProject[];
}

@Component({
  selector: 'app-menu-principal',
  imports: [Sidebar, CommonModule],
  templateUrl: './menu-principal.html',
  styleUrl: './menu-principal.css'
})
export class MenuPrincipal implements OnInit {
  dashboardData: DashboardData | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    this.error = null;

    const userId = this.getUserId();

    if (!userId) {
      this.error = 'No se pudo obtener el ID del usuario';
      this.loading = false;
      return;
    }

    this.dashboardService.getDashboardData(userId).subscribe({
      next: (response) => {
        if (response.success) {
          this.dashboardData = response.data;
        } else {
          this.error = response.message || 'Error al cargar los datos del dashboard';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error de conexión con el servidor';
        this.loading = false;
        console.error('Error loading dashboard data:', err);
      }
    });
  }

  private getUserId(): string | null {
    return '19a0de57-f3c4-4458-862b-2b73a74cdfe6'; // Reemplaza con la implementación real
  }

  getProjectStatusClass(percentage: number): string {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 50) return 'text-yellow-500';
    return 'text-red-500';
  }

  getProjectStatusText(percentage: number): string {
    if (percentage >= 80) return 'Activo';
    if (percentage >= 50) return 'En progreso';
    return 'En inicio';
  }
}
