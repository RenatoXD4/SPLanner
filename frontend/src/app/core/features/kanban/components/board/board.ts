import { Component, ElementRef, ViewChild, ChangeDetectorRef, HostListener, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  DragDropModule
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Sidebar } from '../../../../shared/ui/sidebar/sidebar';
import { BoardService, Color as ColorType } from '../../services/kanban-service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth-service';
import { ProyectoGuard } from '../../../../../guards/proyecto.guard';
import { TaskDetail } from "../task-detail/task-detail";
import { NgZone } from '@angular/core';

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  avatarUrl?: string;
}

export interface MiembroProyecto {
  usuario: User;
  rol: any;
}

export interface ResponsableTarea {
  usuario: User;
  tareaId: string;
  id: number;
  usuarioId: string;
}


export interface Categoria {
  id: string;
  nombre: string;
  posicion: number;
  tasks: Task[];
  color?: ColorType;   // Añadido para manejar el color de la columna
}

interface Task {
  id: string;
  titulo?: string;
  fechaLimite?: string;
  posicion: number;
  createdAt: string;
  estadoId: number;
  proyectoId: string;

  // Campos backend opcionales que pueden venir
  assignee?: User[]; // lista de usuarios asignados
  etiquetas?: any[];
  bloquesContenido?: any[];

  // Campos frontend (para UI)
  title?: string;
  dueDate?: string;
}

interface RawTask {
  id: string;
  titulo?: string;
  fechaLimite?: string;
  posicion: number;
  createdAt: string;
  estadoId: number;
  proyectoId: string;

  responsables?: { usuario: User }[]; // ← NUEVO
  etiquetas?: any[];
  bloquesContenido?: any[];
}

export interface Etiqueta {
  id: number;       // ID único de la etiqueta
  nombre: string;   // Nombre de la etiqueta
  color: string;
}

interface ColorObj {
  id: number;
  nombre: string;
  codigo: string;
}

interface EtiquetaConColor {
  id: number;
  nombre: string;
  color?: ColorObj | string;  // Puede ser objeto o string según tipo recibido
}

@Component({
  selector: 'app-board',
  imports: [CdkDropList, CdkDrag, CommonModule, FormsModule, Sidebar, TaskDetail, DragDropModule],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnInit {

  public selectedTask: Task | null = null;
  public isDetailPanelHidden: boolean = true;

  showTaskDetails(task: Task) {
    this.selectedTask = task;
    this.isDetailPanelHidden = false;
  }

  hideTaskDetails() {
    this.isDetailPanelHidden = true;
    this.selectedTask = null; // Opcional: limpia la tarea seleccionada
  }

  @ViewChild('kanbanContainer') kanbanContainer?: ElementRef;
  @ViewChild('listContainer') listContainer?: ElementRef;
  @ViewChild('assignedContainer') assignedContainer?: ElementRef;
  @ViewChild('thTitulo') thTitulo!: ElementRef;
  @ViewChild('colorSelectorContainer', { static: false }) colorSelectorContainer?: ElementRef;


  currentUser: string = '';
  sidebarOpen = false;
  modalVisible = false;

  proyectoIdActual: string = '';

  CategoriasK: Categoria[] = [];
  miembrosDelProyecto: ResponsableTarea[] = [];
  colores: ColorType[] = [];

  etiquetasUnicas: any[] = [];

  viewMode: 'kanban' | 'list' | 'assigned' = 'kanban';

  hoveredTaskId: string | null = null;
  timeoutId?: ReturnType<typeof setTimeout>;

  //Filtros
  filtroTitulo = '';
  textoFiltro = '';
  mostrarListadoFiltros = false;
  filtrosSeleccionados: string[] = [];
  filtroActivo: string | null = null;
  filtroResponsable: string[] = [];
  filtroCategoria: (string | number)[] = [];
  filtroEtiquetas: number[] = [];
  filtroModo: { [key: string]: 'incluir' | 'excluir' } = {
    responsable: 'incluir',
    categoria: 'incluir',
    etiquetas: 'incluir',
  };


  prioridadesUnicas: string[] = [];
  responsablesUnicos: string[] = [];


  mostrarPanelFiltros = false;
  mostrarPanelFiltroTitulo = false;

  categoriaSeleccionadaForModal: Categoria | null = null;

  newTask = {
    titulo: '',
    fechaLimite: '',
    responsablesIds: [] as string[],
    etiquetaIds: [] as number[],
    estadoId: 0,
    proyectoId: '',
    bloquesContenido: []
  };

  errores = {
    titulo: false,
  };

  // Controla qué columnas tienen visible el selector de color
  colorSelectorVisible: Record<string, boolean> = {};

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private proyectoGuard: ProyectoGuard
  ) { }

  async ngOnInit() {


    // Obtener el ID del usuario actual
    const userId = this.authService.getCurrentUserId();
    if (!userId) {

      this.router.navigate(['/login']);
      return;
    }
    this.currentUser = userId;

    // Obtener proyecto ID del guard
    const proyectoId = this.proyectoGuard.getProyectoActual();

    if (!proyectoId) {

      this.mostrarErrorYRedirigir('No hay proyecto seleccionado');
      return;
    }

    // Validación adicional: verificar que el proyecto existe y es accesible
    try {
      await this.validarAccesoProyecto(proyectoId);
      this.proyectoIdActual = proyectoId;
      this.cargarDatosProyecto(proyectoId);

      this.cargarColores();
    } catch (error) {

      this.mostrarErrorYRedirigir('No tienes acceso a este proyecto');
    }

  }






  ///////////////////////////////////////////////////
  private async validarAccesoProyecto(proyectoId: string): Promise<void> {
    // Intentar cargar los estados del proyecto
    // Si falla, significa que no tiene acceso
    await this.boardService.getEstadosDelProyecto(proyectoId).toPromise();
  }

  private mostrarErrorYRedirigir(mensaje: string): void {
    alert(mensaje);
    this.proyectoGuard.clearProyectoActual();
    this.router.navigate(['/proyectos']);

  }

  // Cargar todos los datos del proyecto
  private cargarDatosProyecto(proyectoId: string): void {
    this.boardService.getEstadosDelProyecto(proyectoId).subscribe({
      next: (estados) => {
        this.CategoriasK = estados.map(est => ({
          id: est.id.toString(),
          nombre: est.nombre,
          posicion: est.posicion,
          color: est.color ?? { id: 0, nombre: 'default', codigo: '#cccccc' },
          tasks: []
        }));

        this.configurarEstilosPorEstado(this.CategoriasK);

        this.cargarTareasProyecto(proyectoId);
        this.cargarEtiquetasProyecto(proyectoId);
        this.cargarMiembrosProyecto(proyectoId);
      },
      error: (err) => {
        this.mostrarMensajeError('Error al cargar el proyecto');
      }
    });
  }

  //Cargar tareas del proyecto
  private cargarTareasProyecto(proyectoId: string): void {
    this.boardService.getTareasPorProyecto(proyectoId).subscribe({
      next: (tareas: RawTask[]) => {
        this.CategoriasK.forEach(cat => cat.tasks = []);

        tareas.forEach(t => {
          const categoria = this.CategoriasK.find(c => c.id === t.estadoId.toString());
          if (categoria) {
            const task: Task = {
              ...t,
              assignee: Array.isArray(t.responsables)
                ? t.responsables.map(r => r.usuario)
                : [],
              etiquetas: Array.isArray(t.etiquetas) ? t.etiquetas : [],
              bloquesContenido: Array.isArray(t.bloquesContenido) ? t.bloquesContenido : [],
              title: t.titulo ?? '',
              dueDate: t.fechaLimite ?? '',
            };
            categoria.tasks.push(task);
          }
        });

        this.CategoriasK.forEach(cat => {
          cat.tasks.sort((a, b) => (a.posicion ?? 0) - (b.posicion ?? 0));
        });

        this.generarListaResponsables();
        this.generarListaPrioridades();
        this.cdr.detectChanges();
      },
      error: (err) => {

      }
    });
  }

  private cargarColores(): void {
    this.boardService.getAllColors().subscribe({
      next: (colores) => {
        this.colores = colores;
        // Aquí puedes, si quieres, hacer lógica adicional asociada a colores
        console.log('Colores cargados:', this.colores);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar colores:', err);
      }
    });
  }

  // Cargar etiquetas del proyecto
  private cargarEtiquetasProyecto(proyectoId: string): void {
    this.boardService.getAllEtiquetas(proyectoId).subscribe({
      next: (etiquetas: EtiquetaConColor[]) => {
        this.etiquetasUnicas = etiquetas.map(e => {
          let colorHex = '#666'; // fallback por defecto
          if (typeof e.color === 'object' && e.color !== null && 'codigo' in e.color) {
            colorHex = (e.color as ColorObj).codigo;
          } else if (typeof e.color === 'string') {
            colorHex = e.color;
          }
          return {
            id: e.id,
            nombre: e.nombre,
            color: colorHex
          };
        });
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar etiquetas:', err),
    });
  }

  //Cargar miembros del proyecto
  private cargarMiembrosProyecto(proyectoId: string): void {
    this.boardService.getEquipoProyecto(proyectoId).subscribe({
      next: (miembros: MiembroProyecto[]) => {
        this.miembrosDelProyecto = miembros.map((m, index) => ({
          usuario: m.usuario,
          tareaId: '',
          id: index,
          usuarioId: m.usuario.id
        }));
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar miembros:', err)
    });
  }

  //Mostrar mensaje de error
  private mostrarMensajeError(mensaje: string): void {
    // Puedes implementar un sistema de notificaciones más elaborado aquí
    alert(mensaje);
  }

  private estilosPorColumna: Record<string, {
    fondoColumna: { 'background-color': string },
    fondoTarjeta: { 'background-color': string, color: string },
    texto: { color: string, 'text-shadow'?: string },
    boton: { 'background-color': string, color: string }
  }> = {};

  // Función para aclarar color HEX mezclándolo con blanco
  private lightenColor(hex: string, percent: number): string {
    let r: number, g: number, b: number;

    // Expandir formato corto #RGB a #RRGGBB
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_m, rHex, gHex, bHex) => {
      return rHex + rHex + gHex + gHex + bHex + bHex;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return hex;

    r = Math.min(255, Math.floor(parseInt(result[1], 16) + (255 - parseInt(result[1], 16)) * percent));
    g = Math.min(255, Math.floor(parseInt(result[2], 16) + (255 - parseInt(result[2], 16)) * percent));
    b = Math.min(255, Math.floor(parseInt(result[3], 16) + (255 - parseInt(result[3], 16)) * percent));

    return `rgb(${r},${g},${b})`;
  }

  // Convierte HEX a RGBA con alfa
  private hexToRgba(hex: string, alpha: number): string {
    let r: number, g: number, b: number;

    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_m, rHex, gHex, bHex) => {
      return rHex + rHex + gHex + gHex + bHex + bHex;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(0,0,0,${alpha})`;

    r = parseInt(result[1], 16);
    g = parseInt(result[2], 16);
    b = parseInt(result[3], 16);

    return `rgba(${r},${g},${b},${alpha})`;
  }

  // Configura estilos con texto brillante y sombra de texto
  private configurarEstilosPorEstado(categorias: Categoria[]) {
    this.estilosPorColumna = {};
    categorias.forEach(cat => {
      const colorHex = cat.color?.codigo ?? '#cccccc';

      this.estilosPorColumna[cat.nombre] = {
        fondoColumna: { 'background-color': this.hexToRgba(colorHex, 0.1) },
        fondoTarjeta: {
          'background-color': this.hexToRgba(colorHex, 0.2),
          color: this.lightenColor(colorHex, 0.3)
        },
        texto: {
          color: this.lightenColor(colorHex, 0.64),
          'text-shadow': `0 0 2px ${colorHex}, 0 0 4px ${colorHex}, 0 0 5px ${colorHex}`
        },
        boton: { 'background-color': colorHex, color: '#fff' }
      };
    });
  }

  // Métodos para obtener estilos (a usarse con [ngStyle])
  getColumnColorClass(nombre: string): { 'background-color': string } {
    return this.estilosPorColumna[nombre]?.fondoColumna || { 'background-color': '#e5e7eb' };
  }

  getCardColorClass(nombre: string): { 'background-color': string, color: string } {
    return this.estilosPorColumna[nombre]?.fondoTarjeta || { 'background-color': '#f9fafb', color: '#6b7280' };
  }

  getTextColorClass(nombre: string): { color: string, 'text-shadow'?: string } {
    return this.estilosPorColumna[nombre]?.texto || { color: '#6b7280' };
  }

  getButtonColorClass(nombre: string): { 'background-color': string, color: string } {
    return this.estilosPorColumna[nombre]?.boton || { 'background-color': '#3b82f6', color: '#fff' };
  }


  agregarEtiquetaSiNueva(nombre: string) {
    const existe = this.etiquetasUnicas.some(e => e.nombre.trim().toLowerCase() === nombre.trim().toLowerCase());
    if (!existe && nombre.trim().length > 0) {
      // Acá podrías agregar la lógica para crear una nueva etiqueta
      // Por ejemplo, llamar a tu backend y agregarla en etiquetasUnicas
    }
    this.tagsBusquedaTexto = '';
    this.filtrarTags();
  }



  getButtonClasses(view: string) {
    return {
      'border-primary text-primary font-semibold ring-2 ring-primary/30': this.viewMode === view,
    };
  }

  getEtiquetaColorByNombre(nombre: string): string {
    const etiqueta = this.etiquetasUnicas.find(e => e.nombre === nombre);
    return etiqueta ? etiqueta.color : '#666'; // fallback si no encuentra color
  }

  getNombreResponsables(users?: User[]): string {
    if (!users || users.length === 0) return '';
    return users.map(u => `${u.nombre} ${u.apellido}`).join(', ');
  }

  // Función para obtener los nombres de las etiquetas asociadas a una tarea
  getNombresEtiquetas(etiquetas: any[]): string[] {
    if (!etiquetas || etiquetas.length === 0) return [];

    return etiquetas
      .map(e => {
        // Accede al campo 'etiqueta' y luego toma su 'nombre'
        return e.etiqueta ? e.etiqueta.nombre : '';
      })
      .filter(nombre => nombre); // Filtra cualquier cadena vacía
  }

  drop(event: CdkDragDrop<Task[]>) {
    const prevTasks = event.previousContainer.data;
    const currTasks = event.container.data;

    const task = prevTasks[event.previousIndex];
    const cambioDeColumna = event.previousContainer.id !== event.container.id;

    if (!cambioDeColumna) {
      // Reordenamiento dentro de la misma columna
      moveItemInArray(currTasks, event.previousIndex, event.currentIndex);
      this.reordenarDentroMismaColumna(event.container.id, currTasks);
    } else {
      // Cambio de columna
      const nuevoEstadoId = Number(event.container.id);

      // 1. Actualiza localmente antes de enviar al backend
      task.estadoId = nuevoEstadoId;

      // 2. Transfiere la tarea visualmente
      transferArrayItem(prevTasks, currTasks, event.previousIndex, event.currentIndex);

      // 3. Enviar al backend el cambio
      this.boardService.updateTask(task.id, {
        estadoId: nuevoEstadoId,
        posicion: event.currentIndex
      }).subscribe({
        next: () => {
          // 4. Reordenar tareas en la columna nueva
          this.reordenarDentroMismaColumna(event.container.id, currTasks);
          this.cdr.detectChanges();
        },
        error: err => {
          console.error('Error al mover tarea:', err);

          // Opción: volver a mover la tarea a su lugar original si falla
          transferArrayItem(currTasks, prevTasks, event.currentIndex, event.previousIndex);

          this.cdr.detectChanges(); // Forzar la detección de cambios en caso de error
        }
      });
    }
  }
  onDragStarted() {
    this.hoveredTaskId = null;
  }
  onDragEnded() {
    this.hoveredTaskId = null;
  }
  onTaskHover(taskId: string) {
    this.hoveredTaskId = taskId;
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      if (this.hoveredTaskId === taskId) this.hoveredTaskId = null;
    }, 3000);
  }
  onTaskHoverLeave(taskId: string) {
    if (this.hoveredTaskId === taskId) this.hoveredTaskId = null;
  }
  reordenarDentroMismaColumna(containerId: string, tasks: Task[]) {
    tasks.forEach((t, idx) => {
      if (t.posicion !== idx) {
        this.boardService.updateTask(t.id, { posicion: idx }).subscribe({
          next: () => {
            t.posicion = idx;
            this.cdr.detectChanges();  // Esto asegura que Angular detecte el cambio.
          },
          error: e => console.error('Error al reordenar tarea:', e)
        });
      }
    });
  }

  get categoriasIds(): string[] {
    return this.CategoriasK.map(cat => cat.id);
  }

  setViewMode(mode: 'kanban' | 'list' | 'assigned') {
    if (this.viewMode === mode) return;
    this.viewMode = mode;
    setTimeout(() => {
      this.cdr.detectChanges();
      if (mode === 'kanban') this.applyAnimation(this.kanbanContainer);
      if (mode === 'list') this.applyAnimation(this.listContainer);
      if (mode === 'assigned') this.applyAnimation(this.assignedContainer);
    });
  }

  private applyAnimation(ref?: ElementRef) {
    if (!ref) return;
    const el = ref.nativeElement as HTMLElement;
    el.classList.remove('fade-slide-in');
    void el.offsetWidth;
    el.classList.add('fade-slide-in');
  }

  // Filtros & listas auxiliares
  private generarListaResponsables() {
    const set = new Set<string>();
    // Creamos un set con los IDs únicos de los responsables
    this.CategoriasK.forEach(cat =>
      cat.tasks.forEach(task => {
        (task.assignee ?? []).forEach(u => set.add(u.id)); // Agregamos solo los IDs
      })
    );

    // Generamos responsablesUnicos solo con los IDs (como se esperaba en el filtro)
    this.responsablesUnicos = Array.from(set);

    // Creamos una lista con los detalles completos de los responsables
    const responsablesDetalles = Array.from(set).map(id => {
      // Aquí comparamos con `usuarioId` en lugar de `usuario.id`
      const usuario = this.miembrosDelProyecto.find(m => m.usuarioId === id);
      if (usuario) {
        return { id: usuario.usuario.id, nombre: usuario.usuario.nombre, apellido: usuario.usuario.apellido };
      }
      // Si no lo encontramos, lo agregamos como desconocido
      return { id, nombre: 'Desconocido', apellido: '' };
    });

  }

  private generarListaPrioridades() {
    const set = new Set<string>();

    // Iteramos sobre las categorías y tareas para obtener las prioridades únicas
    this.CategoriasK.forEach(cat => {
      cat.tasks.forEach(task => {
        if (task.etiquetas && Array.isArray(task.etiquetas)) {
          task.etiquetas.forEach(etiqueta => {
            if (etiqueta.nombre) {
              set.add(etiqueta.nombre);
            }
          });
        }
      });
    });

    // Convertimos el Set a un array con las prioridades únicas
    this.prioridadesUnicas = Array.from(set);
  }

  // Modal de Crear Tarea
  abrirModal(categoria: Categoria) {
    this.categoriaSeleccionadaForModal = categoria;
    this.newTask = {
      titulo: '',
      fechaLimite: '',
      responsablesIds: [] as string[],
      etiquetaIds: [] as number[],
      estadoId: Number(categoria.id),
      proyectoId: this.proyectoIdActual,
      bloquesContenido: []
    };

    const modal = document.getElementById('modalNuevaTarea') as HTMLDialogElement;
    modal?.showModal();
  }

  cerrarModal() {
    const modal = document.getElementById('modalNuevaTarea') as HTMLDialogElement;
    modal?.close();

    this.newTask = {
      titulo: '',
      fechaLimite: '',
      responsablesIds: [],
      etiquetaIds: [],
      estadoId: 0,
      proyectoId: '',
      bloquesContenido: []
    };
    this.categoriaSeleccionadaForModal = null;

    this.cdr.detectChanges();
  }

  crearTarea(event: Event) {
    // Resetear el estado de los errores
    event.preventDefault();

    // Validación del título
    if (!this.newTask.titulo || !this.newTask.titulo.trim()) {
      this.errores.titulo = true; // Establecer el error en el título
      return; // Detener la ejecución si el título es inválido
    }

    // Limpiar errores si la validación es exitosa
    this.errores.titulo = false;

    const estadoId = Number(this.categoriaSeleccionadaForModal?.id);
    const responsablesArr = this.newTask.responsablesIds.filter(id => !!id);

    const proyectoId = this.proyectoIdActual;

    const fechaLimiteISO = this.newTask.fechaLimite ? new Date(this.newTask.fechaLimite).toISOString() : undefined;

    const payload = {
      titulo: this.newTask.titulo,
      estadoId,
      posicion: this.categoriaSeleccionadaForModal?.tasks.length || 0,
      proyectoId,
      responsablesIds: responsablesArr.length ? responsablesArr : undefined,
      fechaLimite: fechaLimiteISO,
      bloquesContenido: [],
      etiquetaIds: this.newTask.etiquetaIds.length ? this.newTask.etiquetaIds : undefined,
    };

    // Enviar la solicitud al backend
    this.boardService.createTask(payload).subscribe({
      next: (tareaNueva) => {
        // Mapear responsables para UI
        const responsablesParaUI = responsablesArr.map(id => {
          const miembro = this.miembrosDelProyecto.find(m => m.usuario.id === id);
          return miembro ? miembro.usuario : { id, nombre: 'Desconocido', apellido: '', email: '' };
        });

        const task: Task = {
          ...tareaNueva,
          assignee: responsablesParaUI,
          etiquetas: tareaNueva.etiquetas ?? [],
          bloquesContenido: tareaNueva.bloquesContenido ?? [],
          title: tareaNueva.titulo ?? '',
          dueDate: tareaNueva.fechaLimite ?? '',
        };

        this.zone.run(() => {
          // Actualizar la vista
          if (this.categoriaSeleccionadaForModal) {
            this.categoriaSeleccionadaForModal.tasks = [...this.categoriaSeleccionadaForModal.tasks, task];
            this.categoriaSeleccionadaForModal.tasks.sort((a, b) => (a.posicion ?? 0) - (b.posicion ?? 0));
          }
          this.generarListaResponsables();
          this.generarListaPrioridades();
          this.cdr.detectChanges();
          this.cerrarModal();
        });
      },
      error: (err) => {
        console.error('Error creando tarea:', err);
        alert('Ocurrió un error al crear la tarea');
      }
    });
  }


  isOverdue(dateStr: string | undefined): boolean {
    if (!dateStr) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // poner horas a 00:00:00

    const taskDate = new Date(dateStr);
    taskDate.setHours(0, 0, 0, 0); // quitar horas

    return taskDate < today;
  }

  isDueSoon(dateStr: string | undefined): boolean {
    if (!dateStr) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(dateStr);
    taskDate.setHours(0, 0, 0, 0);

    const diffInMs = taskDate.getTime() - today.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays >= 0 && diffInDays <= 1; // hoy o mañana
  }

  formatDate(date: string): string {
    if (!date) return 'Sin fecha';
    const newDate = new Date(date);
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  }

  eliminarTarea(taskId: string): void {
    //if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
    this.boardService.deleteTask(taskId).subscribe(
      () => {
        //console.log('Tarea eliminada');
        // Buscar en todas las categorías y eliminar la tarea
        this.CategoriasK.forEach(categoria => {
          categoria.tasks = categoria.tasks.filter(task => task.id !== taskId);
        });
        this.generarListaResponsables();
        this.generarListaPrioridades();
        this.cdr.detectChanges();  // Asegura que Angular detecte los cambios
      },
      (error) => {
        console.error('Error al eliminar la tarea:', error);  // Detalle completo del error
        if (error.message.includes("La tarea con ID")) {
          //alert(`Error: ${error.message}`);  // Mostrar mensaje amigable
        } else {
          //alert('Error al eliminar la tarea. Por favor, intente nuevamente.');
        }
      }
    );
    //}
  }

  editarTarea(taskId: string) {
    // Lógica para abrir el modal o ventana de edición
    console.log('Editar tarea con ID:', taskId);
    // Puedes agregar aquí la lógica que desees para editar la tarea.
  }

  // ESTO Viene siendo como el Id de la etiqueta del html
  @ViewChild('tarjetaFiltro') tarjetaFiltro!: ElementRef;
  buscadorFiltros: { [key: string]: string } = {};

  // esto escucha cambios y realiza la accion
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.filtroActivo && this.tarjetaFiltro) {
      const clickedInside = this.tarjetaFiltro.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.filtroActivo = null;
      }
    }
  }

  // === FILTRO PRINCIPAL DE TAREAS EN VISTA LISTA ===
  get tareasFiltradas() {
    return this.CategoriasK.flatMap(cat =>
      cat.tasks
        .filter(task => {
          const coincideTitulo = !this.filtroTitulo ||
            (task.title?.toLowerCase().includes(this.filtroTitulo.toLowerCase()) ?? false);

          const modoResp = this.filtroModo['responsable'];
          const modoCat = this.filtroModo['categoria'];
          const modoEtiq = this.filtroModo['etiquetas'];

          const responsables = task.assignee?.map(u => u.id) ?? [];
          const etiquetas = task.etiquetas?.map(e => e.etiqueta?.id ?? e.id) ?? [];

          const coincideResponsable = this.filtroResponsable.length === 0 || (
            modoResp === 'incluir'
              ? this.filtroResponsable.some(id => responsables.includes(id))
              : !this.filtroResponsable.some(id => responsables.includes(id))
          );

          const coincideCategoria = this.filtroCategoria.length === 0 || (
            modoCat === 'incluir'
              ? this.filtroCategoria.includes(cat.id)
              : !this.filtroCategoria.includes(cat.id)
          );

          const coincideEtiqueta = this.filtroEtiquetas.length === 0 || (
            modoEtiq === 'incluir'
              ? this.filtroEtiquetas.some(id => etiquetas.includes(id))
              : !this.filtroEtiquetas.some(id => etiquetas.includes(id))
          );

          return coincideTitulo && coincideResponsable && coincideCategoria && coincideEtiqueta;
        })
        .map(task => ({
          tarea: task,
          categoria: cat.nombre
        }))
    );
  }

  get tareasAsignadasFiltradas() {
    return this.CategoriasK.flatMap(cat =>
      cat.tasks
        .filter(task => task.assignee?.some(u => u.id === this.currentUser)) // Solo tareas asignadas al usuario actual
        .filter(task => !this.filtroTitulo || (task.title?.toLowerCase().includes(this.filtroTitulo.toLowerCase()) ?? false))
        .map(task => ({ tarea: task, categoria: cat.nombre }))
    );
  }
  // Devuelve cantidad de filtros activos
  get contadorFiltros(): number {
    let count = 0;
    if (this.filtroTitulo.trim()) count++;
    if (this.filtroResponsable.length) count++;
    if (this.filtroCategoria.length) count++;
    if (this.filtroEtiquetas.length) count++;
    return count;
  }
  // Agrega filtro si no existe
  agregarFiltro(filtro: string) {
    if (!this.filtrosSeleccionados.includes(filtro)) {
      this.filtrosSeleccionados.push(filtro);
      this.mostrarListadoFiltros = false;
      this.textoFiltro = '';
      this.buscadorFiltros[filtro] = '';
    }
  }
  // Quita filtro y limpia su valor
  quitarFiltro(filtro: string) {
    const idx = this.filtrosSeleccionados.indexOf(filtro);
    if (idx > -1) {
      this.filtrosSeleccionados.splice(idx, 1);
    }

    if (this.filtroActivo === filtro) {
      this.filtroActivo = null;
    }

    switch (filtro) {
      case 'responsable':
        this.filtroResponsable = [];
        break;
      case 'categoria':
        this.filtroCategoria = [];
        break;
      case 'etiquetas':
        this.filtroEtiquetas = [];
        break;
    }

    delete this.buscadorFiltros[filtro];

    // También reiniciar modo si lo quitás
    delete this.filtroModo[filtro];
  }
  toggleTarjetaFiltro(filtro: string) {
    if (this.filtroActivo === filtro) {
      this.filtroActivo = null; // Cierra si se vuelve a hacer clic en el mismo
    } else {
      this.filtroActivo = filtro; // Abre uno y cierra cualquier otro
    }
  }
  // Devuelve cantidad de items filtrados para un filtro dado (usado en badges)
  getContadorFiltro(filtro: string): number {
    switch (filtro) {
      case 'responsable':
        return this.filtroResponsable.length;
      case 'categoria':
        return this.filtroCategoria.length;
      case 'etiquetas':
        return this.filtroEtiquetas.length;
      default:
        return 0;
    }
  }
  seleccionarResponsable(r: ResponsableTarea) {
    const id = r.usuario.id;
    const index = this.filtroResponsable.indexOf(id);

    if (index > -1) {
      // Ya estaba seleccionado, lo quitamos
      this.filtroResponsable.splice(index, 1);
    } else {
      // No estaba, lo agregamos
      this.filtroResponsable.push(id);
    }
  }
  seleccionarCategoria(id: number | string) {
    const idStr = String(id);
    const index = this.filtroCategoria.indexOf(idStr);

    if (index > -1) {
      this.filtroCategoria = this.filtroCategoria.filter(i => String(i) !== idStr);
    } else {
      this.filtroCategoria = [...this.filtroCategoria, idStr];
    }
  }

  seleccionarEtiqueta(e: any) {
    const id = e?.id;

    if (id === undefined) {
      console.error('Se intentó seleccionar una etiqueta con id undefined');
      return;
    }

    const index = this.filtroEtiquetas.indexOf(id);

    if (index === -1) {
      this.filtroEtiquetas.push(id);
    } else {
      this.filtroEtiquetas.splice(index, 1);
    }

    console.log('Estado de filtroEtiquetas después de seleccionar: ', this.filtroEtiquetas);
  }
  quitarResponsable(id: string) {
    this.filtroResponsable = this.filtroResponsable.filter(rid => rid !== id);
  }
  quitarCategoria(id: number | string) {
    const idStr = String(id);
    this.filtroCategoria = this.filtroCategoria.filter(i => String(i) !== idStr);
  }
  quitarEtiqueta(id: number) {
    this.filtroEtiquetas = this.filtroEtiquetas.filter(eid => eid !== id);
  }
  // Limpiar todos los filtros
  limpiarFiltros() {
    this.filtroTitulo = '';
    this.filtroResponsable = [];
    this.filtroCategoria = [];
    this.filtroEtiquetas = [];

    this.filtrosSeleccionados = [];
    this.textoFiltro = '';
    this.buscadorFiltros = {};

    this.filtroActivo = null;

    // Reiniciar modos de inclusión/exclusión
    this.filtroModo = {
      responsable: 'incluir',
      categoria: 'incluir',
      etiquetas: 'incluir',
    };
  }
  get responsablesFiltrados() {
    if (!this.miembrosDelProyecto || this.miembrosDelProyecto.length === 0) return [];
    const texto = (this.buscadorFiltros['responsable'] || '').toLowerCase();
    return this.miembrosDelProyecto.filter(r =>
      `${r.usuario.nombre} ${r.usuario.apellido}`.toLowerCase().includes(texto)
    );
  }
  get categoriasFiltradas() {
    if (!this.CategoriasK || this.CategoriasK.length === 0) return [];
    const texto = (this.buscadorFiltros['categoria'] || '').toLowerCase();
    return this.CategoriasK.filter(c =>
      c.nombre.toLowerCase().includes(texto)
    );
  }
  get etiquetasFiltradas() {
    if (!this.etiquetasUnicas || this.etiquetasUnicas.length === 0) return [];

    return this.etiquetasUnicas.filter(e => {
      if (e.id === undefined || e.id === null) {
        console.error('Etiqueta sin ID detectada:', e);
        return false;  // Excluir elementos sin ID
      }
      const texto = (this.buscadorFiltros['etiquetas'] || '').toLowerCase();
      return e.nombre.toLowerCase().includes(texto);
    });
  }
  getNombreResponsable(id: string): string {
    const res = this.miembrosDelProyecto.find(m => m.usuario.id === id);
    return res?.usuario.nombre ?? 'Desconocido';
  }
  getNombreCategoria(id: string | number): string {
    const cat = this.CategoriasK.find(c => String(c.id) === String(id));
    return cat?.nombre ?? 'Desconocida';
  }
  getNombreEtiqueta(id: number): string {
    const etiqueta = this.etiquetasUnicas.find(e => e.id === id);
    return etiqueta?.nombre ?? 'Desconocida';
  }

  tagsBusquedaTexto = '';
  tagsFiltradas = [...this.etiquetasUnicas];

  filtrarTags() {
    const texto = this.tagsBusquedaTexto.toLowerCase().trim();
    if (!texto) {
      this.tagsFiltradas = [...this.etiquetasUnicas];
    } else {
      this.tagsFiltradas = this.etiquetasUnicas.filter(tag =>
        tag.nombre.toLowerCase().includes(texto)
      );
    }
  }


  toggleResponsable(id: string) {
    const idx = this.filtroResponsable.indexOf(id);
    if (idx > -1) {
      this.filtroResponsable.splice(idx, 1);
    } else {
      this.filtroResponsable.push(id);
    }
  }

  toggleCategoria(id: number | string) {
    const idStr = String(id);
    const index = this.filtroCategoria.map(String).indexOf(idStr);

    if (index > -1) {
      this.filtroCategoria = this.filtroCategoria.filter(i => String(i) !== idStr);
    } else {
      this.filtroCategoria = [...this.filtroCategoria, id];
    }
  }

  toggleEtiqueta(id: number) {
    if (id === undefined || id === null) {
      //console.error('Intento de agregar una etiqueta con id inválido:', id);
      return;
    }

    const idx = this.filtroEtiquetas.indexOf(id);

    if (idx === -1) {
      //console.log(`Agregando etiqueta con id: ${id}`);
      this.filtroEtiquetas.push(id);
    } else {
      //console.log(`Eliminando etiqueta con id: ${id}`);
      this.filtroEtiquetas.splice(idx, 1);
    }

    //console.log('Estado de filtroEtiquetas después de toggle: ', this.filtroEtiquetas);
  }

  updateEtiqueta(etiquetaId: number, nuevoNombre: string, nuevoColorId: number): void {
    if (!nuevoNombre.trim()) {
      alert('El nombre de la etiqueta no puede estar vacío.');
      return;
    }
    if (!nuevoColorId) {
      alert('Debe seleccionar un color para la etiqueta.');
      return;
    }

    // PASAR tambien proyectoId actual
    this.boardService.updateEtiqueta(etiquetaId, nuevoNombre, this.proyectoIdActual, nuevoColorId).subscribe({
      next: (etiquetaActualizada) => {
        console.log(etiquetaActualizada)
        const indice = this.etiquetasUnicas.findIndex(e => e.id === etiquetaId);
        if (indice !== -1) {
          this.etiquetasUnicas[indice].nombre = etiquetaActualizada.nombre;
          this.etiquetasUnicas[indice].color = etiquetaActualizada.color; // asegurarse backend retorna la propiedad 'color' con el código hexadecimal
        }
        this.cdr.detectChanges();
        alert('Etiqueta actualizada correctamente.');
      },
      error: (err) => {
        console.log(nuevoColorId)
        console.error('Error al actualizar etiqueta:', err);
        alert('Error al actualizar la etiqueta. Intente nuevamente.');
      }
    });
  }


  toggleSelectorColor(id: string) {
    this.colorSelectorVisible[id] = !this.colorSelectorVisible[id];
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.colorSelectorContainer && !this.colorSelectorContainer.nativeElement.contains(event.target)) {
      // Cierra todos los selectores si haces clic fuera
      this.colorSelectorVisible = {};
      this.cdr.detectChanges();
    }
  }

  cambiarColorColumna(id: string, color: ColorType): void {
    const cat = this.CategoriasK.find(c => c.id === id);
    if (!cat) return;

    cat.color = color;  // Actualiza localmente para UI rápida
    this.configurarEstilosPorEstado(this.CategoriasK);

    // Oculta el selector de color
    this.colorSelectorVisible[id] = false;
    this.cdr.detectChanges();

    // Envía solo la propiedad colorId al backend
    this.boardService.updateEstado(Number(id), { colorId: color.id }).subscribe({
      next: (estadoActualizado) => {
        console.log('Estado actualizado con nuevo color:', estadoActualizado);
        const idx = this.CategoriasK.findIndex(c => c.id === id);
        if (idx !== -1) {
          this.CategoriasK[idx].color = estadoActualizado.color;
        }
        this.cdr.detectChanges();
        //alert('Color de columna actualizado correctamente.');
      },
      error: (err) => {
        console.error('Error actualizando color columna:', err);
        //alert('Error al actualizar color. Intenta nuevamente.');
        this.cargarDatosProyecto(this.proyectoIdActual);
      }
    });
  }


  modalColumnaVisible: boolean = false;
  nuevaColumnaNombre: string = '';
  nuevaColumnaColorId: number | null = null;

  abrirModalNuevaColumna() {
    this.nuevaColumnaNombre = '';
    this.nuevaColumnaColorId = null;
    this.modalColumnaVisible = true;
  }

  cerrarModalNuevaColumna() {
    this.modalColumnaVisible = false;
  }

  crearColumna(event: Event) {
    event.preventDefault();
    if (!this.nuevaColumnaNombre.trim() || !this.nuevaColumnaColorId) return;

    const posicion = this.CategoriasK.length > 0
      ? Math.max(...this.CategoriasK.map(c => c.posicion)) + 1
      : 0;

    this.boardService.createEstado(
      this.nuevaColumnaNombre,
      posicion,
      this.proyectoIdActual,
      this.nuevaColumnaColorId
    ).subscribe({
      next: (estado) => {
        this.CategoriasK.push({
          id: estado.id.toString(),
          nombre: estado.nombre,
          posicion: estado.posicion,
          color: estado.color,
          tasks: []
        });
        this.configurarEstilosPorEstado(this.CategoriasK);
        this.cerrarModalNuevaColumna();
        this.cdr.detectChanges();
      },
      error: (err) => {
        //alert('Error al crear columna: ' + err.error.message +  'Error backend');
      }
    });
  }

  // Variables para manejo de confirmación eliminación columna
  modalConfirmEliminarVisible: boolean = false;
  columnaAEliminarId: string | null = null;
  columnaAEliminarNombre: string = '';

  // Abre modal confirmación con datos de la columna a eliminar
  abrirModalConfirmEliminar(id: string, nombre: string): void {
    this.columnaAEliminarId = id;
    this.columnaAEliminarNombre = nombre;
    this.modalConfirmEliminarVisible = true;
    this.cdr.detectChanges();
  }

  // Cierra el modal confirmación sin eliminar
  cerrarModalConfirmEliminar(): void {
    this.modalConfirmEliminarVisible = false;
    this.columnaAEliminarId = null;
    this.columnaAEliminarNombre = '';
    this.cdr.detectChanges();
  }

  // Confirmar y eliminar la columna
  confirmarEliminarColumna(): void {
    if (!this.columnaAEliminarId) return;

    this.boardService.deleteEstado(Number(this.columnaAEliminarId)).subscribe({
      next: () => {
        // Remueve localmente del array CategoriasK
        this.CategoriasK = this.CategoriasK.filter(c => c.id !== this.columnaAEliminarId);
        this.cdr.detectChanges();
        //alert(`Columna "${this.columnaAEliminarNombre}" eliminada correctamente.`);
        this.cerrarModalConfirmEliminar();
      },
      error: (err) => {
        console.error('Error eliminando columna:', err);
        //alert('Error al eliminar la columna. Intenta nuevamente.');
      }
    });
  }


  dropdownEtiquetasAbierto = false;
  seleccionandoOpcion = false;

  abrirDropdown() {
    this.dropdownEtiquetasAbierto = true;
  }

  cerrarDropdown() {
    if (!this.seleccionandoOpcion) {
      this.dropdownEtiquetasAbierto = false;
    }
  }

  // Cuando el mouse está apretado sobre el dropdown, bloquea cerrar hasta que termine el click
  marcarSeleccionando() {
    this.seleccionandoOpcion = true;
  }
  desmarcarSeleccionando() {
    setTimeout(() => {
      this.seleccionandoOpcion = false;
      this.dropdownEtiquetasAbierto = false;
    });
  }

  // Seleccionar etiqueta al hacer mouseDown para que la selección ocurra antes del blur
  seleccionarOpcion(id: number) {
    this.toggleEtiqueta(id);
    this.desmarcarSeleccionando();
  }

  nuevoNombreEtiqueta = '';
  nuevoColorEtiqueta = '#1976D2'; // código hex por defecto
  modalEtiquetaVisible = false; // control modal

  crearEtiqueta(event: Event) {
    event.preventDefault();
    if (!this.nuevoNombreEtiqueta.trim() || !this.nuevoColorEtiqueta) return;

    const colorObj = this.colores.find(c => c.codigo === this.nuevoColorEtiqueta);
    if (!colorObj) return;

    this.boardService.createEtiqueta(
      this.nuevoNombreEtiqueta,
      this.proyectoIdActual,
      colorObj.id
    ).subscribe({
      next: (newEtiqueta) => {
        this.etiquetasUnicas.push(newEtiqueta);
        this.nuevoNombreEtiqueta = '';
        this.nuevoColorEtiqueta = '';
        this.modalEtiquetaVisible = false;
      }
    });
  }


menuVisible = false;

  // Toggle the visibility of the menu
  toggleMenu(event: MouseEvent) {
    // Prevent the click event from propagating
    event.stopPropagation();
    this.menuVisible = !this.menuVisible;
  }

  // Detect clicks outside the menu and close it
  @HostListener('document:click', ['$event'])
  closeMenuIfClickedOutside(event: MouseEvent) {
    const menuElement = document.getElementById('dropdownButton');
    if (menuElement && !menuElement.contains(event.target as Node)) {
      this.menuVisible = false;
    }
  }


}
