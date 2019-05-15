import { Injectable } from '@angular/core';
import { User } from '../__models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Tokens } from '../__models/tokens';
import { JwtHelperService } from '@auth0/angular-jwt';
import { apiUrl } from '../__utils/urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = null;

  isRefreshing = false;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  isAuthenticated() {
    return null !== this.getUser();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<Tokens>(apiUrl('token/'), { username, password })
      .pipe(map(tokens => this.saveTokens(tokens, username)));
  }

  register(user: User): Observable<any> {
    return this.http.post<User>(apiUrl('users/'), user);
  }

  refresh(): Observable<any> {
    this.isRefreshing = true;
    const refresh = localStorage.getItem('refresh_token');
    return this.http.post<Tokens>(apiUrl('token/refresh/'), { refresh })
      .pipe(map(tokens => {
        this.isRefreshing = false;
        this.saveTokens(tokens);
      }));
  }

  getUser() {
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

  isTokenExpiredButHasValidrefreshToken() {
    const token = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');
    return token && refresh && this.jwtHelper.isTokenExpired(token) && !this.jwtHelper.isTokenExpired(refresh);
  }

  isAccessTokenExpired() {
    const token = localStorage.getItem('access_token');
    return token && this.jwtHelper.isTokenExpired(token);
  }

  isRefreshTokenExpired() {
    const refresh = localStorage.getItem('refresh_token');
    return refresh && this.jwtHelper.isTokenExpired(refresh);
  }

  private setUser(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  private saveTokens(tokens: Tokens, username?: string) {
    localStorage.setItem('access_token', tokens.access);
    if (tokens.refresh) {
      localStorage.setItem('refresh_token', tokens.refresh);
    }
    if (username) {
      this.setUser({ username });
    }
  }
}
