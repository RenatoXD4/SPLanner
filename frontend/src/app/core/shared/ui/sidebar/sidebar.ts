import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,    // Filtro de columnas
  transferArrayItem,  // Filtro de columnas
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { ElementRef, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard' },
    { label: 'Proyecto', icon: 'project' },
    { label: 'Equipo', icon: 'team' },
    { label: 'Recientes', icon: 'recent' },
    { label: 'Home', icon: 'home' },
    { label: 'Calendario', icon: 'calendar' },
    { label: 'Ajustes', icon: 'settings' },
  ];

  activeItem = 'Dashboard';
  sidebarDesktopOpen = true;
  sidebarMobileOpen = false;
  sidebarMobileVisible = false;
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  toggleAjustes() {

  }

  openSidebarMobile() {
    this.sidebarMobileVisible = true;
    setTimeout(() => {
      this.sidebarMobileOpen = true;
    }, 10);
  }

  closeSidebarMobile() {
    this.sidebarMobileOpen = false;
  }

  onTransitionEnd(event: TransitionEvent) {
    if (!this.sidebarMobileOpen && event.propertyName === 'transform') {
      this.sidebarMobileVisible = false;
    }
  }
  selectItemMobile(label: string) {
    this.activeItem = label;
    this.closeSidebarMobile();
  }

  selectItem(label: string) {
    this.activeItem = label;

    // Navegación según el item seleccionado
    switch(label) {
      case 'Dashboard':
        this.router.navigate(['/Menu']);
        break;
      case 'Proyecto':
        // Navegar a proyectos
        break;
      case 'Home':
        this.router.navigate(['/']);
        break;
      // Agrega más casos según necesites
    }
  }

  logout() {
    if (this.isBrowser) {
      console.log('errando sesión...');

      // Limpia todo el localStorage (token y userData)
      this.authService.logout();

      console.log('Sesión cerrada correctamente');

      // Redirige al login
      this.router.navigate(['/login']);
    }
  }

  // Método para obtener el nombre del usuario actual (opcional)
  getCurrentUserName(): string {
    if (this.isBrowser) {
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          return user.nombre || 'Usuario';
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
    return 'Usuario';
  }

  // Método para verificar si hay usuario logueado (opcional)
  isUserLoggedIn(): boolean {
    return this.isBrowser && !!localStorage.getItem('authToken');
  }

  // Método para obtener el SVG del icono
  getIconSvg(iconName: string): string {
    const icons: { [key: string]: string } = {
      dashboard: `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10" />
        </svg>
      `,
      project: `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      `,
      team: `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      `,
      recent: `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `,
      home: `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      `,
      calendar: `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      `,
      settings: `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      `
    };
    return icons[iconName] || `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    `;
  }
}
