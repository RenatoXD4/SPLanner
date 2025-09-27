import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'

})
export class Login {
  userForm: FormGroup;
  email: FormControl;
  password: FormControl;

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
