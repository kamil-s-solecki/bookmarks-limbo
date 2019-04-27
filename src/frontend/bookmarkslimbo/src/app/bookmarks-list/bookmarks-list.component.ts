import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../__models/bookmark';
import { Router } from '@angular/router';
import { BookmarksState } from '../__services/state/bookmarks-state';
import { CommandBus } from '../__services/command-handler/command-bus.service';
import { AddFilterTag } from '../__services/command/add-filter-tag.command';
import { FilterTagsState } from '../__services/state/filter-tags-state';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { DeleteBookmark } from '../__services/command/delete-bookmark.command';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.less']
})
export class BookmarksListComponent implements OnInit {
  bookmarks: Bookmark[];
  filterTags = [];

  constructor(private bookmarksState: BookmarksState,
              private commandBus: CommandBus,
              private filterTagsState: FilterTagsState,
              private router: Router,
              private modalService: NzModalService,
              private message: NzMessageService) { }

  ngOnInit() {
    this.filterTagsState.subscribe(tags => this.filterTags = tags);
    this.bookmarksState.subscribe(bookmarks => this.bookmarks = bookmarks);
  }

  onTagClick(tag: string) {
    this.commandBus.execute(new AddFilterTag(tag));
  }

  add() {
    this.router.navigateByUrl('bookmark/add');
  }

  delete(bookmark: Bookmark) {
    const onOk = () => this.commandBus.execute(new DeleteBookmark(bookmark));
    this.modalConfirm('Are you sure?', 'danger', onOk);
  }

  done(bookmark: Bookmark) {
    const onOk = () => {
      this.commandBus.execute(new DeleteBookmark(bookmark))
      this.message.create('success', 'Congrats! You did it!')
    };
    this.modalConfirm('Wow! Did you really do it?', 'primary', onOk);
  }

  open(url) {
    window.open(url, '_blank');
  }

  private modalConfirm(title: string, okType: string, onOk: () => void) {
    this.modalService.confirm({
      nzTitle: title,
      nzOkText: 'Yes',
      nzOkType: okType,
      nzOnOk: onOk,
      nzCancelText: 'No',
    });
  }
}
