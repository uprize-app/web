"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, Plus, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";

import { MOCK_PROJECTS, STATS } from "../constants/mockProjects";
import type { ProjectFilter, Project } from "../types/project.types";

import { NewProjectCard } from "./NewProjectCard";
import { ProjectCard } from "./ProjectCard";
import { ProjectsToolbar } from "./ProjectsToolbar";

const matchesFilter = (p: Project, f: ProjectFilter) =>
  f === "all" ? true : p.status === f;

const matchesSearch = (p: Project, q: string) => {
  if (!q.trim()) return true;
  const lc = q.toLowerCase();
  return (
    p.name.toLowerCase().includes(lc) ||
    p.address.toLowerCase().includes(lc)
  );
};

export const ProjectsView = () => {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => MOCK_PROJECTS.filter((p) => matchesFilter(p, filter) && matchesSearch(p, search)),
    [filter, search],
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
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`py-8 ${i < STATS.length - 1 ? "md:border-r md:border-line md:pr-8" : ""} ${i > 0 ? "md:pl-8" : ""}`}
              >
                <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50">
                  {s.label}
                </div>
                <div className="display-italic flex items-baseline text-[40px] leading-none tracking-[-0.02em] not-italic">
                  {"emphasized" in s && s.emphasized ? (
                    <em className="display-italic text-burn-500">{s.value}</em>
                  ) : (
                    <span>{s.value}</span>
                  )}
                  <sup className="ml-1 align-top text-sm text-ink-50">{s.suffix}</sup>
                </div>
                {"trend" in s && s.trend ? (
                  <div className="mt-2.5 inline-flex items-center gap-1 text-[12px] text-[#4F8A6E]">
                    <TrendingUp size={10} strokeWidth={1.4} />
                    {s.trend}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectsToolbar
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
      />

      <section className="pb-[120px] pt-12">
        <div className="mx-auto max-w-[1280px] px-8">
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            <NewProjectCard />
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
            {filtered.length === 0 ? (
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
