import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { AuthInterceptor } from './app/auth/AuthInterceptor';
import { LoaderInterceptor } from './app/auth/jwt-interceptor';
import { withFetch } from '@angular/common/http';

bootstrapApplication(App, { providers: [provideRouter(routes),
  provideHttpClient(withInterceptorsFromDi()),
  provideHttpClient(withFetch()),
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
}).catch(err => console.error(err));
