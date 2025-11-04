import { Component, OnInit, OnDestroy, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, HorizontalMenuOption } from '../components/header/header';
import { Sidebar } from '../components/sidebar/sidebar';
import { MenuService } from '../../core/services/menu/menu.service';
import { WorkerConfigService } from '../../core/services/workers/worker-config.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Header, Sidebar],
  templateUrl: './layout.html',
  styles: ``
})
export class Layout implements OnInit, OnDestroy {
  @Input() workerType?: string;

  sidebarVisible = false;
  isMobile = false;
  horizontalMenuOptions: HorizontalMenuOption[] = [];

  private resizeSubscription!: Subscription;
  private menuService = inject(MenuService);
  private workerConfigService = inject(WorkerConfigService);

  ngOnInit(): void {
    this.checkScreenSize();
    this.setupResizeListener();
    this.configureHorizontalMenu();
  }

  ngOnDestroy(): void {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 1024; // lg breakpoint
    this.sidebarVisible = !this.isMobile;
  }

  private setupResizeListener(): void {
    // Listen for window resize events
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  private configureHorizontalMenu(): void {
    // Only configure horizontal menu if workerType is provided
    if (this.workerType) {
      this.horizontalMenuOptions = this.workerConfigService.getHorizontalMenuOptions(this.workerType);
    } else {
      this.horizontalMenuOptions = [];
    }
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  onSidebarVisibleChange(visible: boolean): void {
    this.sidebarVisible = visible;
  }
}
