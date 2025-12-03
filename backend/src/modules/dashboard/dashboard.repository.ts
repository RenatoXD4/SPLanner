import { PrismaClient, Usuario } from '@prisma/client';

const prisma = new PrismaClient();

// Interface para evolución del proyecto
interface EvolucionProyecto {
  completadas: number[];
  enProgreso: number[];
  labels: string[];
  pendientes: number[];
}

// NUEVA Interface para eficiencia de usuarios mejorada
interface UsuarioEficienciaMejorada {
  nombreCompleto: string;
  tareasCompletadas: number;
  totalTareas: number;
  tareasPendientes: number;
  tareasEnProgreso: number;
  eficiencia: number;
}

// Interface para estado con tareas y color
interface EstadoConTareas {
  id: number;
  nombre: string;
  posicion: number;
  tareas?: any[];
  color?: {
    codigo: string;
    nombre: string;
  } | null;
}

// NUEVA Interface para evolución dinámica COMPLETA
interface EvolucionDinamicaCompleta {
  estados: string[];
  datosPorEstado: {
    [estado: string]: number[];
  };
  labels: string[];
}

export class UserRepository {
  
  // ✅ MÉTODO: Obtener todos los estados de un proyecto con sus colores y tareas
  async getEstadosDelProyecto(projectId: string): Promise<EstadoConTareas[]> {
    try {
      console.log('🔄 Obteniendo todos los estados del proyecto:', projectId);
      
      const estados = await prisma.estado.findMany({
        include: {
          color: true,
          tareas: {
            where: {
              proyectoId: projectId
            }
          }
        },
        orderBy: {
          posicion: 'asc'
        },
        where: { 
          proyectoId: projectId 
        }
      });

      console.log(`✅ ${estados.length} estados encontrados para el proyecto ${projectId}`);
      
      return estados.map(estado => ({
        id: estado.id,
        nombre: estado.nombre,
        posicion: estado.posicion,
        tareas: estado.tareas,
        color: estado.color ? {
          codigo: estado.color.codigo,
          nombre: estado.color.nombre
        } : null
      }));

    } catch (error) {
      console.error('❌ Error obteniendo estados del proyecto:', error);
      return [];
    }
  }

  // ✅ MÉTODO COMPLETAMENTE REESCRITO: Obtener evolución DINÁMICA del proyecto por TODOS los estados usando fechas límite REALES
  async getEvolucionDinamicaCompleta(projectId: string): Promise<EvolucionDinamicaCompleta> {
    try {
      console.log('📈 OBTENIENDO EVOLUCIÓN DINÁMICA COMPLETA POR FECHA LÍMITE:', projectId);
      
      // 1. Obtener TODOS los estados del proyecto (TODAS las columnas)
      const estados = await this.getEstadosDelProyecto(projectId);
      
      if (estados.length === 0) {
        console.log('⚠️ No se encontraron estados para el proyecto');
        return this.getEvolucionDinamicaCompletaFallback(projectId);
      }

      console.log(`✅ ${estados.length} estados encontrados:`, estados.map(e => e.nombre));

      // 2. Obtener TODAS las tareas del proyecto con sus estados y fechas límite
      const tareas = await prisma.tarea.findMany({
        include: {
          estado: true
        },
        where: { 
          proyectoId: projectId,
          fechaLimite: {
            not: null
          }
        },
        orderBy: {
          fechaLimite: 'asc'
        }
      });

      console.log(`📊 Total de tareas con fecha límite: ${tareas.length}`);

      if (tareas.length === 0) {
        console.log('⚠️ No se encontraron tareas con fecha límite para el proyecto');
        return this.getEvolucionDinamicaCompletaFallback(projectId);
      }

      // 3. Obtener el RANGO COMPLETO de fechas límite del proyecto
      const fechasLimite = tareas
        .map(t => t.fechaLimite)
        .filter((date): date is Date => date !== null);
      
      if (fechasLimite.length === 0) {
        console.log('⚠️ No hay fechas límite válidas para las tareas');
        return this.getEvolucionDinamicaCompletaFallback(projectId);
      }

      // Encontrar la fecha MÍNIMA y MÁXIMA de las fechas límite
      const fechaMin = new Date(Math.min(...fechasLimite.map(d => d.getTime())));
      const fechaMax = new Date(Math.max(...fechasLimite.map(d => d.getTime())));
      
      console.log('📅 RANGO DE FECHAS LÍMITE DEL PROYECTO:', {
        desde: fechaMin.toLocaleDateString('es-ES'),
        hasta: fechaMax.toLocaleDateString('es-ES'),
        diferenciaMeses: this.calcularMesesEntreFechas(fechaMin, fechaMax)
      });

      // 4. GENERAR TODOS LOS MESES entre fechaMin y fechaMax
      const meses = this.generarMesesEntreFechas(fechaMin, fechaMax);
      const labels = meses.map(m => this.formatearMesLabel(m));

      console.log('🗓️ MESES A MOSTRAR:', {
        totalMeses: labels.length,
        labels: labels
      });

      // 5. INICIALIZAR estructura para datos por estado (TODOS los estados)
      const datosPorEstado: { [estado: string]: number[] } = {};
      
      // Inicializar arrays para CADA estado encontrado en el proyecto
      estados.forEach(estado => {
        datosPorEstado[estado.nombre] = Array(meses.length).fill(0);
      });

      // 6. PROCESAR CADA TAREA y asignarla al MES CORRESPONDIENTE según su FECHA LÍMITE
      let tareasProcesadas = 0;
      let tareasSinFecha = 0;
      
      tareas.forEach(tarea => {
        if (!tarea.fechaLimite) {
          tareasSinFecha++;
          return;
        }
        
        const fechaLimite = new Date(tarea.fechaLimite);
        const estadoNombre = tarea.estado.nombre;
        
        // Encontrar el ÍNDEX del MES correspondiente a la fecha límite
        const mesIndex = this.encontrarIndiceMes(meses, fechaLimite);
        
        if (mesIndex !== -1) {
          if (datosPorEstado[estadoNombre]) {
            datosPorEstado[estadoNombre][mesIndex]++;
            tareasProcesadas++;
          } else {
            console.warn(`⚠️ Estado "${estadoNombre}" no encontrado en la lista de estados disponibles`);
            // Si el estado no está en la lista inicial, agregarlo dinámicamente
            datosPorEstado[estadoNombre] = Array(meses.length).fill(0);
            datosPorEstado[estadoNombre][mesIndex] = 1;
            estados.push({
              id: tarea.estado.id,
              nombre: estadoNombre,
              posicion: tarea.estado.posicion,
              tareas: [],
              color: null
            });
          }
        }
      });

      console.log(`✅ TAREAS PROCESADAS POR FECHA LÍMITE: ${tareasProcesadas}/${tareas.length}`);
      console.log(`⚠️ Tareas sin fecha límite: ${tareasSinFecha}`);

      // 7. Filtrar solo los estados que tienen datos REALES
      const estadosConDatos = estados.filter(estado => {
        const total = datosPorEstado[estado.nombre]?.reduce((a, b) => a + b, 0) || 0;
        return total > 0;
      });

      console.log(`📊 Estados con datos: ${estadosConDatos.length}/${estados.length}`);

      // 8. Ordenar estados por posición (mantener el orden del tablero)
      const estadosOrdenados = estadosConDatos.sort((a, b) => a.posicion - b.posicion);

      console.log('🎯 Estados ordenados por posición:', estadosOrdenados.map(e => ({
        nombre: e.nombre,
        posicion: e.posicion,
        tareas: datosPorEstado[e.nombre]?.reduce((a, b) => a + b, 0) || 0
      })));

      // 9. CONVERTIR a ACUMULATIVO para mostrar progresión temporal
      const datosPorEstadoAcumulativo: { [estado: string]: number[] } = {};
      
      estadosOrdenados.forEach(estado => {
        const datosOriginales = datosPorEstado[estado.nombre];
        const datosAcumulativos: number[] = [];
        let acumulado = 0;
        
        for (let i = 0; i < datosOriginales.length; i++) {
          acumulado += datosOriginales[i];
          datosAcumulativos.push(acumulado);
        }
        
        datosPorEstadoAcumulativo[estado.nombre] = datosAcumulativos;
      });

      return {
        estados: estadosOrdenados.map(e => e.nombre),
        datosPorEstado: datosPorEstadoAcumulativo,
        labels
      };

    } catch (error) {
      console.error('❌ ERROR CRÍTICO en getEvolucionDinamicaCompleta:', error);
      return this.getEvolucionDinamicaCompletaFallback(projectId);
    }
  }

  // ✅ MÉTODO DE FALLBACK mejorado para evolución completa
  private async getEvolucionDinamicaCompletaFallback(projectId: string): Promise<EvolucionDinamicaCompleta> {
    try {
      console.log('🔄 Usando FALLBACK para evolución dinámica completa');
      
      // Obtener datos básicos del proyecto
      const proyecto = await prisma.proyectos.findUnique({
        include: {
          estados: true,
          tareas: {
            include: {
              estado: true
            },
            where: {
              fechaLimite: {
                not: null
              }
            }
          }
        },
        where: { id: projectId }
      });

      if (!proyecto || proyecto.tareas.length === 0) {
        throw new Error('No hay tareas con fecha límite en el proyecto');
      }

      // Obtener rango de fechas límite
      const fechas = proyecto.tareas
        .map(t => t.fechaLimite!)
        .map(date => new Date(date));
      
      const fechaMin = new Date(Math.min(...fechas.map(d => d.getTime())));
      const fechaMax = new Date(Math.max(...fechas.map(d => d.getTime())));
      
      // Generar meses
      const meses = this.generarMesesEntreFechas(fechaMin, fechaMax);
      const labels = meses.map(m => this.formatearMesLabel(m));

      // Usar TODOS los estados del proyecto
      const estadosOrdenados = proyecto.estados.sort((a, b) => a.posicion - b.posicion);
      const datosPorEstado: { [estado: string]: number[] } = {};
      
      // Inicializar arrays para cada estado
      estadosOrdenados.forEach(estado => {
        datosPorEstado[estado.nombre] = Array(meses.length).fill(0);
      });

      // Procesar tareas
      proyecto.tareas.forEach(tarea => {
        if (!tarea.fechaLimite) return;
        
        const fecha = new Date(tarea.fechaLimite);
        const estadoNombre = tarea.estado.nombre;
        
        const mesIndex = this.encontrarIndiceMes(meses, fecha);
        if (mesIndex !== -1 && datosPorEstado[estadoNombre]) {
          datosPorEstado[estadoNombre][mesIndex]++;
        }
      });

      // Convertir a acumulativo
      const datosPorEstadoAcumulativo: { [estado: string]: number[] } = {};
      estadosOrdenados.forEach(estado => {
        const datosOriginales = datosPorEstado[estado.nombre];
        const datosAcumulativos: number[] = [];
        let acumulado = 0;
        
        for (let i = 0; i < datosOriginales.length; i++) {
          acumulado += datosOriginales[i];
          datosAcumulativos.push(acumulado);
        }
        
        datosPorEstadoAcumulativo[estado.nombre] = datosAcumulativos;
      });

      return {
        estados: estadosOrdenados.map(e => e.nombre),
        datosPorEstado: datosPorEstadoAcumulativo,
        labels
      };
    } catch (error) {
      console.error('❌ Error en fallback:', error);
      
      // Fallback mínimo con los últimos 12 meses
      const ahora = new Date();
      const labels: string[] = [];
      for (let i = 11; i >= 0; i--) {
        const fecha = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
        labels.push(this.formatearMesLabel(fecha));
      }
      
      return {
        estados: ['Pendiente', 'En Progreso', 'Completado'],
        datosPorEstado: {
          'Pendiente': Array(12).fill(0),
          'En Progreso': Array(12).fill(0),
          'Completado': Array(12).fill(0)
        },
        labels
      };
    }
  }

  // ========== MÉTODOS AUXILIARES ==========

  // ✅ Calcular meses entre dos fechas
  private calcularMesesEntreFechas(fechaInicio: Date, fechaFin: Date): number {
    const inicio = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 1);
    const fin = new Date(fechaFin.getFullYear(), fechaFin.getMonth(), 1);
    
    let meses = 0;
    const current = new Date(inicio);
    while (current <= fin) {
      meses++;
      current.setMonth(current.getMonth() + 1);
    }
    
    return meses;
  }

  // ✅ Generar array de meses entre dos fechas
  private generarMesesEntreFechas(fechaInicio: Date, fechaFin: Date): Date[] {
    const meses: Date[] = [];
    const inicio = new Date(fechaInicio.getFullYear(), fechaInicio.getMonth(), 1);
    const fin = new Date(fechaFin.getFullYear(), fechaFin.getMonth(), 1);
    
    const current = new Date(inicio);
    while (current <= fin) {
      meses.push(new Date(current));
      current.setMonth(current.getMonth() + 1);
    }
    
    return meses;
  }

  // ✅ Formatear etiqueta de mes (ej: "ENE 24")
  private formatearMesLabel(fecha: Date): string {
    const mes = fecha.toLocaleDateString('es-ES', { 
      month: 'short' 
    }).replace('.', '').toUpperCase();
    
    const año = fecha.getFullYear().toString().slice(-2);
    return `${mes} ${año}`;
  }

  // ✅ Encontrar índice del mes en el array
  private encontrarIndiceMes(meses: Date[], fechaTarea: Date): number {
    const añoTarea = fechaTarea.getFullYear();
    const mesTarea = fechaTarea.getMonth();
    
    for (let i = 0; i < meses.length; i++) {
      if (meses[i].getFullYear() === añoTarea && 
          meses[i].getMonth() === mesTarea) {
        return i;
      }
    }
    
    return -1;
  }

  // ✅ MÉTODO: Obtener distribución dinámica por estado
  async getDistribucionPorEstadoDinamica(projectId: string): Promise<any[]> {
    try {
      const estados = await this.getEstadosDelProyecto(projectId);
      
      return estados.map(estado => ({
        id: estado.id,
        nombre: estado.nombre,
        cantidad: estado.tareas?.length || 0,
        color: estado.color?.codigo || null,
        posicion: estado.posicion
      }));
    } catch (error) {
      console.error('Error obteniendo distribución dinámica:', error);
      return [];
    }
  }

  // ✅ MÉTODO ACTUALIZADO: Obtener eficiencia MEJORADA de TODOS los miembros del proyecto CON TODAS LAS TAREAS
  async getEficienciaPorMiembroMejorada(projectId: string): Promise<UsuarioEficienciaMejorada[]> {
    try {
      console.log('📊 Obteniendo eficiencia MEJORADA para TODOS los miembros del proyecto:', projectId);
      
      // Obtener todos los miembros del proyecto
      const miembros = await prisma.miembro.findMany({
        include: {
          usuario: {
            select: {
              apellido: true,
              id: true,
              nombre: true
            }
          }
        },
        where: { 
          proyectoId: projectId 
        }
      });

      // Para cada miembro, obtener sus tareas y calcular estadísticas completas
      const eficienciaPromises = miembros.map(async (miembro) => {
        // Obtener TODAS las tareas donde este usuario es responsable en este proyecto
        const tareasResponsable = await prisma.responsable.findMany({
          include: {
            tarea: {
              include: {
                estado: true
              }
            }
          },
          where: {
            tarea: {
              proyectoId: projectId
            },
            usuarioId: miembro.usuarioId
          }
        });

        const totalTareas = tareasResponsable.length;
        
        // Contar tareas por estado - TODAS LAS COLUMNAS
        const tareasCompletadas = tareasResponsable.filter(responsable => 
          this.isTaskCompleted(responsable.tarea.estado.nombre)
        ).length;
        
        const tareasEnProgreso = tareasResponsable.filter(responsable => 
          this.isTaskInProgress(responsable.tarea.estado.nombre)
        ).length;
        
        const tareasPendientes = tareasResponsable.filter(responsable => 
          this.isTaskPending(responsable.tarea.estado.nombre)
        ).length;

        // Calcular eficiencia basada en tareas completadas vs totales
        const eficiencia = totalTareas > 0 ? 
          Math.round((tareasCompletadas / totalTareas) * 100) : 0;

        const nombreCompleto = `${miembro.usuario.nombre} ${miembro.usuario.apellido}`;
      
        return {
          nombreCompleto,
          tareasCompletadas,
          totalTareas,
          tareasPendientes,
          tareasEnProgreso,
          eficiencia
        };
      });

      const eficienciaMiembros = await Promise.all(eficienciaPromises);
      
      // Filtrar miembros que tienen al menos una tarea asignada
      const miembrosConTareasAsignadas = eficienciaMiembros.filter(miembro => miembro.totalTareas > 0);
      
      // Ordenar por total de tareas (de mayor a menor)
      const miembrosOrdenados = miembrosConTareasAsignadas.sort((a, b) => b.totalTareas - a.totalTareas);
      
      console.log('✅ Eficiencia por miembro mejorada calculada:', miembrosOrdenados.length, 'miembros con tareas');
      return miembrosOrdenados;

    } catch (error) {
      console.error('❌ Error obteniendo eficiencia por miembro mejorada:', error);
      return [];
    }
  }

  // ✅ MÉTODO: Obtener evolución real del proyecto basada en fechas límite
  async getEvolucionProyecto(projectId: string): Promise<EvolucionProyecto> {
    try {
      console.log('📊 Obteniendo evolución real del proyecto:', projectId);
      
      // Obtener todas las tareas del proyecto con sus estados y fechas
      const tareas = await prisma.tarea.findMany({
        include: {
          estado: true
        },
        orderBy: {
          fechaLimite: 'asc'
        },
        where: { proyectoId: projectId }
      });

      // Crear estructura para los 12 meses
      const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
      const evolucion: EvolucionProyecto = {
        completadas: Array.from<number>({ length: 12 }).fill(0),
        enProgreso: Array.from<number>({ length: 12 }).fill(0),
        labels: meses,
        pendientes: Array.from<number>({ length: 12 }).fill(0)
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

      return evolucion;

    } catch (error) {
      console.error('❌ Error obteniendo evolución del proyecto:', error);
      
      // Fallback: retornar estructura vacía
      return {
        completadas: Array.from<number>({ length: 12 }).fill(0),
        enProgreso: Array.from<number>({ length: 12 }).fill(0),
        labels: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
        pendientes: Array.from<number>({ length: 12 }).fill(0)
      };
    }
  }

  // ✅ MÉTODO: Datos completos para exportación
  async getProjectExportData(projectId: string): Promise<unknown> {
    try {
      console.log('📤 Obteniendo datos completos para exportación del proyecto:', projectId);
      
      const proyecto = await prisma.proyectos.findUnique({
        include: {
          // Información básica del proyecto
          creadoPor: {
            select: {
              apellido: true,
              email: true,
              id: true,
              nombre: true
            }
          },
          // Estados disponibles (TODOS, no solo los básicos)
          estados: {
            include: {
              color: true,
              tareas: {
                where: { proyectoId: projectId }
              }
            },
            orderBy: {
              posicion: 'asc'
            }
          },
          // Etiquetas del proyecto
          etiquetas: {
            select: {
              _count: {
                select: {
                  tareas: true
                }
              },
              id: true,
              nombre: true
            }
          },
          // Miembros del proyecto
          miembros: {
            include: {
              rol: {
                select: {
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
          },
          // Todas las tareas con información completa
          tareas: {
            include: {
              comentarios: {
                include: {
                  autor: {
                    select: {
                      apellido: true,
                      nombre: true
                    }
                  }
                },
                orderBy: {
                  createdAt: 'desc'
                }
              },
              estado: {
                select: {
                  nombre: true
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
            },
            orderBy: [
              { estadoId: 'asc' },
              { posicion: 'asc' }
            ]
          }
        },
        where: { id: projectId }
      });

      if (!proyecto) {
        throw new Error('Proyecto no encontrado');
      }

      // Obtener eficiencia de miembros MEJORADA
      const usuariosEficiencia = await this.getEficienciaPorMiembroMejorada(projectId);
      // Obtener evolución DINÁMICA COMPLETA del proyecto (NUEVO MÉTODO)
      const evolucionDinamicaCompleta = await this.getEvolucionDinamicaCompleta(projectId);
      // Obtener distribución dinámica por estado
      const distribucionDinamica = await this.getDistribucionPorEstadoDinamica(projectId);

      // Estructurar datos para exportación
      const exportData = {
        equipo: proyecto.miembros.map(miembro => ({
          email: miembro.usuario.email,
          rol: miembro.rol.nombre,
          usuario: `${miembro.usuario.nombre} ${miembro.usuario.apellido}`
        })),
        estadisticas: {
          distribucionDinamicaPorEstado: distribucionDinamica,
          eficienciaPorUsuario: usuariosEficiencia,
          evolucionDinamicaCompleta: evolucionDinamicaCompleta,
          evolucionProyecto: await this.getEvolucionProyecto(projectId),
          progresoGeneral: {
            porcentajeCompletado: proyecto.tareas.length > 0 ? 
              Math.round((proyecto.tareas.filter(t => 
                this.isTaskCompleted(t.estado.nombre)
              ).length / proyecto.tareas.length) * 100) : 0,
            tareasCompletadas: proyecto.tareas.filter(t => 
              this.isTaskCompleted(t.estado.nombre)
            ).length,
            totalTareas: proyecto.tareas.length
          },
          tareasPorEstado: proyecto.estados.map(estado => ({
            cantidad: estado.tareas.length,
            estado: estado.nombre,
            color: estado.color?.codigo || null
          })),
          tareasPorPrioridad: await this.getTareasPorPrioridad(projectId)
        },
        estados: proyecto.estados.map(estado => ({
          id: estado.id,
          nombre: estado.nombre,
          posicion: estado.posicion,
          color: estado.color ? {
            codigo: estado.color.codigo,
            nombre: estado.color.nombre
          } : null,
          totalTareas: estado.tareas.length
        })),
        etiquetas: proyecto.etiquetas,
        metadata: {
          exportDate: new Date().toISOString(),
          formatVersion: '4.0', // Incrementado por cambios dinámicos mejorados
          projectId: proyecto.id,
          totalEstados: proyecto.estados.length
        },
        proyecto: {
          creadoPor: `${proyecto.creadoPor.nombre} ${proyecto.creadoPor.apellido}`,
          createdAt: proyecto.createdAt,
          descripcion: proyecto.descripcion,
          id: proyecto.id,
          nombre: proyecto.nombre,
          totalEstados: proyecto.estados.length,
          totalEtiquetas: proyecto.etiquetas.length,
          totalMiembros: proyecto.miembros.length,
          totalTareas: proyecto.tareas.length
        },
        tareas: proyecto.tareas.map(tarea => ({
          createdAt: tarea.createdAt,
          estado: tarea.estado.nombre,
          etiquetas: tarea.etiquetas.map(te => te.etiqueta.nombre),
          fechaLimite: tarea.fechaLimite,
          id: tarea.id,
          posicion: tarea.posicion,
          responsables: tarea.responsables.map(r => ({
            email: r.usuario.email,
            nombre: `${r.usuario.nombre} ${r.usuario.apellido}`
          })),
          titulo: tarea.titulo ?? 'Sin título',
          totalComentarios: tarea.comentarios.length,
          ultimosComentarios: tarea.comentarios.slice(0, 3).map(c => ({
            autor: `${c.autor.nombre} ${c.autor.apellido}`,
            contenido: c.contenido.substring(0, 100) + (c.contenido.length > 100 ? '...' : ''),
            fecha: c.createdAt
          }))
        }))
      };

      console.log('✅ Datos de exportación generados correctamente');
      return exportData;

    } catch (error) {
      console.error('❌ Error obteniendo datos para exportación:', error);
      throw error;
    }
  }

  // ✅ MÉTODO: Datos resumidos para reportes rápidos
  async getProjectSummary(projectId: string): Promise<unknown> {
    try {
      const proyecto = await prisma.proyectos.findUnique({
        select: {
          _count: {
            select: {
              etiquetas: true,
              miembros: true,
              tareas: true
            }
          },
          createdAt: true,
          descripcion: true,
          id: true,
          nombre: true,
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
        },
        where: { id: projectId }
      });

      if (!proyecto) {
        throw new Error('Proyecto no encontrado');
      }

      // Obtener todos los estados con distribución
      const distribucionDinamica = await this.getDistribucionPorEstadoDinamica(projectId);
      // Obtener eficiencia de miembros MEJORADA
      const usuariosEficiencia = await this.getEficienciaPorMiembroMejorada(projectId);
      // Obtener evolución DINÁMICA COMPLETA del proyecto (NUEVO MÉTODO)
      const evolucionDinamicaCompleta = await this.getEvolucionDinamicaCompleta(projectId);

      const tareasCompletadas = proyecto.tareas.filter(t => 
        this.isTaskCompleted(t.estado.nombre)
      ).length;

      const tareasConVencimiento = proyecto.tareas.filter(t => t.fechaLimite).length;
      const tareasVencidas = proyecto.tareas.filter(t => 
        t.fechaLimite && new Date(t.fechaLimite) < new Date()
      ).length;

      return {
        distribucionEstados: distribucionDinamica,
        evolucionDinamicaCompleta: evolucionDinamicaCompleta,
        exportDate: new Date().toISOString(),
        proyecto: {
          descripcion: proyecto.descripcion,
          duracion: Math.ceil((new Date().getTime() - proyecto.createdAt.getTime()) / (1000 * 60 * 60 * 24)),
          fechaCreacion: proyecto.createdAt,
          nombre: proyecto.nombre
        },
        resumen: {
          eficienciaMiembros: usuariosEficiencia,
          evolucionProyecto: await this.getEvolucionProyecto(projectId),
          porcentajeCompletado: proyecto._count.tareas > 0 ? 
            Math.round((tareasCompletadas / proyecto._count.tareas) * 100) : 0,
          tareasCompletadas,
          tareasConVencimiento,
          tareasVencidas,
          totalEtiquetas: proyecto._count.etiquetas,
          totalMiembros: proyecto._count.miembros,
          totalTareas: proyecto._count.tareas
        }
      };
    } catch (error) {
      console.error('Error obteniendo resumen del proyecto:', error);
      throw error;
    }
  }

  // ✅ MÉTODO: Obtener conteo de tareas en revisión
  async getTareasEnRevisionCount(projectId: string): Promise<number> {
    try {
      const count = await prisma.tarea.count({
        where: {
          estado: {
            nombre: {
              contains: 'revisión',
              mode: 'insensitive'
            }
          },
          proyectoId: projectId
        }
      });
      
      console.log(`✅ Tareas en revisión para proyecto ${projectId}:`, count);
      return count;

    } catch (error) {
      console.error('❌ Error contando tareas en revisión:', error);
      return 0;
    }
  }

  // ✅ MÉTODO: Obtener conteo de tareas por estado real
  async getTareasPorEstado(projectId: string): Promise<{ cantidad: number; estado: string; }[]> {
    try {
      console.log('📊 Obteniendo tareas por estado para proyecto:', projectId);
      
      const tareasPorEstado = await prisma.tarea.groupBy({
        _count: {
          _all: true
        },
        by: ['estadoId'],
        where: {
          proyectoId: projectId
        }
      });

      // Obtener los nombres de los estados
      const estados = await prisma.estado.findMany({
        select: {
          id: true,
          nombre: true
        },
        where: {
          id: {
            in: tareasPorEstado.map(item => item.estadoId)
          }
        }
      });

      // Mapear resultados
      const resultado = tareasPorEstado.map(item => {
        const estado = estados.find(e => e.id === item.estadoId);
        return {
          cantidad: item._count._all,
          estado: estado?.nombre ?? 'Desconocido'
        };
      });

      console.log('✅ Conteo por estado:', resultado);
      return resultado;

    } catch (error) {
      console.error('❌ Error obteniendo tareas por estado:', error);
      return [];
    }
  }

  // ✅ MÉTODO CORREGIDO: Obtener conteo de tareas por prioridad (etiquetas)
  async getTareasPorPrioridad(projectId: string): Promise<{ cantidad: number; prioridad: string; }[]> {
    try {
      console.log('📊 Obteniendo tareas por prioridad para proyecto:', projectId);
      
      // Buscar TODAS las etiquetas del proyecto y contar sus tareas
      const todasLasEtiquetas = await prisma.etiqueta.findMany({
        include: {
          tareas: {
            select: {
              tareaId: true
            }
          }
        },
        where: {
          proyectoId: projectId
        }
      });

      console.log('🔍 Todas las etiquetas encontradas:', todasLasEtiquetas.map(e => ({
        cantidad: e.tareas.length,
        nombre: e.nombre
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
        cantidad: e.tareas.length,
        nombre: e.nombre
      })));

      // Si no hay etiquetas de prioridad con tareas, retornar array vacío
      if (etiquetasPrioridad.length === 0) {
        console.log('ℹ️ No se encontraron etiquetas de prioridad con tareas para el proyecto:', projectId);
        return [];
      }

      // Contar tareas por cada etiqueta de prioridad
      const resultado = etiquetasPrioridad.map(etiqueta => ({
        cantidad: etiqueta.tareas.length,
        prioridad: this.normalizarNombrePrioridad(etiqueta.nombre)
      }));

      console.log('✅ Conteo REAL por prioridad:', resultado);
      return resultado;

    } catch (error) {
      console.error('❌ Error obteniendo tareas por prioridad:', error);
      return [];
    }
  }

  // ✅ MÉTODO MEJORADO: Obtener eficiencia de TODOS los miembros del proyecto
  async getEficienciaPorMiembro(projectId: string): Promise<UsuarioEficienciaMejorada[]> {
    try {
      console.log('📊 Obteniendo eficiencia para TODOS los miembros del proyecto:', projectId);
      
      // Obtener todos los miembros del proyecto
      const miembros = await prisma.miembro.findMany({
        include: {
          usuario: {
            select: {
              apellido: true,
              id: true,
              nombre: true
            }
          }
        },
        where: { 
          proyectoId: projectId 
        }
      });

      // Para cada miembro, obtener sus tareas y calcular eficiencia
      const eficienciaPromises = miembros.map(async (miembro) => {
        // Obtener todas las tareas donde este usuario es responsable en este proyecto
        const tareasResponsable = await prisma.responsable.findMany({
          include: {
            tarea: {
              include: {
                estado: true
              }
            }
          },
          where: {
            tarea: {
              proyectoId: projectId
            },
            usuarioId: miembro.usuarioId
          }
        });

        const totalTareas = tareasResponsable.length;
        
        // Contar tareas completadas
        const tareasCompletadas = tareasResponsable.filter(responsable => 
          this.isTaskCompleted(responsable.tarea.estado.nombre)
        ).length;

        const nombreCompleto = `${miembro.usuario.nombre} ${miembro.usuario.apellido}`;
      
        return {
          nombreCompleto,
          tareasCompletadas,
          totalTareas,
          tareasPendientes: totalTareas - tareasCompletadas,
          tareasEnProgreso: tareasResponsable.filter(responsable => 
            this.isTaskInProgress(responsable.tarea.estado.nombre)
          ).length,
          eficiencia: totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0
        };
      });

      const eficienciaMiembros = await Promise.all(eficienciaPromises);
      
      // Filtrar miembros que tienen al menos una tarea asignada
      const miembrosConTareasAsignadas = eficienciaMiembros.filter(miembro => miembro.totalTareas > 0);
      
      console.log(' Eficiencia por miembro calculada:', miembrosConTareasAsignadas);
      return miembrosConTareasAsignadas;

    } catch (error) {
      console.error(' Error obteniendo eficiencia por miembro:', error);
      return [];
    }
  }

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

  // ✅ NUEVO: Método para verificar si un estado está en revisión
  private isTaskInReview(estadoNombre: string): boolean {
    const normalized = estadoNombre.toLowerCase().trim();
    return normalized.includes('revisión') || normalized.includes('revision') || normalized.includes('review');
  }
}