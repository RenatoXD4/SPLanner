import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Sidebar } from '../../shared/ui/sidebar/sidebar';

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
  imports: [CommonModule, FormsModule, HttpClientModule, Sidebar],
  templateUrl: './vistas.html',
  styleUrls: ['./vistas.css']
})
export class Vistas implements OnInit {

  // ------------------- UI -------------------
  mostrarSidebar = true;

  filtroTexto = '';

  // ------------------- Datos -------------------
  proyectos: ProyectoConUsuario[] = [];
  proyectoAEliminar: ProyectoConUsuario | null = null;
  nuevoProyectoData: Proyecto = this.crearProyectoVacio();

  private apiUrl = 'http://localhost:9001/api-v1/projects';

  // ------------------- Contenedores dinámicos -------------------
  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;
  @ViewChild('modalTemplate', { read: TemplateRef }) modalTemplate!: TemplateRef<any>;

  @ViewChild('confirmContainer', { read: ViewContainerRef }) confirmContainer!: ViewContainerRef;
  @ViewChild('confirmTemplate', { read: TemplateRef }) confirmTemplate!: TemplateRef<any>;

  @ViewChild('mensajeContainer', { read: ViewContainerRef }) mensajeContainer!: ViewContainerRef;
  @ViewChild('mensajeTemplate', { read: TemplateRef }) mensajeTemplate!: TemplateRef<any>;

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
      error: () => this.mostrarMensaje('Error al cargar proyectos')
    });
  }

  guardarProyecto(): void {
    if (!this.nuevoProyectoData.nombre.trim()) return;

    const datos: Partial<Proyecto> = {
      nombre: this.nuevoProyectoData.nombre.trim(),
      descripcion: this.nuevoProyectoData.descripcion?.trim() || '',
      creadoPorId: this.nuevoProyectoData.creadoPorId
    };

    const peticion$ = this.nuevoProyectoData.id
      ? this.http.patch<ProyectoConUsuario>(`${this.apiUrl}/${this.nuevoProyectoData.id}`, datos)
      : this.http.post<ProyectoConUsuario>(this.apiUrl, datos);

    peticion$.subscribe({
      next: res => {
        const proyecto = this.normalizarProyecto(res);
        if (this.nuevoProyectoData.id) {
          const index = this.proyectos.findIndex(p => p.id === proyecto.id);
          if (index >= 0) this.proyectos[index] = proyecto;
          this.mostrarMensaje('Proyecto editado exitosamente');
        } else {
          this.proyectos.push(proyecto);
          this.mostrarMensaje('Proyecto creado exitosamente');
        }
        this.cerrarModal();
      },
      error: () => this.mostrarMensaje(this.nuevoProyectoData.id ? 'Error al editar proyecto' : 'Error al crear proyecto')
    });
  }

  editarProyecto(proyecto: ProyectoConUsuario): void {
    this.nuevoProyectoData = { ...proyecto };
    this.abrirModal();
  }

  confirmarEliminar(proyecto: ProyectoConUsuario): void {
    this.proyectoAEliminar = proyecto;
    this.confirmContainer.clear();
    this.confirmContainer.createEmbeddedView(this.confirmTemplate);
  }

  eliminarProyecto(): void {
    if (!this.proyectoAEliminar?.id) return;

    this.http.delete(`${this.apiUrl}/${this.proyectoAEliminar.id}`).subscribe({
      next: () => {
        this.proyectos = this.proyectos.filter(p => p.id !== this.proyectoAEliminar?.id);
        this.cancelarEliminar();
        this.mostrarMensaje('Proyecto eliminado exitosamente');
      },
      error: () => this.mostrarMensaje('Error al eliminar proyecto')
    });
  }

  cancelarEliminar(): void {
    this.proyectoAEliminar = null;
    this.confirmContainer.clear();
  }

  // ------------------- Modal -------------------
  abrirModal(): void {
    this.nuevoProyectoData = this.nuevoProyectoData.id ? this.nuevoProyectoData : this.crearProyectoVacio();
    this.modalContainer.clear();
    this.modalContainer.createEmbeddedView(this.modalTemplate);
  }

  cerrarModal(): void {
    this.nuevoProyectoData = this.crearProyectoVacio();
    this.modalContainer.clear();
  }

  // ------------------- Helpers -------------------
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

  proyectosFiltrados(): ProyectoConUsuario[] {
    const texto = this.filtroTexto.trim().toLowerCase();
    return this.proyectos.filter(p => !texto || p.nombre.toLowerCase().includes(texto));
  }

  mostrarMensaje(msg: string): void {
    const view = this.mensajeContainer.createEmbeddedView(this.mensajeTemplate, { $implicit: msg });
    setTimeout(() => view.destroy(), 3000);
  }

  toggleSidebar(): void {
    this.mostrarSidebar = !this.mostrarSidebar;
  }
}
