import { Injectable, Inject, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../Environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TemaService } from './tema.service'; // ← Agregar esta importación

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
  private temaService = inject(TemaService); // ← Inyectar TemaService

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

  get currentUser$() {
    return this.currentUserSubject.asObservable();
  }

  // Cargar usuario al iniciar
  private loadUserFromStorage() {
    if (!this.isBrowser) return;

    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        this.currentUserSubject.next(user);
        
        // ← AGREGAR: Cargar tema del usuario al iniciar
        const userId = this.getUserIdFromUser(user);
        if (userId) {
          this.temaService.setCurrentUser(userId);
        }
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    }
  }

  // --- AUTENTICACIÓN ---

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/usuarios/login`, credentials)
      .pipe(
        tap(response => {
          this.setUser(response.user);
          if (response.token) this.setToken(response.token);
          
          // ← AGREGAR: Establecer tema del usuario después del login
          const userId = this.getUserIdFromUser(response.user);
          if (userId) {
            this.temaService.setCurrentUser(userId);
          }
          
          if (this.isBrowser) this.router.navigate(['/Menu']);
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
          if (response.token) this.setToken(response.token);
          
          // ← AGREGAR: Establecer tema del usuario después del registro
          const userId = this.getUserIdFromUser(response.user);
          if (userId) {
            this.temaService.setCurrentUser(userId);
          }
          
          if (this.isBrowser) this.router.navigate(['/Menu']);
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

      if (userData && typeof userData === 'object' && userData.id) {
        const processedUser = this.processGoogleUser(userData);
        this.setUser(processedUser);
        this.setToken(token);
        
        // ← AGREGAR: Establecer tema del usuario Google
        const userId = this.getUserIdFromUser(processedUser);
        if (userId) {
          this.temaService.setCurrentUser(userId);
        }
        
        setTimeout(() => this.router.navigate(['/Menu']), 100);
      } else {
        this.setToken(token);
        this.fetchUserFromBackend(token);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  private processGoogleUser(googleUser: any): any {
    return {
      id: googleUser.id || googleUser.sub || this.generateTempId(),
      nombre: googleUser.nombre || googleUser.given_name || googleUser.name || 'Usuario',
      apellido: googleUser.apellido || googleUser.family_name || '',
      email: googleUser.email,
      createdAt: googleUser.createdAt || new Date().toISOString(),
      isGoogleUser: true
    };
  }

  private fetchUserFromBackend(token: string): void {
    const tempUser = {
      id: this.generateTempId(),
      nombre: 'Usuario Google',
      apellido: '',
      email: 'google@user.com',
      createdAt: new Date().toISOString(),
      isTemp: true
    };

    this.setUser(tempUser);

    this.http.get<any>(`${this.API_URL}/usuarios/me`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (realUserData) => {
        this.setUser(realUserData);
        
        // ← AGREGAR: Establecer tema del usuario real
        const userId = this.getUserIdFromUser(realUserData);
        if (userId) {
          this.temaService.setCurrentUser(userId);
        }
      },
      error: () => {
        setTimeout(() => this.router.navigate(['/Menu']), 100);
      }
    });
  }

  private generateTempId(): string {
    return 'google-temp-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  // --- MÉTODOS DE USUARIO ---

  setUser(user: any): void {
    if (!this.isBrowser || !user) return;

    try {
      localStorage.setItem('userData', JSON.stringify(user));
      this.currentUserSubject.next(user);
    } catch (error) {
      console.error('Error guardando usuario:', error);
    }
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  getCurrentUserId(): string | null {
    const user = this.getCurrentUser();
    return this.getUserIdFromUser(user);
  }

  // ← AGREGAR: Método auxiliar para extraer ID del usuario
  private getUserIdFromUser(user: any): string | null {
    if (!user) return null;
    const userId = user.id || user.userId || user.sub;
    return userId ? userId.toString() : null;
  }

  // --- TOKEN ---

  setToken(token: string): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    try {
      return localStorage.getItem('authToken');
    } catch {
      return null;
    }
  }

  // --- LOGOUT ---

  logout(): void {
    if (!this.isBrowser) return;

    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      this.currentUserSubject.next(null);
      
      // ← AGREGAR: Limpiar tema del usuario al cerrar sesión
      this.temaService.setCurrentUser(null);
      
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // --- ESTADO DE AUTENTICACIÓN ---

  isAuthenticated(): boolean {
    const hasToken = !!this.getToken();
    const hasUser = !!this.getCurrentUser();

    console.log('Verificando autenticación:', {
      hasToken,
      hasUser,
      token: hasToken ? 'ok' : 'error',
      user: hasUser ? 'ok' : 'error'
    });

    return hasToken && hasUser;
  }

  checkAuthentication(): boolean {
    if (!this.isBrowser) return true;

    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  isGoogleUser(): boolean {
    const user = this.getCurrentUser();
    return !!(user && user.isGoogleUser);
  }

  isTempUser(): boolean {
    const user = this.getCurrentUser();
    return !!(user && user.isTemp);
  }
}