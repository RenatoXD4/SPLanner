// google-callback.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-google-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center min-h-screen bg-gray-900">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-white text-lg">Procesando autenticación con Google...</p>
      </div>
    </div>
  `
})
export class GoogleCallbackComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.handleGoogleCallback();
  }

 private handleGoogleCallback(): void {
  this.route.queryParams.subscribe(params => {

    const token = params['token'];
    const userDataString = params['user'];
    const error = params['error'];

    if (error) {

      this.router.navigate(['/login'], {
        queryParams: { error }
      });
      return;
    }

    if (token) {


      let userData = null;

      // PARSEAR el userData de string JSON a objeto
      if (userDataString) {
        try {
          userData = JSON.parse(userDataString);

        } catch (parseError) {

        }
      }

      // Pasar el objeto parseado al servicio
      this.authService.handleGoogleCallback(token, userData);

    } else {
      this.router.navigate(['/login']);
    }
  });
}
}
