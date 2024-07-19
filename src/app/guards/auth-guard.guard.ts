import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Session } from '../utils/session';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private session: Session, private router: Router) { }

  canActivate(): boolean {
    if (!this.session.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
