"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/projects", label: "프로젝트" },
  { href: "/mypage", label: "마이페이지" },
];

export const Nav = () => {
  const pathname = usePathname();
  const isWizard = pathname.startsWith("/studio");
  const isLanding = pathname === "/";

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
          ) : isLanding ? (
            <>
              <Link
                href="/mypage"
                className="hidden text-sm font-medium text-ink-50 transition hover:text-ink md:inline"
              >
                로그인
              </Link>
              <Button asChild size="sm">
                <Link href="/studio/new">
                  시작하기
                  <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
              </Button>
            </>
          ) : (
            <Link
              href="/mypage"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-50 transition hover:text-ink"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-paper">
                <span className="display-italic text-[13px]">P</span>
              </span>
              박상호 대표
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
