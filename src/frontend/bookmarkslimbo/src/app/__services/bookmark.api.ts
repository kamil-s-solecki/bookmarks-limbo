import { Injectable } from '@angular/core';
import { Bookmark } from '../__models/bookmark';
import { Observable } from 'rxjs';
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

  get(id: number): Observable<Bookmark> {
    return this.http.get<Bookmark>(apiUrl(`bookmarks/${id}/`));
  }

  post(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.post<Bookmark>(apiUrl('bookmarks/'), bookmark);
  }

  put(bookmark: Bookmark): Observable<Bookmark> {
    return this.http.put<Bookmark>(apiUrl(`bookmarks/${bookmark.id}/`), bookmark);
  }

  delete(bookmark: Bookmark): Observable<any> {
    return this.http.delete<any>(apiUrl(`bookmarks/${bookmark.id}/`));
  }
}
