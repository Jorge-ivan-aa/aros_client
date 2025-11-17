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
          isActive: false,
          command: () => {
            // Renderizar componente de cocina
          }
        },
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
          isActive: false,
          command: () => {
            // Renderizar componente de creación de pedidos
          }
        },
        {
          id: 'day-menu',
          label: 'Menú del Día',
          description: 'Ver menú del día',
          icon: 'pi pi-sun',
          isActive: false
        },
        {
          id: 'today-orders',
          label: 'Órdenes del Día',
          description: 'Ver órdenes del día (solo lectura)',
          icon: 'pi pi-list',
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
          isActive: false,
          command: () => {
            // Renderizar componente de creación de pedidos
          }
        },
        {
          id: 'day-menu',
          label: 'Menú del Día',
          description: 'Ver menú del día',
          icon: 'pi pi-sun',
          isActive: false
        },
        {
          id: 'today-orders',
          label: 'Órdenes del Día',
          description: 'Ver órdenes del día (solo lectura)',
          icon: 'pi pi-list',
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
