import type { PinnedItem } from '../types';

export function getPinnedResults(): Array<PinnedItem> {
  try {
    const value = window.localStorage.getItem('pinnedResults');

    if (!value) {
      return [];
    }

    return JSON.parse(value);
  } catch {
    return [];
  }
}
