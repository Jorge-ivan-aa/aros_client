import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  preparationTime: number;
}

export interface Category {
  id: number;
  name: string;
  products: Product[];
  position: number;
}

export interface DayMenu {
  id: number;
  name: string;
  description: string;
  price: number;
  preparationTime: number;
  active: boolean;
  creation: string;
  categories: Category[];
}

@Injectable({
  providedIn: 'root'
})
export class DayMenuService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getDayMenu(): Observable<DayMenu> {
    return this.http.get<DayMenu>(`${this.apiUrl}/daymenu/current`);
  }

  getActiveDayMenu(): Observable<DayMenu> {
    return this.getDayMenu();
  }
}
