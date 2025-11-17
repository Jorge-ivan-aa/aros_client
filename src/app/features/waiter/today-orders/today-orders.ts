import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '@app/core/services/orders/order-service';
import { LoggingService } from '@app/core/services/logging/logging-service';


@Component({
  selector: 'app-today-orders',
  templateUrl: './today-orders.html',
  imports: [CommonModule],
  styles: ``
})
export class TodayOrders implements OnInit {
  private orderService = inject(OrderService);
  private loggingService = inject(LoggingService);

  loading = false;
  error: string | null = null;
  todayOrders: { id: string; table: string; customer: string; status: string; total: number; items: { name: string; quantity: number; price: number }[]; timestamp: string }[] = [];

  ngOnInit(): void {
    this.fetchTodayOrders();
  }

  fetchTodayOrders(): void {
    this.loading = true;
    this.error = null;

    this.orderService.getTodayOrders().subscribe({
      next: (orders) => {
        this.loggingService.debug('TodayOrders: Received orders data:', orders);
        this.todayOrders = orders.map(order => ({
          id: `ORD-${order.id}`,
          table: order.table || 'Mesa no asignada',
          customer: 'Cliente',
          status: this.mapOrderStatus(order.status),
          total: order.totalPrice || 0,
          items: [],
          timestamp: order.date || new Date().toISOString()
        }));
        this.loading = false;
      },
      error: (error) => {
        this.loggingService.error('TodayOrders: Error fetching orders:', error);
        this.error = 'No se pudieron cargar las órdenes del día';
        this.loading = false;
      }
    });
  }

  private mapOrderStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'PENDING': 'Pendiente',
      'COMPLETED': 'Completado',
      'IN_PROGRESS': 'En Proceso',
      'CANCELLED': 'Cancelado'
    };
    return statusMap[status] || status;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Completado':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'En Proceso':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Pendiente':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'Cancelado':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Completado':
        return 'pi pi-check-circle';
      case 'En Proceso':
        return 'pi pi-clock';
      case 'Pendiente':
        return 'pi pi-exclamation-circle';
      case 'Cancelado':
        return 'pi pi-times-circle';
      default:
        return 'pi pi-question-circle';
    }
  }

  get totalOrders(): number {
    return this.todayOrders.length;
  }

  get totalRevenue(): number {
    return this.todayOrders.reduce((sum, order) => sum + order.total, 0);
  }

  get completedOrders(): number {
    return this.todayOrders.filter(order => order.status === 'Completado').length;
  }
}
