
import { Injectable } from '@angular/core';

import emailjs from '@emailjs/browser';

export interface EmailParams {
  email: string;
  verification_code: string;
  user_name?: string;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  // TUS CREDENCIALES - REEMPLAZA CON LAS TUYAS
  private serviceId = 'service_38kl5yn';
  private templateId = 'template_3gt9gvk';
  private publicKey = 'qagJDWc32IzRRf0Lv';

  constructor() {
    // Inicializar EmailJS con tu public key
    emailjs.init(this.publicKey);
  }

 async sendRecoveryCode(email: string, code: string): Promise<{success: boolean; message?: string}> {
  const templateParams: EmailParams = {
    email: email,
    verification_code: code,
    user_name: email.split('@')[0]
  };

  try {
    const response = await emailjs.send(this.serviceId, this.templateId, templateParams);
    console.log('Correo enviado exitosamente');
    return {
      success: true,
      message: 'Se ha enviado un código de verificación a tu correo electrónico'
    };
  } catch (error) {
    console.error('Error enviando correo:', error);
    return {
      success: false,
      message: 'Error al enviar el código. Por favor intenta nuevamente.'
    };
  }
}
}
