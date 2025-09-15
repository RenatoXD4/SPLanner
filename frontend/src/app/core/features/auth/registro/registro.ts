
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormButton } from '../../../shared/ui/buttons/form-button/form-button';
import { RegistroService } from '../services/register-service';


@Component({
  selector: 'app-registro',
  imports: [RouterModule, ReactiveFormsModule, FormButton],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  // Inyectar el servicio
  constructor(public registroService: RegistroService) {}

  // Métodos que delegan al servicio
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
    console.log("Click en registrarse");
    this.handleSubmit();
  }
}
