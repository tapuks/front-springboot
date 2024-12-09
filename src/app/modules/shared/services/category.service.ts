import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  id?: number;
  name: string;
  description: string;
}

export interface Metadata {
  date: string;
  Type: string;
  code: string;
}

export interface CategoriaResponse {
  categorias: Category[];
}

export interface ApiResponseCategory {
  metadata: Metadata[];
  categoriaResponse: CategoriaResponse;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'http://localhost:8080/api/v1';

  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<ApiResponseCategory> {
    return this.http.get<ApiResponseCategory>(`${this.baseUrl}/categorias`);
  }

  getCategoyById(id: string): Observable<ApiResponseCategory> {
    return this.http.get<ApiResponseCategory>(
      `${this.baseUrl}/categorias/${id}`
    );
  }

  postCategorie(body: Category): Observable<ApiResponseCategory> {
    return this.http.post<ApiResponseCategory>(
      `${this.baseUrl}/categorias`,
      body
    );
  }

  putCategorie(id: number, body: Category): Observable<ApiResponseCategory> {
    return this.http.put<ApiResponseCategory>(
      `${this.baseUrl}/categorias/${id}`,
      body
    );
  }

  deleteCategorie(id: number): Observable<ApiResponseCategory> {
    return this.http.delete<ApiResponseCategory>(
      `${this.baseUrl}/categorias/${id}`
    );
  }
}
