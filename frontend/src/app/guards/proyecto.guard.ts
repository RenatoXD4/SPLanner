import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth-service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProyectoGuard implements CanActivate {
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  canActivate(): boolean {
    // En el servidor, permite el acceso
    if (!this.isBrowser) {
      return true;
    }

    // Verificar autenticación primero
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Verificar que hay un proyecto seleccionado válido para este usuario
    const proyectoId = this.getProyectoActual();

    if (!proyectoId) {
      this.router.navigate(['/proyectos']);
      return false;
    }

    return true;
  }

  // HACER PÚBLICAS estas funciones para que otros componentes puedan usarlas
  public getProyectoActual(): string | null {
    const userId = this.authService.getCurrentUserId();
    if (!userId) return null;

    // Guardar el proyecto por usuario para evitar conflictos
    const proyectoId = localStorage.getItem(`proyecto_${userId}`);

    // También mantener compatibilidad con el método antiguo
    if (!proyectoId) {
      const proyectoAntiguo = localStorage.getItem('proyectoIdActual');
      if (proyectoAntiguo) {
        // Migrar al nuevo formato
        this.setProyectoActual(proyectoAntiguo);
        return proyectoAntiguo;
      }
    }

    return proyectoId;
  }

  public setProyectoActual(proyectoId: string): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      localStorage.setItem(`proyecto_${userId}`, proyectoId);
      // Mantener compatibilidad temporal
      localStorage.setItem('proyectoIdActual', proyectoId);
    }
  }

  public clearProyectoActual(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      localStorage.removeItem(`proyecto_${userId}`);
    }
    localStorage.removeItem('proyectoIdActual');
  }
}
