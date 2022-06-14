import { getExp } from './get-exp';
import { toBigInt } from './to-bigint';

describe('Levels difference', () => {
  it('calculates for exact levels correctly', () => {
    expect(getExp({ from: 28, to: 40 })).toBe(BigInt(51_357_498));
  });

  it('calculates for not precise levels correctly', () => {
    expect(getExp({ from: 53.7, to: 55 })).toBe(BigInt(76_111_635));
  });

  it('calculates for max level', () => {
    expect(getExp({ from: 92, to: 93 })).toBe(BigInt(630_290_119_652_118) - BigInt(219_717_789_420_024));
  });

  it('levels above 93 supported', () => {
    expect(getExp({ from: 99, to: 100 })).toBe(
      toBigInt('8_773_017_235_217_830_000') - toBigInt('4_137_819_855_829_580_000'),
    );
  });
});
