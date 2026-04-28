"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useWizardDraftStore } from "../stores/wizardDraft.store";
import type { WizardStepId } from "../types/wizard.types";

import { Step1Map } from "./steps/Step1Map";
import { Step2Background } from "./steps/Step2Background";
import { Step3SiteInfo } from "./steps/Step3SiteInfo";
import { Step4Style } from "./steps/Step4Style";
import { Step5Result } from "./steps/Step5Result";

import { WizardSidebar } from "./WizardSidebar";
import { WizardFooter } from "./WizardFooter";

const parseStepFromUrl = (raw: string | null): WizardStepId => {
  const n = Number(raw);
  if (Number.isNaN(n) || n < 1 || n > 5) return 1;
  return n as WizardStepId;
};

export const NewProjectWizard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { step, setStep, goNext, goPrev } = useWizardDraftStore();

  // URL ?step=N 을 단일 source-of-truth 로 동기화 (뒤로가기/공유 지원)
  useEffect(() => {
    const urlStep = parseStepFromUrl(searchParams.get("step"));
    if (urlStep !== step) setStep(urlStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const writeStepToUrl = (next: WizardStepId) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("step", String(next));
    router.push(`?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStepChange = (next: WizardStepId) => {
    setStep(next);
    writeStepToUrl(next);
  };

  const handleNext = () => {
    if (step >= 5) {
      router.push("/projects");
      return;
    }
    const next = (step + 1) as WizardStepId;
    goNext();
    writeStepToUrl(next);
  };

  const handlePrev = () => {
    if (step <= 1) return;
    const next = (step - 1) as WizardStepId;
    goPrev();
    writeStepToUrl(next);
  };

  return (
    <div className="grid min-h-[calc(100vh-72px)] grid-cols-1 lg:grid-cols-[320px_1fr]">
      <WizardSidebar step={step} onStepChange={handleStepChange} />

      <main className="flex min-h-full flex-col px-6 py-8 md:px-16 md:py-14">
        <div className="flex-1">
          {step === 1 ? <Step1Map /> : null}
          {step === 2 ? <Step2Background /> : null}
          {step === 3 ? <Step3SiteInfo /> : null}
          {step === 4 ? <Step4Style /> : null}
          {step === 5 ? <Step5Result /> : null}
        </div>

        <WizardFooter step={step} onPrev={handlePrev} onNext={handleNext} />
      </main>
    </div>
  );
};
