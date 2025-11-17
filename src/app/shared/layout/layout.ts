import { Component, OnInit, OnDestroy, inject, Input, Type, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgComponentOutlet } from '@angular/common';
import { Header, HorizontalMenuOption } from '../components/header/header';
import { Sidebar } from '../components/sidebar/sidebar';
import { MenuService } from '../../core/services/menu/menu-service';
import { WorkerConfigService } from '../../core/services/workers/worker-config.service';
import { Subscription } from 'rxjs';
import { Kitchen } from '../../features/kitchen/kitchen';
import { OrderCreationForm } from '../../features/orders-create/order-creation-form';
import { DayMenu } from '../../features/waiter/day-menu/day-menu';
import { TodayOrders } from '../../features/waiter/today-orders/today-orders';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Header, Sidebar, NgComponentOutlet],
  templateUrl: './layout.html',
  styles: ``
})
export class Layout implements OnInit, OnDestroy {
  @Input() workerType?: string;
  @Input() hideSidebar = false;

  sidebarVisible = false;
  isMobile = false;
  horizontalMenuOptions: HorizontalMenuOption[] = [];
  currentComponent: Type<unknown> | null = null;

  private componentMap: Record<string, Type<unknown>> = {
    'order-queue': Kitchen,
    'take-order': OrderCreationForm,
    'day-menu': DayMenu,
    'today-orders': TodayOrders
  };

  private resizeSubscription!: Subscription;
  private menuService = inject(MenuService);
  private workerConfigService = inject(WorkerConfigService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    console.log('Layout ngOnInit called, workerType:', this.workerType);
    this.checkScreenSize();
    this.setupResizeListener();
    this.configureHorizontalMenu();

    // If hideSidebar is true, force sidebar to be hidden
    if (this.hideSidebar) {
      this.sidebarVisible = false;
    }
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 1024; // lg breakpoint
    this.sidebarVisible = !this.isMobile && !this.hideSidebar;
  }

  private setupResizeListener(): void {
    // Listen for window resize events
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  private configureHorizontalMenu(): void {
    // Only configure horizontal menu if workerType is provided
    console.log('configureHorizontalMenu called, workerType:', this.workerType);
    if (this.workerType) {
      const options = this.workerConfigService.getHorizontalMenuOptions(this.workerType);
      console.log('Horizontal menu options from service:', options);
      // Add command handlers for dynamic component rendering
      this.horizontalMenuOptions = options.map(option => ({
        ...option,
        command: () => this.onHorizontalMenuClick(option.id)
      }));
      console.log('Final horizontal menu options with commands:', this.horizontalMenuOptions);
    } else {
      this.horizontalMenuOptions = [];
      console.log('No workerType provided, horizontal menu options cleared');
    }
  }

  onHorizontalMenuClick(optionId: string): void {
    console.log('onHorizontalMenuClick called with optionId:', optionId);
    console.log('Current component before change:', this.currentComponent);

    const component = this.componentMap[optionId];
    if (component) {
      console.log('Setting component:', component);
      this.currentComponent = component;
      console.log('Current component after setting:', this.currentComponent);
      this.cdr.detectChanges();
    } else {
      console.log('No component found for optionId:', optionId);
      this.currentComponent = null;
    }
  }

  toggleSidebar(): void {
    // Only allow toggling if sidebar is not forced to be hidden
    if (!this.hideSidebar) {
      this.sidebarVisible = !this.sidebarVisible;
    }
  }

  onSidebarVisibleChange(visible: boolean): void {
    this.sidebarVisible = visible;
  }
}
