import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MenuItem {
  id: string;
  label: string;
  description: string;
  icon?: string;
  routerLink?: string;
  command?: () => void;
  items?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItemsSubject = new BehaviorSubject<MenuItem[]>([]);
  private selectedMenuItemSubject = new BehaviorSubject<MenuItem | null>(null);

  menuItems$: Observable<MenuItem[]> = this.menuItemsSubject.asObservable();
  selectedMenuItem$: Observable<MenuItem | null> = this.selectedMenuItemSubject.asObservable();

  constructor() {
    // No hardcoded menu items - they will be set by each area
  }

  setMenuItems(items: MenuItem[]): void {
    this.menuItemsSubject.next(items);
  }

  addMenuItem(item: MenuItem): void {
    const currentItems = this.menuItemsSubject.value;
    this.menuItemsSubject.next([...currentItems, item]);
  }

  removeMenuItem(id: string): void {
    const currentItems = this.menuItemsSubject.value;
    const filteredItems = currentItems.filter(item => item.id !== id);
    this.menuItemsSubject.next(filteredItems);
  }

  selectMenuItem(item: MenuItem): void {
    this.selectedMenuItemSubject.next(item);
  }

  clearSelection(): void {
    this.selectedMenuItemSubject.next(null);
  }

  getMenuItems(): MenuItem[] {
    return this.menuItemsSubject.value;
  }

  getSelectedMenuItem(): MenuItem | null {
    return this.selectedMenuItemSubject.value;
  }
}
