import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormButton } from '../../../shared/ui/buttons/form-button/form-button';
import { LoginService } from '../services/login-service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, FormButton],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  showPassword: boolean = false;
  showSuccessPopup: boolean = false;
  isRedirecting: boolean = false;


  constructor(
    public loginService: LoginService,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginService.setOnLoginSuccess(() => {
        this.router.navigate(['/Menu']);
    });
  }

  //Método para login con Google
  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  //el resto de tus métodos existentes se mantienen igual
  onLogin(): void {
    console.log("Click en login");
    this.loginService.handleSubmit();
  }

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

  isLoading(): boolean {
    return this.loginService.isLoading();
  }

  getErrorMessage(): string {
    return this.loginService.errorMessage();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
