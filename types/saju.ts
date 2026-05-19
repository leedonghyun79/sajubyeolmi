// types/saju.ts

export type Stem = typeof STEMS[number];
export type Branch = typeof BRANCHES[number];
export type Element = '목' | '화' | '토' | '금' | '수';
export type Gender = 'male' | 'female';
export type TenGodName = '비견' | '겁재' | '식신' | '상관' | '편재' | '정재' | '편관' | '정관' | '편인' | '정인';

export interface Pillar {
  label: '년주' | '월주' | '일주' | '시주';
  stem: Stem;
  branch: Branch;
}

export interface ElementCount {
  목: number;
  화: number;
  토: number;
  금: number;
  수: number;
}

export interface ElementAnalysis extends ElementCount {
  dominant_element: Element;
  analysis: {
    [K in Element]: {
      percentage: number;
      evaluation: '과함' | '부족' | '적정';
    };
  };
}

export interface TenGod {
  name: TenGodName;
  desc: string;
}

export interface TenGodsGrid {
  year_god: TenGod;
  month_god: TenGod;
  day_god: TenGod;
  hour_god: TenGod;
}

export interface DaYun {
  age: number;
  stem: Stem;
  branch: Branch;
  element: Element;
}

export interface SajuResult {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: Gender;
  pillars: Pillar[];
  elements: ElementAnalysis;
  ten_gods: TenGodsGrid;
  da_yun: DaYun[];
  day_stem_idx: number;
}

export interface AIAnalysis {
  total: string;
  love: string;
  career: string;
  money: string;
  health: string;
  analyzed_at?: string;
  model_version?: string;
}

export const STEMS = ['甲갑','乙을','丙병','丁정','戊무','己기','庚경','辛신','壬임','癸계'] as const;
export const BRANCHES = ['子자','丑축','寅인','卯묘','辰진','巳사','午오','未미','申신','酉유','戌술','亥해'] as const;
export const STEM_ELEMENT = ['목','목','화','화','토','토','금','금','수','수'] as const;
export const BRANCH_ELEMENT = ['수','토','목','목','토','화','화','토','금','금','토','수'] as const;
export const STEM_YIN = [false,true,false,true,false,true,false,true,false,true] as const;
