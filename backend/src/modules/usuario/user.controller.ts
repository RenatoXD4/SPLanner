import { NextFunction, Request, Response } from "express";

import { UserService } from "./user.service.js";

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

interface UserResponse {
  apellido: string;
  email: string;
  id: string;
  nombre: string;
}

export class UserController {
  constructor(private readonly userService: UserService) {}

  // Método de debug temporal - CORREGIDO
  public debugRedirectUri(req: Request, res: Response): void {
    const redirectUri = "http://localhost:9001/api-v1/auth/google/callback";
    res.json({
      encoded: encodeURIComponent(redirectUri),
      message: "Verifica que esta URI coincida EXACTAMENTE con Google Cloud Console",
      redirectUri: redirectUri
    });
  }

  // Obtener información del usuario actual
  public getCurrentUser(
    req: Request,
    res: Response
  ): void {
    res.status(200).json({
      message: "Usuario autenticado",
      user: null
    });
  }

  // Iniciar autenticación con Google - CORREGIDO
  public googleAuth(
    req: Request,
    res: Response
  ): void {
    const clientId = "886585953509-h00qukeb9m39eahdj9631dc2tl7g9jlu.apps.googleusercontent.com";
    const redirectUri = "http://localhost:9001/api-v1/auth/google/callback";
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

  // Callback de Google OAuth - CORREGIDO
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
      const redirectUri = "http://localhost:9001/api-v1/auth/google/callback";

      // Intercambiar código por tokens de acceso
      const tokenParams = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: code as string, // ← CORRECCIÓN: asegurar que es string
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

      // CORRECCIÓN: Convertir status a string
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

      console.log('Usuario procesado:', user.email);
      console.log('Google callback exitoso, redirigiendo a frontend');

      // Redirigir al frontend de Angular con el token
      const frontendCallbackUrl = `http://localhost:4200/auth/google/callback?token=${tokens.access_token}`;
      console.log('Redirigiendo al frontend:', frontendCallbackUrl);
      
      res.redirect(frontendCallbackUrl);

    } catch (error: unknown) {
      console.error(' Error en googleCallback:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido en autenticación con Google';
      const frontendErrorUrl = `http://localhost:4200/auth/google/callback?error=${encodeURIComponent(errorMessage)}`;
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
        nombre: user.nombre,
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
        nombre: user.nombre,
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
}