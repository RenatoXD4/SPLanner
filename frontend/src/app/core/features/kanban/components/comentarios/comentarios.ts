import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CommentService } from '../../services/comment-service';
import { AuthService } from '../../../../services/auth-service';
import { Comentario } from '../../types/comment-interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmPopup } from "../../../../shared/ui/confirm-popup/confirm-popup";

@Component({
  selector: 'app-comentarios',
  imports: [CommonModule, FormsModule, ConfirmPopup],
  templateUrl: './comentarios.html',
  styleUrl: './comentarios.css'
})
export class Comentarios {

  @Input({ required: true }) tareaId!: string;
  
  private commentService = inject(CommentService);
  private authService = inject(AuthService);

  // Signals o variables normales
  public comments = signal<Comentario[]>([]);
  public isLoading = signal<boolean>(false);
  public currentUserId: string = '';
  public isExpanded = signal<boolean>(false);

  public isDeleteModalOpen = false;
  private commentIdToDelete: number | null = null;


  // Inputs del formulario
  public newCommentText: string = '';
  public editingCommentId: number | null = null;
  public editCommentText: string = '';

  ngOnInit() {
    this.currentUserId = this.authService.getCurrentUserId() ?? '';
    if (this.tareaId) {
      this.loadComments();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si cambia el id de la tarea mientras el editor de texto está abierto
    if (changes['tareaId'] && !changes['tareaId'].firstChange) {
      this.loadComments();
    }
  }

  async loadComments() {
    //Borrar los comentarios anteriores
    this.comments.set([]);

    this.isLoading.set(true);
    try {
      if (!this.tareaId) return;

      const data = await firstValueFrom(this.commentService.getComments(this.tareaId));
      this.comments.set(data);
    } catch (error) {
      console.error('Error cargando comentarios', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  toggleSection() {
    this.isExpanded.update(value => !value);
  }

  // Enviar comentario nuevo
  async submitComment() {
    if (!this.newCommentText.trim()) return;

    try {
      const comentario = await firstValueFrom(
        this.commentService.createComment(this.tareaId, this.currentUserId, this.newCommentText)
      );
      
      // Agregamos al inicio de la lista
      this.comments.update(prev => [comentario, ...prev]);
      this.newCommentText = ''; // Limpiar input del formulario
      this.isExpanded.set(true);
    } catch (error) {
      console.error('Error creando comentario', error);
    }
  }

  // Manejar tecla ENTER en el textarea
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Evitar salto de línea
      this.submitComment();
    }
  }

  // --- Lógica de Edición ---

  startEdit(comment: Comentario) {
    this.editingCommentId = comment.id;
    this.editCommentText = comment.contenido;
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.editCommentText = '';
  }

  async saveEdit() {
    if (!this.editingCommentId || !this.editCommentText.trim()) return;

    try {
      const updated = await firstValueFrom(
        this.commentService.updateComment(this.editingCommentId, this.currentUserId, this.editCommentText)
      );

      // Actualizar la lista localmente
      this.comments.update(prev => 
        prev.map(c => c.id === this.editingCommentId ? { ...c, contenido: updated.contenido } : c)
      );
      
      this.cancelEdit();
    } catch (error) {
      console.error('Error editando', error);
    }
  }

  // --- Lógica de Eliminación ---

  async deleteComment(id: number) {

    try {
      await firstValueFrom(this.commentService.deleteComment(id, this.currentUserId));
      this.comments.update(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error eliminando', error);
    }
  }

  requestDelete(commentId: number) {
    this.commentIdToDelete = commentId; // Guardamos el ID
    this.isDeleteModalOpen = true;      // Abrimos el modal
  }

  confirmDelete() {
    if (this.commentIdToDelete) {
      // Llamar a lógica de borrar comentario
      this.deleteComment(this.commentIdToDelete); 
    }
    this.closeDeleteModal();
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
    this.commentIdToDelete = null; // Limpiamos la referencia
  }
  
  // Helper para iniciales del avatar
  getInitials(nombre: string, apellido: string): string {
    return (nombre.charAt(0) + apellido.charAt(0)).toUpperCase();
  }
}
