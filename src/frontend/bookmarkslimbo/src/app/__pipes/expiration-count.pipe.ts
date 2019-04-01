import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const units = ['year', 'month', 'day', 'hour', 'minute'];

@Pipe({
  name: 'expirationCount'
})
export class ExpirationCountPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.expirationCount(moment(), moment(value));
  }

  expirationCount(now: moment.Moment, later: moment.Moment) {
    const diffs = units.map(unit => this.diffOrNull(now, later, unit));
    const firstNotNull = diffs.indexOf(diffs.filter(v => null != v)[0]);
    return firstNotNull !== -1
      ? [diffs[firstNotNull], diffs[firstNotNull + 1]]
          .filter(v => null != v)
          .reduce((a, b) => `${a}, ${b}`)
      : 'less than a minute!';

  }

  private diffOrNull(now: moment.Moment, later: moment.Moment, unit: string): string | null {
    const diff = this.diff(now, later, unit);
    return diff > 0
      ? `${diff} ${unit}s`
      : null;
  }

  private diff(now: moment.Moment, later: moment.Moment, unit): number {
    if (unit === 'day') {
      return this.daysDiff(now, later);
    }
    const diff = later.diff(now, unit);
    const modulo = this.modulo(unit);
    return modulo ? diff % modulo : diff;
  }

  private daysDiff(now: moment.Moment, later: moment.Moment): number {
    if (later.date() >= now.date()) {
      const laterMonth = later.get('month');
      return later.diff(moment(now).month(laterMonth), 'day');
    } else {
      return later.date() + (now.daysInMonth() - now.date());
    }
  }

  private modulo(unit): number | null {
    return {
      year: null,
      month: 12,
      hour: 24,
      minute: 60,
    }[unit];
  }
}
