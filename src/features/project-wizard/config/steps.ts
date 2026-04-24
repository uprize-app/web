import type { WizardStep } from "@/features/project-wizard/stores/projectDraft.store";

export type WizardStepMeta = {
  id: WizardStep;
  order: number;
  title: string;
  description: string;
};

export const WIZARD_STEPS: WizardStepMeta[] = [
  {
    id: "map",
    order: 1,
    title: "사업 위치",
    description: "짓고 싶은 건물의 주소를 입력하세요. 지도에서 직접 클릭해도 돼요.",
  },
  {
    id: "site-info",
    order: 2,
    title: "필지 정보",
    description: "대지면적·용적률·건폐율·층수 등 사업성 판단에 필요한 수치를 입력해 주세요.",
  },
  {
    id: "surroundings",
    order: 3,
    title: "주변 환경",
    description: "이 부지 주변에 해당하는 환경을 모두 골라주세요.",
  },
  {
    id: "background",
    order: 4,
    title: "배경 선택",
    description: "현장 느낌과 가장 가까운 배경을 선택해 주세요.",
  },
  {
    id: "style",
    order: 5,
    title: "디자인 스타일",
    description: "생성할 호텔의 디자인 방향을 한 가지 골라주세요.",
  },
  {
    id: "review",
    order: 6,
    title: "확인 · 생성",
    description: "입력한 내용을 확인하고 프로젝트를 저장합니다.",
  },
];

export const STEP_ORDER: WizardStep[] = WIZARD_STEPS.map((s) => s.id);

export const getStepMeta = (step: WizardStep): WizardStepMeta =>
  WIZARD_STEPS.find((s) => s.id === step) ?? WIZARD_STEPS[0];

export const getNextStep = (step: WizardStep): WizardStep | null => {
  const idx = STEP_ORDER.indexOf(step);
  return idx < 0 || idx === STEP_ORDER.length - 1 ? null : STEP_ORDER[idx + 1];
};

export const getPrevStep = (step: WizardStep): WizardStep | null => {
  const idx = STEP_ORDER.indexOf(step);
  return idx <= 0 ? null : STEP_ORDER[idx - 1];
};
