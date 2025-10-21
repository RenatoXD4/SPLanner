import { Routes } from '@angular/router';
import { Vistas } from './vistas';
import { Miembros } from './miembros/miembros';
import { AuthGuard } from '../../../guards/auth.guard';

export const VISTAS_ROUTE: Routes = [
  {
    path: 'proyectos',
    component: Vistas,
    canActivate: [AuthGuard]
  },
  {
    path: 'miembros',
    component:  Miembros,
    canActivate: [AuthGuard]
  }
];
