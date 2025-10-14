import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Sidebar } from '../../shared/ui/sidebar/sidebar';
import { DashboardService, DashboardApiResponse } from '../../services/dashboard.service';
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
  newPassword?: string;
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
  editFormData: {
    nombre?: string;
    apellido?: string;
    newPassword?: string;
  } = {};
  confirmNewPassword: string = '';
  editLoading: boolean = false;
  editErrorMessage: string = '';
  editSuccessMessage: string = '';

  // Nuevas variables para manejar contraseñas
  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  showPasswordFields: boolean = false; // Controla si mostrar los campos de nueva contraseña

  // Validaciones de contraseña
  private readonly PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
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
    // Solo verificar autenticación en el navegador
    if (this.isBrowser && !this.authService.checkAuthentication()) {
      return;
    }

    this.loadDashboardData();
  }

  private getUserId(): string | null {
    const user = this.authService.getCurrentUser();

    if (!user) {
      return null;
    }

    // Buscar el ID en diferentes propiedades posibles
    const userId = user.id || user.userId || user.sub;

    if (!userId) {
      this.error = 'No se pudo obtener tu información de usuario. Por favor, inicia sesión nuevamente.';
      this.loading = false;
      this.changeDetectorRef.detectChanges();
      return null;
    }

    const userIdString = userId.toString();
    return userIdString;
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
        }
        this.changeDetectorRef.detectChanges();
      },
      error: (err) => {
        this.error = 'Error de conexión con el servidor';
        this.loading = false;
        this.changeDetectorRef.detectChanges();

        // Solo hacer logout en el navegador si hay error de autenticación
        if (this.isBrowser && (err.status === 401 || err.status === 403)) {
          this.authService.logout();
        }
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
      this.editErrorMessage = '';
      this.editSuccessMessage = '';
      this.showCurrentPassword = false;
      this.showNewPassword = false;
      this.showConfirmPassword = false;
      this.showPasswordFields = false;
      // Resetear errores de contraseña
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
    this.editErrorMessage = '';
    this.editSuccessMessage = '';
    this.editLoading = false;
    this.showCurrentPassword = false;
    this.showNewPassword = false;
    this.showConfirmPassword = false;
    this.showPasswordFields = false;
    // Resetear errores de contraseña
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

    verTodosProyectos(): void {
    if (this.isBrowser) {
      this.router.navigate(['/proyectos']);
    }
  }
  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  // Método para mostrar campos de nueva contraseña
  showChangePasswordFields() {
    this.showPasswordFields = true;
    // Resetear errores de contraseña
    this.passwordErrors = {
      minLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false
    };
  }

  // Método para cancelar cambio de contraseña
  cancelPasswordChange() {
    this.showPasswordFields = false;
    this.editFormData.newPassword = '';
    this.confirmNewPassword = '';
    // Resetear errores de contraseña
    this.passwordErrors = {
      minLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false
    };
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
    this.editErrorMessage = '';

    // Validar que al menos un campo esté lleno
    if (!this.editFormData.nombre && !this.editFormData.apellido && !this.showPasswordFields) {
      this.editErrorMessage = 'Debes completar al menos un campo para actualizar';
      return false;
    }

    // Validar contraseñas si se quiere cambiar la contraseña
    if (this.showPasswordFields) {
      if (!this.editFormData.newPassword) {
        this.editErrorMessage = 'La nueva contraseña es requerida';
        return false;
      }

      // Validar fortaleza de la contraseña
      if (!this.isPasswordValid()) {
        this.editErrorMessage = this.getPasswordErrorMessage();
        return false;
      }

      if (this.editFormData.newPassword !== this.confirmNewPassword) {
        this.editErrorMessage = 'Las nuevas contraseñas no coinciden';
        return false;
      }
    }

    return true;
  }

  updateProfile() {
    if (!this.validateEditForm()) {
      return;
    }

    this.editLoading = true;
    this.editErrorMessage = '';
    this.editSuccessMessage = '';

    const userId = this.dashboardData?.userInfo?.id;
    if (!userId) {
      this.editErrorMessage = 'No se pudo obtener el ID del usuario';
      this.editLoading = false;
      return;
    }

    console.log('Enviando datos de actualización:', {
      userId,
      formData: this.editFormData,
      showPasswordFields: this.showPasswordFields
    });

    // Preparar datos para enviar
    const updateData: UpdateProfileRequest = {};

    // Siempre enviar nombre y apellido si tienen valor
    if (this.editFormData.nombre && this.editFormData.nombre.trim() !== '') {
      updateData.nombre = this.editFormData.nombre.trim();
    }

    if (this.editFormData.apellido && this.editFormData.apellido.trim() !== '') {
      updateData.apellido = this.editFormData.apellido.trim();
    }

    // Solo enviar nueva contraseña si se está cambiando la contraseña
    if (this.showPasswordFields) {
      if (this.editFormData.newPassword && this.editFormData.newPassword.trim() !== '') {
        updateData.newPassword = this.editFormData.newPassword;
      }
    }

    // Verificar que haya al menos un campo para actualizar
    if (Object.keys(updateData).length === 0) {
      this.editErrorMessage = 'No hay datos para actualizar';
      this.editLoading = false;
      return;
    }

    console.log('Datos finales a enviar:', updateData);

    const token = this.authService.getToken();
    if (!token) {
      this.editErrorMessage = 'No se encontró token de autenticación';
      this.editLoading = false;
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const url = `http://localhost:9001/api-v1/users/${userId}/profile`;
    console.log('URL de la petición:', url);

    this.http.put(url, updateData, {
      headers
    }).subscribe({
      next: (response: any) => {
        console.log('Respuesta del servidor:', response);
        this.editLoading = false;

        // Verificar si la respuesta tiene la estructura esperada
        if (response && response.success === true) {
          this.editSuccessMessage = response.message || 'Perfil actualizado correctamente';

          // Actualizar los datos locales
          if (this.dashboardData && response.user) {
            this.dashboardData.userInfo = {
              ...this.dashboardData.userInfo,
              ...response.user
            };
          }

          console.log('Perfil actualizado exitosamente');

          // Cerrar modal después de 2 segundos
          setTimeout(() => {
            this.closeEditModal();
            this.loadDashboardData();
          }, 2000);

        } else {
          // Si success es false o no existe
          this.editErrorMessage = response?.message || 'Error desconocido al actualizar el perfil';
          console.error('Error en respuesta del servidor:', response);
        }
      },
      error: (error) => {
        this.editLoading = false;
        console.error('Error HTTP completo:', error);

        // Manejo detallado de errores
        if (error.status === 0) {
          this.editErrorMessage = 'No se pudo conectar con el servidor. Verifica que esté corriendo.';
        } else if (error.status === 404) {
          this.editErrorMessage = 'Endpoint no encontrado. Verifica la URL del servidor.';
        } else if (error.status === 401) {
          this.editErrorMessage = 'No autorizado. Tu sesión puede haber expirado.';
        } else if (error.status === 500) {
          this.editErrorMessage = 'Error interno del servidor. Intenta nuevamente.';
        } else if (error.error?.message) {
          this.editErrorMessage = error.error.message;
        } else if (error.message) {
          this.editErrorMessage = error.message;
        } else {
          this.editErrorMessage = `Error de conexión: ${error.status || 'Desconocido'}`;
        }

        console.log('Detalles del error:');
        console.log('Status:', error.status);
        console.log('Status Text:', error.statusText);
        console.log('URL:', error.url);
        console.log('Error body:', error.error);
      }
    });
  }

  // AÑADIR timeout de seguridad
  ngAfterViewInit() {
    // Timeout de seguridad por si la carga se queda colgada
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
    if (percentage >= 80) return 'Activo';
    if (percentage >= 50) return 'En progreso';
    return 'En inicio';
  }

  // Método para formatear fecha (solo en navegador)
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

  // Método para obtener inicial del nombre
  getUserInitial(): string {
    if (!this.dashboardData?.userInfo?.nombre) {
      return 'U';
    }
    return this.dashboardData.userInfo.nombre.charAt(0).toUpperCase();
  }

  // Método para recargar datos
  reloadData(): void {
    this.loadDashboardData();
  }

  // Método para manejar logout
  onLogout(): void {
    if (this.isBrowser) {
      this.authService.logout();
    }
  }
}
