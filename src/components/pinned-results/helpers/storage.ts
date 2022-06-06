import { getPinnedResults } from '../../../helpers/get-pinned-results';
import { savePinnedResults } from '../../../helpers/save-pinned-results';
import type { PinnedItem } from '../../../types';

let items = getPinnedResults();

export function getItems() {
  return items;
}

export function pinItem(item: PinnedItem): void {
  items = [item, ...items];
  savePinnedResults(items);
}
