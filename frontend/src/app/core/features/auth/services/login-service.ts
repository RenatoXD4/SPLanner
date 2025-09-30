import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
userForm: FormGroup;
  email: FormControl;
  password: FormControl;

  // Signals para controlar la visibilidad de errores
  emailTouched = signal(false);
  passwordTouched = signal(false);

  // Patrón regex para validar formato de email
  private readonly EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor() {
    // Validaciones para email: requerido y formato válido
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.EMAIL_PATTERN)
    ]);

    // Validación para password: solo requerido
    this.password = new FormControl('', [Validators.required]);

    this.userForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  // Métodos para mostrar errores
  showEmailError(): boolean {
    return this.emailTouched() && this.email.invalid && (
      this.email.errors?.['required'] ||
      this.email.errors?.['pattern']
    );
  }

  showPasswordError(): boolean {
    return this.passwordTouched() && this.password.invalid && this.password.errors?.['required'];
  }

  // Método para obtener el mensaje de error específico del email
  getEmailErrorMessage(): string {
    if (this.email.errors?.['required']) {
      return 'Por favor ingresa tu correo electrónico';
    } else if (this.email.errors?.['pattern']) {
      return 'Formato de email inválido. Debe contener @ y un dominio válido';
    }
    return '';
  }

  // Marcar campo como touched
  markFieldAsTouched(fieldName: string): void {
    if (fieldName === 'email') {
      this.emailTouched.set(true);
    } else if (fieldName === 'password') {
      this.passwordTouched.set(true);
    }
  }

  handleSubmit(): void {
    this.emailTouched.set(true);
    this.passwordTouched.set(true);

    if (this.userForm.valid) {
      console.log('Formulario válido:', this.userForm.value);
    } else {
      console.log('Formulario inválido');

      // Animación de shake para indicar error
      this.playShakeAnimation();
    }
  }

  private playShakeAnimation(): void {
    const form = document.querySelector('form');
    if (form) {
      form.classList.add('animate-shake');
      setTimeout(() => {
        form.classList.remove('animate-shake');
      }, 500);
    }
  }

  //Formularios, validaciones de formularios
  //Iniciar sesion llamando al servicio de AuthService
}
