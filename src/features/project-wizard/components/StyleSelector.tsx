"use client";

import { HOTEL_STYLES } from "@/features/project-wizard/constants";
import { useProjectDraftStore } from "@/features/project-wizard/stores/projectDraft.store";

export const StyleSelector = () => {
  const designStyle = useProjectDraftStore((s) => s.designStyle);
  const setDesignStyle = useProjectDraftStore((s) => s.setDesignStyle);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="radiogroup" aria-label="호텔 디자인 스타일">
      {HOTEL_STYLES.map((style) => {
        const selected = designStyle === style.id;
        return (
          <button
            key={style.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setDesignStyle(style.id)}
            className={[
              "flex h-full flex-col items-start gap-2 rounded-[22px] border p-6 text-left transition",
              selected
                ? "border-ink bg-paper shadow-[0_16px_40px_-24px_rgba(21,20,15,0.45)]"
                : "border-line bg-paper hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_14px_30px_-22px_rgba(21,20,15,0.3)]",
            ].join(" ")}
          >
            <span className="text-[11px] uppercase tracking-[0.28em] text-ink-faint">{style.id}</span>
            <span className="font-display text-2xl leading-tight text-ink">{style.label}</span>
            <span className="text-xs text-ink-faint">{style.inspiration}</span>
            <span className="mt-2 text-sm leading-relaxed text-ink-2">{style.description}</span>
          </button>
        );
      })}
    </div>
  );
};
