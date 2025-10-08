import { Component, ElementRef, ViewChild, ChangeDetectorRef, HostListener, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Sidebar } from '../../../../shared/ui/sidebar/sidebar';
import { BoardService } from '../../services/kanban-service';
import { ActivatedRoute } from '@angular/router';

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
  posicion?: number;
  tasks: Task[];
}

interface Task {
  id: string;
  titulo?: string;
  fechaLimite?: string;
  posicion: number;
  createdAt: string;
  estadoId: number | string;
  proyectoId: string;

  // Campos backend opcionales que pueden venir
  assignee?: User[]; // lista de usuarios asignados
  etiquetas?: any[];
  bloquesContenido?: any[];
  priority?: string;
  description?: string;

  // Campos frontend (para UI)
  title?: string;
  dueDate?: string;
}

// Agrega esto cerca del inicio, junto a tus otras interfaces

interface RawTask {
  id: string;
  titulo?: string;
  fechaLimite?: string;
  posicion: number;
  createdAt: string;
  estadoId: number | string;
  proyectoId: string;

  responsables?: { usuario: User }[]; // ← NUEVO
  etiquetas?: any[];
  bloquesContenido?: any[];
  priority?: string;
  description?: string;
}


@Component({
  selector: 'app-board',
  imports: [CdkDropList, CdkDrag, CommonModule, FormsModule, Sidebar],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnInit {
  @ViewChild('kanbanContainer') kanbanContainer?: ElementRef;
  @ViewChild('listContainer') listContainer?: ElementRef;
  @ViewChild('assignedContainer') assignedContainer?: ElementRef;
  @ViewChild('thTitulo') thTitulo!: ElementRef;

  currentUser: string = 'Juan'; // idealmente tu id o nombre real
  sidebarOpen = false;

  CategoriasK: Categoria[] = [];
  miembrosDelProyecto: ResponsableTarea[] = []; // para el selector del formulario
  equipoDelProyecto: ResponsableTarea[] = [];   // para uso interno si querés filtrar tareas, etc.



  viewMode: 'kanban' | 'list' | 'assigned' = 'kanban';

  hoveredTaskId: string | null = null;
  timeoutId: any;

  textoFiltro = '';
  filtroResponsable = '';
  filtroPrioridad = '';
  prioridadesUnicas: string[] = [];
  responsablesUnicos: string[] = [];

  mostrarPanelFiltros = false;
  mostrarPanelFiltroTitulo = false;
  filtroTitulo = '';

  // Modal / nueva tarea
  categoriaSeleccionadaForModal: Categoria | null = null;

  newTask = {
    title: '',
    description: '',
    priority: 'Media',
    assigneeIds: [] as string[], // ← Ahora es un array de IDs
    dueDate: ''
  };
  /*
    const tareas = await kanbanRepository.getAllTask("id-proyecto");
  
  tareas.forEach(tarea => {
    console.log(tarea.titulo); // string | null
    console.log(tarea.BloqueContenido[0]?.contenido); // string
    console.log(tarea.etiquetas[0]?.etiqueta.nombre); // nombre etiqueta
    console.log(tarea.responsables[0]?.usuario.email); // email usuario
  });*/


  constructor(private cdr: ChangeDetectorRef, private boardService: BoardService, private route: ActivatedRoute) { }

  ngOnInit() {
    const proyectoId = this.route.snapshot.paramMap.get('id') || '1fc2cb1f-7580-47dd-b28e-49f139dbfb44';

    // Obtener estados del proyecto (categorías)
    this.boardService.getEstadosDelProyecto(proyectoId).subscribe({
      next: (estados) => {
        this.CategoriasK = estados.map(est => ({
          id: est.id.toString(),
          nombre: est.nombre,
          posicion: (est as any).posicion ?? 0,
          tasks: []
        }));

        // Obtener tareas
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
                  priority: t.priority ?? 'Media',
                  description: t.description ?? ''
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
            console.error('Error al cargar tareas:', err);
          }
        });

        // 1. Obtener TODOS los miembros del proyecto para el formulario
        this.boardService.getEquipoProyecto(proyectoId).subscribe({
          next: (miembros: MiembroProyecto[]) => {
            this.miembrosDelProyecto = miembros.map((m, index) => ({
              usuario: m.usuario,
              tareaId: '', // no asignado aún
              id: index,   // usamos el índice como id único temporal
              usuarioId: m.usuario.id
            }));
            console.log('Miembros para asignación:', this.miembrosDelProyecto);
          },
          error: (err) => console.error('Error al cargar miembros:', err)
        });


        // 2. Obtener responsables que ya tienen tareas asignadas
        //this.boardService.getMiembrosDelProyecto(proyectoId).subscribe({
        //  next: (responsables: ResponsableTarea[]) => {
        //    this.equipoDelProyecto = responsables;
        //    console.log('Responsables cargados:', this.equipoDelProyecto);
        //  },
        //  error: (err) => console.error('Error al cargar responsables:', err)
        //});




      },
      error: (err) => {
        console.error('Error al cargar estados:', err);
      }
    });
  }


  getNombreResponsables(users: User[]): string {
    if (!users || users.length === 0) return '';
    return users.map(u => `${u.nombre} ${u.apellido}`).join(', ');
  }

  drop(event: CdkDragDrop<Task[]>) {
    const prevTasks = event.previousContainer.data;
    const currTasks = event.container.data;

    const task = prevTasks[event.previousIndex];

    const cambioDeColumna = event.previousContainer.id !== event.container.id;

    if (!cambioDeColumna) {
      moveItemInArray(currTasks, event.previousIndex, event.currentIndex);
      this.reordenarDentroMismaColumna(event.container.id, currTasks);
    } else {
      const nuevoEstadoId = Number(event.container.id);

      this.boardService.updateTask(task.id, { estadoId: nuevoEstadoId, posicion: event.currentIndex }).subscribe({
        next: () => {
          transferArrayItem(prevTasks, currTasks, event.previousIndex, event.currentIndex);
          this.reordenarDentroMismaColumna(event.container.id, currTasks);
        },
        error: err => {
          console.error('Error al mover tarea:', err);
        }
      });
    }
  }


  reordenarDentroMismaColumna(containerId: string, tasks: Task[]) {
    tasks.forEach((t, idx) => {
      console.log(`Actualizando tarea ${t.id} a posición ${idx}`);
      this.boardService.updateTask(t.id, { posicion: idx }).subscribe({
        next: _ => { },
        error: e => console.error('Error al reordenar tarea:', e)
      });
    });
  }

  get categoriasIds(): string[] {
    return this.CategoriasK.map(cat => cat.id);
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
    this.CategoriasK.forEach(cat =>
      cat.tasks.forEach(task => {
        (task.assignee ?? []).forEach(u => set.add(u.id));
      })
    );

    this.responsablesUnicos = Array.from(set);
  }

  private generarListaPrioridades() {
    const set = new Set<string>();
    this.CategoriasK.forEach(cat =>
      cat.tasks.forEach(task => {
        if (task.priority) set.add(task.priority);
      })
    );
    this.prioridadesUnicas = Array.from(set);
  }

  get tareasFiltradas() {
    const res: { tarea: Task; categoria: string }[] = [];
    this.CategoriasK.forEach(cat =>
      cat.tasks.forEach(task => {
        const cumpleResp = !this.filtroResponsable || task.assignee?.some(u => u.id === this.filtroResponsable);
        const cumplePri = !this.filtroPrioridad || task.priority === this.filtroPrioridad;
        const cumpleText =
          !this.textoFiltro ||
          (task.title?.toLowerCase().includes(this.textoFiltro.toLowerCase()) ?? false) ||
          (task.description?.toLowerCase().includes(this.textoFiltro.toLowerCase()) ?? false);

        if (cumpleResp && cumplePri && cumpleText) {
          res.push({ tarea: task, categoria: cat.nombre });
        }
      })
    );
    return res;
  }



  get tareasAsignadasFiltradas() {
    const res: { tarea: Task; categoria: Categoria }[] = [];
    this.CategoriasK.forEach(cat =>
      cat.tasks.forEach(task => {
        if (task.assignee?.some(u => u.id === this.currentUser)) {

          if (!this.filtroTitulo || (task.title?.toLowerCase().includes(this.filtroTitulo.toLowerCase()) ?? false)) {
            res.push({ tarea: task, categoria: cat });
          }
        }
      })
    );
    return res;
  }

  public limpiarFiltros(): void {
    this.filtroResponsable = '';
    this.filtroPrioridad = '';
    this.textoFiltro = '';
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

    // Resetear datos del nuevo task para que no quede info previa
    this.newTask = {
      title: '',
      description: '',
      priority: 'Media',
      assigneeIds: [] as string[],
      dueDate: ''
    };

    // Mostrar el modal
    const modal = document.getElementById('modalNuevaTarea') as HTMLDialogElement;
    modal?.showModal();
  }


  cerrarModal() {
    const modal = document.getElementById('modalNuevaTarea') as HTMLDialogElement;
    modal?.close();
    this.newTask = {
      title: '',
      description: '',
      priority: 'Media',
      assigneeIds: [],
      dueDate: ''
    };
    this.categoriaSeleccionadaForModal = null;
  }
  crearTarea() {
    if (!this.categoriaSeleccionadaForModal) {
      console.error('No hay categoría seleccionada para nueva tarea');
      return;
    }

    if (!this.newTask.title.trim()) {
      alert('El título es obligatorio');
      return;
    }

    const estadoId = Number(this.categoriaSeleccionadaForModal.id);

    // Validamos IDs de responsables seleccionados
    const responsablesArr = this.newTask.assigneeIds.filter(id => !!id);

    const proyectoId =
      this.CategoriasK.find(cat => cat.tasks.length > 0)?.tasks[0].proyectoId ?? '123';

    const fechaLimiteISO = this.newTask.dueDate?.trim()
      ? new Date(this.newTask.dueDate).toISOString()
      : undefined;

    // Armar payload acorde al backend (responsablesIds)
    const payload = {
      titulo: this.newTask.title,
      estadoId,
      posicion: this.categoriaSeleccionadaForModal.tasks.length,
      proyectoId,
      responsablesIds: responsablesArr,
      fechaLimite: fechaLimiteISO,
      bloquesContenido: [],
    };

    this.boardService.createTask(payload).subscribe({
      next: (tareaNueva) => {
        // Aquí transformamos los responsablesIds en objetos con estructura usuario,
        // para que la UI pueda mostrar datos de los responsables correctamente
        const responsablesParaUI = responsablesArr.map(id => {
          // Intentamos buscar los datos completos del usuario en miembrosDelProyecto
          const miembro = this.miembrosDelProyecto.find(m => m.usuario.id === id);
          return miembro ? miembro.usuario : { id, nombre: 'Desconocido', apellido: '', email: '' };
        });

        const task: Task = {
          ...tareaNueva,
          // Cambiamos 'assignee' a array de usuarios para la UI
          assignee: responsablesParaUI,
          etiquetas: tareaNueva.etiquetas ?? [],
          bloquesContenido: tareaNueva.bloquesContenido ?? [],
          title: tareaNueva.titulo ?? '',
          dueDate: tareaNueva.fechaLimite ?? '',
          priority: (tareaNueva as any).priority ?? 'Media',
          description: (tareaNueva as any).description ?? ''
        };

        this.categoriaSeleccionadaForModal!.tasks.push(task);

        this.categoriaSeleccionadaForModal!.tasks.sort((a, b) => (a.posicion ?? 0) - (b.posicion ?? 0));

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

  getColumnColorClass(nombre: string): string {
    switch (nombre) {
      case 'Sin empezar':
        return 'bg-slate-900/10';
      case 'Por hacer':
        return 'bg-sky-900/10';
      case 'Hecho':
        return 'bg-green-900/10';
      default:
        return 'bg-base-200';
    }
  }

  getCardColorClass(nombre: string): string {
    switch (nombre) {
      case 'Sin empezar':
        return 'bg-slate-900/20 text-slate-300';
      case 'Por hacer':
        return 'bg-sky-900/20 text-sky-300';
      case 'Hecho':
        return 'bg-green-900/20 text-green-300';
      default:
        return 'bg-base-100 text-base-content';
    }
  }

  getTextColorClass(nombre: string): string {
    switch (nombre) {
      case 'Sin empezar':
        return 'text-slate-400';
      case 'Por hacer':
        return 'text-sky-400';
      case 'Hecho':
        return 'text-green-400';
      default:
        return 'text-gray-300';
    }
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

  getButtonColorClass(nombre: string): string {
    switch (nombre) {
      case 'Sin empezar':
        return 'bg-slate-700/50 text-white hover:bg-slate-700/70';
      case 'Por hacer':
        return 'bg-sky-700/50 text-white hover:bg-sky-700/70';
      case 'Hecho':
        return 'bg-green-700/50 text-white hover:bg-green-700/70';
      default:
        return 'btn-outline btn-primary';
    }
  }
}
