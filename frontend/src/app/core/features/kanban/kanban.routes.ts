import { AuthGuard } from './../../../guards/auth.guard';
import { Routes } from '@angular/router';
import { Board } from './components/board/board';
import { ProyectoGuard } from '../../../guards/proyecto.guard';

// Este archivo define las rutas para /board/*
export const KANBAN_ROUTES: Routes = [
  { path: 'board', component: Board,
  canActivate: [AuthGuard, ProyectoGuard] // Múltiples guards
 }
];
