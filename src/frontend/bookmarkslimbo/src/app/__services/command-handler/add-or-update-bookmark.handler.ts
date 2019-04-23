import { CommandHandler } from './command-handler';
import { FilterTagsState } from '../state/filter-tags-state';
import { Params, Router } from '@angular/router';
import { BookmarksState } from '../state/bookmarks-state';
import { BookmarkApi } from '../bookmark.api';
import { AddOrUpdateBookmark } from '../command/add-or-update-bookmark.command';

export class AddOrUpdateBookmarkHandler implements CommandHandler {
  constructor(private bookmarkApi: BookmarkApi,
              private bookmarksState: BookmarksState,
              private filterTagsState: FilterTagsState,
              private router: Router) {}

  handle(command: AddOrUpdateBookmark) {
    const apiCall = command.bookmark.id
      ? b => this.bookmarkApi.put(b)
      : b => this.bookmarkApi.post(b);
    apiCall(command.bookmark).subscribe(_ => this.refreshAndNavigate());
  }

  private refreshAndNavigate() {
    this.bookmarkApi.getList(this.filterTagsState.latest)
      .subscribe(bookmarks => {
        this.bookmarksState.update(bookmarks);
        const queryParams: Params = { tags: this.filterTagsState.latest.join(',') };
        this.router.navigate([''], { queryParams });
      });
  }

  supports(name: string): boolean {
    return name === 'add_or_update_bookmark';
  }
}
