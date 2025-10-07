import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authentication/auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interpcer");

    const authService = inject(AuthService);
    let newHeaders: { [key: string]: string } = {};

    if (authService.isAuthenticated()) {
      newHeaders['Authorization'] = `Bearer ${authService.getToken()}`;
    }

    const newReq = req.clone({
      setHeaders: newHeaders,
    });

    return next.handle(newReq);
  }
}
