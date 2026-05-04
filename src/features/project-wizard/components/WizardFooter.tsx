"use client";

import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

import { STEPS } from "../constants/steps";
import type { WizardStepId } from "../types/wizard.types";

type Props = {
  step: WizardStepId;
  onPrev: () => void;
  onNext: () => void;
  nextDisabled?: boolean;
};

export const WizardFooter = ({
  step,
  onPrev,
  onNext,
  nextDisabled = false,
}: Props) => {
  const isFirst = step === 1;
  const isLast = step === STEPS.length;
  const helper = STEPS[step - 1]!.helper;
  const num = String(step).padStart(2, "0");

  return (
    <div className="mt-12 flex items-center justify-between border-t border-line pt-8">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onPrev}
        className={isFirst ? "invisible" : ""}
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
        이전
      </Button>

      <div className="flex items-center gap-2 font-mono text-[12px] tracking-[0.04em] text-ink-50">
        STEP {num} / 05 · {helper}
      </div>

      <Button
        type="button"
        variant="accent"
        size="sm"
        onClick={onNext}
        disabled={nextDisabled}
      >
        {isLast ? (
          <>
            완료 · 프로젝트 보기
            <Check className="h-3.5 w-3.5" strokeWidth={1.6} />
          </>
        ) : (
          <>
            다음
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
          </>
        )}
      </Button>
    </div>
  );
};
