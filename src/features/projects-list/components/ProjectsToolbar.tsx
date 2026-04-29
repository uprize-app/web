"use client";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ProjectFilter } from "../types/project.types";

const FILTER_LABEL: Record<ProjectFilter, string> = {
  all: "전체",
  work: "생성중",
  done: "완료",
  draft: "초안",
};

const FILTER_ORDER: ReadonlyArray<ProjectFilter> = ["all", "work", "done", "draft"];

type Props = {
  filter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  search: string;
  onSearchChange: (q: string) => void;
  counts: Record<ProjectFilter, number>;
};

export const ProjectsToolbar = ({
  filter,
  onFilterChange,
  search,
  onSearchChange,
  counts,
}: Props) => (
  <section className="sticky top-[72px] z-[5] border-b border-line bg-paper/90 py-7 backdrop-blur-md">
    <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-8 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-1 rounded-full bg-paper-2 p-1">
        {FILTER_ORDER.map((id) => {
          const active = filter === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onFilterChange(id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ease-out-expo",
                active ? "bg-ink text-paper" : "text-ink-50 hover:text-ink",
              )}
            >
              {FILTER_LABEL[id]}
              <span
                className={cn(
                  "font-mono text-[10px]",
                  active ? "text-burn-300" : "text-ink-30",
                )}
              >
                {counts[id]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative w-full md:w-[260px]">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-50"
          size={14}
          strokeWidth={1.4}
        />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="프로젝트명 또는 주소로 검색…"
          className="h-10 w-full rounded-full border border-line bg-white pl-10 pr-3.5 text-[13px] text-ink outline-none transition-all placeholder:text-ink-50 focus-visible:border-ink focus-visible:ring-2 focus-visible:ring-ink/10"
        />
      </div>
    </div>
  </section>
);
