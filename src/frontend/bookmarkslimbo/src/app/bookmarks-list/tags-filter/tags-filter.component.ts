import { Component, OnInit, Input } from '@angular/core';
import { CommandBus } from 'src/app/__services/command-handler/command-bus.service';
import { RemoveFilterTag } from 'src/app/__services/command/remove-filter-tag.command';
import { FilterTagsState } from 'src/app/__services/state/filter-tags-state';

@Component({
  selector: 'app-tags-filter',
  templateUrl: './tags-filter.component.html',
  styleUrls: ['./tags-filter.component.less']
})
export class TagsFilterComponent implements OnInit {
  filterTags: string[] = [];

  constructor(private commandBus: CommandBus,
              private filterTagsState: FilterTagsState) {}

  ngOnInit() {
    this.filterTagsState.subscribe(tags => this.filterTags = tags);
  }

  onClose(tag: string) {
    this.commandBus.execute(new RemoveFilterTag(tag));
  }
}
