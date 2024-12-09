import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Metadata } from './category.service';

export interface Product {
  id?: number;
  name: string;
  price: number;
  cantidad: number;
  categoria: Category;
  photo: string;
}

export interface ProductBody {
  name: string;
  price: number;
  cantidad: number;
  categoryId: number;
  photo: string;
}

export interface ProductResponse {
  products: Product[];
}

export interface ApiResponseProduct {
  metadata: Metadata[];
  productResponse: ProductResponse;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = 'http://localhost:8080/api/v1';

  private readonly http = inject(HttpClient);

  getProducts(): Observable<ApiResponseProduct> {
    return this.http.get<ApiResponseProduct>(`${this.baseUrl}/products`);
  }

  getProductsById(id: number): Observable<ApiResponseProduct> {
    return this.http.get<ApiResponseProduct>(`${this.baseUrl}/products/${id}`);
  }

  getProductsByName(name: string): Observable<ApiResponseProduct> {
    return this.http.get<ApiResponseProduct>(
      `${this.baseUrl}/products/filter/${name}`
    );
  }

  postProduct(product: ProductBody): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, product);
  }

  putProduct(id: number, product: ProductBody): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/products/${id}`);
  }
}
