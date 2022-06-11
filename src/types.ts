export interface PinnedResult {
  timestamp: number;
  exp: string;
  adena: string;
  time: string;
  character?: string;
  comment?: string;
}

export interface PinnedUiItem {
  adena: string;
  character?: string;
  comment?: string;
  dailyAdena: string;
  dailyExp: string;
  exp: string;
  time: string;
  timestamp: number;
}

export type ValueVariant = 'daily' | 'hourly';
