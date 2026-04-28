"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type {
  BackgroundId,
  DesignStyleId,
  LotSummary,
  SiteInfoForm,
  WizardDraft,
  WizardStepId,
} from "../types/wizard.types";

import { MOCK_LOT } from "../constants/mockLot";

type WizardActions = {
  setStep: (step: WizardStepId) => void;
  goNext: () => void;
  goPrev: () => void;
  setLot: (lot: LotSummary) => void;
  setBackground: (id: BackgroundId) => void;
  setSiteInfo: (patch: Partial<SiteInfoForm>) => void;
  setDesignStyle: (id: DesignStyleId) => void;
  setProjectName: (name: string) => void;
  reset: () => void;
};

type WizardState = WizardDraft & WizardActions;

const initialDraft: WizardDraft = {
  step: 1,
  lot: MOCK_LOT, // 데모: 처음부터 역삼동 선택돼 있는 상태로 시작
  background: "city",
  siteInfo: {
    areaSqm: MOCK_LOT.areaSqm,
    zoning: "일반상업지역",
    bcr: MOCK_LOT.bcrLimit,
    far: MOCK_LOT.farLimit,
    floorsAbove: 18,
    floorsBelow: 3,
    use: "hotel",
  },
  designStyle: "iconic",
  projectName: "역삼 Aurora",
};

const clamp = (n: number): WizardStepId =>
  Math.max(1, Math.min(5, n)) as WizardStepId;

export const useWizardDraftStore = create<WizardState>()(
  persist(
    (set) => ({
      ...initialDraft,

      setStep: (step) => set({ step: clamp(step) }),
      goNext: () => set((s) => ({ step: clamp(s.step + 1) })),
      goPrev: () => set((s) => ({ step: clamp(s.step - 1) })),

      setLot: (lot) => set({ lot }),
      setBackground: (background) => set({ background }),
      setSiteInfo: (patch) =>
        set((s) => ({ siteInfo: { ...s.siteInfo, ...patch } })),
      setDesignStyle: (designStyle) => set({ designStyle }),
      setProjectName: (projectName) => set({ projectName }),

      reset: () => set(initialDraft),
    }),
    {
      name: "uprize:wizard-draft",
      storage: createJSONStorage(() => localStorage),
      // 새 세션에서 step 은 항상 1 부터 — URL ?step=N 이 우선
      partialize: ({ step: _step, ...rest }) => rest as WizardState,
    },
  ),
);
