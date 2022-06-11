import type { AtomEffect } from 'recoil';
import { atom, selector } from 'recoil';
import { convertValues } from './helpers/convert-values';
import type { PinnedResult, PinnedUiItem } from './types';

const pinnedResultsLocalstorageKey = 'pinnedResults';

// https://recoiljs.org/docs/guides/atom-effects#local-storage-persistence
const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      isReset ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const pinnedResultsAtom = atom<PinnedResult[]>({
  key: 'results',
  default: [],
  effects: [localStorageEffect<PinnedResult[]>(pinnedResultsLocalstorageKey)],
});

export const uiPinnedResultsAtom = selector<PinnedUiItem[]>({
  key: 'uiPinnedResults',
  get: ({ get }) =>
    get(pinnedResultsAtom).map(({ time, adena, exp, timestamp, comment, character }) => {
      const { dailyAdena, dailyExp } = convertValues({ time, adena, exp });
      return {
        adena,
        exp,
        time,
        timestamp,
        character,
        comment,
        dailyAdena,
        dailyExp,
      };
    }),
});
