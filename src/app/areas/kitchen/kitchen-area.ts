import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Layout } from '@app/shared/layout/layout';
import { MenuService, MenuItem } from '@app/core/services/menu/menu-service';

@Component({
  selector: 'app-kitchen-area',
  templateUrl: './kitchen-area.html',
  imports: [Layout, RouterOutlet]
})
export class KitchenArea implements OnInit {
  private menuService = inject(MenuService);

  ngOnInit(): void {
    this.configureKitchenMenu();
  }

  private configureKitchenMenu(): void {
    const kitchenMenuItems: MenuItem[] = [
      {
        id: 'order-queue',
        label: 'Cola de Pedidos',
        description: 'Ver pedidos pendientes',
        icon: 'pi pi-list',
        routerLink: '/kitchen'
      },
    ];

    this.menuService.setMenuItems(kitchenMenuItems);
  }
}
