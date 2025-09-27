import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-registro',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  userForm: FormGroup;
  email: FormControl;
  password: FormControl;
  name: FormControl;
  apellido: FormControl

constructor() {

    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.name = new FormControl('');
    this.apellido = new FormControl(''),

    this.userForm = new FormGroup({
      email: this.email,
      password: this.password,
      name: this.name,
      apellido: this.apellido
    });
  }
    handleSubmit(): void {
    if (this.userForm.valid) {
      console.log('Formulario válido:', this.userForm.value);

    } else {
      console.log('Formulario inválido');
    }
  }
}
