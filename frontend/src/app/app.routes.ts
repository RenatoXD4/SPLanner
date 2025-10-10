import { Routes } from '@angular/router';
import { GoogleCallbackComponent } from './core/services/Api/google-callback.component';

export const routes: Routes = [
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
  { path: 'auth/google/callback', component: GoogleCallbackComponent },

];

