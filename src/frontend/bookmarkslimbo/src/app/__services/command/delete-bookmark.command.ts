import { Command } from './command';
import { Bookmark } from 'src/app/__models/bookmark';

export class DeleteBookmark implements Command {
  name = 'delete_bookmark';
  constructor(public bookmark: Bookmark) {}
}
