import { Injectable } from '@angular/core';
import { CanMatch, GuardResult, MaybeAsync, Route, UrlSegment } from '@angular/router';
import { AuthService } from '../../services/authentication/auth-service';
import { UserRole } from '../../application/user/dto/user-role.model';
import { UserInfo } from '../../application/user/dto/user-info.model';

@Injectable({
  providedIn: 'root',
})
export class CanBeAdminGuard implements CanMatch {
  /**
   *
   */
  constructor(private authService: AuthService) {}

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    if (!this.authService.isAuthenticated()) {
      return false;
    }

    if (this.authService.getData() != undefined) {
      const data: UserInfo | undefined = this.authService.getData();
      const rol = data?.rol.name;

      return rol == 'admin';
    } else {
      return false;
    }
  }
}
