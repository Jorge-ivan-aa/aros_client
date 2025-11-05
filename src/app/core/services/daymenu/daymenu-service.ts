import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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


  getDayMenu(): Observable<DayMenu> {
    return this.http.get<DayMenu>('daymenu/current');
  }

  getActiveDayMenu(): Observable<DayMenu> {
    return this.getDayMenu();
  }
}
