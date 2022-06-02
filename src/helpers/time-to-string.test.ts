import { describe, test } from '@jest/globals';
import { timeToString } from './time-to-string';

describe('time to string', () => {
  test('less than a minute', () => {
    expect(timeToString(0)).toBe('0m');
  });

  test('minutes', () => {
    expect(timeToString(55)).toBe('55m');
  });

  test('hours', () => {
    expect(timeToString(60)).toBe('1h');
  });

  test('hours and minutes', () => {
    expect(timeToString(61)).toBe('1h 1m');
  });

  test('days', () => {
    expect(timeToString(24 * 60)).toBe('1d');
  });

  test('days and hours', () => {
    expect(timeToString(25 * 60)).toBe('1d 1h');
  });

  test('days and minutes', () => {
    expect(timeToString(24 * 60 + 1)).toBe('1d 1m');
  });

  test('days, hours and minutes', () => {
    expect(timeToString(26 * 60 + 3)).toBe('1d 2h 3m');
  });
});
