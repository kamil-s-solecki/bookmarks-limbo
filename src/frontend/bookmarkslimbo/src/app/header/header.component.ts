import { Component, OnInit } from '@angular/core';
import { AuthService } from '../__services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  constructor(private authService: AuthService,
              private router: Router
  ) { }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
