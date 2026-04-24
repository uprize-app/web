"use client";

import { WIZARD_STEPS } from "@/features/project-wizard/config/steps";
import { useProjectDraftStore } from "@/features/project-wizard/stores/projectDraft.store";
import type { WizardStep } from "@/features/project-wizard/stores/projectDraft.store";

type WizardStepperProps = {
  current: WizardStep;
};

export const WizardStepper = ({ current }: WizardStepperProps) => {
  const setStep = useProjectDraftStore((s) => s.setStep);
  const currentOrder = WIZARD_STEPS.find((s) => s.id === current)?.order ?? 1;

  return (
    <ol className="flex w-full items-center justify-between gap-1">
      {WIZARD_STEPS.map((step, index) => {
        const isActive = step.id === current;
        const isDone = step.order < currentOrder;
        const isClickable = isDone || isActive;
        const isLast = index === WIZARD_STEPS.length - 1;

        const bubble = (
          <span
            aria-current={isActive ? "step" : undefined}
            className={[
              "flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-semibold transition",
              isActive
                ? "border-ink bg-ink text-paper shadow-[0_8px_20px_-10px_rgba(21,20,15,0.6)]"
                : isDone
                  ? "border-ink bg-paper text-ink"
                  : "border-line bg-paper text-ink-decorative",
            ].join(" ")}
          >
            {isDone ? "✓" : step.order}
          </span>
        );

        const label = (
          <span
            className={[
              "text-[11px] uppercase tracking-[0.18em]",
              isActive ? "text-ink" : isDone ? "text-ink-soft" : "text-ink-decorative",
            ].join(" ")}
          >
            {step.title}
          </span>
        );

        return (
          <li key={step.id} className="flex flex-1 items-center last:flex-none">
            {isClickable ? (
              <button
                type="button"
                onClick={() => setStep(step.id)}
                disabled={isActive}
                aria-label={`${step.order}단계 · ${step.title}`}
                className="group flex flex-col items-center gap-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-md"
              >
                {bubble}
                <span className="hidden md:block">{label}</span>
              </button>
            ) : (
              <div className="flex cursor-not-allowed flex-col items-center gap-2 text-center opacity-80">
                {bubble}
                <span className="hidden md:block">{label}</span>
              </div>
            )}

            {isLast ? null : (
              <span
                aria-hidden="true"
                className={[
                  "mx-2 h-px flex-1 transition md:mx-3",
                  isDone ? "bg-ink" : "bg-line",
                ].join(" ")}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
};
