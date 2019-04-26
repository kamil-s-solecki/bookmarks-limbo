import { CommandHandler } from './command-handler';
import { BookmarksState } from '../state/bookmarks-state';
import { BookmarkApi } from '../bookmark.api';
import { DeleteBookmark } from '../command/delete-bookmark.command';
import { RoutingService } from '../routing.service';

export class DeleteBookmarkHandler implements CommandHandler {
  constructor(private bookmarkApi: BookmarkApi,
              private bookmarksState: BookmarksState,
              private routingService: RoutingService) {}

  handle(command: DeleteBookmark) {
    this.bookmarkApi.delete(command.bookmark).subscribe(_ => this.refreshAndNavigate());
  }

  private refreshAndNavigate() {
    this.bookmarksState.refresh(() => this.routingService.navigateToList());
  }

  supports(name: string): boolean {
    return name === 'delete_bookmark';
  }
}
