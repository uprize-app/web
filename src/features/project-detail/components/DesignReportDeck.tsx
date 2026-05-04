"use client";

import { useMemo, useState } from "react";
import { BarChart3, ChevronLeft, ChevronRight, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  extractReportMetrics,
  parseDesignReport,
  type ReportRange,
} from "../lib/projectDetailView";

type Props = {
  designText: string;
};

const NUM_FORMAT = new Intl.NumberFormat("ko-KR");
const MOBILE_BULLET_LIMIT = 4;

export const DesignReportDeck = ({ designText }: Props) => {
  const sections = useMemo(() => parseDesignReport(designText), [designText]);
  const metrics = useMemo(() => extractReportMetrics(designText), [designText]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedBulletSectionIndex, setExpandedBulletSectionIndex] = useState<
    number | null
  >(null);
  const safeActiveIndex = Math.min(activeIndex, Math.max(sections.length - 1, 0));
  const activeSection = sections[safeActiveIndex];
  const showAllBullets = expandedBulletSectionIndex === safeActiveIndex;
  const visibleBullets = showAllBullets
    ? activeSection?.bullets
    : activeSection?.bullets.slice(0, MOBILE_BULLET_LIMIT);
  const hiddenBulletCount = Math.max(
    (activeSection?.bullets.length ?? 0) - MOBILE_BULLET_LIMIT,
    0,
  );
  const hasHiddenBullets = hiddenBulletCount > 0;

  if (!activeSection) return null;

  const goPrev = () => setActiveIndex((index) => Math.max(index - 1, 0));
  const goNext = () =>
    setActiveIndex((index) => Math.min(index + 1, sections.length - 1));

  return (
    <section className="min-w-0 overflow-hidden rounded-md border border-line bg-white">
      <div className="grid border-b border-line lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="min-w-0 border-b border-line px-4 py-5 sm:px-6 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50">
            <FileText size={13} strokeWidth={1.5} />
            AI 리포트
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {sections.map((section, index) => {
              const isActive = index === safeActiveIndex;
              return (
                <button
                  key={`${section.title}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "flex min-w-[160px] items-center justify-between gap-3 rounded-sm border px-3 py-2.5 text-left text-[13px] transition lg:min-w-0",
                    isActive
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper hover:border-ink",
                  )}
                >
                  <span className="truncate">{section.title}</span>
                  <span
                    className={cn(
                      "font-mono text-[10px]",
                      isActive ? "text-paper/70" : "text-ink-50",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0">
          <ReportMetricsTable
            roomCountRange={metrics.roomCountRange}
            adrRangeWon={metrics.adrRangeWon}
            occupancyRange={metrics.occupancyRange}
            gopMarginRange={metrics.gopMarginRange}
          />
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="min-w-0 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-burn-500">
                {String(safeActiveIndex + 1).padStart(2, "0")} /{" "}
                {String(sections.length).padStart(2, "0")}
              </div>
              <h2 className="display-italic text-[26px] leading-tight not-italic sm:text-[30px]">
                {activeSection.title}
              </h2>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={goPrev}
                disabled={safeActiveIndex === 0}
                aria-label="이전 리포트 섹션"
              >
                <ChevronLeft size={16} strokeWidth={1.6} />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={goNext}
                disabled={safeActiveIndex === sections.length - 1}
                aria-label="다음 리포트 섹션"
              >
                <ChevronRight size={16} strokeWidth={1.6} />
              </Button>
            </div>
          </div>

          <div className="max-h-none overflow-y-visible pr-0 sm:max-h-[430px] sm:overflow-y-auto sm:pr-2">
            <div className="space-y-4 text-[15px] leading-7 text-ink-70">
              {activeSection.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {activeSection.bullets.length > 0 ? (
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50">
                    핵심 항목
                  </h3>
                  <span className="font-mono text-[10px] tracking-[0.08em] text-ink-50">
                    {activeSection.bullets.length}개
                  </span>
                </div>
                <ul className="grid gap-3">
                  {visibleBullets?.map((bullet) => (
                    <ReportBulletCard key={bullet} bullet={bullet} />
                  ))}
                </ul>
                {hasHiddenBullets ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-3 w-full sm:w-auto"
                    onClick={() =>
                      setExpandedBulletSectionIndex((index) =>
                        index === safeActiveIndex ? null : safeActiveIndex,
                      )
                    }
                  >
                    {showAllBullets ? "접기" : `전체 ${hiddenBulletCount}개 더 보기`}
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
        </article>

        <aside className="hidden border-t border-line bg-paper-2/50 px-6 py-6 lg:block lg:border-l lg:border-t-0">
          <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50">
            <BarChart3 size={13} strokeWidth={1.5} />
            섹션 구성
          </div>
          <div className="space-y-3">
            {sections.map((section, index) => (
              <button
                key={`${section.title}-meter-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className="block w-full text-left"
              >
                <div className="mb-1.5 flex items-center justify-between gap-3 text-[12px]">
                  <span
                    className={cn(
                      "truncate",
                      index === safeActiveIndex
                        ? "font-semibold text-ink"
                        : "text-ink-50",
                    )}
                  >
                    {section.title}
                  </span>
                  <span className="font-mono text-[10px] text-ink-50">
                    {section.bullets.length} pt
                  </span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-line">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      index === safeActiveIndex
                        ? "w-full bg-burn-500"
                        : "w-1/3 bg-ink-30",
                    )}
                  />
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

type ReportBulletSegment = {
  label: string;
  value: string;
};

const ReportBulletCard = ({ bullet }: { bullet: string }) => {
  const [primary = { label: "항목", value: bullet }, ...secondary] =
    parseReportBullet(bullet);

  return (
    <li className="min-w-0 rounded-sm border border-line bg-paper px-3.5 py-3.5">
      <div className="min-w-0">
        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.12em] text-burn-500">
          {primary.label}
        </div>
        <p className="break-words text-[14px] font-semibold leading-6 text-ink">
          {primary.value}
        </p>
      </div>

      {secondary.length > 0 ? (
        <dl className="mt-3 grid gap-2 border-t border-line pt-3">
          {secondary.map((segment) => (
            <div
              key={`${segment.label}-${segment.value}`}
              className="grid min-w-0 gap-1 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-3"
            >
              <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-50">
                {segment.label}
              </dt>
              <dd className="min-w-0 break-words text-[13px] leading-5 text-ink-70">
                {segment.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </li>
  );
};

const parseReportBullet = (bullet: string): ReportBulletSegment[] => {
  const segments = bullet
    .split("|")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map((segment) => {
      const [label, ...valueParts] = segment.split(":");
      const value = valueParts.join(":").trim();

      if (!value) {
        return {
          label: "항목",
          value: segment,
        };
      }

      return {
        label: label.trim(),
        value,
      };
    });

  return segments.length > 0 ? segments : [{ label: "항목", value: bullet }];
};

type MetricsTableProps = {
  roomCountRange: ReportRange | null;
  adrRangeWon: ReportRange | null;
  occupancyRange: ReportRange | null;
  gopMarginRange: ReportRange | null;
};

const ReportMetricsTable = ({
  roomCountRange,
  adrRangeWon,
  occupancyRange,
  gopMarginRange,
}: MetricsTableProps) => {
  const rows = [
    {
      label: "객실 수",
      value: formatRange(roomCountRange, "실"),
      range: roomCountRange,
      meterMax: 2500,
    },
    {
      label: "ADR",
      value: formatWonRange(adrRangeWon),
      range: adrRangeWon,
      meterMax: 500000,
    },
    {
      label: "점유율",
      value: formatRange(occupancyRange, "%"),
      range: occupancyRange,
      meterMax: 100,
    },
    {
      label: "GOP",
      value: formatRange(gopMarginRange, "%"),
      range: gopMarginRange,
      meterMax: 60,
    },
  ];

  return (
    <div className="grid min-w-0 divide-y divide-line lg:grid-cols-2 lg:divide-x lg:divide-y-0">
      {rows.map((row) => (
        <div key={row.label} className="min-w-0 px-4 py-5 sm:px-6">
          <div className="mb-2 flex min-w-0 flex-col items-start gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-50">
              {row.label}
            </span>
            <strong className="min-w-0 break-words text-left text-[13px] font-semibold text-ink sm:text-right sm:text-[14px]">
              {row.value}
            </strong>
          </div>
          <meter
            className="h-2 w-full accent-burn-500"
            min={0}
            max={row.meterMax}
            value={row.range?.max ?? 0}
          />
        </div>
      ))}
    </div>
  );
};

const formatRange = (range: ReportRange | null, unit: string) =>
  range
    ? `${NUM_FORMAT.format(range.min)}~${NUM_FORMAT.format(range.max)}${unit}`
    : "-";

const formatWonRange = (range: ReportRange | null) =>
  range
    ? `${NUM_FORMAT.format(range.min)}~${NUM_FORMAT.format(range.max)}원`
    : "-";
