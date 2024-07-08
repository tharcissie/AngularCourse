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
  isViewModalOpen = false;
  isEditMode = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.fetchProducts();
    this.products = this.productsService.getProducts();
  }

  addOrUpdateProduct(): void {
    if (this.isEditMode) {
      this.productsService.updateProduct(this.product);
    } else {
      this.productsService.addProduct(this.product);
    }
    this.resetProduct();
    this.closeModal();
  }

  deleteProduct(id: number): void {
    this.productsService.deleteProduct(id);
  }

  openModal(editMode: boolean = false, product?: PRODUCT): void {
    this.isModalOpen = true;
    this.isEditMode = editMode;
    if (editMode && product) {
      this.product = { ...product };
    }
  }

  openViewModal(product: PRODUCT): void {
    this.isViewModalOpen = true;
    this.product = { ...product };
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.resetProduct();
  }

  closeViewModal(): void {
    this.isViewModalOpen = false;
    this.resetProduct();
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
}
