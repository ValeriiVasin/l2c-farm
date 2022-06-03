import { describe, expect, test } from '@jest/globals';
import type { Params } from '../types';
import { searchParamsToParams } from './search-params-to-params';

describe('search params to params', () => {
  const config: Params = { page: 1, tab: 'hello' };

  test('parses number', () => {
    const params = new URLSearchParams({ page: '2' });
    expect(searchParamsToParams(params, config)).toEqual(expect.objectContaining({ page: 2 }));
  });

  test('sets defaults by config if not overriden', () => {
    const params = new URLSearchParams();
    expect(searchParamsToParams(params, config)).toEqual(expect.objectContaining({ page: 1, tab: 'hello' }));
  });

  test('parses all the rest params as strings', () => {
    const params = new URLSearchParams({ p: 'q' });
    expect(searchParamsToParams(params, config)).toEqual(expect.objectContaining({ p: 'q' }));
  });
});
