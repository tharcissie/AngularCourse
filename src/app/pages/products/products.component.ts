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
  isEditing = false;

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
    this.isEditing = false;
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id);
  }

  editProduct(selectedProduct: PRODUCT): void {
    this.product = { ...selectedProduct };
    this.isEditing = true;
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
    this.isEditing = false;
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.saveEditedProduct();
    } else {
      this.addProduct();
    }
  }
}
