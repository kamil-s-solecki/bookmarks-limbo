import { Injectable } from '@angular/core';
import { FilterTagsState } from './state/filter-tags-state';
import { Router, Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(private filterTagsState: FilterTagsState,
              private router: Router) { }

  navigateToList() {
    const queryParams: Params = { tags: this.filterTagsState.latest.join(',') };
    this.router.navigate([''], { queryParams });
  }
}
