import { Command } from './command';

export class RemoveFilterTag implements Command {
  name = 'remove_filter_tag';
  constructor(public tag: string) {}
}
