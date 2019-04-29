import { Component, OnInit } from '@angular/core';
import { BookmarksState } from '../__services/state/bookmarks-state';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less'],
  animations: [
    trigger('showHide', [
      state('shown', style({
        opacity: 1,
      })),
      state('hidden', style({
        opacity: 0,
      })),
      transition('shown => hidden', [
        animate('0s'),
      ]),
      transition('hidden => shown', [
        animate('0.1s'),
      ]),
    ])
  ]
})
export class MainComponent implements OnInit {
  loading = true;

  constructor(private bookmarksState: BookmarksState) { }

  ngOnInit() {
    this.bookmarksState.loading$.subscribe(value => this.loading = value);
  }

}
