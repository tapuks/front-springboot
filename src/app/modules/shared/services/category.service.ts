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

export interface ApiResponse {
  metadata: Metadata[];
  categoriaResponse: CategoriaResponse;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl = 'http://localhost:8080/api/v1';
  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/categorias`);
  }

  postCategorie(body: Category): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/categorias`, body);
  }

  putCategorie(id: number, body: Category): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.baseUrl}/categorias/${id}`, body);
  }
}
