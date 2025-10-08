// kanban.ts

import { Component, OnInit } from '@angular/core';
import { KanvanServ, Task, Estado } from '../services/kanvan-serv';

@Component({
  selector: 'app-kanvan',
  imports: [],
  templateUrl: './kanvan.html',
  styleUrl: './kanvan.css'
})
export class Kanvan implements OnInit {

  tareas: Task[] = [];
  estadosDisponibles: Estado[] = [];

  nuevoTitulo: string = '';
  nuevoEstadoId: number = 1; // Se inicializa luego
  proyectoIdFijo: string = '1fc2cb1f-7580-47dd-b28e-49f139dbfb44'; // Tu proyecto real

  constructor(private kanvanServ: KanvanServ) { }

  ngOnInit() {
    this.cargarTareas();
    this.cargarEstados();
  }



  cargarTareas() {
    this.kanvanServ.getTareas().subscribe({
      next: (data) => this.tareas = data,
      error: (err) => console.error('Error cargando tareas:', err)
    });
  }

  cargarEstados() {
    this.kanvanServ.getEstadosDelProyecto(this.proyectoIdFijo).subscribe({
      next: (estados) => {
        this.estadosDisponibles = estados;
        if (this.estadosDisponibles.length > 0) {
          this.nuevoEstadoId = this.estadosDisponibles[0].id;
        }
      },
      error: (err) => {
        console.error('Error cargando estados:', err);
        this.estadosDisponibles = [];
      }
    });
  }

  crearTarea() {
    if (!this.nuevoTitulo.trim()) {
      console.warn('El título es obligatorio');
      return;
    }

    const nuevaTarea: Partial<Task> = {
      titulo: this.nuevoTitulo,
      estadoId: this.nuevoEstadoId,
      posicion: this.tareas.length,
      proyectoId: this.proyectoIdFijo,
      fechaLimite: new Date().toISOString()
    };

    this.kanvanServ.createTask(nuevaTarea).subscribe({
      next: (tarea) => {
        this.tareas.push(tarea);
        this.nuevoTitulo = '';
        this.nuevoEstadoId = this.estadosDisponibles.length > 0 ? this.estadosDisponibles[0].id : 1;
      },
      error: (err) => console.error('Error al crear tarea:', err)
    });
  }

  eliminarTarea(id: string) {
    this.kanvanServ.deleteTask(id).subscribe({
      next: () => {
        console.log('Tarea eliminada');
        this.tareas = this.tareas.filter(t => t.id !== id);
      },
      error: (err) => console.error('Error al eliminar tarea:', err)
    });
  }

  // Variable para la tarea que está en edición
  tareaSeleccionada: Task | null = null;

  onEstadoChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.nuevoEstadoId = +value;
  }

  onEstadoChangeEdit(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (this.tareaSeleccionada) {
      this.tareaSeleccionada.estadoId = +value;
    }
  }



  // Dentro de tu clase Kanvan

  actualizarTarea(tarea: Task) {
    this.tareaSeleccionada = { ...tarea };
  }

  guardarCambios() {
    console.log('guardarCambios invoked, tareaSeleccionada =', this.tareaSeleccionada);
    if (!this.tareaSeleccionada) {
      console.warn('No hay tarea seleccionada, abortando guardar');
      return;
    }

    const tareaEditada = this.tareaSeleccionada;

    const datosActualizados: Partial<Task> = {
      titulo: tareaEditada.titulo,
      estadoId: tareaEditada.estadoId
    };

    this.kanvanServ.updateTask(tareaEditada.id, datosActualizados).subscribe({
      next: (tareaActualizada) => {
        console.log('Respuesta updateTask:', tareaActualizada);

        const index = this.tareas.findIndex(t => t.id === tareaActualizada.id);
        if (index !== -1) {
          this.tareas[index] = tareaActualizada;
        } else {
          console.warn('No se encontró la tarea en el arreglo para actualizarla');
        }

        this.cancelarEdicion();
      },
      error: (err) => {
        console.error('Error al actualizar tarea:', err);
      }
    });
  }


  cancelarEdicion() {
    console.log('cancelarEdicion invoked');
    this.tareaSeleccionada = null;
    console.log('tareaSeleccionada after null:', this.tareaSeleccionada);
  }




}
