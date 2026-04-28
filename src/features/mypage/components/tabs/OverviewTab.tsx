"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Panel } from "../Panel";

type Usage = {
  label: string;
  value: React.ReactNode;
  pct: number;
  warn?: boolean;
  foot: [string, string];
};

const USAGES: ReadonlyArray<Usage> = [
  { label: "프로젝트 생성", value: <><em className="display-italic text-burn-500">7</em> / 10 건</>, pct: 70, foot: ["2026.04.01 — 04.30", "3건 남음"] },
  { label: "4K 렌더링",     value: "28 / 50 회",                                                       pct: 56, foot: ["고해상도 출력 기준", "22회 남음"] },
  { label: "스토리지",      value: "38.2 / 50 GB",                                                     pct: 76, warn: true, foot: ["도면·렌더링·문서 합계", "11.8 GB 남음"] },
];

const RECENTS = [
  { name: "해운대 Curve", style: "FUTURIST", status: "work", updated: "방금 전" },
  { name: "역삼 Aurora", style: "ICONIC", status: "done", updated: "3일 전" },
  { name: "강릉 Sayan Bay", style: "RESORT", status: "done", updated: "1주 전" },
  { name: "제주 Coastal", style: "—", status: "draft", updated: "5일 전" },
] as const;

type Props = {
  onUpgrade: () => void;
};

export const OverviewTab = ({ onUpgrade }: Props) => (
  <div className="grid gap-7 lg:grid-cols-[2fr_1fr]">
    <div className="flex flex-col gap-5">
      <Panel
        title="이번 달 사용량"
        action={<Link href="#">자세히 →</Link>}
      >
        {USAGES.map((u, i) => (
          <div key={u.label} className={i < USAGES.length - 1 ? "mb-6" : ""}>
            <div className="mb-2.5 flex justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-50">
                {u.label}
              </span>
              <span className="display-italic text-[18px] not-italic">{u.value}</span>
            </div>
            <div className="relative h-1.5 overflow-hidden rounded-full bg-paper-2">
              <span
                className={cn(
                  "absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out-expo",
                  u.warn ? "bg-burn-500" : "bg-ink",
                )}
                style={{ width: `${u.pct}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[12px] tracking-[0.04em] text-ink-50">
              <span>{u.foot[0]}</span>
              <span>{u.foot[1]}</span>
            </div>
          </div>
        ))}
      </Panel>

      <Panel
        title="최근 프로젝트"
        action={<Link href="/projects">전체 →</Link>}
      >
        <table className="w-full text-[13px]">
          <thead>
            <tr>
              {["프로젝트", "스타일", "상태", "업데이트"].map((h) => (
                <th
                  key={h}
                  className="border-b border-line py-3.5 text-left font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-50"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENTS.map((r, i) => (
              <tr key={r.name} className={i < RECENTS.length - 1 ? "" : ""}>
                <td className={cn("py-3.5", i < RECENTS.length - 1 && "border-b border-line")}>
                  <Link href="#" className="font-medium text-ink hover:text-burn-500">
                    {r.name}
                  </Link>
                </td>
                <td className={cn("py-3.5 font-mono text-[11px] text-ink-50", i < RECENTS.length - 1 && "border-b border-line")}>
                  {r.style}
                </td>
                <td className={cn("py-3.5", i < RECENTS.length - 1 && "border-b border-line")}>
                  <Pill status={r.status} />
                </td>
                <td className={cn("py-3.5 text-ink-50", i < RECENTS.length - 1 && "border-b border-line")}>
                  {r.updated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>

    {/* Plan card */}
    <div>
      <div className="relative overflow-hidden rounded-lg bg-ink px-8 py-7 text-paper">
        <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(212,84,31,0.4),transparent_70%)]" />
        <div className="relative mb-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-burn-300">
          CURRENT PLAN
        </div>
        <div className="display-italic relative mb-2 text-[36px] leading-none tracking-[-0.015em]">
          <em className="display-italic text-burn-300">Studio</em>
        </div>
        <div className="relative mb-5 text-[13px] text-ink-30">
          <b className="font-mono font-medium text-paper">₩ 990,000</b> / 월
        </div>
        <ul className="relative mb-5 flex flex-col gap-2.5 text-[13px]">
          {["월 10건 프로젝트", "4K 렌더 50회 / 50GB", "24p 설계 제안서"].map((f) => (
            <li key={f} className="flex items-center gap-2 text-ink-30">
              <Check size={12} strokeWidth={1.6} className="shrink-0 text-burn-300" />
              {f}
            </li>
          ))}
        </ul>
        <Button
          onClick={onUpgrade}
          variant="accent"
          size="sm"
          className="relative bg-paper text-ink hover:bg-burn-500 hover:text-paper border-paper hover:border-burn-500"
        >
          Atelier로 업그레이드
        </Button>
        <div className="relative mt-3.5 border-t border-ink-70 pt-4 font-mono text-[11px] tracking-[0.04em] text-ink-50">
          자동 갱신 · 2026.05.15 · ₩ 990,000
        </div>
      </div>
    </div>
  </div>
);

const Pill = ({ status }: { status: "done" | "work" | "draft" }) => {
  const styles = {
    done:  "border-[#B8D9C5] bg-[#ECF6F0] text-[#2E6F50]",
    work:  "border-burn-200 bg-burn-50 text-burn-700",
    draft: "border-line bg-white text-ink-50",
  } as const;
  const labels = { done: "● 완료", work: "◐ 생성중", draft: "● 초안" } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em]",
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  );
};
