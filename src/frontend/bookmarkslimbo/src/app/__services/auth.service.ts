import { Injectable } from '@angular/core';
import { User } from '../__models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = null;

  isAuthenticated() {
    return !!this.user;
  }

  login(username: string, password: string): Observable<any> {
    if (password === 'password') {
      this.user = { username };
      return of(null);
    } else {
      return new Observable(subscriber => subscriber.error());
    }
  }

  logout() {
    this.user = null;
  }
}
