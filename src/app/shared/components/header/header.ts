import { Component, OnInit, OnDestroy, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeButton } from '../dark-mode-button/dark-mode-button';
import { MenuItem, MenuService } from '../../../core/services/menu/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, DarkModeButton],
  templateUrl: './header.html',
  styles: ``
})
export class Header implements OnInit, OnDestroy {
  @Output() toggleMenu = new EventEmitter<void>();
  selectedMenuItem: MenuItem | null = null;
  private menuSubscription!: Subscription;

  private menuService = inject(MenuService);

  ngOnInit(): void {
    this.menuSubscription = this.menuService.selectedMenuItem$.subscribe(item => {
      this.selectedMenuItem = item;
    });
  }

  ngOnDestroy(): void {
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
  }
}
