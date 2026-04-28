export type WizardStepId = 1 | 2 | 3 | 4 | 5;

export const WIZARD_TOTAL_STEPS = 5 as const;

/** 호텔 외 추후 확장 전제 (CLAUDE.md) */
export type BuildingUse =
  | "hotel"
  | "office"
  | "residence"
  | "commercial"
  | "resort";

export type BackgroundId =
  | "city"
  | "ocean"
  | "mountain"
  | "rural"
  | "river"
  | "park";

export type DesignStyleId =
  | "iconic"
  | "minimal"
  | "biophilic"
  | "futurist"
  | "heritage"
  | "resort";

export type LotSummary = {
  jibun: string; // "역삼동 123-4"
  address: string; // "서울 강남구 역삼동 123-4"
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
  background: BackgroundId | null;
  siteInfo: SiteInfoForm;
  designStyle: DesignStyleId | null;
  projectName: string;
};
