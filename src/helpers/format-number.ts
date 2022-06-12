export function formatNumber(initialValue: number | bigint): string {
  let { power, value } = bigIntAdjustments(initialValue);

  const base = 1_000;
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

function bigIntAdjustments(value: number | bigint): { value: number; power: number } {
  if (typeof value === 'number') {
    return { value, power: 0 };
  }

  const base = BigInt(1_000);
  let power = 0;
  while (value > Number.MAX_SAFE_INTEGER) {
    value /= base;
    power += 1;
  }

  return { value: Number(value), power };
}
