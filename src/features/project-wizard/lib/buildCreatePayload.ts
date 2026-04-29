import type { CreateProjectRequest } from "@/shared/types/api.types";

import type { WizardDraft } from "../types/wizard.types";

/** ㎡ → 평 환산 (1평 = 3.3058㎡) */
const SQM_PER_PYEONG = 3.3058;
export const sqmToPyeong = (sqm: number): number =>
  Math.round((sqm / SQM_PER_PYEONG) * 100) / 100;

export type BuildPayloadResult =
  | { ok: true; payload: CreateProjectRequest }
  | { ok: false; reason: string };

/**
 * 위저드 상태 → POST /api/projects body 매핑.
 * 누락된 필드가 있으면 ok=false 반환.
 */
export const buildCreatePayload = (draft: WizardDraft): BuildPayloadResult => {
  const { lot, background, siteInfo, designStyle } = draft;

  if (!lot) return { ok: false, reason: "필지를 선택해주세요." };
  if (!background) return { ok: false, reason: "배경을 선택해주세요." };
  if (!designStyle) return { ok: false, reason: "디자인 스타일을 선택해주세요." };
  if (!siteInfo.areaSqm || siteInfo.areaSqm <= 0)
    return { ok: false, reason: "대지면적을 확인해주세요." };
  if (!siteInfo.zoning.trim())
    return { ok: false, reason: "용도지역을 입력해주세요." };

  const payload: CreateProjectRequest = {
    address: lot.address,
    roadAddress: lot.roadAddress ?? undefined,
    latitude: lot.coords.lat,
    longitude: lot.coords.lng,
    siteImageId: background.id,
    siteArea: sqmToPyeong(siteInfo.areaSqm),
    far: siteInfo.far,
    bcr: siteInfo.bcr,
    zoning: siteInfo.zoning,
    floorsAbove: siteInfo.floorsAbove,
    floorsBelow: siteInfo.floorsBelow,
    surroundings: [],
    buildingType: "hotel",
    designStyle,
  };

  return { ok: true, payload };
};
