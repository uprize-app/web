"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { SITE_IMAGE_CATEGORIES, type SiteImageCategory } from "@/shared/types/siteImage.types";
import { useSiteImageList } from "@/features/site-image/hooks/useSiteImageList.query";
import { useProjectDraftStore } from "@/features/project-wizard/stores/projectDraft.store";
import { isAllowedImageUrl } from "@/shared/lib/imageHost";

type CategoryTab = "all" | SiteImageCategory;

const CATEGORY_TABS: { id: CategoryTab; label: string }[] = [
  { id: "all", label: "전체" },
  ...SITE_IMAGE_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
];

export const BackgroundPicker = () => {
  const [category, setCategory] = useState<CategoryTab>("all");
  const selectedUrl = useProjectDraftStore((s) => s.siteImageUrl);
  const setSiteImageUrl = useProjectDraftStore((s) => s.setSiteImageUrl);

  const { data, isLoading, isError, error, refetch } = useSiteImageList(
    category === "all" ? undefined : category,
  );

  const items = useMemo(() => data ?? [], [data]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="배경 카테고리">
        {CATEGORY_TABS.map((tab) => {
          const active = tab.id === category;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setCategory(tab.id)}
              className={[
                "rounded-full border px-4 py-2 text-sm transition",
                active
                  ? "border-ink bg-ink text-paper shadow-[0_6px_16px_-10px_rgba(21,20,15,0.55)]"
                  : "border-line bg-transparent text-ink-2 hover:border-line-strong hover:bg-bg-2",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-paper" />
          ))}
        </div>
      ) : null}

      {isError ? (
        <div role="alert" className="rounded-2xl border border-red-500/40 bg-red-50 p-6 text-sm text-red-700">
          <p className="mb-3">배경 이미지를 불러오지 못했어요. ({error instanceof Error ? error.message : "네트워크 오류"})</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-full border border-line-strong px-4 py-1.5 text-xs text-ink transition hover:bg-bg-2"
          >
            다시 시도
          </button>
        </div>
      ) : null}

      {!isLoading && !isError && items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-paper p-6 text-center text-sm text-ink-soft">
          해당 카테고리에 등록된 배경이 아직 없어요.
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {items.map((image) => {
          const selected = selectedUrl === image.imageUrl;
          const showImage = isAllowedImageUrl(image.imageUrl);
          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setSiteImageUrl(image.imageUrl)}
              aria-pressed={selected}
              className={[
                "group relative overflow-hidden rounded-[22px] border transition",
                selected
                  ? "border-ink shadow-[0_16px_40px_-24px_rgba(21,20,15,0.55)]"
                  : "border-line hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[0_14px_30px_-22px_rgba(21,20,15,0.35)]",
              ].join(" ")}
            >
              <span className="relative block aspect-[4/3] bg-paper">
                {showImage ? (
                  <Image
                    src={image.imageUrl}
                    alt={image.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition group-hover:scale-[1.02]"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-xs text-ink-faint">
                    이미지 미리보기 불가
                  </span>
                )}
              </span>
              <span className="flex items-center justify-between gap-2 px-3 py-2 text-xs text-ink-2">
                <span className="truncate font-medium">{image.name}</span>
                <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                  {SITE_IMAGE_CATEGORIES.find((c) => c.id === image.category)?.label ?? image.category}
                </span>
              </span>
              {selected ? (
                <span className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-ink" aria-hidden="true" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
};
