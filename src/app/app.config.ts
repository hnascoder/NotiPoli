import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withHashLocation: las rutas quedan como /#/noticias y así funcionan en GitHub Pages
    // withInMemoryScrolling: al cambiar de página sube al inicio
    provideRouter(routes, withHashLocation(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    // Para poder leer el archivo JSON con HttpClient
    provideHttpClient()
  ]
};
