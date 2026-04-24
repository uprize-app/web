"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardHeader } from "@/features/project-list/components/DashboardHeader";
import {
  PROJECT_FILTERS,
  ProjectFilterBar,
  type ProjectFilter,
} from "@/features/project-list/components/ProjectFilterBar";
import { ProjectListGrid } from "@/features/project-list/components/ProjectListGrid";
import {
  ProjectListEmpty,
  ProjectListError,
  ProjectListLoading,
} from "@/features/project-list/components/ProjectListStates";
import { useProjectList } from "@/features/project-list/hooks/useProjectList.query";
import type { Project } from "@/shared/types/project.types";

const matchesFilter = (project: Project, filter: ProjectFilter): boolean => {
  if (filter === "all") return true;
  return project.status === filter;
};

const matchesSearch = (project: Project, query: string): boolean => {
  if (!query) return true;
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [project.address, project.roadAddress, project.zoning]
    .filter((v): v is string => Boolean(v))
    .some((value) => value.toLowerCase().includes(needle));
};

export const DashboardView = () => {
  const router = useRouter();
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [search, setSearch] = useState("");
  const { data: projects, isLoading, isError, error, refetch } = useProjectList();

  const filtered = useMemo(() => {
    if (!projects) return [];
    return projects.filter((p) => matchesFilter(p, filter) && matchesSearch(p, search));
  }, [projects, filter, search]);

  const counts = useMemo<Record<ProjectFilter, number>>(() => {
    const base: Record<ProjectFilter, number> = { all: 0, draft: 0, ready: 0, generated: 0 };
    if (!projects) return base;
    base.all = projects.length;
    projects.forEach((p) => {
      base[p.status] += 1;
    });
    return base;
  }, [projects]);

  const goToNew = () => router.push("/studio/new");

  const openProject = (project: Project) => {
    if (project.status === "generated") {
      router.push(`/studio/${project.id}/result`);
      return;
    }
    router.push(`/studio/${project.id}/conditions`);
  };

  return (
    <section className="view active" id="view-dashboard">
      <div className="dash">
        <DashboardHeader count={projects?.length ?? 0} onCreate={goToNew} />
        <ProjectFilterBar
          filter={filter}
          onFilterChange={setFilter}
          search={search}
          onSearchChange={setSearch}
          counts={counts}
        />

        {isLoading ? <ProjectListLoading /> : null}

        {isError ? (
          <ProjectListError
            message={error instanceof Error ? error.message : "네트워크 오류"}
            onRetry={() => refetch()}
          />
        ) : null}

        {!isLoading && !isError && projects && projects.length === 0 ? (
          <ProjectListEmpty onCreate={goToNew} />
        ) : null}

        {!isLoading && !isError && filtered.length > 0 ? (
          <ProjectListGrid projects={filtered} onOpen={openProject} onCreate={goToNew} />
        ) : null}

        {!isLoading && !isError && projects && projects.length > 0 && filtered.length === 0 ? (
          <p className="mt-6 text-center text-sm text-ink-soft">
            {`${PROJECT_FILTERS.find((f) => f.id === filter)?.label} 조건 또는 검색어에 맞는 프로젝트가 없어요.`}
          </p>
        ) : null}
      </div>
    </section>
  );
};
