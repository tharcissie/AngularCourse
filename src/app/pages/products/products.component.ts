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
  selectedProduct: PRODUCT | null = null;
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

  openModal(id: number): void {
    this.productsService.getSingleProduct(id).subscribe((product) => {
      this.selectedProduct = product;
      this.showModal = true;
    });
  }
}
