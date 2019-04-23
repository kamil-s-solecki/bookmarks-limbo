import { Command } from './command';
import { Bookmark } from 'src/app/__models/bookmark';

export class AddOrUpdateBookmark implements Command {
  name = 'add_or_update_bookmark';
  constructor(public bookmark: Bookmark) {}
}
