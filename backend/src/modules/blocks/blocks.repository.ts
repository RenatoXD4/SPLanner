import { BloqueContenido, Prisma } from "@prisma/client";

import { prisma } from "../../lib/prisma.js";



export class BlocksRepository {


    async actualizarBloquesDeTarea(
    tareaId: string, 
    bloquesData: Prisma.BloqueContenidoCreateManyInput[]
  ) {
    
    return await prisma.$transaction(async (tx) => {
      
      await tx.bloqueContenido.deleteMany({
        where: { tareaId: tareaId },
      });

      if (bloquesData.length === 0) {
        return [];
      }

      await tx.bloqueContenido.createMany({
        data: bloquesData,
      });
      
      return tx.bloqueContenido.findMany({
        orderBy: { posicion: 'asc' },
        where: { tareaId: tareaId },
      });
    });
  }

  async obtenerBloquesPorTareaId(tareaId: string): Promise<BloqueContenido[]> {
    return await prisma.bloqueContenido.findMany({
      orderBy: {
        posicion: 'asc',
      },
      where: {
        tareaId: tareaId,
      },
    });
  }
}