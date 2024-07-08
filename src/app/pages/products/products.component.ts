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
  constructor(private productsService: ProductsService,private router: Router) {}

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

  viewDetail(id:number):void{
    this.router.navigate(['/productdetail',id])
  }
}
