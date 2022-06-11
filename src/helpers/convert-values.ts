import type { ValueVariant } from '../types';
import { formatNumber } from './format-number';
import { parseNumber } from './parse-number';
import { parseTime } from './parse-time';

export interface ConvertValuesInput {
  exp: string;
  adena: string;
  time: string;
}

export interface ConvertValuesOutput {
  dailyAdena: string;
  dailyExp: string;
  hourlyAdena: string;
  hourlyExp: string;
  isAdenaCorrect: boolean;
  isExpCorrect: boolean;
  isTimeCorrect: boolean;
}

export function convertValues({ exp, adena, time }: ConvertValuesInput): ConvertValuesOutput {
  const parsedTime = parseTime(time);
  const isTimeCorrect = Number.isFinite(parsedTime) && parsedTime > 0;

  const parsedExp = parseNumber(exp);
  const isExpCorrect = Number.isFinite(parsedExp);

  const parsedAdena = parseNumber(adena);
  const isAdenaCorrect = Number.isFinite(parsedAdena);

  const hourlyExp =
    isTimeCorrect && isExpCorrect
      ? formatNumber(convertValue({ time: parsedTime, value: parsedExp, variant: 'hourly' }))
      : '-';
  const dailyExp =
    isTimeCorrect && isExpCorrect
      ? formatNumber(convertValue({ time: parsedTime, value: parsedExp, variant: 'daily' }))
      : '-';

  const hourlyAdena =
    isTimeCorrect && isAdenaCorrect
      ? formatNumber(convertValue({ time: parsedTime, value: parsedAdena, variant: 'hourly' }))
      : '-';
  const dailyAdena =
    isTimeCorrect && isAdenaCorrect
      ? formatNumber(convertValue({ time: parsedTime, value: parsedAdena, variant: 'daily' }))
      : '-';

  return {
    dailyAdena,
    dailyExp,
    hourlyAdena,
    hourlyExp,
    isAdenaCorrect,
    isExpCorrect,
    isTimeCorrect,
  };
}

const convertValue = ({ time, value, variant }: { time: number; value: number; variant: ValueVariant }): number => {
  const valuePerMinute = value / time;

  return variant === 'hourly' ? valuePerMinute * 60 : valuePerMinute * 60 * 24;
};
