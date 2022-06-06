import { getPinnedResults } from '../../../helpers/get-pinned-results';
import { savePinnedResults } from '../../../helpers/save-pinned-results';
import type { PinnedItem } from '../../../types';

const items = getPinnedResults();

export function getItems() {
  return items;
}

export function pinItem(item: PinnedItem): void {
  items.unshift(item);
  savePinnedResults(items);
}
