import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'board',
    loadChildren: () => import("./core/features/kanban/kanban.routes").then((m) => m.KANBAN_ROUTES),
  },
   {
  path: 'login',
     loadChildren: () => import('./core/features/auth/auth.routes').then( m => m.AUTH_ROUTES),
  },
 {
  path: 'registro',
     loadChildren: () => import('./core/features/auth/auth.routes').then( m => m.r),
  },
  {
  path: 'recuperarContraseña',
     loadChildren: () => import('./core/features/auth/auth.routes').then( m => m.recuperar),
  },
];
