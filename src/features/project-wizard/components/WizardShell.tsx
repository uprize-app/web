"use client";

import { useHydrateProjectDraft } from "@/features/project-wizard/hooks/useHydrateProjectDraft";
import { useProjectDraftStore } from "@/features/project-wizard/stores/projectDraft.store";
import { WizardStepper } from "@/features/project-wizard/components/WizardStepper";
import { WizardNav } from "@/features/project-wizard/components/WizardNav";
import { WizardStepView } from "@/features/project-wizard/components/WizardStepView";
import { getStepMeta, WIZARD_STEPS } from "@/features/project-wizard/config/steps";

export const WizardShell = () => {
  const hydrated = useHydrateProjectDraft();
  const step = useProjectDraftStore((s) => s.step);
  const meta = getStepMeta(step);
  const totalSteps = WIZARD_STEPS.length;

  if (!hydrated) {
    return (
      <>
        <div aria-hidden="true" style={{ height: "var(--topbar-h)" }} />
        <main aria-busy="true" className="mx-auto w-full max-w-5xl px-6 py-10">
          <div className="h-40 animate-pulse rounded-[28px] bg-paper" />
        </main>
      </>
    );
  }

  return (
    <>
      {/* TopBar(fixed) 만큼 자리 확보 — 이게 없으면 sticky bar가 TopBar 뒤로 들어감 */}
      <div aria-hidden="true" style={{ height: "var(--topbar-h)" }} />

      {/* TopBar 바로 아래에 찰싹 붙는 sticky 스텝퍼 */}
      <div
        className="sticky z-40 border-b border-line bg-bg"
        style={{ top: "var(--topbar-h)" }}
      >
        <div className="mx-auto w-full max-w-5xl px-6 py-4">
          <WizardStepper current={step} />
        </div>
      </div>

      <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-10 md:pt-14">
        <section className="overflow-hidden rounded-[28px] border border-line bg-paper shadow-[0_10px_40px_-18px_rgba(21,20,15,0.22)]">
          <header className="border-b border-line/70 bg-bg-2/40 px-6 py-8 text-center md:px-10 md:py-10">
            <p className="text-[11px] uppercase tracking-[0.32em] text-ink-faint">
              Step {String(meta.order).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
            </p>
            <h1 className="mt-3 font-display text-[34px] leading-[1.1] text-ink md:text-5xl">
              {meta.title}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
              {meta.description}
            </p>
          </header>

          <div className="px-5 py-7 md:px-10 md:py-10">
            <WizardStepView step={step} />
          </div>
        </section>

        <WizardNav />
      </main>
    </>
  );
};
