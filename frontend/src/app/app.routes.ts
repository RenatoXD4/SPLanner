import { Routes } from '@angular/router';
import { Home } from './core/features/Home/home';
import { Recuperar } from './core/features/auth/recuperar/recuperar';
import { Board } from './core/features/kanban/components/board/board';
import { Registro } from './core/features/auth/registro/registro';
import { Login } from './core/features/auth/login/login';

export const routes: Routes = [
  { path: '', component: Home }, // Página principal
  { path: 'home', component: Home },
  { path: 'login',  component: Login },
  { path : 'recuperar', component: Recuperar},
  { path: 'registro',  component: Registro },
  { path: 'board', component: Board },

];
