import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-button',
  imports: [],
  templateUrl: './form-button.html',
  styleUrl: './form-button.css'
})

export class FormButton {
  @Output() buttonClick = new EventEmitter<void>();
  @Input() text: string = ''; // Nueva propiedad para el texto del botón
  @Input() disabled: boolean = false; // Propiedad para el estado deshabilitado

  onClick() {
    this.buttonClick.emit();
  }

}

