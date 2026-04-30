"use client";

import { useMemo } from "react";

import { useUserStats } from "../../hooks/useUserStats.query";
import { SectionHeader } from "../SectionHeader";

import type { Project } from "@/shared/types/api.types";

type Stat = {
  label: string;
  value: React.ReactNode;
  suffix: string;
  delta?: string;
  warn?: boolean;
};

export const UsageTab = () => {
  const stats = useUserStats();

  const monthly = useMemo(() => buildMonthlyHistogram(stats.projects), [stats.projects]);
  const monthlyMax = Math.max(...monthly.map((m) => m.count), 1);

  const STATS: ReadonlyArray<Stat> = [
    {
      label: "총 프로젝트",
      value: <em className="display-italic text-burn-500">{stats.totalProjects}</em>,
      suffix: "건",
      delta: `이번 달 +${stats.thisMonthProjects}`,
    },
    {
      label: "PDF 다운",
      value: stats.totalExports.toLocaleString(),
      suffix: "회",
      delta: `이번 달 +${stats.thisMonthExports}`,
    },
    {
      label: "AI 생성",
      value: stats.totalGenerations.toLocaleString(),
      suffix: "회",
      delta: "5장 패키지 기준",
    },
    {
      label: "완료율",
      value:
        stats.totalProjects > 0
          ? Math.round((stats.completedProjects / stats.totalProjects) * 100)
          : 0,
      suffix: "%",
      delta: `완료 ${stats.completedProjects} / ${stats.totalProjects}건`,
      warn: stats.totalProjects > 0 && stats.completedProjects / stats.totalProjects < 0.3,
    },
  ];

  const periodSub = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const lastDay = new Date(y, now.getMonth() + 1, 0).getDate();
    const dayOfMonth = now.getDate();
    return `${y}.${m} · ${dayOfMonth}일째 / ${lastDay}`;
  }, []);

  return (
    <div>
      <SectionHeader
        title={<>사용량 <em className="not-italic display-italic text-burn-500">리포트.</em></>}
        sub={periodSub}
      />

      <div className="mb-7 grid grid-cols-2 gap-5 md:grid-cols-4">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-md border border-line bg-white px-6 py-5"
          >
            <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-50">
              {s.label}
            </div>
            <div className="display-italic flex items-baseline text-[28px] leading-none tracking-[-0.015em] not-italic">
              {s.value}
              <sup className="ml-1 align-top text-xs text-ink-50">{s.suffix}</sup>
            </div>
            {s.delta ? (
              <div
                className={`mt-2.5 font-mono text-[11px] tracking-[0.04em] ${
                  s.warn ? "text-burn-500" : "text-[#4F8A6E]"
                }`}
              >
                {s.delta}
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-line bg-white px-8 py-7">
        <h3 className="display-italic m-0 mb-1 text-[22px] tracking-[-0.01em] not-italic">
          월별 프로젝트 생성
        </h3>
        <div className="mb-2 font-mono text-[12px] tracking-[0.04em] text-ink-50">
          {monthly[0]!.label} — {monthly[monthly.length - 1]!.label} · 6개월
        </div>
        <MonthlyChart months={monthly} max={monthlyMax} />
      </div>
    </div>
  );
};

type MonthBucket = { label: string; key: string; count: number; isCurrent: boolean };

const buildMonthlyHistogram = (projects: ReadonlyArray<Project>): MonthBucket[] => {
  const now = new Date();
  const buckets: MonthBucket[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear();
    const m = d.getMonth();
    buckets.push({
      key: `${y}-${m}`,
      label: `${String(m + 1).padStart(2, "0")}월`,
      count: 0,
      isCurrent: i === 0,
    });
  }

  for (const p of projects) {
    const d = new Date(p.createdAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const bucket = buckets.find((b) => b.key === key);
    if (bucket) bucket.count += 1;
  }

  return buckets;
};

const MonthlyChart = ({
  months,
  max,
}: {
  months: ReadonlyArray<MonthBucket>;
  max: number;
}) => {
  const top = 40;
  const bottom = 220;
  const trackH = bottom - top;
  const ticks = [max, Math.round((max * 2) / 3), Math.round(max / 3), 0];

  return (
    <svg className="mt-2 h-60 w-full" viewBox="0 0 720 240" preserveAspectRatio="none">
      <g stroke="#E1DED2" strokeWidth="0.8" strokeDasharray="3 3">
        <line x1="40" y1={top} x2="720" y2={top} />
        <line x1="40" y1={top + trackH / 3} x2="720" y2={top + trackH / 3} />
        <line x1="40" y1={top + (trackH * 2) / 3} x2="720" y2={top + (trackH * 2) / 3} />
      </g>
      <g fontFamily="ui-monospace, monospace" fontSize="9" fill="#7C7C73" letterSpacing="1">
        <text x="20" y={top + 4} textAnchor="end">{ticks[0]}</text>
        <text x="20" y={top + trackH / 3 + 4} textAnchor="end">{ticks[1]}</text>
        <text x="20" y={top + (trackH * 2) / 3 + 4} textAnchor="end">{ticks[2]}</text>
        <text x="20" y={bottom} textAnchor="end">{ticks[3]}</text>
      </g>
      {months.map((m, i) => {
        const x = 80 + i * 100;
        const h = (m.count / Math.max(max, 1)) * trackH;
        const y = bottom - h;
        return (
          <rect
            key={m.key}
            x={x}
            y={y}
            width={60}
            height={Math.max(h, 1)}
            fill={m.isCurrent ? "#D4541F" : "#0E0E0C"}
          />
        );
      })}
      <g fontFamily="ui-monospace, monospace" fontSize="10" fill="#7C7C73" letterSpacing="1">
        {months.map((m, i) => (
          <text
            key={m.key}
            x={110 + i * 100}
            y="234"
            textAnchor="middle"
            fill={m.isCurrent ? "#D4541F" : "#7C7C73"}
            fontWeight={m.isCurrent ? "700" : "400"}
          >
            {m.label}
          </text>
        ))}
      </g>
      <line x1="40" y1={bottom} x2="720" y2={bottom} stroke="#0E0E0C" strokeWidth="1" />
    </svg>
  );
};
