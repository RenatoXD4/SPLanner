import { Routes } from '@angular/router';
import { Kanvan } from './kanvan/kanvan';

// Este archivo define las rutas para /board/*
export const KANBVAN_ROUTES: Routes = [
  { path: '', component: Kanvan }, // /board
  { path: ':id', component: Kanvan }, // /board/123
];