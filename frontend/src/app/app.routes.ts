import { Routes } from '@angular/router';
import { GoogleCallbackComponent } from './core/services/Api/google-callback.component';
import { NotFound } from './core/features/not-found/not-found';
import { Dashboard } from './core/features/vistas/dashboard/dashboard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import("./core/features/Home/home.routes").then((m) => m.HOME_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import("./core/features/kanban/kanban.routes").then((m) => m.KANBAN_ROUTES),
  },
  {
  path: '',
     loadChildren: () => import('./core/features/auth/auth.routes').then( m => m.AUTH_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import("./core/features/menu-principal/Menu.routes").then((m) => m.MENU_ROUTES),
  },
  {
    path: '',
    loadChildren: () => import('./core/features/vistas/vistas.routes').then(m => m.VISTAS_ROUTE),
  },
  { path: 'auth/google/callback', component: GoogleCallbackComponent },
 {
  path: 'dashboard/:id',
    component: Dashboard
  },


{
   //404
    path: '**',
    component: NotFound
  }
];

