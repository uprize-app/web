import { ArrowRight } from "lucide-react";

import {
  BiophilicSvg,
  FuturistSvg,
  HeritageSvg,
  IconicSvg,
  MinimalSvg,
  ResortSvg,
} from "@/features/project-wizard/components/svg/StyleSvgs";

type StyleEntry = {
  num: string;
  code: string;
  name: React.ReactNode;
  ref: string;
  desc: string;
  Svg: React.ComponentType;
};

const STYLES: ReadonlyArray<StyleEntry> = [
  { num: "01", code: "ICONIC",    name: <>아이코닉<br />랜드마크</>,    ref: "— 버즈 알 아랍 (두바이)",      desc: "도시 스카이라인을 정의하는 시그니처 형태.",          Svg: IconicSvg },
  { num: "02", code: "MINIMAL",   name: <>미니멀<br />럭셔리</>,        ref: "— 아만 · 파크하얏트 (도쿄)",     desc: "절제된 매스와 깊은 그림자. 정적인 럭셔리.",        Svg: MinimalSvg },
  { num: "03", code: "BIOPHILIC", name: <>바이오필릭<br />그린</>,      ref: "— 파크로얄 (싱가포르)",          desc: "계단식 매스에 식재가 흐르는 자연 통합형.",         Svg: BiophilicSvg },
  { num: "04", code: "FUTURIST",  name: <>미래주의<br />하이테크</>,    ref: "— 자하 하디드 영감",             desc: "유체적 매스와 파라메트릭 패턴.",                  Svg: FuturistSvg },
  { num: "05", code: "HERITAGE",  name: <>헤리티지<br />모던</>,        ref: "— 포시즌스 조지 5세 (파리)",     desc: "고전적 비례와 매서드 지붕의 현대적 재해석.",       Svg: HeritageSvg },
  { num: "06", code: "RESORT",    name: <>럭셔리<br />리조트</>,        ref: "— 포시즌스 사얀 (발리)",         desc: "자연과 조화되는 저층 풀빌라형.",                  Svg: ResortSvg },
];

export const StylesShowcase = () => (
  <section className="bg-paper py-[140px]">
    <div className="mx-auto max-w-[1280px] px-8">
      <header className="mb-[72px] flex max-w-[760px] flex-col gap-4">
        <div className="eyebrow flex items-center gap-2.5 text-burn-500 before:h-px before:w-6 before:bg-current before:content-['']">
          Design Styles · 06
        </div>
        <h2 className="display-italic text-[56px] leading-[1.04] tracking-[-0.02em]">
          건물의 <em className="not-italic display-italic text-burn-500">언어</em>를
          <br />
          선택하세요.
        </h2>
        <p className="max-w-[580px] text-[17px] leading-relaxed text-ink-50">
          세계적 호텔·랜드마크에서 영감을 받은 6종 프리미엄 스타일.
          용도와 입지에 가장 어울리는 디자인 언어를 고르세요.
        </p>
      </header>

      <div className="grid grid-cols-1 border border-line md:grid-cols-3">
        {STYLES.map((s, i) => {
          const Svg = s.Svg;
          const noRight = (i + 1) % 3 === 0;
          const lastRow = i >= STYLES.length - 3;
          return (
            <div
              key={s.num}
              className={`group relative aspect-[4/5] overflow-hidden bg-white transition-colors duration-500 ease-out-expo ${
                noRight ? "" : "md:border-r"
              } ${lastRow ? "" : "border-b"} border-line`}
            >
              <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
                <Svg />
              </div>
              <div className="relative z-[2] flex h-full flex-col justify-between p-7">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-ink-50">
                  <span className="font-medium text-burn-500">{s.num}</span>
                  <span>{s.code}</span>
                </div>
                <div>
                  <h4 className="display-italic m-0 mb-1.5 text-[28px] leading-tight tracking-[-0.02em] text-ink not-italic">
                    {s.name}
                  </h4>
                  <div className="display-italic mb-4 text-[12px] text-ink-50">
                    {s.ref}
                  </div>
                  <div className="grid max-h-0 overflow-hidden text-[13px] leading-snug text-ink-50 opacity-0 transition-all duration-500 ease-out-expo group-hover:max-h-16 group-hover:opacity-100">
                    {s.desc}
                  </div>
                  <div className="mt-4 grid h-9 w-9 place-items-center rounded-full border border-ink text-ink transition-all duration-500 ease-out-expo group-hover:rotate-[-45deg] group-hover:border-burn-500 group-hover:bg-burn-500 group-hover:text-paper">
                    <ArrowRight size={14} strokeWidth={1.6} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
