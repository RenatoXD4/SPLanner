import { Routes } from '@angular/router';

export const VISTAS_ROUTE: Routes = [
  {
    path: '',
    loadComponent: () => import('./vistas').then(m => m.Vistas),
  }
];
