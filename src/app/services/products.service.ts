import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PRODUCT } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: PRODUCT[] = [];

  private URL = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) {}

  fetchProducts(): void {
    this.http.get<PRODUCT[]>(`${this.URL}/products`).subscribe((data) => {
      this.products = data;
    });
  }

  getProducts(): PRODUCT[] {
    return this.products;
  }

  getSingleProduct(id: number) {
    return this.products.find((product) => product.id === id);
  }

  addProduct(product: PRODUCT): void {
    this.http
      .post<PRODUCT>(`${this.URL}/products`, product)
      .subscribe((data) => {
        this.products.push(data);
      });
  }

  deleteProduct(id: number): void {
    this.http.delete<PRODUCT>(`${this.URL}/products/${id}`).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }

  updateProduct(product: PRODUCT): void {
    this.http
      .put<PRODUCT>(`${this.URL}/products/${product.id}`, product)
      .subscribe(() => {
        // update the product with the new product data using the product id
        const index = this.products.findIndex((p) => p.id === product.id);
        if (index !== -1) {
          this.products[index] = product;
        } else {
          console.error('Product not found');
        }
      });
  }
}
