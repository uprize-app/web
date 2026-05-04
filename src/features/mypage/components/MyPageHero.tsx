"use client";

import { Button } from "@/components/ui/button";
import { useSignOut } from "@/features/auth/hooks/useSignOut";
import { useMe } from "@/features/me/hooks/useMe.query";
import { formatJoinedSince, formatMemberId } from "@/features/me/lib/format";

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
    <section className="border-b border-line py-14">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-end gap-10 px-8 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-50">
            <span className="h-px w-6 bg-burn-500" />
            MY ACCOUNT
          </div>
          <div className="flex items-center gap-6">
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-ink text-burn-300">
              <span className="display-italic text-[44px]">{initial}</span>
            </div>
            <div>
              <h1 className="display-italic m-0 mb-2 text-[56px] leading-none tracking-[-0.02em]">
                {isLoading ? "···" : name}{" "}
                {position ? (
                  <em className="not-italic display-italic text-burn-500">{position}.</em>
                ) : null}
              </h1>
              <div className="flex flex-wrap gap-4 font-mono text-[13px] tracking-[0.04em] text-ink-50">
                <span className="inline-flex items-center gap-1.5">● {company}</span>
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

        <div className="flex flex-col items-start gap-4 lg:items-end">
          <div className="flex flex-wrap gap-8 rounded-lg border border-line bg-white px-7 py-5">
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
  <div className={border ? "border-l border-line pl-8 text-right" : "text-right"}>
    <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-50">
      {label}
    </div>
    <div className="display-italic text-[28px] leading-none not-italic">{value}</div>
  </div>
);
