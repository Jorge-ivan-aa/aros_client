import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { Order, OrderDetail } from '@app/core/services/orders/order.service';

@Component({
  selector: 'app-order-detail-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule],
  template: `
    <p-dialog
      header="Detalle del Pedido"
      [(visible)]="visible"
      [modal]="true"
      [style]="{ width: '600px' }"
      [maximizable]="true"
      (onHide)="onClose()">

      <div *ngIf="order" class="space-y-4">
        <!-- Order Info -->
        <div class="grid grid-cols-2 gap-4 p-4 bg-surface-100 dark:bg-surface-800 rounded-lg">
          <div>
            <p class="text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">Pedido ID</p>
            <p class="font-mono font-semibold">{{ order.id }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">Mesa</p>
            <p class="font-semibold">{{ order.table }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">Fecha</p>
            <p>{{ order.date | date:'dd/MM/yyyy HH:mm' }}</p>
          </div>
          <div>
            <p class="text-sm font-medium text-surface-600 dark:text-surface-400 mb-1">Estado</p>
            <span [class]="getStatusBadgeClass(order.status)" class="px-2 py-1 rounded-full text-xs font-medium">
              {{ getStatusText(order.status) }}
            </span>
          </div>
        </div>

        <!-- Order Items -->
        <div>
          <h4 class="font-semibold mb-3">Productos del Pedido</h4>
          <div class="border border-surface-200 dark:border-surface-700 rounded-lg">
            <div class="grid grid-cols-12 gap-2 p-3 bg-surface-100 dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 font-semibold text-sm">
              <div class="col-span-6">Producto</div>
              <div class="col-span-2 text-center">Cantidad</div>
              <div class="col-span-2 text-right">Precio Unit.</div>
              <div class="col-span-2 text-right">Total</div>
            </div>

            <div *ngFor="let item of orderDetails" class="grid grid-cols-12 gap-2 p-3 border-b border-surface-100 dark:border-surface-700 text-sm">
              <div class="col-span-6">{{ item.productName }}</div>
              <div class="col-span-2 text-center">{{ item.quantity }}</div>
              <div class="col-span-2 text-right">S/ {{ item.unitPrice | number:'1.2-2' }}</div>
              <div class="col-span-2 text-right font-semibold">S/ {{ item.totalPrice | number:'1.2-2' }}</div>
            </div>

            <div class="grid grid-cols-12 gap-2 p-3 bg-surface-50 dark:bg-surface-900 font-semibold">
              <div class="col-span-10 text-right">Total del Pedido:</div>
              <div class="col-span-2 text-right text-primary-600 dark:text-primary-400">
                S/ {{ order.totalPrice | number:'1.2-2' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </p-dialog>
  `,

})
export class OrderDetailDialogComponent {
  @Input() visible = false;
  @Input() order: Order | null = null;
  @Input() orderDetails: OrderDetail[] = [];

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-300';
      case 'preparing':
        return 'bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-300';
      case 'pending':
        return 'bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-300';
      default:
        return 'bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-300';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'preparing':
        return 'En preparación';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  }

  onClose() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.closed.emit();
  }
}
