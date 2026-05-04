"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type {
  DesignStyleId,
  LotSummary,
  SelectedBackground,
  SiteInfoForm,
  WizardDraft,
  WizardStepId,
} from "../types/wizard.types";

type WizardActions = {
  setStep: (step: WizardStepId) => void;
  goNext: () => void;
  goPrev: () => void;
  setLot: (lot: LotSummary) => void;
  setBackground: (background: SelectedBackground | null) => void;
  setSiteInfo: (patch: Partial<SiteInfoForm>) => void;
  setDesignStyle: (id: DesignStyleId) => void;
  setProjectName: (name: string) => void;
  reset: () => void;
};

type WizardState = WizardDraft & WizardActions;

/** 기본 사이트 정보 — 모든 값은 사용자 입력으로 채워짐 */
const initialSiteInfo: SiteInfoForm = {
  areaSqm: 0,
  zoning: "",
  bcr: 0,
  far: 0,
  floorsAbove: 0,
  floorsBelow: 0,
  use: "hotel",
};

const initialDraft: WizardDraft = {
  step: 1,
  lot: null,
  background: null,
  siteInfo: initialSiteInfo,
  designStyle: null,
  projectName: "",
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
      version: 4, // v4: prefill mock 데이터 제거 — 모든 초기값을 빈 상태로
      migrate: (_persisted, version) => {
        if (version < 4) return initialDraft as unknown as WizardState;
        return _persisted as WizardState;
      },
      partialize: ({ step, ...rest }) => {
        void step;
        return rest as WizardState;
      },
    },
  ),
);
