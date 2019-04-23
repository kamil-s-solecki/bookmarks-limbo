import { Command } from '../command/command';

export interface CommandHandler {
  handle(command: any & Command);

  supports(name: string): boolean;
}
