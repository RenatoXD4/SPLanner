import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormButton } from '../../../shared/ui/buttons/form-button/form-button';
import { LoginService } from '../services/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, FormButton],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  showSuccessPopup: boolean = false;
  isRedirecting: boolean = false;
  countdown: number = 5; // 3 segundos antes de redirección

  // Inyectar el servicio
  constructor(public loginService: LoginService, private router: Router) {
    // Suscribirse al éxito del login
    this.loginService.setOnLoginSuccess(() => {
      this.showSuccess();
    });
  }

  // Método para manejar el login
  onLogin(): void {

    this.loginService.handleSubmit();
  }

  // Métodos de conveniencia para acceder a los métodos del servicio
  get userForm() {
    return this.loginService.userForm;
  }

  markFieldAsTouched(fieldName: string): void {
    this.loginService.markFieldAsTouched(fieldName);
  }

  showEmailError(): boolean {
    return this.loginService.showEmailError();
  }

  showPasswordError(): boolean {
    return this.loginService.showPasswordError();
  }

  getEmailErrorMessage(): string {
    return this.loginService.getEmailErrorMessage();
  }

  handleSubmit(): void {
    this.loginService.handleSubmit();
  }

  // Nuevos métodos para el estado de carga y errores
  isLoading(): boolean {
    return this.loginService.isLoading();
  }

  getErrorMessage(): string {
    return this.loginService.errorMessage();
  }

  // Métodos para el popup de éxito
  showSuccess(): void {
    this.showSuccessPopup = true;
    this.startCountdown();
  }

  startCountdown(): void {
    this.isRedirecting = true;
    this.countdown = 3;

    const countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        clearInterval(countdownInterval);
        this.redirectToDashboard();
      }
    }, 1000);
  }

  redirectToDashboard(): void {
    this.router.navigate(['/board']);
  }

  // Método para redirigir manualmente (si el usuario hace clic)
  redirectNow(): void {
    this.redirectToDashboard();
  }
}
