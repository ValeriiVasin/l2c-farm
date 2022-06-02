import { describe, test } from '@jest/globals';
import { parseNumber } from './parse-number';

describe('parsing string to number', () => {
  test('parses number', () => {
    expect(parseNumber('10')).toBe(10);
  });

  test('parses number with trailing space', () => {
    expect(parseNumber('10 ')).toBe(10);
  });

  test('parses number with spaces in between', () => {
    expect(parseNumber('10 000 000')).toBe(10000000);
  });

  test('parses floating number', () => {
    expect(parseNumber('10.2')).toBe(10.2);
  });

  test('parses floating number with comma separator', () => {
    expect(parseNumber('10,2')).toBe(10.2);
  });

  test('parses k suffix', () => {
    expect(parseNumber('10k')).toBe(10000);
    expect(parseNumber('10kk')).toBe(10000000);
  });

  test('parses k suffix with floating number', () => {
    expect(parseNumber('10.2k')).toBe(10200);
    expect(parseNumber('10,2k')).toBe(10200);
    expect(parseNumber('10.2kk')).toBe(10200000);
  });

  test('NaN for invalid numbers', () => {
    expect(parseNumber('hello')).toBeNaN();
  });

  test('empty string is not valid', () => {
    expect(parseNumber('')).toBeNaN();
  });

  test('zero', () => {
    expect(parseNumber('0')).toBe(0);
  });

  test('supports russian letters', () => {
    expect(parseNumber('10к')).toBe(10_000);
  });

  test('supports uppercase', () => {
    expect(parseNumber('10K')).toBe(10_000);
  });
});
