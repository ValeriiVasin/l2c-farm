import { describe, test } from '@jest/globals';
import type { ConvertValuesInput, ConvertValuesOutput } from './convert-values';
import { convertValues } from './convert-values';

describe('convert values', () => {
  let values: ConvertValuesInput;
  let result: ConvertValuesOutput;

  beforeEach(() => {
    values = { exp: '10kkk', adena: '1kk', time: '1h' };
    result = {
      isExpCorrect: true,
      isTimeCorrect: true,
      isAdenaCorrect: true,
      hourlyAdena: '1kk',
      hourlyExp: '10kkk',
      dailyAdena: '24kk',
      dailyExp: '240kkk',
    };
  });

  test('incorrect time', () => {
    values.time = 'hello world';
    result = {
      ...result,
      isTimeCorrect: false,
      hourlyAdena: '-',
      hourlyExp: '-',
      dailyAdena: '-',
      dailyExp: '-',
    };

    expect(convertValues(values)).toEqual(result);
  });

  test('incorrect adena', () => {
    values.adena = 'hello world';
    result = { ...result, isAdenaCorrect: false, dailyAdena: '-', hourlyAdena: '-' };
    expect(convertValues(values)).toEqual(result);
  });

  test('incorrect exp', () => {
    values.exp = 'hello world';
    result = { ...result, isExpCorrect: false, hourlyExp: '-', dailyExp: '-' };
    expect(convertValues(values)).toEqual(result);
  });

  test('converts to hourly and daily', () => {
    expect(convertValues(values)).toEqual(result);
  });
});
