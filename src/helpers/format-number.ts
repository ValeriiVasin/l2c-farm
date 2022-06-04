export function formatNumber(value: number): string {
  const base = 1_000;
  let power = 0;

  while (value >= base) {
    power += 1;
    value /= base;
  }

  // 9.99k => 10k
  if (power === 1) {
    value = Math.round(value);
  }

  // fix 999.999 => 1000.00 roundation by toFixed()
  if (value > 999.994) {
    value = 1;
    power++;
  }

  return `${format(value, 2)}${'k'.repeat(power)}`;
}

function format(value: number, digits: number): string {
  // replace trailing zeros from toFixed(): 1.70 => 1.7
  // replace extra dot case after zeros removal: 1. => 1
  return value.toFixed(digits).replace(/0+$/, '').replace(/\.$/, '');
}
