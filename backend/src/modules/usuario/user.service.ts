import { Usuario } from "@prisma/client";

import { UserRepository } from "./user.repository.js";

interface GoogleUserInput {
  email: string;
  firstName: string;
  googleId: string;
  lastName: string;
  picture?: string;
}


export class UserService {
  public userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  // Formulario de recuperar contra
  async checkUserExists(email: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      return !!user; // Retorna true si existe, false si no
    } catch (error) {
      console.error('Error verificando usuario:', error);
      return false;
    }
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

  public async findUserByEmail(email: string): Promise<null | Usuario> {
    return await this.userRepository.findUserByEmail(email);
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

  // Actualizar perfil de usuario
async updateUserProfile(userId: string, updateData: {
  apellido?: string;
  currentPassword?: string;
  newPassword?: string;
  nombre?: string;
}): Promise<Usuario> {
  try {
    console.log('DEBUG updateUserProfile - Iniciando:', {
      hasApellido: !!updateData.apellido,
      hasCurrentPassword: !!updateData.currentPassword,
      hasNewPassword: !!updateData.newPassword,
      hasNombre: !!updateData.nombre,
      userId
    });

    if (!userId) {
      throw new Error('ID de usuario es requerido');
    }

    // Obtener el usuario actual
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      console.log('Usuario no encontrado con ID:', userId);
      throw new Error('Usuario no encontrado');
    }

    console.log('Usuario encontrado:', user.email);

    // Preparar datos para actualizar con tipo explícito
    const updatePayload: {
      apellido?: string;
      nombre?: string;
      password?: string;
    } = {};
    
    if (updateData.nombre) {
      updatePayload.nombre = updateData.nombre;
      console.log(' Actualizando nombre');
    }
    
    if (updateData.apellido) {
      updatePayload.apellido = updateData.apellido;
      console.log('Actualizando apellido');
    }
    
    // Solo validar contraseña actual si se quiere cambiar la contraseña
    if (updateData.newPassword && updateData.newPassword.trim() !== '') {
      if (!updateData.currentPassword || updateData.currentPassword.trim() === '') {
        throw new Error('La contraseña actual es requerida para cambiar la contraseña');
      }

      console.log(' Verificando contraseña actual...');

      const userVerification = await this.userRepository.verifyCredentials(
        user.email, 
        updateData.currentPassword
      );

      console.log(' Resultado verificación:', userVerification ? 'VÁLIDA' : 'INVÁLIDA');

      if (!userVerification) {
        throw new Error('Contraseña actual incorrecta');
      }

      console.log(' Contraseña actual verificada, actualizando nueva contraseña...');
      
      updatePayload.password = updateData.newPassword;
    }

    console.log(' Payload para actualizar:', Object.keys(updatePayload));
    

    const result = await this.userRepository.updateUser(userId, updatePayload);
    console.log(' Usuario actualizado exitosamente');
    
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error(' Error en updateUserProfile:', errorMessage);
    throw new Error(`Error al actualizar perfil: ${errorMessage}`);
  }
}

 // Método para verificar contraseña actual
async verifyCurrentPassword(userId: string, currentPassword: string): Promise<boolean> {
  try {
    // Validar parámetros
    if (!userId || !currentPassword) {

      return false;
    }
    const user = await this.userRepository.getUserById(userId);
    if (!user) {

      return false;
    }

    const userVerification = await this.userRepository.verifyCredentials(
      user.email, 
      currentPassword
    );
    return !!userVerification;

  } catch (error) {
    console.error('Error verificando contraseña actual:', error);
    return false;
  }
}
  private generateRandomPassword(): string {
    return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
  }
}