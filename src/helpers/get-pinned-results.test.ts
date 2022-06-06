import { describe } from '@jest/globals';
import type { PinnedItem } from '../types';
import { getPinnedResults } from './get-pinned-results';

const getItemMock = jest.fn<string | null, [string]>();

describe('get pinned items', () => {
  let original: typeof window.localStorage;

  beforeEach(() => {
    original = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: getItemMock,
      },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', { value: original });
    getItemMock.mockClear();
  });

  test('returns empty array when no pinned items', () => {
    getItemMock.mockReturnValue(null);

    expect(getPinnedResults()).toEqual([]);
  });

  test('return parsed items', () => {
    const items: Array<PinnedItem> = [
      { timestamp: 123, exp: '1kk', adena: '10k', time: '1h', comment: 'no comment', character: 'no char' },
    ];
    getItemMock.mockReturnValue(JSON.stringify(items));
    expect(getPinnedResults()).toEqual(items);
  });
});
