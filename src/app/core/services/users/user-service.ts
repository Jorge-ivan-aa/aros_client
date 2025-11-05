import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CreateUserRequest } from "@app/shared/models/dto/users/create-user-request.model";
import { UserResponse } from "@app/shared/models/dto/users/user-response.model";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);


  public getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>('users');
  }

  public createUser(data: CreateUserRequest): Observable<object> {
    return this.http.post('users/save', data);
  }

  public updateUser(data: CreateUserRequest): Observable<object> {
    return this.http.put('users/update-user', data);
  }

  public deleteUser(document: string): Observable<object> {
    return this.http.delete(`users/delete-user/${document}`);
  }
}
