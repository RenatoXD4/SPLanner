import { NextFunction, Request, Response } from "express";

import { UserService } from "./user.service.js";


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



export class UserController {
  constructor(private readonly userService: UserService) {}

   //login
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

      res.status(200).json({
        message: "Inicio de sesión exitoso",
        user: {
          apellido: user.apellido,
          email: user.email,
          id: user.id,
          nombre: user.nombre,
          
    
        }
      });
    } catch (error) {
      // Manejo seguro del error
      if (error instanceof Error) {
        if (error.message === "Credenciales inválidas") {
          res.status(401).json({ message: error.message });
          return;
        }
      }
      next(error);
    }
  }



//registro
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

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        user
      });
    } catch (e) {
      next(e);
    }
  }

  
}