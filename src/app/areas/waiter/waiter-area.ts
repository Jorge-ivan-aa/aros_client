import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Layout } from '@app/shared/layout/layout';
import { MenuService, MenuItem } from '@app/core/services/menu/menu.service';

@Component({
  selector: 'app-waiter-area',
  templateUrl: './waiter-area.html',
  imports: [Layout, RouterOutlet]
})
export class WaiterArea implements OnInit {
  private menuService = inject(MenuService);

  ngOnInit(): void {
    this.configureWaiterMenu();
  }

  private configureWaiterMenu(): void {
    const waiterMenuItems: MenuItem[] = [
      {
        id: 'waiter-dashboard',
        label: 'Mesero',
        description: 'Vista general del mesero',
        icon: 'pi pi-user',
        routerLink: '/waiter'
      },
      {
        id: 'orders-list',
        label: 'Lista de Pedidos',
        description: 'Ver y gestionar pedidos',
        icon: 'pi pi-list',
        routerLink: '/waiter/orders'
      },
      {
        id: 'menu-card',
        label: 'Carta',
        description: 'Ver carta del restaurante',
        icon: 'pi pi-book',
        routerLink: '/waiter/menu'
      },
      {
        id: 'day-menu',
        label: 'Menú del Día',
        description: 'Ver menú del día',
        icon: 'pi pi-sun',
        routerLink: '/waiter/day-menu'
      },
    ];

    this.menuService.setMenuItems(waiterMenuItems);
  }
}
