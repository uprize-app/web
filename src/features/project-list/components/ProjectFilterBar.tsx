"use client";

import type { ChangeEvent } from "react";

export type ProjectFilter = "all" | "draft" | "ready" | "generated";

export const PROJECT_FILTERS: { id: ProjectFilter; label: string }[] = [
  { id: "all", label: "전체" },
  { id: "draft", label: "초안" },
  { id: "ready", label: "준비" },
  { id: "generated", label: "완료" },
];

type ProjectFilterBarProps = {
  filter: ProjectFilter;
  onFilterChange: (filter: ProjectFilter) => void;
  search: string;
  onSearchChange: (value: string) => void;
  counts: Record<ProjectFilter, number>;
};

export const ProjectFilterBar = ({
  filter,
  onFilterChange,
  search,
  onSearchChange,
  counts,
}: ProjectFilterBarProps) => {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <div className="dash-filters" role="group" aria-label="프로젝트 상태 필터">
      {PROJECT_FILTERS.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`filter-pill ${filter === item.id ? "active" : ""}`}
          onClick={() => onFilterChange(item.id)}
          aria-pressed={filter === item.id}
        >
          {item.label} <span className="count">{counts[item.id]}</span>
        </button>
      ))}
      <input
        className="search-input"
        placeholder="프로젝트 · 주소 검색"
        value={search}
        onChange={handleSearch}
        aria-label="프로젝트 및 주소 검색"
        type="search"
      />
    </div>
  );
};
