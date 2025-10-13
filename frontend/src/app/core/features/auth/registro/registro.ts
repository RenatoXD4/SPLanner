import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormButton } from '../../../shared/ui/buttons/form-button/form-button';
import { RegistroService } from '../services/register-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [RouterModule, ReactiveFormsModule, FormButton],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  showPassword: boolean = false;
  showSuccessPopup: boolean = false;
  isRedirecting: boolean = false;

  // Inyectar el servicio
  constructor(public registroService: RegistroService, private router: Router) {}

  get userForm() {
    return this.registroService.userForm;
  }

  markFieldAsTouched(fieldName: string): void {
    this.registroService.markFieldAsTouched(fieldName);
  }

  showEmailError(): boolean {
    return this.registroService.showEmailError();
  }

  showPasswordError(): boolean {
    return this.registroService.showPasswordError();
  }

  showNameError(): boolean {
    return this.registroService.showNameError();
  }

  showApellidoError(): boolean {
    return this.registroService.showApellidoError();
  }

  getEmailErrorMessage(): string {
    return this.registroService.getEmailErrorMessage();
  }

  getPasswordErrorMessage(): string {
    return this.registroService.getPasswordErrorMessage();
  }

  getNameErrorMessage(): string {
    return this.registroService.getNameErrorMessage();
  }

  getApellidoErrorMessage(): string {
    return this.registroService.getApellidoErrorMessage();
  }

  handleSubmit(): void {
    this.registroService.handleSubmit();
  }

  onRegister(): void {
    this.registroService.registerUser().subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
         this.router.navigate(['/Menu']);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Método para verificar si está cargando
  get isLoading() {
    return this.registroService.isLoading();
  }

  // Método para verificar si hay error general
  get errorMessage() {
    return this.registroService.errorMessage();
  }
}
