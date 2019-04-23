import { BehaviorSubject, Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';

export interface State<T> {
  initialized: boolean;
  loading: boolean;
  subscribe(observer: (v: T) => void);
  update(t: T);
}

export abstract class BaseState<T> implements State<T> {
  protected _latest;

  initialized = false;
  loading = false;

  subject$ = new BehaviorSubject<T>(this.preInitializeValue());

  update(t: T) {
    this.subject$.next(t);
    this.loading = false;
    this.initialized = true;
    this._latest = t;
  }

  subscribe(observer: (v: T) => void) {
    if (!this.initialized) {
      this.initialValue().subscribe(t => this.update(t));
    }
    return this.subject$.subscribe(observer);
  }

  flatMap<S>(fun: (v: T) => Observable<S>): Observable<S> {
    if (!this.initialized) {
      this.initialValue().subscribe(t => this.update(t));
    }
    return this.subject$.pipe(flatMap(fun));
  }

  get latest(): T {
    return this._latest || this.preInitializeValue();
  }

  protected preInitializeValue(): T {
    return null;
  }

  protected abstract initialValue(): Observable<T>;
}
