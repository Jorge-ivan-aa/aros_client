import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserInfo } from '@models/domain/user/user-info.model';
import { AuthRequest } from '@models/dto/auth/auth-request.model';
import { AuthResponse } from '@models/dto/auth/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  /**
   * access token
   */
  private token: string | undefined = undefined;

  /**
   * info from authenticated user
   */
  private data?: UserInfo;

  /**
   *
   */

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('http://localhost:8080/api/login', {
        username: credentials.email,
        password: credentials.password,
      })
      .pipe(
        tap((response: AuthResponse) => {
          localStorage.setItem('refresh', response.refresh);
          this.token = response.access;

          this.http.get<UserInfo>('http://localhost:8080/api/proof', {}).subscribe((res: UserInfo) => {
            this.data = res;
          });
        }),
      );
  }

  refresh(): Observable<AuthResponse> {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('refresh')}`,
      },
    };

    return this.http.post<AuthResponse>('http://localhost:8080/api/refresh', {}, options).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('refresh', response.refresh);
        this.token = response.access;

        this.http.get<UserInfo>('http://localhost:8080/api/proof', {}).subscribe((res: UserInfo) => {
          this.data = res;
        });
      }),
    );
  }

  logout(): void {
    this.token = undefined;
    localStorage.removeItem('refresh');
  }

  isAuthenticated() {
    return this.token != undefined;
  }

  getToken() {
    return this.token;
  }

  getData() {
    return this.data;
  }


}
