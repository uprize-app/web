import type { LotSummary } from "../types/wizard.types";

export const MOCK_LOT: LotSummary = {
  jibun: "역삼동 123-4",
  address: "서울 강남구 역삼동 123-4",
  jimok: "대(垈)",
  areaSqm: 1240.5,
  zoning: "일반상업",
  bcrLimit: 60,
  farLimit: 800,
  groundLevel: "EL +43m",
};

export const RECENT_SEARCHES = [
  { jibun: "강원 강릉시 사천면 산토리 88-1", tag: "RESORT · OCEAN" },
  { jibun: "제주 서귀포시 안덕면 사계리", tag: "HOTEL" },
  { jibun: "부산 해운대구 우동 1408", tag: "HOTEL · 32F" },
] as const;
