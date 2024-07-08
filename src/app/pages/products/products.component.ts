import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PRODUCT } from '../../model/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: PRODUCT[] = [];
  product: PRODUCT = {
    id: 0,
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
  };
  testProduct: { price: number } = {
    price: 0,
  };
  onEditMode: boolean = false;
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.productsService.fetchProducts();
    this.products = this.productsService.getProducts();
  }

  addProduct(): void {
    this.productsService.addProduct(this.product);
    this.products = [...this.products, this.product];
    this.product = {
      id: 0,
      title: '',
      price: '',
      category: '',
      description: '',
      image: '',
    };
  }

  deleteProduct(id: number): void {
    this.productsService.deleteProduct(id);
    this.products = this.products.filter((p) => p.id !== id);
  }
  viewDetails(id: number) {
    this.router.navigate(['/products', id]);
  }
  editProduct(e: MouseEvent, id: number): void {
    e.stopPropagation();
    this.onEditMode = true;
    const prod: PRODUCT[] = this.products.filter((p) => p.id == id);
    prod[0].id = prod.length + 1;
    this.product = prod[0];
  }
  confirmEdit(): void {
    this.productsService.editProduct(this.product);

    this.products = [
      ...this.products.filter((p) => p.id !== this.product.id),
      this.product,
    ];
    this.onEditMode = false;
    this.product = {
      id: 0,
      title: '',
      price: '',
      category: '',
      description: '',
      image: '',
    };
  }
}
