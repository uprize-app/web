"use client";

import { PARCELS, type ParcelId } from "../lib/data";
import type { Conditions } from "./Studio";

type Props = {
  selected: ParcelId | null;
  conditions: Conditions;
  goto: (v: "app" | "dashboard") => void;
  toast: (m: string) => void;
};

export function Result({ selected, conditions, goto, toast }: Props) {
  const p = PARCELS[selected ?? "p2"];
  const c = conditions;
  const district = p.addr.split(" ")[0];

  return (
    <section className="view active" id="view-result">
      <div className="result">
        <div className="result-head">
          <div>
            <div className="result-meta">생성 · 2026.04.20 · 14:32</div>
            <h1 className="result-h">
              {district} {c.use}, <em>{c.floors}층</em>
            </h1>
            <div
              className="subtitle"
              style={{
                fontFamily: "var(--mono)",
                fontSize: 11,
                color: "var(--ink-soft)",
                letterSpacing: "0.05em",
                wordBreak: "keep-all",
              }}
            >
              {p.addr} · {p.area}m² · {c.use} · {c.style}
            </div>
          </div>
          <div className="result-actions" role="group" aria-label="결과 액션">
            <button className="btn-ghost" onClick={() => goto("app")} aria-label="조건 수정으로 돌아가기">
              <span aria-hidden="true">↩</span> 조건 수정
            </button>
            <button className="btn-ghost" onClick={() => toast("PDF 다운로드 시작")} aria-label="PDF로 내보내기">
              PDF
            </button>
            <button className="btn-ghost" onClick={() => toast("DXF 다운로드 시작")} aria-label="DXF로 내보내기">
              DXF
            </button>
            <button className="btn-cta" onClick={() => toast("프로젝트로 저장됨")}>
              저장 <span className="arrow" aria-hidden="true">↗</span>
            </button>
          </div>
        </div>

        <div className="result-layout">
          <div className="result-grid" role="group" aria-label="4각도 외관 렌더">
            {[
              { cls: "front", label: "정면", num: "01 / 04" },
              { cls: "back", label: "후면", num: "02 / 04" },
              { cls: "left", label: "좌측", num: "03 / 04" },
              { cls: "right", label: "우측", num: "04 / 04" },
            ].map((r) => (
              <figure key={r.cls} className={`render ${r.cls}`} aria-label={`${r.label} 외관 렌더 (${r.num})`}>
                <span className="tag">{r.label}</span>
                <button
                  className="zoom"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast("줌 모드");
                  }}
                  aria-label={`${r.label} 렌더 크게 보기`}
                >
                  <span aria-hidden="true">⤢</span>
                </button>
                <div className="b" aria-hidden="true" />
                <div className="ground" aria-hidden="true" />
                <span className="num" aria-hidden="true">{r.num}</span>
              </figure>
            ))}
          </div>

          <aside className="result-aside">
            <div className="h">프로젝트 개요</div>
            <div className="aside-section">
              <div className="lbl">법규</div>
              <div className="row">
                <span className="k">대지면적</span>
                <span className="v">{p.area}m²</span>
              </div>
              <div className="row">
                <span className="k">용적률</span>
                <span className="v">{p.far}%</span>
              </div>
              <div className="row">
                <span className="k">건폐율</span>
                <span className="v">{p.bcr}%</span>
              </div>
              <div className="row">
                <span className="k">최대 층수</span>
                <span className="v">{p.maxF}층</span>
              </div>
            </div>
            <div className="aside-section">
              <div className="lbl">프로그램</div>
              <div className="val">
                {c.use} · {c.floors}층
              </div>
              <div className="row">
                <span className="k">연면적</span>
                <span className="v">{Math.floor((p.area * c.far) / 100).toLocaleString()} m²</span>
              </div>
              <div className="row">
                <span className="k">분양면적</span>
                <span className="v">{Math.floor((p.area * c.far) / 100 / 3.3).toLocaleString()} 평</span>
              </div>
            </div>
            <div className="aside-section">
              <div className="lbl">예산</div>
              <div className="val">
                {c.budget}억 /{" "}
                <span style={{ color: "var(--accent)", fontStyle: "italic" }}>{c.budget}억</span>
              </div>
              <div className="row">
                <span className="k">평당 공사비</span>
                <span className="v">680만원</span>
              </div>
              <div className="row">
                <span className="k">예상 분양가</span>
                <span className="v">평당 1,200만</span>
              </div>
            </div>
            <div className="aside-section">
              <div className="lbl">스타일</div>
              <div className="val">{c.style} · 유리 커튼월</div>
            </div>
            <button className="btn-block" onClick={() => toast("재생성을 위해 조건을 살짝 바꿔 보세요.")}>
              다시 생성 ↻
            </button>
            <button className="btn-block ghost" onClick={() => goto("dashboard")}>
              프로젝트 목록
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
}
