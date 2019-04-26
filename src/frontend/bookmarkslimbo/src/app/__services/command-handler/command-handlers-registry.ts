import { Injectable } from '@angular/core';
import { CommandHandler } from './command-handler';
import { FilterTagsState } from '../state/filter-tags-state';
import { AddFilterTagHandler } from './add-filter-tag.handler';
import { RemoveFilterTagHandler } from './remove-filter-tag.handler';
import { BookmarkApi } from '../bookmark.api';
import { BookmarksState } from '../state/bookmarks-state';
import { AddOrUpdateBookmarkHandler } from './add-or-update-bookmark.handler';
import { DeleteBookmarkHandler } from './delete-bookmark.handler';
import { RoutingService } from '../routing.service';

@Injectable({
  providedIn: 'root'
})
export class CommandHandlersRegistry {
  private _handlers: CommandHandler[] = [];

  constructor(bookmarkApi: BookmarkApi,
              bookmarksState: BookmarksState,
              filterTagsState: FilterTagsState,
              routingService: RoutingService) {
    this._handlers = [
      new AddFilterTagHandler(bookmarksState, filterTagsState, routingService),
      new AddOrUpdateBookmarkHandler(bookmarkApi, bookmarksState, routingService),
      new DeleteBookmarkHandler(bookmarkApi, bookmarksState, routingService),
      new RemoveFilterTagHandler(bookmarksState, filterTagsState, routingService),
    ];
  }

  get handlers(): CommandHandler[] {
    return this._handlers;
  }
}
