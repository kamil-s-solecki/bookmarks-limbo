import { Injectable } from '@angular/core';
import { Bookmark } from 'src/app/__models/bookmark';
import { BaseState } from './state';
import { Observable } from 'rxjs';
import { BookmarkApi } from '../bookmark.api';
import { FilterTagsState } from './filter-tags-state';

const doNothing = () => {};

@Injectable({
  providedIn: 'root'
})
export class BookmarksState extends BaseState<Bookmark[]> {
  constructor(private bookmarkApi: BookmarkApi,
              private filterTagsState: FilterTagsState) {
    super();
  }

  protected preInitializeValue(): Bookmark[] {
    return [];
  }

  protected initialValue(): Observable<Bookmark[]> {
    return this.filterTagsState.flatMapFirst(tags => this.bookmarkApi.getList(tags));
  }

  refresh(andThen: () => void = doNothing) {
    this.loadingInProgress();
    this.bookmarkApi.getList(this.filterTagsState.latest)
      .subscribe(bookmarks => {
        this.update(bookmarks);
        andThen();
      });
  }
}
