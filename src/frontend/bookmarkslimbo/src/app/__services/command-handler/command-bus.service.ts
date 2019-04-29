import { Injectable } from '@angular/core';
import { Command } from '../command/command';
import { CommandHandlersRegistry } from './command-handlers-registry';

@Injectable({
  providedIn: 'root'
})
export class CommandBus {

  constructor(private registry: CommandHandlersRegistry) { }

  execute(command: Command) {
    this.registry.handlers.forEach(handler => {
      if (handler.supports(command.name)) {
        handler.handle(command);
      }
    });
  }
}
