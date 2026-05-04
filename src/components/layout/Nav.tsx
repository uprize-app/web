"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import { useMe } from "@/features/me/hooks/useMe.query";
import { useSession } from "@/features/auth/hooks/useSession";
import {
  accountHrefForSession,
  isSessionAuthenticated,
} from "@/features/auth/lib/authNavigation";
import { isUnauthorizedApiError } from "@/shared/lib/apiClient";

const links = [
  { href: "/projects", label: "프로젝트" },
];

/** 표시용 유저명 — null fallback 일관성 */
const formatUserDisplay = (
  displayName: string | null,
  position: string | null,
  email: string | null,
) => {
  const name = displayName ?? email?.split("@")[0] ?? "사용자";
  return position ? `${name} ${position}` : name;
};

const initialFor = (displayName: string | null, email: string | null) =>
  (displayName ?? email ?? "U")[0]!.toUpperCase();

export const Nav = () => {
  const pathname = usePathname();
  const isLogin = pathname.startsWith("/login");
  const { session, loading: sessionLoading } = useSession();
  const isAuthed = isSessionAuthenticated(session);
  const { data: me, error: meError } = useMe({ enabled: isAuthed });
  const hasBackendAuthError = isUnauthorizedApiError(meError);
  const canShowAuthedNav = isAuthed && !hasBackendAuthError;
  const canShowProjectLink =
    pathname === "/" || pathname.startsWith("/mypage");

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-8">
        <div className="flex items-center gap-14">
          <Link href="/" className="inline-flex items-center gap-[10px]">
            <Logo />
          </Link>
          {canShowAuthedNav && canShowProjectLink ? (
            <div className="hidden gap-9 md:flex">
              {links.map((link) => {
                const active = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative py-1 text-sm font-medium transition",
                      active
                        ? "text-ink after:absolute after:inset-x-0 after:-bottom-[26px] after:h-0.5 after:bg-burn-500"
                        : "text-ink-50 hover:text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-3">
          {sessionLoading || isLogin ? null : canShowAuthedNav ? (
            <Link
              href={accountHrefForSession(session)}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-50 transition hover:text-ink"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-paper">
                <span className="display-italic text-[13px]">
                  {initialFor(me?.displayName ?? null, me?.email ?? null)}
                </span>
              </span>
              {me
                ? formatUserDisplay(me.displayName, me.position, me.email)
                : "프로필 불러오는 중…"}
            </Link>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link href={accountHrefForSession(session)}>로그인</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
