import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.html',
  styles: ``
})
export class Categories {
  title = 'Categorías';
  description = 'Gestiona las categorías de productos del restaurante';
}
