import { describe, it } from '@jest/globals';
import { toBigInt } from './to-bigint';

describe('to bigint', () => {
  it('supports numbers', () => {
    expect(toBigInt(1)).toBe(BigInt(1));
  });

  it('supports strings', () => {
    expect(toBigInt('1000')).toBe(BigInt(1_000));
  });

  it('supports strings with underscores', () => {
    expect(toBigInt('1_000')).toBe(BigInt(1_000));
  });
});
