"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle } from "lucide-react";

import { validateSiteInfoForNext } from "../lib/siteInfoValidation";
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

const TOAST_DISMISS_MS = 5000;

export const NewProjectWizard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draft = useWizardDraftStore();
  const { step, setStep, goNext, goPrev } = draft;
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // URL ?step=N 을 단일 source-of-truth 로 동기화 (뒤로가기/공유 지원)
  useEffect(() => {
    const urlStep = parseStepFromUrl(searchParams.get("step"));
    if (urlStep !== step) setStep(urlStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(
    () => () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    },
    [],
  );

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(
      () => setToastMessage(null),
      TOAST_DISMISS_MS,
    );
  };

  const hideToast = () => {
    setToastMessage(null);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = null;
  };

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
      return;
    }

    if (step === 3) {
      const validation = validateSiteInfoForNext(draft.siteInfo);
      if (!validation.ok) {
        showToast(validation.reason);
        return;
      }
    }

    hideToast();
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
        {toastMessage ? (
          <div
            role="status"
            aria-live="polite"
            className="fixed left-5 right-5 top-20 z-[60] flex items-start gap-2.5 rounded-md border border-burn-200 bg-white px-4 py-3 text-[13px] text-ink shadow-lift sm:left-auto sm:right-6 sm:top-24 sm:w-[360px]"
          >
            <AlertCircle
              size={16}
              strokeWidth={2}
              className="mt-0.5 shrink-0 text-burn-500"
            />
            <span>{toastMessage}</span>
          </div>
        ) : null}

        <div className="flex-1">
          {step === 1 ? <Step1Map /> : null}
          {step === 2 ? <Step2Background /> : null}
          {step === 3 ? <Step3SiteInfo /> : null}
          {step === 4 ? <Step4Style /> : null}
          {step === 5 ? <Step5Result /> : null}
        </div>

        <WizardFooter
          step={step}
          onPrev={handlePrev}
          onNext={handleNext}
          nextDisabled={step === 5}
        />
      </main>
    </div>
  );
};
