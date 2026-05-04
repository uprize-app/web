"use client";

import { cn } from "@/lib/utils";

import type { MyPageTabId } from "../types/mypage.types";

type Tab = {
  id: MyPageTabId;
  num: string;
  label: string;
  badge?: string;
};

const TABS: ReadonlyArray<Tab> = [
  { id: "overview", num: "01", label: "개요" },
  { id: "plan",     num: "02", label: "요금제", badge: "UPGRADE" },
  { id: "usage",    num: "03", label: "사용량" },
  { id: "billing",  num: "04", label: "결제 / 인보이스" },
  { id: "account",  num: "05", label: "계정 설정" },
];

type Props = {
  active: MyPageTabId;
  onChange: (id: MyPageTabId) => void;
};

export const MyPageTabs = ({ active, onChange }: Props) => (
  <div className="sticky top-[72px] z-[5] border-b border-line bg-paper/95 backdrop-blur-md">
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-x-4 gap-y-0 sm:flex sm:gap-9 sm:overflow-x-auto">
        {TABS.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={cn(
                "flex min-h-12 min-w-0 items-center gap-2 border-b-[1.5px] py-3 text-left text-[13px] font-medium transition-colors duration-300 sm:shrink-0 sm:py-5 sm:text-sm",
                isActive
                  ? "border-burn-500 text-ink"
                  : "border-transparent text-ink-50 hover:text-ink",
              )}
            >
              <span
                className={cn(
                  "font-mono text-[10px] tracking-[0.1em]",
                  isActive ? "text-burn-500" : "text-ink-30",
                )}
              >
                {t.num}
              </span>
              <span className="min-w-0 break-keep">{t.label}</span>
              {t.badge ? (
                <span className="shrink-0 rounded-sm bg-burn-500 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.05em] text-paper">
                  {t.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);
