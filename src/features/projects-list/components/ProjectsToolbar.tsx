"use client";

import { Search } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ProjectFilter } from "../types/project.types";

type FilterOption = { id: ProjectFilter; label: string; count: number };

const FILTERS: FilterOption[] = [
  { id: "all",   label: "전체",   count: 12 },
  { id: "work",  label: "생성중", count: 2 },
  { id: "done",  label: "완료",   count: 8 },
  { id: "draft", label: "초안",   count: 2 },
];

type Props = {
  filter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  search: string;
  onSearchChange: (q: string) => void;
};

export const ProjectsToolbar = ({
  filter,
  onFilterChange,
  search,
  onSearchChange,
}: Props) => (
  <section className="sticky top-[72px] z-[5] border-b border-line bg-paper/90 py-7 backdrop-blur-md">
    <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-8 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-1 rounded-full bg-paper-2 p-1">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onFilterChange(f.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-300 ease-out-expo",
                active
                  ? "bg-ink text-paper"
                  : "text-ink-50 hover:text-ink",
              )}
            >
              {f.label}
              <span
                className={cn(
                  "font-mono text-[10px]",
                  active ? "text-burn-300" : "text-ink-30",
                )}
              >
                {f.count}
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
