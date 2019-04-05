import { Injectable } from '@angular/core';
import { Bookmark } from '../__models/bookmark';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '../__utils/urls';

@Injectable({
  providedIn: 'root'
})
export class BookmarkApi {

  private bookmarks: Bookmark[] = [
    {
      title: 'How to grow a cherry tree',
      description: 'A cherry tree growing guide',
      link: 'https://www.how-to-grow.com/trees/cherry',
      expiration: '2020-01-03T12:00:00Z',
      tags: ['plants', 'hot', 'bucket list']
    },
    {
      title: 'How to grow a lemon tree',
      description: 'A lemon tree growing guide',
      link: 'https://www.how-to-grow.com/trees/lemon',
      expiration: '2020-05-03T12:40:00Z',
      tags: ['plants']
    },
    {
      title: 'Investing in exclusive toilet paper holders',
      link: 'https://www.berich.com/articles/toilet_paper_is_the_new_sexy.php',
      expiration: '2020-05-03T12:40:00Z',
      tags: ['hot', 'money', 'investing', 'fun']
    }
  ];

  constructor(private http: HttpClient) { }

  getList(): Observable<Bookmark[]> {
    return this.http.get<Bookmark[]>(apiUrl('bookmarks/'));
  }
}
