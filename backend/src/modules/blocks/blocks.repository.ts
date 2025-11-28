import { BloqueContenido, Prisma } from "@prisma/client";

import { prisma } from "../../lib/prisma.js";



export class BlocksRepository {


  public async actualizarBloquesDeTarea(
    tareaId: string, 
    bloquesData: Prisma.BloqueContenidoCreateManyInput[],
    usuarioId: string,
  ) {
    
    return await prisma.$transaction(async (tx) => {
      
      await tx.bloqueContenido.deleteMany({
        where: { tareaId: tareaId },
      });

      if (bloquesData.length > 0) {
        await tx.bloqueContenido.createMany({
          data: bloquesData,
        });
      }
      
      await tx.tareaEditor.upsert({
        create: {
          tareaId: tareaId,
          usuarioId: usuarioId,
        },
        update: {},
        where: {
          tareaId_usuarioId: { 
            tareaId: tareaId,
            usuarioId: usuarioId,
          }
        }
      });

      const tareaActualizada = await tx.tarea.update({
        data: {
          lastModifiedById: usuarioId,
        },
        // Incluir las relaciones necesarias para devolver la trazabilidad al frontend
        include: {
          editores: {
            include: {
              usuario: {
                select: { apellido: true, id: true, nombre: true }
              }
            }
          },
          lastModifiedBy: {
            select: { apellido: true, id: true, nombre: true }
          },
        },
        
        where: { id: tareaId }
      });


      return tareaActualizada;

      
    });
  }

  public async obtenerBloquesPorTareaId(tareaId: string): Promise<BloqueContenido[]> {
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