import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersTable } from '@features/orders/orders-table';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, OrdersTable],
  templateUrl: './orders.html',
  styles: ``
})
export class Orders {
  title = 'Gestión de Pedidos';
  description = 'Aquí puedes gestionar todos los pedidos del restaurante';
}
