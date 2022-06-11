export interface PinnedResult {
  timestamp: number;
  exp: string;
  adena: string;
  time: string;
  character?: string;
  comment?: string;
}

export interface PinnedUiItem extends PinnedResult {
  dailyAdena: string;
  dailyExp: string;
}

export type ValueVariant = 'daily' | 'hourly';
