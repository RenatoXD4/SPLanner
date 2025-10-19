import { Usuario } from "@prisma/client";

import { UserRepository } from "./user.repository.js";

interface GoogleUserInput {
  email: string;
  firstName: string;
  googleId: string;
  lastName: string;
  picture?: string;
}

// Interface para los datos de actualización
interface UpdateUserPayload {
  apellido?: string;
  nombre?: string;
  password?: string;
}

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Buscar o crear usuario desde Google
  async findOrCreateUserFromGoogle(googleData: GoogleUserInput): Promise<Usuario> {
    try {
      // Buscar usuario por email
      const existingUser = await this.userRepository.findUserByEmail(googleData.email);
      
      if (existingUser) {
        return existingUser;
      }

      // Si no existe, crear nuevo usuario
      const newUser = await this.userRepository.createUser({
        apellido: googleData.lastName,
        email: googleData.email,
        nombre: googleData.firstName,
        password: this.generateRandomPassword()
      });

      return newUser;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error al crear usuario desde Google: ${errorMessage}`);
    }
  }

  // Obtener estadísticas del dashboard
  async getUserDashboardStats(userId: string) {
    try {
      if (!userId) {
        throw new Error('ID de usuario es requerido');
      }

      return await this.userRepository.getUserDashboardStats(userId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error al obtener estadísticas del dashboard: ${errorMessage}`);
    }
  }

  // Login
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

  // Registro normal
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

  // Actualizar perfil de usuario - CORREGIDO
  async updateUserProfile(userId: string, updateData: {
    apellido?: string;
    currentPassword?: string;
    newPassword?: string;
    nombre?: string;
  }): Promise<Usuario> {
    try {
      if (!userId) {
        throw new Error('ID de usuario es requerido');
      }

      // Obtener el usuario actual
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      // Preparar datos para actualizar con tipo específico
      const updatePayload: UpdateUserPayload = {};
      
      if (updateData.nombre) updatePayload.nombre = updateData.nombre;
      if (updateData.apellido) updatePayload.apellido = updateData.apellido;
      
      // Si se quiere cambiar la contraseña, actualizarla directamente
      if (updateData.newPassword) {
        updatePayload.password = updateData.newPassword;
        // Ya no verificamos la contraseña actual
      }

      return await this.userRepository.updateUser(userId, updatePayload);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      throw new Error(`Error al actualizar perfil: ${errorMessage}`);
    }
  }

  private generateRandomPassword(): string {
    return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
  }
}