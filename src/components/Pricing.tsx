"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "../lib/data";

type Props = {
  toast: (m: string) => void;
};

export function Pricing({ toast }: Props) {
  const [tab, setTab] = useState<"subscribe" | "points">("subscribe");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <section className="view active" id="view-pricing">
      <div className="pricing">
        <div className="pr-head">
          <div>
            <div className="label-meta">요금 · 2026</div>
            <h1 className="pr-h">
              필요한 만큼,
              <br />
              <em>딱 그만큼.</em>
            </h1>
          </div>
          <div>
            <p className="pr-sub">월 구독으로 자주 쓰거나, 필요할 때만 포인트로. 한 장당 얼마. 숨기는 비용은 없습니다.</p>
          </div>
        </div>

        <div className="pr-tabs" role="tablist" aria-label="요금 유형">
          <button
            role="tab"
            aria-selected={tab === "subscribe"}
            id="tab-subscribe"
            aria-controls="panel-subscribe"
            className={`pr-tab ${tab === "subscribe" ? "on" : ""}`}
            onClick={() => setTab("subscribe")}
          >
            월 구독{" "}
            <span className="pr-save" style={{ background: "var(--ink)" }}>
              2개월 무료
            </span>
          </button>
          <button
            role="tab"
            aria-selected={tab === "points"}
            id="tab-points"
            aria-controls="panel-points"
            className={`pr-tab ${tab === "points" ? "on" : ""}`}
            onClick={() => setTab("points")}
          >
            포인트 충전
          </button>
        </div>

        <div
          className={`plans-wrap ${tab !== "subscribe" ? "off" : ""}`}
          role="tabpanel"
          id="panel-subscribe"
          aria-labelledby="tab-subscribe"
          hidden={tab !== "subscribe"}
        >
          <div className="plan-grid">
            <div className="plan">
              <div className="plan-tag">첫 걸음</div>
              <div className="plan-name">스케치</div>
              <p className="plan-desc">처음 시작하는 시행사 · 달에 열 건 안팎의 가벼운 검토.</p>
              <div className="plan-price">
                <span className="num">₩49,000</span>
                <span className="unit">/월 · 부가세 별도</span>
              </div>
              <div className="plan-divider" />
              <ul className="plan-list">
                <li>
                  매달 <strong>30 포인트</strong> 지급 (건물 한 채 ≈ 3P)
                </li>
                <li>네 면 외관 · 기본 해상도</li>
                <li>
                  프로젝트 저장 <strong>10개</strong>
                </li>
                <li>PDF · JPG 내보내기</li>
                <li>기본 법규 분석</li>
                <li>이메일 지원</li>
              </ul>
              <button className="plan-cta ghost" onClick={() => toast("스케치 구독 시작")}>
                시작하기 <span aria-hidden="true">↗</span>
              </button>
            </div>

            <div className="plan feat">
              <div className="plan-badge">가장 많이 선택</div>
              <div className="plan-tag">프로</div>
              <div className="plan-name">
                스튜디오 <em>프로</em>
              </div>
              <p className="plan-desc">본격 검토 단계의 시행팀 · 달에 열 건 이상의 대량 시안이 필요할 때.</p>
              <div className="plan-price">
                <span className="num">₩189,000</span>
                <span className="unit">/월 · 부가세 별도</span>
                <span className="strike">₩230,000</span>
              </div>
              <div className="plan-divider" />
              <ul className="plan-list">
                <li>
                  매달 <strong>150 포인트</strong> 지급
                </li>
                <li>
                  네 면 외관 + <strong>조감도 · 내부</strong> 무제한
                </li>
                <li>
                  프로젝트 저장 <strong>무제한</strong>
                </li>
                <li>PDF · DXF · DWG 내보내기</li>
                <li>인허가 사전 검토 리포트</li>
                <li>팀 공유 · 댓글 · 버전 관리</li>
                <li>우선 생성 큐 · 우선 지원</li>
              </ul>
              <button className="plan-cta" onClick={() => toast("스튜디오 프로 구독 시작")}>
                프로 시작하기 <span aria-hidden="true">↗</span>
              </button>
            </div>

            <div className="plan">
              <div className="plan-tag">기업</div>
              <div className="plan-name">아틀리에</div>
              <p className="plan-desc">
                다섯 사람 이상의 설계팀 · 대규모 포트폴리오 검토와 맞춤 통합이 필요할 때.
              </p>
              <div className="plan-price">
                <span className="num">맞춤</span>
                <span className="unit">연 단위 계약</span>
              </div>
              <div className="plan-divider" />
              <ul className="plan-list">
                <li>
                  포인트 <strong>무제한</strong>
                </li>
                <li>자체 스타일 · 로고 학습</li>
                <li>API · CAD 연동</li>
                <li>전용 서버 · SSO · 감사 로그</li>
                <li>온사이트 교육 · 전담 매니저</li>
                <li>법무 · 계약 검토 지원</li>
              </ul>
              <button className="plan-cta ghost" onClick={() => toast("영업팀 연결 · 24시간 이내 회신")}>
                문의하기 <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`points-wrap ${tab === "points" ? "on" : ""}`}
          role="tabpanel"
          id="panel-points"
          aria-labelledby="tab-points"
          hidden={tab !== "points"}
        >
          <div className="pts-grid">
            {[
              { pack: "팩 01", pts: 10, bldg: "≈ 3채", price: "₩19,000", per: "장당 ₩6,333", save: null, feat: false },
              { pack: "팩 02", pts: 30, bldg: "≈ 10채", price: "₩48,000", per: "장당 ₩4,800 · ₩1,700 절약", save: "−15%", feat: false },
              { pack: "팩 03 · 추천", pts: 100, bldg: "≈ 33채", price: "₩130,000", per: "장당 ₩3,900 · ₩60,000 절약", save: "−30%", feat: true },
              { pack: "팩 04 · 벌크", pts: 500, bldg: "≈ 166채", price: "₩520,000", per: "장당 ₩3,120 · ₩430,000 절약", save: "−45%", feat: false },
            ].map((p) => (
              <button
                key={p.pack}
                type="button"
                className={`pts-card ${p.feat ? "feat" : ""}`}
                onClick={() => toast(`${p.pts}P 결제 진행`)}
                aria-label={`${p.pack} · ${p.pts}포인트 · ${p.price}${p.save ? ` · ${p.save} 할인` : ""}`}
              >
                <div className="pts-head">
                  <span>{p.pack}</span>
                  {p.save ? <span className="pts-save">{p.save}</span> : null}
                </div>
                <div className="pts-num">
                  {p.pts}
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 14,
                      fontStyle: "normal",
                      marginLeft: 4,
                    }}
                  >
                    P
                  </span>
                </div>
                <div className="pts-unit">건물 {p.bldg}</div>
                <div className="pts-price">
                  <span className="kr">{p.price}</span>
                </div>
                <div className="pts-price-kr">{p.per}</div>
                <span className="pts-buy" aria-hidden="true">
                  충전 ↗
                </span>
              </button>
            ))}
          </div>

          <div className="pts-usage">
            <div>
              <h4>
                1 포인트는
                <br />
                <em>어디에 쓰이나요?</em>
              </h4>
              {[
                ["4각도 외관 1세트", "3P"],
                ["조감도 1장", "2P"],
                ["내부 투시도 1장", "2P"],
                ["재생성 · 스타일 변경", "1P"],
                ["인허가 리포트 PDF", "5P"],
                ["DXF · DWG 내보내기", "무료"],
              ].map(([k, v]) => (
                <div key={k} className="pts-rate">
                  <span className="k">{k}</span>
                  <span className="v">{v}</span>
                </div>
              ))}
            </div>
            <div className="pts-note">
              <strong>만료 없습니다.</strong>
              <br />
              <br />
              충전한 포인트는 언제든 사용할 수 있고, 기간 만료가 없어요. 구독 요금제의 월 지급 포인트는 이월 가능하며
              최대 3개월까지 누적됩니다. 구독 해지 후에도 남은 포인트는 그대로 유지됩니다.
            </div>
          </div>
        </div>

        <div className="faq-sec">
          <h3>
            <em>자주 묻는</em> 질문
          </h3>
          <div className="faq-list">
            {FAQ_ITEMS.map((f) => {
              const isOpen = openFaq === f.n;
              const panelId = `faq-panel-${f.n}`;
              const btnId = `faq-btn-${f.n}`;
              return (
                <div key={f.n} className={`faq-item ${isOpen ? "open" : ""}`}>
                  <div className="n" aria-hidden="true">
                    {f.n}
                  </div>
                  <div>
                    <button
                      type="button"
                      id={btnId}
                      className="q"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenFaq(isOpen ? null : f.n)}
                    >
                      {f.q}
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className="a"
                      hidden={!isOpen}
                    >
                      {f.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
