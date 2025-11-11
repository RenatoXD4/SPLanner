import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Sidebar } from '../../shared/ui/sidebar/sidebar';
import { DashboardService, DashboardApiResponse} from '../vistas/service/dashboard.service';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
  completionPercentage: number;
  userPendingTasks: number;
  userResponsibleTasks: number;
}

export interface RecentProject {
  id: string;
  nombre: string;
  descripcion: string | null;
  totalTareas: number;
  tareasCompletadas: number;
  createdAt: string;
  porcentajeCompletado: number;
}

export interface UserInfo {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  createdAt: string;
}

export interface DashboardData {
  userInfo: UserInfo;
  stats: DashboardStats;
  recentProjects: RecentProject[];
}

interface UpdateProfileRequest {
  nombre?: string;
  apellido?: string;
  currentPassword?: string;
  newPassword?: string;
}

interface VerifyPasswordRequest {
  currentPassword: string;
}

@Component({
  selector: 'app-menu-principal',
  imports: [Sidebar, CommonModule, FormsModule],
  templateUrl: './menu-principal.html',
  styleUrl: './menu-principal.css'
})
export class MenuPrincipal implements OnInit {
  dashboardData: DashboardData | null = null;
  loading: boolean = true;
  error: string | null = null;
  private isBrowser: boolean;

  // Variables para el modal de edición
  showEditModal: boolean = false;
  activeTab: string = 'profile';
  editFormData: {
    nombre?: string;
    apellido?: string;
    currentPassword?: string;
    newPassword?: string;
  } = {};
  confirmNewPassword: string = '';
  editLoading: boolean = false;

  // Errores separados por pestaña
  editProfileError: string = '';
  editSecurityError: string = '';
  editSuccessMessage: string = '';

  // Variables para manejar contraseñas
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isCurrentPasswordVerified: boolean = false;

  passwordErrors = {
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  };

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser && !this.authService.checkAuthentication()) {
      return;
    }
    this.loadDashboardData();
  }

  // Método para cambiar de pestaña limpiando errores
  changeTab(tab: string): void {
    if (this.activeTab === tab) {
      return;
    }

    this.editProfileError = '';
    this.editSecurityError = '';
    this.editSuccessMessage = '';
    this.activeTab = tab;

    this.changeDetectorRef.detectChanges();
  }

  private getUserId(): string | null {
    const user = this.authService.getCurrentUser();
    if (!user) {
      return null;
    }
    const userId = user.id || user.userId || user.sub;
    if (!userId) {
      this.error = 'No se pudo obtener tu información de usuario. Por favor, inicia sesión nuevamente.';
      this.loading = false;
      this.changeDetectorRef.detectChanges();
      return null;
    }
    return userId.toString();
  }

  loadDashboardData() {
  this.loading = true;
  this.error = null;
  const userId = this.getUserId();
  if (!userId) {
    return;
  }

  this.dashboardService.getDashboardData(userId).subscribe({
    next: (response: DashboardApiResponse) => {
      if (response && response.success) {
        this.dashboardData = response.data;
        this.loading = false;
      } else {
        this.error = response?.message || 'Error al cargar los datos del dashboard';
        this.loading = false;
        this.changeDetectorRef.detectChanges();
        //if (this.isBrowser && (error.status === 401 || error.status === 403)) {
          this.authService.logout();

      }
      this.changeDetectorRef.detectChanges();
    },
    error: (err) => {
      console.error(' API Error:', err);
      this.error = 'Error de conexión con el servidor';
      this.loading = false;
      this.changeDetectorRef.detectChanges();
    }
  });
}

 // Método para verificar la contraseña actual
verifyCurrentPassword(): void {
  if (!this.editFormData.currentPassword) {
    this.editSecurityError = 'Por favor ingresa tu contraseña actual';
    this.changeDetectorRef.detectChanges();
    return;
  }

  this.editLoading = true;
  this.editSecurityError = '';
  this.editProfileError = '';
  this.editSuccessMessage = '';

  const userId = this.dashboardData?.userInfo?.id;
  if (!userId) {
    this.editSecurityError = 'No se pudo obtener el ID del usuario';
    this.editLoading = false;
    this.changeDetectorRef.detectChanges();
    return;
  }

  const verifyData: VerifyPasswordRequest = {
    currentPassword: this.editFormData.currentPassword
  };

  const token = this.authService.getToken();
  if (!token) {
    this.editSecurityError = 'No se encontró token de autenticación';
    this.editLoading = false;
    this.changeDetectorRef.detectChanges();
    return;
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  const url = `http://localhost:9001/api-v1/usuarios/${userId}/verify-password`;

  console.log('Verificando contraseña...', { userId, url });

  this.http.post<{success: boolean; message: string}>(url, verifyData, { headers }).subscribe({
    next: (response) => {
      this.editLoading = false;
      console.log('Respuesta de verificación:', response);

      if (response && response.success === true) {
        this.isCurrentPasswordVerified = true;
        this.editSecurityError = '';
        this.editSuccessMessage = 'Contraseña actual verificada correctamente';

        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          this.editSuccessMessage = '';
          this.changeDetectorRef.detectChanges();
        }, 3000);

      } else {
        this.editSecurityError = response?.message || 'Error al verificar la contraseña';
        this.isCurrentPasswordVerified = false;
      }
      this.changeDetectorRef.detectChanges();
    },
    error: (error) => {
      this.editLoading = false;
      this.isCurrentPasswordVerified = false;
      console.error('Error en verificación:', error);

      // Manejar diferentes tipos de error
      if (error.status === 401 || error.status === 400) {
        this.editSecurityError = 'La contraseña actual es incorrecta';
      } else if (error.status === 0) {
        this.editSecurityError = 'No se pudo conectar con el servidor. Verifica tu conexión.';
      } else if (error.error?.message) {
        this.editSecurityError = error.error.message;
      } else if (error.message) {
        this.editSecurityError = error.message;
      } else {
        this.editSecurityError = 'Error al verificar la contraseña. Intenta nuevamente.';
      }

      this.changeDetectorRef.detectChanges();
    }
  });
}

  // Métodos para el modal de edición
  openEditModal() {
    if (this.dashboardData?.userInfo) {
      this.editFormData = {
        nombre: this.dashboardData.userInfo.nombre,
        apellido: this.dashboardData.userInfo.apellido
      };
      this.confirmNewPassword = '';
      this.editProfileError = '';
      this.editSecurityError = '';
      this.editSuccessMessage = '';
      this.showCurrentPassword = false;
      this.showNewPassword = false;
      this.showConfirmPassword = false;
      this.isCurrentPasswordVerified = false;
      this.activeTab = 'profile';
      this.passwordErrors = {
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false
      };
      this.showEditModal = true;
    }
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editFormData = {};
    this.confirmNewPassword = '';
    this.editProfileError = '';
    this.editSecurityError = '';
    this.editSuccessMessage = '';
    this.editLoading = false;
    this.showCurrentPassword = false;
    this.showNewPassword = false;
    this.showConfirmPassword = false;
    this.isCurrentPasswordVerified = false;
    this.activeTab = 'profile';
    this.passwordErrors = {
      minLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false
    };
  }

  // Métodos para mostrar/ocultar contraseñas
  toggleCurrentPassword() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Cuando cambia la contraseña actual, resetear la verificación
  onCurrentPasswordChange(): void {
    this.isCurrentPasswordVerified = false;
    this.editFormData.newPassword = '';
    this.confirmNewPassword = '';
    this.editSecurityError = '';
  }

  // Método para validar fortaleza de contraseña
  validatePasswordStrength(password: string): void {
    this.passwordErrors = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[@$!%*?&.]/.test(password)
    };
  }

  // Método para verificar si la contraseña es válida
  isPasswordValid(): boolean {
    return Object.values(this.passwordErrors).every(error => error === true);
  }

  // Método para obtener mensaje de error de contraseña
  getPasswordErrorMessage(): string {
    if (!this.editFormData.newPassword) {
      return 'La contraseña es requerida';
    }

    const errors = [];
    if (!this.passwordErrors.minLength) errors.push('mínimo 8 caracteres');
    if (!this.passwordErrors.hasUpperCase) errors.push('una mayúscula');
    if (!this.passwordErrors.hasLowerCase) errors.push('una minúscula');
    if (!this.passwordErrors.hasNumber) errors.push('un número');
    if (!this.passwordErrors.hasSpecialChar) errors.push('un carácter especial (@$!%*?&.)');

    return `La contraseña debe contener: ${errors.join(', ')}`;
  }

  validateEditForm(): boolean {
    if (this.activeTab === 'profile') {
      this.editProfileError = '';
    } else {
      this.editSecurityError = '';
    }

    if (this.activeTab === 'profile') {
      // Validación para información personal
      if (this.editFormData.nombre && this.editFormData.nombre.trim().length < 2) {
        this.editProfileError = 'El nombre debe tener al menos 2 caracteres';
        return false;
      }
      if (this.editFormData.apellido && this.editFormData.apellido.trim().length < 2) {
        this.editProfileError = 'El apellido debe tener al menos 2 caracteres';
        return false;
      }
    }
    else if (this.activeTab === 'password') {
      if (this.editFormData.newPassword && this.editFormData.newPassword.trim() !== '') {
        if (!this.isCurrentPasswordVerified) {
          this.editSecurityError = 'Debes verificar tu contraseña actual primero';
          return false;
        }

        if (!this.isPasswordValid()) {
          this.editSecurityError = this.getPasswordErrorMessage();
          return false;
        }

        if (this.editFormData.newPassword !== this.confirmNewPassword) {
          this.editSecurityError = 'Las nuevas contraseñas no coinciden';
          return false;
        }
      }
    }

    return true;
  }

  updateProfile() {
    if (!this.validateEditForm()) {
      return;
    }

    this.editLoading = true;
    this.editProfileError = '';
    this.editSecurityError = '';
    this.editSuccessMessage = '';

    const userId = this.dashboardData?.userInfo?.id;
    if (!userId) {
      this.editProfileError = 'No se pudo obtener el ID del usuario';
      this.editLoading = false;
      return;
    }

    const updateData: any = {};

    if (this.editFormData.nombre && this.editFormData.nombre.trim() !== '') {
      updateData.nombre = this.editFormData.nombre.trim();
    }
    if (this.editFormData.apellido && this.editFormData.apellido.trim() !== '') {
      updateData.apellido = this.editFormData.apellido.trim();
    }

    if (this.editFormData.currentPassword) {
      updateData.currentPassword = this.editFormData.currentPassword;
    }
    if (this.editFormData.newPassword && this.editFormData.newPassword.trim() !== '') {
      updateData.newPassword = this.editFormData.newPassword;
    }

    if (Object.keys(updateData).length === 0) {
      this.editProfileError = 'No hay datos para actualizar';
      this.editLoading = false;
      return;
    }

    const token = this.authService.getToken();
    if (!token) {
      this.editProfileError = 'No se encontró token de autenticación';
      this.editLoading = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `http://localhost:9001/api-v1/usuarios/${userId}/profile`;

    this.http.post(url, updateData, { headers }).subscribe({
      next: (response: any) => {
        this.editLoading = false;

        if (response && response.success === true) {
          this.editSuccessMessage = response.message || 'Perfil actualizado correctamente';
          this.editProfileError = '';
          this.editSecurityError = '';

          if (this.dashboardData && response.user) {
            this.dashboardData.userInfo = {
              ...this.dashboardData.userInfo,
              ...response.user
            };
          }

          setTimeout(() => {
            this.closeEditModal();
            this.loadDashboardData();
          }, 2000);

        } else {
          if (this.activeTab === 'profile') {
            this.editProfileError = response?.message || 'Error desconocido al actualizar el perfil';
          } else {
            this.editSecurityError = response?.message || 'Error desconocido al actualizar el perfil';
          }
        }
      },
      error: (error) => {
        this.editLoading = false;

        if (error.status === 401 || error.status === 400) {
          if (error.error?.message?.toLowerCase().includes('contraseña') ||
              error.error?.message?.toLowerCase().includes('password') ||
              error.error?.message?.toLowerCase().includes('incorrecta') ||
              error.error?.message?.toLowerCase().includes('actual')) {
            this.editSecurityError = 'La contraseña actual es incorrecta';
            this.isCurrentPasswordVerified = false;
          } else {
            if (this.activeTab === 'profile') {
              this.editProfileError = error.error?.message || 'Error de autenticación';
            } else {
              this.editSecurityError = error.error?.message || 'Error de autenticación';
            }
          }
        } else if (error.status === 0) {
          if (this.activeTab === 'profile') {
            this.editProfileError = 'No se pudo conectar con el servidor';
          } else {
            this.editSecurityError = 'No se pudo conectar con el servidor';
          }
        } else if (error.error?.message) {
          if (this.activeTab === 'profile') {
            this.editProfileError = error.error.message;
          } else {
            this.editSecurityError = error.error.message;
          }
        } else {
          if (this.activeTab === 'profile') {
            this.editProfileError = `Error de conexión: ${error.status || 'Desconocido'}`;
          } else {
            this.editSecurityError = `Error de conexión: ${error.status || 'Desconocido'}`;
          }
        }
      }
    });
  }

  verTodosProyectos(): void {
    if (this.isBrowser) {
      this.router.navigate(['/proyectos']);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.loading && !this.dashboardData && !this.error) {
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      }
    }, 1000);
  }

  getProjectStatusClass(percentage: number): string {
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 50) return 'text-yellow-500';
    return 'text-red-500';
  }

  getProjectStatusText(percentage: number): string {
  if (percentage >= 100) return 'Finalizado';
  if (percentage >= 70) return 'Avanzado';
  if (percentage >= 30) return 'En progreso';
  if (percentage > 0) return 'En inicio';
  return 'Sin tareas';
}

  formatDate(dateString: string): string {
    if (!this.isBrowser) return dateString;
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short'
      });
    } catch (error) {
      return dateString;
    }
  }

  getUserInitial(): string {
    if (!this.dashboardData?.userInfo?.nombre) {
      return 'U';
    }
    return this.dashboardData.userInfo.nombre.charAt(0).toUpperCase();
  }

  reloadData(): void {
    this.loadDashboardData();
  }

  onLogout(): void {
    if (this.isBrowser) {
      this.authService.logout();
    }
  }
}
