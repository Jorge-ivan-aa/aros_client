import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { AuthService } from './services/authentication/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('client');

  /**
   *
   */
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    // this.authService.refresh().subscribe(() => null);
  }
}
