import { ExpirationCountPipe } from './expiration-count.pipe';

describe('ExpirationCountPipe', () => {
  it('create an instance', () => {
    const pipe = new ExpirationCountPipe();
    expect(pipe).toBeTruthy();
  });
});
