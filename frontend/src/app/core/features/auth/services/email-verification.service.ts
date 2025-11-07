import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface VerificationEmailParams {
  email: string;
  verification_link: string;
  user_name: string;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class EmailVerificationService {
 private serviceId = 'service_yc22s5n';
  private templateId = 'template_5e12r6p';
  private publicKey = '9JgoKlzz0UguCslbG';


  constructor() {
    emailjs.init(this.publicKey);
  }


  async sendVerificationEmail(email: string, name: string, verificationToken: string): Promise<{success: boolean; message?: string}> {
    const verificationLink = `${window.location.origin}/registro?token=${verificationToken}`;

    const templateParams = {
      email: email,
      verification_link: verificationLink,
      user_name: name,
      from_name: 'SPlanner'
    };

    console.log('Enviando email con enlace:', verificationLink);

    try {
      const response = await emailjs.send(this.serviceId, this.templateId, templateParams);
      console.log(' Correo enviado exitosamente');
      return {
        success: true,
        message: 'Se ha enviado un correo de verificación a tu email'
      };
    } catch (error: any) {
      console.error(' Error EmailJS:', error);
      return {
        success: false,
        message: `Error: ${error.text || 'No se pudo enviar el correo'}`
      };
    }
  }
}
