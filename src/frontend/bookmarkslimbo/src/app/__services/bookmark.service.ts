import { Injectable } from '@angular/core';
import { BookmarkApi } from './bookmark.api';
import { Bookmark } from '../__models/bookmark';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  private bookmarks$ = new BehaviorSubject<Bookmark[]>([]);

  private _loading: boolean;

  constructor(private bookmarkApi: BookmarkApi) {
    this.refresh();
  }

  public refresh(tags = []) {
    this._loading = true;
    this.bookmarkApi.getList(tags).subscribe(result => {
      this._loading = false;
      this.bookmarks$.next(result);
    });
  }

  public subscribe(observer: (v: Bookmark[]) => void) {
    return this.bookmarks$.subscribe(observer);
  }

  public get loading() {
    return this.loading;
  }

  public getById(id: number): Observable<Bookmark> {
    return this.bookmarks$.pipe(
      map(
        bookmarks => bookmarks.filter(b => b.id === id)[0]
      )
    );
  }

  public push(bookmark: Bookmark): Observable<Bookmark> {
    const observable = bookmark.id === null
      ? this.bookmarkApi.post(bookmark)
      : this.bookmarkApi.put(bookmark);
    return observable.pipe(
      map(id => {
        this.refresh();
        return id;
      }),
    );
  }
}
