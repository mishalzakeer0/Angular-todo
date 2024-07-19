import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class Session {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) {}

  isAuthenticated(): boolean {
    const token = this.cookieService.get('token');
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return expiry * 1000 > Date.now();
    // return !this.jwtHelper.isTokenExpired(token);
    // droped JwtHelperService method since due injection error
  }

  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['']);
  }
}
