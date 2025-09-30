import { Usuario } from "@prisma/client";

import { UserRepository } from "./user.repository.js";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  //Login
  async loginUser(credentials: {
    email: string;
    password: string;
  }): Promise<Usuario> {
    const { email, password } = credentials;

    if (!email || !password) {
      throw new Error("Email y contraseña son requeridos");
    }

    const user = await this.userRepository.verifyCredentials(email, password);
    
    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    return user;
  }


  async registerUser(userData: {
    apellido: string;
    email: string;
    nombre: string;
    password: string;
  }): Promise<Usuario> {
    const existingUser = await this.userRepository.findUserByEmail(
      userData.email
    );
    if (existingUser) {
      throw new Error("El usuario ya existe con este email");
    }

    const user = await this.userRepository.createUser(userData);
    return user;
  }

  
}