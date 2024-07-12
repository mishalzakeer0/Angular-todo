import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private router:Router){
  
  }
  onLoginSubmit(loginForm: NgForm){
    console.log(loginForm);
    this.router.navigate(["hom"])
  }
}
