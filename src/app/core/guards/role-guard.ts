import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RedirectCommand, Router } from '@angular/router';
import { AuthService } from '@services/authentication/auth-service';
import { LoggingService } from '@app/core/services/logging/logging-service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);
  private loggingService = inject(LoggingService);

  canActivate(route: ActivatedRouteSnapshot): MaybeAsync<GuardResult> {
    // Get user data
    const userData = this.authService.getData();

    if (!userData) {
      this.loggingService.error("RoleGuard: User data is undefined");
      return new RedirectCommand(this.router.parseUrl('/login'));
    }

    // Check if user has ADMINISTRATION area to identify admin users
    const isAdmin = userData.areas.some(area => area.name === 'ADMINISTRATION');
    this.loggingService.routing('RoleGuard: User is admin:', isAdmin);
    this.loggingService.routing('RoleGuard: User areas:', userData.areas);

    // Get the target route path
    const targetRoute = route.routeConfig?.path;
    this.loggingService.routing('RoleGuard: Target route:', targetRoute);

    // Admin users can only access /admin routes
    if (isAdmin) {
      if (targetRoute === 'admin') {
        this.loggingService.routing('RoleGuard: Admin user allowed access to /admin');
        return true;
      } else {
        // Redirect admin users to /admin if they try to access /worker
        this.loggingService.warn('RoleGuard: Admin user attempted to access worker route, redirecting to /admin');
        return new RedirectCommand(this.router.parseUrl('/admin'));
      }
    }

    // Non-admin users can only access /worker routes
    if (targetRoute === 'worker') {
      this.loggingService.routing('RoleGuard: Worker user allowed access to /worker');
      return true;
    } else {
      // Redirect non-admin users to /worker if they try to access /admin
      this.loggingService.warn('RoleGuard: Worker user attempted to access admin route, redirecting to /worker');
      return new RedirectCommand(this.router.parseUrl('/worker'));
    }
  }
}
