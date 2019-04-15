import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Bookmark } from '../__models/bookmark';
import { BookmarkApi } from '../__services/bookmark.api';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { BookmarkService } from '../__services/bookmark.service';

const urlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.less']
})
export class EditBookmarkComponent implements OnInit {
  bookmarkForm: FormGroup;

  tags: string[] = [];
  inputTagVisible = false;
  inputTagValue = '';
  @ViewChild('inputTagElement') inputTagElement: ElementRef;

  private id: number | null = null;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private bookmarkApi: BookmarkApi,
              private bookmarkService: BookmarkService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.bookmarkForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      link: [null, [Validators.pattern(urlReg), Validators.required]],
      description: [null, []],
      expiration: [null, [Validators.required]],
    });
    this.fetchBookmark();
  }

  showTagInput(): void {
    this.inputTagVisible = true;
    setTimeout(() => {
      this.inputTagElement.nativeElement.focus();
    }, 10);
  }

  handleInputTagConfirm(): void {
    if (this.inputTagValue && this.tags.indexOf(this.inputTagValue) === -1) {
      this.tags = [...this.tags, this.inputTagValue];
    }
    this.inputTagValue = '';
    this.inputTagVisible = false;
  }

  handleTagClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  get cardAction(): string {
    return this.id ? 'edit' : 'add';
  }

  cancel() {
    this.router.navigateByUrl('');
  }

  submit() {
    if (!this.bookmarkForm.valid) {
      Object.keys(this.bookmarkForm.controls).forEach(field => {
        this.bookmarkForm.get(field).markAsTouched({ onlySelf: true });
        this.bookmarkForm.get(field).updateValueAndValidity({ onlySelf: true });
      });
      return;
    }
    const bookmark = this.bookmarkForm.value as Bookmark;
    bookmark.tags = this.tags;
    bookmark.id = this.id;
    this.bookmarkService.push(bookmark).subscribe(_ => this.router.navigateByUrl(''));
  }

  private fetchBookmark() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }
    this.id = +id;
    this.bookmarkService.getById(this.id).subscribe(bookmark => {
      this.bookmarkForm.patchValue(bookmark);
      this.tags = bookmark.tags as string[];
    });
  }
}
