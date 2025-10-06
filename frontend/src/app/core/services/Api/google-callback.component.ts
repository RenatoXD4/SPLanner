// google-callback.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-google-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-900">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-white text-lg">Procesando autenticación con Google...</p>
      </div>
    </div>
  `
})
export class GoogleCallbackComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.handleGoogleCallback();
  }

  private handleGoogleCallback(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const error = params['error'];

      if (token) {
        // Procesar token exitoso
        this.authService.handleGoogleCallback(token);
      } else if (error) {
        // Manejar error
        console.error('Error en autenticación Google:', error);
        this.router.navigate(['/login'], {
          queryParams: { error }
        });
      } else {
        // No hay token ni error, redirigir al login
        this.router.navigate(['/login']);
      }
    });
  }
}
