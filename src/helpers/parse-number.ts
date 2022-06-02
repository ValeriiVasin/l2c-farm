export function parseNumber(value: string): number {
  const withoutK = value.replace(/[kк]/gi, '');
  const multiplier = value.length - withoutK.length;
  const numeric = withoutK.replace(',', '.').replace(/\s+/g, '');

  if (numeric === '') {
    return Number.NaN;
  }

  return Number(numeric) * Math.pow(10, multiplier * 3);
}
