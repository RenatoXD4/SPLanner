import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vistas',
  standalone: true, // Indica que es un componente independiente
  imports: [CommonModule, FormsModule], // Importa lo necesario para ngIf, ngFor, ngClass y ngModel
  templateUrl: './vistas.html',
  styleUrls: ['./vistas.css'] // Corregido de styleUrl
})
export class Vistas {

  mostrarSidebar: boolean = true;
  mostrarModal: boolean = false;
  mostrarFiltro: boolean = false;
  mostrarAjustes: boolean = false;
  modalEditar: boolean = false;
  proyectoEditarIndex: number | null = null;

  filtroTexto: string = '';
  filtroEstado: string = 'Todos';
  filtroPrioridad: string = 'Todos';
  filtroEncargado: string = '';

  nuevoProyectoData = {
    nombre: '',
    descripcion: '',
    encargado: '',
    personas: 0,
    fechaInicio: '',
    fechaFin: '',
    prioridad: 'Media',
    estado: 'Sin iniciar'
  };

  proyectos: any[] = [
    {
      nombre: 'Proyecto A',
      descripcion: 'Proyecto A detallado.',
      encargado: 'Juan Pérez',
      personas: 4,
      fechaInicio: '2025-09-01',
      fechaFin: '2025-12-15',
      prioridad: 'Alta',
      estado: 'En progreso',
      destacado: true
    },
    {
      nombre: 'Proyecto B',
      descripcion: 'Proyecto B ejemplo.',
      encargado: 'María López',
      personas: 2,
      fechaInicio: '2025-09-05',
      fechaFin: '2025-11-10',
      prioridad: 'Media',
      estado: 'Sin iniciar',
      destacado: false
    }
  ];

  // Sidebar y menús
  toggleSidebar() {
    this.mostrarSidebar = !this.mostrarSidebar;
    if (!this.mostrarSidebar) this.mostrarAjustes = false;
  }

  toggleFiltro() {
    this.mostrarFiltro = !this.mostrarFiltro;
  }

  toggleAjustes() {
    this.mostrarAjustes = !this.mostrarAjustes;
  }

  // Modal
  abrirModal(editando: boolean = false, proyecto: any = null) {
    this.modalEditar = editando;
    if (editando && proyecto) {
      this.nuevoProyectoData = { ...proyecto };
      this.proyectoEditarIndex = this.proyectos.indexOf(proyecto);
    } else {
      this.resetProyectoData();
      this.proyectoEditarIndex = null;
    }
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.resetProyectoData();
    this.proyectoEditarIndex = null;
    this.modalEditar = false;
  }

  resetProyectoData() {
    this.nuevoProyectoData = {
      nombre: '',
      descripcion: '',
      encargado: '',
      personas: 0,
      fechaInicio: '',
      fechaFin: '',
      prioridad: 'Media',
      estado: 'Sin iniciar'
    };
  }

  // Guardar proyecto
  agregarProyecto() {
    if (!this.nuevoProyectoData.nombre.trim()) return;

    if (this.modalEditar && this.proyectoEditarIndex !== null) {
      this.proyectos[this.proyectoEditarIndex] = {
        ...this.nuevoProyectoData,
        destacado: this.proyectos[this.proyectoEditarIndex].destacado
      };
    } else {
      this.proyectos.push({ ...this.nuevoProyectoData, destacado: false });
    }

    this.cerrarModal();
  }

  // Editar proyecto
  editarProyecto(proyecto: any) {
    this.abrirModal(true, proyecto);
  }

  // Eliminar proyecto
  eliminarProyecto(proyecto: any) {
    const confirmacion = window.confirm(`¿Estás seguro de eliminar el proyecto "${proyecto.nombre}"?`);
    if (confirmacion) {
      const index = this.proyectos.indexOf(proyecto);
      if (index > -1) this.proyectos.splice(index, 1);
    }
  }

  // Destacar proyecto
  toggleDestacado(proyecto: any) {
    proyecto.destacado = !proyecto.destacado;
  }

  // Filtrado
  proyectosFiltrados() {
    return this.proyectos.filter(p =>
      (this.filtroEstado === 'Todos' || p.estado === this.filtroEstado) &&
      (this.filtroPrioridad === 'Todos' || p.prioridad === this.filtroPrioridad) &&
      (!this.filtroTexto || p.nombre.toLowerCase().includes(this.filtroTexto.toLowerCase())) &&
      (!this.filtroEncargado || p.encargado.toLowerCase().includes(this.filtroEncargado.toLowerCase()))
    );
  }

  proyectosDestacados() {
    return this.proyectos.filter(p => p.destacado);
  }
}
