import type { SiteImage } from "@/shared/types/api.types";

export type WizardStepId = 1 | 2 | 3 | 4 | 5;

export const WIZARD_TOTAL_STEPS = 5 as const;

/** 호텔 외 추후 확장 전제 (CLAUDE.md) */
export type BuildingUse =
  | "hotel"
  | "office"
  | "residence"
  | "commercial"
  | "resort";

/** 백엔드 SiteImage.id 와 매핑 — Step2 에서 선택된 카탈로그 항목 */
export type SelectedBackground = SiteImage;

/** 백엔드 DesignStyle 과 1:1 매핑 (디자인 명: minimal/resort → curtainwall/darkstone) */
export type DesignStyleId =
  | "iconic"
  | "futurist"
  | "biophilic"
  | "heritage"
  | "curtainwall"
  | "darkstone";

export type LotCoords = {
  lat: number;
  lng: number;
};

export type LotSummary = {
  jibun: string; // "역삼동 123-4"
  address: string; // "서울 강남구 역삼동 123-4"
  roadAddress?: string | null; // "테헤란로 123"
  coords: LotCoords;
  /**
   * 아래 필드는 VWorld 가 진실의 원천. 백엔드 연결 전까지는
   * 사용자가 클릭한 좌표에 대해선 mock 값을 fallback 으로 사용.
   */
  jimok: string; // "대(垈)"
  areaSqm: number;
  zoning: string; // "일반상업"
  bcrLimit: number; // 건폐율 한도 (%)
  farLimit: number; // 용적률 한도 (%)
  groundLevel: string; // "EL +43m"
};

export type SiteInfoForm = {
  areaSqm: number;
  zoning: string;
  bcr: number;
  far: number;
  floorsAbove: number;
  floorsBelow: number;
  use: BuildingUse;
};

export type WizardDraft = {
  step: WizardStepId;
  lot: LotSummary | null;
  background: SelectedBackground | null;
  siteInfo: SiteInfoForm;
  designStyle: DesignStyleId | null;
  projectName: string;
};
