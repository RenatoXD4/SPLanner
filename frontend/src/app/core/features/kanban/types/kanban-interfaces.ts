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
  color?: ColorObj;   // Añadido para manejar el color de la columna
}

export interface Task {
  id: string;
  titulo?: string;
  fechaLimite?: string | null;
  posicion: number;
  createdAt: string;
  estadoId: number;
  proyectoId: string;
  etiquetaIds: number[]

  lastModifiedAt?: string; // O Date, dependiendo de cómo lo mande el backend
  lastModifiedBy?: User;
  editores?: TareaEditorUI[];

  // Campos backend opcionales que pueden venir
  assignee?: User[]; // lista de usuarios asignados
  etiquetas?: any[];
  bloquesContenido?: any[];

  // Campos frontend (para UI)
  title?: string;
  dueDate?: string;

  //calendario
  syncedWithCalendar?: boolean;
  calendarEventId?: string | null;
}

export interface RawTask {
  id: string;
  titulo?: string;
  fechaLimite?: string | null;
  posicion: number;
  createdAt: string;
  estadoId: number;
  proyectoId: string;

  responsables?: { usuario: User }[]; // ← NUEVO
  etiquetas?: any[];
  bloquesContenido?: any[];
}

export type TaskUI = Task;

export interface TareaEditorUI {
  usuario: User;
}


export interface Etiqueta {
  id: number;       // ID único de la etiqueta
  nombre: string;   // Nombre de la etiqueta
  color: string;
}

export interface ColorObj {
  id: number;
  nombre: string;
  codigo: string;
}

export interface EtiquetaConColor {
  id: number;
  nombre: string;
  color?: ColorObj | string;  // Puede ser objeto o string según tipo recibido
}


export interface Estado {
  id: number;
  nombre: string;
  posicion: number;
  proyectoId: string;
  color?: {            // Añadir color como opcional
    id: number;
    nombre: string;
    codigo: string;
  };
}

export interface UpdateEstadoBody {
  nombre?: string;
  posicion?: number;
  colorId?: number;
}