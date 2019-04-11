import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterTagsService {

  private _filterTags: string[];

  private onChange$: Subject<string[]> = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      this._filterTags = (params.tags || '').split(',').filter(v => !!v);
    });
  }

  get filterTags() {
    return this._filterTags;
  }

  remove(tag) {
    this._filterTags = this._filterTags.filter(t => t !== tag);
    this.navigate();
  }

  add(tag) {
    if (this._filterTags.includes(tag)) {
      return;
    }
    this._filterTags.push(tag);
    this.navigate();
  }

  private navigate() {
    const queryParams: Params = { tags: this._filterTags.join(',') };
    this.router.navigate([''], { queryParams });
    this.onChange$.next(this._filterTags);
  }

  onChange(next: (value: string[]) => void) {
    this.onChange$.subscribe(next, null, null);
  }
}
