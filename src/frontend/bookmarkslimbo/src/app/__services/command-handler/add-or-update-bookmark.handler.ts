import { CommandHandler } from './command-handler';
import { BookmarksState } from '../state/bookmarks-state';
import { BookmarkApi } from '../bookmark.api';
import { AddOrUpdateBookmark } from '../command/add-or-update-bookmark.command';
import { RoutingService } from '../routing.service';

export class AddOrUpdateBookmarkHandler implements CommandHandler {
  constructor(private bookmarkApi: BookmarkApi,
              private bookmarksState: BookmarksState,
              private routingService: RoutingService) {}

  handle(command: AddOrUpdateBookmark) {
    const apiCall = command.bookmark.id
      ? b => this.bookmarkApi.put(b)
      : b => this.bookmarkApi.post(b);
    apiCall(command.bookmark).subscribe(_ => this.refreshAndNavigate());
  }

  private refreshAndNavigate() {
    this.bookmarksState.refresh(() => this.routingService.navigateToList());
  }

  supports(name: string): boolean {
    return name === 'add_or_update_bookmark';
  }
}
