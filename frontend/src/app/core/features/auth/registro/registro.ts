import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormButton } from '../../../shared/ui/buttons/form-button/form-button';
import { RegistroService } from '../services/register-service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../Environments/environment';

@Component({
  selector: 'app-registro',
  imports: [RouterModule, ReactiveFormsModule, FormButton],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro implements OnInit {
  showPassword: boolean = false;
  showSuccessPopup: boolean = false;
  isRedirecting: boolean = false;
  isVerifying: boolean = false;
  isVerificationSuccess: boolean = false;
  verificationError: string = '';

  // Lista de requisitos para la contraseña
  passwordRequirements = [
    '8 caracteres',
    '1 letra mayúscula',
    '1 letra minúscula',
    '1 número',
    '1 carácter especial'
  ];

  constructor(
    public registroService: RegistroService,
    public router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // Usar ActivatedRoute para obtener el token
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.verifyAccount(token);
      }
    });
  }

  public getVerificationTokenFromUrl(): string | null {
    let token: string | null = null;

    // Suscribirse a los query params de forma síncrona
    this.route.queryParams.subscribe(params => {
      token = params['token'] || null;
    }).unsubscribe(); // Nos desuscribimos inmediatamente después de obtener el valor

    return token;
  }

  verifyAccount(token: string) {
    this.isVerifying = true;
    this.verificationError = '';

    // Verificar si estamos en el cliente antes de usar localStorage
    if (typeof localStorage === 'undefined') {
      this.verificationError = 'No se puede verificar en este entorno';
      this.isVerifying = false;
      return;
    }

    const pendingUserStr = localStorage.getItem(`pending_${token}`);

    if (!pendingUserStr) {
      this.verificationError = 'Token de verificación inválido o expirado';
      this.isVerifying = false;
      return;
    }

    const pendingUser = JSON.parse(pendingUserStr);

    this.http.post(`${environment.apiUrl}/usuarios/register`, {
      nombre: pendingUser.nombre,
      apellido: pendingUser.apellido,
      email: pendingUser.email,
      password: pendingUser.password
    }).subscribe({
      next: (response: any) => {
        console.log('Cuenta verificada exitosamente:', response);
        this.isVerifying = false;
        this.isVerificationSuccess = true;

        // Limpiar datos temporales
        localStorage.removeItem(`pending_${token}`);

        // Redirigir al login después de 3 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        console.error(' Error en verificación:', error);
        this.isVerifying = false;

        // Manejar diferentes tipos de errores
        if (error.status === 409) {
          this.verificationError = 'Este correo electrónico ya está registrado';
        } else if (error.status === 400) {
          this.verificationError = 'Datos de registro inválidos';
        } else if (error.status === 0) {
          this.verificationError = 'Error de conexión con el servidor. Verifica que el backend esté ejecutándose.';
        } else {
          this.verificationError = 'Error al crear la cuenta. Por favor intenta registrarte nuevamente.';
        }

        console.error(' Detalles del error:', error);
      }
    });
  }

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

  async onRegister(): Promise<void> {
  this.registroService.handleSubmit();

  if (this.registroService.userForm.valid) {
    // Primero verificamos si el correo existe antes de enviar la verificación
    const emailExists = await this.checkEmailExists();

    if (emailExists) {
      this.registroService.emailExistsError.set(true);
      this.registroService.emailTouched.set(true);
      this.registroService.playShakeAnimation();
      return;
    }

    // Si el correo no existe, procedemos con el envío de verificación
    const success = await this.registroService.sendVerificationEmail();
    if (!success) {
      this.registroService.playShakeAnimation();
    }
  } else {
    this.registroService.playShakeAnimation();
  }
}
private async checkEmailExists(): Promise<boolean> {
  const email = this.registroService.email.value;

  if (!email) return false;

  try {

    const response = await fetch(`${environment.apiUrl}/usuarios/check-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email })
    });

    if (response.ok) {
      const result = await response.json();
      return result.exists;
    }

    return false;
  } catch (error) {
    console.error('Error verificando email:', error);
    return false;
  }
}




  goBackToForm(): void {
    this.registroService.isVerificationSent.set(false);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  get isLoading(): boolean {
    return this.registroService.isLoading();
  }

  get errorMessage(): string {
    return this.registroService.errorMessage();
  }

  get isVerificationSent(): boolean {
    return this.registroService.isVerificationSent();
  }
}
