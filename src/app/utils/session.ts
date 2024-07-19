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
    if (!token) {
      console.log("token not found")
      return false;
    }
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      return expiry * 1000 > Date.now();
    } catch (e) {
      console.error('Failed to decode token:', e);
      return false;
    }
  }
  

  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['']);
  }
}
