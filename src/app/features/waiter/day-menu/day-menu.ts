import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayMenuService, DayMenu as DayMenuModel, Category, Product } from '@app/core/services/daymenu/daymenu-service';
import { LoggingService } from '@app/core/services/logging/logging-service';

@Component({
  selector: 'app-day-menu',
  templateUrl: './day-menu.html',
  imports: [CommonModule],
  styles: ``
})
export class DayMenu implements OnInit {
  private dayMenuService = inject(DayMenuService);
  private loggingService = inject(LoggingService);

  loading = false;
  error: string | null = null;
  dayMenuData: DayMenuModel | null = null;

  ngOnInit(): void {
    this.fetchDayMenu();
  }

  fetchDayMenu(): void {
    this.loading = true;
    this.error = null;

    this.dayMenuService.getDayMenu().subscribe({
      next: (dayMenu) => {
        this.loggingService.debug('DayMenu: Received day menu data:', dayMenu);
        this.dayMenuData = dayMenu;
        this.loading = false;
      },
      error: (error) => {
        this.loggingService.error('DayMenu: Error fetching day menu:', error);
        this.error = 'No se pudo cargar el menú del día';
        this.loading = false;
      }
    });
  }

  // Agrupar productos por categoría
  get groupedMenuItems() {
    if (!this.dayMenuData?.categories) {
      return {};
    }

    const grouped: Record<string, { id: number; name: string; description: string; price: number; category: string }[]> = {};
    this.dayMenuData.categories.forEach((category: Category) => {
      if (category.products && category.products.length > 0) {
        grouped[category.name] = category.products.map((product: Product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: category.name
        }));
      }
    });
    return grouped;
  }

  get categories() {
    return Object.keys(this.groupedMenuItems);
  }
}
