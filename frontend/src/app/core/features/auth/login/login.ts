import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormButton } from '../../../shared/ui/buttons/form-button/form-button';
import { LoginService } from '../services/login-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, FormButton],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // Inyectar el servicio
  constructor(public loginService: LoginService) {}

  // Método para manejar el login
  onLogin(): void {
    console.log("Click en login");
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
}
