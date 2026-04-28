"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { BACKGROUND_OPTIONS } from "../../constants/backgrounds";
import { useWizardDraftStore } from "../../stores/wizardDraft.store";

import { WizardStepHead } from "../WizardStepHead";

export const Step2Background = () => {
  const { background, setBackground } = useWizardDraftStore();

  return (
    <div className="animate-fade-up">
      <WizardStepHead
        step={2}
        title={
          <>
            현장 <em className="not-italic display-italic text-burn-500">분위기</em>
            를 고르세요.
          </>
        }
        description="필지의 컨텍스트가 될 배경을 선택합니다. 자동 매칭 추천 또는 직접 선택 가능."
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {BACKGROUND_OPTIONS.map((bg) => {
          const Svg = bg.Svg;
          const selected = background === bg.id;
          return (
            <button
              key={bg.id}
              type="button"
              onClick={() => setBackground(bg.id)}
              className={cn(
                "group relative aspect-[4/3] overflow-hidden rounded-md border bg-white text-left transition-all duration-300 ease-out-expo",
                selected
                  ? "border-burn-500 ring-[3px] ring-burn-100"
                  : "border-line hover:border-ink",
              )}
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]">
                <Svg />
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4 text-paper">
                <div className="font-mono text-[10px] tracking-[0.12em] opacity-85">
                  {bg.tag}
                </div>
                <div className="display-italic text-[22px] tracking-[-0.01em]">
                  {bg.name}
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
