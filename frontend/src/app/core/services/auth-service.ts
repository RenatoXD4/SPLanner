import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../Environments/environment';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

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
  private currentUserSubject = new BehaviorSubject<any>(null);
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      this.loadUserFromStorage();
    }
  }

  private loadUserFromStorage() {
    if (!this.isBrowser) return;

    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        this.currentUserSubject.next(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    }
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/usuarios/login`, credentials)
      .pipe(
        tap(response => {
          this.setUser(response.user);
          if (response.token) {
            this.setToken(response.token);
          }
          if (this.isBrowser) {
            this.router.navigate(['/Menu']);
          }
        }),
        catchError(error => {
          console.error('Error en login:', error);
          return throwError(() => error);
        })
      );
  }

  register(userData: RegisterData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/usuarios/register`, userData)
      .pipe(
        tap(response => {

          this.setUser(response.user);
          if (response.token) {
            this.setToken(response.token);
          }
          if (this.isBrowser) {
            this.router.navigate(['/Menu']);
          }
        }),
        catchError(error => {
          console.error('Error en registro:', error);
          return throwError(() => error);
        })
      );
  }

  loginWithGoogle(): void {
    if (this.isBrowser) {
      window.location.href = `${this.API_URL}/usuarios/auth/google`;
    }
  }

  handleGoogleCallback(token: string, userData?: any): void {
    if (token && this.isBrowser) {
      console.log('Procesando callback de Google...');

      // Validar que userData sea un objeto válido
      if (userData && typeof userData === 'object' && userData.id) {


        // Asegurar que el usuario tenga la estructura correcta
        const processedUser = this.processGoogleUser(userData);

        // Guardar primero el usuario, luego el token
        this.setUser(processedUser);
        this.setToken(token);



        // Redirigir después de un pequeño delay para asegurar que se guardó
        setTimeout(() => {
          this.router.navigate(['/Menu']);
        }, 100);

      } else {

        // Si no hay userData válido, usar el flujo con token
        this.setToken(token);
        this.fetchUserFromBackend(token);
      }
    } else {

      this.router.navigate(['/login']);
    }
  }

  // Método para procesar y estandarizar el usuario de Google
  private processGoogleUser(googleUser: any): any {


    // Mapear campos de Google a tu estructura de usuario
    const processedUser = {
      id: googleUser.id || googleUser.sub || this.generateTempId(),
      nombre: googleUser.nombre || googleUser.given_name || googleUser.name || 'Usuario',
      apellido: googleUser.apellido || googleUser.family_name || '',
      email: googleUser.email,
      createdAt: googleUser.createdAt || new Date().toISOString(),
      isGoogleUser: true // Marcar como usuario de Google
    };


    return processedUser;
  }

  // Método para crear usuario temporal cuando Google no envía datos
  private fetchUserFromBackend(token: string): void {

    const tempUser = {
      id: this.generateTempId(),
      nombre: 'Usuario Google',
      apellido: '',
      email: 'google@user.com',
      createdAt: new Date().toISOString(),
      isTemp: true // Marcar como temporal
    };

    this.setUser(tempUser);


    // Intentar obtener datos reales del backend
    this.http.get<any>(`${this.API_URL}/usuarios/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (realUserData) => {
        // Reemplazar el usuario temporal con el real
        this.setUser(realUserData);
      },
      error: (error) => {

        // Mantener el usuario temporal pero redirigir
        setTimeout(() => {
          this.router.navigate(['/Menu']);
        }, 100);
      }
    });
  }

  // Generar ID temporal único
  private generateTempId(): string {
    return 'google-temp-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  private setUser(user: any): void {
    if (!this.isBrowser) return;

    try {
      // Validación más flexible para usuarios de Google
      if (!user) {
        return;
      }

      // Para usuarios de Google, podemos ser más flexibles con la validación
      const isValidUser = user.id && user.email;

      if (!isValidUser) {
        console.warn('Usuario con estructura no estándar, pero intentando guardar:', user);
        // Pero intentamos guardarlo de todos modos para usuarios de Google
      }

      localStorage.setItem('userData', JSON.stringify(user));
      this.currentUserSubject.next(user);
    } catch (error) {
    }
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getCurrentUserId(): string | null {
    const user = this.getCurrentUser();

    if (!user) {
      return null;
    }

    // Buscar el ID en diferentes propiedades posibles
    const userId = user.id || user.userId || user.sub;

    if (!userId) {
      return null;
    }

    const userIdString = userId.toString();
    return userIdString;
  }

  setToken(token: string): void {
    if (!this.isBrowser) return;

    try {
      localStorage.setItem('authToken', token);

    } catch (error) {
      console.error('Error saving token to storage:', error);
    }
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;

    try {
      const token = localStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error('Error getting token from storage:', error);
      return null;
    }
  }

  logout(): void {
    if (!this.isBrowser) return;

    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    } catch (error) {
    }
  }

  isAuthenticated(): boolean {
    const hasToken = !!this.getToken();
    const hasUser = !!this.getCurrentUser();

    console.log('Verificando autenticación:', {
      hasToken,
      hasUser,
      token: this.getToken() ? 'ok' : 'error',
      user: this.getCurrentUser() ? 'ok' : 'error'
    });

    return hasToken && hasUser;
  }

  checkAuthentication(): boolean {


    if (!this.isBrowser) {

      return true;
    }

    const isAuthenticated = this.isAuthenticated();

    if (!isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }


    return true;
  }



  // Método para verificar si el usuario actual es de Google
  isGoogleUser(): boolean {
    const user = this.getCurrentUser();
    return !!(user && user.isGoogleUser);
  }

  // Método para verificar si es usuario temporal
  isTempUser(): boolean {
    const user = this.getCurrentUser();
    return !!(user && user.isTemp);
  }
}
