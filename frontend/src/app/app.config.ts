import { ApplicationConfig } from '@angular/core';
import { provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';  // importar withFetch



import { APP_ROUTES } from './app.routes'; // ✅ aquí cambias "routes" por "APP_ROUTES"


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(APP_ROUTES), // ✅ aquí también usas APP_ROUTES
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())  // activar fetch aquí
  ]
};