// src/app/dashboard/dashboard.component.ts
import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

// Components
import { Sidebar } from '../../../shared/ui/sidebar/sidebar';
import { DashboardService, ProjectDashboardMetrics, UsuarioEficiencia, EvolucionProyecto } from '../service/dashboard.service';
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
  category: 'basic' | 'advanced' | 'analytics';
}

// INTERFAZ PARA ESTADOS DINÁMICOS (ahora definida localmente)
interface EstadoDashboard {
  id: number;
  nombre: string;
  cantidad: number;
  color?: string;
}

// INTERFAZ PARA USUARIOS EFICIENCIA (CON TODOS LOS ESTADOS)
interface UsuarioEficienciaLocal {
  nombreCompleto: string;
  tareasCompletadas: number;
  totalTareas: number;
  tareasPendientes: number;
  tareasEnProgreso: number;
  tareasEnRevision?: number;
  tareasBloqueadas?: number;
  tareasCanceladas?: number;
  tareasOtrosEstados?: { [estado: string]: number };
  eficiencia: number;
  porcentajeTotal?: number;
}

// INTERFAZ PARA EXTENDER LAS MÉTRICAS
interface ProjectDashboardMetricsExtended extends ProjectDashboardMetrics {
  usuariosEficiencia?: UsuarioEficienciaLocal[];
  estadosDisponibles?: EstadoDashboard[];
  distribucionPorEstadoCompleta?: EstadoDashboard[];
  evolucionDinamicaCompleta?: {
    estados: string[];
    datosPorEstado: {
      [estado: string]: number[];
    };
    labels: string[];
  };
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
  @Inject(PLATFORM_ID) private platformId: any;

  // Datos del proyecto y métricas
  proyectoId: string = '';
  metrics: ProjectDashboardMetrics | null = null;
  metricsExtended: ProjectDashboardMetricsExtended | null = null;
  cargando: boolean = true;
  error: string = '';

  // Sistema de gráficos personalizables mejorado
  showChartSelector: boolean = false;
  availableCharts: ChartConfig[] = [
    {
      id: 'bar',
      name: 'Gráfico de Barras',
      type: 'bar',
      description: 'Distribución de tareas por estado (Dinámico)',
      enabled: true,
      icon: 'bar_chart',
      category: 'basic'
    },
    {
      id: 'pie',
      name: 'Gráfico Circular',
      type: 'pie',
      description: 'Tareas por prioridad',
      enabled: true,
      icon: 'pie_chart',
      category: 'basic'
    },
    {
      id: 'area',
      name: 'Evolución del Proyecto',
      type: 'line',
      description: 'Área apilada - Progreso general histórico REAL',
      enabled: true,
      icon: 'trending_up',
      category: 'analytics'
    },
    {
      id: 'doughnut',
      name: 'Eficiencia por Usuario',
      type: 'doughnut',
      description: 'Eficiencia basada en todas las tareas del usuario',
      enabled: true,
      icon: 'people',
      category: 'advanced'
    }
  ];

  // Nuevas propiedades para mejoras
  private readonly CHART_STORAGE_KEY = 'dashboard_chart_preferences';
  isMobileView: boolean = false;
  autoRefreshInterval: any;
  lastUpdate: Date = new Date();
  chartAnimationEnabled: boolean = true;
  isBrowser: boolean = false;

  // PROPIEDADES PARA EXPORTACIÓN HTML ULTRA PREMIUM
  showExportModal: boolean = false;
  exportFormats = [
    { 
      id: 'html', 
      name: 'Reporte Ejecutivo ', 
      description: 'Reporte ejecutivo con diseño de clase mundial', 
      icon: 'description',
      color: 'text-blue-600'
    }
  ];
  exportando: boolean = false;

  // ========== CONFIGURACIONES DE GRÁFICOS MEJORADAS ==========

  // 1. GRÁFICO DE BARRAS DINÁMICO - Distribución por Estado (TODAS LAS COLUMNAS)
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(150, 150, 150, 0.9)',
          font: {
            size: 13,
            weight: 600
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: 'Distribución de Tareas por Estado (Dinámico)',
        color: 'rgba(150, 150, 150, 0.9)',
        font: {
          size: 18,
          weight: 700
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: 'rgba(255, 255, 255, 0.95)',
        bodyColor: 'rgba(255, 255, 255, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        boxPadding: 6,
        titleFont: {
          size: 13,
          weight: 600
        },
        bodyFont: {
          size: 12
        },
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} tareas`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(150, 150, 150, 0.2)',
        },
        ticks: {
          color: 'rgba(150, 150, 150, 0.9)',
          font: {
            size: 12,
            weight: 500
          },
          padding: 10,
          callback: function(value, index, ticks) {
            const label = this.getLabelForValue(value as number);
            return label.length > 12 ? label.substring(0, 12) + '...' : label;
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(150, 150, 150, 0.2)',
        },
        ticks: {
          color: 'rgba(150, 150, 150, 0.9)',
          font: {
            size: 11,
            weight: 500
          },
          padding: 8,
          callback: function(value) {
            return Number(value) % 1 === 0 ? value : '';
          }
        },
        beginAtZero: true
      }
    },
    animation: {
      duration: this.chartAnimationEnabled ? 1200 : 0,
      easing: 'easeOutQuart'
    },
    elements: {
      bar: {
        borderRadius: 12,
        borderSkipped: false,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)'
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  };

  public barChartData: ChartData<'bar'> = {
    labels: ['Pendientes', 'En Progreso', 'Completadas'],
    datasets: [
      {
        data: [0, 0, 0],
        label: 'Cantidad de Tareas',
        backgroundColor: [
          'rgba(239, 68, 68, 0.9)',
          'rgba(245, 158, 11, 0.9)',
          'rgba(34, 197, 94, 0.9)'
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)'
        ],
        borderWidth: 3,
        borderRadius: 16,
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
        hoverBackgroundColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)'
        ],
        hoverBorderColor: [
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)',
          'rgba(255, 255, 255, 0.8)'
        ],
        hoverBorderWidth: 4
      }
    ]
  };

  // 2. GRÁFICO CIRCULAR - Distribución por Prioridad
  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: 'rgba(150, 150, 150, 0.9)',
          font: {
            size: 12,
            weight: 600
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'rectRounded',
          boxWidth: 12,
          boxHeight: 12
        },
        align: 'center'
      },
      title: {
        display: true,
        text: 'Distribución por Prioridad',
        color: 'rgba(150, 150, 150, 0.9)',
        font: {
          size: 18,
          weight: 700
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: 'rgba(255, 255, 255, 0.95)',
        bodyColor: 'rgba(255, 255, 255, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        boxPadding: 6,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} tareas (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      duration: this.chartAnimationEnabled ? 1500 : 0,
      easing: 'easeOutQuart',
      animateRotate: true,
      animateScale: true
    },
    cutout: '0%',
    radius: '85%'
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Alta Prioridad', 'Media Prioridad', 'Baja Prioridad'],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(239, 68, 68, 0.95)',
          'rgba(245, 158, 11, 0.95)',
          'rgba(34, 197, 94, 0.95)'
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)'
        ],
        borderWidth: 3,
        borderAlign: 'inner',
        hoverBackgroundColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)'
        ],
        hoverBorderColor: 'rgba(255, 255, 255, 0.8)',
        hoverBorderWidth: 4,
        hoverOffset: 20,
        spacing: 2,
        offset: [0, 5, 0]
      }
    ]
  };

  // 3. GRÁFICO DE ÁREA APILADO - Evolución del Proyecto por Estado (DATOS 100% REALES)
  public areaChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(150, 150, 150, 0.9)',
          font: {
            size: 12,
            weight: 600
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
        text: 'Evolución Histórica del Proyecto',
        color: 'rgba(150, 150, 150, 0.9)',
        font: {
          size: 18,
          weight: 700
        },
        padding: {
          top: 10,
          bottom: 30
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: 'rgba(255, 255, 255, 0.95)',
        bodyColor: 'rgba(255, 255, 255, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        boxPadding: 6,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += context.parsed.y + ' tareas';
            return label;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(150, 150, 150, 0.2)',
        },
        ticks: {
          color: 'rgba(150, 150, 150, 0.9)',
          font: {
            size: 11,
            weight: 500
          },
          padding: 8
        }
      },
      y: {
        stacked: true,
        grid: {
          color: 'rgba(150, 150, 150, 0.2)',
        },
        ticks: {
          color: 'rgba(150, 150, 150, 0.9)',
          font: {
            size: 11,
            weight: 500
          },
          padding: 8
        },
        beginAtZero: true
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    animation: {
      duration: this.chartAnimationEnabled ? 1800 : 0,
      easing: 'easeOutQuart'
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3,
        fill: true
      },
      point: {
        radius: 6,
        hoverRadius: 10,
        borderWidth: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }
    }
  };

  public areaChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  // 4. GRÁFICO DE ANILLO - Eficiencia por Usuario (CON TODAS LAS TAREAS - DESGLOSE COMPLETO)
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: 'rgba(150, 150, 150, 0.9)',
          font: {
            size: 11,
            weight: 600
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 10,
          boxHeight: 10
        }
      },
      title: {
        display: true,
        text: 'Eficiencia por Usuario (Desglose Completo)',
        color: 'rgba(150, 150, 150, 0.9)',
        font: {
          size: 18,
          weight: 700
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: 'rgba(255, 255, 255, 0.95)',
        bodyColor: 'rgba(255, 255, 255, 0.85)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 12,
        boxPadding: 6,
        callbacks: {
          label: (context) => {
            const index = context.dataIndex;
            const label = this.doughnutChartData.labels?.[index] || '';
            
            // Si tenemos datos de eficiencia procesados, mostrar información detallada
            if (this.metricsExtended?.usuariosEficiencia && index < this.metricsExtended.usuariosEficiencia.length) {
              const usuario = this.metricsExtended.usuariosEficiencia[index];
              
              // Construir tooltip detallado
              let tooltipText = `${usuario.nombreCompleto}\n`;
              tooltipText += `Eficiencia: ${usuario.eficiencia}%\n`;
              tooltipText += `Total tareas: ${usuario.totalTareas}\n`;
              tooltipText += `✓ Completadas: ${usuario.tareasCompletadas || 0}\n`;
              tooltipText += `→ En Progreso: ${usuario.tareasEnProgreso || 0}\n`;
              tooltipText += `● Pendientes: ${usuario.tareasPendientes || 0}\n`;
              
              if (usuario.tareasEnRevision) tooltipText += `👁 En Revisión: ${usuario.tareasEnRevision}\n`;
              if (usuario.tareasBloqueadas) tooltipText += `⛔ Bloqueadas: ${usuario.tareasBloqueadas}\n`;
              if (usuario.tareasCanceladas) tooltipText += `✕ Canceladas: ${usuario.tareasCanceladas}\n`;
              
              // Otros estados
              if (usuario.tareasOtrosEstados) {
                const otrosTotal = Object.values(usuario.tareasOtrosEstados).reduce((sum, val) => sum + val, 0);
                if (otrosTotal > 0) {
                  tooltipText += `⋯ Otros estados: ${otrosTotal}\n`;
                  Object.entries(usuario.tareasOtrosEstados).forEach(([estado, cantidad]) => {
                    if (cantidad > 0) tooltipText += `  - ${estado}: ${cantidad}\n`;
                  });
                }
              }
              
              return tooltipText.split('\n');
            }
            
            return `${label}: ${context.parsed}%`;
          }
        }
      }
    },
    animation: {
      duration: this.chartAnimationEnabled ? 1600 : 0,
      easing: 'easeOutQuart',
      animateRotate: true,
      animateScale: true
    },
    radius: '95%'
  };

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          'rgba(34, 197, 94, 0.95)',
          'rgba(59, 130, 246, 0.95)',
          'rgba(245, 158, 11, 0.95)',
          'rgba(239, 68, 68, 0.95)',
          'rgba(147, 51, 234, 0.95)',
          'rgba(14, 165, 233, 0.95)',
          'rgba(251, 191, 36, 0.95)',
          'rgba(249, 115, 22, 0.95)'
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(249, 115, 22, 1)'
        ],
        borderWidth: 3,
        borderAlign: 'inner',
        hoverBackgroundColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(249, 115, 22, 1)'
        ],
        hoverBorderColor: 'rgba(255, 255, 255, 0.8)',
        hoverBorderWidth: 4,
        hoverOffset: 25,
        spacing: 3,
        offset: [0, 2, 0, 2, 0, 2, 0, 2]
      }
    ]
  };

  private routeSub!: Subscription;
  mostrarSidebar = true;

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    if (this.isBrowser) {
      this.checkMobileView();
    }

    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.handleAuthError();
      return;
    }

    this.routeSub = this.route.params.subscribe(params => {
      this.proyectoId = params['id'];
      if (this.proyectoId) {
        this.proyectoGuard.setProyectoActual(this.proyectoId);
        this.cargarMetricas();
        if (this.isBrowser) {
          this.startAutoRefresh();
        }
      } else {
        this.handleInvalidProjectId();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.isBrowser) {
      this.stopAutoRefresh();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isBrowser) {
      this.checkMobileView();
    }
  }

  private checkMobileView(): void {
    if (this.isBrowser) {
      this.isMobileView = window.innerWidth < 1024;
      this.cdr.detectChanges();
    }
  }

  private startAutoRefresh(): void {
    if (!this.isBrowser) return;
    
    this.autoRefreshInterval = setInterval(() => {
      if (!this.cargando && this.metrics) {
        this.cargarMetricas();
      }
    }, 120000);
  }

  private stopAutoRefresh(): void {
    if (this.autoRefreshInterval) {
      clearInterval(this.autoRefreshInterval);
    }
  }

  private handleAuthError(): void {
    this.error = 'Usuario no autenticado. Por favor, inicia sesión nuevamente.';
    this.cargando = false;
    this.cdr.detectChanges();
  }

  private handleInvalidProjectId(): void {
    this.error = 'ID de proyecto no válido. Verifica la URL e intenta nuevamente.';
    this.cargando = false;
    this.cdr.detectChanges();
  }

  // MÉTODO AUXILIAR para verificar usuariosEficiencia
  private tieneUsuariosEficiencia(metrics: ProjectDashboardMetrics | null): boolean {
    return !!metrics && !!(metrics as any).usuariosEficiencia;
  }

  // MÉTODO AUXILIAR para verificar distribución completa
  private tieneDistribucionCompleta(metrics: ProjectDashboardMetrics | null): boolean {
    return !!metrics && !!(metrics as any).distribucionPorEstadoCompleta;
  }

  // MÉTODO AUXILIAR para verificar evolución dinámica completa
  private tieneEvolucionDinamicaCompleta(metrics: ProjectDashboardMetricsExtended | null): boolean {
    return !!metrics && !!metrics.evolucionDinamicaCompleta;
  }

  // ========== MÉTODOS DE EXPORTACIÓN HTML ULTRA PREMIUM ==========

  abrirMenuExportacion(): void {
    this.showExportModal = true;
  }

  cerrarMenuExportacion(): void {
    this.showExportModal = false;
  }

  seleccionarFormatoExportacion(formato: string): void {
    if (formato === 'html') {
      this.exportarComoHTML();
    } else {
      this.mostrarNotificacionExportacion('error', `Formato ${formato} no es válido`);
    }
    this.cerrarMenuExportacion();
  }

  async exportarComoHTML(): Promise<void> {
    const isBrowserEnvironment = typeof window !== 'undefined' && 
                                typeof document !== 'undefined' && 
                                window && document;
    
    if (!isBrowserEnvironment) {
      this.mostrarNotificacionExportacion('error', 'La exportación solo está disponible en el navegador');
      return;
    }

    this.exportando = true;
    this.cdr.detectChanges();

    try {
      await this.generarHTMLPremium();
      this.mostrarNotificacionExportacion('success', 'Reporte ejecutivo generado correctamente');
    } catch (error) {
      console.error('Error generando HTML:', error);
      this.mostrarNotificacionExportacion('error', 'Error al generar el reporte: ' + (error as Error).message);
    } finally {
      this.exportando = false;
      this.cdr.detectChanges();
    }
  }

  private async generarHTMLPremium(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const proyecto = this.metrics?.proyecto;
        const stats = this.metrics?.stats;
        
        const datosProyecto = {
          nombre: proyecto?.nombre || 'Proyecto no disponible',
          descripcion: proyecto?.descripcion || 'Sin descripción',
          createdAt: proyecto?.createdAt ? new Date(proyecto.createdAt) : new Date()
        };

        const datosStats = {
          totalTareas: stats?.totalTareas || 0,
          tareasCompletadas: stats?.tareasCompletadas || 0,
          porcentajeCompletado: stats?.porcentajeCompletado || 0,
          tareasEnProgreso: stats?.tareasEnProgreso || 0,
          tareasPendientes: stats?.tareasPendientes || 0
        };

        const htmlContent = this.generarContenidoHTMLPremium(datosProyecto, datosStats);
        const nombreArchivo = `reporte-premium-${this.proyectoId || 'proyecto'}-${new Date().toISOString().split('T')[0]}.html`;
        this.descargarArchivoHTML(htmlContent, nombreArchivo);
        
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  private generarContenidoHTMLPremium(datosProyecto: any, datosStats: any): string {
    const fechaGeneracion = new Date().toLocaleString('es-ES');
    const usuario = this.getNombreUsuario();

    // Obtener datos REALES del dashboard para la evolución temporal
    const datosEvolucionReal = this.obtenerEvolucionReal();

    // Obtener datos de distribución dinámica
    const distribucionDinamica = this.tieneDistribucionCompleta(this.metrics) 
      ? (this.metrics as any).distribucionPorEstadoCompleta 
      : null;

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte Ejecutivo - ${datosProyecto.nombre}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {
            --primary: #6366F1;
            --primary-dark: #4F46E5;
            --primary-light: #8B5CF6;
            --secondary: #10B981;
            --accent: #F59E0B;
            --danger: #EF4444;
            --warning: #F59E0B;
            --info: #3B82F6;
            --dark: #0F172A;
            --light: #F8FAFC;
            --gray-50: #F9FAFB;
            --gray-100: #F3F4F6;
            --gray-200: #E5E7EB;
            --gray-300: #D1D5DB;
            --gray-400: #9CA3AF;
            --gray-500: #6B7280;
            --gray-600: #4B5563;
            --gray-700: #374151;
            --gray-800: #1F2937;
            --gray-900: #111827;
            
            --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --gradient-success: linear-gradient(135deg, #10B981 0%, #059669 100%);
            --gradient-warning: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
            --gradient-danger: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
            --gradient-premium: linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #4F46E5 100%);
            
            --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
            --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            
            --border-radius: 12px;
            --border-radius-lg: 16px;
            --border-radius-xl: 20px;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            color: var(--gray-800);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: var(--border-radius-xl);
            box-shadow: var(--shadow-2xl);
            overflow: hidden;
        }
        
        /* Header Premium */
        .header {
            background: var(--gradient-premium);
            color: white;
            padding: 50px 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
                radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(255,255,255,0.08) 0%, transparent 50%);
        }
        
        .header-content {
            position: relative;
            z-index: 2;
        }
        
        .badge-premium {
            display: inline-block;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            padding: 10px 20px;
            border-radius: 50px;
            font-size: 0.8rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 900;
            margin-bottom: 12px;
            letter-spacing: -0.025em;
            background: linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        .header .subtitle {
            font-size: 1.2rem;
            opacity: 0.9;
            font-weight: 400;
            max-width: 600px;
            margin: 0 auto;
            line-height: 1.5;
        }
        
        /* Project Info - Tamaños ajustados */
        .project-info {
            background: var(--gray-50);
            padding: 40px;
            border-bottom: 1px solid var(--gray-200);
        }
        
        .section-title {
            display: flex;
            align-items: center;
            gap: 12px;
            color: var(--gray-900);
            font-size: 1.5rem;
            font-weight: 800;
            margin-bottom: 30px;
            position: relative;
        }
        
        .section-title::after {
            content: '';
            flex: 1;
            height: 3px;
            background: var(--gradient-primary);
            border-radius: 3px;
            margin-left: 15px;
        }
        
        .section-title .material-icons {
            color: var(--primary);
            font-size: 2rem;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }
        
        .info-card {
            background: white;
            padding: 24px;
            border-radius: var(--border-radius-lg);
            border-left: 4px solid var(--primary);
            box-shadow: var(--shadow-md);
            transition: all 0.3s ease;
        }
        
        .info-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
        }
        
        .info-card strong {
            color: var(--gray-600);
            display: block;
            margin-bottom: 8px;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 700;
        }
        
        .info-card span {
            color: var(--gray-900);
            font-size: 1.1rem;
            font-weight: 600;
            line-height: 1.4;
        }
        
        /* KPI Cards Premium - Tamaños ajustados */
        .metrics-section {
            padding: 50px 40px;
            background: white;
            position: relative;
        }
        
        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 25px;
            margin-bottom: 50px;
        }
        
        .kpi-card {
            background: white;
            padding: 30px 20px;
            border-radius: var(--border-radius-lg);
            text-align: center;
            box-shadow: var(--shadow-md);
            border: 1px solid var(--gray-200);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .kpi-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: var(--gradient-primary);
        }
        
        .kpi-card:hover {
            transform: translateY(-6px);
            box-shadow: var(--shadow-xl);
        }
        
        .kpi-icon {
            width: 70px;
            height: 70px;
            margin: 0 auto 20px;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: white;
            position: relative;
            z-index: 2;
            box-shadow: var(--shadow-md);
        }
        
        .kpi-value {
            font-size: 2.5rem;
            font-weight: 900;
            margin: 15px 0;
            line-height: 1;
            position: relative;
            z-index: 2;
        }
        
        .kpi-label {
            color: var(--gray-600);
            font-size: 0.9rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 700;
            position: relative;
            z-index: 2;
        }
        
        .total-tareas .kpi-icon { background: var(--gradient-primary); }
        .completadas .kpi-icon { background: var(--gradient-success); }
        .en-progreso .kpi-icon { background: var(--gradient-warning); }
        .pendientes .kpi-icon { background: var(--gradient-danger); }
        .progreso .kpi-icon { background: var(--gradient-premium); }
        
        .total-tareas .kpi-value { background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .completadas .kpi-value { background: var(--gradient-success); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .en-progreso .kpi-value { background: var(--gradient-warning); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .pendientes .kpi-value { background: var(--gradient-danger); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .progreso .kpi-value { background: var(--gradient-premium); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        
        /* Charts Section Premium - Tamaños ajustados */
        .charts-section {
            padding: 50px 40px;
            background: var(--gray-50);
            position: relative;
        }
        
        .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
            gap: 30px;
            margin-bottom: 50px;
        }
        
        .chart-container {
            background: white;
            padding: 30px;
            border-radius: var(--border-radius-lg);
            box-shadow: var(--shadow-md);
            border: 1px solid var(--gray-200);
            transition: all 0.3s ease;
        }
        
        .chart-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: var(--gradient-primary);
        }
        
        .chart-container:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
        }
        
        .chart-title {
            display: flex;
            align-items: center;
            gap: 12px;
            color: var(--gray-900);
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 25px;
        }
        
        .chart-title .material-icons {
            color: var(--primary);
            font-size: 1.5rem;
            background: var(--gradient-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .chart-canvas-container {
            width: 100%;
            height: 300px;
            background: white;
            border-radius: var(--border-radius);
            padding: 15px;
            position: relative;
        }
        
        /* Data Tables Premium - Tamaños ajustados */
        .data-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 30px;
        }
        
        .data-table {
            background: white;
            border-radius: var(--border-radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow-md);
            border: 1px solid var(--gray-200);
            transition: all 0.3s ease;
        }
        
        .data-table:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
        }
        
        .table-header {
            background: var(--gradient-primary);
            color: white;
            padding: 20px;
            font-weight: 700;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .table-row {
            display: grid;
            grid-template-columns: 1fr auto auto;
            padding: 20px;
            border-bottom: 1px solid var(--gray-200);
            align-items: center;
            transition: all 0.2s ease;
            gap: 15px;
        }
        
        .table-row:hover {
            background: var(--gray-50);
        }
        
        .table-row:nth-child(even) {
            background: var(--gray-50);
        }
        
        .progress-bar-container {
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 180px;
        }
        
        .progress-bar {
            flex: 1;
            height: 12px;
            background: var(--gray-200);
            border-radius: 6px;
            overflow: hidden;
            position: relative;
        }
        
        .progress-fill {
            height: 100%;
            border-radius: 6px;
            transition: width 0.6s ease;
            background: var(--gradient-primary);
            position: relative;
        }
        
        /* Footer Premium - Tamaños ajustados */
        .footer {
            background: var(--dark);
            color: white;
            padding: 40px;
            position: relative;
        }
        
        .footer-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 30px;
            max-width: 1000px;
            margin: 0 auto;
        }
        
        .footer-section {
            text-align: center;
        }
        
        .footer-section strong {
            color: var(--gray-300);
            display: block;
            margin-bottom: 8px;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 600;
        }
        
        .footer-section span {
            color: white;
            font-size: 1rem;
            font-weight: 500;
        }
        
        /* Animaciones */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .fade-in {
            animation: fadeInUp 0.8s ease both;
        }
        
        /* Responsive Design Mejorado */
        @media (max-width: 1024px) {
            .charts-grid {
                grid-template-columns: 1fr;
            }
            
            .chart-container {
                padding: 25px;
            }
        }
        
        @media (max-width: 768px) {
            .header {
                padding: 40px 20px;
            }
            
            .header h1 {
                font-size: 2rem;
            }
            
            .project-info,
            .metrics-section,
            .charts-section {
                padding: 30px 20px;
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }
            
            .kpi-grid {
                grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
                gap: 20px;
            }
            
            .kpi-card {
                padding: 25px 15px;
            }
            
            .kpi-icon {
                width: 60px;
                height: 60px;
                font-size: 1.8rem;
            }
            
            .kpi-value {
                font-size: 2rem;
            }
            
            .data-grid {
                grid-template-columns: 1fr;
            }
            
            .charts-grid {
                grid-template-columns: 1fr;
                gap: 20px;
            }
            
            .chart-canvas-container {
                height: 250px;
            }
            
            .table-row {
                grid-template-columns: 1fr;
                gap: 10px;
                text-align: center;
            }
            
            .progress-bar-container {
                justify-content: center;
            }
            
            .footer-info {
                grid-template-columns: 1fr;
                gap: 25px;
            }
        }
        
        @media (max-width: 480px) {
            body {
                padding: 10px;
            }
            
            .container {
                border-radius: var(--border-radius);
            }
            
            .kpi-grid {
                grid-template-columns: 1fr;
            }
            
            .chart-canvas-container {
                height: 200px;
            }
        }
    </style>
</head>
<body>
    <div class="container fade-in">
        <header class="header">
            <div class="header-content">
                <div class="badge-premium">Reporte Ejecutivo </div>
                <h1>ANÁLISIS DE DESEMPEÑO</h1>
                <p class="subtitle">Dashboard ejecutivo con métricas avanzadas y visualizaciones precisas</p>
            </div>
        </header>
        
        <section class="project-info">
            <h2 class="section-title">
                <span class="material-icons">business</span>
                INFORMACIÓN DEL PROYECTO
            </h2>
            <div class="info-grid">
                <div class="info-card">
                    <strong>Proyecto</strong>
                    <span>${this.escapeHtml(datosProyecto.nombre)}</span>
                </div>
                <div class="info-card">
                    <strong>Descripción</strong>
                    <span>${this.escapeHtml(datosProyecto.descripcion)}</span>
                </div>
                <div class="info-card">
                    <strong>Fecha de Creación</strong>
                    <span>${this.formatearFechaHTML(datosProyecto.createdAt.toISOString())}</span>
                </div>
                <div class="info-card">
                    <strong>ID del Proyecto</strong>
                    <span style="font-family: 'Monaco', 'Consolas', monospace; font-weight: 600;">${this.proyectoId || 'N/A'}</span>
                </div>
            </div>
        </section>
        
        <section class="metrics-section">
            <h2 class="section-title">
                <span class="material-icons">analytics</span>
                MÉTRICAS PRINCIPALES
            </h2>
            <div class="kpi-grid">
                <div class="kpi-card total-tareas">
                    <div class="kpi-icon">
                        <span class="material-icons">assignment</span>
                    </div>
                    <div class="kpi-value">${datosStats.totalTareas}</div>
                    <div class="kpi-label">Total de Tareas</div>
                </div>
                <div class="kpi-card completadas">
                    <div class="kpi-icon">
                        <span class="material-icons">check_circle</span>
                    </div>
                    <div class="kpi-value">${datosStats.tareasCompletadas}</div>
                    <div class="kpi-label">Completadas</div>
                </div>
                <div class="kpi-card en-progreso">
                    <div class="kpi-icon">
                        <span class="material-icons">autorenew</span>
                    </div>
                    <div class="kpi-value">${datosStats.tareasEnProgreso}</div>
                    <div class="kpi-label">En Progreso</div>
                </div>
                <div class="kpi-card pendientes">
                    <div class="kpi-icon">
                        <span class="material-icons">schedule</span>
                    </div>
                    <div class="kpi-value">${datosStats.tareasPendientes}</div>
                    <div class="kpi-label">Pendientes</div>
                </div>
                <div class="kpi-card progreso">
                    <div class="kpi-icon">
                        <span class="material-icons">trending_up</span>
                    </div>
                    <div class="kpi-value">${datosStats.porcentajeCompletado}%</div>
                    <div class="kpi-label">Progreso General</div>
                </div>
            </div>
        </section>
        
        <section class="charts-section">
            <h2 class="section-title">
                <span class="material-icons">insights</span>
                ANÁLISIS VISUAL AVANZADO
            </h2>
            
            <div class="charts-grid">
                <div class="chart-container">
                    <h3 class="chart-title">
                        <span class="material-icons">bar_chart</span>
                        DISTRIBUCIÓN POR ESTADO (DINÁMICO)
                    </h3>
                    <div class="chart-canvas-container">
                        <canvas id="barChart"></canvas>
                    </div>
                </div>
                
                <div class="chart-container">
                    <h3 class="chart-title">
                        <span class="material-icons">pie_chart</span>
                        DISTRIBUCIÓN POR PRIORIDAD
                    </h3>
                    <div class="chart-canvas-container">
                        <canvas id="pieChart"></canvas>
                    </div>
                </div>
                
                <div class="chart-container" style="grid-column: 1 / -1;">
                    <h3 class="chart-title">
                        <span class="material-icons">show_chart</span>
                        EVOLUCIÓN TEMPORAL DEL PROYECTO
                    </h3>
                    <div class="chart-canvas-container">
                        <canvas id="areaChart"></canvas>
                    </div>
                </div>
            </div>
            
            <div class="data-grid">
                <div class="data-table">
                    <div class="table-header">
                        <span class="material-icons">table_chart</span>
                        DISTRIBUCIÓN POR ESTADO (COMPLETA)
                    </div>
                    ${this.generarTablaEstadosPremiumDinamica()}
                </div>
                
                <div class="data-table">
                    <div class="table-header">
                        <span class="material-icons">people</span>
                        EFICIENCIA POR USUARIO
                    </div>
                    ${this.generarTablaEficienciaPremium()}
                </div>
            </div>
        </section>
        
        <footer class="footer">
            <div class="footer-info">
                <div class="footer-section">
                    <strong>Generado por</strong>
                    <span>${this.escapeHtml(usuario)}</span>
                </div>
                <div class="footer-section">
                    <strong>Fecha de generación</strong>
                    <span>${fechaGeneracion}</span>
                </div>
                <div class="footer-section">
                    <strong>Proyecto ID</strong>
                    <span>${this.proyectoId || 'N/A'}</span>
                </div>
                <div class="footer-section">
                    <strong>Sistema de Gestión</strong>
                    <span>v4.0 Executive</span>
                </div>
            </div>
        </footer>
    </div>

    <script>
        // Configuración de gráficos con Chart.js - Datos 100% REALES del dashboard
        function initCharts() {
            // Datos REALES del gráfico de barras
            const barLabels = ${JSON.stringify(this.barChartData.labels)};
            const barData = ${JSON.stringify(this.barChartData.datasets[0].data)};
            const barColors = ${JSON.stringify(this.barChartData.datasets[0].backgroundColor)};
            const barBorderColors = ${JSON.stringify(this.barChartData.datasets[0].borderColor)};
            
            // Datos REALES del gráfico circular
            const pieData = ${JSON.stringify(this.pieChartData.datasets[0].data)};
            
            // Datos REALES de evolución
            const evolucionData = ${JSON.stringify(datosEvolucionReal)};
            
            // Gráfico de Barras DINÁMICO - Datos REALES
            new Chart(document.getElementById('barChart'), {
                type: 'bar',
                data: {
                    labels: barLabels,
                    datasets: [{
                        label: 'Cantidad de Tareas',
                        data: barData,
                        backgroundColor: barColors,
                        borderColor: barBorderColors,
                        borderWidth: 3,
                        borderRadius: 16,
                        borderSkipped: false,
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                font: {
                                    size: 11
                                }
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 12,
                                    weight: '500'
                                },
                                maxRotation: 45,
                                minRotation: 45
                            }
                        }
                    },
                    animation: {
                        duration: 1500,
                        easing: 'easeOutQuart'
                    }
                }
            });
            
            // Gráfico Circular - Datos REALES
            new Chart(document.getElementById('pieChart'), {
                type: 'pie',
                data: {
                    labels: ['Alta Prioridad', 'Media Prioridad', 'Baja Prioridad'],
                    datasets: [{
                        data: pieData,
                        backgroundColor: [
                            'rgba(239, 68, 68, 0.95)',
                            'rgba(245, 158, 11, 0.95)',
                            'rgba(34, 197, 94, 0.95)'
                        ],
                        borderColor: [
                            'rgba(239, 68, 68, 1)',
                            'rgba(245, 158, 11, 1)',
                            'rgba(34, 197, 94, 1)'
                        ],
                        borderWidth: 3,
                        hoverOffset: 20
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                font: {
                                    size: 12,
                                    weight: '600'
                                },
                                padding: 15
                            }
                        }
                    },
                    animation: {
                        duration: 1500,
                        easing: 'easeOutQuart'
                    }
                }
            });
            
            // Gráfico de Área - Datos 100% REALES de evolución
            const areaDatasets = evolucionData.estados ? evolucionData.estados.map(estado => ({
                label: estado.nombre,
                data: estado.datos,
                borderColor: estado.color || getColorByEstado(estado.nombre, 1),
                backgroundColor: estado.color ? estado.color.replace('1)', '0.4)') : getColorByEstado(estado.nombre, 0.4),
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: estado.color || getColorByEstado(estado.nombre, 1),
                pointBorderColor: 'rgba(255, 255, 255, 0.9)',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 10
            })) : [
                {
                    label: 'Completadas',
                    data: evolucionData.completadas || [0],
                    borderColor: 'rgba(34, 197, 94, 1)',
                    backgroundColor: 'rgba(34, 197, 94, 0.4)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(34, 197, 94, 1)',
                    pointBorderColor: 'rgba(255, 255, 255, 0.9)',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 10
                },
                {
                    label: 'En Progreso',
                    data: evolucionData.enProgreso || [0],
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.4)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                    pointBorderColor: 'rgba(255, 255, 255, 0.9)',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 10
                },
                {
                    label: 'Pendientes',
                    data: evolucionData.pendientes || [0],
                    borderColor: 'rgba(107, 114, 128, 1)',
                    backgroundColor: 'rgba(107, 114, 128, 0.4)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(107, 114, 128, 1)',
                    pointBorderColor: 'rgba(255, 255, 255, 0.9)',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 10
                }
            ];
            
            new Chart(document.getElementById('areaChart'), {
                type: 'line',
                data: {
                    labels: evolucionData.labels || ['Sin datos'],
                    datasets: areaDatasets
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                font: {
                                    size: 12,
                                    weight: '600'
                                }
                            }
                        }
                    },
                    interaction: {
                        mode: 'index',
                        intersect: false
                    },
                    scales: {
                        x: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                font: {
                                    size: 11
                                }
                            }
                        },
                        y: {
                            stacked: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)'
                            },
                            ticks: {
                                font: {
                                    size: 11
                                }
                            },
                            beginAtZero: true
                        }
                    },
                    animation: {
                        duration: 1800,
                        easing: 'easeOutQuart'
                    }
                }
            });
        }

        // Función auxiliar para obtener colores por estado
        function getColorByEstado(estadoNombre, alpha = 1) {
            const estado = estadoNombre.toLowerCase();
            if (estado.includes('pendiente') || estado.includes('to do')) {
                return \`rgba(239, 68, 68, \${alpha})\`;
            } else if (estado.includes('progreso') || estado.includes('doing')) {
                return \`rgba(245, 158, 11, \${alpha})\`;
            } else if (estado.includes('complet') || estado.includes('done')) {
                return \`rgba(34, 197, 94, \${alpha})\`;
            } else if (estado.includes('revisión') || estado.includes('review')) {
                return \`rgba(59, 130, 246, \${alpha})\`;
            } else if (estado.includes('bloqueado')) {
                return \`rgba(107, 114, 128, \${alpha})\`;
            } else {
                return \`rgba(147, 51, 234, \${alpha})\`;
            }
        }

        // Efectos interactivos mejorados
        function initInteractions() {
            // Efectos hover en tarjetas
            const cards = document.querySelectorAll('.kpi-card, .info-card, .chart-container, .data-table');
            cards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = this.classList.contains('kpi-card') 
                        ? 'translateY(-6px)' 
                        : 'translateY(-4px)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0)';
                });
            });

            // Animaciones escalonadas
            const animateElements = () => {
                const elements = document.querySelectorAll('.kpi-card, .info-card, .chart-container, .data-table');
                elements.forEach((element, index) => {
                    element.style.animationDelay = (index * 0.1) + 's';
                    element.classList.add('fade-in');
                });
            };

            // Contadores animados para KPIs
            const animateCounters = () => {
                const counters = document.querySelectorAll('.kpi-value');
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent);
                    let current = 0;
                    const increment = target / 40;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(current);
                        }
                    }, 40);
                });
            };

            animateElements();
            setTimeout(animateCounters, 500);
        }

        // Inicialización
        document.addEventListener('DOMContentLoaded', function() {
            initCharts();
            initInteractions();
            
            // Efecto de carga suave
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Efecto de carga inicial
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.6s ease';
    </script>
</body>
</html>`;
  }

  private obtenerEvolucionReal(): any {
    // Obtener datos REALES de evolución del proyecto
    if (this.tieneEvolucionDinamicaCompleta(this.metricsExtended)) {
      const evolucionDinamica = this.metricsExtended!.evolucionDinamicaCompleta!;
      
      // Convertir formato dinámico a formato para HTML
      const estadosDisponibles = this.getEstadosDisponibles();
      
      return {
        labels: evolucionDinamica.labels,
        estados: evolucionDinamica.estados.map((estadoNombre: string) => {
          const estadoInfo = estadosDisponibles.find(e => e.nombre === estadoNombre);
          const color = estadoInfo?.color || this.getColorByEstado(estadoNombre, 1);
          
          return {
            nombre: estadoNombre,
            datos: evolucionDinamica.datosPorEstado[estadoNombre] || Array(evolucionDinamica.labels.length).fill(0),
            color: color
          };
        })
      };
    } else if (this.metrics?.evolucionProyecto) {
      // Convertir formato antiguo a nuevo formato
      const evolucion = this.metrics.evolucionProyecto;
      return {
        labels: evolucion.labels,
        estados: [
          {
            nombre: 'Completadas',
            datos: evolucion.completadas,
            color: 'rgba(34, 197, 94, 1)'
          },
          {
            nombre: 'En Progreso',
            datos: evolucion.enProgreso,
            color: 'rgba(59, 130, 246, 1)'
          },
          {
            nombre: 'Pendientes',
            datos: evolucion.pendientes,
            color: 'rgba(239, 68, 68, 1)'
          }
        ]
      };
    }

    // Si no hay datos de evolución
    return {
      labels: ['Sin datos históricos'],
      completadas: [0],
      enProgreso: [0],
      pendientes: [0]
    };
  }

  private generarTablaEstadosPremiumDinamica(): string {
    const estados = this.getEstadosDisponibles();
    
    if (estados.length === 0) {
      return '<div class="table-row" style="text-align: center; padding: 40px; color: var(--gray-500); font-style: italic; grid-template-columns: 1fr;">No hay datos disponibles para mostrar</div>';
    }

    const total = this.metrics?.stats?.totalTareas || 1;
    
    return estados.map((estado: EstadoDashboard) => {
      const porcentaje = ((estado.cantidad / total) * 100).toFixed(1);
      const anchoBarra = Math.max(5, (estado.cantidad / total) * 100);
      
      const color = estado.color || this.getColorByEstado(estado.nombre, 1);
      
      // Determinar ícono según el estado
      let icon = 'circle';
      const estadoNombre = estado.nombre.toLowerCase();
      if (estadoNombre.includes('complet') || estadoNombre.includes('finalizado') || estadoNombre.includes('hecho')) {
        icon = 'check_circle';
      } else if (estadoNombre.includes('progreso') || estadoNombre.includes('haciendo')) {
        icon = 'autorenew';
      } else if (estadoNombre.includes('pendiente') || estadoNombre.includes('espera')) {
        icon = 'schedule';
      } else if (estadoNombre.includes('revisión') || estadoNombre.includes('review')) {
        icon = 'visibility';
      } else if (estadoNombre.includes('bloqueado') || estadoNombre.includes('blocked')) {
        icon = 'block';
      }
      
      return `
        <div class="table-row">
            <div style="display: flex; align-items: center; gap: 12px;">
                <span class="material-icons" style="font-size: 1.5rem; color: ${color};">${icon}</span>
                <span style="font-weight: 600; color: var(--gray-900);">${this.escapeHtml(estado.nombre)}</span>
            </div>
            <div style="font-weight: 700; color: var(--gray-900); text-align: center;">${estado.cantidad}</div>
            <div class="progress-bar-container">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${anchoBarra}%; background: ${color};"></div>
                </div>
                <span style="font-weight: 700; color: var(--gray-900); min-width: 50px;">${porcentaje}%</span>
            </div>
        </div>
      `;
    }).join('');
  }

  private generarTablaEficienciaPremium(): string {
    if (!this.tieneUsuariosEficiencia(this.metrics) || !(this.metrics as any).usuariosEficiencia || (this.metrics as any).usuariosEficiencia.length === 0) {
      return '<div class="table-row" style="text-align: center; padding: 40px; color: var(--gray-500); font-style: italic; grid-template-columns: 1fr;">No hay datos de eficiencia disponibles</div>';
    }

    const usuariosEficiencia = (this.metrics as any).usuariosEficiencia as UsuarioEficienciaLocal[];
    
    return usuariosEficiencia.slice(0, 6).map((usuario: UsuarioEficienciaLocal) => {
      // Calcular eficiencia: tareas completadas / total tareas * 100
      const eficiencia = usuario.totalTareas > 0 
        ? Math.round((usuario.tareasCompletadas / usuario.totalTareas) * 100)
        : 0;
      
      let color = 'var(--gradient-danger)';
      let icon = 'person';
      let status = 'Baja';
      
      if (eficiencia >= 80) {
        color = 'var(--gradient-success)';
        icon = 'star';
        status = 'Alta';
      } else if (eficiencia >= 60) {
        color = 'var(--gradient-warning)';
        icon = 'trending_up';
        status = 'Media';
      }
      
      return `
        <div class="table-row">
            <div style="display: flex; align-items: center; gap: 12px;">
                <span class="material-icons" style="font-size: 1.5rem; background: ${color}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${icon}</span>
                <div>
                    <div style="font-weight: 600; color: var(--gray-900);">${this.escapeHtml(usuario.nombreCompleto)}</div>
                    <div style="font-size: 0.8rem; color: var(--gray-600);">${status} Eficiencia</div>
                </div>
            </div>
            <div style="font-weight: 700; color: var(--gray-700); text-align: center;">
                ${usuario.tareasCompletadas}<span style="color: var(--gray-400);">/</span>${usuario.totalTareas}
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${eficiencia}%; background: ${color};"></div>
                </div>
                <span style="font-weight: 800; color: var(--gray-900); min-width: 50px; background: ${color}; -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${eficiencia}%</span>
            </div>
        </div>
      `;
    }).join('');
  }

  private descargarArchivoHTML(contenido: string, nombreArchivo: string): void {
    const blob = new Blob([contenido], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = nombreArchivo;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private formatearFechaHTML(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private mostrarNotificacionExportacion(tipo: 'success' | 'error', mensaje: string): void {
    console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
    
    const isBrowserEnvironment = typeof window !== 'undefined' && 
                                typeof document !== 'undefined' && 
                                window && document;
    
    if (!isBrowserEnvironment) return;
    
    try {
      const notification = document.createElement('div');
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 16px 24px;
        border-radius: 12px;
        backdrop-filter: blur(20px);
        transform: translateX(0);
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 0.9rem;
        ${tipo === 'success' 
          ? 'background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: rgb(16, 185, 129);' 
          : 'background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: rgb(239, 68, 68);'
        }
        box-shadow: 0 8px 20px -5px rgba(0, 0, 0, 0.1);
      `;
      
      notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 24px; height: 24px; border-radius: 50%; background: currentColor; opacity: 0.2; display: flex; align-items: center; justify-content: center;">
            <span style="color: currentColor; font-size: 14px; font-weight: bold;">
              ${tipo === 'success' ? '✓' : '!'}
            </span>
          </div>
          <span>${mensaje}</span>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, 4000);
    } catch (error) {
      console.error('Error mostrando notificación:', error);
    }
  }

  // ========== MÉTODO ACTUALIZADO: actualizarGraficos() - CON TODAS LAS TAREAS ==========
  actualizarGraficos(): void {
    if (!this.metrics) return;

    // 1. GRÁFICO DE BARRAS DINÁMICO - Usa todos los estados REALES disponibles
    const estadosDisponibles = this.getEstadosDisponibles();
    
    if (estadosDisponibles.length > 0) {
      // Actualizar etiquetas y datos dinámicamente con colores reales
      this.barChartData.labels = estadosDisponibles.map(e => e.nombre);
      
      const backgroundColors = estadosDisponibles.map(estado => {
        if (estado.color) {
          return this.hexToRgba(estado.color, 0.9);
        }
        return this.getColorByEstado(estado.nombre, 0.9);
      });

      const borderColors = estadosDisponibles.map(estado => {
        if (estado.color) {
          return estado.color;
        }
        return this.getColorByEstado(estado.nombre, 1);
      });

      const hoverColors = estadosDisponibles.map(estado => {
        if (estado.color) {
          return this.hexToRgba(estado.color, 1);
        }
        return this.getColorByEstado(estado.nombre, 1);
      });

      // Actualizar dataset completo con datos reales
      this.barChartData.datasets[0] = {
        data: estadosDisponibles.map(e => e.cantidad),
        label: 'Cantidad de Tareas',
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 3,
        borderRadius: 16,
        borderSkipped: false,
        barPercentage: 0.6,
        categoryPercentage: 0.8,
        hoverBackgroundColor: hoverColors,
        hoverBorderColor: estadosDisponibles.map(() => 'rgba(255, 255, 255, 0.8)'),
        hoverBorderWidth: 4
      };

      // Actualizar título para indicar que es dinámico
      if (this.barChartOptions && this.barChartOptions.plugins && this.barChartOptions.plugins.title) {
        this.barChartOptions.plugins.title.text = `Distribución de Tareas (${estadosDisponibles.length} Estados)`;
      }
    } else {
      // Fallback a los 3 estados básicos si no hay datos dinámicos
      this.barChartData.datasets[0].data = [
        this.metrics.stats.tareasPendientes,
        this.metrics.stats.tareasEnProgreso,
        this.metrics.stats.tareasCompletadas
      ];
      
      // Restaurar título original
      if (this.barChartOptions && this.barChartOptions.plugins && this.barChartOptions.plugins.title) {
        this.barChartOptions.plugins.title.text = 'Distribución de Tareas por Estado';
      }
    }

    // 2. GRÁFICO CIRCULAR - Distribución por Prioridad (datos reales)
    if (this.metrics.tareasPorPrioridad && this.metrics.tareasPorPrioridad.length > 0) {
      const prioridadesMap = new Map<string, number>();
      
      this.metrics.tareasPorPrioridad.forEach((item: { prioridad: string; cantidad: number }) => {
        if (item.prioridad && item.cantidad !== undefined) {
          prioridadesMap.set(item.prioridad.toLowerCase(), item.cantidad);
        }
      });

      const datosPrioridad = [
        prioridadesMap.get('alta') || 0,
        prioridadesMap.get('media') || 0,
        prioridadesMap.get('baja') || 0
      ];

      this.pieChartData.datasets[0].data = datosPrioridad;
    } else {
      this.pieChartData.datasets[0].data = [0, 0, 0];
    }

    // 3. GRÁFICO DE ÁREA APILADO - Evolución del Proyecto por Estado (DATOS 100% REALES)
    if (this.tieneEvolucionDinamicaCompleta(this.metricsExtended)) {
      // Usar datos REALES detallados de evolución con TODAS las columnas
      const evolucionDetallada = this.metricsExtended!.evolucionDinamicaCompleta!;
      
      // Crear dataset para CADA estado del proyecto
      const datasetsDinamicos = evolucionDetallada.estados.map((estadoNombre: string, index: number) => {
        // Obtener el estado correspondiente para obtener su color
        const estadoInfo = estadosDisponibles.find(e => e.nombre === estadoNombre);
        const datosEstado = evolucionDetallada.datosPorEstado[estadoNombre] || Array(evolucionDetallada.labels.length).fill(0);
        
        // Usar color real del estado o generar uno basado en el nombre
        let color;
        if (estadoInfo?.color) {
          color = estadoInfo.color;
        } else {
          // Si no tiene color, usar color basado en el nombre del estado
          color = this.getColorByEstado(estadoNombre, 1);
        }
        
        const colorFondo = this.hexToRgba(color, 0.4);
        
        return {
          label: ` ${estadoNombre}`,
          data: datosEstado,
          borderColor: color,
          backgroundColor: colorFondo,
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: color,
          pointBorderColor: 'rgba(255, 255, 255, 0.9)',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
          pointHoverBorderColor: color,
          pointHoverBorderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 10
        };
      });

      this.areaChartData = {
        labels: evolucionDetallada.labels,
        datasets: datasetsDinamicos
      };
      
      // Actualizar título para indicar que muestra TODAS las columnas
      if (this.areaChartOptions && this.areaChartOptions.plugins && this.areaChartOptions.plugins.title) {
        this.areaChartOptions.plugins.title.text = `Evolución del Proyecto (${evolucionDetallada.estados.length} Estados)`;
      }
    } else if (this.metrics?.evolucionProyecto) {
      // Usar formato antiguo de evolución (compatibilidad)
      const evolucion = this.metrics.evolucionProyecto;
      
      this.areaChartData = {
        labels: evolucion.labels,
        datasets: [
          {
            label: 'Completadas',
            data: evolucion.completadas,
            borderColor: 'rgba(34, 197, 94, 1)',
            backgroundColor: 'rgba(34, 197, 94, 0.4)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: 'rgba(34, 197, 94, 1)',
            pointBorderColor: 'rgba(255, 255, 255, 0.9)',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 10
          },
          {
            label: 'En Progreso',
            data: evolucion.enProgreso,
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.4)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: 'rgba(59, 130, 246, 1)',
            pointBorderColor: 'rgba(255, 255, 255, 0.9)',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 10
          },
          {
            label: 'Pendientes',
            data: evolucion.pendientes,
            borderColor: 'rgba(107, 114, 128, 1)',
            backgroundColor: 'rgba(107, 114, 128, 0.4)',
            fill: true,
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: 'rgba(107, 114, 128, 1)',
            pointBorderColor: 'rgba(255, 255, 255, 0.9)',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 10
          }
        ]
      };
    } else {
      // Si no hay datos de evolución, mostrar mensaje en lugar de datos falsos
      this.areaChartData = {
        labels: ['Sin datos históricos'],
        datasets: [{
          label: 'Datos no disponibles',
          data: [0],
          borderColor: 'rgba(156, 163, 175, 1)',
          backgroundColor: 'rgba(156, 163, 175, 0.4)',
          fill: true,
          tension: 0.4,
          borderWidth: 3
        }]
      };
      
      if (this.areaChartOptions && this.areaChartOptions.plugins && this.areaChartOptions.plugins.title) {
        this.areaChartOptions.plugins.title.text = 'Evolución del Proyecto (Datos no disponibles)';
      }
    }

    // 4. GRÁFICO DE ANILLO - Eficiencia por Usuario (CON TODAS LAS TAREAS - DESGLOSE COMPLETO)
// 4. GRÁFICO DE ANILLO - Eficiencia por Usuario (CON TODAS LAS TAREAS - DESGLOSE COMPLETO)
if (this.tieneUsuariosEficiencia(this.metrics) && (this.metrics as any).usuariosEficiencia!.length > 0) {
  const usuariosEficiencia = (this.metrics as any).usuariosEficiencia! as UsuarioEficienciaLocal[];
  
  // Calcular el total de tareas del proyecto
  const totalTareasProyecto = this.metrics?.stats?.totalTareas || 0;
  
  // MODIFICACIÓN: Formatear etiquetas con el formato "Usuario (X/Y)"
  this.doughnutChartData.labels = usuariosEficiencia.map((usuario: UsuarioEficienciaLocal) => {
    // Usamos el total de tareas del usuario (que ya incluye todas sus tareas)
    const tareasUsuario = usuario.totalTareas || 0;
    
    // Formato: "Nombre (tareasUsuario/totalTareasProyecto)"
    return `${usuario.nombreCompleto} (${tareasUsuario}/${totalTareasProyecto})`;
  });
  
  // Los datos del gráfico serán las tareas de cada usuario
  this.doughnutChartData.datasets[0].data = usuariosEficiencia.map((usuario: UsuarioEficienciaLocal) => 
    usuario.totalTareas || 0
  );
  
  // También necesitamos actualizar el tooltip para mostrar más detalles
  if (this.doughnutChartOptions?.plugins?.tooltip?.callbacks) {
    this.doughnutChartOptions.plugins.tooltip.callbacks.label = (context) => {
      const index = context.dataIndex;
      const usuario = usuariosEficiencia[index];
      
      if (!usuario) return '';
      
      let tooltipText = [];
      tooltipText.push(`${usuario.nombreCompleto}`);
      tooltipText.push(`Total tareas asignadas: ${usuario.totalTareas} de ${totalTareasProyecto}`);
      
      // Calcular porcentaje de participación en el proyecto
    
      
      // Calcular eficiencia real (completadas/total del usuario)

      
      // Detalles por estado
    
      
      if (usuario.tareasEnRevision) tooltipText.push(`👁 En Revisión: ${usuario.tareasEnRevision}`);
      if (usuario.tareasBloqueadas) tooltipText.push(`⛔ Bloqueadas: ${usuario.tareasBloqueadas}`);
      if (usuario.tareasCanceladas) tooltipText.push(`✕ Canceladas: ${usuario.tareasCanceladas}`);
      
      return tooltipText;
    };
  }
  
  // Actualizar título
  if (this.doughnutChartOptions && this.doughnutChartOptions.plugins && this.doughnutChartOptions.plugins.title) {
    this.doughnutChartOptions.plugins.title.text = `Distribución de Tareas por Usuario (Total: ${totalTareasProyecto} tareas)`;
  }
} else {
  // Si no hay datos de eficiencia, mostrar mensaje
  this.doughnutChartData.labels = ['Sin datos de usuarios'];
  this.doughnutChartData.datasets[0].data = [100];
  
  if (this.doughnutChartOptions && this.doughnutChartOptions.plugins && this.doughnutChartOptions.plugins.title) {
    this.doughnutChartOptions.plugins.title.text = 'Distribución por Usuario (Sin datos)';
  }
}
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 50);
  }

  // ========== MÉTODOS AUXILIARES PARA MANEJO DINÁMICO ==========

  private hexToRgba(hex: string, alpha: number): string {
    // Asegurarse de que el hex tenga el formato correcto
    let hexColor = hex;
    if (!hexColor.startsWith('#')) {
      hexColor = '#' + hexColor;
    }
    
    // Si es un color hex de 3 caracteres, expandirlo a 6
    if (hexColor.length === 4) {
      hexColor = '#' + hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2] + hexColor[3] + hexColor[3];
    }
    
    try {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } catch (error) {
      console.warn(`Color hexadecimal inválido: ${hex}. Usando color por defecto.`);
      return `rgba(100, 100, 100, ${alpha})`;
    }
  }

  private getColorByEstado(estadoNombre: string, alpha: number = 0.9): string {
    const estado = estadoNombre.toLowerCase();
    
    // Mapeo de estados comunes a colores específicos
    if (estado.includes('pendiente') || estado.includes('to do') || estado.includes('por hacer')) {
      return `rgba(239, 68, 68, ${alpha})`; // Rojo
    } else if (estado.includes('progreso') || estado.includes('doing') || estado.includes('en proceso')) {
      return `rgba(245, 158, 11, ${alpha})`; // Amarillo/Naranja
    } else if (estado.includes('complet') || estado.includes('done') || estado.includes('finalizado') || estado.includes('hecho')) {
      return `rgba(34, 197, 94, ${alpha})`; // Verde
    } else if (estado.includes('revisión') || estado.includes('review') || estado.includes('revisando')) {
      return `rgba(59, 130, 246, ${alpha})`; // Azul
    } else if (estado.includes('bloqueado') || estado.includes('blocked')) {
      return `rgba(107, 114, 128, ${alpha})`; // Gris
    } else if (estado.includes('espera') || estado.includes('waiting') || estado.includes('en espera')) {
      return `rgba(249, 115, 22, ${alpha})`; // Naranja
    } else if (estado.includes('aprobado') || estado.includes('approved')) {
      return `rgba(16, 185, 129, ${alpha})`; // Verde esmeralda
    } else if (estado.includes('cancelado') || estado.includes('cancelled')) {
      return `rgba(156, 163, 175, ${alpha})`; // Gris claro
    } else {
      // Color por defecto basado en hash del nombre para consistencia
      return this.getColorByIndex(this.hashString(estadoNombre), alpha);
    }
  }

  private getColorByIndex(index: number, alpha: number): string {
    const colors = [
      `rgba(239, 68, 68, ${alpha})`,      // Rojo
      `rgba(245, 158, 11, ${alpha})`,     // Amarillo
      `rgba(34, 197, 94, ${alpha})`,      // Verde
      `rgba(59, 130, 246, ${alpha})`,     // Azul
      `rgba(147, 51, 234, ${alpha})`,     // Violeta
      `rgba(14, 165, 233, ${alpha})`,     // Cyan
      `rgba(251, 191, 36, ${alpha})`,     // Ámbar
      `rgba(249, 115, 22, ${alpha})`,     // Naranja
      `rgba(236, 72, 153, ${alpha})`,     // Rosa
      `rgba(139, 92, 246, ${alpha})`      // Púrpura
    ];
    return colors[index % colors.length];
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash) % 10;
  }

  // MÉTODO para obtener todos los estados disponibles
  private getEstadosDisponibles(): EstadoDashboard[] {
    if (this.tieneDistribucionCompleta(this.metrics)) {
      return (this.metrics as any).distribucionPorEstadoCompleta;
    } else if (this.metrics?.tareasPorEstado) {
      return this.metrics.tareasPorEstado.map((estado: any) => ({
        id: 0,
        nombre: estado.estado,
        cantidad: estado.cantidad,
        color: this.getColorByEstado(estado.estado, 1)
      }));
    } else {
      // Estados por defecto si no hay datos disponibles
      return [
        { 
          id: 1, 
          nombre: 'Pendientes', 
          cantidad: this.metrics?.stats.tareasPendientes || 0,
          color: 'rgba(239, 68, 68, 1)'
        },
        { 
          id: 2, 
          nombre: 'En Progreso', 
          cantidad: this.metrics?.stats.tareasEnProgreso || 0,
          color: 'rgba(245, 158, 11, 1)'
        },
        { 
          id: 3, 
          nombre: 'Completadas', 
          cantidad: this.metrics?.stats.tareasCompletadas || 0,
          color: 'rgba(34, 197, 94, 1)'
        }
      ];
    }
  }

  // ========== MÉTODOS PARA GESTIÓN DE GRÁFICOS ==========

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

  getChartsByCategory(category: string): ChartConfig[] {
    return this.availableCharts.filter(chart => chart.category === category);
  }

  // MÉTODOS PRINCIPALES DE CARGA DE DATOS
  cargarMetricas(): void {
    this.cargando = true;
    this.error = '';

    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.handleAuthError();
      return;
    }

    this.dashboardService.getProjectDashboard(this.proyectoId).subscribe({
      next: (response) => {
        if (response?.success) {
          this.metrics = response.data;
          // Asignar también a la versión extendida
          this.metricsExtended = response.data as ProjectDashboardMetricsExtended;
          this.lastUpdate = new Date();
          this.actualizarGraficos();
        } else {
          this.error = 'No se pudieron cargar los datos del proyecto. Intenta nuevamente.';
        }
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error cargando métricas:', error);
        this.handleLoadError(error);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  private handleLoadError(error: any): void {
    if (error?.message?.includes('Usuario no autenticado')) {
      this.error = 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
    } else if (error?.status === 404) {
      this.error = 'No se encontró el proyecto solicitado. Verifica que el proyecto exista.';
    } else if (error?.status === 403) {
      this.error = 'No tienes permisos para ver este proyecto. Contacta al administrador.';
    } else if (error?.status === 0) {
      this.error = 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.';
    } else {
      this.error = 'Error interno del servidor. Intenta nuevamente en unos momentos.';
    }
  }

  // ========== MÉTODOS AUXILIARES ==========

  getNombreUsuario(): string {
    const usuario = this.authService.getCurrentUser();
    return usuario ? `${usuario.nombre} ${usuario.apellido}`.trim() : 'Usuario';
  }

  getTiempoDesdeUltimaActualizacion(): string {
    const ahora = new Date();
    const diffMs = ahora.getTime() - this.lastUpdate.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'ahora mismo';
    if (diffMins === 1) return 'hace 1 minuto';
    if (diffMins < 60) return `hace ${diffMins} minutos`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return 'hace 1 hora';
    if (diffHours < 24) return `hace ${diffHours} horas`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'hace 1 día';
    return `hace ${diffDays} días`;
  }

  irAlBoard(): void {
    this.router.navigate(['/board'], { 
      queryParams: { proyectoId: this.proyectoId },
      state: { fromDashboard: true }
    });
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getColorPrioridad(prioridad: string): string {
    const colors: { [key: string]: string } = {
      'alta': 'bg-red-500',
      'media': 'bg-yellow-500',
      'baja': 'bg-green-500',
      'crítica': 'bg-purple-500'
    };
    return colors[prioridad.toLowerCase()] || 'bg-gray-500';
  }

  getColorEstado(estado: string): string {
    const colors: { [key: string]: string } = {
      'finalizado': 'bg-green-500',
      'en proceso': 'bg-blue-500',
      'sin empezar': 'bg-gray-500',
      'bloqueado': 'bg-red-500'
    };
    return colors[estado.toLowerCase()] || 'bg-gray-500';
  }

  isChartEnabled(chartId: string): boolean {
    return this.availableCharts.find(c => c.id === chartId)?.enabled ?? false;
  }

  isBarChartEnabled(): boolean {
    return this.isChartEnabled('bar');
  }

  isPieChartEnabled(): boolean {
    return this.isChartEnabled('pie');
  }

  isAreaChartEnabled(): boolean {
    return this.isChartEnabled('area');
  }

  isDoughnutChartEnabled(): boolean {
    return this.isChartEnabled('doughnut');
  }

  recargarDashboard(): void {
    this.cargarMetricas();
  }

  // MÉTODO para obtener la distribución actual de estados
  getDistribucionActual(): EstadoDashboard[] {
    return this.getEstadosDisponibles();
  }

  // MÉTODO para obtener el número total de estados
  getTotalEstados(): number {
    return this.getEstadosDisponibles().length;
  }
}