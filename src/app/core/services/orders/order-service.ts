import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { LoggingService } from '@app/core/services/logging/logging-service';
import { OrderResponse } from '@app/shared/models/dto/orders/order-response.model';
import { OrderDetailsResponse } from '@app/shared/models/dto/orders/order-details-response.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);

  private loggingService: LoggingService = inject(LoggingService);

  getOrders(): Observable<OrderResponse[]> {
    this.loggingService.debug('OrderService: getOrders called');
    return this.http.get<OrderResponse[]>('orders/all').pipe(
      map(orders => {
        this.loggingService.debug('OrderService: Raw orders from API:', orders);
        const todayOrders = this.filterTodayOrders(orders);
        this.loggingService.debug('OrderService: Filtered today orders:', todayOrders);
        return todayOrders;
      })
    );
  }

  // PATCH http://localhost:8080/api/orders/{id}/mark-order-as-completed
  public markOrderAsCompleted(id: number): Observable<void> {
    return this.http.patch<void>(`orders/${id}/mark-order-as-completed`, {});
  }

  // GET http://localhost:8080/api/orders/status/{status}
  // Backend returns all orders if status is invalid or not provided.
  public getOrdersByStatus(status: string): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(`orders/status/${status}`);
  }

  public getOrdersByStatusOrAll(status?: string): Observable<OrderResponse[]> {
    if (!status) {
      return this.getOrders();
    }
    return this.getOrdersByStatus(status);
  }



  getOrderById(id: number): Observable<OrderResponse | undefined> {
    return this.http.get<OrderResponse[]>('orders/all').pipe(
      map(orders => {
        const todayOrders = this.filterTodayOrders(orders);
        return todayOrders.find(o => o.id === id);
      })
    );
  }

  getOrderDetail(orderId: number): Observable<OrderDetailsResponse[]> {
    // This endpoint might need to be adjusted based on actual API
    // For now, returning empty array as the API structure for details is not specified
    return this.http.get<OrderDetailsResponse[]>(`orders/${orderId}/details`);
  }

   getOrderDetails(): Observable<OrderDetailsResponse[]> {
    // This endpoint might need to be adjusted based on actual API
    // For now, returning empty array as the API structure for details is not specified
    return this.http.get<OrderDetailsResponse[]>('orders/details');
  }


  getTodayOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>('orders/all').pipe(
      map(orders => this.filterTodayOrders(orders))
    );
  }

  getCompletedOrdersCount(): Observable<number> {
    return this.getOrdersByStatus('COMPLETED').pipe(
      map(orders => orders.length)
    );
  }

  getPreparingOrdersCount(): Observable<number> {
    return this.getOrdersByStatus('PENDING').pipe(
      map(orders => orders.length)
    );
  }

  getTotalSales(): Observable<number> {
    return this.getOrdersByStatus('COMPLETED').pipe(
      map(orders => orders.reduce((sum, order) => sum + order.totalPrice, 0))
    );
  }

  private filterTodayOrders(orders: OrderResponse[]): OrderResponse[] {
    // Temporarily return all orders to debug the issue
    this.loggingService.debug('OrderService: Bypassing date filter, returning all orders:', orders.length);
    return orders;

    /* TODO: Restore date filtering once the issue is resolved */
  }
}
