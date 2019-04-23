import { Injectable } from '@angular/core';
import { Command } from '../command/command';
import { QueryHandlersRegistry } from './query-handlers-registry';

@Injectable({
  providedIn: 'root'
})
export class QueryBus {

  constructor(private registry: QueryHandlersRegistry) { }

  query<T>(command: Command): T {
    let result: T = null;
    this.registry.handlers.forEach(handler => {
      if (handler.supports(command.name)) {
        result = handler.handle(command) as T;
      }
    });
    return result;
  }
}
