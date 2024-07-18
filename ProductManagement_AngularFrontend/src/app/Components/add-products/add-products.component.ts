import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../Models/Product.model';
import { HttpClientService } from '../../Services/http-client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  categories: string[] = ['Electronics', 'Clothing', 'Machinery', 'Others']; // Replace with your actual categories

  productForm = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl(""),
    category: new FormControl("Others", Validators.required),
    price: new FormControl(5, [Validators.min(5), Validators.required]),
    inStock: new FormControl(1, [Validators.min(1), Validators.required])
  });

  productId: string | null = null;

  constructor(private _productService: HttpClientService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId) {
        this._productService.getProductById(this.productId).subscribe(product => {
          this.productForm.patchValue(product);
        });
      }
    });
  }


  addOREditProduct(): void {
    if (this.productForm.valid) {
      const newProduct = new Product(
        this.productForm.value.name || ' ',
        this.productForm.value.price || 5,
        this.productForm.value.inStock || 1,
        this.productForm.value.category as 'Electronics' | 'Clothing' | 'Machinery' | 'Others',
        this.productForm.value.description || undefined
      );
      if (this.productId) {//update Product
        newProduct._id = this.productId;
        this._productService.updateProduct(newProduct).subscribe(
          (response) => {
            console.log('Product added successfully:', response);
            this.productForm.reset();
          }, (error) => {
            console.error('Error adding product:', error);
          }
        )
      }
      else {//Add new Product
        this._productService.addProduct(newProduct).subscribe(
          (response) => {
            console.log('Product added successfully:', response);
            this.productForm.reset();
          },
          (error) => {
            console.error('Error adding product:', error);
          }
        );
      }
    }
  }

}
