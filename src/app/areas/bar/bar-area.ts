import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Layout } from '@app/shared/layout/layout';
import { MenuService, MenuItem } from '@app/core/services/menu/menu-service';

@Component({
  selector: 'app-bar-area',
  templateUrl: './bar-area.html',
  imports: [Layout, RouterOutlet]
})
export class BarArea implements OnInit {
  private menuService = inject(MenuService);

  ngOnInit(): void {
    this.configureBarMenu();
  }

  private configureBarMenu(): void {
    const barMenuItems: MenuItem[] = [
      {
        id: 'bar-dashboard',
        label: 'Bar',
        description: 'Vista general del bar',
        icon: 'pi pi-glass',
        routerLink: '/bar'
      },
      {
        id: 'orders-list',
        label: 'Lista de Pedidos',
        description: 'Ver y gestionar pedidos',
        icon: 'pi pi-list',
        routerLink: '/bar/orders'
      },
      {
        id: 'menu-card',
        label: 'Carta',
        description: 'Ver carta del bar',
        icon: 'pi pi-book',
        routerLink: '/bar/menu'
      },
      {
        id: 'day-menu',
        label: 'Menú del Día',
        description: 'Ver menú del día del bar',
        icon: 'pi pi-sun',
        routerLink: '/bar/day-menu'
      },
    ];

    this.menuService.setMenuItems(barMenuItems);
  }
}
