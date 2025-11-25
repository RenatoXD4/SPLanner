// src/app/core/services/tema.service.ts
import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private readonly TEMA_KEY = 'tema-preferido';
  private isBrowser: boolean;
  
  isDark = signal<boolean>(true);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      this.isDark.set(this.getTemaInicial());
    }

    effect(() => {
      if (this.isBrowser) {
        this.aplicarTema(this.isDark());
        this.guardarPreferencia(this.isDark());
      }
    });
  }

  toggleTheme(): void {
    this.isDark.update(current => !current);
  }

  setTemaOscuro(): void {
    this.isDark.set(true);
  }

  setTemaClaro(): void {
    this.isDark.set(false);
  }

  private getTemaInicial(): boolean {
    if (!this.isBrowser) return true;

    try {
      const guardado = localStorage.getItem(this.TEMA_KEY);
      if (guardado) return guardado === 'true';
      
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true;
    } catch {
      return true;
    }
  }

  private aplicarTema(isDark: boolean): void {
    if (!this.isBrowser) return;

    const html = document.documentElement;
    
    if (isDark) {
      html.removeAttribute('data-theme');
      this.removerEstilosClaro();
    } else {
      html.setAttribute('data-theme', 'light');
      this.aplicarEstilosClaro();
    }
  }

  private aplicarEstilosClaro(): void {
    const style = document.createElement('style');
    style.id = 'tema-claro-estilos';
    style.textContent = `
      [data-theme="light"] {
        /* Variables globales para modo claro - TODA LA APLICACIÓN */
        --bg-primary: #ffffff;
        --bg-secondary: #f8fafc;
        --bg-tertiary: #f1f5f9;
        --bg-card: #ffffff;
        --bg-header: #ffffff;
        --bg-sidebar: #ffffff;
        --bg-sidebar-hover: #f3f4f6;
        --bg-sidebar-active: #d1fae5;
        --bg-dropdown: #ffffff;
        --bg-modal: #ffffff;
        --bg-input: #ffffff;
        --bg-dashboard: #f8fafc;
        --bg-stats: #ffffff;
        --bg-chart: #ffffff;
        --bg-members-card: #ffffff;
        --bg-members-stats: #ffffff;
        
        --text-primary: #000000;
        --text-secondary: #374151;
        --text-muted: #6b7280;
        --text-sidebar: #000000;
        --text-sidebar-active: #065f46;
        --text-icon: #000000;
        --text-icon-active: #059669;
        --text-placeholder: #9ca3af;
        --text-stats: #000000;
        --text-chart: #000000;
        --text-header: #000000;
        --text-axis: #000000;
        --text-legend: #000000;
        --text-chartjs: #000000;
        --text-members: #000000;
        
        --border-primary: #e5e7eb;
        --border-secondary: #f3f4f6;
        --border-sidebar: #e5e7eb;
        --border-card: #e5e7eb;
        --border-input: #d1d5db;
        --border-hover: #059669;
        --border-chart: #e5e7eb;
        --border-header: #e5e7eb;
        --border-axis: #e5e7eb;
        --border-members: #e5e7eb;
        
        --accent-green: #059669;
        --accent-green-hover: #047857;
        --accent-blue: #2563eb;
        --accent-blue-hover: #1d4ed8;
        --accent-yellow: #d97706;
        --accent-red: #dc2626;
        --accent-red-hover: #b91c1c;
        --accent-purple: #7c3aed;
        --accent-purple-hover: #6d28d9;
        --accent-orange: #ea580c;
        --accent-orange-hover: #c2410c;
        
        --shadow-color: rgba(0, 0, 0, 0.1);
        --shadow-hover: rgba(0, 0, 0, 0.15);
        --shadow-card: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        --shadow-modal: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        --shadow-stats: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --shadow-header: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        
        /* Gradientes para modo claro */
        --gradient-bg: linear-gradient(to bottom right, #f8fafc, #ffffff, #f1f5f9);
        --gradient-card: linear-gradient(to bottom, #ffffff, #f8fafc);
        --gradient-header: linear-gradient(to bottom, #ffffff, #ffffff);
        --gradient-sidebar: linear-gradient(to bottom, #ffffff, #f8fafc, #f1f5f9);
        --gradient-button-green: linear-gradient(to right, #059669, #10b981);
        --gradient-button-blue: linear-gradient(to right, #2563eb, #3b82f6);
        --gradient-button-purple: linear-gradient(to right, #7c3aed, #8b5cf6);
        --gradient-modal: linear-gradient(to bottom right, #ffffff, #f8fafc);
        --gradient-stats-green: linear-gradient(to right, #d1fae5, #a7f3d0);
        --gradient-stats-blue: linear-gradient(to right, #dbeafe, #bfdbfe);
        --gradient-stats-purple: linear-gradient(to right, #ede9fe, #ddd6fe);
        --gradient-stats-orange: linear-gradient(to right, #ffedd5, #fed7aa);
        --gradient-members-card: linear-gradient(to bottom right, #ffffff, #f8fafc);
      }

      /* Aplicación global del modo claro - TEXTOS NEGROS */
      [data-theme="light"] {
        background-color: var(--bg-primary);
        color: var(--text-primary) !important;
      }

      /* Forzar textos negros en toda la aplicación */
      [data-theme="light"] * {
        color: var(--text-primary) !important;
      }

      /* Background principal del dashboard */
      [data-theme="light"] .min-h-screen.bg-gradient-to-br.from-slate-900.via-slate-800.to-slate-900 {
        background: var(--gradient-bg) !important;
      }

      [data-theme="light"] .bg-gray-900 {
        background-color: var(--bg-dashboard) !important;
      }

      /* ===== HEADER COMPLETAMENTE BLANCO ===== */
      [data-theme="light"] header {
        background-color: var(--bg-header) !important;
        border-bottom: 1px solid var(--border-header) !important;
        backdrop-filter: blur(8px);
        box-shadow: var(--shadow-header);
      }

      /* Asegurar que cualquier header sea blanco */
      [data-theme="light"] header,
      [data-theme="light"] header.bg-gray-800\\/50,
      [data-theme="light"] header.bg-gray-800,
      [data-theme="light"] header.bg-gray-900,
      [data-theme="light"] header.bg-gray-700,
      [data-theme="light"] header.bg-slate-800,
      [data-theme="light"] header.bg-slate-900 {
        background-color: var(--bg-header) !important;
        background: var(--bg-header) !important;
        border-bottom-color: var(--border-header) !important;
      }

      /* Textos del header - NEGROS */
      [data-theme="light"] header,
      [data-theme="light"] header *,
      [data-theme="light"] header .text-white,
      [data-theme="light"] header .text-gray-400,
      [data-theme="light"] header .text-gray-300,
      [data-theme="light"] header .text-gray-200,
      [data-theme="light"] header .text-slate-200,
      [data-theme="light"] header .text-slate-300 {
        color: var(--text-header) !important;
      }

      /* Barra de búsqueda en header */
      [data-theme="light"] header input {
        background-color: var(--bg-input) !important;
        border-color: var(--border-input) !important;
        color: var(--text-primary) !important;
      }

      [data-theme="light"] header input::placeholder {
        color: var(--text-placeholder) !important;
      }

      [data-theme="light"] header input:focus {
        border-color: var(--accent-green) !important;
        box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.2) !important;
      }

      /* Botón nuevo proyecto en header */
      [data-theme="light"] header .bg-gradient-to-r.from-green-500.to-green-600 {
        background: var(--gradient-button-green) !important;
      }

      [data-theme="light"] header .bg-gradient-to-r.from-green-500.to-green-600:hover {
        background: linear-gradient(to right, var(--accent-green-hover), #059669) !important;
      }

      /* ===== PÁGINA DE MIEMBROS - RECUADROS BLANCOS ===== */
      
      /* Estadísticas de miembros - FONDOS BLANCOS */
      [data-theme="light"] .bg-slate-800\\/50 {
        background-color: var(--bg-members-stats) !important;
        border-color: var(--border-members) !important;
        color: var(--text-members) !important;
        box-shadow: var(--shadow-stats);
      }

      [data-theme="light"] .bg-slate-800\\/50 .text-white {
        color: var(--text-members) !important;
      }

      [data-theme="light"] .bg-slate-800\\/50 .text-slate-400 {
        color: var(--text-secondary) !important;
      }

      /* Cards de proyectos en miembros - FONDOS BLANCOS */
      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-800\\/80 {
        background: var(--gradient-members-card) !important;
        border-color: var(--border-members) !important;
        color: var(--text-members) !important;
        box-shadow: var(--shadow-card);
      }

      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-800\\/80:hover {
        border-color: var(--accent-purple) !important;
        box-shadow: 0 8px 25px var(--shadow-hover) !important;
      }

      /* Textos en cards de miembros - NEGROS */
      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-800\\/80 .text-white {
        color: var(--text-members) !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-800\\/80 .text-slate-400 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-800\\/80 .text-slate-300 {
        color: var(--text-muted) !important;
      }

      /* Iconos en cards de miembros */
      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-800\\/80 .text-purple-400 {
        color: var(--accent-purple) !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-800\\/80 .text-red-400 {
        color: var(--accent-red) !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-800\\/80 .text-blue-400 {
        color: var(--accent-blue) !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-800\\/80 .text-green-400 {
        color: var(--accent-green) !important;
      }

      /* Fondos de iconos en miembros */
      [data-theme="light"] .bg-purple-500\\/20 {
        background-color: rgba(124, 58, 237, 0.1) !important;
      }

      [data-theme="light"] .bg-red-500\\/20 {
        background-color: rgba(220, 38, 38, 0.1) !important;
      }

      [data-theme="light"] .bg-blue-500\\/20 {
        background-color: rgba(37, 99, 235, 0.1) !important;
      }

      /* Badges de rol en miembros */
      [data-theme="light"] .bg-red-500\\/20.text-red-400 {
        background-color: rgba(220, 38, 38, 0.1) !important;
        color: var(--accent-red) !important;
        border-color: rgba(220, 38, 38, 0.3) !important;
      }

      [data-theme="light"] .bg-green-500\\/20.text-green-400 {
        background-color: rgba(5, 150, 105, 0.1) !important;
        color: var(--accent-green) !important;
        border-color: rgba(5, 150, 105, 0.3) !important;
      }

      [data-theme="light"] .bg-blue-500\\/20.text-blue-400 {
        background-color: rgba(37, 99, 235, 0.1) !important;
        color: var(--accent-blue) !important;
        border-color: rgba(37, 99, 235, 0.3) !important;
      }

      /* Botones en cards de miembros */
      [data-theme="light"] .bg-gradient-to-r.from-purple-500.to-purple-600 {
        background: var(--gradient-button-purple) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-purple-500.to-purple-600:hover {
        background: linear-gradient(to right, var(--accent-purple-hover), #7c3aed) !important;
      }

      /* Estados vacíos en miembros */
      [data-theme="light"] .bg-slate-800.rounded-2xl {
        background-color: var(--bg-members-card) !important;
        border-color: var(--border-members) !important;
      }

      [data-theme="light"] .bg-slate-800\\/50.rounded-xl {
        background-color: var(--bg-members-stats) !important;
        border-color: var(--border-members) !important;
      }

      /* ===== GRÁFICOS CHART.JS - TEXTOS NEGROS ===== */
      [data-theme="light"] .chartjs-render-monitor,
      [data-theme="light"] canvas {
        background-color: var(--bg-chart) !important;
      }

      /* Textos en gráficos Chart.js */
      [data-theme="light"] .chartjs-render-monitor text,
      [data-theme="light"] canvas text {
        fill: var(--text-chartjs) !important;
        color: var(--text-chartjs) !important;
      }

      /* Leyendas y títulos de Chart.js */
      [data-theme="light"] .chartjs-legend text,
      [data-theme="light"] .chartjs-title text {
        fill: var(--text-chartjs) !important;
        color: var(--text-chartjs) !important;
      }

      /* Ejes de Chart.js */
      [data-theme="light"] .chartjs-axis text {
        fill: var(--text-axis) !important;
        color: var(--text-axis) !important;
      }

      /* Tooltips de Chart.js */
      [data-theme="light"] .chartjs-tooltip {
        background-color: var(--bg-card) !important;
        border: 1px solid var(--border-card) !important;
        color: var(--text-chartjs) !important;
      }

      [data-theme="light"] .chartjs-tooltip .tooltip-header,
      [data-theme="light"] .chartjs-tooltip .tooltip-body {
        color: var(--text-chartjs) !important;
      }

      /* ===== CARDS DE ESTADÍSTICAS EN DASHBOARD ===== */
      [data-theme="light"] .bg-gray-800 {
        background-color: var(--bg-stats) !important;
        border-color: var(--border-card) !important;
        color: var(--text-stats) !important;
        box-shadow: var(--shadow-stats);
      }

      [data-theme="light"] .bg-gray-800:hover {
        border-color: var(--border-hover) !important;
        box-shadow: 0 8px 25px var(--shadow-hover) !important;
      }

      /* Textos en cards de estadísticas - NEGROS */
      [data-theme="light"] .bg-gray-800 .text-white {
        color: var(--text-stats) !important;
      }

      [data-theme="light"] .bg-gray-800 .text-gray-400 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] .bg-gray-800 .text-gray-300 {
        color: var(--text-muted) !important;
      }

      [data-theme="light"] .bg-gray-800 .text-gray-200 {
        color: var(--text-primary) !important;
      }

      /* Iconos en cards de estadísticas */
      [data-theme="light"] .bg-gray-800 .text-green-400 {
        color: var(--accent-green) !important;
      }

      [data-theme="light"] .bg-gray-800 .text-blue-400 {
        color: var(--accent-blue) !important;
      }

      [data-theme="light"] .bg-gray-800 .text-purple-400 {
        color: var(--accent-purple) !important;
      }

      [data-theme="light"] .bg-gray-800 .text-orange-400 {
        color: var(--accent-orange) !important;
      }

      /* Fondos de iconos en estadísticas */
      [data-theme="light"] .bg-green-500\\/10 {
        background-color: rgba(5, 150, 105, 0.1) !important;
      }

      [data-theme="light"] .bg-blue-500\\/10 {
        background-color: rgba(37, 99, 235, 0.1) !important;
      }

      [data-theme="light"] .bg-purple-500\\/10 {
        background-color: rgba(124, 58, 237, 0.1) !important;
      }

      [data-theme="light"] .bg-orange-500\\/10 {
        background-color: rgba(234, 88, 12, 0.1) !important;
      }

      /* ===== GRÁFICAS Y CHARTS EN DASHBOARD ===== */
      [data-theme="light"] .bg-gray-800.rounded-xl {
        background-color: var(--bg-chart) !important;
        border-color: var(--border-chart) !important;
        color: var(--text-chart) !important;
      }

      [data-theme="light"] .bg-gray-800\\/50 {
        background-color: var(--bg-card) !important;
        border-color: var(--border-card) !important;
      }

      /* Títulos de secciones del dashboard - NEGROS */
      [data-theme="light"] .text-gray-200 {
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .text-gray-500 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] .text-gray-400 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] .text-gray-300 {
        color: var(--text-muted) !important;
      }

      /* ===== TABLAS EN DASHBOARD ===== */
      [data-theme="light"] .bg-gray-800\\/20 {
        background-color: var(--bg-secondary) !important;
      }

      [data-theme="light"] .divide-gray-700 > :not([hidden]) ~ :not([hidden]) {
        border-color: var(--border-primary) !important;
      }

      [data-theme="light"] .border-gray-700 {
        border-color: var(--border-primary) !important;
      }

      /* Filas de tabla */
      [data-theme="light"] .hover\\:bg-gray-700\\/50:hover {
        background-color: var(--bg-sidebar-hover) !important;
      }

      /* ===== BOTONES Y BADGES EN DASHBOARD ===== */
      [data-theme="light"] .bg-green-500 {
        background-color: var(--accent-green) !important;
      }

      [data-theme="light"] .bg-green-500:hover {
        background-color: var(--accent-green-hover) !important;
      }

      [data-theme="light"] .bg-blue-500 {
        background-color: var(--accent-blue) !important;
      }

      [data-theme="light"] .bg-blue-500:hover {
        background-color: var(--accent-blue-hover) !important;
      }

      [data-theme="light"] .bg-purple-500 {
        background-color: var(--accent-purple) !important;
      }

      [data-theme="light"] .bg-purple-500:hover {
        background-color: var(--accent-purple-hover) !important;
      }

      /* Badges de estado */
      [data-theme="light"] .bg-green-500\\/20 {
        background-color: rgba(5, 150, 105, 0.1) !important;
        color: var(--accent-green) !important;
      }

      [data-theme="light"] .bg-yellow-500\\/20 {
        background-color: rgba(217, 119, 6, 0.1) !important;
        color: var(--accent-yellow) !important;
      }

      [data-theme="light"] .bg-red-500\\/20 {
        background-color: rgba(220, 38, 38, 0.1) !important;
        color: var(--accent-red) !important;
      }

      /* ===== DROPDOWN MENU EN MODO CLARO ===== */
      [data-theme="light"] .bg-gray-700 {
        background-color: var(--bg-dropdown) !important;
        border-color: var(--border-primary) !important;
        box-shadow: var(--shadow-modal);
      }

      [data-theme="light"] .bg-gray-700 .text-blue-400 {
        color: var(--accent-blue) !important;
      }

      [data-theme="light"] .bg-gray-700 .text-green-400 {
        color: var(--accent-green) !important;
      }

      [data-theme="light"] .bg-gray-700 .text-red-400 {
        color: var(--accent-red) !important;
      }

      [data-theme="light"] .bg-gray-700 .hover\\:bg-gray-600:hover {
        background-color: var(--bg-sidebar-hover) !important;
      }

      /* Botón de acciones */
      [data-theme="light"] .text-gray-400.hover\\:text-green-400:hover {
        color: var(--accent-green) !important;
      }

      [data-theme="light"] .hover\\:bg-gray-700:hover {
        background-color: var(--bg-sidebar-hover) !important;
      }

      /* ===== MODALES EN MODO CLARO ===== */
      [data-theme="light"] .bg-gradient-to-br.from-gray-800.to-gray-900 {
        background: var(--gradient-modal) !important;
        border-color: var(--border-primary) !important;
        color: var(--text-primary) !important;
      }

      /* Header de modales */
      [data-theme="light"] .bg-gradient-to-r.from-gray-800.to-gray-700 {
        background: var(--gradient-header) !important;
        border-bottom-color: var(--border-primary) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-blue-800.to-blue-700 {
        background: linear-gradient(to right, #dbeafe, #eff6ff) !important;
        border-bottom-color: var(--border-primary) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-blue-800.to-blue-700 .text-white {
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-blue-800.to-blue-700 .text-blue-200 {
        color: var(--text-secondary) !important;
      }

      /* Inputs en modales */
      [data-theme="light"] .bg-gray-700\\/50 {
        background-color: var(--bg-input) !important;
        border-color: var(--border-input) !important;
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .bg-gray-700\\/50:focus {
        border-color: var(--accent-green) !important;
        box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.2) !important;
      }

      [data-theme="light"] .bg-gray-700\\/50::placeholder {
        color: var(--text-placeholder) !important;
      }

      /* Botones en modales */
      [data-theme="light"] .bg-gray-600\\/50 {
        background-color: var(--bg-secondary) !important;
        border-color: var(--border-input) !important;
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .bg-gray-600\\/50:hover {
        background-color: var(--bg-sidebar-hover) !important;
        border-color: var(--border-primary) !important;
      }

      /* Botones de gradiente en modales */
      [data-theme="light"] .bg-gradient-to-r.from-green-500.to-green-600 {
        background: var(--gradient-button-green) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-green-500.to-green-600:hover {
        background: linear-gradient(to right, var(--accent-green-hover), #059669) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-blue-500.to-blue-600 {
        background: var(--gradient-button-blue) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-blue-500.to-blue-600:hover {
        background: linear-gradient(to right, var(--accent-blue-hover), #2563eb) !important;
      }

      /* Modal de confirmación (rojo) */
      [data-theme="light"] .bg-gradient-to-r.from-red-900\\/50.to-red-800\\/30 {
        background: linear-gradient(to right, #fef2f2, #fecaca) !important;
        border-bottom-color: var(--border-primary) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-red-900\\/50.to-red-800\\/30 .text-white {
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-red-900\\/50.to-red-800\\/30 .text-red-400 {
        color: var(--accent-red) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-red-500.to-red-600 {
        background: linear-gradient(to right, var(--accent-red), #ef4444) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-red-500.to-red-600:hover {
        background: linear-gradient(to right, var(--accent-red-hover), #dc2626) !important;
      }

      /* ===== ESTADO VACÍO EN MODO CLARO ===== */
      [data-theme="light"] .bg-gray-800.rounded-2xl {
        background-color: var(--bg-card) !important;
      }

      [data-theme="light"] .text-gray-500 {
        color: var(--text-muted) !important;
      }

      /* ===== SIDEBAR EN MODO CLARO ===== */
      
      /* Sidebar principal */
      [data-theme="light"] aside.bg-gradient-to-b.from-gray-900.via-gray-800.to-gray-950 {
        background: var(--gradient-sidebar) !important;
        color: #000000 !important;
        border-right-color: var(--border-sidebar) !important;
      }

      /* Sidebar móvil */
      [data-theme="light"] aside.fixed.inset-y-0.left-0.bg-gradient-to-b.from-gray-900.via-gray-800.to-gray-950 {
        background: var(--gradient-sidebar) !important;
        color: #000000 !important;
      }

      /* Textos del sidebar - NEGROS TOTALES */
      [data-theme="light"] aside,
      [data-theme="light"] aside *,
      [data-theme="light"] aside span,
      [data-theme="light"] aside p,
      [data-theme="light"] aside div,
      [data-theme="light"] aside a {
        color: #000000 !important;
      }

      [data-theme="light"] .text-white:has(aside) {
        color: #000000 !important;
      }

      [data-theme="light"] .text-gray-300:has(aside) {
        color: #000000 !important;
      }

      [data-theme="light"] .text-gray-400:has(aside) {
        color: #000000 !important;
      }

      /* ÍCONOS DEL SIDEBAR - NEGROS TOTALES */
      [data-theme="light"] aside svg,
      [data-theme="light"] svg:has(aside) {
        color: #000000 !important;
      }

      [data-theme="light"] .text-green-500:has(aside) {
        color: #000000 !important;
      }

      [data-theme="light"] .text-green-400:has(aside) {
        color: #000000 !important;
      }

      /* Íconos activos - NEGROS */
      [data-theme="light"] svg[class*="text-green"]:has(aside) {
        color: #000000 !important;
      }

      /* Botones del sidebar */
      [data-theme="light"] .bg-gray-700:has(aside) {
        background-color: var(--bg-sidebar-hover) !important;
        color: #000000 !important;
        border: 1px solid var(--border-sidebar) !important;
      }

      [data-theme="light"] .hover\\:bg-gray-700:hover:has(aside) {
        background-color: var(--bg-sidebar-hover) !important;
        color: #000000 !important;
      }

      [data-theme="light"] .bg-gray-900:has(aside) {
        background-color: var(--bg-sidebar) !important;
        color: #000000 !important;
      }

      /* Elemento activo del sidebar */
      [data-theme="light"] .bg-gray-700.text-white:has(aside) {
        background-color: var(--bg-sidebar-active) !important;
        color: #000000 !important;
        border: 1px solid var(--border-sidebar) !important;
      }

      /* Botón toggle sidebar */
      [data-theme="light"] .bg-gray-700.hover\\:bg-gray-600:has(aside) {
        background-color: var(--bg-sidebar-hover) !important;
        color: #000000 !important;
      }

      [data-theme="light"] .bg-gray-700.hover\\:bg-gray-600:hover:has(aside) {
        background-color: var(--border-sidebar) !important;
        color: #000000 !important;
      }

      /* Bordes del sidebar */
      [data-theme="light"] .border-gray-700:has(aside) {
        border-color: var(--border-sidebar) !important;
      }

      /* Botón de logout */
      [data-theme="light"] .hover\\:bg-red-600:hover:has(aside) {
        background-color: var(--accent-red) !important;
        color: white !important;
      }

      /* Botón hamburguesa móvil */
      [data-theme="light"] .bg-gray-900:has(button) {
        background-color: var(--bg-sidebar) !important;
        color: #000000 !important;
        border: 1px solid var(--border-sidebar) !important;
      }

      /* Fondo overlay móvil */
      [data-theme="light"] .bg-black.bg-opacity-50 {
        background-color: rgba(0, 0, 0, 0.3) !important;
      }

      /* ===== SCROLLBAR PARA MODO CLARO ===== */
      [data-theme="light"] ::-webkit-scrollbar {
        width: 6px;
      }

      [data-theme="light"] ::-webkit-scrollbar-track {
        background: var(--bg-secondary);
      }

      [data-theme="light"] ::-webkit-scrollbar-thumb {
        background: var(--border-primary);
        border-radius: 3px;
      }

      [data-theme="light"] ::-webkit-scrollbar-thumb:hover {
        background: var(--text-secondary);
      }

      /* ===== ANIMACIONES Y EFECTOS ===== */
      [data-theme="light"] .backdrop-blur-sm {
        backdrop-filter: blur(8px);
      }

      [data-theme="light"] .shadow-2xl {
        box-shadow: var(--shadow-modal) !important;
      }

      [data-theme="light"] .shadow-lg {
        box-shadow: 0 10px 15px -3px var(--shadow-color) !important;
      }

      /* Estados de éxito y error */
      [data-theme="light"] .bg-green-500\\/20 {
        background-color: rgba(5, 150, 105, 0.1) !important;
        border-color: rgba(5, 150, 105, 0.3) !important;
      }

      [data-theme="light"] .bg-red-500\\/20 {
        background-color: rgba(220, 38, 38, 0.1) !important;
        border-color: rgba(220, 38, 38, 0.3) !important;
      }

      [data-theme="light"] .bg-blue-500\\/20 {
        background-color: rgba(37, 99, 235, 0.1) !important;
        border-color: rgba(37, 99, 235, 0.3) !important;
      }
    `;
    
    this.removerEstilosClaro();
    document.head.appendChild(style);
  }

  private removerEstilosClaro(): void {
    const existingStyle = document.getElementById('tema-claro-estilos');
    if (existingStyle) {
      existingStyle.remove();
    }
  }

  private guardarPreferencia(isDark: boolean): void {
    if (!this.isBrowser) return;

    try {
      localStorage.setItem(this.TEMA_KEY, isDark.toString());
    } catch {
      console.warn('No se pudo guardar la preferencia del tema');
    }
  }
}