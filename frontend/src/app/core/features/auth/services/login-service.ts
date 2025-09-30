import { Injectable, signal, effect } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../services/auth-service';

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
  isLoading = signal(false);
  errorMessage = signal('');

  // Patrón regex para validar formato de email
  private readonly EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Callback para cuando el login es exitoso
  private onLoginSuccess: (() => void) | null = null;

  constructor(
    private authService: AuthService,

  ) {
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


    effect(() => {
      const loading = this.isLoading();
      if (loading) {
        this.userForm.disable();
      } else {
        this.userForm.enable();
      }
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
    this.errorMessage.set('');

    if (this.userForm.valid) {
      this.login();
    } else {

      this.playShakeAnimation();
    }
  }

  private login(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const credentials = {
      email: this.email.value,
      password: this.password.value
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading.set(false);

        // Emitir evento de éxito (el componente se suscribirá a esto)
        this.emitLoginSuccess();
      },
      error: (error) => {
        this.isLoading.set(false);


        // Mostrar mensaje de error al usuario
        if (error.error?.message) {
          this.errorMessage.set(error.error.message);
        } else {
          this.errorMessage.set('Error al iniciar sesión. Intenta nuevamente.');
        }

        this.playShakeAnimation();
      }
    });
  }

  // Método para emitir el éxito del login (el componente se suscribirá)
  private emitLoginSuccess(): void {
    if (this.onLoginSuccess) {
      this.onLoginSuccess();
    }
  }

  // Método para que el componente se suscriba al éxito del login
  setOnLoginSuccess(callback: () => void): void {
    this.onLoginSuccess = callback;
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

  // Método para resetear el formulario
  resetForm(): void {
    this.userForm.reset();
    this.emailTouched.set(false);
    this.passwordTouched.set(false);
    this.errorMessage.set('');
    this.isLoading.set(false);
  }

  // Método para verificar si el formulario está en estado de carga
  getFormDisabledState(): boolean {
    return this.isLoading();
  }
}
