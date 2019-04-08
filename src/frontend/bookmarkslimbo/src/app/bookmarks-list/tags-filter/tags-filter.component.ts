import { Component, OnInit, Input } from '@angular/core';
import { FilterTagsService } from 'src/app/__services/filter-tags.service';

@Component({
  selector: 'app-tags-filter',
  templateUrl: './tags-filter.component.html',
  styleUrls: ['./tags-filter.component.less']
})
export class TagsFilterComponent {

  constructor(private filterTagsService: FilterTagsService) {}

  onClose(tag: string) {
    this.filterTagsService.remove(tag);
  }

  get filterTags() {
    return this.filterTagsService.filterTags;
  }
}
