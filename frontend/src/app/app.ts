import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './core/features/Home/home';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterOutlet, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
