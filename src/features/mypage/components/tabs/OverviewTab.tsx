"use client";

import Link from "next/link";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useUserStats } from "../../hooks/useUserStats.query";
import { Panel } from "../Panel";

import type { Project, ProjectStatus } from "@/shared/types/api.types";

type Props = {
  onUpgrade: () => void;
};

export const OverviewTab = ({ onUpgrade }: Props) => {
  const stats = useUserStats();

  const usages = [
    {
      label: "프로젝트",
      current: stats.thisMonthProjects,
      max: stats.monthlyProjectQuota,
      unit: "건",
      foot: [formatThisMonthRange(), `${Math.max(stats.monthlyProjectQuota - stats.thisMonthProjects, 0)}건 남음`] as [string, string],
    },
    {
      label: "PDF 다운",
      current: stats.thisMonthExports,
      max: stats.monthlyExportQuota,
      unit: "회",
      foot: ["설계 제안서 발행", `${Math.max(stats.monthlyExportQuota - stats.thisMonthExports, 0)}회 남음`] as [string, string],
    },
    {
      label: "완료 프로젝트",
      current: stats.completedProjects,
      max: Math.max(stats.totalProjects, 1),
      unit: "건",
      foot: ["전체 누계", `생성 ${stats.totalGenerations}회`] as [string, string],
    },
  ];

  return (
    <div className="grid gap-7 lg:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-5">
        <Panel
          title="이번 달 사용량"
          action={<Link href="#">자세히 →</Link>}
        >
          {usages.map((u, i) => {
            const pct = Math.min((u.current / Math.max(u.max, 1)) * 100, 100);
            const warn = pct >= 80;
            return (
              <div key={u.label} className={i < usages.length - 1 ? "mb-6" : ""}>
                <div className="mb-2.5 flex justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-50">
                    {u.label}
                  </span>
                  <span className="display-italic text-[18px] not-italic">
                    <em className="display-italic text-burn-500">{u.current}</em>
                    <span className="text-ink-50"> / {u.max} {u.unit}</span>
                  </span>
                </div>
                <div className="relative h-1.5 overflow-hidden rounded-full bg-paper-2">
                  <span
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-full transition-[width] duration-700 ease-out-expo",
                      warn ? "bg-burn-500" : "bg-ink",
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[12px] tracking-[0.04em] text-ink-50">
                  <span>{u.foot[0]}</span>
                  <span>{u.foot[1]}</span>
                </div>
              </div>
            );
          })}
        </Panel>

        <Panel
          title="최근 프로젝트"
          action={<Link href="/projects">전체 →</Link>}
        >
          <RecentProjectsTable
            projects={stats.recentProjects}
            isLoading={stats.isLoading && stats.recentProjects.length === 0}
          />
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
            {["월 10건 프로젝트", "PDF 제안서 30회", "전 디자인 스타일"].map((f) => (
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
};

const formatThisMonthRange = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const last = new Date(y, now.getMonth() + 1, 0).getDate();
  return `${y}.${m}.01 — ${m}.${last}`;
};

const RecentProjectsTable = ({
  projects,
  isLoading,
}: {
  projects: ReadonlyArray<Project>;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="py-8 text-center font-mono text-[12px] tracking-[0.04em] text-ink-50">
        불러오는 중…
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-line bg-paper-2/40 py-10 text-center">
        <div className="display-italic mb-1.5 text-[18px] not-italic">
          아직 프로젝트가 없습니다
        </div>
        <div className="mb-4 font-mono text-[12px] tracking-[0.04em] text-ink-50">
          첫 프로젝트를 생성하고 PDF 제안서를 받아보세요
        </div>
        <Link
          href="/studio/new"
          className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.12em] text-burn-500 hover:text-burn-600"
        >
          새 프로젝트 →
        </Link>
      </div>
    );
  }

  return (
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
        {projects.map((p, i) => {
          const isLast = i === projects.length - 1;
          const cell = cn("py-3.5", !isLast && "border-b border-line");
          return (
            <tr key={p.id}>
              <td className={cell}>
                <Link
                  href={`/projects/${p.id}`}
                  className="font-medium text-ink hover:text-burn-500"
                >
                  {p.address || "주소 미등록"}
                </Link>
              </td>
              <td className={cn(cell, "font-mono text-[11px] uppercase text-ink-50")}>
                {p.designStyle}
              </td>
              <td className={cell}>
                <Pill status={p.status} />
              </td>
              <td className={cn(cell, "text-ink-50")}>
                {formatRelative(p.updatedAt)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const formatRelative = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "방금 전";
  if (min < 60) return `${min}분 전`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}시간 전`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}일 전`;
  if (day < 30) return `${Math.floor(day / 7)}주 전`;
  return `${Math.floor(day / 30)}개월 전`;
};

const Pill = ({ status }: { status: ProjectStatus }) => {
  const config = {
    generated: { cls: "border-[#B8D9C5] bg-[#ECF6F0] text-[#2E6F50]", label: "● 완료" },
    ready:     { cls: "border-burn-200 bg-burn-50 text-burn-700",     label: "◐ 생성중" },
    draft:     { cls: "border-line bg-white text-ink-50",             label: "● 초안" },
  } as const satisfies Record<ProjectStatus, { cls: string; label: string }>;
  const { cls, label } = config[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em]",
        cls,
      )}
    >
      {label}
    </span>
  );
};
