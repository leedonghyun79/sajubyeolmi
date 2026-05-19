import {
  STEMS, BRANCHES, STEM_ELEMENT, BRANCH_ELEMENT, STEM_YIN,
  Stem, Branch, Element, Gender, SajuResult, TenGod
} from '@/types/saju';

const SOLAR_TERMS = [
  [6,4],[4,19],[6,6],[5,21],[6,6],[6,22],[7,8],[8,23],[9,9],[8,24],[7,8],[7,22]
];

const TEN_GODS_NAMES = ['비견','겁재','식신','상관','편재','정재','편관','정관','편인','정인'] as const;
const TEN_GODS_DESCS = ['형제·동료','경쟁·활동','재능표현','창의·표현','편재수입','안정재물','권력도전','명예직위','편모지혜','정모학문'] as const;

function getStemBranch(year: number): [Stem, Branch] {
  const y = year - 4;
  const stemIdx = ((y % 10) + 10) % 10;
  const branchIdx = ((y % 12) + 12) % 12;
  return [STEMS[stemIdx], BRANCHES[branchIdx]];
}

function getMonthStemBranch(year: number, month: number, day: number): [Stem, Branch] {
  const solarTermDay = SOLAR_TERMS[month - 1];
  const adjustedMonth = day < solarTermDay[1] ? month - 1 : month;
  const m = ((adjustedMonth - 1) + 12) % 12;
  const yearStemIdx = ((year - 4) % 10 + 10) % 10;
  const stemOffset = (yearStemIdx % 5) * 2;
  const stemIdx = (stemOffset + m) % 10;
  return [STEMS[stemIdx], BRANCHES[m]];
}

function getDayStemBranch(year: number, month: number, day: number): [Stem, Branch] {
  const a = Math.floor((14 - month) / 12);
  const y = year - a;
  const m = month + 12 * a - 2;
  const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y
           + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
  return [STEMS[((jd % 10) + 10) % 10], BRANCHES[((jd % 12) + 12) % 12]];
}

function getHourStemBranch(hour: number, dayStemIdx: number): [Stem, Branch] {
  const branchIdx = Math.floor(((hour + 1) % 24) / 2);
  const stemBase = (dayStemIdx % 5) * 2;
  return [STEMS[(stemBase + branchIdx) % 10], BRANCHES[branchIdx]];
}

function getDaYun(year: number, month: number, day: number, gender: Gender, yearStemIdx: number) {
  const isMaleYang = gender === 'male' && !STEM_YIN[yearStemIdx];
  const isFemaleYin = gender === 'female' && STEM_YIN[yearStemIdx];
  const forward = isMaleYang || isFemaleYin;
  const startAge = 3 + (day % 7);

  return Array.from({ length: 10 }, (_, i) => {
    const monthBranch = ((month - 1) + 12) % 12;
    const offset = forward ? i + 1 : -(i + 1);
    const stemIdx = (((month - 1) + offset * 2) % 10 + 10) % 10;
    const branchIdx = (((monthBranch + offset) % 12) + 12) % 12;
    return {
      age: startAge + i * 10,
      stem: STEMS[stemIdx],
      branch: BRANCHES[branchIdx],
      element: STEM_ELEMENT[stemIdx] as Element,
    };
  });
}

function getTenGod(dayStemIdx: number, targetStemIdx: number): TenGod {
  const diff = ((targetStemIdx - dayStemIdx) + 10) % 10;
  return {
    name: TEN_GODS_NAMES[diff],
    desc: TEN_GODS_DESCS[diff],
  };
}

function countElements(pillars: Array<{stem: Stem; branch: Branch}>) {
  const elements = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };

  pillars.forEach(p => {
    const si = STEMS.indexOf(p.stem);
    const bi = BRANCHES.indexOf(p.branch);
    if (si >= 0) elements[STEM_ELEMENT[si]]++;
    if (bi >= 0) elements[BRANCH_ELEMENT[bi]]++;
  });

  return elements;
}

export function calculateSaju(
  year: number,
  month: number,
  day: number,
  hour: number,
  gender: Gender
): SajuResult {
  if (year < 1900 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
    throw new Error('Invalid date input');
  }

  const [yStem, yBranch] = getStemBranch(year);
  const [mStem, mBranch] = getMonthStemBranch(year, month, day);
  const [dStem, dBranch] = getDayStemBranch(year, month, day);
  const dayStemIdx = STEMS.indexOf(dStem);
  const [hStem, hBranch] = getHourStemBranch(hour, dayStemIdx);
  const yearStemIdx = STEMS.indexOf(yStem);

  const pillars = [
    { label: '년주' as const, stem: yStem, branch: yBranch },
    { label: '월주' as const, stem: mStem, branch: mBranch },
    { label: '일주' as const, stem: dStem, branch: dBranch },
    { label: '시주' as const, stem: hStem, branch: hBranch },
  ];

  const elementCounts = countElements(pillars);
  const total = Object.values(elementCounts).reduce((a, b) => a + b, 0);
  const elements = {
    ...elementCounts,
    dominant_element: (Object.entries(elementCounts).sort((a, b) => b[1] - a[1])[0][0] as Element),
    analysis: {
      목: { percentage: Math.round((elementCounts.목 / total) * 100), evaluation: '적정' as const },
      화: { percentage: Math.round((elementCounts.화 / total) * 100), evaluation: '적정' as const },
      토: { percentage: Math.round((elementCounts.토 / total) * 100), evaluation: '적정' as const },
      금: { percentage: Math.round((elementCounts.금 / total) * 100), evaluation: '적정' as const },
      수: { percentage: Math.round((elementCounts.수 / total) * 100), evaluation: '적정' as const },
    },
  };

  const ten_gods = {
    year_god: getTenGod(dayStemIdx, STEMS.indexOf(yStem)),
    month_god: getTenGod(dayStemIdx, STEMS.indexOf(mStem)),
    day_god: getTenGod(dayStemIdx, dayStemIdx),
    hour_god: getTenGod(dayStemIdx, STEMS.indexOf(hStem)),
  };

  const da_yun = getDaYun(year, month, day, gender, yearStemIdx);

  return {
    year,
    month,
    day,
    hour,
    gender,
    pillars,
    elements,
    ten_gods,
    da_yun: da_yun.slice(0, 10),
    day_stem_idx: dayStemIdx,
  };
}
