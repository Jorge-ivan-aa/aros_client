import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopSellingChartComponent } from '@app/shared/components/top-selling-chart/top-selling-chart.component';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, TopSellingChartComponent],
  templateUrl: './analytics.html',
  styles: ``
})
export class Analytics {
  title = 'Estadísticas';
  description = 'Visualiza las estadísticas de tu restaurante';
}
