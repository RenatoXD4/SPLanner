import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

interface MiembroConUsuario {
  id: number;
  proyectoId: string;
  rol: {
    id: number;
    nombre: string;
  };
  rolId: number;
  usuario: UsuarioBasico;
  usuarioId: string;
}

// Interfaces para los tipos de retorno
interface UsuarioBasico {
  apellido: string;
  email: string;
  id: string;
  nombre: string;
}

export class MiembroRepository {
  
  // Buscar usuario por email
  async buscarUsuarioPorEmail(email: string): Promise<null | UsuarioBasico> {
    const usuario = await prisma.usuario.findUnique({
      select: {
        apellido: true,
        email: true,
        id: true,
        nombre: true
      },
      where: { email }
    });

    return usuario;
  }

  // Contar miembros de un proyecto (para el frontend)
  async contarMiembrosProyecto(proyectoId: string): Promise<number> {
    return await prisma.miembro.count({
      where: { proyectoId }
    });
  }

  // Crear nuevo miembro
  async crearMiembro(proyectoId: string, usuarioId: string, rolId: number): Promise<MiembroConUsuario> {
   
    try {
      // Asegurar que los roles existan antes de crear el miembro
      await this.crearRolesSiNoExisten();

      const nuevoMiembro = await prisma.miembro.create({
        data: {
          proyectoId,
          rolId,
          usuarioId
        },
        include: {
          rol: {
            select: {
              id: true,
              nombre: true
            }
          },
          usuario: {
            select: {
              apellido: true,
              email: true,
              id: true,
              nombre: true
            }
          }
        }
      });

    
      return nuevoMiembro;

    } catch (error) {
      console.error('ERROR al crear miembro:', error);
      throw error;
    }
  }

  // Eliminar miembro de proyecto
  async eliminarMiembroProyecto(proyectoId: string, usuarioId: string): Promise<void> {
    await prisma.miembro.deleteMany({
      where: {
        proyectoId,
        usuarioId
      }
    });
  }

  // Obtener miembros de un proyecto
  async obtenerMiembrosProyecto(proyectoId: string): Promise<MiembroConUsuario[]> {
    const miembros = await prisma.miembro.findMany({
      include: {
        rol: {
          select: {
            id: true,
            nombre: true
          }
        },
        usuario: {
          select: {
            apellido: true,
            email: true,
            id: true,
            nombre: true
          }
        }
      },
      orderBy: {
        id: 'asc'
      },
      where: { proyectoId }
    });

    return miembros;
  }

  // VERIFICAR QUE LOS DATOS EXISTEN 
  async verificarDatosExisten(proyectoId: string, usuarioId: string, rolId: number): Promise<{proyectoExiste: boolean, rolExiste: boolean; usuarioExiste: boolean,}> {
    
    
    const [proyecto, usuario, rol] = await Promise.all([
      prisma.proyectos.findUnique({ where: { id: proyectoId } }),     
      prisma.usuario.findUnique({ where: { id: usuarioId } }),       
      prisma.roles.findUnique({ where: { id: rolId } })               
    ]);

    const resultado = {
      proyectoExiste: !!proyecto,
      rolExiste: !!rol,
      usuarioExiste: !!usuario
    };
    console.log('Detalles:', {
      proyecto: proyecto?.id,
      rol: rol?.id, 
      usuario: usuario?.id
    });

    return resultado;
  }

  // Verificar si usuario ya es miembro del proyecto
  async verificarMiembroExistente(proyectoId: string, usuarioId: string): Promise<boolean> {
    const miembro = await prisma.miembro.findFirst({
      where: {
        proyectoId,
        usuarioId
      }
    });

    return !!miembro;
  }

  //  Crear roles automáticamente si no existen
  private async crearRolesSiNoExisten(): Promise<void> {
   
    
    const rolesBasicos = [
      { id: 1, nombre: 'Administrador' },
      { id: 2, nombre: 'Editor' },
      { id: 3, nombre: 'Visualizador' }
    ];

    try {
      for (const rol of rolesBasicos) {
        const rolExistente = await prisma.roles.findUnique({
          where: { id: rol.id }
        });

        if (!rolExistente) {
        
          await prisma.roles.create({
            data: rol
          });
        }
      }
  
    } catch (error) {
      console.error(' Error creando roles:', error);
    }
  }
}