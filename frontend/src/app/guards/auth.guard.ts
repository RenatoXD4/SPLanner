import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth-service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  canActivate(): boolean {
    // En el servidor, siempre permite el acceso (la protección real ocurre en el cliente)
    if (!this.isBrowser) {
      return true;
    }

    // En el cliente, verifica la autenticación
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
