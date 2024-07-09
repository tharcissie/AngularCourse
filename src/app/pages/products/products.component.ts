import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { PRODUCT } from '../../model/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: PRODUCT[] = [];
  productForm: FormGroup;
  editMode = false;

  constructor(
    private productsService: ProductsService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      price: [0, Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.fetchProducts().subscribe((data: PRODUCT[]) => {
      this.products = data;
    });
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.editMode) {
        this.updateProduct();
      } else {
        this.addProduct();
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  addProduct(): void {
    const newProduct = this.productForm.value;
    this.productsService
      .addProduct(newProduct)
      .subscribe((product: PRODUCT) => {
        this.products.push(product);
        this.resetForm();
      });
  }

  editProduct(product: PRODUCT): void {
    this.productForm.patchValue(product);
    this.editMode = true;
  }

  updateProduct(): void {
    const updatedProduct = this.productForm.value;
    this.productsService
      .updateProduct(updatedProduct)
      .subscribe((product: PRODUCT) => {
        const index = this.products.findIndex((p) => p.id === product.id);
        this.products[index] = product;
        this.resetForm();
      });
  }

  deleteProduct(id: number): void {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter((product) => product.id !== id);
    });
  }

  resetForm(): void {
    this.productForm.reset({
      id: 0,
      title: '',
      price: 0,
      category: '',
      description: '',
      image: '',
    });
    this.editMode = false;
  }
}
