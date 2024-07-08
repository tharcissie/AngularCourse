import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { PRODUCT } from '../../model/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
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
  isModalOpen = false;
  isEditMode = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.fetchProducts();
    this.products = this.productsService.getProducts();
    console.log(this.products);
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetProduct();
    this.isEditMode = false;
  }

  resetProduct(): void {
    this.product = {
      id: 0,
      title: '',
      price: '',
      category: '',
      description: '',
      image: '',
    };
  }

  addProduct(): void {
    this.productsService.addProduct(this.product);
    this.resetProduct();
    this.closeModal();
  }

  editProduct(product: PRODUCT): void {
    this.product = { ...product };
    this.isEditMode = true;
    this.openModal();
  }

  updateProduct(): void {
    this.productsService.updateProduct(this.product);
    this.resetProduct();
    this.closeModal();
  }

  deleteProduct(id: number): void {
    this.productsService.deleteProduct(id);
  }
}
