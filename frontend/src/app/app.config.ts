import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEsCl from '@angular/common/locales/es-CL';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { APP_ROUTES } from './app.routes';

registerLocaleData(localeEsCl, 'es-CL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(APP_ROUTES),
    provideAnimations(),
    provideToastr({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: false,
      progressBar: true,
      tapToDismiss: true,
    }),
    { provide: LOCALE_ID, useValue: 'es-CL' }
  ]
};