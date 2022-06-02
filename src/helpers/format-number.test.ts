import { describe, test } from '@jest/globals';
import { formatNumber } from './format-number';

describe('format exp', () => {
  test('full value before 1k', () => {
    expect(formatNumber(987)).toBe('987');
  });

  test('zero signs precision below 1kk', () => {
    expect(formatNumber(1_000)).toBe('1k');
    expect(formatNumber(9_987)).toBe('10k');
    expect(formatNumber(287_700)).toBe('288k');
    expect(formatNumber(999_444)).toBe('999k');
  });

  test('two digits precision above the 1kk', () => {
    expect(formatNumber(999_999)).toBe('1kk');
    expect(formatNumber(1_700_000)).toBe('1.7kk');
    expect(formatNumber(1_788_000)).toBe('1.79kk');
    expect(formatNumber(22_300_000)).toBe('22.3kk');
    expect(formatNumber(999_999_000)).toBe('1kkk');
  });
});
