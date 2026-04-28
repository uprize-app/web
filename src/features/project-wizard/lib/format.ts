const NUMBER_FORMAT = new Intl.NumberFormat("ko-KR");

export const formatArea = (sqm: number) =>
  `${NUMBER_FORMAT.format(Math.round(sqm * 10) / 10)}㎡`;

export const formatNumber = (n: number) => NUMBER_FORMAT.format(n);

/**
 * 자동 계산 결과 (목업).
 * 추후 백엔드 계산식으로 대체.
 */
export const computeMaxBuildArea = (areaSqm: number, bcrPct: number) =>
  Math.round((areaSqm * bcrPct) / 100);

export const computeMaxFloorArea = (areaSqm: number, farPct: number) =>
  Math.round((areaSqm * farPct) / 100);

/** 호텔 객실 50㎡/실 가정의 임시 추정치 */
export const estimateRooms = (totalFloorAreaSqm: number) =>
  Math.round(totalFloorAreaSqm / 50);

/** 1㎡ 당 약 330만원 (호텔 평균치) 가정 */
export const estimateBudgetEokWon = (totalFloorAreaSqm: number) =>
  Math.round((totalFloorAreaSqm * 3_300_000) / 100_000_000);
