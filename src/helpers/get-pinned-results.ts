import { pinnedResultsKey } from '../constants/pinned-results-key';
import type { PinnedItem } from '../types';

export function getPinnedResults(): Array<PinnedItem> {
  try {
    const value = window.localStorage.getItem(pinnedResultsKey);

    if (!value) {
      return [];
    }

    return JSON.parse(value);
  } catch {
    return [];
  }
}
