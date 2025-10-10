import { Routes } from '@angular/router';
import { Board } from './components/board/board';

// Este archivo define las rutas para /board/*
export const KANBAN_ROUTES: Routes = [
  { path: 'board', component: Board }, // /board
];