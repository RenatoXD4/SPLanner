
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PasswordRecoveryService } from '../services/password-recovery.service';

@Component({
  selector: 'app-recuperar',
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './recuperar.html',
  styleUrl: './recuperar.css'
})
export class Recuperar {
  private recoveryService = inject(PasswordRecoveryService);
  private cdRef = inject(ChangeDetectorRef);

  // Estados del flujo
  currentStep: 'email' | 'code' | 'password' = 'email';
  userEmail: string = '';

  // Formularios
  emailForm: FormGroup;
  codeForm: FormGroup;
  passwordForm: FormGroup;

  // Estados de UI
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';
  router: any;

  constructor() {
    // Tus formularios existentes...
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    this.codeForm = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
    });

    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });
  }

  // Validador personalizado para contraseñas
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { 'passwordMismatch': true };
    }
    return null;
  }

  // Paso 1: Verificar email y enviar código
  async handleEmailSubmit(): Promise<void> {
    if (this.emailForm.valid) {
      this.setLoadingState(true);
      this.errorMessage = '';
      this.successMessage = '';

      const email = this.emailForm.get('email')?.value;

      try {
        const response = await this.recoveryService.initiateRecovery(email);



        if (response.success) {
          this.userEmail = email;
          this.currentStep = 'code';
          this.successMessage = response.message;
          this.emailForm.reset();
        } else {
          this.errorMessage = response.message;
        }
      } catch (error: any) {
        this.errorMessage = error?.message || 'Error de conexión. Por favor intenta nuevamente.';
      } finally {
        this.setLoadingState(false);
        // Forzar detección de cambios
        this.cdRef.detectChanges();
      }
    } else {
      this.markFormGroupTouched(this.emailForm);
    }
  }

  // Paso 2: Verificar código
  async handleCodeSubmit(): Promise<void> {
    if (this.codeForm.valid) {
      this.setLoadingState(true);
      this.errorMessage = '';

      const code = this.codeForm.get('code')?.value;

      try {
        console.log(' Verificando código:', code);
        const response = await this.recoveryService.verifyCode(this.userEmail, code);

        if (response.success) {
          this.currentStep = 'password';
          this.successMessage = response.message;
        } else {
          this.errorMessage = response.message;
        }
      } catch (error: any) {
        console.error('Error en handleCodeSubmit:', error);
        this.errorMessage = error?.message || 'Error de conexión. Por favor intenta nuevamente.';
      } finally {
        this.setLoadingState(false);
        this.cdRef.detectChanges();
      }
    } else {
      this.markFormGroupTouched(this.codeForm);
    }
  }

  // Paso 3: Cambiar contraseña
  async handlePasswordSubmit(): Promise<void> {
    if (this.passwordForm.valid) {
      this.setLoadingState(true);
      this.errorMessage = '';

      const code = this.codeForm.get('code')?.value;
      const password = this.passwordForm.get('password')?.value;

      try {
        console.log('Cambiando contraseña para:', this.userEmail);
        const response = await this.recoveryService.resetPassword(this.userEmail, code, password);

        if (response.success) {
          this.successMessage = response.message;
          // Redirigir al login después de 3 segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
            console.log('Redirigiendo al login...');
          }, 3000);
        } else {
          this.errorMessage = response.message;
        }
      } catch (error: any) {
        console.error('Error en handlePasswordSubmit:', error);
        this.errorMessage = error?.message || 'Error de conexión. Por favor intenta nuevamente.';
      } finally {
        this.setLoadingState(false);
        this.cdRef.detectChanges();
      }
    } else {
      this.markFormGroupTouched(this.passwordForm);
    }
  }

  private setLoadingState(loading: boolean): void {
    this.isLoading = loading;
    // Forzar detección de cambios inmediatamente
    this.cdRef.detectChanges();
  }

  // Métodos auxiliares existentes
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Volver al paso anterior
  goBack(): void {
    if (this.currentStep === 'code') {
      this.currentStep = 'email';
      this.userEmail = '';
    } else if (this.currentStep === 'password') {
      this.currentStep = 'code';
    }
    this.errorMessage = '';
    this.successMessage = '';
    this.cdRef.detectChanges();
  }

  // Getters para mostrar errores
  showEmailError(): boolean {
    const emailControl = this.emailForm.get('email');
    return emailControl ? emailControl.invalid && emailControl.touched : false;
  }

  showCodeError(): boolean {
    const codeControl = this.codeForm.get('code');
    return codeControl ? codeControl.invalid && codeControl.touched : false;
  }

  showPasswordError(): boolean {
    const passwordControl = this.passwordForm.get('password');
    return passwordControl ? passwordControl.invalid && passwordControl.touched : false;
  }

  showConfirmPasswordError(): boolean {
    const confirmControl = this.passwordForm.get('confirmPassword');
    return confirmControl ? confirmControl.invalid && confirmControl.touched : false;
  }

  showPasswordMismatchError(): boolean {
    const hasError = this.passwordForm.hasError('passwordMismatch');
    const isTouched = this.passwordForm.get('confirmPassword')?.touched;
    return !!(hasError && isTouched);
  }
}
