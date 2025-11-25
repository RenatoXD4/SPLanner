// src/app/core/shared/ui/tema/tema.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemaService } from '../../../services/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.html',
  styleUrls: ['./tema.css'],
  imports: [CommonModule] // ← Agregar esta línea
})
export class TemaComponent {
  private temaService = inject(TemaService);
  
  isDark = this.temaService.isDark;
  isAnimating = signal(false);

  toggleTheme() {
    this.isAnimating.set(true);
    this.temaService.toggleTheme();
    
    setTimeout(() => {
      this.isAnimating.set(false);
    }, 300);
  }

  get themeText(): string {
    return this.isDark() ? 'Modo Claro' : 'Modo Oscuro';
  }

  get themeAriaLabel(): string {
    return `Cambiar a ${this.themeText}`;
  }
}