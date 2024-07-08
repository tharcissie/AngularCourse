import { Component, OnInit } from '@angular/core';
import { PRODUCT } from '../../model/product';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit{
  products:PRODUCT[] = []
  product: PRODUCT | undefined = {
    id: 0,
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
  }

  constructor(private route: ActivatedRoute, private productsService : ProductsService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{

      this.productsService.fetchProducts();
      this.products = this.productsService.getProducts();

      const productId = params.get('id')

      if (productId){
        let id = parseInt(productId,10)
        this.product = this.products.find((product)=>product.id === id)
        console.log('m',this.product)
      }
    })
  }

}
