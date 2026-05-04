import Link from "next/link";

import { Logo } from "@/components/shared/Logo";

type Props = {
  variant?: "full" | "minimal";
};

const cols = [
  {
    title: "Product",
    links: [
      { label: "신규 프로젝트", href: "/studio/new" },
      { label: "프로젝트", href: "/projects" },
      { label: "디자인 스타일", href: "#" },
      { label: "샘플 결과물", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "회사 소개", href: "#" },
      { label: "파트너십", href: "#" },
      { label: "언론 보도", href: "#" },
      { label: "채용", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "마이페이지", href: "/mypage" },
      { label: "고객 지원", href: "#" },
      { label: "이용약관", href: "#" },
      { label: "개인정보처리방침", href: "#" },
    ],
  },
] as const;

export const Footer = ({ variant = "full" }: Props) => (
  <footer className="mt-auto bg-ink text-ink-30">
    <div className="mx-auto max-w-[1280px] px-8 pb-10 pt-20">
      {variant === "full" ? (
        <div className="mb-14 grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="text-paper">
              <Logo />
            </Link>
            <p className="display-italic mt-4 max-w-[280px] text-lg leading-snug text-paper">
              건축사무소 가기 전,
              <br />
              사업의 첫 형상.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-30">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-ink-40 transition hover:text-burn-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}

      <div
        className={
          variant === "full"
            ? "flex items-center justify-between border-t border-white/10 pt-8 font-mono text-[12px] tracking-[0.04em] text-ink-50"
            : "flex items-center justify-between font-mono text-[12px] tracking-[0.04em] text-ink-50"
        }
      >
        <span>© 2026 UPRIZE INC.</span>
        <span>BUILD BEFORE YOU BUILD</span>
      </div>
    </div>
  </footer>
);
