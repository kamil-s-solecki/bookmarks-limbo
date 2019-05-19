import { Command } from './command';
import { Bookmark } from 'src/app/__models/bookmark';

const doNothing = () => {};
export class AddOrUpdateBookmark implements Command {
  name = 'add_or_update_bookmark';
  constructor(public bookmark: Bookmark, public andThen = doNothing) {}
}
