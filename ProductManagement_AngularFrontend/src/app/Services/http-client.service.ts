import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private apiBaseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.apiBaseUrl);
  }

  getSearchedProducts(query: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiBaseUrl}/searchProducts/${query}`);
  }


  updateProduct(updatedProduct: Product): Observable<{ message: string; product: Product }> {
    return this.httpClient.put<{ message: string; product: Product }>(
      `${this.apiBaseUrl}/updateProduct`,
      updatedProduct
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${this.apiBaseUrl}/addProduct`, product);
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiBaseUrl}/getById/${id}`);
  }

  deleteProduct(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiBaseUrl}/deleteProduct/${id}`);
  }


}
