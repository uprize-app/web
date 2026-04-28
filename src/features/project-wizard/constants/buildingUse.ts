import type { BuildingUse } from "../types/wizard.types";

type Option = { value: BuildingUse; label: string };

/**
 * MVP 는 호텔 고정이지만, 디자인의 seg-control 그대로 노출.
 * 추후 오피스/주거복합/상업/리조트 확장 진입점.
 */
export const BUILDING_USE_OPTIONS: ReadonlyArray<Option> = [
  { value: "hotel", label: "호텔" },
  { value: "office", label: "오피스" },
  { value: "residence", label: "주거복합" },
  { value: "commercial", label: "상업" },
  { value: "resort", label: "리조트" },
];

export const BUILDING_USE_LABEL: Readonly<Record<BuildingUse, string>> = {
  hotel: "호텔",
  office: "오피스",
  residence: "주거복합",
  commercial: "상업",
  resort: "리조트",
};
