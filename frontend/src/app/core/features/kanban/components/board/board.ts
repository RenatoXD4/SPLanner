import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,    // Filtro de columnas
  transferArrayItem,  // Filtro de columnas
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

import { ElementRef, ViewChild, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';  // <-- Importa FormsModule



interface Task {
  id: number;
  title: string;
  status: string;
  assignee: string[];
  dueDate: string;
  priority: string;
  description: string;
}

interface Categoria {
  id: string;
  nombre: string;
  tasks: Task[]; // ✅ Esto es lo que necesitas
}


@Component({
  selector: 'app-board',
  imports: [CdkDropList, CdkDrag, CommonModule, FormsModule  // <-- Agrégalo aquí
  ],
  templateUrl: './board.html',
  styleUrl: './board.css',

})
export class Board {

  sidebarOpen = false;

  CategoriasK: Categoria[] = [
    {
      id: 'xd',
      nombre: 'Sin empezar',
      tasks: [
        { id: 1, title: 'Tarea 1', status: 'todo', assignee: ['Ana', 'Luis'], dueDate: '2025-09-15', priority: 'Alta', description: '...asdasdasd' },
        { id: 2, title: 'Tarea 2', status: 'todo', assignee: ['Juan'], dueDate: '2025-09-17', priority: 'Media', description: '...dededded' },
        { id: 3, title: 'Tarea 2', status: 'todo', assignee: ['Luis'], dueDate: '2025-09-17', priority: 'Media', description: '...dededded' },
        { id: 4, title: 'Tarea 2', status: 'todo', assignee: ['Juan'], dueDate: '2025-09-17', priority: 'Media', description: '...dededded' },
        { id: 5, title: 'Tarea 2', status: 'todo', assignee: ['Luis'], dueDate: '2025-09-17', priority: 'Media', description: '...dededded' },
        { id: 6, title: 'Tarea 2', status: 'todo', assignee: ['Juan'], dueDate: '2025-09-17', priority: 'Media', description: '...dededded' },
        { id: 7, title: 'Tarea 2', status: 'todo', assignee: ['Juan'], dueDate: '2025-09-17', priority: 'Media', description: '...dededded' },
        { id: 8, title: 'Tarea 2', status: 'todo', assignee: ['Luis'], dueDate: '2025-09-17', priority: 'Media', description: '...dededded' },
        { id: 9, title: 'Tarea 2', status: 'todo', assignee: ['Juan'], dueDate: '2025-09-17', priority: 'Media', description: '...dededded' },

      ],
    },
    {
      id: 'todo',
      nombre: 'Por hacer',
      tasks: [],
    },
    {
      id: 'done',
      nombre: 'Hecho',
      tasks: [],
    }
  ];


  drop(event: CdkDragDrop<Task[]>) {
    console.log('➡️ Drop event:', event);

    if (event.previousContainer === event.container) {
      console.log('🔄 Mismo contenedor - Reordenando tarea');
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log('📦 Contenedor anterior ID:', event.previousContainer.id);
      console.log('📥 Nuevo contenedor ID:', event.container.id);

      const task: Task = event.previousContainer.data[event.previousIndex];
      console.log('🧱 Tarea movida:', task);

      // Simulamos que el status depende del id del contenedor
      const newStatus = this.getStatusFromContainerId(event.container.id);
      console.log(`🆕 Nuevo status para la tarea ${task.id}:`, newStatus);

      // Actualizamos el status antes de moverla visualmente
      this.updateTaskStatus(task.id, newStatus);

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      console.log('✅ Tarea transferida');

    }
  }
  isDragging = false;

  onDragStarted() {
    this.isDragging = true;

    setTimeout(() => {
      this.isDragging = false;
    }, 0);  // 2 segundos para desactivar el borde
  }

  onDragEnded() {
    this.isDragging = false;
  }

  // función dentro de la funcion DROP()
  get categoriasIds(): string[] {
    return this.CategoriasK.map(cat => cat.id);
  }
  getStatusFromContainerId(containerId: string): string {
    return containerId; // Asumiendo que el id del contenedor es igual al status deseado
  }
  updateTaskStatus(taskId: number, newStatus: string) {
    const task = this.CategoriasK
      .flatMap(cat => cat.tasks)
      .find(t => t.id === taskId);

    if (task) {
      task.status = newStatus;
      console.log(`✔️ Status de tarea ${taskId} actualizado a:`, newStatus);
    }
  }
  // función dentro de la funcion DROP() FINAL
  /*
    viewMode: 'kanban' | 'list' = 'kanban';
  
    toggleView(): void {
      this.viewMode = this.viewMode === 'kanban' ? 'list' : 'kanban';
    }
  
    */
  currentUser: string = 'Juan';  // Cambia esto por el identificador de tu usuario

  // CAMBIO DE VISTA, esto es necesario ya que esto es lo que activa que la animación se vea al hacer click en cada Botón
  // La animación esta en el CSS
  @ViewChild('kanbanContainer') kanbanContainer?: ElementRef;
  @ViewChild('listContainer') listContainer?: ElementRef;
  @ViewChild('assignedContainer') assignedContainer?: ElementRef;
  private applyAnimation(ref?: ElementRef) {
    if (!ref) return;

    const el = ref.nativeElement as HTMLElement;

    el.classList.remove('fade-slide-in'); // Reinicia si ya estaba
    void el.offsetWidth; // Trigger reflow para reiniciar animación

    el.classList.add('fade-slide-in');
  }
  constructor(private cdr: ChangeDetectorRef) { }

  public viewMode: 'kanban' | 'list' | 'assigned' = 'kanban';

  setViewMode(mode: 'kanban' | 'list' | 'assigned') {
    if (this.viewMode === mode) return;

    this.viewMode = mode;

    // Espera a que Angular actualice el DOM
    setTimeout(() => {
      this.cdr.detectChanges(); // fuerza renderizado inmediato

      // Aplica animación solo al contenedor correspondiente
      if (mode === 'kanban') this.applyAnimation(this.kanbanContainer);
      if (mode === 'list') this.applyAnimation(this.listContainer);
      if (mode === 'assigned') this.applyAnimation(this.assignedContainer);
    });
  }




  /*
  // Puedes dejar esto comentado por ahora:
  // metodo para verificar si la vista actual es assigned
  get isAssignedView() {
    return this.viewMode === 'assigned';
  }
  */


  getPriorityBadgeClass(priority: string): string {
    switch (priority) {
      case 'Alta':
        return 'ml-auto badge badge-error w-fit animate-bounce animate-duration-1000';
      case 'Media':
        return 'ml-auto badge badge-warning w-fit';   // sin animación
      case 'Baja':
        return 'ml-auto badge badge-success w-fit';   // sin animación
      default:
        return 'ml-auto badge badge-neutral w-fit';   // sin animación
    }
  }

  getCategoryClasses(categoryName: string): string {
    switch (categoryName) {
      case 'Sin empezar':
        return 'bg-slate-900/10 text-slate-400';  // muy tenue y texto gris claro
      case 'Por hacer':
        return 'bg-sky-900/10 text-sky-400';     // azul muy suave con texto azul claro
      case 'Hecho':
        return 'bg-green-900/10 text-green-400'; // verde muy suave con texto verde claro
      default:
        return 'bg-base-200 text-base-content';
    }
  }

  getCardColorClass(nombre: string): string {
    switch (nombre) {
      case 'Sin empezar':
        return 'bg-slate-900/20 text-slate-300';  // Fondo oscuro gris tenue, texto gris claro
      // Otras opciones para 'Sin empezar':
      // return 'bg-slate-800/30 text-slate-200'; 
      // return 'bg-gray-900/25 text-gray-300';

      case 'Por hacer':
        return 'bg-sky-900/20 text-sky-300';      // Fondo azul oscuro tenue, texto azul claro
      // Otras opciones para 'Por hacer':
      // return 'bg-sky-800/30 text-sky-200';

      case 'Hecho':
        return 'bg-green-900/20 text-green-300';  // Fondo verde oscuro tenue, texto verde claro
      // Otras opciones para 'Hecho':
      // return 'bg-green-800/30 text-green-200';
      // return 'bg-emerald-900/20 text-emerald-300';
      // return 'bg-teal-900/20 text-teal-300';

      default:
        return 'bg-base-100 text-base-content';
    }
  }

  getButtonColorClass(nombre: string): string {
    switch (nombre) {
      case 'Sin empezar':
        return 'bg-slate-700/50 text-white hover:bg-slate-700/70'; // fondo oscuro y semi-transparente
      case 'Por hacer':
        return 'bg-sky-700/50 text-white hover:bg-sky-700/70';
      case 'Hecho':
        return 'bg-green-700/50 text-white hover:bg-green-700/70';
      default:
        return 'btn-outline btn-primary';
    }
  }

  // Clases para el fondo de cada columna
  getColumnColorClass(nombre: string): string {
    switch (nombre) {
      case 'Sin empezar':
        return 'bg-slate-900/10';   // fondo muy tenue oscuro
      case 'Por hacer':
        return 'bg-sky-900/10';
      case 'Hecho':
        return 'bg-green-900/10';
      default:
        return 'bg-gray-700/10';
    }
  }

  // Clases para el fondo de cada tarea
  getTaskBackgroundClass(nombre: string): string {
    switch (nombre) {
      case 'Sin empezar':
        return 'bg-slate-900/20';
      case 'Por hacer':
        return 'bg-sky-900/20';
      case 'Hecho':
        return 'bg-green-900/20';
      default:
        return 'bg-gray-700/20';
    }
  }

  // Clases para el color del texto del título de columna
  getTextColorClass(nombre: string): string {
    switch (nombre) {
      case 'Sin empezar':
        // Opciones de gris
        // return 'text-slate-400';  // gris azulado suave
        // return 'text-gray-400';   // gris neutro medio
        // return 'text-zinc-400';   // gris ligeramente cálido
        // return 'text-neutral-400'; // gris neutral

        // Opciones con colores suaves
        // return 'text-indigo-400'; // azul suave
        // return 'text-purple-400'; // morado suave

        // Ejemplo escogido:
        return 'text-slate-400';

      case 'Por hacer':
        // Opciones azules
        // return 'text-sky-400';   // azul cielo suave (actual)
        // return 'text-blue-400';  // azul clásico
        // return 'text-indigo-400';// azul un poco más morado

        // Ejemplo escogido:
        return 'text-sky-400';

      case 'Hecho':
        // Opciones verdes
        // return 'text-green-400';   // verde medio (actual)
        // return 'text-emerald-400'; // verde brillante
        // return 'text-teal-400';    // verde azulado

        // Ejemplo escogido:
        return 'text-green-400';

      default:
        // Opciones de gris para valores no definidos
        // return 'text-gray-300';
        return 'text-gray-300';
    }
  }
  /*
  hoveredListId: string | null = null;
  timeoutId: any = null;

  onMouseEnterList(listId: string) {
    this.hoveredListId = listId;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      if (this.hoveredListId === listId) {
        this.hoveredListId = null;
      }
    }, 3000);
  }

  onMouseLeaveList(listId: string) {
    if (this.hoveredListId === listId) {
      this.hoveredListId = null;
    }

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
  */
  hoveredTaskId: string | null = null;
  timeoutId: any;

  onTaskHover(taskId: string) {
    this.hoveredTaskId = taskId;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      if (this.hoveredTaskId === taskId) {
        this.hoveredTaskId = null;
      }
    }, 3000); // 3 segundos para que desaparezca el borde
  }

  onTaskHoverLeave(taskId: string) {
    if (this.hoveredTaskId === taskId) {
      this.hoveredTaskId = null;
    }
  }



  // Filtros para la vista LISTA (solo frontend, prototipo con pocos datos)
  // Cuando se implemente backend (Prisma + PostgreSQL), esta función se debe cambiar
  // para hacer la consulta con filtros directamente en el servidor y así optimizar recursos.

  // Filtros
  public filtroResponsable: string = '';
  public filtroPrioridad: string = '';
  public textoFiltro: string = '';

  // Listas únicas
  public responsablesUnicos: string[] = [];
  public prioridadesUnicas: string[] = [];

  public mostrarPanelFiltros: boolean = false;

  ngOnInit() {
    this.generarListaResponsables();
    this.generarListaPrioridades();
  }

  private generarListaPrioridades(): void {
    const set = new Set<string>();
    this.CategoriasK.forEach(cat => {
      cat.tasks.forEach(task => set.add(task.priority));
    });
    this.prioridadesUnicas = Array.from(set);
  }

  private generarListaResponsables(): void {
    const set = new Set<string>();
    this.CategoriasK.forEach(cat => {
      cat.tasks.forEach(task => task.assignee.forEach(persona => set.add(persona)));
    });
    this.responsablesUnicos = Array.from(set);
  }

  // Getter con filtros
  public get tareasFiltradas() {
    const tareasFiltradas: { tarea: Task; categoria: string }[] = [];

    this.CategoriasK.forEach(cat => {
      cat.tasks.forEach(task => {
        const cumpleResponsable =
          !this.filtroResponsable || task.assignee.includes(this.filtroResponsable);
        const cumplePrioridad = !this.filtroPrioridad || task.priority === this.filtroPrioridad;
        const cumpleTexto =
          !this.textoFiltro ||
          task.title.toLowerCase().includes(this.textoFiltro.toLowerCase()) ||
          task.description.toLowerCase().includes(this.textoFiltro.toLowerCase());

        if (cumpleResponsable && cumplePrioridad && cumpleTexto) {
          tareasFiltradas.push({ tarea: task, categoria: cat.nombre });
        }
      });
    });

    return tareasFiltradas;
  }

  public limpiarFiltros(): void {
    this.filtroResponsable = '';
    this.filtroPrioridad = '';
    this.textoFiltro = '';
  }




  // FILTRO X TITULO
  public filtroTituloAsignadas: string = '';

  public get tareasAsignadasFiltradas() {
    const tareas: { tarea: Task; categoria: Categoria }[] = [];


    this.CategoriasK.forEach(categoria => {
      categoria.tasks.forEach(tarea => {
        if (tarea.assignee.includes(this.currentUser)) {
          if (!this.filtroTituloAsignadas || tarea.title.toLowerCase().includes(this.filtroTituloAsignadas.toLowerCase())) {
            tareas.push({ tarea, categoria });
          }
        }
      });
    });

    return tareas;
  }

  public mostrarPanelFiltroTituloAsignadas = false;


  // TAREA ASIGNADA


  public filtroTitulo: string = '';
  public mostrarPanelFiltroTitulo: boolean = false;

  @ViewChild('thTitulo') thTitulo!: ElementRef;

  // Alterna mostrar/ocultar filtro
  toggleFiltroTitulo() {
    this.mostrarPanelFiltroTitulo = !this.mostrarPanelFiltroTitulo;
  }

  // Limpia filtro y oculta panel
  limpiarFiltroTitulo() {
    this.filtroTitulo = '';
    this.mostrarPanelFiltroTitulo = false;
  }

  // Aquí iría la lógica para filtrar basado en filtroTitulo si la tienes
  aplicarFiltroTitulo() {
    // Puede ser solo binding, o llamada a función de filtrado
  }

  // Detectar clicks fuera del filtro para cerrarlo automáticamente
  @HostListener('document:click', ['$event'])
  clickFuera(event: Event) {
    if (!this.mostrarPanelFiltroTitulo) return;

    // Si el click NO está dentro del thTitulo o el panel de filtro, ocultar panel
    const clickedInsideTitulo = this.thTitulo.nativeElement.contains(event.target);
    if (!clickedInsideTitulo) {
      this.mostrarPanelFiltroTitulo = false;
    }
  }


  // NUEVO ESTILO, (AUN NO LO APLICO AL HTML)

  textoBusqueda = '';  // Para el input de búsqueda

  buscarTareas() {
    // Lógica para filtrar tareas globalmente
    // O simplemente lanzar un filtro de texto en la vista actual
    console.log('Buscando:', this.textoBusqueda);
  }

  abrirModalNuevaTarea() {
    // Mostrar un modal o panel lateral para crear tarea
    console.log('Abrir modal de nueva tarea');
  }


}
