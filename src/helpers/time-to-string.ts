const DAY_IN_MINUTES = 60 * 24;
const HOUR_IN_MINUTES = 60;
export function timeToString(time: number): string {
  const days = Math.floor(time / DAY_IN_MINUTES);
  time -= days * DAY_IN_MINUTES;
  const hours = Math.floor(time / HOUR_IN_MINUTES);
  time -= hours * HOUR_IN_MINUTES;
  const minutes = time;

  const result: string[] = [];
  if (days) {
    result.push(`${days}d`);
  }

  if (hours) {
    result.push(`${hours}h`);
  }

  if (minutes) {
    result.push(`${minutes}m`);
  }

  return result.length ? result.join(' ') : '0m';
}
