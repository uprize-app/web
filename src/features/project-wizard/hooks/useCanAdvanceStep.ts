"use client";

import { useProjectDraftStore } from "@/features/project-wizard/stores/projectDraft.store";
import type { WizardStep } from "@/features/project-wizard/stores/projectDraft.store";

export const useCanAdvanceStep = (step: WizardStep): boolean => {
  const draft = useProjectDraftStore();

  switch (step) {
    case "map":
      return draft.latitude !== null && draft.longitude !== null;
    case "site-info":
      return (
        draft.siteArea !== null &&
        draft.far !== null &&
        draft.bcr !== null &&
        Boolean(draft.zoning) &&
        draft.floorsAbove !== null &&
        draft.floorsAbove > 0
      );
    case "surroundings":
      return true;
    case "background":
      return Boolean(draft.siteImageUrl);
    case "style":
      return Boolean(draft.designStyle);
    case "review":
      return false;
    default:
      return false;
  }
};
