import { Component } from '@angular/core';
import { Routes} from '@angular/router';
import { Login } from './login/login';
import { Registro } from './registro/registro';
import { Recuperar } from './recuperar/recuperar';

// Este archivo define las rutas para /board/*
export const AUTH_ROUTES: Routes = [
  { path: 'login',  component: Login },
  { path : 'recuperar', component: Recuperar},
  { path: 'registro',  component: Registro },


];

