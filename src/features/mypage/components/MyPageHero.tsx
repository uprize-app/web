"use client";

import { Button } from "@/components/ui/button";
import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { useMe } from "@/features/me/hooks/useMe.query";
import { formatJoinedSince, formatMemberId } from "@/features/me/lib/format";
import { cn } from "@/lib/utils";

import { useUserStats } from "../hooks/useUserStats.query";

export const MyPageHero = () => {
  const { data: me, isLoading } = useMe();
  const stats = useUserStats();
  const signOut = useSignOut();

  const initial = (me?.displayName ?? me?.email ?? "U")[0]!.toUpperCase();
  const name = me?.displayName ?? me?.email?.split("@")[0] ?? "사용자";
  const position = me?.position ?? "";
  const company = me?.companyName ?? "회사 미등록";
  const memberId = me ? formatMemberId(me.id) : "";
  const joinedLabel = me ? formatJoinedSince(me.createdAt) : "";

  return (
    <section className="border-b border-line py-9 sm:py-12 lg:py-14">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-end gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:px-8">
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-50">
            <span className="h-px w-6 bg-burn-500" />
            MY ACCOUNT
          </div>
          <div className="flex items-start gap-4 sm:items-center sm:gap-6">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-ink text-burn-300 sm:h-24 sm:w-24">
              <span className="display-italic text-[30px] sm:text-[44px]">{initial}</span>
            </div>
            <div className="min-w-0">
              <h1 className="display-italic m-0 mb-2 text-[34px] leading-[0.95] tracking-normal break-words sm:text-[48px] lg:text-[56px]">
                {isLoading ? "···" : name}{" "}
                {position ? (
                  <em className="not-italic display-italic text-burn-500">{position}.</em>
                ) : null}
              </h1>
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[12px] tracking-[0.04em] text-ink-50 sm:text-[13px]">
                <span className="inline-flex min-w-0 items-center gap-1.5 break-words">● {company}</span>
                {memberId ? (
                  <span className="inline-flex items-center gap-1.5">{memberId}</span>
                ) : null}
                {joinedLabel ? (
                  <span className="inline-flex items-center gap-1.5">{joinedLabel}</span>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="flex min-w-0 flex-col items-stretch gap-4 lg:items-end">
          <div className="grid w-full grid-cols-1 gap-4 rounded-lg border border-line bg-white px-5 py-5 sm:grid-cols-3 sm:gap-0 sm:px-7 lg:w-auto">
            <QuickItem
              label="현재 플랜"
              value={<em className="display-italic text-burn-500">Studio</em>}
            />
            <QuickItem
              label="이번 달 프로젝트"
              value={`${stats.thisMonthProjects} / ${stats.monthlyProjectQuota}`}
              border
            />
            <QuickItem
              label="PDF 다운"
              value={`${stats.thisMonthExports} / ${stats.monthlyExportQuota}`}
              border
            />
          </div>
          <div className="flex flex-col items-start gap-2 lg:items-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut.signOut}
              disabled={signOut.pending}
            >
              {signOut.pending ? "로그아웃 중…" : "로그아웃"}
            </Button>
            {signOut.errorMessage ? (
              <p className="m-0 max-w-[320px] text-[12px] text-burn-500">
                로그아웃에 실패했습니다. {signOut.errorMessage}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

const QuickItem = ({
  label,
  value,
  border,
}: {
  label: string;
  value: React.ReactNode;
  border?: boolean;
}) => (
  <div
    className={cn(
      "min-w-0 text-left sm:text-right",
      border && "border-t border-line pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 lg:pl-8",
    )}
  >
    <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-50">
      {label}
    </div>
    <div className="display-italic text-[24px] leading-none not-italic sm:text-[28px]">
      {value}
    </div>
  </div>
);
