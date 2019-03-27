import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './__services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router
  ) { }

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('login');
    }
    return true;
  }
}
