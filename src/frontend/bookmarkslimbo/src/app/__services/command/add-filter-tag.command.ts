import { Command } from './command';

export class AddFilterTag implements Command {
  name = 'add_filter_tag';
  constructor(public tag: string) {}
}
