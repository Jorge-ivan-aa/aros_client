import { Component, OnInit, OnDestroy, Output, EventEmitter, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeButton } from '../dark-mode-button/dark-mode-button';
import { MenuItem, MenuService } from '../../../core/services/menu/menu-service';
import { Subscription } from 'rxjs';

export interface HorizontalMenuOption {
  id: string;
  label: string;
  description: string;
  icon?: string;
  isActive?: boolean;
  command?: () => void;
  routerLink?: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, DarkModeButton],
  templateUrl: './header.html',
  styles: ``
})
export class Header implements OnInit, OnDestroy {
  @Output() toggleMenu = new EventEmitter<void>();
  @Input() horizontalMenuOptions: HorizontalMenuOption[] = [];

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

  onHorizontalOptionClick(option: HorizontalMenuOption): void {
    // Execute command if provided
    if (option.command) {
      option.command();
    }

    // Update active state for visual feedback
    this.horizontalMenuOptions = this.horizontalMenuOptions.map(opt => ({
      ...opt,
      isActive: opt.id === option.id
    }));
  }
}
