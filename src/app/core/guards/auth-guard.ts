import { Injectable, inject } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    GuardResult,
    MaybeAsync,
    RedirectCommand,
    Router,
} from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '@services/authentication/auth-service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): MaybeAsync<GuardResult> {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    return this.authService.refresh().pipe(
      map((res) => {
        if (res) {
          return true;
        } else {
          return new RedirectCommand(this.router.parseUrl('/login'));
        }
      })
    );
  }

  canActivateChild(): MaybeAsync<GuardResult> {
    return this.canActivate();
  }
}
