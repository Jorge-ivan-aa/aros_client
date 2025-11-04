import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Layout } from '@app/shared/layout/layout';
import { MenuService, MenuItem } from '@app/core/services/menu/menu.service';

@Component({
  selector: 'app-admin-area',
  templateUrl: './admin-area.html',
  imports: [Layout, RouterOutlet]
})
export class AdminArea implements OnInit {
  private menuService = inject(MenuService);

  ngOnInit(): void {
    this.configureAdminMenu();
  }

  private configureAdminMenu(): void {
    const adminMenuItems: MenuItem[] = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        description: 'Vista general del restaurante',
        icon: 'pi pi-home',
        routerLink: '/admin'
      },
      {
        id: 'orders',
        label: 'Pedidos',
        description: 'Gestiona los pedidos del día',
        icon: 'pi pi-shopping-cart',
        routerLink: '/admin/orders'
      },
      {
        id: 'manage',
        label: 'Restaurante',
        description: 'Gestiona tu restaurante',
        icon: 'pi pi-shop',
        routerLink: '/admin/manage'
      },
      {
        id: 'analytics',
        label: 'Estadisticas',
        description: 'Analiza el rendimiento',
        icon: 'pi pi-chart-bar',
        routerLink: '/admin/analytics'
      },
    ];

    this.menuService.setMenuItems(adminMenuItems);
  }
}
