export type ZoningName =
  | "제1종전용주거지역"
  | "제2종전용주거지역"
  | "제1종일반주거지역"
  | "제2종일반주거지역"
  | "제3종일반주거지역"
  | "준주거지역"
  | "중심상업지역"
  | "일반상업지역"
  | "근린상업지역"
  | "유통상업지역"
  | "전용공업지역"
  | "일반공업지역"
  | "준공업지역"
  | "보전녹지지역"
  | "생산녹지지역"
  | "자연녹지지역"
  | "보전관리지역"
  | "생산관리지역"
  | "계획관리지역"
  | "농림지역"
  | "자연환경보전지역";

export type ZoningRule = {
  zoning: ZoningName;
  bcrMax: number;
  farMin: number;
  farMax: number;
};

type ZoningDefaults = {
  bcr: number;
  far: number;
};

const NUMBER_FORMAT = new Intl.NumberFormat("ko-KR");

export const ZONING_OPTIONS = [
  "제1종전용주거지역",
  "제2종전용주거지역",
  "제1종일반주거지역",
  "제2종일반주거지역",
  "제3종일반주거지역",
  "준주거지역",
  "중심상업지역",
  "일반상업지역",
  "근린상업지역",
  "유통상업지역",
  "전용공업지역",
  "일반공업지역",
  "준공업지역",
  "보전녹지지역",
  "생산녹지지역",
  "자연녹지지역",
  "보전관리지역",
  "생산관리지역",
  "계획관리지역",
  "농림지역",
  "자연환경보전지역",
] as const satisfies readonly ZoningName[];

export const ZONING_RULES: Readonly<Record<ZoningName, ZoningRule>> = {
  제1종전용주거지역: {
    zoning: "제1종전용주거지역",
    bcrMax: 50,
    farMin: 50,
    farMax: 100,
  },
  제2종전용주거지역: {
    zoning: "제2종전용주거지역",
    bcrMax: 50,
    farMin: 50,
    farMax: 150,
  },
  제1종일반주거지역: {
    zoning: "제1종일반주거지역",
    bcrMax: 60,
    farMin: 100,
    farMax: 200,
  },
  제2종일반주거지역: {
    zoning: "제2종일반주거지역",
    bcrMax: 60,
    farMin: 100,
    farMax: 250,
  },
  제3종일반주거지역: {
    zoning: "제3종일반주거지역",
    bcrMax: 50,
    farMin: 100,
    farMax: 300,
  },
  준주거지역: {
    zoning: "준주거지역",
    bcrMax: 70,
    farMin: 200,
    farMax: 500,
  },
  중심상업지역: {
    zoning: "중심상업지역",
    bcrMax: 90,
    farMin: 200,
    farMax: 1500,
  },
  일반상업지역: {
    zoning: "일반상업지역",
    bcrMax: 80,
    farMin: 200,
    farMax: 1300,
  },
  근린상업지역: {
    zoning: "근린상업지역",
    bcrMax: 70,
    farMin: 200,
    farMax: 900,
  },
  유통상업지역: {
    zoning: "유통상업지역",
    bcrMax: 80,
    farMin: 200,
    farMax: 1100,
  },
  전용공업지역: {
    zoning: "전용공업지역",
    bcrMax: 70,
    farMin: 150,
    farMax: 300,
  },
  일반공업지역: {
    zoning: "일반공업지역",
    bcrMax: 70,
    farMin: 150,
    farMax: 350,
  },
  준공업지역: {
    zoning: "준공업지역",
    bcrMax: 70,
    farMin: 150,
    farMax: 400,
  },
  보전녹지지역: {
    zoning: "보전녹지지역",
    bcrMax: 20,
    farMin: 50,
    farMax: 80,
  },
  생산녹지지역: {
    zoning: "생산녹지지역",
    bcrMax: 20,
    farMin: 50,
    farMax: 100,
  },
  자연녹지지역: {
    zoning: "자연녹지지역",
    bcrMax: 20,
    farMin: 50,
    farMax: 100,
  },
  보전관리지역: {
    zoning: "보전관리지역",
    bcrMax: 20,
    farMin: 50,
    farMax: 80,
  },
  생산관리지역: {
    zoning: "생산관리지역",
    bcrMax: 20,
    farMin: 50,
    farMax: 80,
  },
  계획관리지역: {
    zoning: "계획관리지역",
    bcrMax: 40,
    farMin: 50,
    farMax: 100,
  },
  농림지역: {
    zoning: "농림지역",
    bcrMax: 20,
    farMin: 50,
    farMax: 80,
  },
  자연환경보전지역: {
    zoning: "자연환경보전지역",
    bcrMax: 20,
    farMin: 50,
    farMax: 80,
  },
};

const isZoningName = (value: string): value is ZoningName =>
  value in ZONING_RULES;

const formatPercent = (value: number) => NUMBER_FORMAT.format(value);

export const getZoningRule = (zoning: string): ZoningRule | null =>
  isZoningName(zoning) ? ZONING_RULES[zoning] : null;

export const getZoningDefaults = (zoning: string): ZoningDefaults | null => {
  const rule = getZoningRule(zoning);
  if (!rule) return null;

  return {
    bcr: Math.round(rule.bcrMax / 2),
    far: Math.round((rule.farMin + rule.farMax) / 2),
  };
};

export const formatZoningRuleSummary = (zoning: string) => {
  const rule = getZoningRule(zoning);
  if (!rule) return null;

  return `법령 기준: 건폐율 ${formatPercent(rule.bcrMax)}% 이하 · 용적률 ${formatPercent(rule.farMin)}~${formatPercent(rule.farMax)}%`;
};

export const getZoningLimitWarning = (
  zoning: string,
  key: "bcr" | "far",
  value: number,
) => {
  const rule = getZoningRule(zoning);
  if (!rule || value <= 0) return null;

  if (key === "bcr" && value > rule.bcrMax) {
    return `${rule.zoning}의 건폐율 법정 상한은 ${formatPercent(rule.bcrMax)}%입니다. 초과 입력은 가능하지만 인허가 검토가 필요합니다.`;
  }

  if (key === "far" && value > rule.farMax) {
    return `${rule.zoning}의 용적률 법정 상한은 ${formatPercent(rule.farMax)}%입니다. 초과 입력은 가능하지만 인허가 검토가 필요합니다.`;
  }

  return null;
};
