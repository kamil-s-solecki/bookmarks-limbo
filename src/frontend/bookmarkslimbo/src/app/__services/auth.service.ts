import { Injectable } from '@angular/core';
import { User } from '../__models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = null;

  isAuthenticated() {
    // return null !== this.getUser();
    return true;
  }

  login(username: string, password: string): Observable<any> {
    if (password === 'password') {
      this.setUser({ username });
      return of(null);
    } else {
      return new Observable(subscriber => subscriber.error());
    }
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
    localStorage.removeItem('user');
  }

  private setUser(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }
}
