"use client";

import { useRouter } from "next/navigation";
import { getNextStep, getPrevStep } from "@/features/project-wizard/config/steps";
import { useProjectDraftStore } from "@/features/project-wizard/stores/projectDraft.store";
import { useCanAdvanceStep } from "@/features/project-wizard/hooks/useCanAdvanceStep";

export const WizardNav = () => {
  const router = useRouter();
  const step = useProjectDraftStore((s) => s.step);
  const setStep = useProjectDraftStore((s) => s.setStep);
  const reset = useProjectDraftStore((s) => s.reset);
  const canAdvance = useCanAdvanceStep(step);
  const prev = getPrevStep(step);
  const next = getNextStep(step);

  const handlePrev = () => {
    if (prev) setStep(prev);
  };

  const handleNext = () => {
    if (next) setStep(next);
  };

  const handleCancel = () => {
    if (confirm("작성 중인 내용을 버리고 나갈까요?")) {
      reset();
      router.push("/dashboard");
    }
  };

  return (
    <nav
      aria-label="위저드 이동"
      className="mt-10 flex flex-col-reverse items-stretch gap-3 md:mt-12 md:flex-row md:items-center md:justify-between"
    >
      <button
        type="button"
        onClick={handleCancel}
        className="text-[11px] uppercase tracking-[0.3em] text-ink-faint transition hover:text-ink"
      >
        취소 · 대시보드로
      </button>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!prev}
          className="rounded-full border border-line bg-transparent px-6 py-2.5 text-sm text-ink-2 transition hover:border-line-strong hover:bg-bg-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← 이전
        </button>
        {next ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canAdvance}
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-2.5 text-sm font-semibold text-paper shadow-[0_12px_30px_-14px_rgba(21,20,15,0.55)] transition hover:bg-ink-2 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none"
          >
            다음 단계
            <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
              ↗
            </span>
          </button>
        ) : null}
      </div>
    </nav>
  );
};
