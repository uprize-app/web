import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { BuildingType, DesignStyle } from "@/shared/types/project.types";

export type WizardStep = "map" | "site-info" | "surroundings" | "background" | "style" | "review";

export type ProjectDraftState = {
  step: WizardStep;
  address: string | null;
  roadAddress: string | null;
  latitude: number | null;
  longitude: number | null;
  siteImageUrl: string | null;
  siteArea: number | null;
  far: number | null;
  bcr: number | null;
  zoning: string | null;
  floorsAbove: number | null;
  floorsBelow: number;
  surroundings: string[];
  buildingType: BuildingType;
  designStyle: DesignStyle | null;

  setStep: (step: WizardStep) => void;
  setLocation: (payload: {
    latitude: number | null;
    longitude: number | null;
    address?: string | null;
    roadAddress?: string | null;
  }) => void;
  setSiteMetrics: (
    metrics: Partial<Pick<ProjectDraftState, "siteArea" | "far" | "bcr" | "zoning" | "floorsAbove" | "floorsBelow">>,
  ) => void;
  toggleSurrounding: (tag: string) => void;
  setBuildingType: (type: BuildingType) => void;
  setSiteImageUrl: (url: string | null) => void;
  setDesignStyle: (style: DesignStyle | null) => void;
  reset: () => void;
};

const INITIAL_STATE = {
  step: "map" as WizardStep,
  address: null,
  roadAddress: null,
  latitude: null,
  longitude: null,
  siteImageUrl: null,
  siteArea: null,
  far: null,
  bcr: null,
  zoning: null,
  floorsAbove: null,
  floorsBelow: 0,
  surroundings: [] as string[],
  buildingType: "hotel" as BuildingType,
  designStyle: null,
};

export const useProjectDraftStore = create<ProjectDraftState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setStep: (step) => set({ step }),
      setLocation: ({ latitude, longitude, address, roadAddress }) =>
        set((prev) => ({
          latitude,
          longitude,
          address: address !== undefined ? address : prev.address,
          roadAddress: roadAddress !== undefined ? roadAddress : prev.roadAddress,
        })),
      setSiteMetrics: (metrics) => set((prev) => ({ ...prev, ...metrics })),
      toggleSurrounding: (tag) =>
        set((prev) => ({
          surroundings: prev.surroundings.includes(tag)
            ? prev.surroundings.filter((t) => t !== tag)
            : [...prev.surroundings, tag],
        })),
      setBuildingType: (buildingType) => set({ buildingType }),
      setSiteImageUrl: (siteImageUrl) => set({ siteImageUrl }),
      setDesignStyle: (designStyle) => set({ designStyle }),
      reset: () => set(INITIAL_STATE),
    }),
    {
      name: "uprize-project-draft",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
