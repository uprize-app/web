"use client";

type Props = {
  goto: (v: "app" | "gallery" | "result") => void;
};

export function Landing({ goto }: Props) {
  return (
    <section className="view active" id="view-landing">
      <div className="hero">
        <div className="hero-grid">
          <div className="hero-meta">
            <div>
              <span className="dot" />
              서울 · 2026년 봄호
            </div>
            <div>24호</div>
            <div>업라이즈 스튜디오 · 건축을 먼저 보는 일</div>
          </div>
          <h1 className="hero-title">
            <span className="strike">건물이 아니라,</span>
            <br />
            <em>땅을 먼저</em> 그립니다.
          </h1>
          <div className="hero-sub">
            <p>
              시행사를 위한 건축 스튜디오. 지도에서 필지를 찍으면 용도·층수·스타일에 맞춰 사면 외관을 90초 안에 그려
              드립니다. 첫 네 주가, 한 잔의 커피로 줄어듭니다.
            </p>
            <div className="cta-row">
              <button className="btn-cta" onClick={() => goto("app")}>
                지도에서 시작 <span className="arrow">↗</span>
              </button>
              <button className="btn-ghost" onClick={() => goto("gallery")}>
                그려낸 건물들
              </button>
            </div>
          </div>
        </div>

        <div className="hero-grid">
          <div className="hero-showcase">
            <button
              type="button"
              className="showcase-tile tile-map"
              onClick={() => goto("app")}
              aria-label="지도에서 필지 선택하기"
            >
              <span className="tag">01 · 필지 선택</span>
              <div className="map-bg" />
              <div className="map-roads" />
              <div className="map-block" style={{ left: "8%", top: "12%", width: "22%", height: "28%" }} />
              <div className="map-block" style={{ left: "8%", top: "46%", width: "18%", height: "18%" }} />
              <div className="map-block" style={{ right: "14%", top: "8%", width: "24%", height: "22%" }} />
              <div className="map-block" style={{ right: "8%", bottom: "14%", width: "30%", height: "24%" }} />
              <div className="map-parcel" style={{ left: "42%", top: "38%", width: "18%", height: "22%" }} />
              <div className="crosshair" style={{ left: "51%", top: "49%" }} />
              <div className="meta">
                <div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      color: "rgba(245,243,238,0.5)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    서울 · 강남
                  </div>
                  <div className="name" style={{ marginTop: 4 }}>
                    역삼동 727-3
                  </div>
                </div>
                <div className="num">372m² · 3종일반</div>
              </div>
            </button>

            <button
              type="button"
              className="showcase-tile tile-render"
              onClick={() => goto("result")}
              aria-label="생성 결과 예시 보기"
            >
              <span className="tag">02 · 생성 결과</span>
              <div className="render-bldg" />
              <div className="render-ground" />
              <div className="meta">
                <div>
                  <div
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 10,
                      color: "rgba(245,243,238,0.6)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    외관 · 정면
                  </div>
                  <div className="name" style={{ marginTop: 4 }}>
                    강남 오피스타워
                  </div>
                </div>
                <div className="num">15F · 4,320㎡</div>
              </div>
            </button>

            <div className="showcase-tile tile-stats" style={{ cursor: "default" }} role="group" aria-label="스튜디오 통계">
              <div>
                <div className="stats-num">
                  <em>8,392</em>
                </div>
                <div className="stats-label">생성된 건물</div>
              </div>
              <div className="stats-list">
                <div className="stats-row">
                  <span className="k">필지</span>
                  <span className="v">1,247</span>
                </div>
                <div className="stats-row">
                  <span className="k">스튜디오</span>
                  <span className="v">36</span>
                </div>
                <div className="stats-row">
                  <span className="k">평균 시간</span>
                  <span className="v">87초</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          <span>오피스</span>
          <span>주거</span>
          <span>상업</span>
          <span>주상복합</span>
          <span>호텔</span>
          <span>물류</span>
          <span>리테일</span>
          <span>오피스</span>
          <span>주거</span>
          <span>상업</span>
          <span>주상복합</span>
          <span>호텔</span>
          <span>물류</span>
          <span>리테일</span>
        </div>
      </div>

      <section className="block">
        <div className="block-grid">
          <div style={{ gridColumn: "1 / 5" }}>
            <div className="label-meta">과정 · 네 단계</div>
            <h2 className="section-title">
              건축사무소를
              <br />
              <em>대신합니다.</em>
            </h2>
          </div>
          <div style={{ gridColumn: "7 / 13", alignSelf: "end", paddingBottom: 8 }}>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: "var(--ink-2)", maxWidth: "50ch" }}>
              기획설계에 들이는 4~6주가 지도 한 번 찍는 일이 됩니다. 시행 초기에 여러 안을 빠르게 비교해 보세요. 인허가
              검토부터 외관 시안까지 한자리에서.
            </p>
          </div>
        </div>

        <div className="process">
          <div className="process-step">
            <div className="step-num">01 / 검색</div>
            <div className="step-title">주소 입력</div>
            <div className="step-desc">지번 또는 도로명. 공공데이터(VWorld, 토지e음)가 자동으로 연결됩니다.</div>
            <div className="step-visual">
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 14,
                  right: 14,
                  transform: "translateY(-50%)",
                  background: "var(--bg-2)",
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontFamily: "var(--mono)",
                  fontSize: 11,
                  color: "var(--ink-soft)",
                }}
              >
                🔍 서울시 강남구 역삼...
              </div>
            </div>
          </div>
          <div className="process-step">
            <div className="step-num">02 / 선택</div>
            <div className="step-title">필지 클릭</div>
            <div className="step-desc">대지면적 · 용적률 · 건폐율 · 도로 접면이 자동 분석됩니다.</div>
            <div className="step-visual" style={{ background: "linear-gradient(135deg,#1d1c17,#2a2823)" }}>
              <div
                style={{
                  position: "absolute",
                  left: "35%",
                  top: "30%",
                  width: "30%",
                  height: "40%",
                  border: "2px solid var(--accent)",
                  background: "rgba(232,84,32,0.18)",
                  borderRadius: 3,
                  boxShadow: "0 0 30px rgba(232,84,32,0.4)",
                }}
              />
            </div>
          </div>
          <div className="process-step">
            <div className="step-num">03 / 조건</div>
            <div className="step-title">조건 입력</div>
            <div className="step-desc">용도 · 층수 · 스타일 · 예산. 필요한 것만 입력합니다.</div>
            <div className="step-visual" style={{ padding: 14 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                <span className="pill on" style={{ fontSize: 10, padding: "4px 10px" }}>
                  오피스
                </span>
                <span className="pill" style={{ fontSize: 10, padding: "4px 10px" }}>
                  15F
                </span>
                <span className="pill" style={{ fontSize: 10, padding: "4px 10px" }}>
                  미니멀
                </span>
                <span className="pill" style={{ fontSize: 10, padding: "4px 10px" }}>
                  유리
                </span>
                <span className="pill" style={{ fontSize: 10, padding: "4px 10px" }}>
                  120억
                </span>
              </div>
            </div>
          </div>
          <div className="process-step">
            <div className="step-num">04 / 생성</div>
            <div className="step-title">4각도 생성</div>
            <div className="step-desc">정면 · 후면 · 좌 · 우 외관 이미지. 90초 안에 완성됩니다.</div>
            <div
              className="step-visual"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, padding: 8 }}
            >
              <div style={{ background: "linear-gradient(180deg,#d8d4ca,#a09b8e)", borderRadius: 3 }} />
              <div style={{ background: "linear-gradient(180deg,#d8d4ca,#a09b8e)", borderRadius: 3 }} />
              <div style={{ background: "linear-gradient(180deg,#d8d4ca,#a09b8e)", borderRadius: 3 }} />
              <div style={{ background: "linear-gradient(180deg,#d8d4ca,#a09b8e)", borderRadius: 3 }} />
            </div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="block-grid">
          <div style={{ gridColumn: "1 / 7" }}>
            <div className="label-meta">스튜디오가 다루는 일</div>
            <h2 className="section-title">
              한 자리에서,
              <br />
              <em>끝까지.</em>
            </h2>
          </div>
        </div>

        <div className="bento" style={{ maxWidth: 1440, margin: "40px auto 0" }}>
          <div className="bento-card span-2 dark">
            <div className="bento-meta">하나 · 법규</div>
            <div>
              <h3 className="bento-h">
                지을 수 있는 땅인가,
                <br />
                <em>먼저 알려드립니다.</em>
              </h3>
              <p className="bento-p">
                용도지역, 용적률, 건폐율, 도로 사선, 일조권. 필지 클릭 한 번에 모든 제약을 계산합니다.
              </p>
            </div>
            <div
              style={{
                position: "absolute",
                right: -40,
                bottom: -40,
                width: 340,
                height: 340,
                border: "1px solid rgba(245,243,238,0.1)",
                borderRadius: "50%",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: 240,
                height: 240,
                border: "1px solid rgba(232,84,32,0.4)",
                borderRadius: "50%",
              }}
            />
          </div>
          <div className="bento-card">
            <div className="bento-meta">둘 · 외관</div>
            <h3 className="bento-h">
              네 면을
              <br />
              <em>한 번에.</em>
            </h3>
            <p className="bento-p">정면·후면·좌·우, 일관된 매스로 90초 안에.</p>
          </div>
          <div className="bento-card">
            <div className="bento-meta">셋 · 결</div>
            <h3 className="bento-h">
              결의
              <br />
              <em>엮임.</em>
            </h3>
            <p className="bento-p">미니멀, 모던, 클래식, 유리커튼월. 자유롭게 조합.</p>
          </div>
          <div className="bento-card">
            <div className="bento-meta">넷 · 산정</div>
            <h3 className="bento-h">
              사업성을
              <br />
              <em>매면마다.</em>
            </h3>
            <p className="bento-p">평당 공사비, 총 사업비, 분양 시나리오까지 자동으로.</p>
          </div>
          <div className="bento-card span-2">
            <div className="bento-meta">다섯 · 전달</div>
            <div>
              <h3 className="bento-h">
                설계사무소로
                <br />
                <em>곧장 넘기기.</em>
              </h3>
              <p className="bento-p">협업용 전달 자료. 매스, 층별 제원, 법규 분석을 한 권으로 묶어서.</p>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
              {[".PDF", ".DXF", ".DWG", ".JPG"].map((f) => (
                <div
                  key={f}
                  style={{
                    background: "var(--bg-2)",
                    padding: "8px 14px",
                    borderRadius: 6,
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                  }}
                >
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="cta-banner">
        <h3>
          땅만 찍으면
          <br />
          건물이 <em>떠오릅니다.</em>
        </h3>
        <div className="row">
          <button className="btn-cta" onClick={() => goto("app")}>
            지도에서 시작 <span className="arrow">↗</span>
          </button>
          <button className="btn-ghost" onClick={() => goto("gallery")}>
            그려낸 건물들
          </button>
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: 11,
              color: "rgba(245,243,238,0.5)",
              marginLeft: "auto",
              letterSpacing: "0.08em",
            }}
          >
            첫 잔은 무료 · 카드 등록 없이
          </span>
        </div>
      </div>

      <footer>
        <div>© 2026 업라이즈 스튜디오 · 서울에서 만들어집니다</div>
        <div className="links">
          <a href="#">이용약관</a>
          <a href="#">개인정보</a>
          <a href="#">문의</a>
          <a href="#">보도자료</a>
        </div>
      </footer>
    </section>
  );
}
