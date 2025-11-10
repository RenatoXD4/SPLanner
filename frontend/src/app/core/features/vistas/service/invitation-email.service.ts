import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface InvitationEmailParams {
  email: string;
  project_name: string;
  inviter_name: string;
  role_name: string;
  user_name?: string;
  project_description?: string;
  invitation_link?: string;
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class InvitationEmailService {
  private serviceId = 'service_38kl5yn';
  private templateId = 'template_xkud8cu';
  private publicKey = 'qagJDWc32IzRRf0Lv';

  constructor() {
    emailjs.init(this.publicKey);
  }

  async sendProjectInvitation(
    toEmail: string,
    projectName: string,
    inviterName: string,
    roleName: string,
    projectDescription?: string,
    invitationLink?: string
  ): Promise<{success: boolean; message?: string}> {

    // Validar datos requeridos
    if (!toEmail || !projectName || !inviterName) {
      return {
        success: false,
        message: 'Datos incompletos para enviar la invitación'
      };
    }


    const templateParams: InvitationEmailParams = {
      email: toEmail,
      project_name: projectName,
      inviter_name: inviterName,
      role_name: roleName,
      project_description: projectDescription || 'Proyecto colaborativo en SPlanner',
      invitation_link: invitationLink || 'http://localhost:4200/miembros',
      user_name: toEmail.split('@')[0] // Nombre temporal basado en el email
    };

    console.log('Enviando correo con parámetros:', templateParams);

    try {
      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log(' Correo enviado exitosamente:', response);
      return {
        success: true,
        message: `Invitación enviada a ${toEmail}`
      };
    } catch (error: any) {
      console.error('Error enviando invitación:', error);

      let errorMessage = `Error al enviar invitación a ${toEmail}. `;

      if (error.status === 422) {
        errorMessage += 'Error de validación - verifica las variables del template.';
      } else if (error.status === 400) {
        errorMessage += 'Solicitud incorrecta - verifica los parámetros.';
      } else {
        errorMessage += 'Por favor intenta nuevamente.';
      }

      return {
        success: false,
        message: errorMessage
      };
    }
  }

  async sendSimpleInvitation(
    toEmail: string,
    projectName: string,
    inviterName: string,
    roleName: string
  ): Promise<{success: boolean; message?: string}> {
    return this.sendProjectInvitation(
      toEmail,
      projectName,
      inviterName,
      roleName
    );
  }
}
