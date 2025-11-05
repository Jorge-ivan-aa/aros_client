import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
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

const arosPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{orange.50}',
            100: '{orange.100}',
            200: '{orange.200}',
            300: '{orange.300}',
            400: '{orange.400}',
            500: '{orange.500}',
            600: '{orange.600}',
            700: '{orange.700}',
            800: '{orange.800}',
            900: '{orange.900}',
            950: '{orange.950}'
        },
        surface: {
            0: '#ffffff',
            50: '{stone.50}',
            100: '{stone.100}',
            200: '{stone.200}',
            300: '{stone.300}',
            400: '{stone.400}',
            500: '{stone.500}',
            600: '{stone.600}',
            700: '{stone.700}',
            800: '{stone.800}',
            900: '{stone.900}',
            950: '{stone.950}'
        }
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
    provideAnimations(),

  ],
};
