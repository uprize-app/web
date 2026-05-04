"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { useSiteImages } from "@/features/site-image/hooks/useSiteImages.query";
import type {
  SiteImage,
  SiteImageCategory,
  SiteImageSizeBand,
} from "@/shared/types/api.types";

import { useWizardDraftStore } from "../../stores/wizardDraft.store";

import { WizardStepHead } from "../WizardStepHead";

const SITE_IMAGE_CATEGORIES = [
  "city",
  "river",
  "park",
  "market",
  "mountain",
  "ocean",
  "countryside",
] as const satisfies readonly SiteImageCategory[];

const CATEGORY_META: Record<
  SiteImageCategory,
  { label: string; description: string }
> = {
  city: {
    label: "도심",
    description: "업무지구, 대로변, 고밀 개발지에 어울리는 배경",
  },
  river: {
    label: "하천",
    description: "수변 조망과 산책로 컨텍스트를 강조하는 이미지",
  },
  park: {
    label: "공원",
    description: "녹지, 광장, 여유 있는 보행 환경을 담은 이미지",
  },
  market: {
    label: "상권",
    description: "유동 인구와 저층 상업 분위기가 강한 현장 이미지",
  },
  mountain: {
    label: "산지",
    description: "경사지, 산 조망, 자연 배경이 필요한 필지용 이미지",
  },
  ocean: {
    label: "해안",
    description: "바다 조망과 휴양지 맥락을 보여주는 이미지",
  },
  countryside: {
    label: "전원",
    description: "저밀 주거지와 교외 풍경에 맞춘 배경",
  },
};

const SIZE_BAND_META: Record<
  SiteImageSizeBand,
  { label: string; pyeongLabel: string }
> = {
  small: { label: "소형", pyeongLabel: "약 3,000평" },
  medium: { label: "중형", pyeongLabel: "약 9,000평" },
  large: { label: "대형", pyeongLabel: "약 25,000평" },
};

type CategorySection = {
  category: SiteImageCategory;
  images: SiteImage[];
};

const createEmptyImageGroups = (): Record<SiteImageCategory, SiteImage[]> => ({
  city: [],
  river: [],
  park: [],
  market: [],
  mountain: [],
  ocean: [],
  countryside: [],
});

const hasCategory = (
  sections: CategorySection[],
  category: SiteImageCategory,
) => sections.some((section) => section.category === category);

const formatSizeBand = (sizeBand: SiteImageSizeBand) => {
  const meta = SIZE_BAND_META[sizeBand];
  return `${meta.label} · ${meta.pyeongLabel}`;
};

export const Step2Background = () => {
  const { background, setBackground } = useWizardDraftStore();
  const { data, isLoading, isError, error } = useSiteImages();
  const [openedCategory, setOpenedCategory] =
    useState<SiteImageCategory | null>(null);

  const categorySections = useMemo(() => {
    const groups = createEmptyImageGroups();

    for (const image of data ?? []) {
      groups[image.category].push(image);
    }

    return SITE_IMAGE_CATEGORIES.map((category) => ({
      category,
      images: groups[category],
    })).filter((section) => section.images.length > 0);
  }, [data]);

  const activeCategory = useMemo(() => {
    if (openedCategory && hasCategory(categorySections, openedCategory)) {
      return openedCategory;
    }

    return null;
  }, [categorySections, openedCategory]);

  const handleCategoryOpen = (category: SiteImageCategory) => {
    setOpenedCategory((current) => (current === category ? null : category));
  };

  const handleImageSelect = (image: SiteImage) => {
    setOpenedCategory(image.category);
    setBackground(image);
  };

  return (
    <div className="animate-fade-up">
      <WizardStepHead
        step={2}
        title={
          <>
            현장 <em className="not-italic display-italic text-burn-500">분위기</em>
            를 고르세요.
          </>
        }
        description="필지의 컨텍스트가 될 배경을 선택합니다. 자동 매칭 추천 또는 직접 선택 가능."
      />

      {isError ? (
        <div className="rounded-md border border-burn-200 bg-burn-50 px-4 py-3 text-[13px] text-burn-700">
          배경 카탈로그를 불러오지 못했습니다. {error.message}
        </div>
      ) : null}

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <CategorySkeleton key={index} />
          ))}
        </div>
      ) : null}

      {!isLoading && !isError && categorySections.length === 0 ? (
        <div className="rounded-md border border-line bg-paper-2 px-4 py-4 text-[13px] text-ink-60">
          선택 가능한 현장 이미지가 없습니다.
        </div>
      ) : null}

      {!isLoading && categorySections.length > 0 ? (
        <div className="space-y-3">
          {categorySections.map(({ category, images }) => {
            const isOpen = activeCategory === category;
            const selectedInCategory =
              background?.category === category ? background : null;
            const panelId = `site-image-panel-${category}`;

            return (
              <section key={category}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => handleCategoryOpen(category)}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-md border px-4 py-3 text-left transition-all duration-200 ease-out-expo",
                    isOpen
                      ? "border-ink bg-white shadow-soft"
                      : "border-line bg-paper-2 hover:border-ink hover:bg-white",
                  )}
                >
                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-[15px] font-semibold text-ink">
                        {CATEGORY_META[category].label}
                      </span>
                      <span className="rounded-full bg-white px-2 py-0.5 text-[11px] text-ink-50 ring-1 ring-line">
                        {images.length}개
                      </span>
                    </span>
                    <span className="mt-1 block text-[13px] text-ink-60">
                      {selectedInCategory
                        ? `선택됨: ${selectedInCategory.name} · ${formatSizeBand(selectedInCategory.sizeBand)}`
                        : CATEGORY_META[category].description}
                    </span>
                  </span>

                  <ChevronDown
                    size={18}
                    strokeWidth={2}
                    className={cn(
                      "shrink-0 text-ink-50 transition-transform duration-300 ease-out-expo",
                      isOpen ? "rotate-180 text-ink" : null,
                    )}
                  />
                </button>

                <div
                  id={panelId}
                  aria-hidden={!isOpen}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out-expo",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-2 gap-3 py-4 md:grid-cols-3 xl:grid-cols-4">
                      {images.map((bg) => {
                        const selected = background?.id === bg.id;

                        return (
                          <button
                            key={bg.id}
                            type="button"
                            aria-pressed={selected}
                            tabIndex={isOpen ? undefined : -1}
                            onClick={() => handleImageSelect(bg)}
                            className={cn(
                              "group relative aspect-[4/3] overflow-hidden rounded-md border bg-white text-left transition-all duration-300 ease-out-expo",
                              selected
                                ? "border-burn-500 ring-[3px] ring-burn-100"
                                : "border-line hover:border-ink",
                            )}
                          >
                            <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.06]">
                              <Image
                                src={bg.imageUrl}
                                alt={bg.name}
                                fill
                                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                                className="object-cover"
                              />
                            </div>

                            <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[11px] font-medium text-ink shadow-soft ring-1 ring-white/70 backdrop-blur-sm">
                              {formatSizeBand(bg.sizeBand)}
                            </span>

                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4 text-paper">
                              <div className="font-mono text-[10px] uppercase tracking-[0.12em] opacity-85">
                                {CATEGORY_META[bg.category].label}
                              </div>
                              <div className="display-italic text-[22px]">
                                {bg.name}
                              </div>
                            </div>

                            {selected ? (
                              <span className="absolute right-3 top-3 grid h-[26px] w-[26px] place-items-center rounded-full bg-burn-500 text-paper">
                                <Check size={14} strokeWidth={2} />
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

const CategorySkeleton = () => (
  <div className="rounded-md border border-line bg-paper-2 px-4 py-4">
    <div className="h-4 w-28 animate-pulse rounded-sm bg-line" />
    <div className="mt-3 h-3 w-full max-w-[420px] animate-pulse rounded-sm bg-line" />
  </div>
);
