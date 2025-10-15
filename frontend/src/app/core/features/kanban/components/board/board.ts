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
import { BoardService } from '../../services/kanban-service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth-service';
import { ProyectoGuard } from '../../../../../guards/proyecto.guard';
import { TaskDetail } from "../task-detail/task-detail";

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

  currentUser: string = '';
  sidebarOpen = false;
  modalVisible = false;

  proyectoIdActual: string = '';

  CategoriasK: Categoria[] = [];
  miembrosDelProyecto: ResponsableTarea[] = [];

  etiquetasUnicas: any[] = [];

  viewMode: 'kanban' | 'list' | 'assigned' = 'kanban';

  hoveredTaskId: string | null = null;
  timeoutId?: ReturnType<typeof setTimeout>;

  filtroTitulo = '';
  textoFiltro = '';
  filtroResponsable = '';
  filtroCategoria = '';
  filtroEtiquetas: number | string = ''; // Filtro para las etiquetas, ya que se filtra por ID de etiqueta
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

  constructor(
    private cdr: ChangeDetectorRef,
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
          posicion: (est as any).posicion ?? 0,
          tasks: []
        }));

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

  // Cargar etiquetas del proyecto
  private cargarEtiquetasProyecto(proyectoId: string): void {
    this.boardService.getAllEtiquetas(proyectoId).subscribe({
      next: (etiquetas) => {
        this.etiquetasUnicas = etiquetas.map(e => ({
          id: e.id,        // ID de la etiqueta
          nombre: e.nombre,  // Nombre de la etiqueta
        }));
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
    fondoColumna: string;
    fondoTarjeta: string;
    texto: string;
    boton: string;
  }> = {
      'Sin empezar': {
        fondoColumna: 'bg-slate-900/10',
        fondoTarjeta: 'bg-slate-900/20 text-slate-300',
        texto: 'text-slate-400',
        boton: 'bg-slate-700/50 text-white hover:bg-slate-700/70',
      },
      'Por hacer': {
        fondoColumna: 'bg-sky-900/10',
        fondoTarjeta: 'bg-sky-900/20 text-sky-300',
        texto: 'text-sky-400',
        boton: 'bg-sky-700/50 text-white hover:bg-sky-700/70',
      },
      'Finalizado': {
        fondoColumna: 'bg-green-900/10',
        fondoTarjeta: 'bg-green-900/20 text-green-300',
        texto: 'text-green-400',
        boton: 'bg-green-700/50 text-white hover:bg-green-700/70',
      },
      // Estilos por defecto para columnas no reconocidas
      'default': {
        fondoColumna: 'bg-base-200',
        fondoTarjeta: 'bg-base-100 text-base-content',
        texto: 'text-gray-300',
        boton: 'btn-outline btn-primary',
      }
    };

  getColumnColorClass(nombre: string): string {
    return this.estilosPorColumna[nombre]?.fondoColumna || this.estilosPorColumna['default'].fondoColumna;
  }
  getCardColorClass(nombre: string): string {
    return this.estilosPorColumna[nombre]?.fondoTarjeta || this.estilosPorColumna['default'].fondoTarjeta;
  }
  getTextColorClass(nombre: string): string {
    return this.estilosPorColumna[nombre]?.texto || this.estilosPorColumna['default'].texto;
  }
  getButtonColorClass(nombre: string): string {
    return this.estilosPorColumna[nombre]?.boton || this.estilosPorColumna['default'].boton;
  }
  getPriorityBadgeClass(priority: string): string {
    switch (priority) {
      case 'Alta':
        return 'ml-auto badge badge-error w-fit animate-bounce animate-duration-1000';
      case 'Media':
        return 'ml-auto badge badge-warning w-fit';
      case 'Baja':
        return 'ml-auto badge badge-success w-fit';
      default:
        return 'ml-auto badge badge-neutral w-fit';
    }
  }
  getButtonClasses(view: string) {
    return {
      'border-primary text-primary font-semibold ring-2 ring-primary/30': this.viewMode === view,
    };
  }

  getEtiquetaNombre(id: number): string {
    return this.etiquetasUnicas.find(e => e.id === id)?.nombre ?? 'Sin nombre';
  }

  getEtiquetaColor(id: number): string {
    return this.etiquetasUnicas.find(e => e.id === id)?.color ?? '#666';
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

  // === FILTRO PRINCIPAL DE TAREAS EN VISTA LISTA ===
  get tareasFiltradas() {
    return this.CategoriasK.flatMap(cat =>
      cat.tasks
        .filter(task => {
          // --- Filtro por título ---
          const coincideTitulo =
            !this.filtroTitulo ||
            (task.title?.toLowerCase().includes(this.filtroTitulo.toLowerCase()) ?? false);

          // --- Filtro por responsable ---
          const coincideResponsable =
            !this.filtroResponsable ||
            task.assignee?.some(u => u.id === this.filtroResponsable);

          // --- Filtro por categoría (estado del proyecto) ---
          const coincideCategoria =
            !this.filtroCategoria || cat.id === this.filtroCategoria;

          // --- Filtro por etiqueta ---
          const coincideEtiqueta =
            !this.filtroEtiquetas ||
            (task.etiquetas &&
              task.etiquetas.some(
                e =>
                  e.etiqueta?.id?.toString() === this.filtroEtiquetas.toString() ||
                  e.id?.toString() === this.filtroEtiquetas.toString()
              ));

          // Cumple todos los filtros activos
          return coincideTitulo && coincideResponsable && coincideCategoria && coincideEtiqueta;
        })
        .map(task => ({
          tarea: task,
          categoria: cat.nombre
        }))
    );
  }


  get contadorFiltros(): number {
    let count = 0;
    if (this.filtroTitulo.trim()) count++;
    if (this.filtroResponsable) count++;
    if (this.filtroCategoria) count++;
    if (this.filtroEtiquetas) count++;
    return count;
  }
  public limpiarFiltros(): void {
    this.filtroTitulo = '';
    this.filtroCategoria = '';
    this.filtroResponsable = '';
    this.filtroEtiquetas = '';
  }
  
  get tareasAsignadasFiltradas() {
    return this.CategoriasK.flatMap(cat =>
      cat.tasks
        .filter(task => task.assignee?.some(u => u.id === this.currentUser)) // Solo tareas asignadas al usuario actual
        .filter(task => !this.filtroTitulo || (task.title?.toLowerCase().includes(this.filtroTitulo.toLowerCase()) ?? false))
        .map(task => ({ tarea: task, categoria: cat.nombre }))
    );
  }


  toggleFiltroTitulo() {
    this.mostrarPanelFiltroTitulo = !this.mostrarPanelFiltroTitulo;
  }

  limpiarFiltroTitulo() {
    this.filtroTitulo = '';
    this.mostrarPanelFiltroTitulo = false;
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

  crearTarea() {
    if (!this.categoriaSeleccionadaForModal) {
      console.error('No hay categoría seleccionada para nueva tarea');
      return;
    }

    if (!this.newTask.titulo || !this.newTask.titulo.trim()) {
      alert('El título es obligatorio');
      return;
    }

    const estadoId = Number(this.categoriaSeleccionadaForModal.id);

    // Validamos IDs de responsables seleccionados
    const responsablesArr = this.newTask.responsablesIds.filter(id => !!id);

    // Obtener proyectoId de contexto o fallback
    const proyectoId = this.proyectoIdActual;

    const fechaLimiteISO = this.newTask.fechaLimite && this.newTask.fechaLimite.trim()
      ? new Date(this.newTask.fechaLimite).toISOString()
      : undefined;

    // Payload alineado con backend, ahora incluye etiquetas
    const payload = {
      titulo: this.newTask.titulo,
      estadoId,
      posicion: this.categoriaSeleccionadaForModal.tasks.length,
      proyectoId,
      responsablesIds: responsablesArr.length ? responsablesArr : undefined,
      fechaLimite: fechaLimiteISO,
      bloquesContenido: [],
      etiquetaIds: this.newTask.etiquetaIds.length ? this.newTask.etiquetaIds : undefined,
    };

    this.boardService.createTask(payload).subscribe({
      next: (tareaNueva) => {

        // Mapear responsables para UI
        const responsablesParaUI = responsablesArr.map(id => {
          const miembro = this.miembrosDelProyecto.find(m => m.usuario.id === id);
          return miembro ? miembro.usuario : { id, nombre: 'Desconocido', apellido: '', email: '' };
        });

        const task: Task = {
          ...tareaNueva,
          assignee: responsablesParaUI,  // Responsables completos
          etiquetas: tareaNueva.etiquetas ?? [], // Etiquetas desde backend
          bloquesContenido: tareaNueva.bloquesContenido ?? [],
          title: tareaNueva.titulo ?? '',      // Para UI
          dueDate: tareaNueva.fechaLimite ?? '', // Para UI
          // priority removido porque no existe en backend ni UI aquí
        };

        if (this.categoriaSeleccionadaForModal) {
          this.categoriaSeleccionadaForModal.tasks.push(task);
          this.categoriaSeleccionadaForModal.tasks.sort((a, b) => (a.posicion ?? 0) - (b.posicion ?? 0));
        }

        // Actualizar listas de UI
        this.generarListaResponsables();
        this.generarListaPrioridades();
        this.cdr.detectChanges();
        this.cerrarModal();
      },
      error: err => {
        console.error('Error creando tarea:', err);
        alert('Ocurrió un error al crear la tarea');
      }
    });
  }

  @HostListener('document:click', ['$event'])
  clickFuera(event: Event) {
    if (!this.mostrarPanelFiltroTitulo) return;
    const clickedInside = this.thTitulo.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.mostrarPanelFiltroTitulo = false;
    }
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

  // En tu componente
  eliminarTarea(taskId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.boardService.deleteTask(taskId).subscribe(
        () => {
          console.log('Tarea eliminada');
          // Buscar en todas las categorías y eliminar la tarea
          this.CategoriasK.forEach(categoria => {
            categoria.tasks = categoria.tasks.filter(task => task.id !== taskId);
          });
          // También es recomendable actualizar las listas de filtros y responsables
          this.generarListaResponsables();
          this.generarListaPrioridades();
          this.cdr.detectChanges();  // Asegura que Angular detecte los cambios
        },
        (error) => {
          alert('Error al eliminar la tarea.');
          console.error(error);
        }
      );
    }
  }

  editarTarea(taskId: string) {
    // Lógica para abrir el modal o ventana de edición
    console.log('Editar tarea con ID:', taskId);
    // Puedes agregar aquí la lógica que desees para editar la tarea.
  }


}
