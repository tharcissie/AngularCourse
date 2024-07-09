import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PRODUCT } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private URL = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<PRODUCT[]> {
    return this.http.get<PRODUCT[]>(`${this.URL}/products`);
  }

  addProduct(product: PRODUCT): Observable<PRODUCT> {
    return this.http.post<PRODUCT>(`${this.URL}/products`, product);
  }

  updateProduct(product: PRODUCT): Observable<PRODUCT> {
    return this.http.put<PRODUCT>(
      `${this.URL}/products/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/products/${id}`);
  }
}
