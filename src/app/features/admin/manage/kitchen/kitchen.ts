import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  title = 'Cocina';
  description = 'Gestión de las operaciones de cocina y preparación de pedidos';

  loading = false;
  error: string | null = null;
  pendingOrders: OrderDetailsResponse[] = [];

  constructor(private orderService: OrderService) {}

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
    // Acción pendiente: marcar pedido como completado.
    // Por ahora no realiza ninguna operación.
    console.log('Completar pedido', orderId);
  }
}
