"use client";

import { useId } from "react";
import { PARCELS, type ParcelId } from "../lib/data";

export type AppStep = "map" | "detail" | "conditions";

export type Conditions = {
  use: string;
  floors: number;
  style: string;
  far: number;
  budget: number;
};

type Props = {
  selected: ParcelId | null;
  step: AppStep;
  conditions: Conditions;
  setSelected: (id: ParcelId | null) => void;
  setStep: (s: AppStep) => void;
  setConditions: (c: Conditions) => void;
  startGen: () => void;
};

const PARCEL_POSITIONS: Record<ParcelId, { left: string; top: string; width: string; height: string }> = {
  p1: { left: "6%", top: "8%", width: "18%", height: "18%" },
  p2: { left: "28%", top: "6%", width: "14%", height: "22%" },
  p3: { left: "6%", top: "34%", width: "14%", height: "24%" },
  p4: { left: "48%", top: "36%", width: "22%", height: "22%" },
  p5: { left: "78%", top: "14%", width: "16%", height: "30%" },
  p6: { left: "30%", top: "68%", width: "18%", height: "24%" },
  p7: { left: "54%", top: "68%", width: "14%", height: "24%" },
  p8: { left: "78%", top: "54%", width: "18%", height: "38%" },
};

export function Studio({
  selected,
  step,
  conditions,
  setSelected,
  setStep,
  setConditions,
  startGen,
}: Props) {
  const selectParcel = (id: ParcelId) => {
    setSelected(id);
    setStep("detail");
  };

  return (
    <section className="view active" id="view-app">
      <div className="app">
        <aside className="pane" aria-label="필터">
          <div className="pane-head">
            <div className="pane-h">필터</div>
            <span className="pane-tag">골라내기</span>
          </div>
          <div className="pane-body">
            <div className="field-grp" role="group" aria-label="용도지역">
              <div className="field-lbl">용도지역</div>
              <div className="chips-row">
                <span className="pill on" aria-hidden="true">전체</span>
                <span className="pill" aria-hidden="true">3종일반</span>
                <span className="pill" aria-hidden="true">준주거</span>
                <span className="pill" aria-hidden="true">상업</span>
              </div>
            </div>
            <div className="field-grp">
              <label className="field-lbl" htmlFor="filter-area">
                <span>대지면적</span>
                <span className="field-val">~ 500m²</span>
              </label>
              <input id="filter-area" type="range" min={100} max={1000} defaultValue={500} />
            </div>
            <div className="field-grp" role="group" aria-label="도로 접면">
              <div className="field-lbl">도로 접면</div>
              <div className="chips-row">
                <span className="pill" aria-hidden="true">4m+</span>
                <span className="pill on" aria-hidden="true">8m+</span>
                <span className="pill" aria-hidden="true">12m+</span>
              </div>
            </div>
            <hr className="field-divider" />
            <div className="field-lbl" style={{ marginBottom: 14 }}>
              최근 본 필지
            </div>
            <div>
              {(["p2", "p4", "p1"] as ParcelId[]).map((id) => {
                const p = PARCELS[id];
                const sel = selected === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => selectParcel(id)}
                    className="recent-parcel"
                    aria-pressed={sel}
                    style={{
                      padding: "12px 14px",
                      background: sel ? "var(--ink)" : "var(--bg-2)",
                      color: sel ? "var(--paper)" : "var(--ink)",
                      borderRadius: 10,
                      marginBottom: 6,
                      cursor: "pointer",
                      transition: "all 0.15s",
                      border: "none",
                      textAlign: "left",
                      width: "100%",
                      display: "block",
                    }}
                  >
                    <div style={{ fontFamily: "var(--serif)", fontSize: 18, lineHeight: 1 }}>
                      {p.addr}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--mono)",
                        fontSize: 10,
                        color: sel ? "rgba(245,243,238,0.6)" : "var(--ink-soft)",
                        letterSpacing: "0.05em",
                        marginTop: 4,
                      }}
                    >
                      {p.area}m² · {p.zone}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="map-stage" role="application" aria-label="필지 지도">
          <div className="grid-bg" aria-hidden="true" />
          <div className="road" style={{ top: "30%", left: "-10%", right: "-10%", height: 24, transform: "rotate(-4deg)" }} aria-hidden="true" />
          <div className="road" style={{ top: "62%", left: "-10%", right: "-10%", height: 18, transform: "rotate(2deg)" }} aria-hidden="true" />
          <div className="road" style={{ left: "42%", top: "-10%", bottom: "-10%", width: 18, transform: "rotate(8deg)" }} aria-hidden="true" />
          <div className="road" style={{ left: "74%", top: "-10%", bottom: "-10%", width: 14, transform: "rotate(-3deg)" }} aria-hidden="true" />

          {(Object.keys(PARCEL_POSITIONS) as ParcelId[]).map((id) => (
            <button
              key={id}
              type="button"
              className={`blk ${selected === id ? "sel" : ""}`}
              style={PARCEL_POSITIONS[id]}
              onClick={() => selectParcel(id)}
              aria-label={`${PARCELS[id].addr} · ${PARCELS[id].area}m² · ${PARCELS[id].zone}`}
              aria-pressed={selected === id}
            />
          ))}

          <div className="lbl" style={{ left: "8%", top: "30%" }} aria-hidden="true">
            테헤란로
          </div>
          <div className="lbl" style={{ left: "46%", top: "8%", transform: "rotate(8deg)" }} aria-hidden="true">
            강남대로
          </div>

          <div className="map-search">
            <input
              placeholder="🔍  지번/도로명 검색  ·  예: 역삼동 727-3"
              aria-label="지번 또는 도로명 검색"
              type="search"
            />
            <div className="map-tools" role="group" aria-label="지도 표시 방식">
              <button className="on" aria-pressed="true" aria-label="지적도 보기">
                지적
              </button>
              <button aria-pressed="false" aria-label="위성사진 보기">위성</button>
              <button aria-pressed="false" aria-label="지형도 보기">지형</button>
            </div>
          </div>

          <div className="map-legend" aria-label="지도 범례">
            <div className="head">범례</div>
            <div>● 필지 클릭 가능</div>
            <div>● 선택됨</div>
            <div style={{ marginTop: 6, color: "rgba(245,243,238,0.5)" }}>축척 1:2000 · 강남구</div>
          </div>

          <div className="map-zoom" role="group" aria-label="지도 확대 축소">
            <button aria-label="확대">＋</button>
            <button aria-label="축소">−</button>
          </div>
        </div>

        <aside className="pane right" aria-label="필지 정보 및 조건">
          <RightPane
            selected={selected}
            step={step}
            conditions={conditions}
            setStep={setStep}
            setConditions={setConditions}
            setSelected={setSelected}
            startGen={startGen}
          />
        </aside>
      </div>
    </section>
  );
}

function RightPane({
  selected,
  step,
  conditions,
  setStep,
  setConditions,
  setSelected,
  startGen,
}: {
  selected: ParcelId | null;
  step: AppStep;
  conditions: Conditions;
  setStep: (s: AppStep) => void;
  setConditions: (c: Conditions) => void;
  setSelected: (id: ParcelId | null) => void;
  startGen: () => void;
}) {
  const floorsId = useId();
  const farId = useId();
  const budgetId = useId();

  if (!selected) {
    return (
      <>
        <div className="pane-head">
          <div className="pane-h">필지 정보</div>
          <span className="pane-tag">비어있음</span>
        </div>
        <div className="pane-body">
          <div style={{ textAlign: "center", padding: "40px 16px" }}>
            <div
              aria-hidden="true"
              style={{
                fontFamily: "var(--serif)",
                fontSize: 48,
                color: "var(--accent)",
                fontStyle: "italic",
                lineHeight: 1,
              }}
            >
              ←
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: 24,
                marginTop: 16,
                lineHeight: 1.2,
              }}
            >
              지도에서 필지를
              <br />
              선택하세요
            </div>
            <div
              style={{
                fontFamily: "var(--mono)",
                fontSize: 10,
                color: "var(--ink-soft)",
                letterSpacing: "0.1em",
                marginTop: 8,
              }}
            >
              지도에서 필지를 클릭해 주세요
            </div>
          </div>
          <hr className="field-divider" />
          <div className="info-card">
            <div className="k">TIP</div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--ink-2)", marginTop: 6 }}>
              필지 여러 개를 시안으로 만들어 두고 나중에 비교할 수 있어요.
            </div>
          </div>
        </div>
      </>
    );
  }

  const p = PARCELS[selected];

  if (step === "detail") {
    const grossArea = Math.floor((p.area * p.far) / 100 / 3.3);
    return (
      <>
        <div className="pane-head">
          <div className="pane-h">{p.addr}</div>
          <span className="pane-tag">선택됨</span>
        </div>
        <div className="pane-body">
          <div className="info-card">
            <div className="k">최대 연면적</div>
            <div className="v">
              <em>{grossArea.toLocaleString()}</em> 평
            </div>
          </div>
          <div className="info-row">
            <span className="k">대지면적</span>
            <span className="v">{p.area} m²</span>
          </div>
          <div className="info-row">
            <span className="k">용도지역</span>
            <span className="v">{p.zone}</span>
          </div>
          <div className="info-row">
            <span className="k">용적률</span>
            <span className="v">{p.far}%</span>
          </div>
          <div className="info-row">
            <span className="k">건폐율</span>
            <span className="v">{p.bcr}%</span>
          </div>
          <div className="info-row">
            <span className="k">도로 접면</span>
            <span className="v">{p.roads}</span>
          </div>
          <div className="info-row">
            <span className="k">최대 층수</span>
            <span className="v" style={{ color: "var(--accent)" }}>
              {p.maxF} F
            </span>
          </div>
          <button className="btn-block" onClick={() => setStep("conditions")}>
            조건 입력 <span aria-hidden="true">→</span>
          </button>
          <button
            className="btn-block ghost"
            onClick={() => {
              setSelected(null);
              setStep("map");
            }}
          >
            다른 필지 선택
          </button>
        </div>
      </>
    );
  }

  const c = conditions;
  const grossArea = Math.floor((p.area * c.far) / 100 / 3.3);
  const cost = Math.floor((grossArea * 680) / 10000);
  const floorsCapped = Math.min(c.floors, p.maxF);
  const farCapped = Math.min(c.far, p.far);

  return (
    <>
      <div className="pane-head">
        <div className="pane-h">조건 입력</div>
        <span className="pane-tag">설정</span>
      </div>
      <div className="pane-body">
        <div
          style={{
            fontFamily: "var(--mono)",
            fontSize: 10,
            color: "var(--ink-soft)",
            letterSpacing: "0.08em",
            marginBottom: 4,
          }}
        >
          필지
        </div>
        <div style={{ fontFamily: "var(--serif)", fontSize: 22, lineHeight: 1, marginBottom: 20 }}>{p.addr}</div>

        <div className="field-grp" role="group" aria-label="용도">
          <div className="field-lbl">
            <span>용도</span>
          </div>
          <div className="chips-row">
            {["오피스", "주거", "상업", "복합", "호텔"].map((u) => (
              <button
                key={u}
                type="button"
                className={`pill ${c.use === u ? "on" : ""}`}
                onClick={() => setConditions({ ...c, use: u })}
                aria-pressed={c.use === u}
              >
                {u}
              </button>
            ))}
          </div>
        </div>

        <div className="field-grp">
          <label className="field-lbl" htmlFor={floorsId}>
            <span>층수</span>
            <span className="field-val">
              {floorsCapped}F · {(floorsCapped * 3.5).toFixed(1)}m
            </span>
          </label>
          <input
            id={floorsId}
            type="range"
            min={2}
            max={p.maxF}
            value={floorsCapped}
            onChange={(e) => setConditions({ ...c, floors: +e.target.value })}
            aria-valuetext={`${floorsCapped}층 · ${(floorsCapped * 3.5).toFixed(1)}미터`}
          />
        </div>

        <div className="field-grp" role="group" aria-label="스타일">
          <div className="field-lbl">
            <span>스타일</span>
          </div>
          <div className="chips-row">
            {["Minimal", "Modern", "Classic", "Glass", "Brick"].map((s) => (
              <button
                key={s}
                type="button"
                className={`pill ${c.style === s ? "on" : ""}`}
                onClick={() => setConditions({ ...c, style: s })}
                aria-pressed={c.style === s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="field-grp">
          <label className="field-lbl" htmlFor={farId}>
            <span>용적률</span>
            <span className="field-val">{farCapped}%</span>
          </label>
          <input
            id={farId}
            type="range"
            min={100}
            max={p.far}
            step={50}
            value={farCapped}
            onChange={(e) => setConditions({ ...c, far: +e.target.value })}
            aria-valuetext={`${farCapped}퍼센트`}
          />
        </div>

        <div className="field-grp">
          <label className="field-lbl" htmlFor={budgetId}>
            <span>예산</span>
            <span className="field-val">{c.budget}억</span>
          </label>
          <input
            id={budgetId}
            type="range"
            min={20}
            max={500}
            step={10}
            value={c.budget}
            onChange={(e) => setConditions({ ...c, budget: +e.target.value })}
            aria-valuetext={`${c.budget}억원`}
          />
        </div>

        <hr className="field-divider" />
        <div className="info-card">
          <div className="k">예상 연면적 / 공사비</div>
          <div className="v">
            <em>{grossArea.toLocaleString()}</em> 평 · <em>{cost}</em> 억
          </div>
        </div>

        <button className="btn-block" onClick={startGen}>
          AI 생성 시작 <span aria-hidden="true">↗</span>
        </button>
        <button className="btn-block ghost" onClick={() => setStep("detail")}>
          필지로 돌아가기
        </button>
      </div>
    </>
  );
}
