import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from '../Models/Product.model';
import { User } from '../Models/User.model';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private apiBaseUrl = 'http://localhost:3000';
  private auth_token: string = '';
  constructor(private httpClient: HttpClient) { }

  signUp(user: User): Observable<{ success: boolean, message: string }> {
    return this.httpClient.post<{ success: boolean, message: string }>(`${this.apiBaseUrl}/signup`, user)
      .pipe(
        map(response => {
          return { success: response.success, message: response.message };
        }),
        catchError(error => {
          const errorMessage = error.error?.message || 'Server error';
          return throwError({ success: false, message: errorMessage });
        })
      );
  }

  signin(user: User): Observable<{ success: boolean, message: string }> {
    return this.httpClient.post<{ success: boolean, message: string }>(`${this.apiBaseUrl}/signin`, user)
      .pipe(
        map(response => {
          this.auth_token = response.message;
          console.log(this.auth_token)
          return { success: response.success, message: response.message };
        }),
        catchError(error => {
          const errorMessage = error.error?.message || 'Server error';
          return throwError({ success: false, message: errorMessage });
        })
      );
  }

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
