import { Routes } from "@angular/router";

export const vistas_routes: Routes = [
  {
    path: 'proyectos',
    loadComponent: () => import('./vistas').then(m => m.Vistas)
  }
];
