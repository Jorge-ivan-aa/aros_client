import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { OrderService } from '@app/core/services/orders/order-service';
import { OrderResponse } from '@models/dto/orders/order-response.model';
import { SharedDatepickerComponent } from '@app/shared/components/datepicker/datepicker.component';

@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [CommonModule, TableModule, SharedDatepickerComponent],
  templateUrl: './orders-table.html',
})
export class OrdersTable implements OnInit {

  orders: OrderResponse[] = [];

  private allOrders: OrderResponse[] = [];

  loading = false;
  error: string | null = null;

  // Options combox
  comboOptions: string[] = ['ALL', 'PENDING', 'COMPLETED', 'CANCELLED'];
  selectedOption = 'ALL';

  // Filtro de fecha (una sola fecha o null)
  private selectedDate: Date | null = null;

  private orderService = inject(OrderService);

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
}
