import { maxLevel } from '../constants/max-level';
import { toBigInt } from './to-bigint';

// https://l2central.info/classic/Уровень_персонажа
const levels = new Map<number, bigint>([
  [1, toBigInt(0)],
  [2, toBigInt(68)],
  [3, toBigInt(364)],
  [4, toBigInt(1169)],
  [5, toBigInt(2885)],
  [6, toBigInt(6039)],
  [7, toBigInt(11288)],
  [8, toBigInt(19424)],
  [9, toBigInt(31379)],
  [10, toBigInt(48230)],
  [11, toBigInt(71203)],
  [12, toBigInt(101678)],
  [13, toBigInt(141194)],
  [14, toBigInt(191455)],
  [15, toBigInt(254331)],
  [16, toBigInt(331868)],
  [17, toBigInt(426289)],
  [18, toBigInt(540001)],
  [19, toBigInt(675597)],
  [20, toBigInt(835864)],
  [21, toBigInt(1023785)],
  [22, toBigInt(1439215)],
  [23, toBigInt(1948497)],
  [24, toBigInt(2568850)],
  [25, toBigInt(3320625)],
  [26, toBigInt(4227172)],
  [27, toBigInt(5315161)],
  [28, toBigInt(6614929)],
  [29, toBigInt(8161929)],
  [30, toBigInt(9995812)],
  [31, toBigInt(12162655)],
  [32, toBigInt(14713777)],
  [33, toBigInt(17708475)],
  [34, toBigInt(21213445)],
  [35, toBigInt(25304463)],
  [36, toBigInt(30067485)],
  [37, toBigInt(35599858)],
  [38, toBigInt(42010312)],
  [39, toBigInt(49421366)],
  [40, toBigInt(57972427)],
  [41, toBigInt(67818553)],
  [42, toBigInt(79135431)],
  [43, toBigInt(92117896)],
  [44, toBigInt(106985763)],
  [45, toBigInt(123986756)],
  [46, toBigInt(143394645)],
  [47, toBigInt(165516618)],
  [48, toBigInt(190696911)],
  [49, toBigInt(219317613)],
  [50, toBigInt(251805374)],
  [51, toBigInt(288635909)],
  [52, toBigInt(330338848)],
  [53, toBigInt(377507026)],
  [54, toBigInt(430790086)],
  [55, toBigInt(490916803)],
  [56, toBigInt(558693890)],
  [57, toBigInt(635018116)],
  [58, toBigInt(720879370)],
  [59, toBigInt(817380319)],
  [60, toBigInt(925741335)],
  [61, toBigInt(1047311009)],
  [62, toBigInt(1183577349)],
  [63, toBigInt(1336187067)],
  [64, toBigInt(1506967658)],
  [65, toBigInt(1697936136)],
  [66, toBigInt(1911306680)],
  [67, toBigInt(2149533465)],
  [68, toBigInt(2415323168)],
  [69, toBigInt(2711646440)],
  [70, toBigInt(3041801165)],
  [71, toBigInt(3409398455)],
  [72, toBigInt(3818421441)],
  [73, toBigInt(4273257148)],
  [74, toBigInt(4778730308)],
  [75, toBigInt(5340152664)],
  [76, toBigInt(5963335189)],
  [77, toBigInt(7138805250)],
  [78, toBigInt(9372198366)],
  [79, toBigInt(16072377713)],
  [80, toBigInt(38406308871)],
  [81, toBigInt(150075964661)],
  [82, toBigInt(279783329566)],
  [83, toBigInt(454748284485)],
  [84, toBigInt(673468617187)],
  [85, toBigInt(1_548_349_947_995)],
  [86, toBigInt(5_922_756_602_035)],
  [87, toBigInt(12_484_366_583_095)],
  [88, toBigInt(22_982_942_552_791)],
  [89, toBigInt(35_581_233_716_426)],
  [90, toBigInt(50_699_183_112_788)],
  [91, toBigInt(126_288_930_094_600)],
  [92, toBigInt(219_717_789_420_024)],
  [93, toBigInt(630_290_119_652_118)],
  [94, toBigInt(2_354_693_906_626_910)],
  [95, toBigInt('9_597_189_811_921_050')],
  [96, toBigInt('82_022_148_864_862_400')],
  [97, toBigInt('661_421_821_288_393_000')],
  [98, toBigInt('1_820_221_166_135_450_000')],
  [99, toBigInt('4_137_819_855_829_580_000')],
  [100, toBigInt('8_773_017_235_217_830_000')],
]);

function levelToExp(lvl: number): bigint {
  if (lvl > maxLevel || lvl < 1) {
    return BigInt(0);
  }

  const base = Math.floor(lvl);
  const rest = lvl - base;

  const baseExp = levels.get(base);

  if (typeof baseExp !== 'bigint') {
    return BigInt(0);
  }

  if (rest === 0) {
    return baseExp;
  }

  const nextExp = levels.get(base + 1);
  if (typeof nextExp !== 'bigint') {
    return BigInt(0);
  }

  // we support level difference up-to 4 digits
  // 0.0001 => BigInt(1) that will be divided by BigInt(10_000) later
  return baseExp + ((nextExp - baseExp) * BigInt(Math.round(rest * 10_000))) / BigInt(10_000);
}

export function getExp({ from, to }: { from: number; to: number }): bigint {
  return levelToExp(to) - levelToExp(from);
}
