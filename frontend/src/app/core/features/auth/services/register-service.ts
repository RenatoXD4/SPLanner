import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../../Environments/environment';

import { EmailVerificationService } from './email-verification.service';

interface RegisterResponse {
  message: string;
  user: {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    createdAt: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private readonly API_URL = `${environment.apiUrl}/usuarios`;

  userForm: FormGroup;
  email: FormControl;
  password: FormControl;
  name: FormControl;
  apellido: FormControl;

  emailTouched = signal(false);
  passwordTouched = signal(false);
  nameTouched = signal(false);
  apellidoTouched = signal(false);

  isLoading = signal(false);
  isSuccess = signal(false);
  errorMessage = signal('');
  emailExistsError = signal(false);
  isVerificationSent = signal(false);

  private readonly EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private readonly PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
  private readonly NAME_PATTERN = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,49}(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,49})*$/;

  constructor(
    private http: HttpClient,
    private router: Router,
    private emailVerificationService: EmailVerificationService
  ) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.EMAIL_PATTERN)
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(this.PASSWORD_PATTERN)
    ]);

    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(this.NAME_PATTERN)
    ]);

    this.apellido = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(this.NAME_PATTERN),
      this.sameNameValidator.bind(this)
    ]);

    this.userForm = new FormGroup({
      email: this.email,
      password: this.password,
      name: this.name,
      apellido: this.apellido
    });

    this.email.valueChanges.subscribe(() => {
      this.emailExistsError.set(false);
    });
  }

  private sameNameValidator(control: FormControl): { [key: string]: boolean } | null {
    if (this.name && this.apellido && this.name.value === this.apellido.value) {
      return { 'sameName': true };
    }
    return null;
  }

  showEmailError(): boolean {
    return (this.emailTouched() && this.email.invalid) || this.emailExistsError();
  }

  showPasswordError(): boolean {
    return this.passwordTouched() && this.password.invalid;
  }

  showNameError(): boolean {
    return this.nameTouched() && this.name.invalid;
  }

  showApellidoError(): boolean {
    return this.apellidoTouched() && this.apellido.invalid;
  }

  getEmailErrorMessage(): string {
    if (this.emailExistsError()) {
      return 'Este correo electrónico ya está registrado';
    } else if (this.email.errors?.['required']) {
      return 'Por favor ingresa tu correo electrónico';
    } else if (this.email.errors?.['pattern']) {
      return 'Formato de email inválido. Debe contener @ y un dominio válido';
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    if (this.password.errors?.['required']) {
      return 'Por favor ingresa tu contraseña';
    } else if (this.password.errors?.['minlength']) {
      return 'La contraseña debe tener al menos 8 caracteres';
    } else if (this.password.errors?.['pattern']) {
      return 'Debe contener: mayúsculas, minúsculas, números y caracteres especiales (@$!%*?&.)';
    }
    return '';
  }

  getNameErrorMessage(): string {
    if (this.name.errors?.['required']) {
      return 'Por favor ingresa tu nombre';
    } else if (this.name.errors?.['minlength']) {
      return 'El nombre debe tener al menos 2 caracteres';
    } else if (this.name.errors?.['pattern']) {
      return 'El nombre debe comenzar con mayúscula y solo contener letras';
    }
    return '';
  }

  getApellidoErrorMessage(): string {
    if (this.apellido.errors?.['required']) {
      return 'Por favor ingresa tu apellido';
    } else if (this.apellido.errors?.['minlength']) {
      return 'El apellido debe tener al menos 2 caracteres';
    } else if (this.apellido.errors?.['pattern']) {
      return 'El apellido debe comenzar con mayúscula y solo contener letras';
    } else if (this.apellido.errors?.['sameName']) {
      return 'El apellido no puede ser igual al nombre';
    }
    return '';
  }

  markFieldAsTouched(fieldName: string): void {
    switch (fieldName) {
      case 'email':
        this.emailTouched.set(true);
        break;
      case 'password':
        this.passwordTouched.set(true);
        break;
      case 'name':
        this.nameTouched.set(true);
        break;
      case 'apellido':
        this.apellidoTouched.set(true);
        break;
    }
  }

 async sendVerificationEmail(): Promise<boolean> {
  if (this.userForm.valid) {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const userData = {
      nombre: this.name.value,
      apellido: this.apellido.value,
      email: this.email.value,
      password: this.password.value
    };

    const verificationToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

    // GUARDAR EN LOCALSTORAGE
    const pendingUser = {
      ...userData,
      verificationToken,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(`pending_${verificationToken}`, JSON.stringify(pendingUser));

  

    try {
      const result = await this.emailVerificationService.sendVerificationEmail(
        userData.email,
        userData.nombre,
        verificationToken
      );

      this.isLoading.set(false);

      if (result.success) {
        this.isVerificationSent.set(true);
        return true;
      } else {
        this.errorMessage.set(result.message || 'Error al enviar correo de verificación');
        localStorage.removeItem(`pending_${verificationToken}`);
        return false;
      }
    } catch (error) {
      this.isLoading.set(false);
      this.errorMessage.set('Error al enviar correo de verificación');
      localStorage.removeItem(`pending_${verificationToken}`);
      return false;
    }
  }
  return false;
}

  registerUser() {
    if (this.userForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');
      this.emailExistsError.set(false);

      const userData = {
        nombre: this.name.value,
        apellido: this.apellido.value,
        email: this.email.value,
        password: this.password.value
      };

      return this.http.post<RegisterResponse>(`${this.API_URL}/register`, userData)
        .pipe(
          tap(response => {
            console.log('Usuario registrado exitosamente:', response);
            this.isSuccess.set(true);
            this.isLoading.set(false);
            this.userForm.reset();
            this.resetTouchedStates();
          }),
          catchError(error => {
            console.error('Error completo en el registro:', error);
            this.isLoading.set(false);
            this.isSuccess.set(false);

            const isEmailExistsError = this.detectEmailExistsError(error);
            if (isEmailExistsError) {
              this.emailExistsError.set(true);
              this.emailTouched.set(true);
            } else {
              const errorMessage = this.getErrorMessage(error);
              this.errorMessage.set(errorMessage);
            }

            this.playShakeAnimation();
            return throwError(() => error);
          })
        );
    } else {
      this.handleSubmit();
      return throwError(() => new Error('Formulario inválido'));
    }
  }

  private detectEmailExistsError(error: any): boolean {
    const errorText = this.extractErrorText(error.error);
    const emailExistsMessages = [
      'El usuario ya existe con este email',
      'el usuario ya existe con este email',
      'usuario ya existe',
      'email ya existe'
    ];

    const isEmailError = emailExistsMessages.some(message =>
      errorText.includes(message)
    );

    return isEmailError;
  }

  private extractErrorText(errorObj: any): string {
    if (!errorObj) return '';

    if (typeof errorObj === 'string') {
      return errorObj;
    }

    const possibleFields = ['error', 'message', 'detail', 'reason', 'description'];
    for (const field of possibleFields) {
      if (errorObj[field] && typeof errorObj[field] === 'string') {
        return errorObj[field];
      }
    }

    return '';
  }

  private getErrorMessage(error: any): string {
    const possibleMessages = [
      error.error?.error,
      error.error?.message,
      error.error?.detail,
      error.error?.reason,
      error.message,
      error.statusText
    ];

    const message = possibleMessages.find(msg => msg && typeof msg === 'string');
    return message || 'Error de conexión con el servidor';
  }

  handleSubmit(): void {
    this.emailTouched.set(true);
    this.passwordTouched.set(true);
    this.nameTouched.set(true);
    this.apellidoTouched.set(true);

    if (this.userForm.valid) {
      // Lógica de envío
    } else {
      console.log('Formulario inválido');
      this.playShakeAnimation();
    }
  }

  private resetTouchedStates(): void {
    this.emailTouched.set(false);
    this.passwordTouched.set(false);
    this.nameTouched.set(false);
    this.apellidoTouched.set(false);
    this.emailExistsError.set(false);
  }

  public playShakeAnimation(): void {
    const form = document.querySelector('form');
    if (form) {
      form.classList.add('animate-shake');
      setTimeout(() => {
        form.classList.remove('animate-shake');
      }, 500);
    }
  }
}
