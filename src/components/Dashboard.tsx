"use client";

import { useMemo, useState } from "react";
import { PARCELS, PROJECTS, type Project } from "../lib/data";

type Props = {
  goto: (v: "app") => void;
  toast: (m: string) => void;
  openProject: (p: Project) => void;
};

export function Dashboard({ goto, toast, openProject }: Props) {
  const [filter, setFilter] = useState<"all" | "progress" | "done" | "archive">("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return PROJECTS.filter((pr) => {
      if (filter === "progress" && pr.status !== "progress") return false;
      if (filter === "done" && pr.status !== "done") return false;
      if (filter === "archive") return false;
      if (!s) return true;
      const p = PARCELS[pr.parcel];
      return pr.name.toLowerCase().includes(s) || p.addr.toLowerCase().includes(s);
    });
  }, [filter, search]);

  const counts = {
    all: PROJECTS.length,
    progress: PROJECTS.filter((p) => p.status === "progress").length,
    done: PROJECTS.filter((p) => p.status === "done").length,
    archive: 0,
  };

  return (
    <section className="view active" id="view-dashboard">
      <div className="dash">
        <div className="dash-head">
          <div>
            <div className="dash-meta">워크스페이스 · 스튜디오K</div>
            <h1 className="dash-h">
              프로젝트 <em>{PROJECTS.length}건</em>
            </h1>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-ghost" onClick={() => toast("비교할 프로젝트 2개 이상 선택해 주세요.")}>
              ⇄ 비교
            </button>
            <button className="btn-cta" onClick={() => goto("app")}>
              새 프로젝트 <span className="arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </div>

        <div className="dash-filters" role="group" aria-label="프로젝트 상태 필터">
          {(
            [
              ["all", "전체", counts.all],
              ["progress", "진행중", counts.progress],
              ["done", "완료", counts.done],
              ["archive", "아카이브", counts.archive],
            ] as const
          ).map(([key, label, count]) => (
            <button
              key={key}
              type="button"
              className={`filter-pill ${filter === key ? "active" : ""}`}
              onClick={() => setFilter(key)}
              aria-pressed={filter === key}
            >
              {label} <span className="count">{count}</span>
            </button>
          ))}
          <input
            className="search-input"
            placeholder="프로젝트 · 주소 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="프로젝트 및 주소 검색"
            type="search"
          />
        </div>

        <div className="proj-grid">
          {filtered.map((pr) => {
            const p = PARCELS[pr.parcel];
            return (
              <button
                key={pr.id}
                type="button"
                className="proj-card"
                onClick={() => openProject(pr)}
                aria-label={`${pr.name} · ${p.addr} · ${pr.use} · ${pr.status === "done" ? "완료" : "진행중"}`}
              >
                <div className="proj-thumb">
                  <div className="b" style={{ left: "22%", right: "22%", top: "18%", bottom: "32%" }} />
                  <div className="ground" />
                  <div className={`badge ${pr.status === "done" ? "done" : ""}`}>
                    {pr.status === "done" ? "완료" : "진행중"}
                  </div>
                  {pr.starred ? (
                    <div className="star" aria-label="즐겨찾기">
                      ★
                    </div>
                  ) : null}
                </div>
                <div className="proj-info">
                  <div className="proj-name">{pr.name}</div>
                  <div className="proj-meta">
                    {p.addr} · {pr.use} · {pr.floors}F
                  </div>
                  <div className="proj-foot">
                    <span>{pr.updated}</span>
                    <span className="proj-tag">{pr.style}</span>
                  </div>
                </div>
              </button>
            );
          })}
          <button
            type="button"
            className="proj-card-add"
            onClick={() => goto("app")}
            aria-label="새 프로젝트 시작"
          >
            <span className="plus" aria-hidden="true">
              +
            </span>
            <span className="lbl">새 프로젝트</span>
          </button>
        </div>
      </div>
    </section>
  );
}
