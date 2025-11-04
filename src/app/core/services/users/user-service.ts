import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CreateUserRequest } from "@app/shared/models/dto/users/create-user-request.model";
import { UserResponse } from "@app/shared/models/dto/users/user-response.model";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  public getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>('http://localhost:8080/api/users');
  }
  
  public createUser(data: CreateUserRequest): Observable<object> {
    return this.http.post('http://localhost:8080/api/users/save', data);
  }
  
  public updateUser(data: CreateUserRequest): Observable<object> {
    return this.http.put(`${this.apiUrl}/users/update-user`, data);
  }

  public deleteUser(document: string): Observable<object> {
    return this.http.delete(`${this.apiUrl}/users/delete-user/${document}`);
  }
}
