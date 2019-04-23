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
      console.log(handler);
      if (handler.supports(command.name)) {
        console.log('supports!');
        handler.handle(command);
      }
    });
  }
}
