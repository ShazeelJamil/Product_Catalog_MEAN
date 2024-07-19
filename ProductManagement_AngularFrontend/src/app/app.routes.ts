import { Routes } from '@angular/router';
import { AllProductComponent } from './Components/all-product/all-product.component';
import { AddProductsComponent } from './Components/add-products/add-products.component';
import { SignupComponent } from './Components/signup/signup.component';
import { SigninComponent } from './Components/signin/signin.component';

export const routes: Routes = [
    { path: '', title: "Sign Up", component: SignupComponent },
    { path: 'signin', title: "Sign in", component: SigninComponent },
    { path: 'allproducts', title: "All Products", component: AllProductComponent },
    { path: 'addProducts', title: "Add Product", component: AddProductsComponent },
    { path: 'addProducts/:id', title: "Edit Product", component: AddProductsComponent },
];