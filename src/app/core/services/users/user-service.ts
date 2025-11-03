import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CreateUserRequest } from "@app/shared/models/dto/users/create-user-request.model";
import { UserResponse } from "@app/shared/models/dto/users/user-response.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor (private http: HttpClient) {
    // 
  }
  
  public getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>('http://localhost:8080/api/users');
  }
  
  public createUser(data: CreateUserRequest): Observable<object> {
    return this.http.post('http://localhost:8080/api/users/save', data);
  }
  
  public updateUser(data: CreateUserRequest): Observable<object> {
    return this.http.put('http://localhost:8080/api/users/update-user', data);
  }

  public deleteUser(document: string): Observable<object> {
    return this.http.delete(`http://localhost:8080/api/users/delete-user/${document}`);
  }
}