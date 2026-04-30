"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";
import { useMe } from "@/features/me/hooks/useMe.query";
import { useSession } from "@/features/auth/hooks/useSession";
import { getSupabaseBrowser } from "@/shared/lib/supabase/client";

const links = [
  { href: "/projects", label: "프로젝트" },
  { href: "/mypage", label: "마이페이지" },
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
  const router = useRouter();
  const isWizard = pathname.startsWith("/studio");
  const isLanding = pathname === "/";
  const useDevAuth = process.env.NEXT_PUBLIC_USE_DEV_AUTH === "true";
  const { session, loading: sessionLoading } = useSession();
  const isAuthed = useDevAuth || Boolean(session);
  const { data: me } = useMe();

  const handleLogout = async () => {
    await getSupabaseBrowser().auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-8">
        <div className="flex items-center gap-14">
          <Link href="/" className="inline-flex items-center gap-[10px]">
            <Logo />
          </Link>
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
        </div>

        <div className="flex items-center gap-3">
          {isWizard ? (
            <>
              <Link
                href="/projects"
                className="text-sm font-medium text-ink-50 transition hover:text-ink"
              >
                취소
              </Link>
              <Button variant="ghost" size="sm">
                임시저장
              </Button>
            </>
          ) : sessionLoading ? null : isAuthed ? (
            <>
              <Link
                href="/mypage"
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
              {isLanding ? (
                <Button asChild size="sm">
                  <Link href="/studio/new">
                    시작하기
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </Link>
                </Button>
              ) : null}
              {!useDevAuth ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-medium text-ink-50 transition hover:text-ink"
                >
                  로그아웃
                </button>
              ) : null}
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-ink-50 transition hover:text-ink"
              >
                로그인
              </Link>
              <Button asChild size="sm">
                <Link href="/login?next=/studio/new">
                  시작하기
                  <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
