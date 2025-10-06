import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

interface Usuario {
  id: string;
  nombre: string;
}

interface Proyecto {
  id?: string;
  nombre: string;
  descripcion?: string;
  creadoPorId: string;
  createdAt?: string;
}

interface ProyectoConUsuario extends Proyecto {
  creadoPor?: Usuario;
}

@Component({
  selector: 'app-vistas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './vistas.html',
  styleUrls: ['./vistas.css']
})
export class Vistas implements OnInit {

  // UI
  mostrarSidebar = true;
  mostrarModal = false;
  mostrarAjustes = false;
  modalEditar = false;
  mostrarConfirmEliminar = false;

  filtroTexto = '';
  mensajesExito: string[] = [];

  // Datos
  proyectos: ProyectoConUsuario[] = [];
  proyectoAEliminar: ProyectoConUsuario | null = null;
  nuevoProyectoData: Proyecto = this.crearProyectoVacio();

  private apiUrl = 'http://localhost:9001/api-v1/projects';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  // ------------------- BACKEND -------------------
  private cargarProyectos(): void {
    this.http.get<ProyectoConUsuario[]>(this.apiUrl).subscribe({
      next: res => {
        this.proyectos = res.map(p => this.normalizarProyecto(p));
      },
      error: () => this.mostrarMensaje('Error al cargar proyectos', false)
    });
  }

  guardarProyecto(): void {
    if (!this.nuevoProyectoData.nombre.trim()) return;

    const datos: Partial<Proyecto> = {
      nombre: this.nuevoProyectoData.nombre.trim(),
      descripcion: this.nuevoProyectoData.descripcion?.trim() || '',
      creadoPorId: this.nuevoProyectoData.creadoPorId
    };

    const peticion$ = this.modalEditar && this.nuevoProyectoData.id
      ? this.http.patch<ProyectoConUsuario>(`${this.apiUrl}/${this.nuevoProyectoData.id}`, datos)
      : this.http.post<ProyectoConUsuario>(this.apiUrl, datos);

    peticion$.subscribe({
      next: res => {
        const proyecto = this.normalizarProyecto(res);
        if (this.modalEditar) {
          this.proyectos = this.proyectos.map(p => p.id === proyecto.id ? proyecto : p);
          this.mostrarMensaje('Proyecto editado exitosamente');
        } else {
          this.proyectos = [...this.proyectos, proyecto];
          this.mostrarMensaje('Proyecto creado exitosamente');
        }
        this.cerrarModal();
      },
      error: () => this.mostrarMensaje(this.modalEditar ? 'Error al editar proyecto' : 'Error al crear proyecto', false)
    });
  }

  editarProyecto(proyecto: ProyectoConUsuario): void {
    this.modalEditar = true;
    this.nuevoProyectoData = { ...proyecto };
    this.mostrarModal = true;
  }

  // ------------------- ELIMINAR -------------------
  confirmarEliminar(proyecto: ProyectoConUsuario): void {
    this.proyectoAEliminar = proyecto;
    this.mostrarConfirmEliminar = true;
  }

  eliminarProyecto(): void {
    if (!this.proyectoAEliminar?.id) return;

    this.http.delete(`${this.apiUrl}/${this.proyectoAEliminar.id}`).subscribe({
      next: () => {
        this.proyectos = this.proyectos.filter(p => p.id !== this.proyectoAEliminar?.id);
        this.cancelarEliminar();
        this.mostrarMensaje('Proyecto eliminado exitosamente');
      },
      error: () => this.mostrarMensaje('Error al eliminar proyecto', false)
    });
  }

  cancelarEliminar(): void {
    this.mostrarConfirmEliminar = false;
    this.proyectoAEliminar = null;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.modalEditar = false;
    this.nuevoProyectoData = this.crearProyectoVacio();
  }

  private crearProyectoVacio(): Proyecto {
    return { nombre: '', descripcion: '', creadoPorId: 'id-usuario-existente' };
  }

  private normalizarProyecto(p: ProyectoConUsuario): ProyectoConUsuario {
    return {
      ...p,
      creadoPor: p.creadoPor || { id: p.creadoPorId, nombre: 'Desconocido' },
      createdAt: p.createdAt || new Date().toISOString()
    };
  }

  // ------------------- FILTROS -------------------
  get proyectosFiltrados(): ProyectoConUsuario[] {
    const texto = this.filtroTexto.trim().toLowerCase();
    return this.proyectos.filter(p => !texto || p.nombre.toLowerCase().includes(texto));
  }

  // ------------------- UI -------------------
  toggleSidebar(): void {
    this.mostrarSidebar = !this.mostrarSidebar;
    if (!this.mostrarSidebar) this.mostrarAjustes = false;
  }

  toggleAjustes(): void {
    this.mostrarAjustes = !this.mostrarAjustes;
  }

  abrirModal(): void {
    this.modalEditar = false;
    this.nuevoProyectoData = this.crearProyectoVacio();
    this.mostrarModal = true;
  }

  // ------------------- MENSAJES -------------------
  mostrarMensaje(mensaje: string, exito: boolean = true): void {
    this.mensajesExito.push(mensaje);
    setTimeout(() => {
      this.mensajesExito.shift();
    }, 3000);
  }
}
