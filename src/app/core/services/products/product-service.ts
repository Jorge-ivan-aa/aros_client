import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ProductCreateRequest } from '@app/shared/models/dto/products/product-create-request';
import { ProductReponse } from '@app/shared/models/dto/products/product-response';
import { ProductSimpleResponse } from '@app/shared/models/dto/products/product-simple-response';
import { ProductListResponse } from '@app/shared/models/dto/products/product-list-response.model';
import { ProductUpdateRequest } from '@app/shared/models/dto/products/product-update-request';
import { catchError, map, Observable, of } from 'rxjs';

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
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  public getProducts(): Observable<ProductSimpleResponse[]> {
    return this.http.get<ProductSimpleResponse[]>('products/no-daymenu');
  }

  public getAllProducts(): Observable<ProductListResponse[]> {
    return this.http.get<ProductListResponse[]>('products');
  }

  public filterByCategories(categories: number[]) {
    return this.http.get<ProductSimpleResponse[]>('products/filter', {
      params: { categories },
    });
  }

  public createProduct(data: ProductCreateRequest): Observable<object> {
    return this.http.post('products/create', data);
  }

  public updateProduct(data: ProductUpdateRequest): Observable<object> {
    return this.http.put('products/update', data);
  }

  public findProduct(id: number): Observable<ProductReponse> {
    return this.http.get<ProductReponse>(`products/${id}`);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.findProduct(id).pipe(
      map((product: ProductReponse) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        preparationArea: {
          id: product.preparationArea.id,
          name: product.preparationArea.name,
          products: null
        },
        preparationTime: product.preparationTime,
        active: product.active,
        categories: product.categories.map(category => ({
          id: category.id,
          name: category.name,
          products: null
        })),
        quantity: null,
        observations: null
      } as Product)),
      catchError(() => of(undefined))
    );
  }

  getProductsByCategories(categoryIds: number[]): Observable<ProductSimpleResponse[]> {
    return this.http.get<ProductSimpleResponse[]>('products/filter', {
      params: { categories: categoryIds.join(',') }
    });
  }
}
