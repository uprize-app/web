import type { WizardStepId } from "../types/wizard.types";

type StepMeta = {
  id: WizardStepId;
  label: string; // "STEP 01"
  name: string; // "필지 선택"
  helper: string; // 푸터 헬퍼 텍스트
};

export const STEPS: ReadonlyArray<StepMeta> = [
  { id: 1, label: "STEP 01", name: "필지 선택",       helper: "필지 선택 후 다음 단계로" },
  { id: 2, label: "STEP 02", name: "현장 이미지",     helper: "배경 선택 · 자동 매칭 가능" },
  { id: 3, label: "STEP 03", name: "필지 정보",       helper: "한도 자동 계산 결과 확인" },
  { id: 4, label: "STEP 04", name: "디자인 스타일",   helper: "1~2개 스타일 선택 가능" },
  { id: 5, label: "STEP 05", name: "생성 & 결과",     helper: "평균 8분 소요" },
];
