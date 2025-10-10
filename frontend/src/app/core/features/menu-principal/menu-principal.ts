import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Sidebar } from '../../shared/ui/sidebar/sidebar';
import { DashboardService, DashboardApiResponse } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  private isBrowser: boolean;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {


    // Solo verificar autenticación en el navegador
    if (this.isBrowser && !this.authService.checkAuthentication()) {

      return;
    }

    this.loadDashboardData();
  }

  private getUserId(): string | null {
    const user = this.authService.getCurrentUser();

    if (!user) {

      return null;
    }

    // Buscar el ID en diferentes propiedades posibles
    const userId = user.id || user.userId || user.sub;

    if (!userId) {

      this.error = 'No se pudo obtener tu información de usuario. Por favor, inicia sesión nuevamente.';
      this.loading = false;
      this.changeDetectorRef.detectChanges();
      return null;
    }

    const userIdString = userId.toString();

    return userIdString;
  }

  loadDashboardData() {
    this.loading = true;
    this.error = null;
    const userId = this.getUserId();
    if (!userId) {

      return;
    }

    this.dashboardService.getDashboardData(userId).subscribe({
      next: (response: DashboardApiResponse) => {


        if (response && response.success) {
          this.dashboardData = response.data;
          this.loading = false;

        } else {
          this.error = response?.message || 'Error al cargar los datos del dashboard';
          this.loading = false;

        }

        // Forzar detección de cambios
        this.changeDetectorRef.detectChanges();

      },
      error: (err) => {

        this.error = 'Error de conexión con el servidor';
        this.loading = false;

        // Forzar detección de cambios
        this.changeDetectorRef.detectChanges();

        // Solo hacer logout en el navegador si hay error de autenticación
        if (this.isBrowser && (err.status === 401 || err.status === 403)) {
          this.authService.logout();
        }
      }
    });
  }

  // AÑADIR timeout de seguridad
  ngAfterViewInit() {


    // Timeout de seguridad por si la carga se queda colgada
    setTimeout(() => {
      if (this.loading && !this.dashboardData && !this.error) {

        this.loading = false;

        this.changeDetectorRef.detectChanges();
      }
    }, 10000); // 10 segundos
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

  // Método para formatear fecha (solo en navegador)
  formatDate(dateString: string): string {
    if (!this.isBrowser) return dateString;

    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short'
      });
    } catch (error) {
      return dateString;
    }
  }

  // Método para obtener inicial del nombre
  getUserInitial(): string {
    if (!this.dashboardData?.userInfo?.nombre) {
      return 'U';
    }
    return this.dashboardData.userInfo.nombre.charAt(0).toUpperCase();
  }

  // Método para recargar datos
  reloadData(): void {

    this.loadDashboardData();
  }

  // Método para manejar logout
  onLogout(): void {
    if (this.isBrowser) {
      this.authService.logout();
    }
  }
}
