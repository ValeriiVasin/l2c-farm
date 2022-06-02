export function parseTime(time: string): number {
  const value = cleanSpaces(replaceIdentifiers(time.toLowerCase()));

  if (isCountExceeded(value)) {
    return Number.NaN;
  }

  if (isIdentifierPositionViolated(value)) {
    return Number.NaN;
  }

  const regexp = /^(?<days>\d+d)?(?<hours>\d+h)?(?<minutes>\d+m)?$/;
  const parsed = value.match(regexp);

  const days = parsed?.groups?.days;
  const hours = parsed?.groups?.hours;
  const minutes = parsed?.groups?.minutes;

  const result = toMinutes(days) + toMinutes(hours) + toMinutes(minutes);

  return result === 0 ? Number.NaN : result;
}

function toMinutes(chunk?: string): number {
  if (!chunk) {
    return 0;
  }

  const identifier = chunk[chunk.length - 1];
  const value = Number(chunk.slice(0, -1));

  if (identifier === 'd') {
    return 24 * 60 * value;
  }

  if (identifier === 'h') {
    return 60 * value;
  }

  return value;
}

function replaceIdentifiers(str: string): string {
  return str.replace(/д/g, 'd').replace(/ч/g, 'h').replace(/м/g, 'm');
}

function countLetter(str: string, letter: string): number {
  let result = 0;

  for (const char of str) {
    if (char === letter) {
      result += 1;
    }
  }

  return result;
}

function isCountExceeded(str: string): boolean {
  return ['d', 'h', 'm'].some((letter) => countLetter(str, letter) > 1);
}

function isIdentifierPositionViolated(str: string): boolean {
  let prev = -Infinity;
  return ['d', 'h', 'm']
    .map((identifier) => str.indexOf(identifier))
    .filter((value) => value !== -1)
    .some((position) => {
      if (position <= prev) {
        return true;
      }

      prev = position;
      return false;
    });
}

function cleanSpaces(str: string): string {
  return str.replace(/\s+/g, '');
}
