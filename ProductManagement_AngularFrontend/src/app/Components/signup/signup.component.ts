import { Component } from '@angular/core';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientService } from '../../Services/http-client.service';
import { User } from '../../Models/User.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  userForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(6)])
  });

  constructor(private _userService: HttpClientService, private router: Router) { }

  onSubmit() {
    if (this.userForm.valid) {
      const user = new User(
        this.userForm.value.name!,
        this.userForm.value.email!,
        this.userForm.value.password!
      );
      this._userService.signUp(user).subscribe(
        response => {
          this.router.navigate(['/signin']);

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
