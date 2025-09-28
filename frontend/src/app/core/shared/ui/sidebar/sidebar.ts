import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,    // Filtro de columnas
  transferArrayItem,  // Filtro de columnas
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

import { ElementRef, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';  // <-- Importa FormsModule


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


  activeItem = 'Inicio';
  sidebarDesktopOpen = true;
  sidebarMobileOpen = false;

  toggleAjustes() {
    // lógica para mostrar configuración
    console.log('Abrir ajustes');
  }

  sidebarMobileVisible = false;

  openSidebarMobile() {
    this.sidebarMobileVisible = true;
    // Para que la clase 'open' se active después de que el DOM esté visible (para la animación)
    setTimeout(() => {
      this.sidebarMobileOpen = true;
    }, 10);
  }

  closeSidebarMobile() {
    this.sidebarMobileOpen = false;
  }

  // Esto detecta cuando termina la transición para ocultar el sidebar
  onTransitionEnd(event: TransitionEvent) {
    if (!this.sidebarMobileOpen && event.propertyName === 'transform') {
      this.sidebarMobileVisible = false;
    }
  }

  selectItemMobile(label: string) {
    this.activeItem = label;
    this.closeSidebarMobile();
  }

  logout() {
    // Limpia el token o datos de sesión guardados (puedes adaptar según tu app)


  }


}
