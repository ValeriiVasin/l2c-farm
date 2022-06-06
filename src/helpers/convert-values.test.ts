import { describe, test } from '@jest/globals';
import { convertValues } from './convert-values';

describe('convert values', () => {
  let values: { exp: string; adena: string; time: string };

  beforeEach(() => {
    values = { exp: '10kkk', adena: '1kk', time: '1h' };
  });

  test('incorrect time', () => {
    values.time = 'hello world';

    expect(convertValues('daily', values)).toEqual({ exp: '-', adena: '-' });
  });

  test('incorrect adena', () => {
    values.adena = 'hello world';
    expect(convertValues('daily', values)).toEqual({ exp: '240kkk', adena: '-' });
  });

  test('incorrect exp', () => {
    values.exp = 'hello world';
    expect(convertValues('daily', values)).toEqual({ exp: '-', adena: '24kk' });
  });

  test('convert to daily', () => {
    expect(convertValues('daily', values)).toEqual({ exp: '240kkk', adena: '24kk' });
  });

  test('convert to hourly', () => {
    expect(convertValues('hourly', values)).toEqual({ exp: '10kkk', adena: '1kk' });
  });
});
