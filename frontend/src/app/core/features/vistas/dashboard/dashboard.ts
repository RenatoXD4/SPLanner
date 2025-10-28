// src/app/dashboard/dashboard.component.ts
import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

// Components
import { Sidebar } from '../../../shared/ui/sidebar/sidebar';
import { DashboardService, ProjectDashboardMetrics } from '../service/dashboard.service';
import { ProyectoGuard } from '../../../../guards/proyecto.guard';
import { AuthService } from '../../../services/auth-service';

// Interface para los gráficos disponibles
interface ChartConfig {
  id: string;
  name: string;
  type: ChartType;
  description: string;
  enabled: boolean;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, Sidebar],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dashboardService = inject(DashboardService);
  private proyectoGuard = inject(ProyectoGuard);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  // Datos del proyecto y métricas
  proyectoId: string = '';
  metrics: ProjectDashboardMetrics | null = null;
  cargando: boolean = true;
  error: string = '';

  // Sistema de gráficos personalizables
  showChartSelector: boolean = false;
  availableCharts: ChartConfig[] = [
    {
      id: 'bar',
      name: 'Gráfico de Barras',
      type: 'bar',
      description: 'Distribución de tareas por estado',
      enabled: true,
      icon: ''
    },
    {
      id: 'pie',
      name: 'Gráfico Circular',
      type: 'pie',
      description: 'Tareas por prioridad',
      enabled: true,
      icon: ''
    },
    {
      id: 'line',
      name: 'Gráfico de Líneas',
      type: 'line',
      description: 'Tendencia de completadas',
      enabled: true,
      icon: ''
    },
    {
      id: 'doughnut',
      name: 'Gráfico de Anillo',
      type: 'doughnut',
      description: 'Distribución general',
      enabled: false,
      icon: ''
    },
    {
      id: 'radar',
      name: 'Gráfico Radar',
      type: 'radar',
      description: 'Comparación por estado',
      enabled: false,
      icon: ''
    }
  ];

  // Configuraciones de gráficos
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribución de Tareas por Estado'
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Tareas',
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      }
    ]
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      title: {
        display: true,
        text: 'Distribución por Prioridad',
        color: 'rgba(255, 255, 255, 0.9)'
      }
    }
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',   // Rojo - Alta
          'rgba(245, 158, 11, 0.8)',  // Amarillo - Media
          'rgba(34, 197, 94, 0.8)'    // Verde - Baja
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Productividad Semanal'
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        }
      }
    }
  };

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Tareas Completadas',
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // Nuevos gráficos
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Eficiencia por Usuario'
      }
    }
  };

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',   // Verde - Completadas
          'rgba(59, 130, 246, 0.8)',  // Azul - En Progreso
          'rgba(245, 158, 11, 0.8)',  // Amarillo - Pendientes
          'rgba(239, 68, 68, 0.8)'    // Rojo - En Revisión
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
          text: 'Métricas de Calidad'
      }
    },
    scales: {
      r: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)'
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          backdropColor: 'transparent'
        }
      }
    }
  };

  public radarChartData: ChartData<'radar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Distribución',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)'
      }
    ]
  };

  private routeSub!: Subscription;
  mostrarSidebar = true;

  ngOnInit(): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.error = 'Usuario no autenticado';
      this.cargando = false;
      this.cdr.detectChanges();
      return;
    }

    this.routeSub = this.route.params.subscribe(params => {
      this.proyectoId = params['id'];
      if (this.proyectoId) {
        this.proyectoGuard.setProyectoActual(this.proyectoId);
        this.cargarMetricas();

        setTimeout(() => {
          if (this.cargando) {
            console.warn('⚠️ [DEBUG] Timeout de carga alcanzado');
            this.error = 'Tiempo de espera agotado. Verifica tu conexión.';
            this.cargando = false;
            this.cdr.detectChanges();
          }
        }, 10000);

      } else {
        this.error = 'ID de proyecto no válido';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  // Métodos para gestionar gráficos
  toggleChart(chartId: string): void {
    const chart = this.availableCharts.find(c => c.id === chartId);
    if (chart) {
      chart.enabled = !chart.enabled;
      this.cdr.detectChanges();
    }
  }

  toggleChartSelector(): void {
    this.showChartSelector = !this.showChartSelector;
  }

  getEnabledCharts(): ChartConfig[] {
    return this.availableCharts.filter(chart => chart.enabled);
  }

  getChartCount(): number {
    return this.getEnabledCharts().length;
  }

  cargarMetricas(): void {
    this.cargando = true;
    this.error = '';

    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.error = 'Usuario no autenticado';
      this.cargando = false;
      this.cdr.detectChanges();
      return;
    }

    this.dashboardService.getProjectDashboard(this.proyectoId).subscribe({
      next: (response) => {
        if (response && response.success) {
          this.metrics = response.data;
          this.actualizarGraficos();
        } else {
          this.error = 'Error al cargar los datos del proyecto';
        }
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('🚨 [DEBUG] Error en la petición:', error);

        if (error?.message?.includes('Usuario no autenticado')) {
          this.error = 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
        } else if (error?.status === 404) {
          this.error = 'No se encontró el proyecto solicitado.';
        } else if (error?.status === 403) {
          this.error = 'No tienes permisos para ver este proyecto.';
        } else {
          this.error = 'Error al conectar con el servidor. Intenta nuevamente.';
        }

        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  actualizarGraficos(): void {
  if (!this.metrics) return;

  const chartData = this.dashboardService.generateChartData(this.metrics);

  // 1. GRÁFICO DE BARRAS - Tareas por Estado (datos originales)
  this.barChartData = {
    labels: ['Sin empezar', 'En Progreso', 'Completadas'],
    datasets: [
      {
        data: [
          this.metrics.stats.tareasPendientes,
          this.metrics.stats.tareasEnProgreso,
          this.metrics.stats.tareasCompletadas
        ],
        label: 'Tareas',
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      }
    ]
  };

  // 2. GRÁFICO CIRCULAR - Distribución por Prioridad (datos reales o estimados)
  this.pieChartData = {
    labels: chartData.tareasPorPrioridad.map(item => item.prioridad),
    datasets: [
      {
        data: chartData.tareasPorPrioridad.map(item => item.cantidad),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',   // Rojo - Alta
          'rgba(245, 158, 11, 0.8)',  // Amarillo - Media
          'rgba(34, 197, 94, 0.8)',   // Verde - Baja
          'rgba(147, 51, 234, 0.8)'   // Púrpura - Sin definir
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(147, 51, 234, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // 3. GRÁFICO DE LÍNEAS - Tendencia semanal de productividad
  // Simulamos datos de tendencia más variados
  const tendenciaProductividad = this.generarTendenciaProductividad();
  this.lineChartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        data: tendenciaProductividad,
        label: 'Productividad Diaria',
        borderColor: 'rgba(168, 85, 247, 1)', // Púrpura
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  // 4. GRÁFICO DE ANILLO - Eficiencia por Usuario (datos simulados)
  const eficienciaUsuarios = this.generarEficienciaUsuarios();
  this.doughnutChartData = {
    labels: eficienciaUsuarios.map(item => item.usuario),
    datasets: [
      {
        data: eficienciaUsuarios.map(item => item.eficiencia),
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',   // Verde
          'rgba(59, 130, 246, 0.8)',  // Azul
          'rgba(245, 158, 11, 0.8)',  // Amarillo
          'rgba(239, 68, 68, 0.8)',   // Rojo
          'rgba(147, 51, 234, 0.8)'   // Púrpura
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(147, 51, 234, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  // 5. GRÁFICO RADAR - Métricas de Calidad del Proyecto
  const metricasCalidad = this.generarMetricasCalidad();
  this.radarChartData = {
    labels: ['Completitud', 'Velocidad', 'Calidad', 'Participación', 'Innovación'],
    datasets: [
      {
        data: metricasCalidad,
        label: 'Calidad del Proyecto',
        backgroundColor: 'rgba(14, 165, 233, 0.2)',   // Azul claro
        borderColor: 'rgba(14, 165, 233, 1)',         // Azul
        pointBackgroundColor: 'rgba(14, 165, 233, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(14, 165, 233, 1)'
      }
    ]
  };

  setTimeout(() => {
    this.cdr.detectChanges();
  }, 100);
}

// Nuevos métodos para generar datos diversos
private generarTendenciaProductividad(): number[] {
  const base = this.metrics!.stats.porcentajeCompletado / 100;
  return [
    Math.round((base * 0.7 + Math.random() * 0.3) * 100), // Lunes
    Math.round((base * 0.8 + Math.random() * 0.2) * 100), // Martes
    Math.round((base * 0.9 + Math.random() * 0.3) * 100), // Miércoles
    Math.round((base * 0.85 + Math.random() * 0.4) * 100), // Jueves
    Math.round((base * 0.95 + Math.random() * 0.2) * 100), // Viernes
    Math.round((base * 0.6 + Math.random() * 0.3) * 100), // Sábado
    Math.round((base * 0.5 + Math.random() * 0.2) * 100)  // Domingo
  ];
}

private generarEficienciaUsuarios(): { usuario: string; eficiencia: number }[] {
  const usuarios = ['Ana García', 'Carlos López', 'María Rodríguez', 'Pedro Martínez', 'Laura Fernández'];
  const totalTareas = this.metrics!.stats.totalTareas;

  return usuarios.map(usuario => ({
    usuario,
    eficiencia: Math.round((Math.random() * 0.6 + 0.4) * (totalTareas / usuarios.length))
  }));
}

private generarMetricasCalidad(): number[] {
  const completitud = this.metrics!.stats.porcentajeCompletado;
  const velocidad = Math.min(100, Math.round(completitud * (0.8 + Math.random() * 0.4)));
  const calidad = Math.min(100, Math.round(completitud * (0.9 + Math.random() * 0.2)));
  const participacion = Math.min(100, Math.round((this.metrics!.stats.totalTareas / 10) * (0.7 + Math.random() * 0.6)));
  const innovacion = Math.min(100, Math.round((completitud * 0.3 + Math.random() * 70)));

  return [completitud, velocidad, calidad, participacion, innovacion];
}

  // Resto de métodos auxiliares...
  getNombreUsuario(): string {
    const usuario = this.authService.getCurrentUser();
    if (!usuario) return 'Usuario';
    return `${usuario.nombre} ${usuario.apellido}`;
  }

  irAlBoard(): void {
    this.router.navigate(['/board']);
  }

  toggleSidebar(): void {
    this.mostrarSidebar = !this.mostrarSidebar;
  }

  formatearPorcentaje(decimal: number): string {
    return `${Math.round(decimal)}%`;
  }

  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getColorPrioridad(prioridad: string): string {
    switch (prioridad.toLowerCase()) {
      case 'alta': return 'bg-red-500';
      case 'media': return 'bg-yellow-500';
      case 'baja': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  }

  getColorEstado(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'finalizado': return 'bg-green-500';
      case 'en proceso': return 'bg-blue-500';
      case 'en revisión': return 'bg-yellow-500';
      case 'sin empezar': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  }

 isChartEnabled(chartId: string): boolean {
  const chart = this.availableCharts.find((c: ChartConfig) => c.id === chartId);
  return chart ? chart.enabled : false;
}

// O si prefieres métodos individuales más específicos:
isBarChartEnabled(): boolean {
  const chart = this.availableCharts.find((c: ChartConfig) => c.id === 'bar');
  return chart ? chart.enabled : false;
}

isPieChartEnabled(): boolean {
  const chart = this.availableCharts.find((c: ChartConfig) => c.id === 'pie');
  return chart ? chart.enabled : false;
}

isLineChartEnabled(): boolean {
  const chart = this.availableCharts.find((c: ChartConfig) => c.id === 'line');
  return chart ? chart.enabled : false;
}

isDoughnutChartEnabled(): boolean {
  const chart = this.availableCharts.find((c: ChartConfig) => c.id === 'doughnut');
  return chart ? chart.enabled : false;
}

isRadarChartEnabled(): boolean {
  const chart = this.availableCharts.find((c: ChartConfig) => c.id === 'radar');
  return chart ? chart.enabled : false;
}
}
