import { Component, ElementRef, ViewChild, ChangeDetectorRef, HostListener, OnInit, ViewChildren, QueryList, Inject, PLATFORM_ID } from '@angular/core';
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
import { NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Calendario } from '../../../../shared/ui/calendario/calendario';
import { Categoria, ColorObj, Etiqueta, EtiquetaConColor, MiembroProyecto, RawTask, ResponsableTarea, Task, TaskUI, User } from '../../types/kanban-interfaces';


@Component({
  selector: 'app-board',
  imports: [CdkDropList, CdkDrag, CommonModule, FormsModule, Sidebar, TaskDetail, DragDropModule, Calendario],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnInit {
  tareas: any[] = []
  proyectoIdActual: string = '';
  rolUsuario: string = '';
  proyectoActual: any = null;
  public selectedTask: TaskUI | null = null;
  public isDetailPanelHidden: boolean = true;
  public selectedTaskEstadoNombre: string | null = null;

  showTaskDetails(task: TaskUI, categoria: Categoria) {
    this.selectedTask = task;
    this.selectedTaskEstadoNombre = categoria.nombre;
    this.isDetailPanelHidden = false;
  }

  hideTaskDetails() {
    this.isDetailPanelHidden = true;
    this.selectedTask = null;
  }

  @ViewChild('kanbanContainer') kanbanContainer?: ElementRef; //id del
  @ViewChild('listContainer') listContainer?: ElementRef;
  @ViewChild('assignedContainer') assignedContainer?: ElementRef;
  @ViewChild('thTitulo') thTitulo!: ElementRef;
  @ViewChildren('colorSelectorContainer') colorSelectorContainers!: QueryList<ElementRef>;


  currentUser: string = '';
  sidebarOpen = false;
  modalVisible = false;
 calendarioAbierto = false;

  CategoriasK: Categoria[] = [];
  miembrosDelProyecto: ResponsableTarea[] = [];
  colores: ColorObj[] = [];

  etiquetasUnicas: Etiqueta[] = [];

  isMobile: boolean = false;
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
    private proyectoGuard: ProyectoGuard,
    @Inject(PLATFORM_ID) private platformId: Object
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

    // CARGAR INFORMACIÓN DEL ROL DESDE LOCALSTORAGE ← AGREGAR ESTO
    this.cargarInformacionProyectoDesdeLocalStorage();

    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      // fuerza siempre Kanban en móvil al iniciar
      if (this.isMobile && this.viewMode !== 'kanban') {
        this.setViewMode('kanban');
      }
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
 abrirCalendario() {
    this.calendarioAbierto = true;
  }
  /**
   * Carga la información del proyecto y rol desde localStorage
   */
  /**
   * Carga la información del proyecto y rol desde localStorage
   * Si no hay información, asume que es un proyecto propio (Administrador)
   */
  private cargarInformacionProyectoDesdeLocalStorage(): void {
    try {
      // Obtener la información guardada
      const proyectoData = localStorage.getItem('proyectoActual');
      const rol = localStorage.getItem('rolActual');
      const proyectoId = localStorage.getItem('proyectoIdActual');

      // Verificar si hay información de proyecto compartido
      const hayInformacionCompartida = proyectoData && rol && proyectoId;

      if (hayInformacionCompartida) {
        // Hay información de proyecto compartido
        this.proyectoActual = JSON.parse(proyectoData);
        this.rolUsuario = rol;

        console.log('Proyecto compartido cargado:', this.proyectoActual);
        console.log('Rol del usuario en proyecto compartido:', this.rolUsuario);
      } else {
        // No hay información en localStorage, es un proyecto propio
        this.rolUsuario = 'Administrador';
        this.proyectoActual = {
          proyectoId: this.proyectoGuard.getProyectoActual(),
          rol: 'Administrador',
          nombre: 'Mi Proyecto', // Esto se actualizará cuando cargues los datos del proyecto
          descripcion: '',
          creadoPor: 'Tú',
          fechaAcceso: new Date().toISOString()
        };

        console.log('Proyecto propio detectado - Rol: Administrador');
        console.log('No hay información en localStorage, asumiendo proyecto propio');
      }

    } catch (error) {
      console.error('Error al cargar información del proyecto:', error);
      // Por defecto, asumir que es proyecto propio
      this.rolUsuario = 'Administrador';
      console.log('Error al cargar localStorage, asumiendo proyecto propio - Rol: Administrador');
    }
  }
  /**
   * Verifica permisos en el board basado en el rol guardado
   */
  puedeEditar(): boolean {
    return this.rolUsuario === 'Administrador' || this.rolUsuario === 'Editor';
  }

  puedeEliminar(): boolean {
    return this.rolUsuario === 'Administrador';
  }

  puedeInvitar(): boolean {
    return this.rolUsuario === 'Administrador';
  }

  puedeCrearColumnas(): boolean {
    return this.rolUsuario === 'Administrador';
  }

  puedeCambiarColores(): boolean {
    return this.rolUsuario === 'Administrador';
  }

  puedeGestionarEtiquetas(): boolean {
    return this.rolUsuario === 'Administrador';
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
              etiquetaIds: (t as Task).etiquetaIds,
              lastModifiedAt: (t as Task).lastModifiedAt,
              lastModifiedBy: (t as Task).lastModifiedBy,
              editores: (t as Task).editores,
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
          // Este objeto respeta Etiqueta
          return {
            id: e.id,
            nombre: e.nombre,
            color: colorHex
          } as Etiqueta;
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
        fondoColumna: { 'background-color': this.hexToRgba(colorHex, 0.4) },
        fondoTarjeta: {
          'background-color': this.hexToRgba(colorHex, 0.2),
          color: this.lightenColor(colorHex, 0.3)
        },
        texto: {
          color: this.lightenColor(colorHex, 0.70),
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
      // Al agregar, asegúrate de crear tipo Etiqueta
      // Ejemplo ficticio:
      this.etiquetasUnicas.push({
        id: Date.now(), // o del backend
        nombre,
        color: '#27c5b1', // default o pedido al usuario
      });
    }
    this.tagsBusquedaTexto = '';
    this.filtrarTags();
  }




  getButtonClasses(view: string) {
    return {
      'border-primary text-primary font-semibold ring-2 ring-primary/30': this.viewMode === view,
    };
  }

  getEtiquetaColor(etiquetaRef: any): string {
    // Si recibes un objeto {id, nombre, color}
    if (typeof etiquetaRef === 'object' && etiquetaRef !== null) {
      // Prioridad: usa el id si está
      if ('id' in etiquetaRef) {
        const match = this.etiquetasUnicas.find(e => e.id === etiquetaRef.id);
        if (match) return match.color;
      }
      // pruebo por nombre si existe
      if ('nombre' in etiquetaRef) {
        const match = this.etiquetasUnicas.find(e => e.nombre === etiquetaRef.nombre);
        if (match) return match.color;
      }
    }
    // Si recibes sólo el id (number)
    if (typeof etiquetaRef === 'number') {
      const match = this.etiquetasUnicas.find(e => e.id === etiquetaRef);
      if (match) return match.color;
    }
    // Si recibes sólo el nombre (string)
    if (typeof etiquetaRef === 'string') {
      const match = this.etiquetasUnicas.find(e => e.nombre === etiquetaRef);
      if (match) return match.color;
    }
    return '#666';
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
        let id = null;
        if (e.etiqueta && e.etiqueta.id !== undefined) id = e.etiqueta.id;
        else if (e.id !== undefined) id = e.id;
        else if (typeof e === "number") id = e;
        return this.etiquetasUnicas.find(etq => etq.id === id)?.nombre ?? '';
      })
      .filter(nombre => nombre);
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

      if (this.selectedTask && String(this.selectedTask.id) === String(task.id)) {

        const nuevaCategoria = this.CategoriasK.find(c => Number(c.id) === nuevoEstadoId);

        if (nuevaCategoria) {
           this.selectedTaskEstadoNombre = nuevaCategoria.nombre;
        }

        this.selectedTask = { ...task };
      }

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
    if (this.isMobile && mode !== 'kanban') return; // bloquea cambio de vista en móvil
    if (this.viewMode === mode) return;
    this.viewMode = mode;
    setTimeout(() => {
      // tu lógica de animación
      this.cdr.detectChanges();
      if (mode === 'kanban') this.applyAnimation(this.kanbanContainer);
      if (mode === 'list') this.applyAnimation(this.listContainer);
      if (mode === 'assigned') this.applyAnimation(this.assignedContainer);
    });
  }

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      if (this.isMobile && this.viewMode !== 'kanban') {
        this.setViewMode('kanban');
      }
    }
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

    // Limpiar cualquier valor previo
    this.newTask.responsablesIds = [];
    this.newTask.etiquetaIds = [];

    // Asignar los valores predeterminados
    this.newTask = {
      titulo: '',
      fechaLimite: '',
      responsablesIds: [],  // Reiniciar el array de responsables
      etiquetaIds: [],      // Reiniciar el array de etiquetas
      estadoId: Number(categoria.id),
      proyectoId: this.proyectoIdActual,
      bloquesContenido: []
    };

    const modal = document.getElementById('modalNuevaTarea') as HTMLDialogElement;
    modal?.showModal();

    // Forzar la actualización de la vista al abrir el modal
    this.cdr.detectChanges();  // Asegúrate de que Angular actualice la vista con los nuevos valores
  }

  busquedaResponsableNueva: string = '';
  busquedaEtiquetaNueva: string = '';

  filtrarResponsablesNueva(): any[] {
    if (!this.busquedaResponsableNueva.trim()) return this.miembrosDelProyecto;
    const filtro = this.busquedaResponsableNueva.trim().toLowerCase();
    return this.miembrosDelProyecto.filter(m =>
      (m.usuario.nombre + ' ' + m.usuario.apellido).toLowerCase().includes(filtro)
    );
  }

  filtrarEtiquetasNueva(): Etiqueta[] {
    if (!this.busquedaEtiquetaNueva.trim()) return this.etiquetasUnicas;
    const filtro = this.busquedaEtiquetaNueva.trim().toLowerCase();
    return this.etiquetasUnicas.filter(e =>
      e.nombre.toLowerCase().includes(filtro)
    );
  }

  clearTituloError() {
    if (this.errores.titulo && this.newTask.titulo.trim().length > 0) {
      this.errores.titulo = false;
    }
  }

  cerrarModal() {
    const modal = document.getElementById('modalNuevaTarea') as HTMLDialogElement;
    modal?.close();

    // Resetear los valores de newTask (limpiar responsables y etiquetas)
    this.newTask = {
      titulo: '',
      fechaLimite: '',
      responsablesIds: [],  // Limpiar los responsables seleccionados
      etiquetaIds: [],      // Limpiar las etiquetas seleccionadas
      estadoId: 0,
      proyectoId: '',
      bloquesContenido: []
    };
    this.busquedaResponsableNueva = '';
    this.busquedaEtiquetaNueva = '';
    this.errores = { titulo: false };
    this.categoriaSeleccionadaForModal = null;  // Limpiar la categoría seleccionada

    // Forzar la actualización de la vista
    this.cdr.detectChanges();  // Esto asegura que la vista se actualice correctamente

    console.log('Formulario limpiado y valores de checkboxes restablecidos');
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

    // Asegurarse de que responsablesIds y etiquetaIds sean arreglos
    const responsablesArr = Array.isArray(this.newTask.responsablesIds) ?
      this.newTask.responsablesIds.filter(id => !!id) : [];

    const etiquetasArr = Array.isArray(this.newTask.etiquetaIds) ?
      this.newTask.etiquetaIds.filter(id => !!id) : [];

    // Crear el payload para el backend
    const estadoId = Number(this.categoriaSeleccionadaForModal?.id);
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
      etiquetaIds: etiquetasArr.length ? etiquetasArr : undefined,
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
          etiquetaIds: (tareaNueva as any).etiquetaIds,
          lastModifiedAt: (tareaNueva as any).lastModifiedAt,
          lastModifiedBy: (tareaNueva as any).lastModifiedBy,
          editores: (tareaNueva as any).editores,
        };

        this.zone.run(() => {
          // Actualizar la vista con la nueva tarea
          if (this.categoriaSeleccionadaForModal) {
            this.categoriaSeleccionadaForModal.tasks = [...this.categoriaSeleccionadaForModal.tasks, task];
            this.categoriaSeleccionadaForModal.tasks.sort((a, b) => (a.posicion ?? 0) - (b.posicion ?? 0));
          }
          this.generarListaResponsables();
          this.generarListaPrioridades();
          this.cdr.detectChanges();
          this.cerrarModal();  // Limpiar el formulario
        });
      },
      error: (err) => {
        console.error('Error creando tarea:', err);
        alert('Ocurrió un error al crear la tarea');
      }
    });
  }



  selectResponsable(id: string, event: any) {
    if (event.target.checked) {
      // Si el checkbox está marcado, agregar el responsable al array
      this.newTask.responsablesIds.push(id);
    } else {
      // Si el checkbox está desmarcado, eliminar el responsable del array
      this.newTask.responsablesIds = this.newTask.responsablesIds.filter(responsableId => responsableId !== id);
    }

    // Verificación para debug
    console.log('Responsables seleccionados:', this.newTask.responsablesIds);
  }

  selectEtiqueta(id: number, event: any) {
    if (event.target.checked) {
      // Si el checkbox está marcado, agregar la etiqueta al array
      this.newTask.etiquetaIds.push(id);
    } else {
      // Si el checkbox está desmarcado, eliminar la etiqueta del array
      this.newTask.etiquetaIds = this.newTask.etiquetaIds.filter(etiquetaId => etiquetaId !== id);
    }

    console.log('Etiquetas seleccionadas:', this.newTask.etiquetaIds);
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
  // Para mostrar fecha en DD/MM/YYYY SIN desfase de zona
  formatDate(date: string): string {
    if (!date) return 'Sin fecha';
    const newDate = new Date(date);
    const day = newDate.getUTCDate().toString().padStart(2, '0');
    const month = (newDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  eliminarTarea(taskId: string): void {
    if (!this.puedeEliminar()) {
      //alert('No tienes permisos para eliminar tareas');
      return;
    }

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

        if(this.selectedTask && this.selectedTask.id == taskId) {
          this.tareaSeleccionada = null;
          this.hideTaskDetails()

        }

        this.cdr.detectChanges();  // Asegura que Angular detecte los cambios
      },
      (error) => {
        console.error('Error al eliminar la tarea:', error);  // Detalle completo del error
        if (error.message.includes("La tarea con ID")) {
          //alert(`Error: ${error.message}`);
        } else {
          //alert('Error al eliminar la tarea. Por favor, intente nuevamente.');
        }
      }
    );
    //}
  }
  /**
   * Limpia la información del proyecto actual al salir del board
   */
  limpiarProyectoActual(): void {
    localStorage.removeItem('proyectoActual');
    localStorage.removeItem('proyectoIdActual');
    localStorage.removeItem('rolActual');
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
        return false;
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
  tagsFiltradas: Etiqueta[] = [];

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
    if (!this.puedeGestionarEtiquetas()) {
      //alert('No tienes permisos para editar etiquetas');
      return;
    }
    if (!nuevoNombre.trim()) {
      //alert('El nombre de la etiqueta no puede estar vacío.');
      return;
    }
    if (!nuevoColorId) {
      //alert('Debe seleccionar un color para la etiqueta.');
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



  panelOpenedManually = false;

  onToggleBtnDown(event: MouseEvent, id: string) {
    event.stopPropagation();
    // Si ya está abierto, lo cierra
    if (this.colorSelectorVisible[id]) {
      this.colorSelectorVisible = {}; // Cierra todos
      this.cdr.detectChanges();
      return;
    }
    // Si estaba cerrado, abre solo el seleccionado
    this.panelOpenedManually = true;
    this.colorSelectorVisible = {};
    this.colorSelectorVisible[id] = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.panelOpenedManually = false;
    });
  }



  onPanelDown(event: MouseEvent) {
    event.stopPropagation();
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentClickAnywhere(event: MouseEvent) {
    // Si el panel se acaba de abrir por botón, no lo cierres
    if (this.panelOpenedManually) return;
    // Cierra el panel en cualquier otro caso
    if (Object.values(this.colorSelectorVisible).some(v => v)) {
      this.colorSelectorVisible = {};
      this.cdr.detectChanges();
    }
  }


  cambiarColorColumna(id: string, color: ColorObj): void {
    if (!this.puedeCambiarColores()) {
      alert('No tienes permisos para cambiar colores de columnas');
      return;
    }
    const cat = this.CategoriasK.find(c => c.id === id);
    if (!cat) return;
    cat.color = color;
    this.configurarEstilosPorEstado(this.CategoriasK);
    this.colorSelectorVisible[id] = false;
    this.cdr.detectChanges();
    this.boardService.updateEstado(Number(id), { colorId: color.id }).subscribe({
      next: (estadoActualizado) => {
        const idx = this.CategoriasK.findIndex(c => c.id === id);
        if (idx !== -1) {
          this.CategoriasK[idx].color = estadoActualizado.color;
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.cargarDatosProyecto(this.proyectoIdActual);
      }
    });
  }



  modalColumnaVisible: boolean = false;
  nuevaColumnaNombre: string = '';
  nuevaColumnaColorId: number | null = null;
  nuevaColumnaError: string | null = null;

  abrirModalNuevaColumna() {
    this.nuevaColumnaNombre = '';
    this.nuevaColumnaColorId = null;
    this.modalColumnaVisible = true;
  }

  cerrarModalNuevaColumna() {
    this.modalColumnaVisible = false;
    this.nuevaColumnaError = null;
  }

  // Llama esta función en (input) del campo nombre
  validarNombreColumna() {
    const nombreActual = this.nuevaColumnaNombre.trim().toLowerCase();
    const existe = this.CategoriasK.some(
      c => c.nombre.trim().toLowerCase() === nombreActual
    );
    if (existe) {
      this.nuevaColumnaError = `Ya existe una columna llamada ‘${this.nuevaColumnaNombre.trim()}’ en este proyecto. Por favor elige otro nombre.`;
    } else {
      this.nuevaColumnaError = null;
    }
  }

  crearColumna(event: Event) {
    event.preventDefault();
    if (!this.puedeCrearColumnas()) return;
    if (!this.nuevaColumnaNombre.trim() || !this.nuevaColumnaColorId) return;

    // Nueva validación local
    const nombreActual = this.nuevaColumnaNombre.trim().toLowerCase();
    const existe = this.CategoriasK.some(
      c => c.nombre.trim().toLowerCase() === nombreActual
    );
    if (existe) {
      this.nuevaColumnaError = `Ya existe una columna llamada ‘${this.nuevaColumnaNombre.trim()}’ en este proyecto. Por favor elige otro nombre.`;
      return; // NO sigue si hay duplicación local
    }

    this.nuevaColumnaError = null; // Limpia el error previo

    const posicion = this.CategoriasK.length > 0
      ? Math.max(...this.CategoriasK.map(c => c.posicion)) + 1
      : 0;

    this.boardService.createEstado(
      this.nuevaColumnaNombre.trim(),
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
        this.nuevaColumnaError = null;
        this.nuevaColumnaNombre = '';
        this.nuevaColumnaColorId = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        if (err?.status === 409) {
          this.nuevaColumnaError = err?.error?.message || 'Ya existe una columna con ese nombre.';
        } else {
          this.nuevaColumnaError = 'Ocurrió un error al crear la columna.';
        }
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
    if (!this.puedeEliminar()) {
      //alert('No tienes permisos para eliminar columnas');
      return;
    }
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
  nuevoColorEtiquetaId: number | null = null; // Usar solo el ID del color
  modalEtiquetaVisible = false;
  public errorEtiquetaDuplicada: string | null = null;

  crearEtiqueta(event: Event) {
    event.preventDefault();
    if (!this.puedeGestionarEtiquetas()) return;
    if (!this.nuevoNombreEtiqueta.trim() || !this.nuevoColorEtiquetaId) return;

    this.boardService.createEtiqueta(
      this.nuevoNombreEtiqueta,
      this.proyectoIdActual,
      this.nuevoColorEtiquetaId
    ).subscribe({
      next: (newEtiqueta) => {
        // ¡Recibes el HEX directo en newEtiqueta.color!
        const etiquetaNormalizada: Etiqueta = {
          id: newEtiqueta.id,
          nombre: newEtiqueta.nombre,
          color: newEtiqueta.color // <-- HEX directo: "#1976D2"
        };
        this.etiquetasUnicas.push(etiquetaNormalizada);

        // --- ASOCIA a la tarea seleccionada si tu UX lo necesita
        if (this.tareaSeleccionada) {
          if (!this.tareaSeleccionada.etiquetas) this.tareaSeleccionada.etiquetas = [];
          this.tareaSeleccionada.etiquetas.push(etiquetaNormalizada.id);
        }

        // Limpieza de form
        this.nuevoNombreEtiqueta = '';
        this.nuevoColorEtiquetaId = null;
        this.modalEtiquetaVisible = false;
        this.errorEtiquetaDuplicada = null;
        this.cdr.detectChanges();
      },
      error: err => {
        if (err?.status === 409) {
          this.errorEtiquetaDuplicada = err?.error?.message || 'Ya existe una etiqueta con ese nombre en este proyecto.';
        } else {
          this.errorEtiquetaDuplicada = 'Hubo un error al crear la etiqueta.';
        }
        this.cdr.detectChanges();
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

  // --- MODAL / PANEL DE EDICIÓN DE TAREAS :/ ---
  public modalEditarVisible = false;
  public tareaOriginal: RawTask | null = null;
  public tareaSeleccionada: TaskUI | null = null;
  public responsablesIds: string[] = [];
  public etiquetaIds: number[] = [];
  public erroresEditar = { titulo: false };

  filtroResponsables: string = '';

  miembrosFiltrados(): any[] {
    if (!this.filtroResponsables.trim()) return this.miembrosDelProyecto;
    const filtro = this.filtroResponsables.trim().toLowerCase();
    return this.miembrosDelProyecto.filter(m =>
      (m.usuario.nombre + ' ' + m.usuario.apellido).toLowerCase().includes(filtro)
    );
  }

  busquedaEtiqueta: string = '';

  filtrarEtiquetas(): Etiqueta[] {
    if (!this.busquedaEtiqueta.trim()) return this.etiquetasUnicas;
    const filtro = this.busquedaEtiqueta.trim().toLowerCase();
    return this.etiquetasUnicas.filter(e =>
      e.nombre.toLowerCase().includes(filtro)
    );
  }

  mapRawTaskToUI(raw: RawTask): TaskUI {
    // Normaliza fechaLimite para <input type="date">
    let fechaLimiteInput = '';
    if (raw.fechaLimite) {
      try {
        const d = new Date(raw.fechaLimite);
        if (!isNaN(d.getTime())) {
          const yyyy = d.getUTCFullYear();
          const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
          const dd = String(d.getUTCDate()).padStart(2, '0');
          fechaLimiteInput = `${yyyy}-${mm}-${dd}`;
        }
      } catch {
        fechaLimiteInput = '';
      }
    }
    return {
      id: raw.id,
      titulo: raw.titulo ?? '',
      fechaLimite: fechaLimiteInput,
      title: raw.titulo ?? '',
      dueDate: fechaLimiteInput, // mantenlo igual si la UI lo requiere
      posicion: raw.posicion,
      createdAt: raw.createdAt,
      estadoId: raw.estadoId,
      proyectoId: raw.proyectoId,
      assignee: Array.isArray(raw.responsables) ? raw.responsables.map(r => r.usuario) : [],
      etiquetas: Array.isArray(raw.etiquetas) ? raw.etiquetas : [],
      etiquetaIds: Array.isArray(raw.etiquetas)
        ? raw.etiquetas.map(e => typeof e === 'number' ? e : (e.etiquetaId ?? e.id)).filter(id => typeof id === 'number')
        : [],
    };
  }
  extractResponsableIds(t: RawTask | Task | null | undefined): string[] {
    if (!t) return [];
    // Detecta RawTask
    if (t.hasOwnProperty('responsables') && Array.isArray((t as any).responsables)) {
      return (t as any).responsables
        .map((r: any) => r.usuario?.id ?? r.usuarioId ?? null)
        .filter(Boolean);
    }
    // Detecta Task mapeado
    if (t.hasOwnProperty('assignee') && Array.isArray((t as any).assignee)) {
      return (t as any).assignee.map((u: any) => u.id);
    }
    console.log('extractResponsableIds recibe:', t);
    return [];
  }
  getEtiquetaIds(t: RawTask | Task | null | undefined): number[] {
    if (!t) return [];
    if (t.hasOwnProperty('etiquetas') && Array.isArray((t as any).etiquetas)) {
      return (t as any).etiquetas
        .map((e: any) => typeof e === 'number' ? e : (e.etiquetaId ?? e.id))
        .filter((id: any): id is number => typeof id === 'number');
    }
    if (t.hasOwnProperty('etiquetaIds') && Array.isArray((t as any).etiquetaIds)) {
      return (t as any).etiquetaIds;
    }
    console.log('getEtiquetaIds recibe:', t);
    return [];
  }
  editarTarea(id: string) {
    // Busca la tarea en todas las categorías
    let tarea: Task | undefined;
    for (const categoria of this.CategoriasK) {
      tarea = categoria.tasks.find(t => t.id === id);
      if (tarea) break;
    }
    if (tarea) {
      this.abrirModalEditarTarea(tarea);
    }
  }
  selectResponsableEditar(id: string, event: any) {
    if (event.target.checked) {
      if (!this.responsablesIds.includes(id)) this.responsablesIds.push(id);
    } else {
      this.responsablesIds = this.responsablesIds.filter(rid => rid !== id);
    }
    // Actualiza la lista para la UI
    if (this.tareaSeleccionada) {
      this.tareaSeleccionada.assignee = this.miembrosDelProyecto
        .filter(m => this.responsablesIds.includes(m.usuario.id))
        .map(m => m.usuario);
    }
  }
  selectEtiquetaEditar(id: number, event: any) {
    if (event.target.checked) {
      if (!this.etiquetaIds.includes(id)) this.etiquetaIds.push(id);
    } else {
      this.etiquetaIds = this.etiquetaIds.filter(eid => eid !== id);
    }
    this.tareaSeleccionada!.etiquetaIds = [...this.etiquetaIds];
  }
  abrirModalEditarTarea(tarea: RawTask | Task) {
    // Solo usa el RawTask original de la lista de categorías
    this.tareaOriginal = tarea as RawTask; // O el objeto verdadero, sin mapear
    this.tareaSeleccionada = this.mapRawTaskToUI(this.tareaOriginal);

    this.responsablesIds = this.extractResponsableIds(this.tareaOriginal);
    this.etiquetaIds = this.getEtiquetaIds(this.tareaOriginal);
    this.modalEditarVisible = true;
    this.erroresEditar = { titulo: false };
  }
  cerrarModalEditarTarea() {
    this.modalEditarVisible = false;
    this.tareaOriginal = null;
    this.tareaSeleccionada = null;
    this.responsablesIds = [];
    this.etiquetaIds = [];
    this.erroresEditar = { titulo: false };
    // Limpia filtros de buscadores
    this.filtroResponsables = '';
    this.busquedaEtiqueta = '';
  }

  // Guardar cambios llamando al servicio (método recomendado)
  guardarCambiosTareaEditar(event: Event) {
    event.preventDefault();

    if (!this.tareaSeleccionada?.titulo?.trim()) {
      this.erroresEditar.titulo = true;
      return;
    }
    this.erroresEditar.titulo = false;

    const fechaLimiteISO =
      this.tareaSeleccionada?.fechaLimite &&
        this.tareaSeleccionada.fechaLimite.length === 10 // formato yyyy-MM-dd
        ? new Date(this.tareaSeleccionada.fechaLimite + "T00:00:00Z").toISOString()
        : null;


    const originalesResponsablesIds = this.extractResponsableIds(this.tareaOriginal!);
    const nuevosResponsablesIds = [...this.responsablesIds];
    const responsablesToAdd = nuevosResponsablesIds.filter(id => !originalesResponsablesIds.includes(id));
    const responsablesToRemove = originalesResponsablesIds.filter(id => !nuevosResponsablesIds.includes(id));


    const originalesEtiquetaIds = this.getEtiquetaIds(this.tareaOriginal!);
    const nuevasEtiquetaIds = [...this.etiquetaIds];
    const etiquetasToAdd = nuevasEtiquetaIds.filter(id => !originalesEtiquetaIds.includes(id));
    const etiquetasToRemove = originalesEtiquetaIds.filter(id => !nuevasEtiquetaIds.includes(id));
    console.log('responsablesToRemove:', responsablesToRemove);

    this.boardService.updateTaskFull({
      id: this.tareaSeleccionada.id,
      data: {
        titulo: this.tareaSeleccionada.titulo,
        fechaLimite: fechaLimiteISO,
      },
      responsablesToAdd,
      responsablesToRemove,
      etiquetasToAdd,
      etiquetasToRemove
    }).subscribe({
      next: (tareaActualizadaRaw: RawTask) => {
        console.log('originalesResponsablesIds:', originalesResponsablesIds);
        console.log('nuevosResponsablesIds:', nuevosResponsablesIds);
        console.log('responsablesToRemove:', responsablesToRemove);

        const tareaActualizada = this.mapRawTaskToUI(tareaActualizadaRaw);

        //Se realiza un fix acá, porque se necesita actualizar los responsables en la UI del frontend
        const responsablesReconstruidos: ResponsableTarea[] = this.miembrosDelProyecto
            .filter(miembro => nuevosResponsablesIds.includes(miembro.usuario.id))
            .map(miembro => ({
              usuario: miembro.usuario,
              tareaId: tareaActualizada.id,
              id: 0,
              usuarioId: miembro.usuario.id
            }));

        (tareaActualizada as any).responsables = responsablesReconstruidos;
        tareaActualizada.assignee = responsablesReconstruidos.map(r => r.usuario);

        const categoria = this.CategoriasK.find(c => c.id === tareaActualizada.estadoId.toString());
        if (categoria) {
          const idx = categoria.tasks.findIndex(t => t.id === tareaActualizada.id);
          if (idx !== -1) {
            categoria.tasks[idx] = tareaActualizada; // tareaActualizada es TaskUI con etiquetas y etiquetaIds
            categoria.tasks = [...categoria.tasks];  // Para disparar change detection
          }
        }
        this.cerrarModalEditarTarea();
        this.zone.run(() => this.cdr.detectChanges());
      },
      error: err => {
        console.error('Error actualizando tarea:', err);
        alert('Ocurrió un error al guardar los cambios');
      }
    });
  }

  // --- MODAL / PANEL DE ELIMINACIÓN DE ETIQUETAS ---
  public etiquetasSeleccionadas: number[] = [];
  public confirmMultiDeleteActivo: boolean = false;
  public modalGestionEtiquetasVisible: boolean = false;

  // --- MODALES ---
  abrirPanelGestionEtiquetas(): void {
    this.modalGestionEtiquetasVisible = true;
  }
  cerrarModalGestionEtiquetas(): void {
    this.modalGestionEtiquetasVisible = false;
    this.etiquetasSeleccionadas = [];
    this.confirmMultiDeleteActivo = false;
  }

  // Selección de etiquetas en la UI
  toggleSeleccionEtiqueta(id: number, event: any): void {
    if (event.target.checked) {
      if (!this.etiquetasSeleccionadas.includes(id)) {
        this.etiquetasSeleccionadas.push(id);
      }
    } else {
      this.etiquetasSeleccionadas = this.etiquetasSeleccionadas.filter(eId => eId !== id);
    }
  }

  // Mostrar/cerrar modal de confirmación múltiple
  abrirModalConfirmarEliminarEtiquetasMultiples(): void {
    this.confirmMultiDeleteActivo = true;
  }
  cerrarModalConfirmarEliminarEtiquetasMultiples(): void {
    this.confirmMultiDeleteActivo = false;
  }

  // Eliminar todas las etiquetas seleccionadas tras confirmación
  eliminarEtiquetasSeleccionadas(): void {
    if (this.etiquetasSeleccionadas.length === 0) return;
    Promise.all(
      this.etiquetasSeleccionadas.map(id =>
        this.boardService.deleteEtiqueta(id, this.proyectoIdActual).toPromise()
      )
    ).then(() => {
      // 1. Elimina del array global
      this.etiquetasUnicas = this.etiquetasUnicas.filter(e => !this.etiquetasSeleccionadas.includes(e.id));
      // 2. Limpieza en tareas del kanban
      for (const categoria of this.CategoriasK) {
        categoria.tasks.forEach(tarea => {
          if (Array.isArray(tarea.etiquetas)) {
            tarea.etiquetas = tarea.etiquetas.filter(
              (et: any) => {
                const id = typeof et === 'number' ? et : et.id;
                return !this.etiquetasSeleccionadas.includes(id);
              }
            );
          }
        });
        categoria.tasks = [...categoria.tasks];
      }
      this.CategoriasK = [...this.CategoriasK];
      this.etiquetasSeleccionadas = [];
      this.confirmMultiDeleteActivo = false;
      this.cerrarModalGestionEtiquetas();
      this.cdr.detectChanges();
    }).catch(err => {
      alert('Error al eliminar alguna etiqueta');
    });
  }
  getColorEtiqueta(id: number): string {
    const etiqueta = this.etiquetasUnicas.find(e => e.id === id);
    return etiqueta?.color ?? '#666';
  }

  public textoBusquedaEtiqueta: string = '';

  // NUEVO filtro específico para el modal
  get etiquetasFiltradasModal(): Etiqueta[] {
    if (!this.etiquetasUnicas || this.etiquetasUnicas.length === 0) return [];
    const texto = (this.textoBusquedaEtiqueta ?? '').toLowerCase().trim();
    return this.etiquetasUnicas.filter(e => {
      if (e.id === undefined || e.id === null) {
        console.error('Etiqueta sin ID detectada:', e);
        return false;
      }
      return e.nombre.toLowerCase().includes(texto);
    });
  }

  // Función para resaltar coincidencia (HTML seguro)
  highlightNombreEtiqueta(nombre: string): string {
    const texto = this.textoBusquedaEtiqueta.trim();
    if (!texto) return nombre;

    const regex = new RegExp(`(${texto})`, 'gi');
    // Escapa por seguridad: si usas Angular sanitizador, ¡será seguro!
    return nombre.replace(regex, '<mark class="bg-yellow-200 px-0.5 rounded">' + '$1' + '</mark>');
  }


 // === MÉTODO PARA MANEJAR TAREAS SINCRONIZADAS CON CALENDARIO ===
  onTareaSincronizada(tareaActualizada: any) {
  // Buscar y actualizar la tarea en todas las categorías
  for (const categoria of this.CategoriasK) {
    const index = categoria.tasks.findIndex(t => t.id === tareaActualizada.id);
    if (index !== -1) {
      // Actualizar con los nuevos campos de sincronización
      categoria.tasks[index] = {
        ...categoria.tasks[index],
        syncedWithCalendar: true,
        calendarEventId: tareaActualizada.calendarEventId
      };
      categoria.tasks = [...categoria.tasks];
      this.cdr.detectChanges();
      break;
    }
  }
}
  // === MÉTODO PARA OBTENER TODAS LAS TAREAS ===
  getTodasLasTareas(): any[] {
    if (!this.CategoriasK) return [];
    return this.CategoriasK.flatMap(categoria => categoria.tasks || []);
  }


  onTaskUpdated(updatedTask: Task): void {
    
    // 1. Actualizar el selectedTask localmente (para el panel lateral)
    if (this.selectedTask && this.selectedTask.id === updatedTask.id) {
        const oldSelectedTask = this.selectedTask; 
        this.selectedTask = {
            ...oldSelectedTask, // Preserva campos existentes (incluyendo assignee)
            ...updatedTask,     // Sobrescribe trazabilidad y otros campos de la respuesta
            
            assignee: oldSelectedTask.assignee, 
            
        } as Task;
    }

    // 2. Buscar y FUSIONAR la tarea en la fuente de verdad (this.CategoriasK)
    let taskUpdated = false;
    for (const categoria of this.CategoriasK) {
        const index = categoria.tasks.findIndex(t => t.id === updatedTask.id);
        
        if (index !== -1) {
            
            const oldTask = categoria.tasks[index];
            
            categoria.tasks[index] = {
                ...oldTask, // Mantiene todas las propiedades antiguas (etiquetas, responsables)
                ...updatedTask, 
                
                titulo: updatedTask.titulo ?? oldTask.titulo,
                fechaLimite: updatedTask.fechaLimite ?? oldTask.fechaLimite,
                assignee: oldTask.assignee,
                
            } as Task; // Aseguramos el tipo completo

            // Forzar la actualización
            categoria.tasks = [...categoria.tasks]; 

            taskUpdated = true;
            break; 
        }
    }

    if (taskUpdated) {
        this.cdr.detectChanges();
    }
  }
}
