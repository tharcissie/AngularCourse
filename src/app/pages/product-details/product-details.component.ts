import { Component, OnInit } from '@angular/core';
import { PRODUCT } from '../../model/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  products: PRODUCT[] = [];
  product: PRODUCT | undefined = {
    id: 0,
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
  };
  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {}
  ngOnInit(): void {
    this.productsService.fetchProducts();
    this.products = this.productsService.getProducts();
    this.route.paramMap.subscribe((params) => {
      const pId = params.get('id');
      if (pId !== null) {
        const id = parseInt(pId, 10);
        this.product = this.products.find((product) => product.id === id);
      }
    });
  }
}
