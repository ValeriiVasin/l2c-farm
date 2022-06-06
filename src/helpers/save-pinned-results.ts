import { pinnedResultsKey } from '../constants/pinned-results-key';
import type { PinnedResult } from '../types';

export function savePinnedResults(results: Array<PinnedResult>) {
  window.localStorage.setItem(pinnedResultsKey, JSON.stringify(results));
}
