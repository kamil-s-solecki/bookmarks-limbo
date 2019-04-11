import { Component, OnInit } from '@angular/core';
import { BookmarkApi } from '../__services/bookmark.api';
import { Bookmark } from '../__models/bookmark';
import { FilterTagsService } from '../__services/filter-tags.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.less']
})
export class BookmarksListComponent implements OnInit {
  bookmarks: Bookmark[];
  editing = false;

  constructor(private bookmarkApi: BookmarkApi,
              private filterTagsService: FilterTagsService,
              private router: Router) { }

  ngOnInit() {
    this.fetchBookmarks();
    this.filterTagsService.onChange(_ => this.fetchBookmarks());
  }

  private fetchBookmarks() {
    this.bookmarkApi.getList(this.filterTags)
      .subscribe(bookmarks => this.bookmarks = bookmarks);
  }

  get filterTags() {
    return this.filterTagsService.filterTags;
  }

  onTagClick(tag: string) {
    this.filterTagsService.add(tag);
  }

  add() {
    this.router.navigateByUrl('bookmark/add');
  }
}
