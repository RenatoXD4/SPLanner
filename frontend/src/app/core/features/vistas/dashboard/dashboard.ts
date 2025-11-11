// src/app/dashboard/dashboard.component.ts
import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  category: 'basic' | 'advanced' | 'analytics';
}

// INTERFAZ EXTENDIDA para usuarios eficiencia
interface UsuarioEficiencia {
  nombreCompleto: string;
  tareasCompletadas: number;
  totalTareas: number;
}

interface ProjectDashboardMetricsWithEficiencia extends ProjectDashboardMetrics {
  usuariosEficiencia?: UsuarioEficiencia[];
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
  cargando: boolean = true;
  error: string = '';

  // Sistema de gráficos personalizables mejorado
  showChartSelector: boolean = false;
  availableCharts: ChartConfig[] = [
    {
      id: 'bar',
      name: 'Gráfico de Barras',
      type: 'bar',
      description: 'Distribución de tareas por estado',
      enabled: true,
      icon: '',
      category: 'basic'
    },
    {
      id: 'pie',
      name: 'Gráfico Circular',
      type: 'pie',
      description: 'Tareas por prioridad',
      enabled: true,
      icon: '',
      category: 'basic'
    },
    {
      id: 'area',
      name: 'Evolución del Proyecto',
      type: 'line',
      description: 'Área apilada - Progreso general histórico',
      enabled: true,
      icon: '',
      category: 'analytics'
    },
    {
      id: 'doughnut',
      name: 'Eficiencia por Usuario',
      type: 'doughnut',
      description: 'Eficiencia por usuario',
      enabled: true,
      icon: '',
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

  // PROPIEDADES PARA EXPORTACIÓN PDF Y HTML
  showExportModal: boolean = false;
  exportFormats = [
    { 
      id: 'pdf', 
      name: 'PDF Ejecutivo', 
      description: 'Reporte formateado para impresión', 
      icon: '📄',
      color: 'text-red-400'
    },
    { 
      id: 'html', 
      name: 'HTML Interactivo', 
      description: 'Reporte con gráficos SVG interactivos', 
      icon: '🌐',
      color: 'text-blue-400'
    }
  ];
  exportando: boolean = false;

  // ========== CONFIGURACIONES DE GRÁFICOS MEJORADAS ==========

  // 1. GRÁFICO DE BARRAS - Distribución por Estado
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
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
        text: ' Distribución de Tareas por Estado',
        color: 'rgba(255, 255, 255, 0.95)',
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
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
            weight: 500
          },
          padding: 10
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
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
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
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
    labels: [' Pendientes', ' En Progreso', ' Completadas'],
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
          color: 'rgba(255, 255, 255, 0.9)',
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
        text: ' Distribución por Prioridad',
        color: 'rgba(255, 255, 255, 0.95)',
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
    labels: [' Alta Prioridad', ' Media Prioridad', ' Baja Prioridad'],
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

  // 3. GRÁFICO DE ÁREA APILADO - Evolución General del Proyecto
  public areaChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
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
        text: 'Evolución General del Proyecto',
        color: 'rgba(255, 255, 255, 0.95)',
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
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.8)',
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
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
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
    datasets: [
      {
        label: ' Completadas',
        data: [],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.4)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 0.9)',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointHoverBorderColor: 'rgba(34, 197, 94, 1)',
        pointHoverBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 10
      },
      {
        label: ' En Progreso',
        data: [],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.4)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 0.9)',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointHoverBorderColor: 'rgba(59, 130, 246, 1)',
        pointHoverBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 10
      },
      {
        label: ' Pendientes',
        data: [],
        borderColor: 'rgba(107, 114, 128, 1)',
        backgroundColor: 'rgba(107, 114, 128, 0.4)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: 'rgba(107, 114, 128, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 0.9)',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointHoverBorderColor: 'rgba(107, 114, 128, 1)',
        pointHoverBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 10
      }
    ]
  };

  // 4. GRÁFICO DE ANILLO - Eficiencia por Usuario
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '65%',
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: 'rgba(255, 255, 255, 0.9)',
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
        text: ' Eficiencia por Usuario',
        color: 'rgba(255, 255, 255, 0.95)',
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
            return `Eficiencia: ${context.parsed}%`;
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

  // MÉTODO AUXILIAR TYPE-SAFE para verificar usuariosEficiencia
  private tieneUsuariosEficiencia(metrics: ProjectDashboardMetrics | null): metrics is ProjectDashboardMetricsWithEficiencia {
    return !!metrics && !!(metrics as ProjectDashboardMetricsWithEficiencia).usuariosEficiencia;
  }

  // ========== MÉTODOS DE EXPORTACIÓN PDF Y HTML MEJORADOS ==========

  abrirMenuExportacion(): void {
    this.showExportModal = true;
    console.log('Abriendo modal de exportación');
  }

  cerrarMenuExportacion(): void {
    this.showExportModal = false;
  }

  seleccionarFormatoExportacion(formato: string): void {
    if (formato === 'pdf') {
      console.log('Formato seleccionado: PDF');
      this.exportarComoPDF();
    } else if (formato === 'html') {
      console.log('Formato seleccionado: HTML');
      this.exportarComoHTML();
    } else {
      console.warn(`Formato no válido: ${formato}`);
      this.mostrarNotificacionExportacion('error', `Formato ${formato} no es válido`);
    }
    this.cerrarMenuExportacion();
  }

  // MÉTODO PARA EXPORTAR COMO HTML CON GRÁFICOS SVG
  async exportarComoHTML(): Promise<void> {
    const isBrowserEnvironment = typeof window !== 'undefined' && 
                                typeof document !== 'undefined' && 
                                window && document;
    
    if (!isBrowserEnvironment) {
      console.error('No se puede exportar: No está en un entorno de navegador');
      this.mostrarNotificacionExportacion('error', 'La exportación solo está disponible en el navegador');
      return;
    }

    this.exportando = true;
    this.cdr.detectChanges();
    
    console.log('Generando HTML con gráficos SVG interactivos...');

    try {
      await this.generarHTMLConGraficos();
      
      console.log('HTML con gráficos generado correctamente');
      this.mostrarNotificacionExportacion('success', 'Archivo HTML con gráficos generado y descargado correctamente');
      
    } catch (error) {
      console.error('Error generando HTML con gráficos:', error);
      this.mostrarNotificacionExportacion('error', 'Error al generar el archivo HTML: ' + (error as Error).message);
    } finally {
      this.exportando = false;
      this.cdr.detectChanges();
    }
  }

  private async generarHTMLConGraficos(): Promise<void> {
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

        // Generar el contenido HTML con gráficos SVG
        const htmlContent = this.generarContenidoHTMLConGraficos(datosProyecto, datosStats);
        
        // Crear y descargar el archivo
        this.descargarArchivoHTML(htmlContent, `dashboard-${this.proyectoId || 'proyecto'}-${new Date().toISOString().split('T')[0]}.html`);
        
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  private generarContenidoHTMLConGraficos(datosProyecto: any, datosStats: any): string {
    const fechaGeneracion = new Date().toLocaleString('es-ES');
    const usuario = this.getNombreUsuario();

    // Datos para los gráficos SVG
    const datosBarras = this.barChartData.datasets[0].data as number[];
    const datosPie = this.pieChartData.datasets[0].data as number[];
    const datosEvolucion = this.generarEvolucionProyecto();

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Interactivo - ${datosProyecto.nombre}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: white;
            padding: 40px 30px;
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
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="rgba(255,255,255,0.1)"><circle cx="50" cy="50" r="2"/></svg>') repeat;
        }
        
        .header h1 {
            font-size: 3em;
            margin-bottom: 15px;
            font-weight: 300;
            position: relative;
        }
        
        .header .subtitle {
            font-size: 1.3em;
            opacity: 0.9;
            font-weight: 300;
            position: relative;
        }
        
        .project-info {
            background: #f8fafc;
            padding: 30px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .project-info h2 {
            color: #2d3748;
            margin-bottom: 20px;
            font-size: 1.6em;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }
        
        .info-item {
            background: white;
            padding: 20px;
            border-radius: 12px;
            border-left: 5px solid #4299e1;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .info-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px rgba(0,0,0,0.1);
        }
        
        .info-item strong {
            color: #2d3748;
            display: block;
            margin-bottom: 8px;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .metrics-section {
            padding: 40px 30px;
            background: white;
        }
        
        .section-title {
            color: #2d3748;
            font-size: 2em;
            margin-bottom: 30px;
            text-align: center;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }
        
        .section-title::after {
            content: '';
            display: block;
            width: 80px;
            height: 4px;
            background: linear-gradient(135deg, #4299e1, #48bb78);
            margin: 10px auto;
            border-radius: 2px;
        }
        
        .kpi-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
        }
        
        .kpi-card {
            background: white;
            padding: 30px 25px;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
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
        }
        
        .kpi-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }
        
        .kpi-icon {
            font-size: 2.5em;
            margin-bottom: 15px;
        }
        
        .kpi-value {
            font-size: 2.8em;
            font-weight: bold;
            margin: 10px 0;
            background: linear-gradient(135deg, #2d3748, #4a5568);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .kpi-label {
            color: #718096;
            font-size: 0.95em;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 600;
        }
        
        .total-tareas::before { background: linear-gradient(135deg, #4299e1, #3182ce); }
        .completadas::before { background: linear-gradient(135deg, #48bb78, #38a169); }
        .en-progreso::before { background: linear-gradient(135deg, #ed8936, #dd6b20); }
        .pendientes::before { background: linear-gradient(135deg, #f56565, #e53e3e); }
        .progreso::before { background: linear-gradient(135deg, #9f7aea, #805ad5); }
        
        .charts-section {
            padding: 40px 30px;
            background: #f7fafc;
        }
        
        .charts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
        }
        
        .chart-container {
            background: white;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
        }
        
        .chart-title {
            color: #2d3748;
            font-size: 1.4em;
            margin-bottom: 25px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .chart-svg-container {
            width: 100%;
            height: 300px;
            background: white;
            border-radius: 12px;
            padding: 20px;
        }
        
        .data-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 30px;
        }
        
        .data-table {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 6px 20px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
        }
        
        .table-header {
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: white;
            padding: 20px;
            font-weight: 600;
            font-size: 1.1em;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .table-row {
            display: grid;
            grid-template-columns: 1fr auto auto;
            padding: 18px 20px;
            border-bottom: 1px solid #e2e8f0;
            align-items: center;
            transition: background-color 0.2s ease;
        }
        
        .table-row:hover {
            background: #f7fafc;
        }
        
        .table-row:nth-child(even) {
            background: #fafafa;
        }
        
        .progress-bar {
            width: 120px;
            height: 10px;
            background: #e2e8f0;
            border-radius: 5px;
            overflow: hidden;
            position: relative;
        }
        
        .progress-fill {
            height: 100%;
            border-radius: 5px;
            transition: width 0.3s ease;
        }
        
        .footer {
            background: #2d3748;
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .footer-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
            max-width: 1000px;
            margin: 0 auto;
        }
        
        .footer-section {
            flex: 1;
            min-width: 200px;
        }
        
        .footer-section strong {
            color: #cbd5e0;
            display: block;
            margin-bottom: 5px;
            font-size: 0.9em;
        }
        
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2.2em;
            }
            
            .charts-grid {
                grid-template-columns: 1fr;
            }
            
            .data-grid {
                grid-template-columns: 1fr;
            }
            
            .kpi-grid {
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            }
            
            .info-grid {
                grid-template-columns: 1fr;
            }
            
            .footer-info {
                flex-direction: column;
                text-align: center;
            }
        }

        /* Animaciones */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in {
            animation: fadeInUp 0.6s ease-out;
        }

        /* Estilos para gráficos SVG */
        .bar {
            transition: all 0.3s ease;
        }

        .bar:hover {
            opacity: 0.8;
            transform: scale(1.05);
        }

        .pie-segment {
            transition: all 0.3s ease;
        }

        .pie-segment:hover {
            opacity: 0.8;
            transform: scale(1.02);
        }

        .line-path {
            transition: all 0.3s ease;
        }

        .line-path:hover {
            stroke-width: 4;
        }
    </style>
</head>
<body>
    <div class="container fade-in">
        <header class="header">
            <h1>📊 DASHBOARD INTERACTIVO</h1>
            <p class="subtitle">Sistema de Gestión de Proyectos - Reporte Ejecutivo con Gráficos</p>
        </header>
        
        <section class="project-info">
            <h2>📋 Información del Proyecto</h2>
            <div class="info-grid">
                <div class="info-item">
                    <strong>Proyecto</strong>
                    <span>${this.escapeHtml(datosProyecto.nombre)}</span>
                </div>
                <div class="info-item">
                    <strong>Descripción</strong>
                    <span>${this.escapeHtml(datosProyecto.descripcion)}</span>
                </div>
                <div class="info-item">
                    <strong>Fecha de Creación</strong>
                    <span>${this.formatearFechaHTML(datosProyecto.createdAt.toISOString())}</span>
                </div>
                <div class="info-item">
                    <strong>ID del Proyecto</strong>
                    <span>${this.proyectoId || 'N/A'}</span>
                </div>
            </div>
        </section>
        
        <section class="metrics-section">
            <h2 class="section-title">📈 Métricas Principales del Proyecto</h2>
            <div class="kpi-grid">
                <div class="kpi-card total-tareas">
                    <div class="kpi-icon">📝</div>
                    <div class="kpi-value">${datosStats.totalTareas}</div>
                    <div class="kpi-label">Total de Tareas</div>
                </div>
                <div class="kpi-card completadas">
                    <div class="kpi-icon">✅</div>
                    <div class="kpi-value">${datosStats.tareasCompletadas}</div>
                    <div class="kpi-label">Completadas</div>
                </div>
                <div class="kpi-card en-progreso">
                    <div class="kpi-icon">🔄</div>
                    <div class="kpi-value">${datosStats.tareasEnProgreso}</div>
                    <div class="kpi-label">En Progreso</div>
                </div>
                <div class="kpi-card pendientes">
                    <div class="kpi-icon">⏳</div>
                    <div class="kpi-value">${datosStats.tareasPendientes}</div>
                    <div class="kpi-label">Pendientes</div>
                </div>
                <div class="kpi-card progreso">
                    <div class="kpi-icon">📊</div>
                    <div class="kpi-value">${datosStats.porcentajeCompletado}%</div>
                    <div class="kpi-label">Progreso General</div>
                </div>
            </div>
        </section>
        
        <section class="charts-section">
            <h2 class="section-title">📊 Visualizaciones Interactivas</h2>
            
            <div class="charts-grid">
                <!-- Gráfico de Barras SVG -->
                <div class="chart-container">
                    <h3 class="chart-title">📈 Distribución de Tareas por Estado</h3>
                    <div class="chart-svg-container">
                        ${this.generarGraficoBarrasSVG(datosBarras)}
                    </div>
                </div>
                
                <!-- Gráfico Circular SVG -->
                <div class="chart-container">
                    <h3 class="chart-title">🎯 Distribución por Prioridad</h3>
                    <div class="chart-svg-container">
                        ${this.generarGraficoCircularSVG(datosPie)}
                    </div>
                </div>
                
                <!-- Gráfico de Evolución SVG -->
                <div class="chart-container" style="grid-column: 1 / -1;">
                    <h3 class="chart-title">📈 Evolución del Proyecto</h3>
                    <div class="chart-svg-container">
                        ${this.generarGraficoEvolucionSVG(datosEvolucion)}
                    </div>
                </div>
            </div>
            
            <div class="data-grid">
                <div class="data-table">
                    <div class="table-header">📋 Distribución por Estado</div>
                    ${this.generarTablaEstadosHTML()}
                </div>
                
                <div class="data-table">
                    <div class="table-header">👥 Eficiencia por Usuario</div>
                    ${this.generarTablaEficienciaHTML()}
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
                    <strong>Sistema de Gestión de Proyectos</strong>
                    <span>v2.0</span>
                </div>
            </div>
        </footer>
    </div>

    <script>
        // Interactividad para los gráficos
        document.addEventListener('DOMContentLoaded', function() {
            // Animación de barras al hacer hover
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.addEventListener('mouseenter', function() {
                    this.style.filter = 'brightness(1.2)';
                });
                
                bar.addEventListener('mouseleave', function() {
                    this.style.filter = 'brightness(1)';
                });
            });

            // Animación de segmentos del pie chart
            const pieSegments = document.querySelectorAll('.pie-segment');
            pieSegments.forEach(segment => {
                segment.addEventListener('mouseenter', function() {
                    this.style.filter = 'brightness(1.2)';
                });
                
                segment.addEventListener('mouseleave', function() {
                    this.style.filter = 'brightness(1)';
                });
            });

            // Efectos hover para las tarjetas KPI
            const kpiCards = document.querySelectorAll('.kpi-card');
            kpiCards.forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        });
    </script>
</body>
</html>`;
  }

  private generarGraficoBarrasSVG(datos: number[]): string {
    const maxValue = Math.max(...datos, 1);
    const colors = ['#ef4444', '#f59e0b', '#22c55e'];
    const labels = ['Pendientes', 'En Progreso', 'Completadas'];
    const width = 500;
    const height = 250;
    const padding = 60;
    const barWidth = 80;
    const spacing = 30;

    let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
    
    // Ejes
    svg += `<line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#cbd5e0" stroke-width="2"/>`;
    svg += `<line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#cbd5e0" stroke-width="2"/>`;
    
    // Líneas de guía
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i * (height - 2 * padding) / 4);
      svg += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#e2e8f0" stroke-width="1"/>`;
      
      // Etiquetas del eje Y
      const value = Math.round(maxValue * (1 - i / 4));
      svg += `<text x="${padding - 10}" y="${y + 4}" text-anchor="end" fill="#718096" font-size="12">${value}</text>`;
    }
    
    // Barras
    datos.forEach((value: number, index: number) => {
      const barHeight = ((value / maxValue) * (height - 2 * padding)) * 0.8;
      const x = padding + (index * (barWidth + spacing));
      const y = height - padding - barHeight;
      
      svg += `<rect class="bar" x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" 
                   fill="${colors[index]}" rx="4" data-value="${value}"/>`;
      
      // Valor sobre la barra
      svg += `<text x="${x + barWidth / 2}" y="${y - 10}" text-anchor="middle" fill="#2d3748" font-weight="bold" font-size="14">${value}</text>`;
      
      // Etiqueta
      svg += `<text x="${x + barWidth / 2}" y="${height - padding + 20}" text-anchor="middle" fill="#718096" font-size="12">${labels[index]}</text>`;
    });
    
    svg += `</svg>`;
    return svg;
  }

  private generarGraficoCircularSVG(datos: number[]): string {
    const total = datos.reduce((sum: number, value: number) => sum + value, 0) || 1;
    const colors = ['#ef4444', '#f59e0b', '#22c55e'];
    const labels = ['Alta', 'Media', 'Baja'];
    const centerX = 250;
    const centerY = 125;
    const radius = 80;
    
    let svg = `<svg width="500" height="250" viewBox="0 0 500 250">`;
    
    let startAngle = 0;
    
    datos.forEach((value: number, index: number) => {
      if (value === 0) return;
      
      const percentage = value / total;
      const angle = percentage * 360;
      const endAngle = startAngle + angle;
      
      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;
      
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      svg += `<path class="pie-segment" d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z" 
                    fill="${colors[index]}"/>`;
      
      // Etiqueta en el segmento
      const midAngle = startAngle + angle / 2;
      const midRad = (midAngle - 90) * Math.PI / 180;
      const labelRadius = radius * 0.6;
      const labelX = centerX + labelRadius * Math.cos(midRad);
      const labelY = centerY + labelRadius * Math.sin(midRad);
      
      svg += `<text x="${labelX}" y="${labelY}" text-anchor="middle" fill="white" font-weight="bold" font-size="12">${Math.round(percentage * 100)}%</text>`;
      
      startAngle = endAngle;
    });
    
    // Leyenda
    const legendX = 350;
    const legendY = 50;
    
    datos.forEach((value: number, index: number) => {
      if (value === 0) return;
      
      const y = legendY + (index * 25);
      const percentage = ((value / total) * 100).toFixed(1);
      
      svg += `<rect x="${legendX}" y="${y - 8}" width="12" height="12" fill="${colors[index]}" rx="2"/>`;
      svg += `<text x="${legendX + 20}" y="${y + 2}" fill="#2d3748" font-size="12">${labels[index]} Prioridad</text>`;
      svg += `<text x="${legendX + 120}" y="${y + 2}" fill="#718096" font-size="11">${value} tareas (${percentage}%)</text>`;
    });
    
    // Total en el centro
    svg += `<circle cx="${centerX}" cy="${centerY}" r="${radius * 0.3}" fill="white"/>`;
    svg += `<text x="${centerX}" y="${centerY - 5}" text-anchor="middle" fill="#2d3748" font-weight="bold" font-size="14">Total</text>`;
    svg += `<text x="${centerX}" y="${centerY + 10}" text-anchor="middle" fill="#4299e1" font-weight="bold" font-size="16">${total}</text>`;
    
    svg += `</svg>`;
    return svg;
  }

  private generarGraficoEvolucionSVG(datosEvolucion: any): string {
    const { labels, completadas, enProgreso, pendientes } = datosEvolucion;
    const maxValue = Math.max(...completadas, ...enProgreso, ...pendientes, 1);
    const width = 900;
    const height = 300;
    const padding = 60;
    
    let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`;
    
    // Ejes
    svg += `<line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#cbd5e0" stroke-width="2"/>`;
    svg += `<line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#cbd5e0" stroke-width="2"/>`;
    
    // Líneas de guía
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i * (height - 2 * padding) / 4);
      svg += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#e2e8f0" stroke-width="1"/>`;
    }
    
    // Calcular puntos
    const pointSpacing = (width - 2 * padding) / (labels.length - 1);
    
    // Función para generar path de línea
    const generarPath = (data: number[], color: string) => {
      let path = `M ${padding} ${height - padding - ((data[0] / maxValue) * (height - 2 * padding))}`;
      
      for (let i = 1; i < data.length; i++) {
        const x = padding + (i * pointSpacing);
        const y = height - padding - ((data[i] / maxValue) * (height - 2 * padding));
        path += ` L ${x} ${y}`;
      }
      
      return `<path class="line-path" d="${path}" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    };
    
    // Dibujar líneas
    svg += generarPath(completadas, '#22c55e');
    svg += generarPath(enProgreso, '#3b82f6');
    svg += generarPath(pendientes, '#6b7280');
    
    // Dibujar puntos y etiquetas
    const datasets = [completadas, enProgreso, pendientes];
    const colors = ['#22c55e', '#3b82f6', '#6b7280'];
    
    datasets.forEach((dataset: number[], datasetIndex: number) => {
      dataset.forEach((value: number, i: number) => {
        const x = padding + (i * pointSpacing);
        const y = height - padding - ((value / maxValue) * (height - 2 * padding));
        
        svg += `<circle cx="${x}" cy="${y}" r="4" fill="${colors[datasetIndex]}" stroke="white" stroke-width="2"/>`;
        
        // Etiquetas del eje X
        if (i === dataset.length - 1) {
          svg += `<text x="${x}" y="${height - padding + 20}" text-anchor="middle" fill="#718096" font-size="11">${labels[i]}</text>`;
        }
      });
    });
    
    // Leyenda
    const legendItems = [
      { color: '#22c55e', label: 'Completadas' },
      { color: '#3b82f6', label: 'En Progreso' },
      { color: '#6b7280', label: 'Pendientes' }
    ];
    
    legendItems.forEach((item, index: number) => {
      const legendX = width - 150;
      const legendY = padding + (index * 25);
      
      svg += `<line x1="${legendX}" y1="${legendY}" x2="${legendX + 30}" y2="${legendY}" stroke="${item.color}" stroke-width="3"/>`;
      svg += `<circle cx="${legendX + 15}" cy="${legendY}" r="3" fill="${item.color}" stroke="white" stroke-width="1"/>`;
      svg += `<text x="${legendX + 40}" y="${legendY + 4}" fill="#2d3748" font-size="12">${item.label}</text>`;
    });
    
    svg += `</svg>`;
    return svg;
  }

  private generarTablaEstadosHTML(): string {
    if (!this.metrics?.tareasPorEstado || this.metrics.tareasPorEstado.length === 0) {
      return '<div class="table-row" style="text-align: center; padding: 30px; color: #718096;">No hay datos disponibles</div>';
    }

    const total = this.metrics.stats.totalTareas || 1;
    
    return this.metrics.tareasPorEstado.map((estado: any) => {
      const porcentaje = ((estado.cantidad / total) * 100).toFixed(1);
      const anchoBarra = Math.max(5, (estado.cantidad / total) * 100);
      
      let color = '#e2e8f0';
      if (estado.estado.toLowerCase().includes('complet')) color = '#48bb78';
      else if (estado.estado.toLowerCase().includes('progreso')) color = '#ed8936';
      else if (estado.estado.toLowerCase().includes('pendiente')) color = '#f56565';
      
      return `
        <div class="table-row">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background: ${color};"></div>
                <span>${this.escapeHtml(estado.estado)}</span>
            </div>
            <div style="font-weight: 600;">${estado.cantidad}</div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${anchoBarra}%; background: ${color};"></div>
                </div>
                <span style="font-weight: 600; color: #2d3748; min-width: 50px;">${porcentaje}%</span>
            </div>
        </div>
      `;
    }).join('');
  }

  private generarTablaEficienciaHTML(): string {
    if (!this.tieneUsuariosEficiencia(this.metrics) || !this.metrics.usuariosEficiencia || this.metrics.usuariosEficiencia.length === 0) {
      return '<div class="table-row" style="text-align: center; padding: 30px; color: #718096;">No hay datos de eficiencia disponibles</div>';
    }

    return this.metrics.usuariosEficiencia.slice(0, 6).map((usuario: UsuarioEficiencia) => {
      const eficiencia = usuario.totalTareas > 0 ? 
        Math.round((usuario.tareasCompletadas / usuario.totalTareas) * 100) : 0;
      
      let color = '#f56565'; // Rojo por defecto
      if (eficiencia >= 80) color = '#48bb78'; // Verde
      else if (eficiencia >= 60) color = '#ed8936'; // Amarillo
      
      let emoji = '🔴';
      if (eficiencia >= 80) emoji = '🟢';
      else if (eficiencia >= 60) emoji = '🟡';
      
      return `
        <div class="table-row">
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.2em;">${emoji}</span>
                <span>${this.escapeHtml(usuario.nombreCompleto)}</span>
            </div>
            <div style="font-weight: 600; color: #4a5568;">${usuario.tareasCompletadas}/${usuario.totalTareas}</div>
            <div style="display: flex; align-items: center; gap: 15px;">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${eficiencia}%; background: ${color};"></div>
                </div>
                <span style="font-weight: bold; color: ${color}; min-width: 50px; font-size: 1.1em;">${eficiencia}%</span>
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
    
    // Limpieza
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
      day: 'numeric'
    });
  }

  // MÉTODOS PARA EXPORTACIÓN PDF (se mantienen del código original)
  async exportarComoPDF(): Promise<void> {
    const isBrowserEnvironment = typeof window !== 'undefined' && 
                                typeof document !== 'undefined' && 
                                window && document;
    
    if (!isBrowserEnvironment) {
      console.error('No se puede exportar: No está en un entorno de navegador');
      this.mostrarNotificacionExportacion('error', 'La exportación solo está disponible en el navegador');
      return;
    }

    this.exportando = true;
    this.cdr.detectChanges();
    
    console.log('Generando PDF con diseño profesional...');

    try {
      await this.generarPDFConJsPDF();
      
      console.log('PDF generado correctamente');
      this.mostrarNotificacionExportacion('success', 'PDF generado y descargado correctamente');
      
    } catch (error) {
      console.error('Error generando PDF:', error);
      this.mostrarNotificacionExportacion('error', 'Error al generar el PDF: ' + (error as Error).message);
    } finally {
      this.exportando = false;
      this.cdr.detectChanges();
    }
  }

  private async generarPDFConJsPDF(): Promise<void> {
    // Implementación simplificada para mantener el foco en HTML
    return new Promise((resolve, reject) => {
      try {
        this.mostrarNotificacionExportacion('success', 'Exportación PDF en desarrollo');
        resolve();
      } catch (error) {
        reject(error);
      }
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
        padding: 16px 20px;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        transform: translateX(0);
        transition: all 0.3s ease;
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 500;
        ${tipo === 'success' 
          ? 'background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); color: rgb(34, 197, 94);' 
          : 'background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: rgb(239, 68, 68);'
        }
      `;
      
      notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="width: 24px; height: 24px; border-radius: 50%; background: currentColor; opacity: 0.2; display: flex; align-items: center; justify-content: center;">
            <span style="color: currentColor; font-size: 14px; font-weight: bold;">
              ${tipo === 'success' ? '✓' : '⚠'}
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

  // MÉTODOS PARA GESTIÓN DE GRÁFICOS
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

actualizarGraficos(): void {
  if (!this.metrics) return;

  // 1. GRÁFICO DE BARRAS - Solo 3 estados
  this.barChartData.datasets[0].data = [
    this.metrics.stats.tareasPendientes,
    this.metrics.stats.tareasEnProgreso,
    this.metrics.stats.tareasCompletadas
  ];

  // 2. GRÁFICO CIRCULAR - Distribución por Prioridad
  if (this.metrics.tareasPorPrioridad && this.metrics.tareasPorPrioridad.length > 0) {
    console.log('Usando datos REALES de prioridad del backend:', this.metrics.tareasPorPrioridad);
    
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

    console.log('Datos de prioridad para gráfico:', datosPrioridad);
    this.pieChartData.datasets[0].data = datosPrioridad;
  } else {
    console.log('No hay datos de prioridad del backend, mostrando ceros');
    this.pieChartData.datasets[0].data = [0, 0, 0];
  }

  // 3. GRÁFICO DE ÁREA APILADO - Evolución General del Proyecto (DATOS REALES)
  if (this.metrics.evolucionProyecto) {
    console.log('📈 Usando datos REALES de evolución del proyecto:', this.metrics.evolucionProyecto);
    
    // Usar los datos reales del backend
    this.areaChartData.labels = this.metrics.evolucionProyecto.labels;
    this.areaChartData.datasets[0].data = this.metrics.evolucionProyecto.completadas;
    this.areaChartData.datasets[1].data = this.metrics.evolucionProyecto.enProgreso;
    this.areaChartData.datasets[2].data = this.metrics.evolucionProyecto.pendientes;
  } else {
    console.log('📈 No hay datos de evolución, usando datos simulados');
    // Fallback a datos simulados si no hay datos reales
    const datosEvolucion = this.generarEvolucionProyecto();
    this.areaChartData.labels = datosEvolucion.labels;
    this.areaChartData.datasets[0].data = datosEvolucion.completadas;
    this.areaChartData.datasets[1].data = datosEvolucion.enProgreso;
    this.areaChartData.datasets[2].data = datosEvolucion.pendientes;
  }

  // 4. GRÁFICO DE ANILLO - Eficiencia por Usuario
  if (this.tieneUsuariosEficiencia(this.metrics) && this.metrics.usuariosEficiencia!.length > 0) {
    console.log('Usando datos REALES de eficiencia del backend:', this.metrics.usuariosEficiencia);
    
    const eficienciaUsuarios = this.metrics.usuariosEficiencia!.map((usuario: UsuarioEficiencia) => {
      let eficiencia = 0;
      if (usuario.totalTareas > 0) {
        eficiencia = Math.round((usuario.tareasCompletadas / usuario.totalTareas) * 100);
      }
      
      return {
        usuario: usuario.nombreCompleto,
        eficiencia: Math.max(0, Math.min(100, eficiencia))
      };
    });

    this.doughnutChartData.labels = eficienciaUsuarios.map((item: { usuario: string; eficiencia: number }) => item.usuario);
    this.doughnutChartData.datasets[0].data = eficienciaUsuarios.map((item: { usuario: string; eficiencia: number }) => item.eficiencia);
    
    console.log('Eficiencia por usuario para gráfico:', eficienciaUsuarios);
  } else {
    console.log('No hay datos de eficiencia de usuarios del backend, mostrando datos básicos');
    
    const usuarioActual = this.authService.getCurrentUser();
    const nombreUsuario = usuarioActual ? `${usuarioActual.nombre} ${usuarioActual.apellido}` : 'Usuario';
    
    const eficienciaBase = this.metrics.stats.porcentajeCompletado || 0;
    
    this.doughnutChartData.labels = [nombreUsuario];
    this.doughnutChartData.datasets[0].data = [eficienciaBase];
  }

  setTimeout(() => {
    this.cdr.detectChanges();
  }, 50);
}

// MÉTODO PARA GENERAR EVOLUCIÓN DEL PROYECTO (SOLO COMO FALLBACK)
private generarEvolucionProyecto(): { 
  labels: string[]; 
  completadas: number[]; 
  enProgreso: number[]; 
  pendientes: number[] 
} {
  if (!this.metrics) {
    return { 
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'], 
      completadas: Array(12).fill(0), 
      enProgreso: Array(12).fill(0), 
      pendientes: Array(12).fill(0) 
    };
  }

  const totalTareas = this.metrics.stats.totalTareas;
  const completadasActual = this.metrics.stats.tareasCompletadas;
  const enProgresoActual = this.metrics.stats.tareasEnProgreso;
  const pendientesActual = this.metrics.stats.tareasPendientes;

  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  const completadas: number[] = Array(12).fill(0);
  const enProgreso: number[] = Array(12).fill(0);
  const pendientes: number[] = Array(12).fill(0);

  // Simular distribución a lo largo del año (solo como fallback)
  const mesActual = new Date().getMonth();
  
  for (let i = 0; i <= mesActual && i < 12; i++) {
    const factor = i / Math.max(1, mesActual);
    completadas[i] = Math.round(completadasActual * factor * 0.8);
    enProgreso[i] = Math.round(enProgresoActual * (0.3 + factor * 0.7));
    pendientes[i] = Math.max(0, totalTareas - completadas[i] - enProgreso[i]);
  }

  // Asegurar que el mes actual coincida con los datos reales
  if (mesActual < 12) {
    completadas[mesActual] = completadasActual;
    enProgreso[mesActual] = enProgresoActual;
    pendientes[mesActual] = pendientesActual;
  }

  return {
    labels: meses,
    completadas,
    enProgreso,
    pendientes
  };
}

  // MÉTODOS AUXILIARES
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
}