// registro.service.ts
import { Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  userForm: FormGroup;
  email: FormControl;
  password: FormControl;
  name: FormControl;
  apellido: FormControl;

  // Signals para controlar la visibilidad de errores
  emailTouched = signal(false);
  passwordTouched = signal(false);
  nameTouched = signal(false);
  apellidoTouched = signal(false);

  // Patrones regex para validaciones
  private readonly EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private readonly PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
  private readonly NAME_PATTERN = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,49}(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,49})*$/;

  constructor() {
    // Validaciones para email
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(this.EMAIL_PATTERN)
    ]);

    // Validaciones para password
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(this.PASSWORD_PATTERN)
    ]);

    // Validaciones para nombre
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(this.NAME_PATTERN)
    ]);

    // Validaciones para apellido
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
  }

  // Validador personalizado para evitar que nombre y apellido sean iguales
  private sameNameValidator(control: FormControl): { [key: string]: boolean } | null {
    if (this.name && this.apellido && this.name.value === this.apellido.value) {
      return { 'sameName': true };
    }
    return null;
  }

  // Métodos para mostrar errores
  showEmailError(): boolean {
    return this.emailTouched() && this.email.invalid;
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

  // Métodos para obtener mensajes de error específicos
  getEmailErrorMessage(): string {
    if (this.email.errors?.['required']) {
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

  // Marcar campo como touched
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

  handleSubmit(): void {
    // Marcar todos los campos como touched al enviar
    this.emailTouched.set(true);
    this.passwordTouched.set(true);
    this.nameTouched.set(true);
    this.apellidoTouched.set(true);

    if (this.userForm.valid) {
      console.log('Formulario válido:', this.userForm.value);
    } else {
      console.log('Formulario inválido');
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
}
