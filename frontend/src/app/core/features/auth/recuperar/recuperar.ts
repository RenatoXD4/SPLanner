import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,  FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
;

@Component({
  selector: 'app-recuperar',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './recuperar.html',
  styleUrl: './recuperar.css'
})
export class Recuperar {
  userForm: FormGroup;
  email: FormControl;
  password: FormControl;

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
constructor() {

    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.userForm = new FormGroup({
      email: this.email,
      password: this.password
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
