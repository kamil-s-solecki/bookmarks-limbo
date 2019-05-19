import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Bookmark } from '../__models/bookmark';
import { QueryBus } from '../__services/query-handler/query-bus.service';
import { BookmarkQuery } from '../__services/query/bookmark.query';
import { Observable } from 'rxjs';
import { CommandBus } from '../__services/command-handler/command-bus.service';
import { AddOrUpdateBookmark } from '../__services/command/add-or-update-bookmark.command';

const urlReg = new RegExp('^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?([?][\\S]*)?$');

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
  isLoading = false;
  @ViewChild('inputTagElement') inputTagElement: ElementRef;

  private id: number | null = null;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private commandBus: CommandBus,
              private queryBus: QueryBus,
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
    this.isLoading = true;
    this.commandBus.execute(new AddOrUpdateBookmark(bookmark, () => this.isLoading = false));
  }

  private fetchBookmark() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id === null) {
      return;
    }
    this.id = +id;
    this.queryBus.query<Observable<Bookmark>>(new BookmarkQuery(this.id))
      .subscribe(bookmark => {
        this.bookmarkForm.patchValue(bookmark);
        this.tags = bookmark.tags as string[];
      });
  }
}
