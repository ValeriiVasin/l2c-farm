export function toBigInt(value: number | string): bigint {
  if (typeof value === 'number') {
    return BigInt(value);
  }

  return BigInt(value.replace(/_/g, ''));
}
