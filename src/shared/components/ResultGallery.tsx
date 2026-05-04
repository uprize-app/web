"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

import type { ImageStatus } from "@/shared/types/api.types";

export type GallerySlide = {
  index: string;
  label: string;
  url: string | null;
  status: ImageStatus | "idle";
  error?: string | null;
};

type Props = {
  slides: ReadonlyArray<GallerySlide>;
};

export const ResultGallery = ({ slides }: Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    queueMicrotask(() => setCurrent(api.selectedScrollSnap()));
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") api.scrollPrev();
      if (e.key === "ArrowRight") api.scrollNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [api]);

  const active = slides[current];
  if (!active) return null;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-white">
      <Carousel
        opts={{ loop: true }}
        setApi={setApi}
        className="relative flex-1 min-h-0"
      >
        <CarouselContent className="h-full">
          {slides.map((slide) => (
            <CarouselItem key={slide.index} className="h-full">
              <SlidePane slide={slide} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <span className="absolute left-3.5 top-3.5 rounded-sm border border-line bg-paper/90 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.14em] text-ink">
          {active.index} / {String(slides.length).padStart(2, "0")} · {active.label}
        </span>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="overflow-x-auto border-t border-line bg-paper p-3.5">
        <div className="mx-auto flex w-max gap-2">
          {slides.map((slide, i) => {
            const isActive = i === current;
            return (
              <button
                key={slide.index}
                type="button"
                onClick={() => api?.scrollTo(i)}
                className={cn(
                  "relative aspect-[4/3] w-[92px] flex-shrink-0 overflow-hidden rounded-sm border-[1.5px] bg-paper-2 transition-all duration-200",
                  isActive
                    ? "border-burn-500 ring-2 ring-burn-100"
                    : "border-line",
                )}
              >
                <ThumbContent slide={slide} />
                <span className="absolute bottom-0.5 left-1 font-mono text-[8px] tracking-[0.08em] text-ink-50">
                  {slide.index}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SlidePane = ({ slide }: { slide: GallerySlide }) => {
  if (slide.status === "succeeded" && slide.url) {
    return (
      <div className="relative h-full w-full bg-paper-2">
        <Image
          src={slide.url}
          alt={slide.label}
          fill
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="object-cover"
          unoptimized
        />
      </div>
    );
  }
  if (slide.status === "failed") {
    return (
      <div className="grid h-full w-full place-items-center bg-paper-2 px-6 text-center">
        <div>
          <div className="font-mono text-[11px] tracking-[0.14em] text-burn-500">
            FAILED
          </div>
          <div className="mt-2 max-w-[280px] text-[13px] text-ink-50">
            {slide.error ?? "이미지 생성에 실패했어요"}
          </div>
        </div>
      </div>
    );
  }
  if (slide.status === "idle") {
    return (
      <div className="grid h-full w-full place-items-center bg-paper-2 px-6 text-center">
        <div>
          <div className="mx-auto h-10 w-10 rounded-full border border-line bg-white" />
          <div className="mt-3 font-mono text-[11px] tracking-[0.14em] text-ink-50">
            READY
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="grid h-full w-full place-items-center bg-paper-2 px-6 text-center">
      <div>
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-line border-t-burn-500" />
        <div className="mt-3 font-mono text-[11px] tracking-[0.14em] text-ink-50">
          {slide.status === "running" ? "RENDERING..." : "PENDING"}
        </div>
      </div>
    </div>
  );
};

const ThumbContent = ({ slide }: { slide: GallerySlide }) => {
  if (slide.status === "succeeded" && slide.url) {
    return (
      <Image
        src={slide.url}
        alt={slide.label}
        fill
        sizes="92px"
        className="object-cover"
        unoptimized
      />
    );
  }
  return (
    <span className="grid h-full w-full place-items-center font-mono text-[8px] text-ink-50">
      {slide.status === "failed"
        ? "--"
        : slide.status === "idle"
          ? "READY"
          : "..."}
    </span>
  );
};
