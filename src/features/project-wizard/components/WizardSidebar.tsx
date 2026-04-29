"use client";

import { cn } from "@/lib/utils";

import { STEPS } from "../constants/steps";
import { DESIGN_STYLE_BY_ID } from "../constants/designStyles";
import { BUILDING_USE_LABEL } from "../constants/buildingUse";
import { formatArea } from "../lib/format";

import { useWizardDraftStore } from "../stores/wizardDraft.store";

import type { WizardStepId } from "../types/wizard.types";

type Props = {
  step: WizardStepId;
  onStepChange: (step: WizardStepId) => void;
};

export const WizardSidebar = ({ step, onStepChange }: Props) => {
  const { lot, background, siteInfo, designStyle } = useWizardDraftStore();

  const fillPct = ((step - 1) / (STEPS.length - 1)) * 100;

  const summary = [
    { label: "필지", value: step >= 1 ? lot?.jibun : null },
    {
      label: "배경",
      value: step >= 2 && background ? background.name : null,
    },
    {
      label: "대지면적",
      value: step >= 3 ? formatArea(siteInfo.areaSqm) : null,
    },
    {
      label: "용도",
      value: step >= 3 ? BUILDING_USE_LABEL[siteInfo.use] : null,
    },
    {
      label: "스타일",
      value:
        step >= 4 && designStyle
          ? DESIGN_STYLE_BY_ID.get(designStyle)?.name
          : null,
    },
  ];

  return (
    <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] overflow-y-auto border-r border-line bg-paper px-9 py-12 lg:block">
      <div className="mb-3 flex items-center gap-3 eyebrow">
        <span className="h-px w-6 bg-burn-500" />
        NEW PROJECT
      </div>
      <h1 className="display-italic mb-1.5 text-[32px] leading-[1.1] tracking-tight-display">
        필지 위에
        <br />
        <em className="not-italic display-italic text-burn-500">건물을</em> 올립니다.
      </h1>
      <p className="mb-10 text-[13px] text-ink-50">총 5단계 · 약 10분 소요</p>

      <div className="relative flex flex-col">
        {/* Rail base line */}
        <span className="absolute left-[14px] top-[14px] bottom-[14px] w-px bg-line" />
        {/* Rail filled progress */}
        <span
          className="rail-fill-transition absolute left-[14px] top-[14px] w-px bg-burn-500"
          style={{ height: `${fillPct}%` }}
        />

        {STEPS.map((s) => {
          const isActive = s.id === step;
          const isDone = s.id < step;
          const isDisabled = s.id > step;

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => !isDisabled && onStepChange(s.id)}
              disabled={isDisabled}
              className={cn(
                "relative flex items-start gap-4 py-3 text-left transition-opacity",
                isDisabled && "cursor-not-allowed opacity-50",
              )}
            >
              <span
                className={cn(
                  "z-[1] grid h-7 w-7 shrink-0 place-items-center rounded-full border bg-paper font-mono text-[11px] transition-all duration-300 ease-out-expo",
                  isActive && "border-burn-500 bg-burn-500 text-paper",
                  isDone && "border-ink bg-ink text-paper",
                  !isActive && !isDone && "border-line text-ink-50",
                )}
              >
                {s.id}
              </span>
              <span className="pt-1">
                <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-ink-50">
                  {s.label}
                </span>
                <span
                  className={cn(
                    "block text-[17px] tracking-[-0.01em]",
                    isActive
                      ? "display-italic text-burn-500"
                      : "display-italic text-ink",
                  )}
                >
                  {s.name}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-14 border-t border-line pt-8">
        <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50">
          요약
        </h4>
        <dl className="flex flex-col gap-3.5">
          {summary.map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-3 text-[13px]">
              <dt className="text-ink-50">{label}</dt>
              <dd
                className={cn(
                  "max-w-[60%] text-right",
                  value ? "font-medium text-ink" : "text-ink-30",
                )}
              >
                {value ?? "선택 전"}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
};
