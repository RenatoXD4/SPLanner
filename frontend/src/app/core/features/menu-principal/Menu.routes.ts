// src/app/core/features/menu-principal/Menu.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from '../../../guards/auth.guard';
import { MenuPrincipal } from './menu-principal';

export const MENU_ROUTES: Routes = [
  {
    path: 'Menu',
    component: MenuPrincipal,
    canActivate: [AuthGuard]//Se protege la ruta para que solo gente logeada entre
  }
];
