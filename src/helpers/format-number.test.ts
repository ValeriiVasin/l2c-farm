import { describe, test } from '@jest/globals';
import { formatNumber } from './format-number';
import { toBigInt } from './to-bigint';

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
    expect(formatNumber(1.06 * 1_000_000)).toBe('1.06kk');
  });

  test('numbers without frac', () => {
    expect(formatNumber(1_000_000)).toBe('1kk');
    expect(formatNumber(270_000_000)).toBe('270kk');
  });

  test('number with lots of digits in frac part', () => {
    expect(formatNumber(1_000_000.0000000001)).toBe('1kk');
  });

  describe('bigint', () => {
    test('supports small numbers type of bigint', () => {
      expect(formatNumber(BigInt(1_000_000))).toBe('1kk');
    });

    test('converts bigint values properly', () => {
      expect(formatNumber(toBigInt('8_773_017_235_217_830_000'))).toBe('8.77kkkkkk');
      expect(formatNumber(toBigInt('8_775_017_235_217_830_000'))).toBe('8.78kkkkkk');
    });
  });
});
