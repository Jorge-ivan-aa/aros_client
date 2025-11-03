import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-shared-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePickerModule, FloatLabelModule],
  templateUrl: './datepicker.component.html',
})
export class SharedDatepickerComponent {
  // Modelo para selección de una sola fecha
  value: Date | null = null;

  // Emite cuando cambia la fecha seleccionada
  @Output() dateChange = new EventEmitter<Date | null>();

  onChange(date: Date | null): void {
    this.value = date;
    this.dateChange.emit(date);
  }
}
