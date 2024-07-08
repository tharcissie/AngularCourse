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
  singleProduct: PRODUCT | undefined = {
    id: 0,
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
  };
  showAddForm = false;
  showModal = false;
  showUpdateModal = false;
  updateProductData: PRODUCT = {
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

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id);
  }

  toggleAdd() {
    this.showAddForm = !this.showAddForm;
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  viewProduct(id: number) {
    this.singleProduct = this.productsService.getSingleProduct(id);
    this.toggleModal();
  }

  openUpdateModal(product: PRODUCT) {
    this.updateProductData = { ...product };
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
  }

  updateProduct() {
    this.productsService.updateProduct(this.updateProductData);
    this.closeUpdateModal();
  }
}
