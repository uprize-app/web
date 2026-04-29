"use client";

import Image from "next/image";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { useSiteImages } from "@/features/site-image/hooks/useSiteImages.query";

import { useWizardDraftStore } from "../../stores/wizardDraft.store";

import { WizardStepHead } from "../WizardStepHead";

export const Step2Background = () => {
  const { background, setBackground } = useWizardDraftStore();
  const { data, isLoading, isError, error } = useSiteImages();

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

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
          : (data ?? []).map((bg) => {
              const selected = background?.id === bg.id;
              return (
                <button
                  key={bg.id}
                  type="button"
                  onClick={() => setBackground(bg)}
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
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4 text-paper">
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] opacity-85">
                      {bg.category}
                    </div>
                    <div className="display-italic text-[22px] tracking-[-0.01em]">
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
  );
};

const CardSkeleton = () => (
  <div className="aspect-[4/3] animate-pulse rounded-md border border-line bg-paper-2" />
);
