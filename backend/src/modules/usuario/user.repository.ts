import { config } from 'dotenv';
config();


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  public async createUser(data: {
    apellido: string;
    email: string;
    nombre: string;
    password: string;
  }) {
    return await prisma.usuario.create({
      data: {
        ...data,

      },
    });
  }

  public async findUserByEmail(email: string) {
    return await prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });
  }

  public async verifyCredentials(email: string, password: string) {
    return await prisma.usuario.findFirst({
      where: {
        email: email,
        password: password,
      },
    });
  }
}