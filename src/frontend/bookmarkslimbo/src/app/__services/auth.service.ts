import { Injectable } from '@angular/core';
import { User } from '../__models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Tokens } from '../__models/tokens';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = null;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  isAuthenticated() {
    return null !== this.getUser();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<Tokens>('http://localhost:8000/api/token/', { username, password })
      .pipe(map(tokens => this.saveTokens(tokens, username)));
  }

  public getUser() {
    if (!this.user) {
      const userSlug = localStorage.getItem('user');
      this.user = userSlug ? JSON.parse(userSlug) : null;
    }
    return this.user;
  }

  logout() {
    this.user = null;
    ['user', 'access_token', 'refresh_token']
      .forEach(key => localStorage.removeItem(key));
  }

  private setUser(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  private saveTokens(tokens: Tokens, username: string) {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    this.setUser({ username });
  }
}
