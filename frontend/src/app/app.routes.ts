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
  path: 'kanvan',
     loadChildren: () => import('./core/features/kanvan/kanvan.routes').then( m => m.KANBVAN_ROUTES),
  }
];
