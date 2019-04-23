import { Injectable } from '@angular/core';
import { BaseState } from './state';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterTagsState extends BaseState<string[]> {
  constructor(private activatedRoute: ActivatedRoute) {
    super();
  }

  protected preInitializeValue(): string[] {
    return [];
  }

  protected initialValue(): Observable<string[]> {
    return this.activatedRoute.queryParams.pipe(
      map(params => (params.tags || '').split(',').filter(v => !!v))
    );
  }
}
