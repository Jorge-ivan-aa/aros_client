import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCreateRequest } from '@app/shared/models/dto/products/product-create-request';
import { ProductReponse } from '@app/shared/models/dto/products/product-response';
import { ProductSimpleResponse } from '@app/shared/models/dto/products/product-simple-response';
import { ProductUpdateRequest } from '@app/shared/models/dto/products/product-update-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<ProductSimpleResponse[]> {
    return this.http.get<ProductSimpleResponse[]>('http://localhost:8080/api/products/no-daymenu');
  }

  public filterByCategories(categories: number[]) {
    return this.http.get<ProductSimpleResponse[]>('http://localhost:8080/api/products/filter', {
      params: { categories },
    });
  }

  public createProduct(data: ProductCreateRequest): Observable<object> {
    return this.http.post('http://localhost:8080/api/products/create', data);
  }

  public updateProduct(data: ProductUpdateRequest): Observable<object> {
    return this.http.put('http://localhost:8080/api/products/update', data);
  }

  public findProduct(id: number): Observable<ProductReponse> {
    return this.http.get<ProductReponse>(`http://localhost:8080/api/products/${id}`);
  }
}
