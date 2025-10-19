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
  userId?: string;
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

      console.log('✅ initiateRecovery completado:', response.success);
      return response;

    } catch (error) {
      console.error('❌ Error en initiateRecovery:', error);

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

      console.log('✅ Código enviado y guardado');

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
      console.log('📡 Enviando solicitud a backend...');

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
        console.error('❌ Error en respuesta del servidor:', response.status, response.statusText);
        return false;
      }

      const data: CheckEmailResponse = await response.json();

      return data.exists === true;

    } catch (error: any) {
      console.error('❌ Error en checkUserExists:', error);

      if (error.name === 'AbortError') {
        console.error('⏰ Timeout - El backend no respondió a tiempo');
      } else if (error.status === 0) {
        console.error('🔌 Error de conexión - Backend no disponible');
      } else if (error.status === 404) {
        console.error('🔍 Endpoint no encontrado - Verifica la URL');
      }

      return false;
    }
  }

  async verifyCode(email: string, code: string): Promise<RecoveryResponse> {
    console.log('🔍 Verificando código para:', email);

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
    console.log('🔄 resetPassword iniciado para:', email);

    // Primero verificar que el código sea válido
    const verification = await this.verifyCode(email, code);

    if (!verification.success) {
      return verification;
    }

    try {
      // Ahora enviar la nueva contraseña al backend para actualizarla
      const updateResult = await this.updatePasswordInBackend(email, newPassword);

      if (updateResult.success) {
        // Limpiar datos de recuperación solo si fue exitoso
        this.clearRecoveryData();
        return {
          success: true,
          message: 'Contraseña cambiada exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.'
        };
      } else {
        return updateResult;
      }

    } catch (error) {
      console.error('❌ Error en resetPassword:', error);
      return {
        success: false,
        message: 'Error al actualizar la contraseña. Por favor intenta nuevamente.'
      };
    }
  }

  // Nuevo método para actualizar la contraseña en el backend
  private async updatePasswordInBackend(email: string, newPassword: string): Promise<RecoveryResponse> {
    try {
      console.log('📡 Enviando nueva contraseña al backend...');

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      // Usar el endpoint específico para reset de contraseña
      const response = await fetch('http://localhost:9001/api-v1/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          newPassword: newPassword
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error('❌ Error del servidor:', response.status, response.statusText);
        return {
          success: false,
          message: `Error del servidor: ${response.status} ${response.statusText}`
        };
      }

      const data = await response.json();

      return {
        success: data.success,
        message: data.message || (data.success ? 'Contraseña actualizada exitosamente' : 'Error al actualizar la contraseña')
      };

    } catch (error: any) {
      console.error('❌ Error en updatePasswordInBackend:', error);

      if (error.name === 'AbortError') {
        return {
          success: false,
          message: 'El servidor no respondió a tiempo. Por favor intenta nuevamente.'
        };
      }

      return {
        success: false,
        message: 'Error de conexión con el servidor. Verifica tu conexión a internet.'
      };
    }
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
      expires: Date.now() + 15 * 60 * 1000 // 15 minutos expira el código
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
