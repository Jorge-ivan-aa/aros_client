import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from '@app/shared/layout/layout';
import { AuthService } from '@app/core/services/authentication/auth-service';
import { LoggingService } from '@app/core/services/logging/logging-service';

@Component({
  selector: 'app-worker-area',
  templateUrl: './worker-area.html',
  imports: [Layout, RouterOutlet]
})
export class WorkerArea implements OnInit {
  private authService = inject(AuthService);
  private loggingService = inject(LoggingService);

  workerType = 'waiter'; // Default value
  hideSidebar = true; // Default value - sidebar visible by default

  ngOnInit(): void {
    console.log('WorkerArea ngOnInit called');
    this.determineWorkerType();
  }

  private determineWorkerType(): void {
    const userData = this.authService.getData();
    console.log('WorkerArea: User data from auth service:', userData);
    this.loggingService.debug('WorkerArea: Determining worker type from user data:', userData);

    if (userData && userData.areas) {
      // Find the first area that matches our worker types
      const workerAreas = ['WAITER', 'KITCHEN', 'BAR', 'CASHIER'];

      for (const area of userData.areas) {
        const areaName = area.name.toUpperCase();
        if (workerAreas.includes(areaName)) {
          this.workerType = areaName.toLowerCase();
          this.loggingService.debug(`WorkerArea: Determined worker type as '${this.workerType}' from area '${area.name}'`);
          return;
        }
      }

      // If no specific area found, check for ADMINISTRATION to handle edge cases
      if (userData.areas.some(area => area.name === 'ADMINISTRATION')) {
        this.loggingService.warn('WorkerArea: Admin user in worker area, defaulting to waiter');
        this.workerType = 'waiter';
      } else {
        this.loggingService.warn('WorkerArea: No recognized worker area found, defaulting to waiter');
        this.workerType = 'waiter';
      }
    } else {
      this.loggingService.warn('WorkerArea: No user data available, defaulting to waiter');
      this.workerType = 'waiter';
    }
    console.log('WorkerArea: Final workerType determined:', this.workerType);
  }
}
