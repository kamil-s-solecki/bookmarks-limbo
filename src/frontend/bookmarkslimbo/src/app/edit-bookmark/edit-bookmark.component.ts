import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Bookmark } from '../__models/bookmark';
import { BookmarkApi } from '../__services/bookmark.api';

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

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private bookmarkApi: BookmarkApi) { }

  ngOnInit() {
    this.bookmarkForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      link: [null, [Validators.pattern(urlReg), Validators.required]],
      description: [null, []],
      expiration: [null, [Validators.required]],
    });
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

  cancel() {
    this.router.navigateByUrl('');
  }

  submit() {
    if (!this.bookmarkForm.valid) {
      Object.keys(this.bookmarkForm.controls).forEach(field => {
        this.bookmarkForm.get(field).markAsTouched({ onlySelf: true });
        this.bookmarkForm.get(field).updateValueAndValidity({ onlySelf: true });
      })
      return;
    }
    const bookmark = this.bookmarkForm.value as Bookmark;
    bookmark.tags = this.tags;
    this.bookmarkApi.post(bookmark).subscribe(_ => this.router.navigateByUrl(''));
  }
}
