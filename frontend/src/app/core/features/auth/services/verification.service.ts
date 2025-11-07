import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../../Environments/environment';

interface VerificationResponse {
  success: boolean;
  message: string;
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private readonly API_URL = `${environment.apiUrl}/usuarios`;

  isVerificationSent = signal(false);
  isVerified = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // Verificar cuenta
  verifyAccount(token: string) {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const pendingUserStr = localStorage.getItem(`pending_${token}`);

    if (!pendingUserStr) {
      this.errorMessage.set('Token de verificación inválido o expirado');
      this.isLoading.set(false);
      return;
    }

    const pendingUser = JSON.parse(pendingUserStr);

    // Enviar datos al backend para crear el usuario
    this.http.post<VerificationResponse>(`${this.API_URL}/register`, {
      nombre: pendingUser.nombre,
      apellido: pendingUser.apellido,
      email: pendingUser.email,
      password: pendingUser.password
    }).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        this.isVerified.set(true);

        // Limpiar datos temporales
        localStorage.removeItem(`pending_${token}`);

        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.isLoading.set(false);
        this.errorMessage.set('Error al crear la cuenta. Por favor intenta registrarte nuevamente.');
        console.error('Error en verificación:', error);
      }
    });
  }

  // Verificar si hay un token en la URL (para el componente de verificación)
  checkVerificationToken(): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
  }
}
