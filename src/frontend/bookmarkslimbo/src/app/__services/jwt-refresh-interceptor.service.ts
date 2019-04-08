import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { concat } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtRefreshInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private http: HttpClient) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isTokenExpiredButHasValidrefreshToken() && !this.authService.isRefreshing) {
      return this.authService.refresh()
        // tslint:disable-next-line
        .pipe(concat(this.http.request(request)));
    }
    return next.handle(request);
  }
}
