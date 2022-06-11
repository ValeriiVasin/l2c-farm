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

export const pinnedResultsHandlersSelector = selector({
  key: 'pinnedResultsHandlersSelector',
  get: ({ get, getCallback }) => {
    const pinnedResults = get(pinnedResultsAtom);

    const clearPinnedResults = getCallback(({ set }) => () => {
      set(pinnedResultsAtom, []);
    });

    const removePinnedItem = getCallback(({ set }) => (timestamp: number) => {
      set(
        pinnedResultsAtom,
        pinnedResults.filter((result) => result.timestamp !== timestamp),
      );
    });

    const pinResult = getCallback(({ set }) => (item: PinnedResult) => {
      const character = pinnedResults.length > 0 ? pinnedResults[0].character : void 0;
      set(pinnedResultsAtom, [{ ...item, character }, ...pinnedResults]);
    });

    const changePinnedCharacterName = getCallback(({ set }) => (timestamp: number, name: string) => {
      set(
        pinnedResultsAtom,
        pinnedResults.map((result) =>
          result.timestamp === timestamp ? { ...result, character: name ? name : void 0 } : result,
        ),
      );
    });

    const changePinnedComment = getCallback(({ set }) => (timestamp: number, comment: string) => {
      set(
        pinnedResultsAtom,
        pinnedResults.map((result) =>
          result.timestamp === timestamp ? { ...result, comment: comment ? comment : void 0 } : result,
        ),
      );
    });

    return {
      clearPinnedResults,
      removePinnedItem,
      pinResult,
      changePinnedCharacterName,
      changePinnedComment,
    };
  },
});
export const uiPinnedResultsSelector = selector<PinnedUiItem[]>({
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
