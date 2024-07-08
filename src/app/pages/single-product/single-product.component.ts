import { Component, OnInit } from '@angular/core';
import { PRODUCT } from '../../model/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css',
})
export class SingleProductComponent {
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
      const productId = params.get('id');
      if (productId !== null) {
        const id = parseInt(productId, 10);
        this.product = this.products.find((product) => product.id === id);
      }
    });
  }
}
