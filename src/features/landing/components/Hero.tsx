import { HeroBuildingSvg } from "./HeroBuildingSvg";
import { StartCtaButton } from "./StartCtaButton";

export const Hero = () => (
  <section className="relative flex min-h-[calc(100vh-72px)] items-center overflow-hidden bg-paper py-20 before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(rgba(14,14,12,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,14,12,0.03)_1px,transparent_1px)] before:bg-[length:64px_64px] before:[mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black_30%,transparent_90%)] before:[-webkit-mask-image:radial-gradient(ellipse_80%_70%_at_50%_50%,black_30%,transparent_90%)]">
    <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-20 px-8 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <div className="mb-9 flex items-center gap-3 font-mono text-[11px] tracking-[0.16em] text-ink-50">
          <span className="h-px w-9 origin-left animate-[drawLn_1.4s_cubic-bezier(0.22,1,0.36,1)_both] bg-burn-500" />
          <span className="h-1.5 w-1.5 animate-[heroPulse_2s_ease-out_infinite] rounded-full bg-burn-500 shadow-[0_0_0_0_rgba(212,84,31,0.6)]" />
          FOR REAL ESTATE DEVELOPERS
        </div>

        <h1 className="display-italic mb-8 leading-[0.96] tracking-[-0.025em] text-ink [font-size:clamp(56px,7.4vw,108px)]">
          <span className="block not-italic">Build</span>
          <span className="block italic">Before You</span>
          <span className="relative inline-block italic text-burn-500 after:absolute after:bottom-[0.04em] after:left-0 after:-z-10 after:h-1.5 after:w-full after:origin-left after:scale-x-0 after:animate-[hi_1.4s_cubic-bezier(0.22,1,0.36,1)_0.8s_forwards] after:bg-burn-100">
            Build.
          </span>
        </h1>

        <p className="mb-11 max-w-[480px] text-lg leading-relaxed text-ink-50">
          시행사 대표가 건축사무소를 찾기 전,
          <br />
          AI가 필지 위에 건물을 먼저 올려보는 사업 제안 도구.
        </p>

        <div className="flex flex-wrap items-center gap-8">
          <StartCtaButton />
          <div className="flex items-center gap-2.5 text-[13px] text-ink-50">
            <span className="h-1.5 w-1.5 animate-[blink_1.8s_ease-in-out_infinite] rounded-full bg-[#4F8A6E]" />
            10분 만에 사업 제안용 건물 이미지 + 설계안 완성
          </div>
        </div>
      </div>

      {/* Hero stage */}
      <div className="relative aspect-[1/1.1] w-full">
        <div className="absolute inset-0 overflow-hidden rounded-md border border-line bg-white shadow-soft">
          <div className="absolute inset-x-0 top-0 h-9 border-b border-line bg-paper-2" />
          <div className="absolute left-4 top-3 font-mono text-[10px] tracking-[0.12em] text-ink-50">
            PROJECT · 역삼동 호텔 · 18F · 2026.04.28
          </div>
          {/* corner brackets */}
          <span className="absolute left-3 top-11 z-10 h-3.5 w-3.5 border-l-[1.5px] border-t-[1.5px] border-burn-500" />
          <span className="absolute right-3 top-11 z-10 h-3.5 w-3.5 border-r-[1.5px] border-t-[1.5px] border-burn-500" />
          <span className="absolute bottom-3 left-3 z-10 h-3.5 w-3.5 border-b-[1.5px] border-l-[1.5px] border-burn-500" />
          <span className="absolute bottom-3 right-3 z-10 h-3.5 w-3.5 border-b-[1.5px] border-r-[1.5px] border-burn-500" />

          <div className="absolute bottom-0 left-0 right-0 top-9 overflow-hidden">
            <HeroBuildingSvg />
          </div>
        </div>

        {/* Floating annotations */}
        <Annot className="left-[-32px] top-[14%] [animation-delay:1.4s]" labelDot="right">
          <div className="font-mono text-[10px] tracking-[0.1em] text-ink-50">GFA</div>
          <div className="display-italic text-base text-ink">14,820 ㎡</div>
        </Annot>
        <Annot className="right-[-40px] top-[48%] [animation-delay:1.8s]" labelDot="left">
          <div className="font-mono text-[10px] tracking-[0.1em] text-ink-50">EST. IRR</div>
          <div className="display-italic text-base text-burn-500">18.4%</div>
        </Annot>
        <Annot className="bottom-[8%] left-[-24px] [animation-delay:2.2s]" labelDot="right">
          <div className="font-mono text-[10px] tracking-[0.1em] text-ink-50">CONTEXT</div>
          <div className="display-italic text-base text-ink">강남구 역삼동</div>
        </Annot>
      </div>
    </div>
  </section>
);

const Annot = ({
  className,
  labelDot,
  children,
}: {
  className?: string;
  labelDot: "left" | "right";
  children: React.ReactNode;
}) => (
  <div
    className={`absolute z-10 hidden translate-y-2 rounded-sm border border-line bg-white px-3.5 py-2.5 text-[12px] text-ink opacity-0 shadow-soft animate-[annot_1s_cubic-bezier(0.22,1,0.36,1)_forwards] md:block ${className}`}
  >
    <span
      className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-burn-500 ${labelDot === "right" ? "right-[-3px]" : "left-[-3px]"}`}
    />
    {children}
  </div>
);
