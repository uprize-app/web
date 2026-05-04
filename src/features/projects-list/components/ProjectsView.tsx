"use client";

import { useMemo, useState } from "react";
import { useQueries } from "@tanstack/react-query";

import { fetchProjectGenerations } from "@/features/generation/api/generation.api";
import { GENERATION_KEYS } from "@/features/generation/hooks/useGeneration.query";
import type { Generation, Project } from "@/shared/types/api.types";

import { useProjectList } from "../hooks/useProjectList.query";
import {
  formatAddress,
  formatProjectName,
  resolveProjectListStatus,
} from "../lib/projectView";
import type { ProjectFilter } from "../types/project.types";

import { NewProjectCard } from "./NewProjectCard";
import { ProjectCard } from "./ProjectCard";
import { ProjectsToolbar } from "./ProjectsToolbar";

const PROJECT_GENERATION_POLL_MS = 5_000;

const matchesFilter = (
  p: Project,
  f: ProjectFilter,
  generations: Generation[] | undefined,
) => {
  if (f === "all") return true;
  return resolveProjectListStatus(p.status, generations) === f;
};

const matchesSearch = (p: Project, q: string) => {
  if (!q.trim()) return true;
  const lc = q.toLowerCase();
  return (
    formatProjectName(p).toLowerCase().includes(lc) ||
    formatAddress(p).toLowerCase().includes(lc)
  );
};

const computeFilterCounts = (
  projects: Project[],
  generationByProjectId: ReadonlyMap<string, Generation[]>,
) => ({
  all: projects.length,
  done: projects.filter(
    (p) =>
      resolveProjectListStatus(p.status, generationByProjectId.get(p.id)) ===
      "done",
  ).length,
  work: projects.filter(
    (p) =>
      resolveProjectListStatus(p.status, generationByProjectId.get(p.id)) ===
      "work",
  ).length,
});

export const ProjectsView = () => {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = useProjectList();
  const projects = useMemo(() => data ?? [], [data]);
  const generationQueries = useQueries({
    queries: projects.map((p) => ({
      queryKey: GENERATION_KEYS.projectList(p.id),
      queryFn: () => fetchProjectGenerations(p.id),
      refetchInterval: PROJECT_GENERATION_POLL_MS,
      refetchIntervalInBackground: false,
      staleTime: 15_000,
    })),
  });

  const generationByProjectId = useMemo(
    () =>
      new Map(
        projects.map((p, i) => [
          p.id,
          generationQueries[i]?.data ?? [],
        ]),
      ),
    [projects, generationQueries],
  );

  const filterCounts = useMemo(
    () => computeFilterCounts(projects, generationByProjectId),
    [projects, generationByProjectId],
  );

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          matchesFilter(p, filter, generationByProjectId.get(p.id)) &&
          matchesSearch(p, search),
      ),
    [projects, filter, search, generationByProjectId],
  );

  return (
    <>
      <section className="border-b border-line py-14">
        <div className="mx-auto max-w-[1280px] px-8">
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
