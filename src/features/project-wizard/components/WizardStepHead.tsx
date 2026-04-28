import type { ReactNode } from "react";

type Props = {
  step: number; // 1..5
  title: ReactNode; // <em> 강조 가능
  description: string;
};

export const WizardStepHead = ({ step, title, description }: Props) => {
  const num = String(step).padStart(2, "0");

  return (
    <header className="mb-10">
      <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-burn-500">
        <span className="display-italic text-[36px] leading-none text-ink-30">
          {num}
        </span>
        STEP {num} / 05
      </div>
      <h2 className="display-italic mb-3 text-[56px] leading-[1.05] tracking-tight-display">
        {title}
      </h2>
      <p className="max-w-[600px] text-[17px] leading-relaxed text-ink-50">
        {description}
      </p>
    </header>
  );
};
