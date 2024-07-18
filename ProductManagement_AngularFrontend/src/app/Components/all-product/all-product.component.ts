import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/Product.model';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';


import { HttpClientService } from '../../Services/http-client.service';

@Component({
  selector: 'app-all-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.css'
})
export class AllProductComponent implements OnInit {
  query: string = '';
  products: Product[] = [];
  searchResults: Product[] = [];

  constructor(private _productService: HttpClientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      // console.log("all products--->>", this.products)
    });
  }

  searchProducts(): void {
    if (this.query) {
      this._productService.getSearchedProducts(this.query).subscribe((data: Product[]) => {
        this.searchResults = data;
      });
    }
  }

  clearSearch(): void {
    this.searchResults = [];
  }

  editProduct(id?: string | undefined): void {
    this.router.navigate(['/addProducts', id]);
  }

  deleteProduct(id: string | undefined): void {
    if (id) {
      this._productService.deleteProduct(id).subscribe(
        (response) => {
          this.products = this.products.filter(product => product._id != id)
        }, (error) => {
          console.error(error);
        }
      );
    }
  }


}
