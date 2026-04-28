type ValueCard = {
  num: string;
  tag: string;
  title: React.ReactNode;
  desc: string;
  spec: [string, string];
  Icon: React.ComponentType;
};

const ClockIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="18" stroke="currentColor" strokeWidth="1.2" />
    <path d="M22 12v10l6 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M22 4v3M22 37v3M40 22h-3M7 22H4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const DocIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect x="6" y="8" width="32" height="28" stroke="currentColor" strokeWidth="1.2" />
    <path d="M6 16h32" stroke="currentColor" strokeWidth="1.2" />
    <path d="M14 24l4 4 8-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GridIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect x="6" y="6" width="14" height="14" stroke="currentColor" strokeWidth="1.2" />
    <rect x="24" y="6" width="14" height="14" stroke="currentColor" strokeWidth="1.2" />
    <rect x="6" y="24" width="14" height="14" stroke="currentColor" strokeWidth="1.2" />
    <rect x="24" y="24" width="14" height="14" fill="currentColor" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

const CARDS: ValueCard[] = [
  {
    num: "01",
    tag: "SPEED",
    title: <>10분 만에 <em className="not-italic display-italic text-burn-500">완성</em></>,
    desc: "견적·미팅·드래프트를 기다리지 않습니다. 필지 정보만 입력하면 사업 제안용 건물 이미지와 설계안이 즉시 생성됩니다.",
    spec: ["평균 8m 42s", "v2.4"],
    Icon: ClockIcon,
  },
  {
    num: "02",
    tag: "READY",
    title: <>PF·인허가 <em className="not-italic display-italic text-burn-500">바로 활용</em></>,
    desc: "금융사 PF 제안, 지자체 인허가 사전협의, 투자자 PT에 그대로 사용할 수 있는 결과물. 별도 후처리 없이 즉시 제출.",
    spec: ["PDF · XLSX · PNG", "4K"],
    Icon: DocIcon,
  },
  {
    num: "03",
    tag: "STYLE",
    title: <>6가지 <em className="not-italic display-italic text-burn-500">프리미엄</em><br />스타일</>,
    desc: "아이코닉 랜드마크부터 럭셔리 리조트까지. 호텔·오피스텔·주거복합 용도에 어울리는 디자인 언어를 선택하세요.",
    spec: ["6 styles · 호텔", "+ 5종 예정"],
    Icon: GridIcon,
  },
];

export const ValueProp = () => (
  <section className="bg-paper py-[140px]">
    <div className="mx-auto max-w-[1280px] px-8">
      <header className="mb-[72px] flex max-w-[760px] flex-col gap-4">
        <div className="eyebrow flex items-center gap-2.5 text-burn-500 before:h-px before:w-6 before:bg-current before:content-['']">
          왜 Uprize인가
        </div>
        <h2 className="display-italic text-[56px] leading-[1.04] tracking-[-0.02em]">
          건축사무소 가기 전,
          <br />
          <em className="not-italic display-italic text-burn-500">먼저 검증하세요.</em>
        </h2>
        <p className="max-w-[580px] text-[17px] leading-relaxed text-ink-50">
          설계 계약 전 단계에서 사업성·디자인·인허가 가능성을 시각적으로 확인합니다.
          시행사 대표의 의사결정이 가장 빠른 곳에서 이뤄지도록.
        </p>
      </header>

      <div className="grid border-t border-line md:grid-cols-3">
        {CARDS.map((c, i) => {
          const Icon = c.Icon;
          return (
            <div
              key={c.num}
              className={`group relative border-b border-line py-14 transition-all duration-300 ease-out-expo ${
                i < 2 ? "md:border-r md:pr-9" : ""
              } ${i > 0 ? "md:pl-9" : "md:pr-9"} px-9 md:px-0`}
            >
              <span className="absolute inset-x-0 top-[-1px] h-0.5 origin-left scale-x-0 bg-burn-500 transition-transform duration-700 ease-out-expo group-hover:scale-x-100" />

              <div className="mb-7 flex justify-between font-mono text-[11px] tracking-[0.12em] text-ink-50">
                <span>{c.num}</span>
                <span className="text-burn-500">{c.tag}</span>
              </div>
              <div className="mb-8 text-ink transition-all duration-300 group-hover:rotate-[-4deg] group-hover:scale-105 group-hover:text-burn-500">
                <Icon />
              </div>
              <h3 className="display-italic mb-4 text-[32px] leading-[1.15] tracking-[-0.015em]">
                {c.title}
              </h3>
              <p className="mb-6 text-[15px] leading-[1.7] text-ink-50">{c.desc}</p>
              <div className="flex justify-between border-t border-line pt-5 font-mono text-[11px] uppercase tracking-[0.06em] text-ink-30">
                <span>{c.spec[0]}</span>
                <span>{c.spec[1]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
