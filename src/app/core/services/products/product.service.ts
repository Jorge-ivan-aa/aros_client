import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environments/environment';

export interface PreparationArea {
  id: number;
  name: string;
  products: string[] | null;
}

export interface Category {
  id: number;
  name: string;
  products: string[] | null;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  preparationArea: PreparationArea;
  preparationTime: number;
  active: boolean;
  categories: Category[];
  quantity: number | null;
  observations: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(product => product.id === id))
    );
  }
}
