import { describe, expect } from '@jest/globals';
import type { Params } from '../types';
import { paramsToSearchParams } from './params-to-search-params';

describe('params to search params', () => {
  let config: Params;
  let params: Params;
  let preserve: boolean;
  let updates: Params;

  describe('not preserved', () => {
    beforeEach(() => {
      config = { page: 1, tab: 'hello' };
      params = {};
      preserve = false;
    });

    test('overrides value', () => {
      const updates = { page: 2 };

      expect(paramsToSearchParams({ params, updates, config, preserve })).toEqual({ page: '2' });
    });

    test('values equal to config default value is omitted', () => {
      const updates = { page: 1, tab: 'world' };

      expect(paramsToSearchParams({ params, updates, config, preserve })).toEqual({ tab: 'world' });
    });
  });

  describe('preserved', () => {
    beforeEach(() => {
      config = { page: 1, tab: 'hello' };
      params = { page: 2, tab: 'world' };
      preserve = true;
    });

    test('overrides value', () => {
      updates = { page: 3 };
      expect(paramsToSearchParams({ params, config, updates, preserve })).toEqual({ page: '3', tab: 'world' });
    });

    test('value not listed when equal to config', () => {
      updates = { page: 1 };
      expect(paramsToSearchParams({ params, config, updates, preserve })).toEqual({ tab: 'world' });
    });

    test('params not listed in config are set', () => {
      const updates = { p: 'q' };
      expect(paramsToSearchParams({ params, config, preserve, updates })).toEqual({ page: '2', tab: 'world', p: 'q' });
    });
  });
});
