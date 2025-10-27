import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@services/authentication/auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Interpcer");

    const authService = inject(AuthService);
    const newHeaders: Record<string, string> = {};

    if (authService.isAuthenticated()) {
      newHeaders['Authorization'] = `Bearer ${authService.getToken()}`;
    }

    const newReq = req.clone({
      setHeaders: newHeaders,
    });

    return next.handle(newReq);
  }
}
