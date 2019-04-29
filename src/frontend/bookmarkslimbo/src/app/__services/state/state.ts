import { BehaviorSubject, Observable } from 'rxjs';
import { flatMap, first } from 'rxjs/operators';

export interface State<T> {
  initialized: boolean;
  loading: boolean;
  subscribe(observer: (v: T) => void);
  update(t: T);
}

export abstract class BaseState<T> implements State<T> {
  protected _latest;

  initialized = false;
  private _loading = true;

  subject$ = new BehaviorSubject<T>(this.preInitializeValue());
  loading$ = new BehaviorSubject<boolean>(false);

  update(t: T) {
    this.subject$.next(t);
    this.loading$.next(false);
    this._loading = false;
    this.initialized = true;
    this._latest = t;
  }

  subscribe(observer: (v: T) => void) {
    if (!this.initialized) {
      this.initialValue().subscribe(t => this.update(t));
    }
    return this.subject$.subscribe(observer);
  }

  flatMapFirst<S>(fun: (v: T) => Observable<S>): Observable<S> {
    if (!this.initialized) {
      this.initialValue().subscribe(t => this.update(t));
    }
    return this.subject$.pipe(first(), flatMap(fun));
  }

  get latest(): T {
    return this._latest || this.preInitializeValue();
  }

  get loading() {
    return this._loading;
  }

  loadingInProgress() {
    this.loading$.next(true);
    this._loading = true;
  }

  protected preInitializeValue(): T {
    return null;
  }

  protected abstract initialValue(): Observable<T>;
}
