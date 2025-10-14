import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Sidebar } from '../../shared/ui/sidebar/sidebar';

import { VistasService, Proyecto, ProyectoConUsuario } from './service/vista-service';

@Component({
  selector: 'app-vistas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, Sidebar],
  templateUrl: './vistas.html',
  styleUrls: ['./vistas.css'],
  providers: [VistasService] // 🔹 Para Standalone Component
})
export class Vistas implements OnInit {

  mostrarSidebar = true;
  filtroTexto = '';

  proyectos: ProyectoConUsuario[] = [];
  proyectoAEliminar: ProyectoConUsuario | null = null;
  nuevoProyectoData: Proyecto = this.crearProyectoVacio();

  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;
  @ViewChild('modalTemplate', { read: TemplateRef }) modalTemplate!: TemplateRef<any>;

  @ViewChild('confirmContainer', { read: ViewContainerRef }) confirmContainer!: ViewContainerRef;
  @ViewChild('confirmTemplate', { read: TemplateRef }) confirmTemplate!: TemplateRef<any>;

  @ViewChild('mensajeContainer', { read: ViewContainerRef }) mensajeContainer!: ViewContainerRef;
  @ViewChild('mensajeTemplate', { read: TemplateRef }) mensajeTemplate!: TemplateRef<any>;

  constructor(private vistasService: VistasService) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.vistasService.getProyectos().subscribe({
      next: (res: ProyectoConUsuario[]) => {
        this.proyectos = res.map((p: ProyectoConUsuario) => this.normalizarProyecto(p));
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
      ? this.vistasService.editarProyecto(this.nuevoProyectoData.id, datos)
      : this.vistasService.crearProyecto(datos);

    peticion$.subscribe({
      next: (res: ProyectoConUsuario) => {
        const proyecto = this.normalizarProyecto(res);
        if (this.nuevoProyectoData.id) {
          const index = this.proyectos.findIndex(p => p.id === proyecto.id);
          if (index >= 0) this.proyectos[index] = proyecto;
          this.mostrarMensaje('Proyecto editado correctamente');
        } else {
          this.proyectos.push(proyecto);
          this.mostrarMensaje('Proyecto creado correctamente');
        }
        this.cerrarModal();
      },
      error: () => this.mostrarMensaje(this.nuevoProyectoData.id ? 'Error al editar' : 'Error al crear')
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

    this.vistasService.eliminarProyecto(this.proyectoAEliminar.id).subscribe({
      next: () => {
        this.proyectos = this.proyectos.filter(p => p.id !== this.proyectoAEliminar?.id);
        this.cancelarEliminar();
        this.mostrarMensaje('Proyecto eliminado');
      },
      error: () => this.mostrarMensaje('Error al eliminar')
    });
  }

  cancelarEliminar(): void {
    this.proyectoAEliminar = null;
    this.confirmContainer.clear();
  }

  abrirModal(): void {
    this.nuevoProyectoData = this.nuevoProyectoData.id ? this.nuevoProyectoData : this.crearProyectoVacio();
    this.modalContainer.clear();
    this.modalContainer.createEmbeddedView(this.modalTemplate);
  }

  cerrarModal(): void {
    this.nuevoProyectoData = this.crearProyectoVacio();
    this.modalContainer.clear();
  }

  crearProyectoVacio(): Proyecto {
    return { nombre: '', descripcion: '', creadoPorId: 'id-usuario-existente' };
  }

  normalizarProyecto(p: ProyectoConUsuario): ProyectoConUsuario {
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
