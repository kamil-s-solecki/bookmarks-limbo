import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, NgZorroAntdModule, NZ_I18N, NzMenuModule } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';
import { ExpirationCountPipe } from './__pipes/expiration-count.pipe';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtRefreshInterceptorService } from './__services/jwt-refresh-interceptor.service';
import { TagsFilterComponent } from './bookmarks-list/tags-filter/tags-filter.component';
import { EditBookmarkComponent } from './edit-bookmark/edit-bookmark.component';
import { RegisterComponent } from './register/register.component';

registerLocaleData(en);

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    BookmarksListComponent,
    ExpirationCountPipe,
    TagsFilterComponent,
    EditBookmarkComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:8000', 'bookmarks-limbo.herokuapp.com'],
      }
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtRefreshInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
