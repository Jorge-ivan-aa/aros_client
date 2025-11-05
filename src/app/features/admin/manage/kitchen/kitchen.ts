import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderService } from '@app/core/services/orders/order-service';
import { OrderDetailsResponse } from '@app/shared/models/dto/orders/order-details-response.model';

@Component({
  selector: 'app-kitchen',
  imports: [CommonModule, RouterModule],
  templateUrl: './kitchen.html',
  styles: ``
})
export class Kitchen implements OnInit {
  private orderService: OrderService = inject(OrderService);
  title = 'Cocina';
  description = 'Gestión de las operaciones de cocina y preparación de pedidos';

  loading = false;
  error: string | null = null;
  pendingOrders: OrderDetailsResponse[] = [];
  processing = new Set<number>();

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.loading = true;
    this.error = null;

    this.orderService.getOrderDetails().subscribe({
      next: (orders) => {
        this.pendingOrders = (orders || []).filter(o => (o.status || '').toUpperCase() === 'PENDING');
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los pedidos de cocina.';
        this.loading = false;
      }
    });
  }

  completeOrder(orderId: number): void {
    if (!orderId || this.processing.has(orderId)) return;
    this.error = null;
    this.processing.add(orderId);
    this.orderService.markOrderAsCompleted(orderId).subscribe({
      next: () => {
        // Remove order from list locally upon success
        this.pendingOrders = this.pendingOrders.filter(o => o.id !== orderId);
      },
      error: () => {
        this.error = 'No se pudo marcar el pedido como completado.';
      },
      complete: () => {
        this.processing.delete(orderId);
      }
    });
  }
}
