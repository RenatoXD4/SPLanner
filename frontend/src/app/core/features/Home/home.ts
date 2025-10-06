import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  currentSlide = 0;
  isRedirecting = false;

  constructor(private router: Router) {}

  // Función para redireccionar al login
  redirectToLogin(): void {

  this.router.navigate(['/login']);
    ;
  }

  // Métodos del carrusel
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % 4;
  }

  previousSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + 4) % 4;
  }
}
