import { QueryHandler } from './query-handler';
import { Bookmark } from 'src/app/__models/bookmark';
import { BookmarkQuery } from '../query/bookmark.query';
import { Observable } from 'rxjs';
import { BookmarkApi } from '../bookmark.api';

export class BookmarkQueryHandler implements QueryHandler<Observable<Bookmark>> {
  constructor(private bookmarApi: BookmarkApi) {}

  handle(query: BookmarkQuery): Observable<Bookmark> {
    return this.bookmarApi.get(query.id);
  }

  supports(name: string): boolean {
    return name === 'bookmark_query';
  }
}
