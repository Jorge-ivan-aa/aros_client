import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environments/environment';
import { LoggingService } from '@services/logging/logging.service';

export interface Order {
  id: number;
  status: string;
  date: string;
  table: string;
  totalPrice: number;
}

export interface OrderDetail {
  id: number;
  orderId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private loggingService = inject(LoggingService);

  getOrders(): Observable<Order[]> {
    this.loggingService.debug('OrderService: getOrders called');
    return this.http.get<Order[]>(`${this.apiUrl}/orders/all`).pipe(
      map(orders => {
        this.loggingService.debug('OrderService: Raw orders from API:', orders);
        const todayOrders = this.filterTodayOrders(orders);
        this.loggingService.debug('OrderService: Filtered today orders:', todayOrders);
        return todayOrders;
      })
    );
  }

  getOrderById(id: number): Observable<Order | undefined> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/all`).pipe(
      map(orders => {
        const todayOrders = this.filterTodayOrders(orders);
        return todayOrders.find(o => o.id === id);
      })
    );
  }

  getOrderDetails(orderId: number): Observable<OrderDetail[]> {
    // This endpoint might need to be adjusted based on actual API
    // For now, returning empty array as the API structure for details is not specified
    return this.http.get<OrderDetail[]>(`${this.apiUrl}/orders/${orderId}/details`);
  }

  getOrdersByStatus(status: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/status/${status}`).pipe(
      map(orders => this.filterTodayOrders(orders))
    );
  }

  getOrdersByStatusOrAll(status?: string): Observable<Order[]> {
    if (!status) {
      return this.getOrders();
    }
    return this.getOrdersByStatus(status);
  }

  getTodayOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/all`).pipe(
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

  private filterTodayOrders(orders: Order[]): Order[] {
    // Temporarily return all orders to debug the issue
    this.loggingService.debug('OrderService: Bypassing date filter, returning all orders:', orders.length);
    return orders;

    /* TODO: Restore date filtering once the issue is resolved
    const today = new Date().toISOString().split('T')[0];
    this.loggingService.debug('OrderService: Filtering orders for date:', today);
    const filteredOrders = orders.filter(order => {
      const matches = order.date.startsWith(today);
      this.loggingService.debug('OrderService: Order', order.id, 'date:', order.date, 'matches today:', matches);
      return matches;
    });
    this.loggingService.debug('OrderService: Total orders after filtering:', filteredOrders.length);
    return filteredOrders;
    */
  }
}
