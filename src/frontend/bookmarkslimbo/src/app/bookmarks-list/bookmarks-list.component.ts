import { Component, OnInit } from '@angular/core';
import { BookmarkApi } from '../__services/bookmark.api';
import { Bookmark } from '../__models/bookmark';
import { FilterTagsService } from '../__services/filter-tags.service';
import { Router } from '@angular/router';
import { BookmarkService } from '../__services/bookmark.service';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.less']
})
export class BookmarksListComponent implements OnInit {
  bookmarks: Bookmark[];
  editing = false;

  constructor(private bookmarkService: BookmarkService,
              private filterTagsService: FilterTagsService,
              private router: Router) { }

  ngOnInit() {
    this.bookmarkService.subscribe(bookmarks => this.bookmarks = bookmarks);
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
