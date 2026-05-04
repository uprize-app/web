/**
 * 백엔드(uprize-backend) OpenAPI spec 그대로의 타입.
 * Source: http://localhost:4000/openapi.json (v0.0.1)
 *
 * 백엔드 schema 가 변경되면 이 파일을 우선 갱신.
 * 프론트 도메인 모델(LotSummary 등)은 별도 — 매핑 함수로 변환.
 */

// ─────────────────────────── Profile ───────────────────────────

export type Profile = {
  id: string;
  email: string | null;
  displayName: string | null;
  kakaoId: string | null;
  companyName: string | null;
  position: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfileRequest = {
  displayName?: string;
  companyName?: string;
  position?: string;
};

// ─────────────────────────── Project ───────────────────────────

export type BuildingType = "hotel";

export type DesignStyle =
  | "iconic"
  | "futurist"
  | "biophilic"
  | "heritage"
  | "curtainwall"
  | "darkstone";

export type ProjectStatus = "draft" | "ready" | "generated";

export type Project = {
  id: string;
  userId: string;
  address: string;
  roadAddress: string | null;
  latitude: number;
  longitude: number;
  siteImageId: string | null;
  siteImageUrl: string;
  /** 대지면적 (단위: 평) */
  siteArea: number;
  /** 용적률 (%) */
  far: number;
  /** 건폐율 (%) */
  bcr: number;
  zoning: string;
  floorsAbove: number;
  floorsBelow: number;
  surroundings: string[];
  buildingType: BuildingType;
  designStyle: DesignStyle;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateProjectRequest = {
  address: string;
  roadAddress?: string;
  latitude: number;
  longitude: number;
  siteImageId: string;
  siteArea: number;
  far: number;
  bcr: number;
  zoning: string;
  floorsAbove: number;
  floorsBelow?: number;
  surroundings?: string[];
  buildingType?: BuildingType;
  designStyle: DesignStyle;
};

export type UpdateProjectRequest = Partial<CreateProjectRequest>;

// ─────────────────────────── Site Images ───────────────────────────

export type SiteImageCategory =
  | "ocean"
  | "mountain"
  | "city"
  | "park"
  | "market"
  | "river"
  | "countryside";

export type SiteImageSizeBand = "small" | "medium" | "large";

export type SiteImage = {
  id: string;
  name: string;
  imageUrl: string;
  category: SiteImageCategory;
  sizeBand: SiteImageSizeBand;
  displayOrder: number;
};

// ─────────────────────────── Generations ───────────────────────────

export type ImageStatus = "pending" | "running" | "succeeded" | "failed";
export type GenerationPackageStatus = "pending" | "running" | "completed" | "failed";
export type TextStatus = "pending" | "running" | "succeeded" | "failed";

export type MainImageState = {
  status: ImageStatus;
  url: string | null;
  error: string | null;
  requestId: string | null;
  prompt: string | null;
};

export type VariantImageState = {
  status: ImageStatus;
  url: string | null;
  error: string | null;
  requestId: string | null;
};

export type Generation = {
  id: string;
  projectId: string;
  userId: string;
  status: GenerationPackageStatus;
  main: MainImageState;
  sunset: VariantImageState;
  night: VariantImageState;
  rotateRight: VariantImageState;
  rotateLeft: VariantImageState;
  designText: string | null;
  textStatus: TextStatus;
  textError: string | null;
  createdAt: string;
  updatedAt: string;
};

// ─────────────────────────── Exports ───────────────────────────

export type Export = {
  id: string;
  generationId: string;
  userId: string;
  pdfUrl: string;
  pdfSizeBytes: number | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateExportResponse = {
  export: Export;
  /** signed URL — 1시간 유효 */
  downloadUrl: string;
  expiresInSeconds: number;
};
