import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  private http = inject(HttpClient);

  // Ejemplo de petición GET con URL relativa
  // El interceptor transformará 'users' a 'http://localhost:8080/api/users'
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('users');
  }

  // Ejemplo de petición POST con URL relativa
  // El interceptor transformará 'users/save' a 'http://localhost:8080/api/users/save'
  createUser(userData: any): Observable<any> {
    return this.http.post('users/save', userData);
  }

  // Ejemplo de petición PUT con URL relativa
  // El interceptor transformará 'users/update-user' a 'http://localhost:8080/api/users/update-user'
  updateUser(userData: any): Observable<any> {
    return this.http.put('users/update-user', userData);
  }

  // Ejemplo de petición DELETE con URL relativa con parámetro
  // El interceptor transformará 'users/delete-user/123' a 'http://localhost:8080/api/users/delete-user/123'
  deleteUser(document: string): Observable<any> {
    return this.http.delete(`users/delete-user/${document}`);
  }

  // Ejemplo de petición GET con URL relativa y parámetros
  // El interceptor transformará 'orders/status/COMPLETED' a 'http://localhost:8080/api/orders/status/COMPLETED'
  getOrdersByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`orders/status/${status}`);
  }

  // Ejemplo de petición PATCH con URL relativa
  // El interceptor transformará 'orders/123/mark-order-as-completed' a 'http://localhost:8080/api/orders/123/mark-order-as-completed'
  markOrderAsCompleted(orderId: number): Observable<any> {
    return this.http.patch(`orders/${orderId}/mark-order-as-completed`, {});
  }
}
