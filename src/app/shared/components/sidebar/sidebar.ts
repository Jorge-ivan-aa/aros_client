import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, NgClass, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem, MenuService } from '../../../core/services/menu/menu-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, NgClass, DatePipe],
  templateUrl: './sidebar.html',
  styles: ``
})
export class Sidebar implements OnInit, OnDestroy {
  @Input() visible = true;
  @Input() isMobile = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  menuItems: MenuItem[] = [];
  currentDate = new Date();
  calendarDays: { day: number, isCurrentDay: boolean }[] = [];
  private menuSubscription!: Subscription;

  private menuService = inject(MenuService);

  ngOnInit(): void {
    this.menuSubscription = this.menuService.menuItems$.subscribe(items => {
      this.menuItems = items;
    });
    this.generateCalendar();
  }

  ngOnDestroy(): void {
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
    }
  }

  onMenuItemClick(item: MenuItem): void {
    this.closeSidebar();
    this.menuService.selectMenuItem(item);

    if (item.command) {
      item.command();
    }
  }

  closeSidebar(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  trackByMenuItem(index: number, item: MenuItem): string {
    return item.id;
  }

  private generateCalendar(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Get first day of month
    const firstDay = new Date(year, month, 1);
    // Get last day of month
    const lastDay = new Date(year, month + 1, 0);

    // Calculate days to show from previous month
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    this.calendarDays = [];

    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      this.calendarDays.push({ day: prevMonthLastDay - i, isCurrentDay: false });
    }

    // Add days from current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const isCurrentDay = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
      this.calendarDays.push({ day, isCurrentDay });
    }

    // Fill remaining days to complete 6 weeks (42 days)
    const remainingDays = 42 - this.calendarDays.length;
    for (let day = 1; day <= remainingDays; day++) {
      this.calendarDays.push({ day, isCurrentDay: false });
    }
  }
}
