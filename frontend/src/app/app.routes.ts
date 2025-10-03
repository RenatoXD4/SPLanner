import { HOME_ROUTES } from './core/features/Home/home.routes';
import { Routes } from '@angular/router';
import { Home } from './core/features/Home/home';
import { Recuperar } from './core/features/auth/recuperar/recuperar';
import { Board } from './core/features/kanban/components/board/board';
import { Registro } from './core/features/auth/registro/registro';
import { Login } from './core/features/auth/login/login';

export const routes: Routes = [


  { path: '', component: Home },
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

];

