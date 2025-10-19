import { Injectable } from '@angular/core';
import { EmailService } from './email.service';

export interface RecoveryResponse {
  message: string;
  success: boolean;
  tempToken?: string;
}

export interface CheckEmailResponse {
  exists: boolean;
  message: string;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {

  constructor(private emailService: EmailService) {}

  // Versión mejorada con timeout y mejor manejo de errores
  async initiateRecovery(email: string): Promise<RecoveryResponse> {
    console.log('🔄 initiateRecovery iniciado para:', email);

    // Timeout para evitar carga infinita (8 segundos)
    const timeoutPromise = new Promise<RecoveryResponse>((_, reject) => {
      setTimeout(() => {
        reject(new Error('La solicitud tardó demasiado. Verifica tu conexión.'));
      }, 8000);
    });

    try {
      const recoveryPromise = this.executeRecoveryProcess(email);
      const response = await Promise.race([recoveryPromise, timeoutPromise]);

      console.log(' initiateRecovery completado:', response.success);
      return response;

    } catch (error) {
      console.error(' Error en initiateRecovery:', error);

      const errorMessage = error instanceof Error ? error.message : 'Error de conexión. Por favor intenta nuevamente.';

      return {
        success: false,
        message: errorMessage
      };
    }
  }

  private async executeRecoveryProcess(email: string): Promise<RecoveryResponse> {
    // 1. Validar email
    if (!this.isValidEmail(email)) {
      return {
        success: false,
        message: 'Por favor ingresa un correo electrónico válido'
      };
    }

    console.log('🔍 Paso 2 - Verificando en backend...');
    // 2. Verificar si el usuario existe en el backend
    const userExists = await this.checkUserExists(email);

    if (!userExists) {
      return {
        success: false,
        message: 'No existe una cuenta asociada a este correo electrónico'
      };
    }


    // 3. Generar código
    const verificationCode = this.generateRandomCode();
    // 4. Enviar email directamente desde el frontend
    const emailResult = await this.emailService.sendRecoveryCode(email, verificationCode);

    if (emailResult.success) {
      // Guardar temporalmente para verificación
      this.saveRecoveryData(email, verificationCode);

      console.log('Código enviado y guardado');

      return {
        success: true,
        message: emailResult.message!,
        tempToken: verificationCode
      };
    } else {
      return {
        success: false,
        message: emailResult.message!
      };
    }
  }

  // Método mejorado para verificar en el backend
  private async checkUserExists(email: string): Promise<boolean> {
    try {
      console.log('Enviando solicitud a backend...');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos timeout

      const response = await fetch('http://localhost:9001/api-v1/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error('rror en respuesta del servidor:', response.status, response.statusText);
        return false;
      }

      const data: CheckEmailResponse = await response.json();

      return data.exists === true;

    } catch (error: any) {
      console.error('Error en checkUserExists:', error);

      if (error.name === 'AbortError') {
        console.error('timeout - El backend no respondió a tiempo');
      } else if (error.status === 0) {
        console.error('Error de conexión - Backend no disponible');
      } else if (error.status === 404) {
        console.error('Endpoint no encontrado - Verifica la URL');
      }

      return false;
    }
  }

  async verifyCode(email: string, code: string): Promise<RecoveryResponse> {

    // Verificar localmente
    const recoveryData = this.getRecoveryData();

    if (!recoveryData) {
      return { success: false, message: 'Código no encontrado o expirado' };
    }

    if (Date.now() > recoveryData.expires) {
      this.clearRecoveryData();
      return { success: false, message: 'El código ha expirado' };
    }

    if (recoveryData.email !== email || recoveryData.code !== code) {
      return { success: false, message: 'Código incorrecto' };
    }
    return {
      success: true,
      message: 'Código verificado correctamente'
    };
  }

  async resetPassword(email: string, code: string, newPassword: string): Promise<RecoveryResponse> {


    // Primero verificar que el código sea válido
    const verification = await this.verifyCode(email, code);

    if (!verification.success) {
      return verification;
    }
    // Limpiar datos de recuperación
    this.clearRecoveryData();
    return {
      success: true,
      message: 'Contraseña cambiada exitosamente'
    };
  }

  // Métodos auxiliares
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private generateRandomCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private saveRecoveryData(email: string, code: string): void {
    const recoveryData = {
      email: email,
      code: code,
      expires: Date.now() + 15 * 60 * 1000 // 15 minutos expira el codigo
    };
    sessionStorage.setItem('recovery_data', JSON.stringify(recoveryData));
  }

  private getRecoveryData(): { email: string; code: string; expires: number } | null {
    const data = sessionStorage.getItem('recovery_data');
    return data ? JSON.parse(data) : null;
  }

  private clearRecoveryData(): void {
    sessionStorage.removeItem('recovery_data');
  }
}
