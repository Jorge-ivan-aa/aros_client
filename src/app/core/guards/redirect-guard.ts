import { Injectable, inject } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router, RedirectCommand } from '@angular/router';
import { AuthService } from '@services/authentication/auth-service';
import { LoggingService } from '@app/core/services/logging/logging-service';

@Injectable({
  providedIn: 'root',
})
export class RedirectGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);
  private loggingService = inject(LoggingService);

  canActivate(): MaybeAsync<GuardResult> {
    // If user is already authenticated, redirect to appropriate area
    this.loggingService.routing('RedirectGuard: Checking authentication status');
    if (this.authService.isAuthenticated()) {
      const userData = this.authService.getData();
      this.loggingService.routing('User authenticated, checking user data:', userData);

      if (userData) {
        const isAdmin = userData.areas.some(area => area.name === 'ADMINISTRATION');
        this.loggingService.routing('User data available, isAdmin:', isAdmin);
        if (isAdmin) {
          this.loggingService.routing('Redirecting admin user to /admin');
          return new RedirectCommand(this.router.parseUrl('/admin'));
        } else {
          this.loggingService.routing('Redirecting worker user to /worker');
          return new RedirectCommand(this.router.parseUrl('/worker'));
        }
      } else {
        // If authenticated but no user data yet, wait for it
        this.loggingService.routing('User authenticated but no data yet, waiting for data...');
        return new Promise<GuardResult>((resolve) => {
          const checkUserData = () => {
            const currentUserData = this.authService.getData();
            if (currentUserData) {
              const isAdmin = currentUserData.areas.some(area => area.name === 'ADMINISTRATION');
              this.loggingService.routing('User data now available, isAdmin:', isAdmin);
              if (isAdmin) {
                this.loggingService.routing('Redirecting admin user to /admin after wait');
                resolve(new RedirectCommand(this.router.parseUrl('/admin')));
              } else {
                this.loggingService.routing('Redirecting worker user to /worker after wait');
                resolve(new RedirectCommand(this.router.parseUrl('/worker')));
              }
            } else {
              this.loggingService.debug('Still waiting for user data...');
              setTimeout(checkUserData, 100);
            }
          };
          setTimeout(checkUserData, 100);
        });
      }
    }

    // If not authenticated, allow access to login page
    this.loggingService.routing('User not authenticated, allowing access to login');
    return true;
  }
}
