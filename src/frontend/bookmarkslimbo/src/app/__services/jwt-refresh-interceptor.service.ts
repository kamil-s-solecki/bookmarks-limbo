import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { concat } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import { RoutingService } from './routing.service';

@Injectable({
  providedIn: 'root'
})
export class JwtRefreshInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService,
              private http: HttpClient,
              private routingService: RoutingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAccessTokenExpired() && !this.authService.isRefreshing) {
      return this.handleExpired(request);
    }
    return next.handle(request);
  }

  private handleExpired(request: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (!this.authService.isRefreshTokenExpired()) {
      return this.authService.refresh()
        // tslint:disable-next-line
        .pipe(concat(this.http.request(request)));
    } else {
      this.authService.logout();
      this.routingService.navigateToLogin();
      return EMPTY;
    }
  }
}
