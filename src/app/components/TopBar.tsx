"use client";

import { useEffect, useState } from "react";

type View = "landing" | "dashboard" | "gallery" | "pricing" | "app" | "result";

type Props = {
  view: View;
  goto: (v: View) => void;
  toast: (m: string) => void;
};

export function TopBar({ view, goto, toast }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const go = (v: View) => {
    setDrawerOpen(false);
    goto(v);
  };

  return (
    <>
      <header className="topbar">
        <div
          className="logo"
          onClick={() => goto("landing")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              goto("landing");
            }
          }}
          aria-label="홈으로"
        >
          <div className="logo-mark" />
          <div className="logo-text">
            UPRIZE<sup>™</sup>
          </div>
        </div>
        <nav className="nav-center" aria-label="주 메뉴">
          <button
            className={view === "landing" ? "active" : ""}
            onClick={() => goto("landing")}
            aria-current={view === "landing" ? "page" : undefined}
          >
            스튜디오
          </button>
          <button
            className={view === "dashboard" ? "active" : ""}
            onClick={() => goto("dashboard")}
            aria-current={view === "dashboard" ? "page" : undefined}
          >
            프로젝트
          </button>
          <button
            className={view === "gallery" ? "active" : ""}
            onClick={() => goto("gallery")}
            aria-current={view === "gallery" ? "page" : undefined}
          >
            사례
          </button>
          <button
            className={view === "pricing" ? "active" : ""}
            onClick={() => goto("pricing")}
            aria-current={view === "pricing" ? "page" : undefined}
          >
            요금
          </button>
        </nav>
        <div className="nav-right">
          <button
            className="icon-btn notify-btn"
            onClick={() => toast("새 알림 없음")}
            aria-label="알림"
          >
            🔔
          </button>
          <button
            className="avatar avatar-btn"
            onClick={() => toast("김시행 · 스튜디오K")}
            aria-label="계정 · 김시행"
          >
            KS
          </button>
          <button className="btn-cta" onClick={() => goto("app")}>
            시작하기 <span className="arrow" aria-hidden="true">↗</span>
          </button>
          <button
            className="menu-btn"
            onClick={() => setDrawerOpen(true)}
            aria-label="메뉴 열기"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
          >
            <span className="menu-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`drawer-scrim ${drawerOpen ? "show" : ""}`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        id="mobile-drawer"
        className={`drawer ${drawerOpen ? "show" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="주 메뉴"
        aria-hidden={!drawerOpen}
      >
        <div className="drawer-head">
          <div className="drawer-tag">메뉴</div>
          <button
            className="drawer-close"
            onClick={() => setDrawerOpen(false)}
            aria-label="메뉴 닫기"
          >
            ✕
          </button>
        </div>
        <nav className="drawer-nav" aria-label="주 메뉴">
          {(
            [
              ["landing", "스튜디오", "홈 · 소개"],
              ["dashboard", "프로젝트", "내 워크스페이스"],
              ["gallery", "사례", "그려낸 건물들"],
              ["pricing", "요금", "구독 · 포인트"],
            ] as const
          ).map(([v, label, sub]) => (
            <button
              key={v}
              className={`drawer-link ${view === v ? "on" : ""}`}
              onClick={() => go(v)}
              aria-current={view === v ? "page" : undefined}
            >
              <span className="drawer-link-main">{label}</span>
              <span className="drawer-link-sub">{sub}</span>
              <span className="drawer-link-arrow" aria-hidden="true">
                ↗
              </span>
            </button>
          ))}
        </nav>
        <div className="drawer-account">
          <button
            className="drawer-row"
            onClick={() => {
              setDrawerOpen(false);
              toast("김시행 · 스튜디오K");
            }}
          >
            <span className="avatar" aria-hidden="true">KS</span>
            <span>
              <span className="drawer-row-name">김시행</span>
              <span className="drawer-row-sub">스튜디오K</span>
            </span>
          </button>
          <button
            className="drawer-row"
            onClick={() => {
              setDrawerOpen(false);
              toast("새 알림 없음");
            }}
          >
            <span className="drawer-row-icon" aria-hidden="true">🔔</span>
            <span>
              <span className="drawer-row-name">알림</span>
              <span className="drawer-row-sub">새 알림 없음</span>
            </span>
          </button>
        </div>
        <button
          className="drawer-cta"
          onClick={() => go("app")}
        >
          새 프로젝트 시작 <span aria-hidden="true">↗</span>
        </button>
      </aside>
    </>
  );
}
