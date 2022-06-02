export function formatNumber(exp: number): string {
  if (exp < 1000) {
    return String(exp);
  }

  if (exp <= 1_000_000) {
    const value = Math.round(exp / 1000);

    return value === 1_000 ? '1kk' : `${value}k`;
  }

  const base = 1_000;
  let power = 0;

  while (exp >= base) {
    power += 1;
    exp = exp / base;
  }

  if (Math.round(exp) === base) {
    return `1${'k'.repeat(power + 1)}`;
  }

  return `${format(exp, 2)}${'k'.repeat(power)}`;
}

function format(value: number, digits: number) {
  const ceil = Math.floor(value);
  let frac = Math.round((value - ceil) * Math.pow(10, digits));

  while (frac % 10 === 0) {
    frac /= 10;
  }

  if (frac === 0) {
    return ceil;
  }

  return `${ceil}.${frac}`;
}
