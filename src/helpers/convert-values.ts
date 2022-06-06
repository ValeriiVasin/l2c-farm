import type { ValueVariant } from '../types';
import { formatNumber } from './format-number';
import { parseNumber } from './parse-number';
import { parseTime } from './parse-time';

export function convertValues(
  variant: ValueVariant,
  { exp, adena, time }: { exp: string; adena: string; time: string },
): { exp: string; adena: string } {
  const parsedTime = parseTime(time);
  const isTimeCorrect = Number.isFinite(parsedTime) && parsedTime > 0;

  if (!isTimeCorrect) {
    return { exp: '-', adena: '-' };
  }

  const parsedExp = parseNumber(exp);
  const isExpCorrect = Number.isFinite(parsedExp);

  const parsedAdena = parseNumber(adena);
  const isAdenaCorrect = Number.isFinite(parsedAdena);

  return {
    exp: isExpCorrect ? formatNumber(convertValue({ time: parsedTime, value: parsedExp, variant })) : '-',
    adena: isAdenaCorrect ? formatNumber(convertValue({ time: parsedTime, value: parsedAdena, variant })) : '-',
  };
}

const convertValue = ({ time, value, variant }: { time: number; value: number; variant: ValueVariant }): number => {
  const valuePerMinute = value / time;

  return variant === 'hourly' ? valuePerMinute * 60 : valuePerMinute * 60 * 24;
};
