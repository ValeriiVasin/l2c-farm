import { pinnedResultsKey } from '../constants/pinned-results-key';
import type { PinnedResult } from '../types';

export function getPinnedResults(): Array<PinnedResult> {
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
