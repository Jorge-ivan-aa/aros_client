import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OrderResponse } from "@app/shared/models/dto/orders/order-response.model";
import { OrderDetailsResponse } from "@app/shared/models/dto/orders/order-details-response.model";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  public getOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`http://localhost:8080/api/orders/all`);
  }

  public getOrderDetails(): Observable<OrderDetailsResponse[]> {
    return this.http.get<OrderDetailsResponse[]>(`http://localhost:8080/api/orders/details`);
  }

  // GET http://localhost:8080/api/orders/status/{status}
  // Backend returns all orders if status is invalid or not provided.
  public getOrdersByStatus(status: string): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`http://localhost:8080/api/orders/status/${status}`);
  }

  public getOrdersByStatusOrAll(status?: string): Observable<OrderResponse[]> {
    if (!status) {
      return this.getOrders();
    }
    return this.getOrdersByStatus(status);
  }
}
