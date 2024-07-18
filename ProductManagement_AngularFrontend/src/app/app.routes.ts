import { Routes } from '@angular/router';
import { AllProductComponent } from './Components/all-product/all-product.component';
import { AddProductsComponent } from './Components/add-products/add-products.component';

export const routes: Routes = [
    { path: '', title: "All Products", component: AllProductComponent },
    { path: 'addProducts', title: "Add Product", component: AddProductsComponent },
    { path: 'addProducts/:id', title: "Edit Product", component: AddProductsComponent },
];