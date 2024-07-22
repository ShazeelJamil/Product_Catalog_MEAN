import { Component } from '@angular/core';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientService } from '../../Services/http-client.service';
import { User, UserLogin } from '../../Models/User.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  userForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });

  constructor(private _userService: HttpClientService, private router: Router) { }

  onSubmit() {
    if (this.userForm.valid) {
      const user = new UserLogin(
        this.userForm.value.email!,
        this.userForm.value.password!
      );
      this._userService.signin(user).subscribe(
        response => {
          this.router.navigate(['/allproducts']);

        },
        error => {
          console.error("API error:", error);
        }
      );

    } else {
      console.log('Form is not valid');
    }
  }

}
