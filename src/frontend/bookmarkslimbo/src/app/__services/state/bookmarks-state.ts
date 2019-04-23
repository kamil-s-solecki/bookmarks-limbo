import { Injectable } from '@angular/core';
import { Bookmark } from 'src/app/__models/bookmark';
import { BaseState } from './state';
import { Observable } from 'rxjs';
import { BookmarkApi } from '../bookmark.api';
import { FilterTagsState } from './filter-tags-state';

@Injectable({
  providedIn: 'root'
})
export class BookmarksState extends BaseState<Bookmark[]> {
  constructor(private bookmarkApi: BookmarkApi,
              private filterTagState: FilterTagsState) {
    super();
  }

  protected preInitializeValue(): Bookmark[] {
    return [];
  }

  protected initialValue(): Observable<Bookmark[]> {
    return this.filterTagState.flatMap(tags => this.bookmarkApi.getList(tags));
  }
}
