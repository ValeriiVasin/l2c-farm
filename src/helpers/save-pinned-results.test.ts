import { describe, test } from '@jest/globals';
import { pinnedResultsKey } from '../constants/pinned-results-key';
import type { PinnedItem } from '../types';
import { savePinnedResults } from './save-pinned-results';

const setItemMock = jest.fn<void, [string, unknown]>();

describe('write pinned messages', () => {
  let original: typeof window.localStorage;

  beforeEach(() => {
    original = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: setItemMock,
      },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'localStorage', { value: original });
    setItemMock.mockClear();
  });

  test('works', () => {
    const items: Array<PinnedItem> = [
      { timestamp: 123, exp: '1kk', adena: '10k', time: '1h', comment: 'no comment', character: 'no char' },
    ];
    savePinnedResults(items);
    expect(setItemMock).toHaveBeenCalledWith(pinnedResultsKey, JSON.stringify(items));
  });
});
