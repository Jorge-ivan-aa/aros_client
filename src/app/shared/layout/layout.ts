import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header } from '../components/header/header';
import { Sidebar } from '../components/sidebar/sidebar';
import { MenuService } from '../../core/services/menu/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, Header, Sidebar],
  templateUrl: './layout.html',
  styles: ``
})
export class Layout implements OnInit, OnDestroy {
  sidebarVisible = false;
  isMobile = false;
  private resizeSubscription!: Subscription;
  private menuService = inject(MenuService);

  ngOnInit(): void {
    this.checkScreenSize();
    this.setupResizeListener();
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

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  onSidebarVisibleChange(visible: boolean): void {
    this.sidebarVisible = visible;

  }
}
