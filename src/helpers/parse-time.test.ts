import { describe, test } from '@jest/globals';
import { parseTime } from './parse-time';

describe('parse time', () => {
  test('minutes', () => {
    expect(parseTime('20m')).toBe(20);
    expect(parseTime('20м')).toBe(20);
  });

  test('hours', () => {
    expect(parseTime('20h')).toBe(20 * 60);
    expect(parseTime('20ч')).toBe(20 * 60);
  });

  test('days', () => {
    expect(parseTime('2d')).toBe(2 * 24 * 60);
    expect(parseTime('2д')).toBe(2 * 24 * 60);
  });

  test('hours and minutes', () => {
    expect(parseTime('1h 1m')).toBe(61);
    expect(parseTime('1ч 1м')).toBe(61);
  });

  test('days and hours', () => {
    expect(parseTime('2d 3h')).toBe(2 * 24 * 60 + 3 * 60);
    expect(parseTime('2д 3ч')).toBe(2 * 24 * 60 + 3 * 60);
  });

  test('days and minutes', () => {
    expect(parseTime('2d 3m')).toBe(2 * 24 * 60 + 3);
    expect(parseTime('2д 3м')).toBe(2 * 24 * 60 + 3);
  });

  test('days hours and minutes', () => {
    expect(parseTime('2d 5h 3m')).toBe(2 * 24 * 60 + 5 * 60 + 3);
    expect(parseTime('2д 5ч 3м')).toBe(2 * 24 * 60 + 5 * 60 + 3);
  });

  describe('spacing', () => {
    test('spaces around the values are valid', () => {
      expect(parseTime(' 20m ')).toBe(20);
    });

    test('spaces before identifiers are valid', () => {
      expect(parseTime('20 m')).toBe(20);
    });

    test('spaces between values are valid', () => {
      expect(parseTime('5h   10m')).toBe(310);
    });
  });

  describe('not valid format', () => {
    test('is NaN if value is incorrect', () => {
      expect(parseTime('world')).toBeNaN();
    });

    test('number without identifier is not valid', () => {
      expect(parseTime('20')).toBeNaN();
    });

    test('few modifiers of same type', () => {
      expect(parseTime('2d 10h 1h')).toBeNaN();
      expect(parseTime('10m 1m')).toBeNaN();
      expect(parseTime('20d 1d 1m')).toBeNaN();
    });

    test('bigger time chunk used after lower', () => {
      expect(parseTime('10m 1h')).toBeNaN();
      expect(parseTime('1h 1d')).toBeNaN();
      expect(parseTime('1d 1m 1h')).toBeNaN();
      expect(parseTime('1m 1d')).toBeNaN();
    });
  });
});
