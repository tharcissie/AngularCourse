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

  editProduct(id: number, product: PRODUCT):void{
    this.http.put<PRODUCT>(`${this.URL}/products/${id}`,product).subscribe((data)=>{
      const res = this.products.findIndex((product)=>product.id === id)
      if(res !== -1){
        this.products[res] = data;
      }
    })
  }
}
