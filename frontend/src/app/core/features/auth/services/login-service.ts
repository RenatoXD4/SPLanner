import { Injectable, signal, effect } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userForm: FormGroup;
  email: FormControl;
  password: FormControl;

  emailTouched = signal(false);
  passwordTouched = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  private readonly EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  private onLoginSuccess: (() => void) | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.EMAIL_PATTERN)
    ]);

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

  showEmailError(): boolean {
    return this.emailTouched() && this.email.invalid && (
      this.email.errors?.['required'] ||
      this.email.errors?.['pattern']
    );
  }

  showPasswordError(): boolean {
    return this.passwordTouched() && this.password.invalid && this.password.errors?.['required'];
  }

  getEmailErrorMessage(): string {
    if (this.email.errors?.['required']) {
      return 'Por favor ingresa tu correo electrónico';
    } else if (this.email.errors?.['pattern']) {
      return 'Formato de email inválido. Debe contener @ y un dominio válido';
    }
    return '';
  }

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

    console.log('Intentando login con:', credentials.email);

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        console.log('Login completado exitosamente');
      },
      error: (error) => {
        this.isLoading.set(false);
        console.error('Error en login:', error);

        if (error.status === 401) {
          this.errorMessage.set('Credenciales incorrectas. Verifica tu email y contraseña.');
        } else if (error.error?.message) {
          this.errorMessage.set(error.error.message);
        } else {
          this.errorMessage.set('Error al iniciar sesión. Intenta nuevamente.');
        }

        this.playShakeAnimation();
      }
    });
  }

  private emitLoginSuccess(): void {
    if (this.onLoginSuccess) {
      this.onLoginSuccess();
    }
  }

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

  resetForm(): void {
    this.userForm.reset();
    this.emailTouched.set(false);
    this.passwordTouched.set(false);
    this.errorMessage.set('');
    this.isLoading.set(false);
  }

  getFormDisabledState(): boolean {
    return this.isLoading();
  }
}
