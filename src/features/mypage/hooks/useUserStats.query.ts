"use client";

import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";

import {
  fetchGenerationExports,
  fetchProjectGenerations,
} from "@/features/generation/api/generation.api";
import { useProjectList } from "@/features/projects-list/hooks/useProjectList.query";

import type { Export, Generation, Project } from "@/shared/types/api.types";

const STATS_STALE_MS = 60_000;

const isSameMonth = (iso: string, ref: Date) => {
  const d = new Date(iso);
  return (
    d.getFullYear() === ref.getFullYear() &&
    d.getMonth() === ref.getMonth()
  );
};

type UserStats = {
  projects: Project[];
  recentProjects: Project[];
  totalProjects: number;
  thisMonthProjects: number;
  completedProjects: number;
  totalGenerations: number;
  totalExports: number;
  thisMonthExports: number;
  /** 사용량 기준 한도. 추후 plan 별로 분기할 수 있도록 상수화. */
  monthlyProjectQuota: number;
  monthlyExportQuota: number;
  isLoading: boolean;
};

/**
 * 마이페이지 통계 집계 훅.
 * 1) 프로젝트 목록을 가져오고
 * 2) 각 프로젝트의 generation 목록을 병렬 조회
 * 3) 각 generation 의 export(pdf) 이력을 병렬 조회
 * 후 합산. MVP 규모(프로젝트 수 < ~20) 가정.
 */
export const useUserStats = (): UserStats => {
  const { data: projects = [], isLoading: projectsLoading } = useProjectList();

  const generationQueries = useQueries({
    queries: projects.map((p) => ({
      queryKey: ["generations", "list", p.id] as const,
      queryFn: () => fetchProjectGenerations(p.id),
      staleTime: STATS_STALE_MS,
    })),
  });

  const allGenerations: Generation[] = useMemo(
    () => generationQueries.flatMap((q) => q.data ?? []),
    [generationQueries],
  );

  const exportQueries = useQueries({
    queries: allGenerations.map((g) => ({
      queryKey: ["generations", "exports", g.id] as const,
      queryFn: () => fetchGenerationExports(g.id),
      staleTime: STATS_STALE_MS,
    })),
  });

  const allExports: Export[] = useMemo(
    () => exportQueries.flatMap((q) => q.data ?? []),
    [exportQueries],
  );

  const generationsLoading = generationQueries.some((q) => q.isLoading);
  const exportsLoading = exportQueries.some((q) => q.isLoading);

  const stats = useMemo<UserStats>(() => {
    const now = new Date();
    const sortedRecent = [...projects]
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .slice(0, 4);

    return {
      projects,
      recentProjects: sortedRecent,
      totalProjects: projects.length,
      thisMonthProjects: projects.filter((p) => isSameMonth(p.createdAt, now))
        .length,
      completedProjects: projects.filter((p) => p.status === "generated").length,
      totalGenerations: allGenerations.length,
      totalExports: allExports.length,
      thisMonthExports: allExports.filter((e) => isSameMonth(e.createdAt, now))
        .length,
      monthlyProjectQuota: 10,
      monthlyExportQuota: 30,
      isLoading: projectsLoading || generationsLoading || exportsLoading,
    };
  }, [
    projects,
    allGenerations,
    allExports,
    projectsLoading,
    generationsLoading,
    exportsLoading,
  ]);

  return stats;
};
