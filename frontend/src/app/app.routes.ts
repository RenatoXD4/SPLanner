import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'board',
    loadChildren: () => import("./core/features/kanban/kanban.routes").then((m) => m.KANBAN_ROUTES),
  },
   {
  path: '',
     loadChildren: () => import('./core/features/auth/auth.routes').then( m => m.AUTH_ROUTES),
  },
 {
  path: '',
     loadChildren: () => import('./core/features/auth/auth.routes').then( m => m.AUTH_ROUTES),
  },
  {
  path: '',
     loadChildren: () => import('./core/features/auth/auth.routes').then( m => m.AUTH_ROUTES),
  },
    {
  path: '',
     loadChildren: () => import('./core/features/vistas/vistas.routes').then( m => m.vistas_routes),
  },
  
];
