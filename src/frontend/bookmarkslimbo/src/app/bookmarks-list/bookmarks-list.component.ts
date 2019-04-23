import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../__models/bookmark';
import { Router } from '@angular/router';
import { BookmarksState } from '../__services/state/bookmarks-state';
import { CommandBus } from '../__services/command-handler/command-bus.service';
import { AddFilterTag } from '../__services/command/add-filter-tag.command';
import { FilterTagsState } from '../__services/state/filter-tags-state';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.less']
})
export class BookmarksListComponent implements OnInit {
  bookmarks: Bookmark[];
  filterTags = [];

  constructor(private bookmarksState: BookmarksState,
              private commandBus: CommandBus,
              private filterTagsState: FilterTagsState,
              private router: Router) { }

  ngOnInit() {
    this.filterTagsState.subscribe(tags => this.filterTags = tags);
    this.bookmarksState.subscribe(bookmarks => this.bookmarks = bookmarks);
  }

  onTagClick(tag: string) {
    this.commandBus.execute(new AddFilterTag(tag));
  }

  add() {
    this.router.navigateByUrl('bookmark/add');
  }
}
