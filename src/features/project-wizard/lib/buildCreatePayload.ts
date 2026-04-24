import type { ProjectDraftState } from "@/features/project-wizard/stores/projectDraft.store";
import type { CreateProjectPayload } from "@/shared/types/project.types";

export class DraftIncompleteError extends Error {
  constructor(public missing: string[]) {
    super(`필수 항목이 비어있어요: ${missing.join(", ")}`);
    this.name = "DraftIncompleteError";
  }
}

export const buildCreatePayload = (draft: ProjectDraftState): CreateProjectPayload => {
  const missing: string[] = [];
  if (!draft.address) missing.push("주소");
  if (draft.latitude === null) missing.push("위도");
  if (draft.longitude === null) missing.push("경도");
  if (!draft.siteImageUrl) missing.push("배경 이미지");
  if (draft.siteArea === null) missing.push("대지면적");
  if (draft.far === null) missing.push("용적률");
  if (draft.bcr === null) missing.push("건폐율");
  if (!draft.zoning) missing.push("용도지역");
  if (draft.floorsAbove === null) missing.push("지상 층수");
  if (!draft.designStyle) missing.push("디자인 스타일");

  if (missing.length > 0) throw new DraftIncompleteError(missing);

  return {
    address: draft.address as string,
    roadAddress: draft.roadAddress ?? undefined,
    latitude: draft.latitude as number,
    longitude: draft.longitude as number,
    siteImageUrl: draft.siteImageUrl as string,
    siteArea: draft.siteArea as number,
    far: draft.far as number,
    bcr: draft.bcr as number,
    zoning: draft.zoning as string,
    floorsAbove: draft.floorsAbove as number,
    floorsBelow: draft.floorsBelow,
    surroundings: draft.surroundings,
    buildingType: draft.buildingType,
    designStyle: draft.designStyle!,
  };
};
