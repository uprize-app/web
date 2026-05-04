"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, Plus, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { Project } from "@/shared/types/api.types";

import { useProjectList } from "../hooks/useProjectList.query";
import {
  formatAddress,
  formatProjectName,
  toUiStatus,
} from "../lib/projectView";
import type { ProjectFilter } from "../types/project.types";

import { NewProjectCard } from "./NewProjectCard";
import { ProjectCard } from "./ProjectCard";
import { ProjectsToolbar } from "./ProjectsToolbar";

const matchesFilter = (p: Project, f: ProjectFilter) => {
  if (f === "all") return true;
  return toUiStatus(p.status) === f;
};

const matchesSearch = (p: Project, q: string) => {
  if (!q.trim()) return true;
  const lc = q.toLowerCase();
  return (
    formatProjectName(p).toLowerCase().includes(lc) ||
    formatAddress(p).toLowerCase().includes(lc)
  );
};

const NUM_FORMAT = new Intl.NumberFormat("ko-KR");

const computeStats = (projects: Project[]) => {
  const totalCount = projects.length;
  const doneCount = projects.filter((p) => p.status === "generated").length;
  // 합성 면적 — 평 → ㎡ 환산 (1평 ≈ 3.3058㎡)
  const totalSqm = projects.reduce((acc, p) => acc + p.siteArea * 3.3058, 0);
  return {
    totalCount,
    doneCount,
    totalSqm: Math.round(totalSqm),
  };
};

const computeFilterCounts = (projects: Project[]) => ({
  all: projects.length,
  done: projects.filter((p) => toUiStatus(p.status) === "done").length,
  work: projects.filter((p) => toUiStatus(p.status) === "work").length,
  draft: projects.filter((p) => toUiStatus(p.status) === "draft").length,
});

export const ProjectsView = () => {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useProjectList();
  const projects = useMemo(() => data ?? [], [data]);

  const stats = useMemo(() => computeStats(projects), [projects]);
  const filterCounts = useMemo(() => computeFilterCounts(projects), [projects]);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) => matchesFilter(p, filter) && matchesSearch(p, search),
      ),
    [projects, filter, search],
  );

  return (
    <>
      <section className="border-b border-line py-14">
        <div className="mx-auto flex max-w-[1280px] items-end justify-between gap-8 px-8">
          <div>
            <div className="mb-3.5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-50">
              <span className="h-px w-6 bg-burn-500" />
              WORKSPACE
            </div>
            <h1 className="display-italic m-0 text-[64px] leading-none tracking-[-0.02em]">
              프로젝트
              <em className="not-italic display-italic text-burn-500">.</em>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              최근 수정순
              <ArrowDown size={12} strokeWidth={1.5} />
            </Button>
            <Button asChild variant="accent" size="sm">
              <Link href="/studio/new">
                <Plus size={14} strokeWidth={1.6} />
                신규 프로젝트
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-[1280px] px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            <Stat label="전체 프로젝트" value={String(stats.totalCount)} suffix="건" first />
            <Stat
              label="생성 완료"
              value={String(stats.doneCount)}
              suffix="건"
              emphasized
            />
            <Stat
              label="총 합성 면적"
              value={NUM_FORMAT.format(stats.totalSqm)}
              suffix="㎡"
            />
            <Stat label="이번 달 신규" value="—" suffix="건" trend="백엔드 연결 후" last />
          </div>
        </div>
      </section>

      <ProjectsToolbar
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
        counts={filterCounts}
      />

      <section className="pb-[120px] pt-12">
        <div className="mx-auto max-w-[1280px] px-8">
          {isError ? (
            <div className="mb-7 rounded-md border border-burn-200 bg-burn-50 px-4 py-3 text-[13px] text-burn-700">
              프로젝트 목록을 불러오지 못했습니다. {error.message}
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            <NewProjectCard />

            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
              : null}

            {!isLoading
              ? filtered.map((p) => <ProjectCard key={p.id} project={p} />)
              : null}

            {!isLoading && projects.length === 0 ? (
              <div className="col-span-full py-10 text-center text-ink-50">
                아직 프로젝트가 없습니다. <em className="display-italic text-burn-500">새 프로젝트</em>로 시작해보세요.
              </div>
            ) : null}

            {!isLoading && projects.length > 0 && filtered.length === 0 ? (
              <div className="col-span-full py-16 text-center text-ink-50">
                조건에 맞는 프로젝트가 없습니다.
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};

type StatProps = {
  label: string;
  value: string;
  suffix: string;
  trend?: string;
  emphasized?: boolean;
  first?: boolean;
  last?: boolean;
};

const Stat = ({ label, value, suffix, trend, emphasized, first, last }: StatProps) => (
  <div
    className={
      [
        "py-8",
        first ? "" : "md:pl-8",
        last ? "" : "md:border-r md:border-line md:pr-8",
      ]
        .filter(Boolean)
        .join(" ")
    }
  >
    <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50">
      {label}
    </div>
    <div className="display-italic flex items-baseline text-[40px] leading-none tracking-[-0.02em] not-italic">
      {emphasized ? (
        <em className="display-italic text-burn-500">{value}</em>
      ) : (
        <span>{value}</span>
      )}
      <sup className="ml-1 align-top text-sm text-ink-50">{suffix}</sup>
    </div>
    {trend ? (
      <div className="mt-2.5 inline-flex items-center gap-1 text-[12px] text-ink-50">
        <TrendingUp size={10} strokeWidth={1.4} />
        {trend}
      </div>
    ) : null}
  </div>
);

const CardSkeleton = () => (
  <div className="overflow-hidden rounded-lg border border-line bg-white">
    <div className="aspect-[4/3] animate-pulse bg-paper-2" />
    <div className="px-[22px] pb-[22px] pt-5">
      <div className="mb-2.5 h-3 w-1/3 animate-pulse rounded bg-paper-2" />
      <div className="mb-2 h-6 w-2/3 animate-pulse rounded bg-paper-2" />
      <div className="mb-5 h-3 w-1/2 animate-pulse rounded bg-paper-2" />
      <div className="h-3 w-full animate-pulse rounded bg-paper-2" />
    </div>
  </div>
);
