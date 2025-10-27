import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/authentication/auth-service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginForm implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * form
   */
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  formStatus: 'Free' | 'Occuped' = 'Free';

  onSubmit() {
    this.formStatus = 'Occuped';

    this.authService
      .login({
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/app']);
          this.formStatus = 'Free';
        },
        error: (err: unknown) => {
          console.error(err);
          this.authService.logout();
          this.formStatus = 'Free';
        },
      });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.authService.refresh()?.subscribe({
        next: () => {
          this.router.navigate(['/app']);
        },
        error: (err: unknown) => {
          this.authService.logout();
          console.error(err);
        },
      });
    }
  }

  // Buttom signal
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    if (element!=null) {
      element.classList.toggle('dark')
    };

  }
}
