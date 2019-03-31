import { Component, OnInit } from '@angular/core';
import { BookmarkApi } from '../__services/bookmark.api';
import { Bookmark } from '../__models/bookmark';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.less']
})
export class BookmarksListComponent implements OnInit {
  bookmarks: Bookmark[];

  constructor(private bookmarkApi: BookmarkApi) { }

  ngOnInit() {
    this.bookmarkApi.getList().subscribe(bookmarks => this.bookmarks = bookmarks);
  }
}
