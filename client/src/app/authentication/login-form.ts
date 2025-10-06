import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth-service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.html',
  imports: [ReactiveFormsModule],
})
export class LoginForm implements OnInit {
  /**
   * form
   */
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  formStatus: 'Free' | 'Occuped' = 'Free';

  constructor(private authService: AuthService, private router: Router) {
    //
  }

  onSubmit() {
    this.formStatus = 'Occuped';

    this.authService
      .login({
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      })
      .subscribe({
        next: (response) => {
          this.router.navigate(['/app']);
          this.formStatus = 'Free';
        },
        error: (err) => {
          console.error(err);
          this.authService.logout();
          this.formStatus = 'Free';
        },
      });
  }

  ngOnInit(): void {
    if (! this.authService.isAuthenticated()) {
      this.authService.refresh()?.subscribe({
        next: (response) => {
          this.router.navigate(['/app']);
        },
        error: (err) => {
          this.authService.logout();
          console.error(err);
        }
      });
    }
  }
}
