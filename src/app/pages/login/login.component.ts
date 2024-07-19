import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../api.service';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-login',
  standalone:true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports:[ReactiveFormsModule, CommonModule],
  providers: []

})

export class LoginComponent { 
  formController: FormGroup;
  signUpMode: boolean = false;
  
  constructor(private fb: FormBuilder, private router: Router, private taskService: TaskService, private cookieService: CookieService,  ) {
    this.formController = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: [''],
    }, {
      validators: this.passwordMatchValidator
    });
  }
  onLoginSubmit(): void {
    if (this.formController.get('email').valid && this.formController.get('password').valid &&  !this.isSignUp()) {
      const credentials = {
        email: this.formController.get('email').value,
        password: this.formController.get('password').value
      };

      this.taskService.userLogin(credentials).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Handle successful login (e.g., store tokens, redirect, etc.)
          if (response) {
            console.log(response, "response")
            {
              // Set a cookie
              this.cookieService.set("userId", response.validUser.id);
              this.cookieService.set("username", response.validUser.username);
              this.cookieService.set("email", response.validUser.email);
              this.cookieService.set("token", response.token);
            }
            // const token = this.cookieService.get('token');
            // console.log(this.jwtHelper.isTokenExpired(token) ,"isexpired")
            this.router.navigate(['home']);
            
          }
        },
        error: (error) => {
          console.log('Login failed', error);
          // Handle login error
        }
      });

    }
    console.log(this.formController, "form faild")
  }

  onSignUpSubmit(): void {
    if (this.formController.valid && this.isSignUp()) {
      const credentials = {
        username: this.formController.get('username').value,
        email: this.formController.get('email').value,
        password: this.formController.get('password').value,
        confirmPassword: this.formController.get('confirmPassword').value
      };

      // HTTP request to backend for signup
      this.taskService.userSignUp(credentials).subscribe({
        next: (response) => {
          console.log('sign-up successful', response);
          // Handle successful sign-up (e.g., store tokens, redirect, etc.)
          if (response) {
            this.toggleSignUp()
          }
        },
        error: (error) => {
          console.log('sign-up failed', error);
          // Handle sign-up error
        }
      });
    } else {
      console.log('Form is invalid');
    }

    console.log('Form values:', this.formController.value);
  }

  passwordMatchValidator(formGroup: FormGroup): Validators | null {
    const password = formGroup.get('password').value;
    const confirmPassword = formGroup.get('confirmPassword').value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  isSignUp(): boolean {
    return this.signUpMode;
  }

  toggleSignUp(): void {
    this.signUpMode = !this.signUpMode;
    if (!this.signUpMode) {
      // Clear validators for SignUp fields when switching to Login
      this.formController.get('username').clearValidators();
      this.formController.get('confirmPassword').clearValidators();
    } else {
      // Add validators back when switching to SignUp
      this.formController.get('username').setValidators(Validators.required);
      this.formController.get('confirmPassword').setValidators(Validators.required);
    }
    this.formController.get('username').updateValueAndValidity();
    this.formController.get('confirmPassword').updateValueAndValidity();
  }
}
