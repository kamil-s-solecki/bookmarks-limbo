import { Injectable } from '@angular/core';
import { Bookmark } from '../__models/bookmark';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiUrl } from '../__utils/urls';

@Injectable({
  providedIn: 'root'
})
export class BookmarkApi {

  constructor(private http: HttpClient) { }

  getList(tags: string[]): Observable<Bookmark[]> {
    let params = new HttpParams();
    if (tags.length > 0) {
      params = params.set('tags', tags.join(','));
    }
    return this.http.get<Bookmark[]>(apiUrl('bookmarks/'), { params });
  }

  post(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(apiUrl('bookmarks/'), bookmark);
  }
}
