import { Routes } from '@angular/router';
import { Vistas } from './core/features/vistas/vistas';

export const APP_ROUTES: Routes = [
  {
    path: 'board',
    loadChildren: () => import('./core/features/kanban/kanban.routes').then(m => m.KANBAN_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./core/features/auth/auth.routes').then(m => m.AUTH_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./core/features/vistas/vistas.routes').then(m => m.VISTAS_ROUTE),
  },
  // Puedes agregar rutas adicionales aquí
];
//ruta