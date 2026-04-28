"use client";

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

import { GALLERY_SLIDES } from "../../constants/gallerySlides";

export const ResultGallery = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Keyboard nav
  useEffect(() => {
    if (!api) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") api.scrollPrev();
      if (e.key === "ArrowRight") api.scrollNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [api]);

  const active = GALLERY_SLIDES[current]!;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-white">
      <Carousel setApi={setApi} className="relative flex-1 min-h-0">
        <CarouselContent className="h-full">
          {GALLERY_SLIDES.map((slide) => {
            const Svg = slide.Svg;
            return (
              <CarouselItem key={slide.index} className="h-full">
                <div className="h-full w-full overflow-hidden">
                  <Svg />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <span className="absolute left-3.5 top-3.5 rounded-sm border border-line bg-paper/90 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.14em] text-ink">
          {active.index} / 05 · {active.label}
        </span>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex gap-2 overflow-x-auto border-t border-line bg-paper p-3.5">
        {GALLERY_SLIDES.map((slide, i) => {
          const Svg = slide.Svg;
          const isActive = i === current;
          return (
            <button
              key={slide.index}
              type="button"
              onClick={() => api?.scrollTo(i)}
              className={cn(
                "relative aspect-[4/3] w-[92px] flex-shrink-0 overflow-hidden rounded-sm border-[1.5px] bg-white transition-all duration-200",
                isActive
                  ? "border-burn-500 ring-2 ring-burn-100"
                  : "border-line",
              )}
            >
              <div className="h-full w-full">
                <Svg />
              </div>
              <span className="absolute bottom-0.5 left-1 font-mono text-[8px] tracking-[0.08em] text-ink-50">
                {slide.index}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
