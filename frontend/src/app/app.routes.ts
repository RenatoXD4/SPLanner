
import { Routes } from '@angular/router';
import { Home } from './core/features/Home/home';
import { GoogleCallbackComponent } from './core/services/Api/google-callback.component';

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
  { path: 'auth/google/callback', component: GoogleCallbackComponent },


];

