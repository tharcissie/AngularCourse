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
  singleProduct: PRODUCT | undefined = {
    id: 0,
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
  };
  showAddForm: boolean = false;
  showModal: boolean = false;
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

  toggleModal() {
    this.showModal = !this.showModal;
  }

  toggleAdd() {
    this.showAddForm = !this.showAddForm;
    return this.showAddForm;
  }

  viewProduct(id: number) {
    this.singleProduct = this.productsService.getSingleProduct(id);
    this.toggleModal();
  }
}
