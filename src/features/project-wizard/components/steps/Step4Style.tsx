"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { DESIGN_STYLE_OPTIONS } from "../../constants/designStyles";
import { useWizardDraftStore } from "../../stores/wizardDraft.store";

import { WizardStepHead } from "../WizardStepHead";

export const Step4Style = () => {
  const { designStyle, setDesignStyle } = useWizardDraftStore();

  return (
    <div className="animate-fade-up">
      <WizardStepHead
        step={4}
        title={
          <>
            디자인 <em className="not-italic display-italic text-burn-500">스타일</em>
            을 고르세요.
          </>
        }
        description="필지·용도에 어울리는 6가지 프리미엄 스타일. 1~2개를 선택해 비교 렌더링도 가능합니다."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {DESIGN_STYLE_OPTIONS.map((style) => {
          const Svg = style.Svg;
          const selected = designStyle === style.id;
          return (
            <button
              key={style.id}
              type="button"
              onClick={() => setDesignStyle(style.id)}
              className={cn(
                "group relative aspect-[3/4] overflow-hidden rounded-md border bg-white text-left transition-all duration-300 ease-out-expo",
                selected
                  ? "border-burn-500 ring-[3px] ring-burn-100"
                  : "border-line hover:border-ink",
              )}
            >
              <div className="h-[65%] transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
                <Svg />
              </div>
              <div className="border-t border-line px-5 py-4">
                <div className="font-mono text-[10px] tracking-[0.12em] text-burn-500">
                  {style.index} · {style.code}
                </div>
                <div className="display-italic mt-1 text-[20px] tracking-[-0.01em]">
                  {style.name}
                </div>
                <div className="display-italic mt-1 text-[12px] text-ink-50">
                  — {style.reference}
                </div>
              </div>
              {selected ? (
                <span className="absolute right-3 top-3 grid h-[26px] w-[26px] place-items-center rounded-full bg-burn-500 text-paper">
                  <Check size={14} strokeWidth={2} />
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
