"use client";

import { useMemo, useState } from "react";
import { GALLERY_ITEMS, PROPS } from "../lib/data";

type Props = {
  toast: (m: string) => void;
};

const FILTERS = ["all", "오피스", "주거", "상업", "복합", "호텔", "물류"] as const;

export function Gallery({ toast }: Props) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");

  const items = useMemo(() => {
    if (filter === "all") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((i) => i.type === filter);
  }, [filter]);

  return (
    <section className="view active" id="view-gallery">
      <div className="gallery">
        <div className="gal-head">
          <div>
            <div className="label-meta">사례 · 24호 에디션</div>
            <h1 className="gal-h">
              짓지 <span className="strike">않은</span>
              <br />
              <em>건물들.</em>
            </h1>
          </div>
          <div>
            <p className="gal-sub">
              업라이즈 스튜디오에서 생성된 8,392개 중 선별. 실제 시행 사이트에 적용될 수도, 아닐 수도 있는 — 가능성의
              건축.
            </p>
            <div className="gal-stats">
              <div>
                <span className="v">8,392</span>
                <br />
                건물
              </div>
              <div>
                <span className="v">1,247</span>
                <br />
                필지
              </div>
              <div>
                <span className="v">36</span>
                <br />
                스튜디오
              </div>
            </div>
          </div>
        </div>

        <div className="gal-filters" role="group" aria-label="유형 필터">
          <div className="label-meta" aria-hidden="true">
            필터
          </div>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`pill ${filter === f ? "on" : ""}`}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f === "all" ? "전체" : f}
            </button>
          ))}
        </div>

        <div className="gal-grid">
          {items.map((i, idx) => {
            const p = PROPS[i.prop];
            return (
              <button
                key={`${i.n}-${idx}`}
                type="button"
                className="gal-item"
                onClick={() => toast(`${i.n} · 상세 보기`)}
                aria-label={`${i.n} · ${i.type} · ${i.loc} · ${i.spec}`}
              >
                <div
                  className={`gal-sky-${i.sky}`}
                  style={{ position: "absolute", inset: 0 }}
                  aria-hidden="true"
                />
                <div
                  className="gal-bldg"
                  style={{ left: p.left, right: p.right, top: p.top, bottom: p.bottom }}
                  aria-hidden="true"
                />
                <div className="gal-ground" aria-hidden="true" />
                <span className="tag" aria-hidden="true">
                  {String(idx + 1).padStart(3, "0")} · {i.type}
                </span>
                <div className="caption" aria-hidden="true">
                  <div className="name">{i.n}</div>
                  <div className="spec">
                    {i.loc} · {i.spec}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
