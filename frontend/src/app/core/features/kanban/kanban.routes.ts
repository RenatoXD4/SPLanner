import { Routes } from '@angular/router';
import { Board } from './components/board/board';

// Este archivo define las rutas para /board/*
export const KANBAN_ROUTES: Routes = [
  { path: '', component: Board }, // /board
  { path: '', component: Board }, // /board/123
];