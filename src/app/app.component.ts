import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './guards/auth-guard.guard';
import { Session } from './utils/session';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, HomeComponent, FormsModule, RouterLink, CommonModule, ReactiveFormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [CookieService, AuthGuard, Session, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }]
  
})
export class AppComponent {
  title = 'angular-todo';
}
