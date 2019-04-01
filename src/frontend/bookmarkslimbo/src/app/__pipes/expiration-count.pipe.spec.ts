import { ExpirationCountPipe } from './expiration-count.pipe';
import * as moment from 'moment';

describe('ExpirationCountPipe', () => {
  const pipe = new ExpirationCountPipe();

  it('counts years', () => {
    const later = moment('2003-01-01');
    const now = moment('2000-01-01');

    expect(pipe.expirationCount(now, later)).toBe('3 years');
  });

  it('counts months', () => {
    const later = moment('2000-04-01');
    const now = moment('2000-01-01');

    expect(pipe.expirationCount(now, later)).toBe('3 months');
  });

  it('counts years and months', () => {
    const later = moment('2003-04-01');
    const now = moment('2000-01-01');

    expect(pipe.expirationCount(now, later)).toBe('3 years, 3 months');
  });

  it('counts months and days', () => {
    const later = moment('2000-04-10');
    const now = moment('2000-01-01');

    expect(pipe.expirationCount(now, later)).toBe('3 months, 9 days');
  });

  it('counts days between months', () => {
    const later = moment('2000-04-02');
    const now = moment('2000-03-30');

    expect(pipe.expirationCount(now, later)).toBe('3 days');
  });

  it('counts hours', () => {
    const later = moment('2000-01-01T03:00:00');
    const now = moment('2000-01-01T00:00:00');

    expect(pipe.expirationCount(now, later)).toBe('3 hours');
  });

  it('counts minutes', () => {
    const later = moment('2000-01-01T00:03:00');
    const now = moment('2000-01-01T00:00:00');

    expect(pipe.expirationCount(now, later)).toBe('3 minutes');
  });

  it('hurry up!', () => {
    const later = moment('2000-01-01T00:00:05');
    const now = moment('2000-01-01T00:00:00');

    expect(pipe.expirationCount(now, later)).toBe('less than a minute!');
  });

  it('bug', () => {
    const later = moment('2020-03-02T12:00:00Z');
    const now = moment('2019-04-01T18:30:00Z');

    expect(pipe.expirationCount(now, later)).toBe('11 months');
  });

  it('does not pluralize singular values', () => {
    const later = moment('2000-02-01');
    const now = moment('2000-01-01');

    expect(pipe.expirationCount(now, later)).toBe('1 month');
  });
});
