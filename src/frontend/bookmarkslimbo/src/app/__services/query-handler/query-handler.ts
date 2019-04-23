import { Query } from '../query/query';

export interface QueryHandler<T> {
  handle(query: any & Query): T;

  supports(name: string): boolean;
}
