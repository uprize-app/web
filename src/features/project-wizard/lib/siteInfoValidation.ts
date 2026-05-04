import type { SiteInfoForm } from "../types/wizard.types";

export type SiteInfoValidationResult =
  | { ok: true }
  | { ok: false; reason: string };

export const validateSiteInfoForNext = (
  siteInfo: SiteInfoForm,
): SiteInfoValidationResult => {
  if (siteInfo.areaSqm <= 0) {
    return { ok: false, reason: "대지면적을 입력해주세요." };
  }

  if (!siteInfo.zoning.trim()) {
    return { ok: false, reason: "용도지역을 선택해주세요." };
  }

  if (siteInfo.bcr <= 0) {
    return { ok: false, reason: "건폐율을 입력해주세요." };
  }

  if (siteInfo.far <= 0) {
    return { ok: false, reason: "용적률을 입력해주세요." };
  }

  if (siteInfo.floorsAbove <= 0) {
    return { ok: false, reason: "지상층을 입력해주세요." };
  }

  return { ok: true };
};
