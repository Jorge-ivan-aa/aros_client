import { Injectable, inject } from '@angular/core';
import { CanMatch, GuardResult, MaybeAsync } from '@angular/router';
import { UserInfo } from '@models/domain/user/user-info.model';
import { AuthService } from '@services/authentication/auth-service';

@Injectable({
  providedIn: 'root',
})
export class CanBeAdminGuard implements CanMatch {
  private authService = inject(AuthService);

  canMatch(): MaybeAsync<GuardResult> {
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
