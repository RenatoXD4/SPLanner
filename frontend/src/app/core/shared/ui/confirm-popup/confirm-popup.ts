import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confirm-popup',
  imports: [],
  standalone: true,
  templateUrl: './confirm-popup.html',
  styleUrl: './confirm-popup.css'
})
export class ConfirmPopup implements OnChanges, AfterViewInit {

  @Input() isOpen = false;
  @Input() title = 'Confirmar eliminación';
  @Input() message = '¿Estás seguro de realizar esta acción?';
  @Input() confirmText = 'Eliminar';
  @Input() cancelText = 'Cancelar';

  @Output() confirm = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  @ViewChild('myDialog') dialogRef!: ElementRef<HTMLDialogElement>;


  ngAfterViewInit() {
    if (this.isOpen && this.dialogRef?.nativeElement && !this.dialogRef.nativeElement.open) {
      this.dialogRef.nativeElement.showModal();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.dialogRef) {
      if (this.isOpen) {
        //Mostrar el modal siempre al centro ignorando todos los componentes padre y estilos pasando al top-layer del navegador.
        this.dialogRef.nativeElement.showModal(); 
      } else {
        this.dialogRef.nativeElement.close();
      }
    }
  }

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.close.emit();
  }
  
}
