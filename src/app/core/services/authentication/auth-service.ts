import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserInfo } from '@models/domain/user/user-info.model';
import { AuthRequest } from '@models/dto/auth/auth-request.model';
import { AuthResponse } from '@models/dto/auth/auth-response.model';
import { LoggingService } from '@services/logging/logging.service';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  /**
   * access token
   */
  private token: string | undefined = localStorage.getItem('access') || undefined;

  /**
   * info from authenticated user
   */
  private data?: UserInfo;
  private loggingService = inject(LoggingService);

  constructor() {
    this.loggingService.auth('AuthService initialized - token exists:', !!this.token);
    this.loggingService.auth('AuthService initialized - access token:', this.token);
    this.loggingService.auth('AuthService initialized - refresh token:', localStorage.getItem('refresh'));

    // If we have a token but no user data, load user data automatically after initialization
    if (this.token && !this.data) {
      this.loggingService.auth('Token exists but no user data, will load user info after initialization');
      // Use setTimeout to avoid circular dependency with interceptors
      setTimeout(() => {
        this.getUserInfo();
      }, 0);
    }
  }

  /**
   *
   */

  login(credentials: AuthRequest): Observable<AuthResponse> {
    this.loggingService.auth('Login called with document:', credentials.document);
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, {
        document: credentials.document,
        password: credentials.password,
      })
      .pipe(
        tap((response: AuthResponse) => {
          this.loggingService.auth('Login successful - response received');
          localStorage.setItem('refresh', response.refresh);
          localStorage.setItem('access', response.access);
          this.token = response.access;
          this.loggingService.auth('Tokens saved, calling getUserInfo');
          this.getUserInfo();
        }),
      );
  }

  refresh(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refresh');
    this.loggingService.auth('Refresh called - refresh token exists:', !!refreshToken);

    return this.http.post<AuthResponse>(`${this.apiUrl}/refresh`, {
      refreshToken: refreshToken
    }).pipe(
      tap((response: AuthResponse) => {
        this.loggingService.auth('Refresh successful - new tokens received');
        localStorage.setItem('refresh', response.refresh);
        localStorage.setItem('access', response.access);
        this.token = response.access;
        this.loggingService.auth('Tokens saved, calling getUserInfo');
        this.getUserInfo();
      }),
    );
  }

  logout(): void {
    this.token = undefined;
    this.data = undefined;
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
  }

  isAuthenticated() {
    return this.token != undefined;
  }

  getToken() {
    return this.token;
  }

  getData() {
    this.loggingService.debug('getData called - current data:', this.data);
    return this.data;
  }

  private getUserInfo(): void {
    this.loggingService.auth('getUserInfo called - current token exists:', !!this.token);
    this.http.get<UserInfo>(`${this.apiUrl}/details`).subscribe({
      next: (userInfo: UserInfo) => {
        this.loggingService.auth('getUserInfo successful - user data received');
        this.data = userInfo;
        this.loggingService.auth('User data set successfully');
      },
      error: (err: unknown) => {
        this.loggingService.error('Error getting user info:', err);
      }
    });
  }

}
