import Link from "next/link";

import { StartCtaButton } from "./StartCtaButton";

export const FinalCTA = () => (
  <section className="relative overflow-hidden bg-paper py-40 text-center before:pointer-events-none before:absolute before:left-1/2 before:top-1/2 before:h-[120%] before:w-[120%] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-[radial-gradient(ellipse_at_center,#FBEFE5,transparent_50%)]">
    <div className="relative mx-auto max-w-[880px] px-8">
      <div className="mx-auto mb-8 h-14 w-px origin-top bg-ink-30" />
      <div className="mb-6 flex items-center justify-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-burn-500">
        START NOW
      </div>
      <h2 className="display-italic mb-7 leading-[1.04] tracking-[-0.025em] [font-size:clamp(44px,6vw,88px)]">
        지금 바로
        <br />
        필지 위에 <em className="not-italic display-italic text-burn-500">건물을<br />올려보세요.</em>
      </h2>
      <p className="mb-12 text-[17px] leading-relaxed text-ink-50">
        별도 설치 없이 브라우저에서 바로 사용 가능 · 첫 프로젝트는 무료
      </p>
      <div className="inline-flex items-center gap-5">
        <StartCtaButton />
        <Link
          href="/projects"
          className="border-b border-ink pb-0.5 text-sm font-medium text-ink transition hover:border-burn-500 hover:text-burn-500"
        >
          사례 보기
        </Link>
      </div>
    </div>
  </section>
);
