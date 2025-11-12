import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';


import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AuthInterceptor } from '@core/interceptors/auth-interceptor';
import { UrlInterceptor } from '@core/interceptors/url-interceptor';
import { routes } from './app.routes';

import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { environment } from '@environments/environment';

const Primary = environment.primary;

const arosPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{Primary.50}',
      100: '{Primary.100}',
      200: '{Primary.200}',
      300: '{Primary.300}',
      400: '{Primary.400}',
      500: '{Primary.500}',
      600: '{Primary.600}',
      700: '{Primary.700}',
      800: '{Primary.800}',
      900: '{Primary.900}',
      950: '{Primary.950}'
    },
  },

  extend: {
    Primary: Primary
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-ES'
    },
    providePrimeNG({
      theme: {
        preset: arosPreset,
        options: {
          darkModeSelector: '.dark'
        }
      }
    }),
    MessageService,
    ConfirmationService,
    provideAnimations(),

  ],
};
