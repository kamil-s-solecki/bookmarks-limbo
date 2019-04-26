import { CommandHandler } from './command-handler';
import { FilterTagsState } from '../state/filter-tags-state';
import { Params, Router } from '@angular/router';
import { BookmarksState } from '../state/bookmarks-state';
import { BookmarkApi } from '../bookmark.api';
import { DeleteBookmark } from '../command/delete-bookmark.command';

export class DeleteBookmarkHandler implements CommandHandler {
  constructor(private bookmarkApi: BookmarkApi,
              private bookmarksState: BookmarksState,
              private filterTagsState: FilterTagsState,
              private router: Router) {}

  handle(command: DeleteBookmark) {
    this.bookmarkApi.delete(command.bookmark).subscribe(_ => this.refreshAndNavigate());
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
    return name === 'delete_bookmark';
  }
}
