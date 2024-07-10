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

  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this.productsService.fetchProducts();
    this.products = this.productsService.getProducts();
  }

  addProduct(): void {
    this.productsService.addProduct(this.product);
    this.product = {
      id: 0,
      title: '',
      price: '',
      category: '',
      description: '',
      image: '',
    };
  }

  editContent: boolean = false;

  editProduct(product: PRODUCT): void {
    this.product = { ...product };
    this.editContent = true;
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

  saveEditedProduct(): void {
    this.productsService.editProduct(this.product);
    this.product = {
      id: 0,
      title: '',
      price: '',
      category: '',
      description: '',
      image: '',
    };
    this.editContent = false;
  }

  onSubmit(): void {
    if (this.editContent) {
      this.saveEditedProduct();
    } else {
      this.addProduct();
    }
  }
}
