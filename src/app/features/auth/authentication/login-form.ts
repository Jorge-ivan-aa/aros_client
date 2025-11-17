import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message'
import { AuthService } from '@services/authentication/auth-service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button'
import { MessageService } from 'primeng/api';
import { LoggingService } from '@app/core/services/logging/logging-service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.html',
  imports: [ReactiveFormsModule,
    CommonModule,
    PasswordModule,
    MessageModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule],
})
export class LoginForm {
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private loggingService = inject(LoggingService);


  /**
   * form
   */
  form: FormGroup = new FormGroup({
    document: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  formStatus: 'Free' | 'Occuped' = 'Free';

  onSubmit() {
    this.loggingService.auth('Login form submitted');
    this.formStatus = 'Occuped';

    this.authService
      .login({
        document: this.form.get('document')?.value,
        password: this.form.get('password')?.value,
      })
      .subscribe({
        next: () => {
          this.loggingService.auth('Login successful, redirecting based on user role');
          // Redirect based on user role after successful login
          this.redirectBasedOnUserRole();
          this.formStatus = 'Free';
        },
        error: (err: { status?: number }) => {
          this.loggingService.error('Login failed:', err);
          this.authService.logout();
          this.formStatus = 'Free';

          // Manejo de errores con toasts
          if (err.status === 401) {
            // Error de credenciales incorrectas
            this.loggingService.auth('Login failed: Invalid credentials');
            this.messageService.add({
              severity: 'error',
              summary: 'Error de autenticación',
              detail: 'Credenciales incorrectas. Verifique su cédula y contraseña.',
              life: 5000
            });
          } else if (err.status === 0 || (err.status && err.status >= 500)) {
            // Error del servidor
            this.loggingService.error('Login failed: Server error', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error del servidor',
              detail: 'Hay un problema con el servidor. Por favor, intente más tarde.',
              life: 5000
            });
          } else {
            // Error genérico
            this.loggingService.error('Login failed: Unexpected error', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Ha ocurrido un error inesperado. Por favor, intente nuevamente.',
              life: 5000
            });
          }
        },
      });
  }

  isInvalid(value: string): boolean {
    return this.form.get(value)!.invalid && this.form.get(value)!.touched;
  }

  // Buttom signal
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  private redirectBasedOnUserRole(): void {
    const userData = this.authService.getData();
    this.loggingService.auth('redirectBasedOnUserRole called - user data:', userData);

    if (userData) {
      // Check if user has ADMINISTRATION area to identify admin users
      const isAdmin = userData.areas.some(area => area.name === 'ADMINISTRATION');
      this.loggingService.auth('User role determined - isAdmin:', isAdmin);

      if (isAdmin) {
        this.loggingService.routing('Redirecting admin user to /admin');
        this.router.navigate(['/admin']);
      } else {
        // Redirect to worker area for non-admin users
        this.loggingService.routing('Redirecting worker user to /worker');
        this.router.navigate(['/worker']);
      }
    } else {
      // If user data is not available, try again after a short delay
      // But only try a few times to avoid infinite loops
      this.loggingService.debug('User data not available yet, retrying in 100ms');
      setTimeout(() => this.redirectBasedOnUserRole(), 100);
    }
  }



}
