import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, tap } from 'rxjs';
import { AuthResponse } from '../../application/auth/dto/auth-response.model';
import { AuthRequest } from '../../application/auth/dto/auth-request.model';
import { UserInfo } from '../../application/user/dto/user-info.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
  constructor(private http: HttpClient) {}

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('http://localhost:8080/api/login', {
        username: credentials.email,
        password: credentials.password,
      })
      .pipe(tap(this.setAuthInfo));
  }

  refresh(): Observable<AuthResponse> {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('refresh')}`,
      },
    };

    return this.http
      .post<AuthResponse>('http://localhost:8080/api/refresh', {}, options)
      .pipe(tap(this.setAuthInfo));
  }

  logout(): void {
    this.token = undefined;
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

  private fetchForUserInfo(): Observable<UserInfo> {
    return this.http.get<UserInfo>('http://localhost:8080/api/proof', {});
  }

  private setAuthInfo(response: AuthResponse) {
    localStorage.setItem('refresh', response.refresh);
    this.token = response.access;

    this.fetchForUserInfo().subscribe((res) => {
      this.data = res;
    });
  }
}
