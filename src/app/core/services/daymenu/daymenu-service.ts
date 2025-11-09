import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DayMenuCreateRequest, DayMenuUpdateRequest } from '@app/shared/models/dto/daymenu/daymenu-create-request';


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

  createDayMenu(dayMenu: DayMenuCreateRequest): Observable<void> {
    return this.http.post<void>('daymenu', dayMenu);
  }

  updateDayMenu(dayMenu: DayMenuUpdateRequest): Observable<DayMenu> {
    return this.http.put<DayMenu>('daymenu/update', dayMenu);
  }

  getAllDayMenus(): Observable<DayMenu[]> {
    return this.http.get<DayMenu[]>('daymenu/all');
  }

  deleteDayMenu(id: number): Observable<void> {
    return this.http.delete<void>(`daymenu/delete/${id}`);
  }
}
