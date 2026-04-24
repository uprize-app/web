"use client";

import { MapStep } from "@/features/site-selection/components/MapStep";
import { SiteInfoForm } from "@/features/project-wizard/components/SiteInfoForm";
import { SurroundingsField } from "@/features/project-wizard/components/SurroundingsField";
import { StyleSelector } from "@/features/project-wizard/components/StyleSelector";
import { ReviewStep } from "@/features/project-wizard/components/ReviewStep";
import { BackgroundPicker } from "@/features/site-image/components/BackgroundPicker";
import type { WizardStep } from "@/features/project-wizard/stores/projectDraft.store";

type WizardStepViewProps = {
  step: WizardStep;
};

const StepPlaceholder = ({ label }: { label: string }) => (
  <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-line bg-paper text-sm text-ink-soft">
    {label}
  </div>
);

export const WizardStepView = ({ step }: WizardStepViewProps) => {
  switch (step) {
    case "map":
      return <MapStep />;
    case "site-info":
      return <SiteInfoForm />;
    case "surroundings":
      return <SurroundingsField />;
    case "background":
      return <BackgroundPicker />;
    case "style":
      return <StyleSelector />;
    case "review":
      return <ReviewStep />;
    default:
      return <StepPlaceholder label="알 수 없는 단계" />;
  }
};
