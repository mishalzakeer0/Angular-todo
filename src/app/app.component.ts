import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, HomeComponent, FormsModule, RouterLink, CommonModule, ReactiveFormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CookieService]
  
})
export class AppComponent {
  title = 'angular-todo';
}
