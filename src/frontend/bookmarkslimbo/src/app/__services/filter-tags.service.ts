import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BookmarkService } from './bookmark.service';

@Injectable({
  providedIn: 'root'
})
export class FilterTagsService {

  private _filterTags: string[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private bookmarksService: BookmarkService) {
      this.activatedRoute.queryParams.subscribe(params => {
        this._filterTags = (params.tags || '').split(',').filter(v => !!v);
      });
  }

  get filterTags() {
    return this._filterTags;
  }

  remove(tag) {
    if (this._filterTags.indexOf(tag) === -1) {
      return;
    }
    this._filterTags = this._filterTags.filter(t => t !== tag);
    this.refreshAndNavigate();
  }

  add(tag) {
    if (this._filterTags.includes(tag)) {
      return;
    }
    this._filterTags.push(tag);
    this.refreshAndNavigate();
  }

  private refreshAndNavigate() {
    this.bookmarksService.refresh(this._filterTags);
    const queryParams: Params = { tags: this._filterTags.join(',') };
    this.router.navigate([''], { queryParams });
  }
}
