import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PRODUCT } from '../../model/product';

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
  isEditing: boolean = false;

  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.productsService.fetchProducts();
    this.products = this.productsService.getProducts();
  }

  addProduct(): void {
    if (this.isEditing) {
      this.productsService.updateProduct(this.product);
      this.isEditing = false;
    } else {
      this.productsService.addProduct(this.product);
    }

    this.resetForm();
  }

  editProduct(product: PRODUCT): void {
    this.product = { ...product };
    this.isEditing = true;
  }

  deleteProduct(id: number): void {
    this.productsService.deleteProduct(id);
  }

  resetForm(): void {
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
