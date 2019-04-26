import { CommandHandler } from './command-handler';
import { AddFilterTag } from '../command/add-filter-tag.command';
import { FilterTagsState } from '../state/filter-tags-state';
import { BookmarksState } from '../state/bookmarks-state';
import { RoutingService } from '../routing.service';

export class AddFilterTagHandler implements CommandHandler {
  constructor(private bookmarksState: BookmarksState,
              private filterTagState: FilterTagsState,
              private routingService: RoutingService) {}

  handle(command: AddFilterTag) {
    if (this.filterTagState.latest.includes(command.tag)) {
      return;
    }
    const updatedTags = [...this.filterTagState.latest, command.tag];
    this.filterTagState.update(updatedTags);
    this.refreshAndNavigate();
  }

  private refreshAndNavigate() {
    this.bookmarksState.refresh(() => this.routingService.navigateToList());
  }

  supports(name: string): boolean {
    return name === 'add_filter_tag';
  }
}
