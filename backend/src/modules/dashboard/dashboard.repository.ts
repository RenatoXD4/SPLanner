import { PrismaClient, Usuario } from '@prisma/client';

const prisma = new PrismaClient();

// Interface para eficiencia de usuarios
interface UsuarioEficiencia {
  nombreCompleto: string;
  tareasCompletadas: number;
  totalTareas: number;
}

// Interface para evolución del proyecto
interface EvolucionProyecto {
  labels: string[];
  completadas: number[];
  enProgreso: number[];
  pendientes: number[];
}

export class UserRepository {
  
  // Crear nuevo usuario
  async createUser(userData: {
    apellido: string;
    email: string;
    nombre: string;
    password: string;
  }): Promise<Omit<Usuario, "password">> {
    return await prisma.usuario.create({
      data: userData,
      select: {
        apellido: true,
        createdAt: true,
        email: true,
        id: true,
        nombre: true
      }
    });
  }

  // Eliminar usuario
  async deleteUser(id: string): Promise<Omit<Usuario, 'createdAt' | 'password'>> {
    return await prisma.usuario.delete({
      select: {
        apellido: true,
        email: true,
        id: true,
        nombre: true
      },
      where: { id }
    });
  }

  // Obtener todos los usuarios
  async getAllUsers(): Promise<Omit<Usuario, "password">[]> {
    return await prisma.usuario.findMany({
      select: {
        apellido: true,
        createdAt: true,
        email: true,
        id: true,
        nombre: true,
        proyectosCreados: true
      }
    });
  }

  // Obtener usuario por email
  async getUserByEmail(email: string): Promise<null | Usuario> {
    return await prisma.usuario.findUnique({
      where: { email }
    });
  }

  // Obtener usuario por ID
  async getUserById(id: string): Promise<null | Omit<Usuario, 'password'>>  {
    return await prisma.usuario.findUnique({
      select: {
        apellido: true,
        createdAt: true,
        email: true,
        id: true,
        miembroDe: {
          include: {
            proyecto: {
              include: {
                estados: true,
                tareas: {
                  include: {
                    estado: true
                  }
                }
              }
            },
            rol: true
          }
        },
        nombre: true,
        proyectosCreados: {
          include: {
            estados: true,
            tareas: {
              include: {
                estado: true,
                responsables: {
                  include: {
                    usuario: {
                      select: {
                        apellido: true,
                        email: true,
                        id: true,
                        nombre: true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      where: { id }
    });
  }

  // ✅ NUEVO MÉTODO: Obtener eficiencia de TODOS los miembros del proyecto
  async getEficienciaPorMiembro(projectId: string): Promise<UsuarioEficiencia[]> {
    try {
      console.log('📊 Obteniendo eficiencia para TODOS los miembros del proyecto:', projectId);
      
      // Obtener todos los miembros del proyecto
      const miembros = await prisma.miembro.findMany({
        where: { 
          proyectoId: projectId 
        },
        include: {
          usuario: {
            select: {
              id: true,
              nombre: true,
              apellido: true
            }
          }
        }
      });

      console.log(`👥 Miembros encontrados en el proyecto: ${miembros.length}`);

      // Para cada miembro, obtener sus tareas y calcular eficiencia
      const eficienciaPromises = miembros.map(async (miembro) => {
        // Obtener todas las tareas donde este usuario es responsable en este proyecto
        const tareasResponsable = await prisma.responsable.findMany({
          where: {
            usuarioId: miembro.usuarioId,
            tarea: {
              proyectoId: projectId
            }
          },
          include: {
            tarea: {
              include: {
                estado: true
              }
            }
          }
        });

        const totalTareas = tareasResponsable.length;
        
        // Contar tareas completadas
        const tareasCompletadas = tareasResponsable.filter(responsable => 
          this.isTaskCompleted(responsable.tarea.estado.nombre)
        ).length;

        const nombreCompleto = `${miembro.usuario.nombre} ${miembro.usuario.apellido}`;
        
        console.log(`📈 ${nombreCompleto}: ${tareasCompletadas}/${totalTareas} tareas completadas`);

        return {
          nombreCompleto,
          tareasCompletadas,
          totalTareas
        };
      });

      const eficienciaMiembros = await Promise.all(eficienciaPromises);
      
      // Filtrar miembros que tienen al menos una tarea asignada
      const miembrosConTareasAsignadas = eficienciaMiembros.filter(miembro => miembro.totalTareas > 0);
      
      console.log('✅ Eficiencia por miembro calculada:', miembrosConTareasAsignadas);
      return miembrosConTareasAsignadas;

    } catch (error) {
      console.error('❌ Error obteniendo eficiencia por miembro:', error);
      return [];
    }
  }

  // ✅ NUEVO MÉTODO: Obtener evolución real del proyecto basada en fechas límite
  async getEvolucionProyecto(projectId: string): Promise<EvolucionProyecto> {
    try {
      console.log('📈 Obteniendo evolución real del proyecto:', projectId);
      
      // Obtener todas las tareas del proyecto con sus estados y fechas
      const tareas = await prisma.tarea.findMany({
        where: { proyectoId: projectId },
        include: {
          estado: true
        },
        orderBy: {
          fechaLimite: 'asc'
        }
      });

      // Crear estructura para los 12 meses
      const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const evolucion: EvolucionProyecto = {
        labels: meses,
        completadas: Array(12).fill(0),
        enProgreso: Array(12).fill(0),
        pendientes: Array(12).fill(0)
      };

      // Contar tareas por mes según su estado y fecha límite
      tareas.forEach(tarea => {
        if (!tarea.fechaLimite) return; // Saltar tareas sin fecha límite
        
        const fecha = new Date(tarea.fechaLimite);
        const mes = fecha.getMonth(); // 0 = Enero, 11 = Diciembre
        
        if (mes >= 0 && mes < 12) {
          const estadoNombre = tarea.estado.nombre.toLowerCase();
          
          if (this.isTaskCompleted(estadoNombre)) {
            evolucion.completadas[mes]++;
          } else if (this.isTaskInProgress(estadoNombre)) {
            evolucion.enProgreso[mes]++;
          } else if (this.isTaskPending(estadoNombre)) {
            evolucion.pendientes[mes]++;
          }
        }
      });

      console.log('✅ Evolución del proyecto calculada:', evolucion);
      return evolucion;

    } catch (error) {
      console.error('❌ Error obteniendo evolución del proyecto:', error);
      // Fallback: retornar estructura vacía
      return {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        completadas: Array(12).fill(0),
        enProgreso: Array(12).fill(0),
        pendientes: Array(12).fill(0)
      };
    }
  }

  // Obtener estadísticas del dashboard para un usuario
  async getUserDashboardStats(userId: string) {
    console.log('🔄 getUserDashboardStats para user:', userId);
    
    const user = await prisma.usuario.findUnique({
      include: {
        miembroDe: {
          include: {
            proyecto: {
              include: {
                tareas: {
                  include: {
                    estado: true
                  }
                }
              }
            }
          }
        },
        proyectosCreados: {
          include: {
            tareas: {
              include: {
                estado: true
              }
            }
          }
        },
        responsableDe: {
          include: {
            tarea: {
              include: {
                estado: true,
                proyecto: true
              }
            }
          }
        }
      },
      where: { id: userId }
    });

    if (!user) {
      console.log('❌ User not found');
      return null;
    }

    // Combinar proyectos creados y proyectos donde es miembro
    const allProjects = [
      ...user.proyectosCreados,
      ...user.miembroDe.map(m => m.proyecto)
    ];

    // Eliminar duplicados
    const uniqueProjects = allProjects.filter((project, index, self) =>
      index === self.findIndex(p => p.id === project.id)
    );

    // Calcular estadísticas
    const totalProjects = uniqueProjects.length;
    
    // Todas las tareas de todos los proyectos
    const allTasks = uniqueProjects.flatMap(project => project.tareas);
    const totalTasks = allTasks.length;
    
    // Contar tareas por estado real
    const completedTasks = allTasks.filter(task => 
      this.isTaskCompleted(task.estado.nombre)
    ).length;
    
    const inProgressTasks = allTasks.filter(task => 
      this.isTaskInProgress(task.estado.nombre)
    ).length;
    
    const pendingTasks = allTasks.filter(task => 
      this.isTaskPending(task.estado.nombre)
    ).length;
    
    const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Tareas donde el usuario es responsable
    const userResponsibleTasks = user.responsableDe.map(r => r.tarea);
    const userPendingTasks = userResponsibleTasks.filter(task => 
      !this.isTaskCompleted(task.estado.nombre)
    ).length;

    return {
      recentProjects: uniqueProjects
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map(project => {
          // Contar para cada proyecto
          const tareasCompletadas = project.tareas.filter(t => 
            this.isTaskCompleted(t.estado.nombre)
          ).length;
          
          const tareasEnProgreso = project.tareas.filter(t => 
            this.isTaskInProgress(t.estado.nombre)
          ).length;
          
          const tareasPendientes = project.tareas.filter(t => 
            this.isTaskPending(t.estado.nombre)
          ).length;
          
          const totalTareas = project.tareas.length;
          const porcentajeCompletado = totalTareas > 0 ? 
            Math.round((tareasCompletadas / totalTareas) * 100) : 0;

          return {
            createdAt: project.createdAt,
            descripcion: project.descripcion,
            id: project.id,
            nombre: project.nombre,
            porcentajeCompletado,
            tareasCompletadas,
            tareasEnProgreso,
            tareasPendientes,
            totalTareas
          };
        }),
      stats: {
        completedTasks,
        completionPercentage,
        inProgressTasks,
        pendingTasks,
        totalProjects,
        totalTasks,
        userPendingTasks,
        userResponsibleTasks: userResponsibleTasks.length
      },
      userInfo: {
        apellido: user.apellido,
        createdAt: user.createdAt,
        email: user.email,
        id: user.id,
        nombre: user.nombre
      }
    };
  }

  // Actualizar usuario
  async updateUser(id: string, userData: {
    apellido?: string;
    email?: string;
    nombre?: string;
    password?: string;
  }): Promise<Omit<Usuario, 'password'>>{
    return await prisma.usuario.update({
      data: userData,
      select: {
        apellido: true,
        createdAt: true,
        email: true,
        id: true,
        nombre: true
      },
      where: { id }
    });
  }

  // ✅ MÉTODO CORREGIDO: Obtener conteo de tareas por prioridad (etiquetas)
  async getTareasPorPrioridad(projectId: string): Promise<{ cantidad: number; prioridad: string; }[]> {
    try {
      console.log('📊 Obteniendo tareas por prioridad para proyecto:', projectId);
      
      // Buscar TODAS las etiquetas del proyecto y contar sus tareas
      const todasLasEtiquetas = await prisma.etiqueta.findMany({
        where: {
          proyectoId: projectId
        },
        include: {
          tareas: {
            select: {
              tareaId: true
            }
          }
        }
      });

      console.log('🔍 Todas las etiquetas encontradas:', todasLasEtiquetas.map(e => ({
        nombre: e.nombre,
        cantidad: e.tareas.length
      })));

      // Filtrar solo las etiquetas que son de prioridad y tienen tareas
      const etiquetasPrioridad = todasLasEtiquetas.filter(etiqueta => {
        const nombreNormalizado = etiqueta.nombre.toLowerCase().trim();
        const esPrioridad = (
          nombreNormalizado.includes('alta') ||
          nombreNormalizado.includes('media') || 
          nombreNormalizado.includes('baja') ||
          nombreNormalizado.includes('high') ||
          nombreNormalizado.includes('medium') ||
          nombreNormalizado.includes('low') ||
          nombreNormalizado.includes('urgente') ||
          nombreNormalizado.includes('normal')
        );
        return esPrioridad && etiqueta.tareas.length > 0;
      });

      console.log('🎯 Etiquetas de prioridad filtradas:', etiquetasPrioridad.map(e => ({
        nombre: e.nombre,
        cantidad: e.tareas.length
      })));

      // Si no hay etiquetas de prioridad con tareas, retornar array vacío
      if (etiquetasPrioridad.length === 0) {
        console.log('ℹ️ No se encontraron etiquetas de prioridad con tareas para el proyecto:', projectId);
        return [];
      }

      // Contar tareas por cada etiqueta de prioridad
      const resultado = etiquetasPrioridad.map(etiqueta => ({
        prioridad: this.normalizarNombrePrioridad(etiqueta.nombre),
        cantidad: etiqueta.tareas.length
      }));

      console.log('✅ Conteo REAL por prioridad:', resultado);
      return resultado;

    } catch (error) {
      console.error('❌ Error obteniendo tareas por prioridad:', error);
      return [];
    }
  }

  // ✅ MÉTODO: Obtener conteo de tareas por estado real
  async getTareasPorEstado(projectId: string): Promise<{ cantidad: number; estado: string; }[]> {
    try {
      console.log('📊 Obteniendo tareas por estado para proyecto:', projectId);
      
      const tareasPorEstado = await prisma.tarea.groupBy({
        by: ['estadoId'],
        where: {
          proyectoId: projectId
        },
        _count: {
          _all: true
        }
      });

      // Obtener los nombres de los estados
      const estados = await prisma.estado.findMany({
        where: {
          id: {
            in: tareasPorEstado.map(item => item.estadoId)
          }
        },
        select: {
          id: true,
          nombre: true
        }
      });

      // Mapear resultados
      const resultado = tareasPorEstado.map(item => {
        const estado = estados.find(e => e.id === item.estadoId);
        return {
          estado: estado?.nombre || 'Desconocido',
          cantidad: item._count._all
        };
      });

      console.log('✅ Conteo por estado:', resultado);
      return resultado;

    } catch (error) {
      console.error('❌ Error obteniendo tareas por estado:', error);
      return [];
    }
  }

  // ✅ MÉTODO: Obtener conteo de tareas en revisión
  async getTareasEnRevisionCount(projectId: string): Promise<number> {
    try {
      const count = await prisma.tarea.count({
        where: {
          proyectoId: projectId,
          estado: {
            nombre: {
              contains: 'revisión',
              mode: 'insensitive'
            }
          }
        }
      });
      
      console.log(`✅ Tareas en revisión para proyecto ${projectId}:`, count);
      return count;

    } catch (error) {
      console.error('❌ Error contando tareas en revisión:', error);
      return 0;
    }
  }

  // ✅ MÉTODO AUXILIAR: Normalizar nombres de prioridad
  private normalizarNombrePrioridad(nombre: string): string {
    const normalized = nombre.toLowerCase().trim();
    
    if (normalized.includes('alta') || normalized.includes('high') || normalized.includes('urgente')) {
      return 'Alta';
    } else if (normalized.includes('media') || normalized.includes('medium') || normalized.includes('normal')) {
      return 'Media';
    } else if (normalized.includes('baja') || normalized.includes('low') || normalized.includes('bajo')) {
      return 'Baja';
    }
    
    return nombre; // Retornar original si no coincide
  }

  // ✅ FUNCIONES AUXILIARES CORREGIDAS
  private isTaskCompleted(estadoNombre: string): boolean {
    const normalized = estadoNombre.toLowerCase().trim();
    const completedStates = ['finalizado', 'completado', 'done', 'hecho', 'terminado', 'completo'];
    return completedStates.some(state => normalized.includes(state));
  }

  private isTaskInProgress(estadoNombre: string): boolean {
    const normalized = estadoNombre.toLowerCase().trim();
    const inProgressStates = [
      'en proceso', 'en progreso', 'en desarrollo', 'en curso',
      'procesando', 'trabajando', 'activo', 'en ejecución',
      'haciendo', 'desarrollando', 'progreso'
    ];
    return inProgressStates.some(state => normalized.includes(state));
  }

  private isTaskPending(estadoNombre: string): boolean {
    const normalized = estadoNombre.toLowerCase().trim();
    const pendingStates = [
      'pendiente', 'por hacer', 'to do', 'sin empezar', 'sin comenzar',
      'no iniciado', 'en espera', 'pausado', 'por empezar', 'futuro'
    ];
    return pendingStates.some(state => normalized.includes(state));
  }

  // Función adicional para clasificar todos los estados (mantenida por compatibilidad)
  private getTaskStatus(estadoNombre: string): string {
    if (this.isTaskCompleted(estadoNombre)) {
      return 'completed';
    }
    
    if (this.isTaskInProgress(estadoNombre)) {
      return 'in_progress';
    }
    
    if (this.isTaskPending(estadoNombre)) {
      return 'pending';
    }
    
    return 'unknown';
  }

  // ✅ MÉTODO: Datos completos para exportación
  async getProjectExportData(projectId: string): Promise<any> {
    try {
      console.log('📤 Obteniendo datos completos para exportación del proyecto:', projectId);
      
      const proyecto = await prisma.proyectos.findUnique({
        where: { id: projectId },
        include: {
          // Información básica del proyecto
          creadoPor: {
            select: {
              id: true,
              nombre: true,
              apellido: true,
              email: true
            }
          },
          // Miembros del proyecto
          miembros: {
            include: {
              usuario: {
                select: {
                  id: true,
                  nombre: true,
                  apellido: true,
                  email: true
                }
              },
              rol: {
                select: {
                  nombre: true
                }
              }
            }
          },
          // Estados disponibles
          estados: {
            select: {
              id: true,
              nombre: true,
              posicion: true
            },
            orderBy: {
              posicion: 'asc'
            }
          },
          // Todas las tareas con información completa
          tareas: {
            include: {
              estado: {
                select: {
                  nombre: true
                }
              },
              responsables: {
                include: {
                  usuario: {
                    select: {
                      id: true,
                      nombre: true,
                      apellido: true,
                      email: true
                    }
                  }
                }
              },
              etiquetas: {
                include: {
                  etiqueta: {
                    select: {
                      nombre: true
                    }
                  }
                }
              },
              comentarios: {
                include: {
                  autor: {
                    select: {
                      nombre: true,
                      apellido: true
                    }
                  }
                },
                orderBy: {
                  createdAt: 'desc'
                }
              }
            },
            orderBy: [
              { estadoId: 'asc' },
              { posicion: 'asc' }
            ]
          },
          // Etiquetas del proyecto
          etiquetas: {
            select: {
              id: true,
              nombre: true,
              _count: {
                select: {
                  tareas: true
                }
              }
            }
          }
        }
      });

      if (!proyecto) {
        throw new Error('Proyecto no encontrado');
      }

      // Obtener eficiencia de miembros
      const usuariosEficiencia = await this.getEficienciaPorMiembro(projectId);
      // Obtener evolución del proyecto
      const evolucionProyecto = await this.getEvolucionProyecto(projectId);

      // Estructurar datos para exportación
      const exportData = {
        metadata: {
          exportDate: new Date().toISOString(),
          formatVersion: '1.0',
          projectId: proyecto.id
        },
        proyecto: {
          id: proyecto.id,
          nombre: proyecto.nombre,
          descripcion: proyecto.descripcion,
          createdAt: proyecto.createdAt,
          creadoPor: `${proyecto.creadoPor.nombre} ${proyecto.creadoPor.apellido}`,
          totalMiembros: proyecto.miembros.length,
          totalTareas: proyecto.tareas.length,
          totalEstados: proyecto.estados.length,
          totalEtiquetas: proyecto.etiquetas.length
        },
        equipo: proyecto.miembros.map(miembro => ({
          usuario: `${miembro.usuario.nombre} ${miembro.usuario.apellido}`,
          email: miembro.usuario.email,
          rol: miembro.rol.nombre
        })),
        estados: proyecto.estados,
        etiquetas: proyecto.etiquetas,
        tareas: proyecto.tareas.map(tarea => ({
          id: tarea.id,
          titulo: tarea.titulo || 'Sin título',
          estado: tarea.estado.nombre,
          fechaLimite: tarea.fechaLimite,
          posicion: tarea.posicion,
          createdAt: tarea.createdAt,
          responsables: tarea.responsables.map(r => ({
            nombre: `${r.usuario.nombre} ${r.usuario.apellido}`,
            email: r.usuario.email
          })),
          etiquetas: tarea.etiquetas.map(te => te.etiqueta.nombre),
          totalComentarios: tarea.comentarios.length,
          ultimosComentarios: tarea.comentarios.slice(0, 3).map(c => ({
            autor: `${c.autor.nombre} ${c.autor.apellido}`,
            contenido: c.contenido.substring(0, 100) + (c.contenido.length > 100 ? '...' : ''),
            fecha: c.createdAt
          }))
        })),
        estadisticas: {
          tareasPorEstado: proyecto.estados.map(estado => ({
            estado: estado.nombre,
            cantidad: proyecto.tareas.filter(t => t.estadoId === estado.id).length
          })),
          tareasPorPrioridad: await this.getTareasPorPrioridad(projectId),
          eficienciaPorUsuario: usuariosEficiencia,
          evolucionProyecto: evolucionProyecto,
          progresoGeneral: {
            totalTareas: proyecto.tareas.length,
            tareasCompletadas: proyecto.tareas.filter(t => 
              this.isTaskCompleted(t.estado.nombre)
            ).length,
            porcentajeCompletado: proyecto.tareas.length > 0 ? 
              Math.round((proyecto.tareas.filter(t => 
                this.isTaskCompleted(t.estado.nombre)
              ).length / proyecto.tareas.length) * 100) : 0
          }
        }
      };

      console.log('✅ Datos de exportación generados correctamente');
      return exportData;

    } catch (error) {
      console.error('❌ Error obteniendo datos para exportación:', error);
      throw error;
    }
  }

  // ✅ MÉTODO: Datos resumidos para reportes rápidos
  async getProjectSummary(projectId: string): Promise<any> {
    try {
      const proyecto = await prisma.proyectos.findUnique({
        where: { id: projectId },
        select: {
          id: true,
          nombre: true,
          descripcion: true,
          createdAt: true,
          _count: {
            select: {
              tareas: true,
              miembros: true,
              etiquetas: true
            }
          },
          tareas: {
            select: {
              estado: {
                select: {
                  nombre: true
                }
              },
              fechaLimite: true
            }
          }
        }
      });

      if (!proyecto) {
        throw new Error('Proyecto no encontrado');
      }

      // Obtener eficiencia de miembros
      const usuariosEficiencia = await this.getEficienciaPorMiembro(projectId);
      // Obtener evolución del proyecto
      const evolucionProyecto = await this.getEvolucionProyecto(projectId);

      const tareasCompletadas = proyecto.tareas.filter(t => 
        this.isTaskCompleted(t.estado.nombre)
      ).length;

      const tareasConVencimiento = proyecto.tareas.filter(t => t.fechaLimite).length;
      const tareasVencidas = proyecto.tareas.filter(t => 
        t.fechaLimite && new Date(t.fechaLimite) < new Date()
      ).length;

      return {
        proyecto: {
          nombre: proyecto.nombre,
          descripcion: proyecto.descripcion,
          fechaCreacion: proyecto.createdAt,
          duracion: Math.ceil((new Date().getTime() - proyecto.createdAt.getTime()) / (1000 * 60 * 60 * 24)) + ' días'
        },
        resumen: {
          totalTareas: proyecto._count.tareas,
          totalMiembros: proyecto._count.miembros,
          totalEtiquetas: proyecto._count.etiquetas,
          tareasCompletadas,
          porcentajeCompletado: proyecto._count.tareas > 0 ? 
            Math.round((tareasCompletadas / proyecto._count.tareas) * 100) : 0,
          tareasConVencimiento,
          tareasVencidas,
          eficienciaMiembros: usuariosEficiencia,
          evolucionProyecto: evolucionProyecto
        },
        exportDate: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error obteniendo resumen del proyecto:', error);
      throw error;
    }
  }
}