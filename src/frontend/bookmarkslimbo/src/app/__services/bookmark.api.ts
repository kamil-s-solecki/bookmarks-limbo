import { Injectable } from '@angular/core';
import { Bookmark } from '../__models/bookmark';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmarkApi {

  private bookmarks: Bookmark[] = [
    {
      title: "How to grow a cherry tree",
      description: "A cherry tree growing guide",
      link: "https://www.how-to-grow.com/trees/cherry",
      expiration: "2020-01-03T12:00:00Z",
      tags: []
    },
    {
      title: "How to grow a lemon tree",
      description: "A lemon tree growing guide",
      link: "https://www.how-to-grow.com/trees/lemon",
      expiration: "2020-05-03T12:40:00Z",
      tags: []
    },
    {
      title: "Investing in exclusive toilet paper holders",
      link: "https://www.how-to-grow.com/trees/lemon",
      expiration: "2020-05-03T12:40:00Z",
      tags: []
    }
  ]

  constructor() { }

  getList(): Observable<Bookmark[]> {
    return of(this.bookmarks);
  }
}
