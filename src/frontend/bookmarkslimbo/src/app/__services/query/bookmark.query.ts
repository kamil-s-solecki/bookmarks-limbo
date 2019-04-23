import { Query } from './query';

export class BookmarkQuery implements Query {
  name = 'bookmark_query';

  constructor(public readonly id: number) { }
}
