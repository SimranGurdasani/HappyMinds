// app.module.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { CallingService } from './calling.service';
import { CanvasSharingService } from './canvas-sharing.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    CallingService,
    CanvasSharingService
  ]
};

// In your main.ts file to ensure proper Bootstrap initialization
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Import Bootstrap CSS in styles.css
// @import '~bootstrap/dist/css/bootstrap.min.css';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));