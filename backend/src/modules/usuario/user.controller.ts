import { NextFunction, Request, Response } from "express";

import { UserService } from "./user.service.js";

const port = process.env.PORT ?? "9001";
const frontendPort = "4200";

// Interfaces para Google OAuth
interface GoogleTokens {
  access_token: string;
  expires_in: number;
  id_token?: string;
  scope: string;
  token_type: string;
}

interface GoogleUserInfo {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface RegisterRequestBody {
  apellido: string;
  email: string;
  nombre: string;
  password: string;
}

//reset password
interface ResetPasswordRequestBody {
  email: string;
  newPassword: string;
}

interface UserResponse {
  apellido: string;
  createdAt?: string;
  email: string;
  id: string;
  nombre: string;
  picture?: string;
  verified_email?: boolean;
}

export class UserController {
  constructor(private readonly userService: UserService) {}

  // Formulario de recuperar
  public async checkEmail(
    req: Request<unknown, unknown, { email: string }>,
    res: Response,
  ): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(400).json({ 
          exists: false,
          message: "Email es requerido",
          success: false
        });
        return;
      }

      console.log('Verificando email en BD:', email);
      
      const userExists = await this.userService.checkUserExists(email);
      
      console.log('Resultado verificación:', userExists ? 'EXISTE' : 'NO EXISTE');
      
      res.status(200).json({
        exists: userExists,
        message: userExists ? "Usuario encontrado" : "Usuario no encontrado",
        success: true
      });

    } catch (error) {
      console.error('Error en checkEmail:', error);
      res.status(500).json({
        exists: false,
        message: "Error interno del servidor",
        success: false
      });
    }
  }

  // Método de debug temporal
  public debugRedirectUri(req: Request, res: Response): void {
    const redirectUri = `http://localhost:${port}/api-v1/auth/google/callback`;
    res.json({
      encoded: encodeURIComponent(redirectUri),
      message: "Verifica que esta URI coincida EXACTAMENTE con Google Cloud Console",
      redirectUri: redirectUri
    });
  }

  // Obtener información del usuario actual
  public async getCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ 
          message: "Token de autenticación requerido",
          success: false 
        });
        return;
      }

      const token = authHeader.split(' ')[1];

      // Usar el token de Google para obtener información del usuario
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userInfoResponse.ok) {
        res.status(401).json({ 
          message: "Token de Google inválido o expirado",
          success: false 
        });
        return;
      }

      const googleUser = await userInfoResponse.json() as {
        email: string;
        family_name: string;
        given_name: string;
        id: string;
        name?: string;
        picture?: string;
        verified_email?: boolean;
      };

      console.log('Datos de Google recibidos:', googleUser.email);

      // Crear userResponse con tipos seguros
      const userResponse = {
        apellido: googleUser.family_name || 'Google',
        createdAt: new Date().toISOString(),
        email: googleUser.email,
        id: googleUser.id,
        nombre: googleUser.given_name || 'Usuario'
      };

      console.log('Enviando respuesta con usuario:', userResponse);
      
      res.status(200).json({
        message: "Usuario autenticado",
        success: true,
        user: userResponse
      });
      
    } catch (error) {
      console.error('Error en getCurrentUser:', error);
      next(error);
    }
  }

  // Obtener estadísticas del dashboard
  public async getDashboardStats(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({ 
          message: "ID de usuario es requerido",
          success: false 
        });
        return;
      }

      const dashboardData = await this.userService.getUserDashboardStats(userId);

      res.status(200).json({
        data: dashboardData,
        message: "Estadísticas del dashboard obtenidas correctamente",
        success: true
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('Usuario no encontrado')) {
        res.status(404).json({ 
          message: error.message,
          success: false 
        });
        return;
      }
      console.error('Error en getDashboardStats:', error);
      next(error);
    }
  }

  // Iniciar autenticación con Google
  public googleAuth(
    req: Request,
    res: Response
  ): void {
    const clientId = "886585953509-h00qukeb9m39eahdj9631dc2tl7g9jlu.apps.googleusercontent.com";
    const redirectUri = `http://localhost:${port}/api-v1/auth/google/callback`;
    const scope = "email profile";
    
    console.log(' URI de redirección que se está enviando a Google:');
    console.log('', redirectUri);
    
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=code` +
      `&scope=${encodeURIComponent(scope)}` +
      `&access_type=offline` +
      `&prompt=consent`;

    console.log('googleAuth llamado - redirigiendo a Google');
    res.redirect(authUrl);
  }

  // Callback de Google OAuth
  public async googleCallback(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { code } = req.query;

      if (!code) {
        console.error('No se recibió código de autorización');
        res.status(400).json({ message: "Código de autorización no proporcionado" });
        return;
      }

      const clientId = "886585953509-h00qukeb9m39eahdj9631dc2tl7g9jlu.apps.googleusercontent.com";
      const clientSecret = "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";
      const redirectUri = `http://localhost:${port}/api-v1/auth/google/callback`;

      // Intercambiar código por tokens de acceso
      const tokenParams = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code as string,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      });

      console.log('Solicitando tokens a Google...');
      
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        body: tokenParams,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error('Error de Google OAuth:', errorText);
        throw new Error(`Error al obtener tokens de Google: ${tokenResponse.status.toString()}`);
      }

      const tokens: GoogleTokens = await tokenResponse.json() as GoogleTokens;
      console.log('Tokens recibidos correctamente');

      // Obtener información del usuario de Google
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      });

      if (!userInfoResponse.ok) {
        const errorText = await userInfoResponse.text();
        console.error('Error obteniendo userinfo:', errorText);
        throw new Error('Error al obtener información del usuario de Google');
      }

      const googleUser: GoogleUserInfo = await userInfoResponse.json() as GoogleUserInfo;
      console.log('Información de usuario de Google:', googleUser.email);

      // Buscar o crear usuario en la base de datos
      const user = await this.userService.findOrCreateUserFromGoogle({
        email: googleUser.email,
        firstName: googleUser.given_name,
        googleId: googleUser.id,
        lastName: googleUser.family_name,
        picture: googleUser.picture
      });
      
      // Crear UserResponse para enviar al frontend
      const userResponse: UserResponse = {
        apellido: user.apellido,
        createdAt: new Date().toISOString(),
        email: user.email,
        id: user.id,
        nombre: user.nombre
      };

      // Codificar usuario para URL
      const encodedUser = encodeURIComponent(JSON.stringify(userResponse));

      // Redirigir al frontend de Angular con token y usuario
      const frontendCallbackUrl = `http://localhost:${frontendPort}/auth/google/callback?token=${tokens.access_token}&user=${encodedUser}`;
      console.log('Redirigiendo al frontend:', frontendCallbackUrl);

      res.redirect(frontendCallbackUrl);
      

    } catch (error: unknown) {
      console.error(' Error en googleCallback:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido en autenticación con Google';
      const frontendErrorUrl = `http://localhost:${frontendPort}/auth/google/callback?error=${encodeURIComponent(errorMessage)}`;
      console.error('Redirigiendo con error:', frontendErrorUrl);
      
      res.redirect(frontendErrorUrl);
    }
  }

  // Login normal
  public async login(
    req: Request<unknown, unknown, LoginRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email y contraseña son requeridos" });
        return;
      }

      const user = await this.userService.loginUser({
        email: email,
        password: password
      });

      const userResponse: UserResponse = {
        apellido: user.apellido,
        email: user.email,
        id: user.id,
        nombre: user.nombre
      };

      res.status(200).json({
        message: "Inicio de sesión exitoso",
        token: "token_jwt_aqui",
        user: userResponse
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Credenciales inválidas") {
          res.status(401).json({ message: error.message });
          return;
        }
      }
      next(error);
    }
  }

  // Registro normal
  public async register(
    req: Request<unknown, unknown, RegisterRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { apellido, email, nombre, password } = req.body;

      if (!email || !password || !nombre || !apellido) {
        res.status(400).json({ message: "Todos los campos son requeridos" });
        return;
      }

      const user = await this.userService.registerUser({
        apellido: apellido,
        email: email,
        nombre: nombre,
        password: password
      });

      const userResponse: UserResponse = {
        apellido: user.apellido,
        email: user.email,
        id: user.id,
        nombre: user.nombre
      };

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        token: "token_jwt_aqui",
        user: userResponse
      });
    } catch (e) {
      next(e);
    }
  }

  public async resetPassword(
    req: Request<unknown, unknown, ResetPasswordRequestBody>,
    res: Response
  ): Promise<void> {
    try {
      const { email, newPassword } = req.body;

      if (!email || !newPassword) {
        res.status(400).json({ 
          message: "Email y nueva contraseña son requeridos",
          success: false
        });
        return;
      }

      if (newPassword.length < 6) {
        res.status(400).json({
          message: "La contraseña debe tener al menos 6 caracteres",
          success: false
        });
        return;
      }

      console.log('Reset password solicitado para:', email);

      // Buscar usuario por email usando el servicio
      const user = await this.userService.findUserByEmail(email);
      
      if (!user) {
        res.status(404).json({
          message: "Usuario no encontrado",
          success: false
        });
        return;
      }

      // Actualizar contraseña
      await this.userService.updateUserProfile(user.id, {
        newPassword: newPassword
      });

      console.log('Contraseña actualizada para usuario:', user.id);

      res.status(200).json({
        message: "Contraseña actualizada exitosamente",
        success: true
      });

    } catch (error) {
      console.error(' Error en resetPassword:', error);
      res.status(500).json({
        message: "Error interno del servidor al actualizar la contraseña",
        success: false
      });
    }
  }

  // Actualizar perfil de usuario
public async updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userId } = req.params;
    const { apellido, currentPassword, newPassword, nombre } = req.body as {
      apellido?: string;
      currentPassword?: string;
      newPassword?: string;
      nombre?: string;
    };

    console.log(' DEBUG updateProfile - Iniciando:', {
      apellido: apellido ?? 'No proporcionado',
      hasCurrentPassword: !!currentPassword,
      hasNewPassword: !!newPassword,
      nombre: nombre ?? 'No proporcionado',
      userId
    });

    if (!userId) {
      console.log(' ERROR: userId no proporcionado');
      res.status(400).json({ 
        message: "ID de usuario es requerido",
        success: false 
      });
      return;
    }
    // Solo validar contraseña actual si se quiere cambiar la contraseña
    if (newPassword && newPassword.trim() !== '') {
      if (!currentPassword || currentPassword.trim() === '') {
        console.log(' ERROR: Contraseña actual requerida para cambiar contraseña');
        res.status(400).json({ 
          message: "La contraseña actual es requerida para cambiar la contraseña",
          success: false 
        });
        return;
      }

      console.log(' Validando contraseña actual para usuario:', userId);
    }

    console.log(' Pasó todas las validaciones, llamando al servicio...');

    const updatedUser = await this.userService.updateUserProfile(userId, {
      apellido,
      currentPassword,
      newPassword,
      nombre
    });

    const userResponse: UserResponse = {
      apellido: updatedUser.apellido,
      email: updatedUser.email,
      id: updatedUser.id,
      nombre: updatedUser.nombre
    };

    console.log('Perfil actualizado exitosamente');
    res.status(200).json({
      message: "Perfil actualizado exitosamente",
      success: true,
      user: userResponse
    });

  } catch (error) {
    console.error(' ERROR en updateProfile:', error);
    if (error instanceof Error) {
      console.error(' Mensaje de error:', error.message);
      if (error.message.includes('contraseña actual') || 
          error.message.includes('Usuario no encontrado') ||
          error.message.includes('Contraseña actual incorrecta')) {
        res.status(400).json({ 
          message: error.message,
          success: false 
        });
        return;
      }
    }
    next(error);
  }
}

  // Método para verificar contraseña
// Método para verificar contraseña
public async verifyPassword(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userId } = req.params;
    const { currentPassword } = req.body as {
      currentPassword?: string;
    };
    // Validaciones con tipos seguros
    if (!userId) {
      res.status(400).json({
        message: "ID de usuario es requerido",
        success: false
      });
      return;
    }
    if (!currentPassword || typeof currentPassword !== 'string' || currentPassword.trim() === '') {
      res.status(400).json({
        message: "La contraseña actual es requerida",
        success: false
      });
      return;
    }
    // Usar el servicio para verificar la contraseña
    const isValid = await this.userService.verifyCurrentPassword(userId, currentPassword);
    
    if (isValid) {
      res.json({
        message: "Contraseña verificada correctamente",
        success: true
      });
    } else {
      res.status(401).json({
        message: "Contraseña actual incorrecta",
        success: false
      });
    }

  } catch (error) {
    console.error('Error verificando contraseña:', error);
    next(error);
  }
}
}