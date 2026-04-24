"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
  sub: string;
  matches?: (path: string) => boolean;
};

const MARKETING_NAV: NavItem[] = [
  { href: "/", label: "스튜디오", sub: "홈 · 소개", matches: (p) => p === "/" },
  {
    href: "/dashboard",
    label: "프로젝트",
    sub: "내 워크스페이스",
    matches: (p) => p.startsWith("/dashboard") || p.startsWith("/studio"),
  },
  { href: "/gallery", label: "사례", sub: "그려낸 건물들", matches: (p) => p.startsWith("/gallery") },
  { href: "/pricing", label: "요금", sub: "구독 · 포인트", matches: (p) => p.startsWith("/pricing") },
];

const isActive = (item: NavItem, pathname: string) =>
  item.matches ? item.matches(pathname) : pathname.startsWith(item.href);

const isAppRoute = (pathname: string): boolean =>
  pathname.startsWith("/studio") ||
  pathname.startsWith("/dashboard") ||
  pathname.startsWith("/login");

export const TopBar = () => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const appMode = isAppRoute(pathname);

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

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  if (appMode) {
    return <AppTopBar pathname={pathname} />;
  }

  return (
    <>
      <header className="topbar">
        <Link href="/" className="logo" aria-label="홈으로">
          <div className="logo-mark" />
          <div className="logo-text">
            UPRIZE<sup>™</sup>
          </div>
        </Link>
        <nav className="nav-center" aria-label="주 메뉴">
          {MARKETING_NAV.map((item) => {
            const active = isActive(item, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "active" : ""}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="nav-right">
          <Link href="/studio/new" className="btn-cta">
            시작하기 <span className="arrow" aria-hidden="true">↗</span>
          </Link>
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
          {MARKETING_NAV.map((item) => {
            const active = isActive(item, pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`drawer-link ${active ? "on" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span className="drawer-link-main">{item.label}</span>
                <span className="drawer-link-sub">{item.sub}</span>
                <span className="drawer-link-arrow" aria-hidden="true">↗</span>
              </Link>
            );
          })}
        </nav>
        <Link href="/studio/new" className="drawer-cta">
          새 프로젝트 시작 <span aria-hidden="true">↗</span>
        </Link>
      </aside>
    </>
  );
};

type AppTopBarProps = {
  pathname: string;
};

const AppTopBar = ({ pathname }: AppTopBarProps) => {
  const inStudio = pathname.startsWith("/studio");
  const inDashboard = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  return (
    <header className="topbar">
      <Link href="/" className="logo" aria-label="UPRIZE 홈으로">
        <div className="logo-mark" />
        <div className="logo-text">
          UPRIZE<sup>™</sup>
        </div>
      </Link>

      <div aria-hidden="true" />

      <div className="nav-right">
        {inStudio ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-[12px] tracking-wide text-ink-2 transition hover:border-line-strong hover:bg-bg-2"
          >
            <span aria-hidden="true">←</span> 대시보드
          </Link>
        ) : null}

        {inDashboard ? (
          <Link
            href="/studio/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[12px] font-semibold text-paper shadow-[0_10px_24px_-14px_rgba(21,20,15,0.5)] transition hover:bg-ink-2"
          >
            새 프로젝트 <span aria-hidden="true">↗</span>
          </Link>
        ) : null}
      </div>
    </header>
  );
};
