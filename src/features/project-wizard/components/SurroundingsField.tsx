"use client";

import { SURROUNDING_TAGS } from "@/features/project-wizard/constants";
import { useProjectDraftStore } from "@/features/project-wizard/stores/projectDraft.store";

export const SurroundingsField = () => {
  const surroundings = useProjectDraftStore((s) => s.surroundings);
  const toggleSurrounding = useProjectDraftStore((s) => s.toggleSurrounding);

  return (
    <div>
      <p className="mb-4 text-sm text-ink-soft">해당하는 항목을 모두 고르세요. 선택하지 않아도 다음 단계로 넘어갈 수 있어요.</p>
      <div className="flex flex-wrap gap-2" role="group" aria-label="주변 환경 태그">
        {SURROUNDING_TAGS.map((tag) => {
          const selected = surroundings.includes(tag.label);
          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleSurrounding(tag.label)}
              aria-pressed={selected}
              className={[
                "rounded-full border px-4 py-2 text-sm transition",
                selected
                  ? "border-ink bg-ink text-paper shadow-[0_6px_16px_-10px_rgba(21,20,15,0.55)]"
                  : "border-line bg-transparent text-ink-2 hover:border-line-strong hover:bg-bg-2",
              ].join(" ")}
            >
              {tag.label}
            </button>
          );
        })}
      </div>
      {surroundings.length > 0 ? (
        <p className="mt-3 text-xs text-ink-faint">선택됨: {surroundings.join(" · ")}</p>
      ) : null}
    </div>
  );
};
