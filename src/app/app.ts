import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@services/authentication/auth-service';
import { Theme } from '@services/theme/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('client');
  private theme = inject(Theme);
  private authService = inject(AuthService);
  
  constructor() {
    this.theme.setDefault()
  }
}
