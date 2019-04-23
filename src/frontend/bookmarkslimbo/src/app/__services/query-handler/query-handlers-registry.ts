import { Injectable } from '@angular/core';
import { BookmarkApi } from '../bookmark.api';
import { QueryHandler } from './query-handler';
import { BookmarkQueryHandler } from './bookmark.handler';

@Injectable({
  providedIn: 'root'
})
export class QueryHandlersRegistry {
  private _handlers: QueryHandler<any>[] = [];

  constructor(bookmarkApi: BookmarkApi) {
    this._handlers = [
      new BookmarkQueryHandler(bookmarkApi),
    ];
  }

  get handlers(): QueryHandler<any>[] {
    return this._handlers;
  }
}
