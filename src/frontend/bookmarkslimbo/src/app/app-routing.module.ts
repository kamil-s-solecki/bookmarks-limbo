import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { EditBookmarkComponent } from './edit-bookmark/edit-bookmark.component';
import { BookmarksListComponent } from './bookmarks-list/bookmarks-list.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: BookmarksListComponent, canActivate: [AuthGuard] },
  { path: 'bookmark/add', component: EditBookmarkComponent, canActivate: [AuthGuard] },
  { path: 'bookmark/:id/edit', component: EditBookmarkComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
