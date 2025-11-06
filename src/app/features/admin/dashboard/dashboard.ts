import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BadgeModule } from 'primeng/badge';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { OrderService } from '@app/core/services/orders/order-service';
import { TableService } from '@app/core/services/tables/table.service';
import { DayMenuService, DayMenu } from '@app/core/services/daymenu/daymenu-service';
import { ProductService, Product } from '@app/core/services/products/product-service';
import { OrderDetailDialogComponent } from '@shared/components/order-detail-dialog/order-detail-dialog.component';
import { LoggingService } from '@app/core/services/logging/logging-service';
import { OrderResponse } from '@app/shared/models/dto/orders/order-response.model';
import { OrderDetailsResponse } from '@app/shared/models/dto/orders/order-details-response.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    BadgeModule,
    CardModule,
    OrderDetailDialogComponent
  ],

})
export class Dashboard implements OnInit {
  private orderService = inject(OrderService);
  private tableService = inject(TableService);
  private dayMenuService = inject(DayMenuService);
  private productService = inject(ProductService);
  private loggingService = inject(LoggingService);

  orders = signal<OrderResponse[]>([]);
  orderDetails = signal<OrderDetailsResponse[]>([]);
  dayMenu = signal<DayMenu | null>(null);
  completedOrdersCount = signal(0);
  preparingOrdersCount = signal(0);
  occupiedTablesCount = signal(0);
  totalSales = signal(0);
  currentDate = signal('');
  currentTime = signal('');
  showSales = signal(true);

  // Dialog state
  showOrderDetail = signal(false);
  selectedOrder = signal<OrderResponse | null>(null);
  selectedProduct = signal<Product | null>(null);

  ngOnInit() {
    this.loadDashboardData();
    this.loadDayMenu();
    this.updateDateTime();
    this.loadSalesVisibility();
    // Update time every minute
    setInterval(() => this.updateDateTime(), 60000);
  }

  private loadDashboardData() {
    // Load orders
    this.orderService.getTodayOrders().subscribe({
      next: (orders) => {
        this.loggingService.debug('Dashboard: Orders loaded:', orders);
        this.orders.set(orders);
      },
      error: (error) => {
        this.loggingService.error('Error loading orders:', error);
        // Fallback: try to get all orders without date filter
        this.orderService.getOrdersByStatusOrAll().subscribe({
          next: (allOrders) => {
            this.loggingService.debug('Dashboard: Fallback orders loaded:', allOrders);
            this.orders.set(allOrders);
          },
          error: (fallbackError) => {
            this.loggingService.error('Error loading fallback orders:', fallbackError);
          }
        });
      }
    });

    // Load statistics
    this.orderService.getCompletedOrdersCount().subscribe({
      next: (count) => {
        this.completedOrdersCount.set(count);
      },
      error: (error) => {
        this.loggingService.error('Error loading completed orders count:', error);
        this.completedOrdersCount.set(0);
      }
    });

    this.orderService.getPreparingOrdersCount().subscribe({
      next: (count) => {
        this.preparingOrdersCount.set(count);
      },
      error: (error) => {
        this.loggingService.error('Error loading preparing orders count:', error);
        this.preparingOrdersCount.set(0);
      }
    });

    this.tableService.getOccupiedTablesCount().subscribe({
      next: (count) => {
        this.occupiedTablesCount.set(count);
      },
      error: (error) => {
        this.loggingService.error('Error loading occupied tables count:', error);
        this.occupiedTablesCount.set(0);
      }
    });

    this.orderService.getTotalSales().subscribe({
      next: (total) => {
        this.totalSales.set(total);
      },
      error: (error) => {
        this.loggingService.error('Error loading total sales:', error);
        this.totalSales.set(0);
      }
    });
  }

  private updateDateTime() {
    const now = new Date();

    // Format date in Spanish
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    this.currentDate.set(now.toLocaleDateString('es-ES', dateOptions));

    // Format time
    this.currentTime.set(now.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    }));
  }

  private loadDayMenu() {
    // ⚠️ HARDCODED DAY MENU - TODO: Fix API call to get real day menu
    // Original code (commented out):
    /*
    this.dayMenuService.getActiveDayMenu().subscribe({
      next: (menu: DayMenu) => {
        this.dayMenu.set(menu);
      },
      error: (error: unknown) => {
        this.loggingService.error('Error loading day menu:', error);
      }
    });
    */

    // Hardcoded day menu for testing
    const hardcodedMenu: DayMenu = {
      id: 27,
      name: 'Menú del Día',
      description: 'Menú del día actual',
      price: 15000,
      preparationTime: 30,
      active: true,
      creation: new Date().toISOString().split('T')[0], // Today's date
      categories: [
        {
          id: 1,
          name: 'Sopas',
          position: 1,
          products: [
            { id: 1, name: 'Sopa de Pollo', price: 8000, description: 'Deliciosa sopa de pollo', preparationTime: 15 },
            { id: 2, name: 'Sopa de Verduras', price: 7000, description: 'Sopa casera de verduras', preparationTime: 12 }
          ]
        },
        {
          id: 2,
          name: 'Principios',
          position: 2,
          products: [
            { id: 4, name: 'Arroz con Pollo', price: 12000, description: 'Arroz con pollo y verduras', preparationTime: 20 },
            { id: 5, name: 'Pasta Alfredo', price: 11000, description: 'Pasta en salsa cremosa', preparationTime: 18 },
            { id: 6, name: 'Ensalada César', price: 9000, description: 'Ensalada fresca con aderezo césar', preparationTime: 10 }
          ]
        },
        {
          id: 3,
          name: 'Proteínas',
          position: 3,
          products: [
            { id: 8, name: 'Pollo a la Plancha', price: 15000, description: 'Pechuga de pollo a la plancha', preparationTime: 25 },
            { id: 9, name: 'Carne Asada', price: 18000, description: 'Carne de res asada', preparationTime: 30 },
            { id: 10, name: 'Pescado Frito', price: 16000, description: 'Filete de pescado frito', preparationTime: 20 },
            { id: 11, name: 'Lomo de Cerdo', price: 17000, description: 'Lomo de cerdo al horno', preparationTime: 28 }
          ]
        },
        {
          id: 4,
          name: 'Bebidas',
          position: 4,
          products: [
            { id: 13, name: 'Jugo Natural', price: 4000, description: 'Jugo natural del día', preparationTime: 5 },
            { id: 14, name: 'Gaseosa', price: 3000, description: 'Bebida gaseosa', preparationTime: 2 },
            { id: 15, name: 'Limonada', price: 3500, description: 'Limonada natural', preparationTime: 5 },
            { id: 16, name: 'Agua', price: 2000, description: 'Agua mineral', preparationTime: 1 }
          ]
        }
      ]
    };

    this.dayMenu.set(hardcodedMenu);
    this.loggingService.debug('Dashboard: Hardcoded day menu loaded:', hardcodedMenu);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-300';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-300';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-300';
      default:
        return 'bg-surface-100 text-surface-800 dark:bg-surface-800 dark:text-surface-300';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'Completado';
      case 'PENDING':
        return 'En preparación';
      case 'CANCELLED':
        return 'Cancelado';
      default:
        return status;
    }
  }

  viewOrderDetails(order: OrderResponse) {
    this.selectedOrder.set(order);
    // For now, get a sample product to show in the dialog
    this.productService.getProductById(1).subscribe({
      next: (product) => {
        this.selectedProduct.set(product || null);
        this.showOrderDetail.set(true);
      },
      error: (error) => {
        this.loggingService.error('Error loading product details:', error);
      }
    });
  }

  closeOrderDetail() {
    this.showOrderDetail.set(false);
    this.selectedOrder.set(null);
    this.orderDetails.set([]);
  }

  toggleSalesVisibility() {
    const newVisibility = !this.showSales();
    this.showSales.set(newVisibility);
    localStorage.setItem('dashboard_sales_visible', newVisibility.toString());
  }

  private loadSalesVisibility() {
    const stored = localStorage.getItem('dashboard_sales_visible');
    if (stored !== null) {
      this.showSales.set(stored === 'true');
    }
  }
}
