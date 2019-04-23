import { CommandHandler } from './command-handler';
import { AddFilterTag } from '../command/add-filter-tag.command';
import { FilterTagsState } from '../state/filter-tags-state';
import { Params, Router } from '@angular/router';
import { BookmarkApi } from '../bookmark.api';
import { BookmarksState } from '../state/bookmarks-state';

export class AddFilterTagHandler implements CommandHandler {
  constructor(private bookmarkApi: BookmarkApi,
              private bookmarksState: BookmarksState,
              private filterTagState: FilterTagsState,
              private router: Router) {}

  handle(command: AddFilterTag) {
    if (this.filterTagState.latest.includes(command.tag)) {
      return;
    }
    const updatedTags = [...this.filterTagState.latest, command.tag];
    this.filterTagState.update(updatedTags);
    this.refreshAndNavigate(updatedTags);
  }

  private refreshAndNavigate(updatedTags: string[]) {
    const queryParams: Params = { tags: updatedTags.join(',') };
    this.router.navigate([''], { queryParams });
    this.bookmarkApi.getList(updatedTags)
      .subscribe(bookmarks => this.bookmarksState.update(bookmarks));
  }

  supports(name: string): boolean {
    return name === 'add_filter_tag';
  }
}
