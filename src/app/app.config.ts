import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
    HTTP_INTERCEPTORS,
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from '@core/interceptors/auth-interceptor';
import { routes } from './app.routes';


import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
            providePrimeNG({
                theme: {
                    preset: Aura
                }
            })
  ],
};
