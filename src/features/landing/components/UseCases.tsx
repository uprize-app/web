type UseCase = {
  title: React.ReactNode;
  desc: string;
  tags: string[];
  illust: React.ReactNode;
};

const PFIllust = () => (
  <svg viewBox="0 0 320 180" className="h-full w-full">
    <defs>
      <pattern id="ug1" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0 L0 0 0 20" fill="none" stroke="rgba(14,14,12,.04)" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="320" height="180" fill="#F2F1EC" />
    <rect width="320" height="180" fill="url(#ug1)" />
    <g>
      <rect x="40" y="120" width="24" height="40" fill="#0E0E0C" opacity="0.4" />
      <rect x="76" y="100" width="24" height="60" fill="#0E0E0C" opacity="0.5" />
      <rect x="112" y="80" width="24" height="80" fill="#0E0E0C" opacity="0.6" />
      <rect x="148" y="60" width="24" height="100" fill="#0E0E0C" opacity="0.75" />
      <rect x="184" y="40" width="24" height="120" fill="#D4541F" />
      <line x1="30" y1="160" x2="280" y2="160" stroke="#0E0E0C" strokeWidth="0.6" />
    </g>
    <path d="M40,135 Q80,115 100,105 T180,55 L210,40" fill="none" stroke="#D4541F" strokeWidth="1.5" />
    <text x="240" y="58" fontFamily="serif" fontStyle="italic" fontSize="16" fill="#D4541F">IRR 18.4%</text>
    <text x="240" y="74" fontFamily="ui-monospace, monospace" fontSize="9" fill="#5A5A52" letterSpacing="1">PF MODEL</text>
  </svg>
);

const PermitIllust = () => (
  <svg viewBox="0 0 320 180" className="h-full w-full">
    <rect width="320" height="180" fill="#F2F1EC" />
    <rect x="80" y="40" width="120" height="120" fill="#FFFFFF" stroke="#0E0E0C" strokeWidth="0.8" />
    <rect x="100" y="60" width="60" height="40" fill="#0E0E0C" />
    <path d="M115,100 L115,75 L130,68 L145,75 L145,100 Z" fill="#D4541F" />
    <line x1="100" y1="110" x2="180" y2="110" stroke="#9D9D95" strokeWidth="0.5" />
    <line x1="100" y1="118" x2="180" y2="118" stroke="#9D9D95" strokeWidth="0.5" />
    <line x1="100" y1="126" x2="170" y2="126" stroke="#9D9D95" strokeWidth="0.5" />
    <line x1="100" y1="134" x2="180" y2="134" stroke="#9D9D95" strokeWidth="0.5" />
    <circle cx="200" cy="140" r="22" fill="none" stroke="#D4541F" strokeWidth="1.2" />
    <text x="200" y="138" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#D4541F" fontWeight="700">사전협의</text>
    <text x="200" y="148" textAnchor="middle" fontFamily="serif" fontSize="7" fill="#D4541F">접수</text>
  </svg>
);

const InvestorIllust = () => (
  <svg viewBox="0 0 320 180" className="h-full w-full">
    <rect width="320" height="180" fill="#F2F1EC" />
    <rect x="50" y="30" width="220" height="130" fill="#FFFFFF" stroke="#0E0E0C" strokeWidth="0.8" />
    <g stroke="#0E0E0C" strokeWidth="0.8" fill="none">
      <path d="M130,140 L190,140 L185,75 L135,75 Z" />
      <path d="M135,75 L160,60 L185,75" />
      <line x1="140" y1="90" x2="180" y2="90" />
      <line x1="140" y1="105" x2="180" y2="105" />
      <line x1="140" y1="120" x2="180" y2="120" />
      <line x1="160" y1="60" x2="160" y2="140" />
    </g>
    <text x="65" y="48" fontFamily="serif" fontStyle="italic" fontSize="11" fill="#D4541F">Project Aurora</text>
    <line x1="65" y1="52" x2="120" y2="52" stroke="#D4541F" strokeWidth="0.7" />
    <text x="65" y="152" fontFamily="ui-monospace, monospace" fontSize="7" fill="#5A5A52" letterSpacing="1">03 / 24</text>
    <g fill="#0E0E0C" opacity="0.5">
      <circle cx="22" cy="170" r="4" />
      <circle cx="34" cy="170" r="4" />
      <circle cx="46" cy="170" r="4" />
    </g>
  </svg>
);

const CASES: ReadonlyArray<UseCase> = [
  {
    title: <>금융사 <em className="not-italic display-italic text-burn-500">PF 제안</em></>,
    desc: "사업성 검토 단계에서 시각 자료로 즉시 활용. 텍스트 기반 PF 제안서에 결정적 차별점을 더합니다.",
    tags: ["PF Memo", "사업계획서", "IRR 모델"],
    illust: <PFIllust />,
  },
  {
    title: <>지자체 <em className="not-italic display-italic text-burn-500">인허가</em> 준비</>,
    desc: "사전 협의 단계에서 건물 이미지와 개요 자료를 함께 제출. 구두 설명을 줄이고 명확한 합의를 끌어냅니다.",
    tags: ["사전협의", "건축심의", "도시계획"],
    illust: <PermitIllust />,
  },
  {
    title: <>투자자 <em className="not-italic display-italic text-burn-500">프레젠테이션</em></>,
    desc: "완성도 높은 건물 렌더링으로 신뢰도 제고. 텍스트 기반 IM 대비 의사결정 속도를 단축시킵니다.",
    tags: ["IM", "Investor Deck", "Site Visit"],
    illust: <InvestorIllust />,
  },
];

export const UseCases = () => (
  <section className="bg-paper-2 py-[140px]">
    <div className="mx-auto max-w-[1280px] px-8">
      <header className="mb-[72px] flex max-w-[760px] flex-col gap-4">
        <div className="eyebrow flex items-center gap-2.5 text-burn-500 before:h-px before:w-6 before:bg-current before:content-['']">
          Use Cases
        </div>
        <h2 className="display-italic text-[56px] leading-[1.04] tracking-[-0.02em]">
          사업 제안의
          <br />
          <em className="not-italic display-italic text-burn-500">결정적 순간</em>에.
        </h2>
        <p className="max-w-[580px] text-[17px] leading-relaxed text-ink-50">
          시각 자료가 사업 진행을 가르는 자리. Uprize는 그 순간을 위해 설계되었습니다.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {CASES.map((c, i) => (
          <article
            key={i}
            className="group relative overflow-hidden rounded-lg border border-line bg-white px-8 pb-8 pt-9 transition-all duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink hover:shadow-lift"
          >
            <div className="-mx-8 -mt-9 mb-7 h-[180px] overflow-hidden border-b border-line bg-paper-2">
              {c.illust}
            </div>
            <h4 className="display-italic mb-3.5 text-[26px] leading-tight tracking-[-0.015em] not-italic">
              {c.title}
            </h4>
            <p className="mb-5 text-sm leading-relaxed text-ink-50">{c.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {c.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-50 transition-colors group-hover:border-burn-500 group-hover:text-burn-500"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
