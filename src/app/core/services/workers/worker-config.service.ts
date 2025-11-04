import { Injectable } from '@angular/core';
import { HorizontalMenuOption } from '@app/shared/components/header/header';

export interface WorkerType {
  id: string;
  name: string;
  description: string;
  horizontalMenuOptions: HorizontalMenuOption[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkerConfigService {
  private workerTypes = new Map<string, WorkerType>();

  constructor() {
    this.initializeWorkerTypes();
  }

  private initializeWorkerTypes(): void {
    // Admin Worker Type
    this.workerTypes.set('admin', {
      id: 'admin',
      name: 'Administrador',
      description: 'Acceso completo a todas las funciones del sistema',
      horizontalMenuOptions: [
        {
          id: 'quick-orders',
          label: 'Pedidos Rápidos',
          description: 'Crear pedidos rápidamente',
          icon: 'pi pi-bolt',
          isActive: false
        },
        {
          id: 'kitchen-view',
          label: 'Vista Cocina',
          description: 'Monitorear estado de cocina',
          icon: 'pi pi-utensils',
          isActive: false
        },
        {
          id: 'cash-register',
          label: 'Caja',
          description: 'Acceso a funciones de caja',
          icon: 'pi pi-money-bill',
          isActive: false
        }
      ]
    });

    // Kitchen Worker Type
    this.workerTypes.set('kitchen', {
      id: 'kitchen',
      name: 'Cocina',
      description: 'Acceso a funciones de preparación y cocina',
      horizontalMenuOptions: [
        {
          id: 'order-queue',
          label: 'Cola de Pedidos',
          description: 'Ver pedidos en cola',
          icon: 'pi pi-list',
          isActive: false
        },
        {
          id: 'preparation',
          label: 'Preparación',
          description: 'Marcar pedidos en preparación',
          icon: 'pi pi-clock',
          isActive: false
        },
        {
          id: 'ready-orders',
          label: 'Pedidos Listos',
          description: 'Marcar pedidos como listos',
          icon: 'pi pi-check-circle',
          isActive: false
        }
      ]
    });

    // Waiter Worker Type
    this.workerTypes.set('waiter', {
      id: 'waiter',
      name: 'Mesero',
      description: 'Acceso a funciones de atención al cliente',
      horizontalMenuOptions: [
        {
          id: 'take-order',
          label: 'Tomar Pedido',
          description: 'Crear nuevo pedido',
          icon: 'pi pi-pencil',
          isActive: false
        },
        {
          id: 'table-status',
          label: 'Estado Mesas',
          description: 'Ver estado de las mesas',
          icon: 'pi pi-table',
          isActive: false
        },
        {
          id: 'serve-orders',
          label: 'Servir Pedidos',
          description: 'Marcar pedidos como servidos',
          icon: 'pi pi-truck',
          isActive: false
        }
      ]
    });

    // Cashier Worker Type
    this.workerTypes.set('cashier', {
      id: 'cashier',
      name: 'Cajero',
      description: 'Acceso a funciones de pago y facturación',
      horizontalMenuOptions: [
        {
          id: 'process-payment',
          label: 'Procesar Pago',
          description: 'Procesar pagos de pedidos',
          icon: 'pi pi-credit-card',
          isActive: false
        },
        {
          id: 'billing',
          label: 'Facturación',
          description: 'Generar facturas',
          icon: 'pi pi-file',
          isActive: false
        },
        {
          id: 'daily-report',
          label: 'Reporte Diario',
          description: 'Ver reporte de ventas del día',
          icon: 'pi pi-chart-line',
          isActive: false
        }
      ]
    });

    // Bar Worker Type
    this.workerTypes.set('bar', {
      id: 'bar',
      name: 'Bar',
      description: 'Acceso a funciones del bar',
      horizontalMenuOptions: [
        {
          id: 'take-order',
          label: 'Tomar Pedido',
          description: 'Crear nuevo pedido',
          icon: 'pi pi-pencil',
          isActive: false
        },
        {
          id: 'table-status',
          label: 'Estado Mesas',
          description: 'Ver estado de las mesas',
          icon: 'pi pi-table',
          isActive: false
        },
        {
          id: 'serve-orders',
          label: 'Servir Pedidos',
          description: 'Marcar pedidos como servidos',
          icon: 'pi pi-truck',
          isActive: false
        }
      ]
    });
  }

  getWorkerType(workerTypeId: string): WorkerType | undefined {
    return this.workerTypes.get(workerTypeId);
  }

  getAllWorkerTypes(): WorkerType[] {
    return Array.from(this.workerTypes.values());
  }

  getHorizontalMenuOptions(workerTypeId: string): HorizontalMenuOption[] {
    const workerType = this.getWorkerType(workerTypeId);
    return workerType ? [...workerType.horizontalMenuOptions] : [];
  }

  addWorkerType(workerType: WorkerType): void {
    this.workerTypes.set(workerType.id, workerType);
  }

  removeWorkerType(workerTypeId: string): void {
    this.workerTypes.delete(workerTypeId);
  }

  updateWorkerType(workerTypeId: string, updates: Partial<WorkerType>): void {
    const existing = this.workerTypes.get(workerTypeId);
    if (existing) {
      this.workerTypes.set(workerTypeId, { ...existing, ...updates });
    }
  }
}
