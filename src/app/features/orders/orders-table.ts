import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrderService } from '@app/core/services/orders/order-service';
import { OrderResponse } from '@models/dto/orders/order-response.model';
import { SharedDatepickerComponent } from '@app/shared/components/datepicker/datepicker.component';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    SharedDatepickerComponent,
    SelectModule,
    FormsModule,
    ButtonModule,
    InputTextModule
  ],
  templateUrl: './orders-table.html',
})
export class OrdersTable implements OnInit {

  orders: OrderResponse[] = [];

  private allOrders: OrderResponse[] = [];

  loading = false;
  saving = false;
  error: string | null = null;

  // Options combox
  comboOptions: string[] = ['ALL', 'PENDING', 'COMPLETED', 'CANCELLED'];
  selectedOption = 'ALL';

  // Status options for the dropdown
  statusOptions = [
    { label: 'PENDING', value: 'PENDING' },
    { label: 'COMPLETED', value: 'COMPLETED' },
    { label: 'CANCELLED', value: 'CANCELLED' }
  ];

  // Track modified orders: Map<orderId, modifiedOrder>
  private modifiedOrders = new Map<number, Partial<OrderResponse>>();

  // Original orders: Map<orderId, originalOrder>
  private originalOrders = new Map<number, OrderResponse>();  // Filtro de fecha (una sola fecha o null)
  private selectedDate: Date | null = null;

  private orderService = inject(OrderService);
  private messageService = inject(MessageService);

  ngOnInit(): void {
    this.fetchOrders();
  }

  onOptionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedOption = value;


    this.fetchOrders(this.selectedOption);
  }


  onDateChange(date: Date | null): void {
    this.selectedDate = date;
    this.applyFilters();
  }

  private fetchOrders(status?: string): void {
    this.loading = true;
    this.error = null;

    const normalizedStatus = !status || status.toUpperCase() === 'ALL' ? undefined : status;

    this.orderService.getOrdersByStatusOrAll(normalizedStatus).subscribe({
      next: (res: OrderResponse[]) => {
        this.allOrders = res;
        // Store original orders for each order
        this.originalOrders.clear();
        res.forEach(order => {
          this.originalOrders.set(order.id, { ...order });
        });
        // Clear modifications when fetching fresh data
        this.modifiedOrders.clear();
        this.applyFilters();
        this.loading = false;
      },
      error: (err: unknown) => {
        console.error(err);
        this.error = 'No se pudieron cargar los pedidos.';
        this.loading = false;
      },
    });
  }


  private applyFilters(): void {
    if (!this.allOrders) {
      this.orders = [];
      return;
    }


    const date = this.selectedDate;
    if (!date) {
      this.orders = [...this.allOrders];
      return;
    }

    const start = this.startOfDay(date);
    const end = this.endOfDay(date);

    this.orders = this.allOrders.filter((o) => {
      const d = new Date(o.date);
      return d >= start && d <= end;
    });
  }

  private startOfDay(d: Date): Date {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  }

  private endOfDay(d: Date): Date {
    const x = new Date(d);
    x.setHours(23, 59, 59, 999);
    return x;
  }

  onStatusChange(order: OrderResponse, newStatus: string): void {
    if (!newStatus) {
      return;
    }
    order.status = newStatus;
    this.trackOrderChange(order);
  }

  onFieldChange(order: OrderResponse, field: 'table', value: string): void {
    order.table = value;
    this.trackOrderChange(order);
  }  private trackOrderChange(order: OrderResponse): void {
    const original = this.originalOrders.get(order.id);
    if (!original) return;

    // Check if editable fields have changed (only status and table)
    const hasChanges =
      original.status !== order.status ||
      original.table !== order.table;

    if (hasChanges) {
      // Store only the changed fields (only status and table are editable)
      const changes: Partial<OrderResponse> = { id: order.id };

      if (original.status !== order.status) changes.status = order.status;
      if (original.table !== order.table) changes.table = order.table;

      this.modifiedOrders.set(order.id, changes);
    } else {
      // No changes, remove from modified list
      this.modifiedOrders.delete(order.id);
    }
  }

  get hasUnsavedChanges(): boolean {
    return this.modifiedOrders.size > 0;
  }

  get unsavedChangesCount(): number {
    return this.modifiedOrders.size;
  }

  saveChanges(): void {
    if (this.modifiedOrders.size === 0) {
      this.messageService.add({
        severity: 'info',
        summary: 'Sin cambios',
        detail: 'No hay cambios pendientes por guardar.',
        life: 3000,
      });
      return;
    }

    this.saving = true;
    const updates = Array.from(this.modifiedOrders.values()).map(orderChanges => {
      // Ensure id is always present
      const updatePayload: { id: number; status?: string; table?: number } = { id: orderChanges.id! };

      // Add status if changed
      if (orderChanges.status) {
        updatePayload.status = orderChanges.status;
      }

      // Extract table ID from table name if changed (e.g., "Mesa 1" -> 1)
      if (orderChanges.table) {
        const tableMatch = orderChanges.table.match(/\d+/);
        if (tableMatch) {
          updatePayload.table = parseInt(tableMatch[0], 10);
        }
      }

      return this.orderService.updateOrder(updatePayload).pipe(
        catchError(error => {
          console.error(`Error updating order ${orderChanges.id}:`, error);
          return of({ error: true, orderId: orderChanges.id });
        })
      );
    });

    forkJoin(updates).subscribe({
      next: (results) => {
        const errors = results.filter((r: unknown) => (r as { error?: boolean })?.error);
        const successCount = results.length - errors.length;

        if (errors.length === 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Cambios guardados',
            detail: `Se actualizaron ${successCount} pedido(s) exitosamente.`,
            life: 3000,
          });

          // Update original orders with the new values
          this.modifiedOrders.forEach((changes, orderId) => {
            const original = this.originalOrders.get(orderId);
            if (original) {
              Object.assign(original, changes);
            }
          });
          this.modifiedOrders.clear();
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Guardado parcial',
            detail: `Se actualizaron ${successCount} pedido(s), pero ${errors.length} fallaron.`,
            life: 5000,
          });

          // Remove successful updates from modified list
          this.modifiedOrders.forEach((changes, orderId) => {
            const failed = errors.find((e: unknown) => (e as { orderId?: number }).orderId === orderId);
            if (!failed) {
              const original = this.originalOrders.get(orderId);
              if (original) {
                Object.assign(original, changes);
              }
              this.modifiedOrders.delete(orderId);
            }
          });
        }

        this.saving = false;
      },
      error: (err) => {
        console.error('Error saving changes:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudieron guardar los cambios. Verifica la conexión con el servidor.',
          life: 5000,
        });
        this.saving = false;
      }
    });
  }
}
