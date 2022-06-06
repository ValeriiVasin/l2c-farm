export interface PinnedResult {
  timestamp: number;
  exp: string;
  adena: string;
  time: string;
  character: string;
  comment: string;
}

export interface PinnedUiItem {
  timestamp: number;
  character: string;
  dailyExp: string;
  dailyAdena: string;
  comment: string;
}

export type ValueVariant = 'daily' | 'hourly';
