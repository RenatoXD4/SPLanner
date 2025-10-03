import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
  };
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/usuarios/login`, credentials);
  }

  register(userData: RegisterData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/usuarios/register`, userData);
  }

  // CORRECCIÓN: Usar la ruta correcta
  loginWithGoogle(): void {
    window.location.href = `${this.API_URL}/usuarios/auth/google`;
  }

  // Manejar callback de Google
  handleGoogleCallback(token: string): void {
    if (token) {
      this.setToken(token);
      window.location.href = '/board';
    }
  }

  // Métodos existentes de gestión de token
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
