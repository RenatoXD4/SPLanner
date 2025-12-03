// src/app/core/services/tema.service.ts
import { Injectable, signal, effect, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private readonly TEMA_KEY = 'tema-preferido';
  private readonly USER_TEMA_KEY = 'user-tema-';
  private isBrowser: boolean;
  
  isDark = signal<boolean>(true);
  private currentUserId: string | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser) {
      this.isDark.set(this.getTemaInicial());
    }

    effect(() => {
      if (this.isBrowser) {
        this.aplicarTema(this.isDark());
        this.guardarPreferenciaUsuario(this.isDark());
      }
    });
  }

  /**
   * Establece el usuario actual para manejo de temas por usuario
   */
  setCurrentUser(userId: string | null): void {
    this.currentUserId = userId;
    
    if (this.isBrowser && userId) {
      // Cargar preferencias del usuario específico
      const userTheme = this.getUserThemeFromLocalStorage(userId);
      this.isDark.set(userTheme);
      console.log(`✅ Tema cargado para usuario ${userId}: ${userTheme ? 'Oscuro' : 'Claro'}`);
    } else if (this.isBrowser) {
      // Usuario no autenticado, cargar tema global
      const globalTheme = this.getTemaInicial();
      this.isDark.set(globalTheme);
      console.log('🔁 Cambiando a tema global:', globalTheme ? 'Oscuro' : 'Claro');
    }
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

  // Método para prevenir FOUC (Flash of Unstyled Content)
  prevenirFOUC(): void {
    if (this.isBrowser) {
      const temaGuardado = localStorage.getItem(this.TEMA_KEY);
      const esModoOscuro = temaGuardado ? temaGuardado === 'true' : 
                           window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true;
      
      // Aplicar inmediatamente para prevenir FOUC
      if (!esModoOscuro) {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
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

  /**
   * Obtiene el tema del usuario desde localStorage
   */
  private getUserThemeFromLocalStorage(userId: string): boolean {
    try {
      const userThemeKey = this.USER_TEMA_KEY + userId;
      const saved = localStorage.getItem(userThemeKey);
      if (saved) {
        console.log(`📁 Tema encontrado para usuario ${userId}: ${saved === 'true' ? 'Oscuro' : 'Claro'}`);
        return saved === 'true';
      }
      
      // Si no hay tema guardado para este usuario, usar preferencia global
      console.log(`❌ No hay tema guardado para usuario ${userId}, usando tema global`);
      return this.getTemaInicial();
    } catch {
      return this.getTemaInicial();
    }
  }

  /**
   * Guarda la preferencia del tema para el usuario actual
   */
  private guardarPreferenciaUsuario(isDark: boolean): void {
    if (!this.isBrowser) return;

    try {
      // Guardar en localStorage específico del usuario
      if (this.currentUserId) {
        const userThemeKey = this.USER_TEMA_KEY + this.currentUserId;
        localStorage.setItem(userThemeKey, isDark.toString());
        console.log(`💾 Tema guardado para usuario ${this.currentUserId}: ${isDark ? 'Oscuro' : 'Claro'}`);
      }
      
      // Siempre guardar también en localStorage global como fallback
      localStorage.setItem(this.TEMA_KEY, isDark.toString());
    } catch {
      console.warn('No se pudo guardar la preferencia del tema');
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
    style.textContent = this.generarEstilosClaro();
    
    this.removerEstilosClaro();
    document.head.appendChild(style);
  }

  private generarEstilosClaro(): string {
    return `
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
        --bg-kanban-column: #ffffff;
        --bg-kanban-task: #ffffff;
        --bg-table: #ffffff;
        --bg-table-header: #f8fafc;
        --bg-table-row: #ffffff;
        --bg-table-row-hover: #f1f5f9;
        --bg-login: #f8fafc;
        --bg-login-card: #ffffff;
        --bg-login-input: #ffffff;
        --bg-proyectos-compartidos: #ffffff;
        --bg-proyectos-stats: #ffffff;
        
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
        --text-kanban: #000000;
        --text-table: #000000;
        --text-table-header: #000000;
        --text-login: #000000;
        --text-login-label: #000000;
        --text-login-link: #374151;
        --text-proyectos-titulo: #000000;
        --text-proyectos-subtitulo: #374151;
        --text-proyectos-card: #000000;
        --text-proyectos-estadisticas: #000000;
        
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
        --border-kanban: #e5e7eb;
        --border-table: #e5e7eb;
        --border-login: #e5e7eb;
        --border-login-card: #d1fae5;
        --border-login-input: #d1d5db;
        --border-proyectos: #e5e7eb;
        --border-proyectos-card: #e5e7eb;
        --border-proyectos-header: #e5e7eb;
        
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
        --shadow-kanban: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        --shadow-login: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        --shadow-proyectos: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        
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
        --gradient-kanban-column: linear-gradient(to bottom, #ffffff, #f8fafc);
        --gradient-login-card: linear-gradient(to bottom, #ffffff, #f8fafc);
        --gradient-proyectos-card: linear-gradient(to bottom right, #ffffff, #f8fafc);
        --gradient-proyectos-stats: linear-gradient(to bottom, #ffffff, #f8fafc);
      }

      /* ===== PÁGINA DE PROYECTOS COMPARTIDOS - MODO CLARO ===== */

      /* Fondo principal de proyectos compartidos */
      [data-theme="light"] .min-h-screen.bg-gradient-to-br.from-slate-900.via-slate-800.to-slate-900 {
        background: var(--gradient-bg) !important;
        color: var(--text-proyectos-titulo) !important;
      }

      [data-theme="light"] .min-h-screen.bg-gradient-to-br.from-slate-900.via-slate-800.to-slate-900.text-white {
        color: var(--text-proyectos-titulo) !important;
      }

      /* Header de proyectos compartidos */
      [data-theme="light"] header.bg-slate-800\\/50 {
        background-color: var(--bg-header) !important;
        border-bottom-color: var(--border-proyectos-header) !important;
        backdrop-filter: blur(8px);
        box-shadow: var(--shadow-header);
      }

      [data-theme="light"] header.bg-slate-800\\/50.border-b.border-slate-700 {
        border-bottom-color: var(--border-proyectos-header) !important;
      }

      /* Títulos del header */
      [data-theme="light"] header .text-2xl.font-bold.text-white {
        color: var(--text-proyectos-titulo) !important;
        font-weight: 700 !important;
      }

      [data-theme="light"] header .text-slate-400 {
        color: var(--text-proyectos-subtitulo) !important;
      }

      /* Barra de búsqueda en proyectos compartidos */
      [data-theme="light"] header input[type="text"] {
        background-color: var(--bg-input) !important;
        border-color: var(--border-input) !important;
        color: var(--text-primary) !important;
      }

      [data-theme="light"] header input[type="text"]::placeholder {
        color: var(--text-placeholder) !important;
      }

      [data-theme="light"] header input[type="text"]:focus {
        border-color: var(--accent-purple) !important;
        box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2) !important;
      }

      [data-theme="light"] header .text-slate-500 {
        color: var(--text-placeholder) !important;
      }

      /* Select de filtro por rol */
      [data-theme="light"] header select {
        background-color: var(--bg-input) !important;
        border-color: var(--border-input) !important;
        color: var(--text-primary) !important;
      }

      [data-theme="light"] header select:focus {
        border-color: var(--accent-purple) !important;
        box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2) !important;
      }

      [data-theme="light"] header .text-slate-400 {
        color: var(--text-secondary) !important;
      }

      /* ===== ESTADÍSTICAS DE PROYECTOS COMPARTIDOS ===== */

      /* Tarjetas de estadísticas */
      [data-theme="light"] .bg-slate-800\\/50.backdrop-blur-sm {
        background-color: var(--bg-proyectos-stats) !important;
        border-color: var(--border-proyectos-card) !important;
        backdrop-filter: blur(8px);
        box-shadow: var(--shadow-proyectos);
      }

      [data-theme="light"] .bg-slate-800\\/50.rounded-xl {
        background-color: var(--bg-proyectos-stats) !important;
        border-color: var(--border-proyectos-card) !important;
      }

      [data-theme="light"] .bg-slate-800\\/50.border.border-slate-700 {
        border-color: var(--border-proyectos-card) !important;
      }

      /* Textos en estadísticas */
      [data-theme="light"] .text-slate-400.text-sm {
        color: var(--text-proyectos-subtitulo) !important;
      }

      [data-theme="light"] .text-2xl.font-bold.text-white {
        color: var(--text-proyectos-estadisticas) !important;
      }

      /* Iconos en estadísticas */
      [data-theme="light"] .bg-purple-500\\/20 {
        background-color: rgba(124, 58, 237, 0.1) !important;
      }

      [data-theme="light"] .bg-red-500\\/20 {
        background-color: rgba(220, 38, 38, 0.1) !important;
      }

      [data-theme="light"] .bg-blue-500\\/20 {
        background-color: rgba(37, 99, 235, 0.1) !important;
      }

      [data-theme="light"] .text-purple-400 {
        color: var(--accent-purple) !important;
      }

      [data-theme="light"] .text-red-400 {
        color: var(--accent-red) !important;
      }

      [data-theme="light"] .text-blue-400 {
        color: var(--accent-blue) !important;
      }

      /* ===== TARJETAS DE PROYECTOS COMPARTIDOS ===== */

      /* Tarjetas principales de proyectos */
      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-800\\/80 {
        background: var(--gradient-proyectos-card) !important;
        border-color: var(--border-proyectos-card) !important;
        color: var(--text-proyectos-card) !important;
        box-shadow: var(--shadow-card);
      }

      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-800\\/80:hover {
        border-color: var(--accent-purple) !important;
        box-shadow: 0 8px 25px var(--shadow-hover) !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-800\\/80.rounded-2xl {
        border-radius: 1rem !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-800\\/80.border.border-slate-700 {
        border-color: var(--border-proyectos-card) !important;
      }

      /* Efecto de brillo al hover */
      [data-theme="light"] .bg-gradient-to-r.from-purple-500\\/5.to-transparent {
        background: linear-gradient(to right, rgba(124, 58, 237, 0.05), transparent) !important;
      }

      /* Títulos de tarjetas */
      [data-theme="light"] .text-lg.font-bold.text-white {
        color: var(--text-proyectos-card) !important;
        font-weight: 700 !important;
      }

      [data-theme="light"] .group-hover\\:text-purple-300:hover {
        color: var(--accent-purple) !important;
      }

      /* Descripciones */
      [data-theme="light"] .text-slate-400.text-sm {
        color: var(--text-proyectos-subtitulo) !important;
      }

      /* Indicador de proyecto compartido */
      [data-theme="light"] .w-2.h-2.bg-purple-500 {
        background-color: var(--accent-purple) !important;
      }

      /* ===== BADGES DE ROL ===== */

      /* Badge Administrador */
      [data-theme="light"] .bg-red-500\\/20.text-red-400 {
        background-color: rgba(220, 38, 38, 0.1) !important;
        color: var(--accent-red) !important;
        border-color: rgba(220, 38, 38, 0.3) !important;
      }

      [data-theme="light"] .border-red-500\\/30 {
        border-color: rgba(220, 38, 38, 0.3) !important;
      }

      [data-theme="light"] .bg-red-400 {
        background-color: var(--accent-red) !important;
      }

      /* Badge Editor */
      [data-theme="light"] .bg-green-500\\/20.text-green-400 {
        background-color: rgba(5, 150, 105, 0.1) !important;
        color: var(--accent-green) !important;
        border-color: rgba(5, 150, 105, 0.3) !important;
      }

      [data-theme="light"] .border-green-500\\/30 {
        border-color: rgba(5, 150, 105, 0.3) !important;
      }

      [data-theme="light"] .bg-green-400 {
        background-color: var(--accent-green) !important;
      }

      /* Badge Visualizador */
      [data-theme="light"] .bg-blue-500\\/20.text-blue-400 {
        background-color: rgba(37, 99, 235, 0.1) !important;
        color: var(--accent-blue) !important;
        border-color: rgba(37, 99, 235, 0.3) !important;
      }

      [data-theme="light"] .border-blue-500\\/30 {
        border-color: rgba(37, 99, 235, 0.3) !important;
      }

      [data-theme="light"] .bg-blue-400 {
        background-color: var(--accent-blue) !important;
      }

      /* ===== INFORMACIÓN DE PROYECTOS ===== */

      /* Textos de información */
      [data-theme="light"] .text-slate-400 {
        color: var(--text-proyectos-subtitulo) !important;
      }

      [data-theme="light"] .text-white.font-medium {
        color: var(--text-proyectos-card) !important;
        font-weight: 500 !important;
      }

      [data-theme="light"] .text-slate-300 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] .text-purple-400.font-medium {
        color: var(--accent-purple) !important;
        font-weight: 500 !important;
      }

      /* Footer de tarjetas */
      [data-theme="light"] .border-t.border-slate-700 {
        border-top-color: var(--border-proyectos-card) !important;
      }

      /* Indicador de estado activo */
      [data-theme="light"] .text-purple-400.text-sm {
        color: var(--accent-purple) !important;
      }

      [data-theme="light"] .bg-purple-400 {
        background-color: var(--accent-purple) !important;
      }

      [data-theme="light"] .bg-purple-500 {
        background-color: var(--accent-purple) !important;
      }

      /* Botones de acción */
      [data-theme="light"] .text-slate-400.hover\\:text-white:hover {
        color: var(--text-proyectos-card) !important;
      }

      [data-theme="light"] .hover\\:bg-slate-700\\/50:hover {
        background-color: var(--bg-sidebar-hover) !important;
      }

      /* Botón principal de abrir proyecto */
      [data-theme="light"] .bg-gradient-to-r.from-purple-500.to-purple-600 {
        background: var(--gradient-button-purple) !important;
        color: white !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-purple-500.to-purple-600:hover {
        background: linear-gradient(to right, var(--accent-purple-hover), #7c3aed) !important;
      }

      [data-theme="light"] .hover\\:from-purple-600.hover\\:to-purple-700:hover {
        background: linear-gradient(to right, var(--accent-purple-hover), #7c3aed) !important;
      }

      /* ===== ESTADO VACÍO DE PROYECTOS COMPARTIDOS ===== */

      /* Contenedor de estado vacío */
      [data-theme="light"] .bg-slate-800\\/50.backdrop-blur-sm.rounded-xl {
        background-color: var(--bg-proyectos-stats) !important;
        border-color: var(--border-proyectos-card) !important;
      }

      [data-theme="light"] .bg-slate-800\\/50.border.border-slate-700 {
        border-color: var(--border-proyectos-card) !important;
      }

      /* Icono de estado vacío */
      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-700 {
        background: var(--gradient-proyectos-card) !important;
      }

      [data-theme="light"] .text-purple-500 {
        color: var(--accent-purple) !important;
      }

      /* Títulos de estado vacío */
      [data-theme="light"] .text-2xl.font-bold.text-white {
        color: var(--text-proyectos-titulo) !important;
      }

      [data-theme="light"] .text-slate-400 {
        color: var(--text-proyectos-subtitulo) !important;
      }

      /* Lista de información en estado vacío */
      [data-theme="light"] .text-purple-500 {
        color: var(--accent-purple) !important;
      }

      /* ===== MODAL DE DETALLES DE PROYECTOS COMPARTIDOS ===== */

      /* Overlay del modal */
      [data-theme="light"] .bg-black\\/60.backdrop-blur-sm {
        background-color: rgba(0, 0, 0, 0.6) !important;
      }

      /* Modal principal */
      [data-theme="light"] .bg-gradient-to-br.from-slate-800.to-slate-900 {
        background: var(--gradient-modal) !important;
        border-color: var(--border-proyectos-card) !important;
        color: var(--text-proyectos-card) !important;
      }

      /* Header del modal */
      [data-theme="light"] .bg-gradient-to-r.from-purple-900\\/50.to-purple-800\\/30 {
        background: linear-gradient(to right, rgba(124, 58, 237, 0.1), rgba(124, 58, 237, 0.05)) !important;
        border-bottom-color: rgba(124, 58, 237, 0.2) !important;
      }

      [data-theme="light"] .border-b.border-purple-700\\/50 {
        border-bottom-color: rgba(124, 58, 237, 0.2) !important;
      }

      /* Icono del header del modal */
      [data-theme="light"] .bg-gradient-to-br.from-purple-500.to-purple-600 {
        background: var(--gradient-button-purple) !important;
      }

      [data-theme="light"] .text-white {
        color: var(--text-proyectos-card) !important;
      }

      [data-theme="light"] .text-purple-300 {
        color: var(--accent-purple) !important;
      }

      /* Botón de cerrar modal */
      [data-theme="light"] .bg-slate-700 {
        background-color: var(--bg-secondary) !important;
      }

      [data-theme="light"] .bg-slate-700:hover {
        background-color: var(--bg-sidebar-hover) !important;
      }

      [data-theme="light"] .text-slate-400 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] .text-slate-400:hover {
        color: var(--text-proyectos-card) !important;
      }

      /* Contenido del modal */
      [data-theme="light"] .text-slate-300 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] .bg-slate-700\\/30 {
        background-color: var(--bg-secondary) !important;
      }

      [data-theme="light"] .border-slate-600 {
        border-color: var(--border-proyectos-card) !important;
      }

      /* Grid de información en modal */
      [data-theme="light"] .text-slate-400.text-sm {
        color: var(--text-proyectos-subtitulo) !important;
      }

      [data-theme="light"] .text-purple-400.font-semibold {
        color: var(--accent-purple) !important;
      }

      [data-theme="light"] .text-white.font-semibold {
        color: var(--text-proyectos-card) !important;
      }

      /* Información adicional en modal */
      [data-theme="light"] .text-md.font-medium.text-white {
        color: var(--text-proyectos-card) !important;
      }

      /* Botones del modal */
      [data-theme="light"] .bg-slate-700 {
        background-color: var(--bg-secondary) !important;
      }

      [data-theme="light"] .bg-slate-700:hover {
        background-color: var(--bg-sidebar-hover) !important;
      }

      [data-theme="light"] .border-slate-600 {
        border-color: var(--border-proyectos-card) !important;
      }

      [data-theme="light"] .border-slate-600:hover {
        border-color: var(--border-input) !important;
      }

      /* Botón abrir proyecto en modal */
      [data-theme="light"] .bg-gradient-to-r.from-purple-500.to-purple-600 {
        background: var(--gradient-button-purple) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-purple-500.to-purple-600:hover {
        background: linear-gradient(to right, var(--accent-purple-hover), #7c3aed) !important;
      }

      /* ===== TOAST MESSAGES EN PROYECTOS COMPARTIDOS ===== */

      /* Contenedor de toast */
      [data-theme="light"] .bg-gradient-to-r.from-purple-500.to-purple-600 {
        background: var(--gradient-button-purple) !important;
      }

      [data-theme="light"] .border-purple-400\\/20 {
        border-color: rgba(124, 58, 237, 0.2) !important;
      }

      /* ===== BOTONES DE TEMA - ESTILOS CLAROS ===== */

      /* Contenedor de botones de tema */
      [data-theme="light"] .theme-toggle-container {
        background: var(--bg-card) !important;
        border: 1px solid var(--border-primary) !important;
        border-radius: 12px !important;
        padding: 8px !important;
        box-shadow: var(--shadow-card) !important;
        display: flex !important;
        gap: 4px !important;
        align-items: center !important;
      }

      /* Botones de tema individuales */
      [data-theme="light"] .theme-btn {
        background: transparent !important;
        border: 2px solid transparent !important;
        border-radius: 8px !important;
        padding: 10px 16px !important;
        color: var(--text-primary) !important;
        transition: all 0.3s ease !important;
        font-weight: 500 !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        min-width: 100px !important;
      }

      [data-theme="light"] .theme-btn:hover {
        background: var(--bg-sidebar-hover) !important;
        transform: translateY(-2px) !important;
        box-shadow: var(--shadow-card) !important;
      }

      /* Botón activo */
      [data-theme="light"] .theme-btn.active {
        background: var(--gradient-button-green) !important;
        color: white !important;
        border-color: var(--accent-green) !important;
        box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3) !important;
      }

      /* Botón modo claro */
      [data-theme="light"] .theme-btn.light {
        border-color: var(--border-primary) !important;
      }

      [data-theme="light"] .theme-btn.light:hover {
        border-color: var(--accent-blue) !important;
      }

      /* Botón modo oscuro */
      [data-theme="light"] .theme-btn.dark {
        border-color: var(--border-primary) !important;
      }

      [data-theme="light"] .theme-btn.dark:hover {
        border-color: var(--accent-purple) !important;
      }

      /* Botón modo sistema */
      [data-theme="light"] .theme-btn.system {
        border-color: var(--border-primary) !important;
      }

      [data-theme="light"] .theme-btn.system:hover {
        border-color: var(--accent-orange) !important;
      }

      /* Iconos en botones */
      [data-theme="light"] .theme-btn i,
      [data-theme="light"] .theme-btn svg {
        color: inherit !important;
        margin-right: 8px !important;
        width: 16px !important;
        height: 16px !important;
      }

      /* ===== HEADER CON BOTONES DE TEMA ===== */

      [data-theme="light"] header .theme-toggle-container {
        background: var(--bg-header) !important;
        border: 1px solid var(--border-header) !important;
      }

      [data-theme="light"] header .theme-btn {
        color: var(--text-header) !important;
      }

      /* ===== BOTÓN DE ACCIONES Y MENÚ DESPLEGABLE - MODO CLARO ===== */

      /* Botón acciones principal */
      [data-theme="light"] .bg-gradient-to-r.from-green-600.to-green-700 {
        background: var(--gradient-button-green) !important;
        color: white !important;
        border-color: var(--accent-green) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-gray-700.to-gray-800 {
        background: var(--gradient-button-blue) !important;
        color: white !important;
        border-color: var(--border-input) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-gray-700.to-gray-800:hover {
        background: var(--accent-blue-hover) !important;
      }

      /* Menú desplegable de acciones */
      [data-theme="light"] .absolute.right-0.mt-2.w-72.rounded-xl.shadow-2xl.bg-gradient-to-b.from-gray-800.to-gray-900 {
        background: var(--gradient-modal) !important;
        border: 1px solid var(--border-primary) !important;
        color: var(--text-primary) !important;
        box-shadow: var(--shadow-modal) !important;
      }

      /* Header del menú desplegable */
      [data-theme="light"] .p-3.border-b.border-gray-700 {
        border-bottom: 1px solid var(--border-primary) !important;
      }

      [data-theme="light"] .p-3.border-b.border-gray-700 h3 {
        color: var(--text-primary) !important;
        font-weight: 600 !important;
      }

      [data-theme="light"] .p-3.border-b.border-gray-700 .text-green-400 {
        color: var(--accent-green) !important;
      }

      /* Elementos del menú desplegable */
      [data-theme="light"] .w-full.px-4.py-3.text-left.rounded-lg.transition-all.duration-200.flex.items-center.gap-3 {
        color: var(--text-primary) !important;
        background: transparent !important;
        border: none !important;
      }

      [data-theme="light"] .w-full.px-4.py-3.text-left.rounded-lg.transition-all.duration-200.flex.items-center.gap-3:hover {
        background: var(--bg-sidebar-hover) !important;
        transform: translateY(-1px) !important;
        box-shadow: var(--shadow-card) !important;
      }

      /* Iconos del menú desplegable */
      [data-theme="light"] .bg-green-500\\/20 {
        background: rgba(5, 150, 105, 0.1) !important;
        border-radius: 8px !important;
        padding: 8px !important;
      }

      [data-theme="light"] .bg-red-500\\/20 {
        background: rgba(220, 38, 38, 0.1) !important;
        border-radius: 8px !important;
        padding: 8px !important;
      }

      [data-theme="light"] .text-green-400 {
        color: var(--accent-green) !important;
      }

      [data-theme="light"] .text-red-400 {
        color: var(--accent-red) !important;
      }

      /* Textos del menú desplegable */
      [data-theme="light"] .text-sm.font-semibold.text-white {
        color: var(--text-primary) !important;
        font-weight: 600 !important;
      }

      [data-theme="light"] .text-xs.text-gray-300 {
        color: var(--text-secondary) !important;
        font-size: 0.75rem !important;
      }

      /* ===== COLUMNAS KANBAN - MANTENER COLORES ORIGINALES ===== */

      /* Columnas Kanban - Mantener colores originales */
      [data-theme="light"] .bg-blue-100 { background-color: #dbeafe !important; }
      [data-theme="light"] .bg-green-100 { background-color: #d1fae5 !important; }
      [data-theme="light"] .bg-yellow-100 { background-color: #fef3c7 !important; }
      [data-theme="light"] .bg-red-100 { background-color: #fee2e2 !important; }
      [data-theme="light"] .bg-purple-100 { background-color: #f3e8ff !important; }
      [data-theme="light"] .bg-pink-100 { background-color: #fce7f3 !important; }
      [data-theme="light"] .bg-indigo-100 { background-color: #e0e7ff !important; }
      [data-theme="light"] .bg-orange-100 { background-color: #ffedd5 !important; }
      [data-theme="light"] .bg-cyan-100 { background-color: #cffafe !important; }
      [data-theme="light"] .bg-teal-100 { background-color: #ccfbf1 !important; }

      /* Bordes de columnas - Mantener colores originales */
      [data-theme="light"] .border-blue-200 { border-color: #bfdbfe !important; }
      [data-theme="light"] .border-green-200 { border-color: #a7f3d0 !important; }
      [data-theme="light"] .border-yellow-200 { border-color: #fde68a !important; }
      [data-theme="light"] .border-red-200 { border-color: #fecaca !important; }
      [data-theme="light"] .border-purple-200 { border-color: #ddd6fe !important; }
      [data-theme="light"] .border-pink-200 { border-color: #fbcfe8 !important; }
      [data-theme="light"] .border-indigo-200 { border-color: #c7d2fe !important; }
      [data-theme="light"] .border-orange-200 { border-color: #fdba74 !important; }
      [data-theme="light"] .border-cyan-200 { border-color: #a5f3fc !important; }
      [data-theme="light"] .border-teal-200 { border-color: #99f6e4 !important; }

      /* Textos de columnas - Mantener contraste */
      [data-theme="light"] .text-blue-800 { color: #1e40af !important; }
      [data-theme="light"] .text-green-800 { color: #065f46 !important; }
      [data-theme="light"] .text-yellow-800 { color: #92400e !important; }
      [data-theme="light"] .text-red-800 { color: #991b1b !important; }
      [data-theme="light"] .text-purple-800 { color: #5b21b6 !important; }
      [data-theme="light"] .text-pink-800 { color: #9d174d !important; }
      [data-theme="light"] .text-indigo-800 { color: #3730a3 !important; }
      [data-theme="light"] .text-orange-800 { color: #9a3412 !important; }
      [data-theme="light"] .text-cyan-800 { color: #155e75 !important; }
      [data-theme="light"] .text-teal-800 { color: #115e59 !important; }

      /* Badges de contador en columnas */
      [data-theme="light"] .bg-blue-200 { background-color: #bfdbfe !important; }
      [data-theme="light"] .bg-green-200 { background-color: #a7f3d0 !important; }
      [data-theme="light"] .bg-yellow-200 { background-color: #fde68a !important; }
      [data-theme="light"] .bg-red-200 { background-color: #fecaca !important; }
      [data-theme="light"] .bg-purple-200 { background-color: #ddd6fe !important; }
      [data-theme="light"] .bg-pink-200 { background-color: #fbcfe8 !important; }
      [data-theme="light"] .bg-indigo-200 { background-color: #c7d2fe !important; }
      [data-theme="light"] .bg-orange-200 { background-color: #fdba74 !important; }
      [data-theme="light"] .bg-cyan-200 { background-color: #a5f3fc !important; }
      [data-theme="light"] .bg-teal-200 { background-color: #99f6e4 !important; }

      /* ===== PÁGINA DE CONFIGURACIÓN DE TEMA ===== */

      [data-theme="light"] .theme-settings-page {
        background: var(--gradient-bg) !important;
        min-height: 100vh !important;
        padding: 20px !important;
      }

      [data-theme="light"] .theme-settings-card {
        background: var(--bg-card) !important;
        border: 1px solid var(--border-card) !important;
        border-radius: 16px !important;
        box-shadow: var(--shadow-modal) !important;
        padding: 24px !important;
        max-width: 600px !important;
        margin: 0 auto !important;
      }

      [data-theme="light"] .theme-preview {
        background: var(--bg-secondary) !important;
        border: 2px dashed var(--border-primary) !important;
        border-radius: 12px !important;
        padding: 20px !important;
        margin: 16px 0 !important;
        text-align: center !important;
      }

      [data-theme="light"] .theme-option {
        border: 2px solid var(--border-input) !important;
        border-radius: 12px !important;
        padding: 16px !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        margin-bottom: 12px !important;
      }

      [data-theme="light"] .theme-option:hover {
        border-color: var(--accent-green) !important;
        transform: scale(1.02) !important;
      }

      [data-theme="light"] .theme-option.selected {
        border-color: var(--accent-green) !important;
        background: var(--bg-sidebar-active) !important;
        box-shadow: 0 4px 12px rgba(5, 150, 105, 0.2) !important;
      }

      /* ===== INDICADOR VISUAL DEL TEMA ACTIVO ===== */

      [data-theme="light"] .theme-indicator {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        background: var(--gradient-button-green) !important;
        color: white !important;
        padding: 8px 12px !important;
        border-radius: 20px !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        box-shadow: var(--shadow-card) !important;
        z-index: 1000 !important;
        pointer-events: none !important;
      }

      [data-theme="light"] .theme-indicator::before {
        content: "🌞 Modo Claro" !important;
      }

      /* ===== PÁGINA DE LOGIN - MODO CLARO ===== */

      /* Fondo principal del login */
      [data-theme="light"] .bg-gray-900 {
        background-color: var(--bg-login) !important;
      }

      [data-theme="light"] .min-h-screen.bg-gray-900 {
        background: var(--gradient-bg) !important;
      }

      /* Tarjeta del formulario de login */
      [data-theme="light"] .bg-gradient-to-b.from-gray-900.via-gray-800.to-gray-950 {
        background: var(--gradient-login-card) !important;
        border-color: var(--border-login-card) !important;
        box-shadow: var(--shadow-login);
      }

      /* Textos en el login - NEGROS */
      [data-theme="light"] .text-white {
        color: var(--text-login) !important;
      }

      [data-theme="light"] .text-gray-400 {
        color: var(--text-login-link) !important;
      }

      [data-theme="light"] .text-gray-300 {
        color: var(--text-secondary) !important;
      }

      /* Labels de los inputs */
      [data-theme="light"] .text-white.block.text-sm.font-medium {
        color: var(--text-login-label) !important;
      }

      /* Inputs del formulario */
      [data-theme="light"] .bg-black {
        background-color: var(--bg-login-input) !important;
      }

      [data-theme="light"] .border-gray-700 {
        border-color: var(--border-login-input) !important;
      }

      [data-theme="light"] input {
        color: var(--text-primary) !important;
      }

      [data-theme="light"] input::placeholder {
        color: var(--text-placeholder) !important;
      }

      [data-theme="light"] input:focus {
        border-color: var(--accent-green) !important;
        box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.2) !important;
      }

      /* Botón de mostrar/ocultar contraseña */
      [data-theme="light"] .text-gray-400.hover\\:text-green-400:hover {
        color: var(--accent-green) !important;
      }

      /* Botón de Google */
      [data-theme="light"] .bg-black.border-gray-600 {
        background-color: var(--bg-login-input) !important;
        border-color: var(--border-login-input) !important;
        color: var(--text-login) !important;
      }

      [data-theme="light"] .bg-black.border-gray-600:hover {
        background-color: var(--bg-sidebar-hover) !important;
        border-color: var(--border-input) !important;
      }

      /* Enlaces del login */
      [data-theme="light"] .text-gray-400.hover\\:text-green-400 {
        color: var(--text-login-link) !important;
      }

      [data-theme="light"] .text-gray-400.hover\\:text-green-400:hover {
        color: var(--accent-green) !important;
      }

      /* Separador */
      [data-theme="light"] .border-gray-600 {
        border-color: var(--border-login) !important;
      }

      /* Mensajes de error */
      [data-theme="light"] .bg-red-500\\/90 {
        background-color: rgba(220, 38, 38, 0.9) !important;
        border-color: var(--accent-red) !important;
        color: white !important;
      }

      /* Logo SPlanner - Ajustes para modo claro */
      [data-theme="light"] text[fill="url(#mainGradient)"] {
        fill: var(--accent-green) !important;
      }

      /* Gradiente del logo en modo claro */
      [data-theme="light"] #mainGradient stop {
        stop-color: var(--accent-green) !important;
      }

      /* ===== ANIMACIONES ===== */

      [data-theme="light"] .animate-smooth-fade-in {
        animation: smoothFadeIn 0.8s ease-out;
      }

      [data-theme="light"] .animate-fade-in-up {
        animation: fadeInUp 0.6s ease-out;
      }

      [data-theme="light"] .animate-form-appear {
        animation: formAppear 0.8s ease-out;
      }

      [data-theme="light"] .animate-fade-in-down {
        animation: fadeInDown 0.3s ease-out;
      }

      [data-theme="light"] .animate-spin {
        animation: spin 1s linear infinite;
      }

      @keyframes smoothFadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

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

      @keyframes formAppear {
        from {
          opacity: 0;
          transform: scale(0.95) translateY(20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      /* ===== RESPONSIVE ADAPTATIONS ===== */

      @media (max-width: 640px) {
        [data-theme="light"] .mx-2 {
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }
        
        [data-theme="light"] .p-6 {
          padding: 1.5rem;
        }
        
        [data-theme="light"] .max-w-\\[300px\\] {
          max-width: 300px;
        }

        [data-theme="light"] .theme-toggle-container {
          flex-direction: column !important;
          width: 100% !important;
        }

        [data-theme="light"] .theme-btn {
          min-width: auto !important;
          width: 100% !important;
        }
      }

      /* ===== RESTANTE DE LOS ESTILOS EXISTENTES ===== */

      /* Aplicación global del modo claro - TEXTOS NEGROS */
      [data-theme="light"] {
        background-color: var(--bg-primary);
        color: var(--text-primary) !important;
      }

      /* ===== GRÁFICOS CHART.JS - CORRECCIONES ESPECÍFICAS PARA TEXTO NEGRO ===== */

      /* Contenedores de gráficos */
      [data-theme="light"] .bg-gray-800.rounded-xl {
        background-color: var(--bg-chart) !important;
        border-color: var(--border-chart) !important;
        color: var(--text-chart) !important;
        box-shadow: var(--shadow-card);
      }

      [data-theme="light"] .bg-gray-800\\/50 {
        background-color: var(--bg-card) !important;
        border-color: var(--border-card) !important;
      }

      /* OVERRIDE COMPLETO PARA TEXTO EN GRÁFICOS CHART.JS */
      [data-theme="light"] .chartjs-render-monitor,
      [data-theme="light"] canvas {
        background-color: var(--bg-chart) !important;
      }

      /* FORZAR TEXTO NEGRO EN TODOS LOS ELEMENTOS DE CHART.JS */
      [data-theme="light"] .chartjs-render-monitor text,
      [data-theme="light"] canvas text,
      [data-theme="light"] .chartjs-legend text,
      [data-theme="light"] .chartjs-title text,
      [data-theme="light"] .chartjs-axis text,
      [data-theme="light"] .chartjs-tooltip,
      [data-theme="light"] .chartjs-tooltip .tooltip-header,
      [data-theme="light"] .chartjs-tooltip .tooltip-body {
        fill: var(--text-chartjs) !important;
        color: var(--text-chartjs) !important;
      }

      /* ===== DASHBOARD COMPONENT - MODO CLARO COMPLETO ===== */

      /* Fondo principal del dashboard */
      [data-theme="light"] .min-h-screen.bg-gradient-to-br.from-gray-900.via-gray-800.to-gray-900 {
        background: var(--gradient-bg) !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-gray-900\\/50.via-gray-800\\/30.to-gray-900\\/50 {
        background: var(--gradient-bg) !important;
      }

      /* Header del dashboard */
      [data-theme="light"] header.bg-gradient-to-r.from-gray-800.via-gray-800\\/95.to-gray-800 {
        background: var(--gradient-header) !important;
        border-bottom-color: var(--border-header) !important;
        backdrop-filter: blur(20px);
        box-shadow: var(--shadow-header);
      }

      /* Textos del header */
      [data-theme="light"] header .text-white {
        color: var(--text-header) !important;
      }

      [data-theme="light"] header .text-gray-300 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] header .text-gray-400 {
        color: var(--text-muted) !important;
      }

      /* Botones del header */
      [data-theme="light"] header .bg-gradient-to-r.from-gray-700.to-gray-600 {
        background: var(--gradient-button-blue) !important;
        border-color: var(--border-input) !important;
        color: white !important;
      }

      [data-theme="light"] header .bg-gradient-to-r.from-gray-700.to-gray-600:hover {
        background: var(--accent-blue-hover) !important;
      }

      [data-theme="light"] header .bg-gradient-to-r.from-purple-500.to-purple-600 {
        background: var(--gradient-button-purple) !important;
        color: white !important;
      }

      [data-theme="light"] header .bg-gradient-to-r.from-purple-500.to-purple-600:hover {
        background: linear-gradient(to right, var(--accent-purple-hover), #7c3aed) !important;
      }

      [data-theme="light"] header .bg-gradient-to-r.from-green-500.to-green-600 {
        background: var(--gradient-button-green) !important;
        color: white !important;
      }

      [data-theme="light"] header .bg-gradient-to-r.from-green-500.to-green-600:hover {
        background: linear-gradient(to right, var(--accent-green-hover), #059669) !important;
      }

      /* Botón toggle sidebar móvil */
      [data-theme="light"] .bg-gradient-to-br.from-gray-700.to-gray-600 {
        background: var(--gradient-button-blue) !important;
        border-color: var(--border-input) !important;
        color: white !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-gray-700.to-gray-600:hover {
        background: var(--accent-blue-hover) !important;
      }

      /* Tarjetas principales del dashboard */
      [data-theme="light"] .bg-gradient-to-br.from-gray-800.via-gray-800\\/95.to-gray-900 {
        background: var(--gradient-card) !important;
        border-color: var(--border-card) !important;
        color: var(--text-primary) !important;
        box-shadow: var(--shadow-card);
      }

      [data-theme="light"] .bg-gradient-to-br.from-gray-800.to-gray-900 {
        background: var(--gradient-card) !important;
        border-color: var(--border-card) !important;
        box-shadow: var(--shadow-card);
      }

      [data-theme="light"] .bg-gradient-to-br.from-gray-800.via-gray-800\\/95.to-gray-900:hover {
        border-color: var(--accent-blue) !important;
        box-shadow: var(--shadow-modal);
      }

      /* Estadísticas del proyecto */
      [data-theme="light"] .bg-gradient-to-br.from-gray-700\\/50.to-gray-800\\/50 {
        background: var(--gradient-stats-blue) !important;
        border-color: var(--border-card) !important;
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-gray-700\\/50.to-gray-800\\/50:hover {
        border-color: var(--accent-blue) !important;
        transform: scale(1.05);
      }

      /* Textos en tarjetas con gradiente */
      [data-theme="light"] .bg-gradient-to-r.from-white.to-gray-300.bg-clip-text {
        background: linear-gradient(to right, var(--text-primary), var(--text-secondary)) !important;
        -webkit-background-clip: text !important;
        background-clip: text !important;
        color: transparent !important;
      }

      /* Números de estadísticas */
      [data-theme="light"] .text-yellow-400 {
        color: var(--accent-orange) !important;
      }

      [data-theme="light"] .text-blue-400 {
        color: var(--accent-blue) !important;
      }

      [data-theme="light"] .text-green-400 {
        color: var(--accent-green) !important;
      }

      [data-theme="light"] .text-purple-400 {
        color: var(--accent-purple) !important;
      }

      [data-theme="light"] .text-cyan-400 {
        color: var(--accent-blue) !important;
      }

      [data-theme="light"] .text-amber-400 {
        color: var(--accent-orange) !important;
      }

      /* Barras de progreso en estadísticas */
      [data-theme="light"] .bg-gray-600 {
        background-color: var(--border-primary) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-yellow-400.to-yellow-500 {
        background: linear-gradient(to right, var(--accent-orange), var(--accent-orange-hover)) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-blue-400.to-blue-500 {
        background: linear-gradient(to right, var(--accent-blue), var(--accent-blue-hover)) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-green-400.to-green-500 {
        background: linear-gradient(to right, var(--accent-green), var(--accent-green-hover)) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-purple-400.to-purple-500 {
        background: linear-gradient(to right, var(--accent-purple), var(--accent-purple-hover)) !important;
      }

      /* ===== MODALES DEL DASHBOARD ===== */

      /* Modal de selector de gráficos */
      [data-theme="light"] .bg-gradient-to-br.from-gray-800.to-gray-900 {
        background: var(--gradient-modal) !important;
        border-color: var(--border-primary) !important;
        box-shadow: var(--shadow-modal);
      }

      [data-theme="light"] .bg-gradient-to-r.from-purple-600.to-purple-700 {
        background: var(--gradient-button-purple) !important;
        border-color: var(--border-primary) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-blue-600.to-blue-700 {
        background: var(--gradient-button-blue) !important;
        border-color: var(--border-primary) !important;
      }

      /* Elementos de lista en modales */
      [data-theme="light"] .bg-gray-700\\/30 {
        background-color: var(--bg-secondary) !important;
        border-color: var(--border-input) !important;
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .bg-gray-700\\/30:hover {
        background-color: var(--bg-sidebar-hover) !important;
        border-color: var(--accent-blue) !important;
      }

      /* Modal de exportación */
      [data-theme="light"] .bg-black\\/80 {
        background-color: rgba(0, 0, 0, 0.5) !important;
      }

      /* ===== ESTADOS DE LOADING Y ERROR ===== */

      [data-theme="light"] .bg-gray-700 {
        background-color: var(--bg-secondary) !important;
      }

      [data-theme="light"] .border-gray-700 {
        border-color: var(--border-primary) !important;
      }

      [data-theme="light"] .bg-red-500\\/20 {
        background-color: rgba(220, 38, 38, 0.1) !important;
        border-color: rgba(220, 38, 38, 0.3) !important;
      }

      /* Loading spinner */
      [data-theme="light"] .border-gray-700 {
        border-color: var(--border-primary) !important;
      }

      [data-theme="light"] .border-green-500 {
        border-color: var(--accent-green) !important;
      }

      [data-theme="light"] .border-purple-500 {
        border-color: var(--accent-purple) !important;
      }

      [data-theme="light"] .border-blue-500 {
        border-color: var(--accent-blue) !important;
      }

      /* ===== ELEMENTOS DECORATIVOS ===== */

      [data-theme="light"] .bg-gradient-to-br.from-blue-500.via-purple-500.to-cyan-500 {
        background: linear-gradient(135deg, var(--accent-blue), var(--accent-purple), var(--accent-blue)) !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-purple-500.to-blue-500 {
        background: linear-gradient(135deg, var(--accent-purple), var(--accent-blue)) !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-blue-500.to-blue-600 {
        background: linear-gradient(135deg, var(--accent-blue), var(--accent-blue-hover)) !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-purple-500.to-purple-600 {
        background: linear-gradient(135deg, var(--accent-purple), var(--accent-purple-hover)) !important;
      }

      [data-theme="light"] .bg-green-500 {
        background-color: var(--accent-green) !important;
      }

      /* Indicadores de estado */
      [data-theme="light"] .bg-green-400 {
        background-color: var(--accent-green) !important;
      }

      /* ===== EFECTOS HOVER Y ANIMACIONES ===== */

      [data-theme="light"] .hover\\:scale-105:hover {
        transform: scale(1.05);
      }

      [data-theme="light"] .hover\\:border-blue-500\\/50:hover {
        border-color: var(--accent-blue) !important;
      }

      [data-theme="light"] .hover\\:border-purple-500\\/50:hover {
        border-color: var(--accent-purple) !important;
      }

      [data-theme="light"] .hover\\:border-green-500\\/50:hover {
        border-color: var(--accent-green) !important;
      }

      [data-theme="light"] .hover\\:border-yellow-400\\/50:hover {
        border-color: var(--accent-orange) !important;
      }

      [data-theme="light"] .hover\\:border-cyan-500\\/50:hover {
        border-color: var(--accent-blue) !important;
      }

      /* ===== SCROLLBARS PERSONALIZADOS ===== */

      [data-theme="light"] .custom-scrollbar::-webkit-scrollbar-track {
        background: var(--bg-secondary) !important;
      }

      [data-theme="light"] .custom-scrollbar::-webkit-scrollbar-thumb {
        background: var(--border-primary) !important;
      }

      [data-theme="light"] .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: var(--text-secondary) !important;
      }

      /* ===== BADGES Y ETIQUETAS INFORMATIVAS ===== */

      [data-theme="light"] .bg-gradient-to-r.from-gray-700\\/50.to-gray-600\\/50 {
        background: var(--bg-secondary) !important;
        border-color: var(--border-input) !important;
        color: var(--text-primary) !important;
      }

      /* ===== ELEMENTOS DE GRADIENTE DECORATIVOS ===== */

      [data-theme="light"] .bg-gradient-to-br.from-purple-500\\/10.to-blue-500\\/10 {
        background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(37, 99, 235, 0.1)) !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-green-500\\/10.to-blue-500\\/10 {
        background: linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(37, 99, 235, 0.1)) !important;
      }

      [data-theme="light"] .bg-gradient-to-br.from-cyan-500\\/10.to-cyan-600\\/10 {
        background: linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(8, 145, 178, 0.1)) !important;
      }

      /* ===== EFECTOS DE BACKDROP BLUR ===== */

      [data-theme="light"] .backdrop-blur-2xl {
        backdrop-filter: blur(20px);
      }

      [data-theme="light"] .backdrop-blur-xl {
        backdrop-filter: blur(16px);
      }

      [data-theme="light"] .backdrop-blur-sm {
        backdrop-filter: blur(4px);
      }

      /* ===== BOTONES DE ACCIÓN EN MODALES ===== */

      [data-theme="light"] .bg-white\\/10 {
        background-color: rgba(255, 255, 255, 0.1) !important;
      }

      [data-theme="light"] .bg-white\\/10:hover {
        background-color: rgba(255, 255, 255, 0.2) !important;
      }

      /* ===== TEXTOS EN MODALES ===== */

      [data-theme="light"] .text-purple-100 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] .text-blue-100 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] .text-red-400 {
        color: var(--accent-red) !important;
      }

      /* ===== ESTADOS ACTIVOS DE GRÁFICOS ===== */

      [data-theme="light"] .bg-blue-500 {
        background-color: var(--accent-blue) !important;
      }

      [data-theme="light"] .bg-purple-500 {
        background-color: var(--accent-purple) !important;
      }

      [data-theme="light"] .bg-cyan-500 {
        background-color: var(--accent-blue) !important;
      }

      [data-theme="light"] .bg-amber-500 {
        background-color: var(--accent-orange) !important;
      }

      /* ===== ANIMACIONES DE GRADIENTE ===== */

      [data-theme="light"] .bg-gradient-to-r.from-white\\/10.to-transparent {
        background: linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent) !important;
      }

      /* ===== VISTA KANBAN/TABLERO - MODO CLARO ===== */

      /* Fondo principal del tablero */
      [data-theme="light"] .min-h-screen {
        background: var(--gradient-bg) !important;
      }

      [data-theme="light"] .min-h-screen.text-white {
        color: var(--text-kanban) !important;
      }

      /* Override del gradiente oscuro específico */
      [data-theme="light"] .min-h-screen[style*="linear-gradient(135deg, #0f172a"] {
        background: var(--gradient-bg) !important;
      }

      /* Columnas del Kanban - Mantener estructura pero con fondos claros */
      [data-theme="light"] .bg-gray-50 {
        background-color: var(--bg-kanban-column) !important;
        border-color: var(--border-kanban) !important;
      }

      [data-theme="light"] .dark\\:bg-gray-900 {
        background-color: var(--bg-kanban-column) !important;
      }

      [data-theme="light"] .border-gray-200 {
        border-color: var(--border-kanban) !important;
      }

      [data-theme="light"] .dark\\:border-gray-700 {
        border-color: var(--border-kanban) !important;
      }

      /* Tarjetas de tareas en Kanban */
      [data-theme="light"] .bg-white {
        background-color: var(--bg-kanban-task) !important;
        border-color: var(--border-card) !important;
      }

      [data-theme="light"] .dark\\:bg-gray-800 {
        background-color: var(--bg-kanban-task) !important;
      }

      [data-theme="light"] .border-base-300 {
        border-color: var(--border-card) !important;
      }

      /* Textos en Kanban */
      [data-theme="light"] .text-base-content {
        color: var(--text-kanban) !important;
      }

      [data-theme="light"] .text-gray-600 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] .dark\\:text-gray-400 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] .text-gray-700 {
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .dark\\:text-gray-300 {
        color: var(--text-primary) !important;
      }

      /* Botones en Kanban */
      [data-theme="light"] .btn-outline {
        background-color: var(--bg-card) !important;
        border-color: var(--border-input) !important;
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .btn-outline.border-gray-300 {
        border-color: var(--border-input) !important;
      }

      [data-theme="light"] .btn-outline.text-gray-700 {
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .btn-outline:hover {
        background-color: var(--accent-blue) !important;
        color: white !important;
        border-color: var(--accent-blue) !important;
      }

      /* Botones de acciones flotantes */
      [data-theme="light"] .fixed .btn-outline {
        background-color: var(--bg-card) !important;
        border-color: var(--border-input) !important;
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .fixed .btn-outline:hover {
        background-color: var(--bg-sidebar-hover) !important;
        color: var(--text-primary) !important;
        border-color: var(--border-primary) !important;
      }

      /* Dropdown menus en Kanban */
      [data-theme="light"] .bg-white {
        background-color: var(--bg-dropdown) !important;
      }

      [data-theme="light"] .dark\\:bg-gray-800 {
        background-color: var(--bg-dropdown) !important;
      }

      [data-theme="light"] .text-gray-700 {
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .dark\\:text-gray-300 {
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .hover\\:bg-gray-200:hover {
        background-color: var(--bg-sidebar-hover) !important;
      }

      [data-theme="light"] .dark\\:hover\\:bg-gray-700:hover {
        background-color: var(--bg-sidebar-hover) !important;
      }

      /* Tablas en vista lista */
      [data-theme="light"] .bg-base-100 {
        background-color: var(--bg-table) !important;
      }

      [data-theme="light"] .bg-base-200 {
        background-color: var(--bg-table-header) !important;
      }

      [data-theme="light"] .table-zebra tbody tr:nth-child(even) {
        background-color: var(--bg-table-row) !important;
      }

      [data-theme="light"] .table-zebra tbody tr:nth-child(odd) {
        background-color: var(--bg-table-row-hover) !important;
      }

      [data-theme="light"] .hover\\:bg-primary\\/10:hover {
        background-color: var(--bg-table-row-hover) !important;
      }

      /* Headers de tabla */
      [data-theme="light"] .bg-primary {
        background-color: var(--accent-blue) !important;
      }

      [data-theme="light"] .text-primary-content {
        color: white !important;
      }

      /* Bordes de tabla */
      [data-theme="light"] .border-base-300 {
        border-color: var(--border-table) !important;
      }

      [data-theme="light"] .divide-base-300 > :not([hidden]) ~ :not([hidden]) {
        border-color: var(--border-table) !important;
      }

      /* Modales en tablero */
      [data-theme="light"] .modal-box {
        background-color: var(--bg-modal) !important;
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .bg-base-100 {
        background-color: var(--bg-modal) !important;
      }

      /* Inputs en modales */
      [data-theme="light"] .input-bordered {
        background-color: var(--bg-input) !important;
        border-color: var(--border-input) !important;
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .input-bordered:focus {
        border-color: var(--accent-blue) !important;
        box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2) !important;
      }

      [data-theme="light"] .input-bordered::placeholder {
        color: var(--text-placeholder) !important;
      }

      /* Labels en modales */
      [data-theme="light"] .label-text {
        color: var(--text-primary) !important;
      }

      /* Botones en modales */
      [data-theme="light"] .btn-primary {
        background-color: var(--accent-blue) !important;
        border-color: var(--accent-blue) !important;
        color: white !important;
      }

      [data-theme="light"] .btn-primary:hover {
        background-color: var(--accent-blue-hover) !important;
        border-color: var(--accent-blue-hover) !important;
      }

      [data-theme="light"] .btn-outline.btn-error {
        background-color: transparent !important;
        border-color: var(--accent-red) !important;
        color: var(--accent-red) !important;
      }

      [data-theme="light"] .btn-outline.btn-error:hover {
        background-color: var(--accent-red) !important;
        color: white !important;
      }

      /* Estados de error */
      [data-theme="light"] .text-error {
        color: var(--accent-red) !important;
      }

      [data-theme="light"] .border-red-500 {
        border-color: var(--accent-red) !important;
      }

      /* Listas en modales */
      [data-theme="light"] ul {
        background-color: var(--bg-input) !important;
        border-color: var(--border-input) !important;
      }

      [data-theme="light"] ul li {
        color: var(--text-primary) !important;
      }

      [data-theme="light"] ul li:hover {
        background-color: var(--bg-sidebar-hover) !important;
      }

      /* Checkboxes */
      [data-theme="light"] input[type="checkbox"] {
        background-color: var(--bg-input) !important;
        border-color: var(--border-input) !important;
      }

      /* Badges y etiquetas */
      [data-theme="light"] .badge {
        background-color: var(--bg-secondary) !important;
        color: var(--text-primary) !important;
        border-color: var(--border-primary) !important;
      }

      /* Scrollbars */
      [data-theme="light"] .overflow-y-auto::-webkit-scrollbar-track {
        background: var(--bg-secondary) !important;
      }

      [data-theme="light"] .overflow-y-auto::-webkit-scrollbar-thumb {
        background: var(--border-primary) !important;
      }

      [data-theme="light"] .overflow-y-auto::-webkit-scrollbar-thumb:hover {
        background: var(--text-secondary) !important;
      }

      /* Efectos hover en tarjetas */
      [data-theme="light"] .group:hover .shadow-md {
        box-shadow: var(--shadow-card) !important;
      }

      [data-theme="light"] .group:hover .ring {
        box-shadow: 0 0 0 2px var(--accent-blue) !important;
      }

      /* Botones de color selector */
      [data-theme="light"] .color-toggle-btn {
        background-color: transparent !important;
      }

      [data-theme="light"] .color-toggle-btn:hover {
        background-color: var(--bg-sidebar-hover) !important;
      }

      /* Panel de selección de colores */
      [data-theme="light"] .absolute.bg-white {
        background-color: var(--bg-dropdown) !important;
        border-color: var(--border-primary) !important;
        box-shadow: var(--shadow-modal) !important;
      }

      [data-theme="light"] .absolute.dark\\:bg-gray-800 {
        background-color: var(--bg-dropdown) !important;
      }

      /* Botones de acción en tarjetas */
      [data-theme="light"] .bg-gray-800 {
        background-color: var(--text-secondary) !important;
      }

      [data-theme="light"] .bg-opacity-60 {
        opacity: 0.8 !important;
      }

      [data-theme="light"] .hover\\:bg-blue-600:hover {
        background-color: var(--accent-blue) !important;
      }

      [data-theme="light"] .hover\\:bg-red-600:hover {
        background-color: var(--accent-red) !important;
      }

      /* Estados de fecha */
      [data-theme="light"] .text-red-600 {
        color: var(--accent-red) !important;
      }

      [data-theme="light"] .text-orange-600 {
        color: var(--accent-orange) !important;
      }

      [data-theme="light"] .text-gray-500 {
        color: var(--text-muted) !important;
      }

      /* ===== PÁGINA DE PROYECTOS - MODO CLARO ===== */

      /* Fondo principal de la página de proyectos */
      [data-theme="light"] .min-h-screen.bg-gradient-to-br.from-slate-900.via-slate-800.to-slate-900 {
        background: var(--gradient-bg) !important;
      }

      /* Header de proyectos */
      [data-theme="light"] header.bg-gray-800\\/50 {
        background-color: var(--bg-header) !important;
        border-bottom-color: var(--border-header) !important;
        backdrop-filter: blur(8px);
        box-shadow: var(--shadow-header);
      }

      /* Textos del header */
      [data-theme="light"] header.bg-gray-800\\/50 .text-white {
        color: var(--text-header) !important;
      }

      [data-theme="light"] header.bg-gray-800\\/50 .text-gray-400 {
        color: var(--text-secondary) !important;
      }

      /* Input de búsqueda en header */
      [data-theme="light"] header.bg-gray-800\\/50 input {
        background-color: var(--bg-input) !important;
        border-color: var(--border-input) !important;
        color: var(--text-primary) !important;
      }

      [data-theme="light"] header.bg-gray-800\\/50 input::placeholder {
        color: var(--text-placeholder) !important;
      }

      [data-theme="light"] header.bg-gray-800\\/50 input:focus {
        border-color: var(--accent-green) !important;
        box-shadow: 0 0 0 2px rgba(5, 150, 105, 0.2) !important;
      }

      /* Botón nuevo proyecto en header */
      [data-theme="light"] header.bg-gray-800\\/50 .bg-gradient-to-r.from-green-500.to-green-600 {
        background: var(--gradient-button-green) !important;
      }

      [data-theme="light"] header.bg-gray-800\\/50 .bg-gradient-to-r.from-green-500.to-green-600:hover {
        background: linear-gradient(to right, var(--accent-green-hover), #059669) !important;
      }

      /* Cards de proyectos */
      [data-theme="light"] .bg-gray-800.rounded-xl {
        background-color: var(--bg-card) !important;
        border-color: var(--border-card) !important;
        color: var(--text-primary) !important;
        box-shadow: var(--shadow-card);
      }

      [data-theme="light"] .bg-gray-800.rounded-xl:hover {
        border-color: var(--accent-green) !important;
        box-shadow: 0 8px 25px var(--shadow-hover) !important;
      }

      /* Textos en cards de proyectos */
      [data-theme="light"] .bg-gray-800.rounded-xl .text-white {
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .bg-gray-800.rounded-xl .text-gray-400 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] .bg-gray-800.rounded-xl .text-gray-300 {
        color: var(--text-muted) !important;
      }

      /* Hover effects en títulos */
      [data-theme="light"] .bg-gray-800.rounded-xl .group-hover\\:text-green-400:hover {
        color: var(--accent-green) !important;
      }

      /* Botones de acción en cards */
      [data-theme="light"] .bg-gray-800.rounded-xl .bg-green-500 {
        background-color: var(--accent-green) !important;
      }

      [data-theme="light"] .bg-gray-800.rounded-xl .bg-green-500:hover {
        background-color: var(--accent-green-hover) !important;
      }

      [data-theme="light"] .bg-gray-800.rounded-xl .bg-blue-500 {
        background-color: var(--accent-blue) !important;
      }

      [data-theme="light"] .bg-gray-800.rounded-xl .bg-blue-500:hover {
        background-color: var(--accent-blue-hover) !important;
      }

      /* Botón de acciones (menú dropdown) */
      [data-theme="light"] .bg-gray-800.rounded-xl .text-gray-400 {
        color: var(--text-secondary) !important;
      }

      [data-theme="light"] .bg-gray-800.rounded-xl .text-gray-400:hover {
        color: var(--accent-green) !important;
        background-color: var(--bg-sidebar-hover) !important;
      }

      /* Dropdown menu en proyectos */
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

      /* Estado vacío */
      [data-theme="light"] .bg-gray-800.rounded-2xl {
        background-color: var(--bg-card) !important;
        border-color: var(--border-card) !important;
      }

      [data-theme="light"] .bg-gray-800.rounded-2xl .text-gray-500 {
        color: var(--text-muted) !important;
      }

      [data-theme="light"] .text-gray-500 {
        color: var(--text-muted) !important;
      }

      /* Botón crear primer proyecto en estado vacío */
      [data-theme="light"] .bg-gradient-to-r.from-green-500.to-green-600 {
        background: var(--gradient-button-green) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-green-500.to-green-600:hover {
        background: linear-gradient(to right, var(--accent-green-hover), #059669) !important;
      }

      /* ===== MODALES EN PÁGINA DE PROYECTOS ===== */

      /* Modal base */
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

      /* Modal de invitación (azul) */
      [data-theme="light"] .bg-gradient-to-r.from-blue-900\\/50.to-blue-800\\/30 {
        background: linear-gradient(to right, #eff6ff, #dbeafe) !important;
        border-bottom-color: var(--border-primary) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-blue-900\\/50.to-blue-800\\/30 .text-white {
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .bg-gradient-to-r.from-blue-900\\/50.to-blue-800\\/30 .text-blue-400 {
        color: var(--accent-blue) !important;
      }

      /* Estados de éxito en invitación */
      [data-theme="light"] .bg-green-500\\/20 {
        background-color: rgba(5, 150, 105, 0.1) !important;
        border-color: rgba(5, 150, 105, 0.3) !important;
      }

      [data-theme="light"] .bg-green-500\\/20 .text-white {
        color: var(--text-primary) !important;
      }

      [data-theme="light"] .bg-green-500\\/20 .text-green-400 {
        color: var(--accent-green) !important;
      }

      /* Estados de error */
      [data-theme="light"] .bg-red-500\\/20 {
        background-color: rgba(220, 38, 38, 0.1) !important;
        border-color: rgba(220, 38, 38, 0.3) !important;
      }

      [data-theme="light"] .bg-red-500\\/20 .text-red-400 {
        color: var(--accent-red) !important;
      }

      /* ===== TOAST MESSAGES ===== */

      [data-theme="light"] .bg-gradient-to-r.from-green-500.to-green-600 {
        background: var(--gradient-button-green) !important;
        border-color: rgba(5, 150, 105, 0.2) !important;
      }

      /* ===== BADGES Y ESTADOS ===== */

      [data-theme="light"] .bg-green-500\\/10 {
        background-color: rgba(5, 150, 105, 0.1) !important;
      }

      [data-theme="light"] .bg-blue-500\\/10 {
        background-color: rgba(37, 99, 235, 0.1) !important;
      }

      [data-theme="light"] .bg-purple-500\\/10 {
        background-color: rgba(124, 58, 237, 0.1) !important;
      }

      [data-theme="light"] .bg-red-500\\/10 {
        background-color: rgba(220, 38, 38, 0.1) !important;
      }

      /* Iconos en cards */
      [data-theme="light"] .text-green-400 {
        color: var(--accent-green) !important;
      }

      [data-theme="light"] .text-blue-400 {
        color: var(--accent-blue) !important;
      }

      [data-theme="light"] .text-purple-400 {
        color: var(--accent-purple) !important;
      }

      [data-theme="light"] .text-red-400 {
        color: var(--accent-red) !important;
      }

      /* ===== BORDES Y SEPARADORES ===== */

      [data-theme="light"] .border-gray-700 {
        border-color: var(--border-primary) !important;
      }

      [data-theme="light"] .border-t.border-gray-700 {
        border-top-color: var(--border-primary) !important;
      }

      [data-theme="light"] .border-b.border-gray-700 {
        border-bottom-color: var(--border-primary) !important;
      }

      /* ===== SCROLLBAR PARA CONTENIDO ===== */

      [data-theme="light"] main.overflow-auto::-webkit-scrollbar-track {
        background: var(--bg-secondary);
      }

      [data-theme="light"] main.overflow-auto::-webkit-scrollbar-thumb {
        background: var(--border-primary);
      }

      [data-theme="light"] main.overflow-auto::-webkit-scrollbar-thumb:hover {
        background: var(--text-secondary);
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
  }

  private removerEstilosClaro(): void {
    const existingStyle = document.getElementById('tema-claro-estilos');
    if (existingStyle) {
      existingStyle.remove();
    }
  }

  // Método para debug
  obtenerEstadoTema(): { isDark: boolean; userId: string | null } {
    return {
      isDark: this.isDark(),
      userId: this.currentUserId
    };
  }

  // Resetear tema a preferencias del sistema
  resetearTema(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.TEMA_KEY);
      if (this.currentUserId) {
        const userThemeKey = this.USER_TEMA_KEY + this.currentUserId;
        localStorage.removeItem(userThemeKey);
      }
      this.isDark.set(this.getTemaInicial());
    }
  }

  // Nuevos métodos para gestión avanzada de temas
  getTemasDisponibles(): Array<{id: string, nombre: string, descripcion: string}> {
    return [
      { id: 'claro', nombre: 'Modo Claro', descripcion: 'Tema claro con colores vibrantes' },
      { id: 'oscuro', nombre: 'Modo Oscuro', descripcion: 'Tema oscuro para uso nocturno' },
      { id: 'auto', nombre: 'Automático', descripcion: 'Se adapta a la preferencia del sistema' }
    ];
  }

  // Método para aplicar tema específico
  aplicarTemaEspecifico(temaId: string): void {
    switch (temaId) {
      case 'claro':
        this.setTemaClaro();
        break;
      case 'oscuro':
        this.setTemaOscuro();
        break;
      case 'auto':
        this.resetearTema();
        break;
    }
  }
}