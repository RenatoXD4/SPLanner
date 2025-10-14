import { Routes } from '@angular/router';
import { Vistas } from './vistas';
import { AuthGuard } from '../../../guards/auth.guard';

export const VISTAS_ROUTE: Routes = [
  {
      path: 'proyectos',
      component: Vistas,
      canActivate: [AuthGuard]//Se protege la ruta para que solo gente logeada entre
    }
];
