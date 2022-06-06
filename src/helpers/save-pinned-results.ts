import { pinnedResultsKey } from '../constants/pinned-results-key';
import type { PinnedItem } from '../types';

export function savePinnedResults(results: Array<PinnedItem>) {
  window.localStorage.setItem(pinnedResultsKey, JSON.stringify(results));
}
