import type { HotelStyleId } from "@/features/project-wizard/constants";

export type ProjectStatus = "draft" | "ready" | "generated";

export type BuildingType = "hotel";

export type DesignStyle = HotelStyleId;

export type Project = {
  id: string;
  userId: string;
  address: string;
  roadAddress: string | null;
  latitude: number;
  longitude: number;
  siteImageUrl: string;
  siteArea: number;
  far: number;
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

export type CreateProjectPayload = {
  address: string;
  roadAddress?: string;
  latitude: number;
  longitude: number;
  siteImageUrl: string;
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

export type UpdateProjectPayload = Partial<CreateProjectPayload>;
