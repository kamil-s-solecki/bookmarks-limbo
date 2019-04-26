import { Injectable } from '@angular/core';
import { CommandHandler } from './command-handler';
import { FilterTagsState } from '../state/filter-tags-state';
import { AddFilterTagHandler } from './add-filter-tag.handler';
import { Router } from '@angular/router';
import { RemoveFilterTagHandler } from './remove-filter-tag.handler';
import { BookmarkApi } from '../bookmark.api';
import { BookmarksState } from '../state/bookmarks-state';
import { AddOrUpdateBookmarkHandler } from './add-or-update-bookmark.handler';
import { DeleteBookmarkHandler } from './delete-bookmark.handler';

@Injectable({
  providedIn: 'root'
})
export class CommandHandlersRegistry {
  private _handlers: CommandHandler[] = [];

  constructor(bookmarkApi: BookmarkApi,
              bookmarksState: BookmarksState,
              filterTagsState: FilterTagsState,
              router: Router) {
    this._handlers = [
      new AddFilterTagHandler(bookmarkApi, bookmarksState, filterTagsState, router),
      new AddOrUpdateBookmarkHandler(bookmarkApi, bookmarksState, filterTagsState, router),
      new DeleteBookmarkHandler(bookmarkApi, bookmarksState, filterTagsState, router),
      new RemoveFilterTagHandler(bookmarkApi, bookmarksState, filterTagsState, router),
    ];
  }

  get handlers(): CommandHandler[] {
    return this._handlers;
  }
}
