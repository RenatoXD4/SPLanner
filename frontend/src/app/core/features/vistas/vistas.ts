import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface Proyecto {
  id?: string;
  nombre: string;
  descripcion?: string;
  creadoPorId: string;
}

@Component({
  selector: 'app-vistas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './vistas.html',
  styleUrls: ['./vistas.css']
})
export class Vistas implements OnInit {

  mostrarSidebar = true;
  mostrarModal = false;
  mostrarFiltro = false;
  mostrarAjustes = false;
  modalEditar = false;

  filtroTexto = '';

  nuevoProyectoData: Proyecto = this.resetProyecto();
  proyectos: Proyecto[] = [];

  private apiUrl = 'http://localhost:9001/api-v1/projects';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarProyectos();
  }

  // ===================== BACKEND =====================
  private cargarProyectos() {
    this.http.get<Proyecto[]>(this.apiUrl).subscribe({
      next: (res) => this.proyectos = res,
      error: (err) => {
        console.error('Error al cargar proyectos:', err);
        alert('Error al cargar los proyectos. Verifica que el servidor esté corriendo.');
      }
    });
  }

  guardarProyecto() {
    if (!this.nuevoProyectoData.nombre.trim()) {
      alert('El nombre del proyecto es obligatorio');
      return;
    }

    // Envía datos al backend según tu esquema de Prisma
    const datosParaEnviar = {
      nombre: this.nuevoProyectoData.nombre.trim(),
      descripcion: this.nuevoProyectoData.descripcion || '',
      creadoPorId: this.nuevoProyectoData.creadoPorId // DEBE EXISTIR EN LA TABLA Usuario
    };

    if (this.modalEditar && this.nuevoProyectoData.id) {
      // EDITAR proyecto
      this.http.patch<Proyecto>(`${this.apiUrl}/${this.nuevoProyectoData.id}`, datosParaEnviar).subscribe({
        next: (res) => {
          this.proyectos = this.proyectos.map(p => p.id === res.id ? res : p);
          this.cerrarModal();
          alert('Proyecto actualizado correctamente');
        },
        error: (err) => {
          console.error('Error al editar proyecto:', err);
          alert('Error al editar el proyecto. Revisa la consola.');
        }
      });
    } else {
      // CREAR proyecto
      this.http.post<Proyecto>(this.apiUrl, datosParaEnviar).subscribe({
        next: (res) => {
          this.proyectos = [...this.proyectos, res];
          this.cerrarModal();
          alert('Proyecto creado correctamente');
        },
        error: (err) => {
          console.error('Error al crear proyecto:', err);
          alert('Error al crear el proyecto. Verifica que "creadoPorId" exista en Usuarios.');
        }
      });
    }
  }

  editarProyecto(proyecto: Proyecto) {
    this.modalEditar = true;
    this.mostrarModal = true;
    this.nuevoProyectoData = { ...proyecto };
  }

  eliminarProyecto(proyecto: Proyecto) {
    if (!proyecto.id) return;
    if (!confirm(`¿Seguro que quieres eliminar "${proyecto.nombre}"?`)) return;

    this.http.delete(`${this.apiUrl}/${proyecto.id}`).subscribe({
      next: () => this.proyectos = this.proyectos.filter(p => p.id !== proyecto.id),
      error: (err) => {
        console.error('Error al eliminar proyecto:', err);
        alert('Error al eliminar el proyecto.');
      }
    });
  }

  // ===================== UI =====================
  toggleSidebar() { 
    this.mostrarSidebar = !this.mostrarSidebar; 
    if (!this.mostrarSidebar) this.mostrarAjustes = false; 
  }
  
  toggleFiltro() { this.mostrarFiltro = !this.mostrarFiltro; }
  
  toggleAjustes() { this.mostrarAjustes = !this.mostrarAjustes; }

  abrirModal() {
    this.modalEditar = false;
    this.nuevoProyectoData = this.resetProyecto();
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoProyectoData = this.resetProyecto();
    this.modalEditar = false;
  }

  private resetProyecto(): Proyecto {
    return {
      nombre: '',
      descripcion: '',
      creadoPorId: 'id-usuario-existente' // <--- reemplaza por un usuario real de la tabla Usuario
    };
  }

  // ===================== FILTROS =====================
  get proyectosFiltrados(): Proyecto[] {
    return this.proyectos.filter(p =>
      (!this.filtroTexto || p.nombre.toLowerCase().includes(this.filtroTexto.toLowerCase()))
    );
  }
}
