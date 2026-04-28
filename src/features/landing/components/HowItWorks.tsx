import Link from "next/link";

type StepDef = {
  num: string;
  title: string;
  desc: string;
  visual: React.ReactNode;
};

const STEPS: ReadonlyArray<StepDef> = [
  {
    num: "01",
    title: "필지 선택",
    desc: "카카오맵에서 주소를 검색해 사업 대상 필지를 핀으로 지정합니다. 지번·도로명 자동 인식.",
    visual: (
      <svg viewBox="0 0 400 140" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
        <defs>
          <pattern id="hg1" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0 L0 0 0 32" fill="none" stroke="rgba(255,255,255,.04)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="140" fill="url(#hg1)" />
        <g stroke="rgba(255,255,255,.15)" strokeWidth="0.6" fill="none">
          <rect x="60" y="20" width="80" height="50" />
          <rect x="160" y="20" width="100" height="80" />
          <rect x="280" y="40" width="80" height="60" />
          <rect x="60" y="90" width="80" height="30" />
        </g>
        <g>
          <rect x="160" y="20" width="100" height="80" fill="rgba(212,84,31,.18)" stroke="#D4541F" strokeWidth="1.4" strokeDasharray="3 2" />
          <circle cx="210" cy="60" r="20" fill="rgba(212,84,31,.2)" />
          <circle cx="210" cy="60" r="10" fill="rgba(212,84,31,.5)" />
          <circle cx="210" cy="60" r="4" fill="#D4541F" />
        </g>
        <text x="280" y="65" fontFamily="ui-monospace, monospace" fontSize="10" fill="#F08956" letterSpacing="1">서울 강남구 역삼동 123-4</text>
      </svg>
    ),
  },
  {
    num: "02",
    title: "현장 이미지 확보",
    desc: "도시·바다·산·시골·강변·공원 등 사전 큐레이션된 AI 배경 라이브러리에서 필지 컨텍스트에 맞게 자동 매칭.",
    visual: (
      <svg viewBox="0 0 400 140" className="h-full w-full">
        <rect x="20" y="25" width="80" height="90" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.15)" strokeWidth="0.6" />
        <text x="60" y="75" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(255,255,255,.5)" letterSpacing="1">CITY</text>
        <rect x="110" y="25" width="80" height="90" fill="rgba(212,84,31,.08)" stroke="#D4541F" strokeWidth="1.2" />
        <text x="150" y="75" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="#F08956" letterSpacing="1">OCEAN ✓</text>
        <rect x="200" y="25" width="80" height="90" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.15)" strokeWidth="0.6" />
        <text x="240" y="75" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(255,255,255,.5)" letterSpacing="1">MOUNTAIN</text>
        <rect x="290" y="25" width="80" height="90" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.15)" strokeWidth="0.6" />
        <text x="330" y="75" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(255,255,255,.5)" letterSpacing="1">RURAL</text>
      </svg>
    ),
  },
  {
    num: "03",
    title: "필지 정보 입력",
    desc: "대지면적, 용적률, 건폐율, 층수, 용도. 필요한 최소 정보만 입력하면 설계 한도 자동 계산.",
    visual: (
      <svg viewBox="0 0 400 140" className="h-full w-full">
        <g fontFamily="ui-monospace, monospace" fontSize="10">
          <rect x="20" y="20" width="170" height="40" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.15)" strokeWidth="0.6" />
          <text x="32" y="38" fill="rgba(255,255,255,.4)">대지면적</text>
          <text x="32" y="52" fill="#FAFAF7" fontSize="13">1,240 ㎡</text>
          <rect x="210" y="20" width="170" height="40" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.15)" strokeWidth="0.6" />
          <text x="222" y="38" fill="rgba(255,255,255,.4)">용적률</text>
          <text x="222" y="52" fill="#FAFAF7" fontSize="13">800 %</text>
          <rect x="20" y="74" width="170" height="40" fill="rgba(212,84,31,.08)" stroke="#D4541F" strokeWidth="1" />
          <text x="32" y="92" fill="#F08956">건폐율</text>
          <text x="32" y="106" fill="#FAFAF7" fontSize="13">60 %</text>
          <rect x="210" y="74" width="170" height="40" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.15)" strokeWidth="0.6" />
          <text x="222" y="92" fill="rgba(255,255,255,.4)">층수</text>
          <text x="222" y="106" fill="#FAFAF7" fontSize="13">18F / B3</text>
        </g>
      </svg>
    ),
  },
  {
    num: "04",
    title: "디자인 스타일 선택",
    desc: "호텔에 어울리는 6종 프리미엄 스타일 중 1~2개 선택. 후속 비교 렌더링도 가능.",
    visual: (
      <svg viewBox="0 0 400 140" className="h-full w-full">
        <g stroke="rgba(255,255,255,.15)" strokeWidth="0.6" fill="rgba(255,255,255,.03)">
          <rect x="14" y="20" width="56" height="100" />
          <rect x="78" y="20" width="56" height="100" />
          <rect x="142" y="20" width="56" height="100" />
          <rect x="206" y="20" width="56" height="100" />
          <rect x="270" y="20" width="56" height="100" />
          <rect x="334" y="20" width="56" height="100" />
        </g>
        <rect x="14" y="20" width="56" height="100" fill="rgba(212,84,31,.1)" stroke="#D4541F" strokeWidth="1.2" />
        <rect x="206" y="20" width="56" height="100" fill="rgba(212,84,31,.1)" stroke="#D4541F" strokeWidth="1.2" />
        <g stroke="rgba(255,255,255,.6)" strokeWidth="0.8" fill="none">
          <path d="M30,100 L30,60 L42,50 L54,60 L54,100 Z" />
          <rect x="92" y="60" width="28" height="40" />
          <path d="M156,100 L156,60 Q156,50 170,50 Q184,50 184,60 L184,100 Z" />
          <rect x="220" y="60" width="28" height="40" rx="14" />
          <rect x="284" y="65" width="28" height="35" />
          <path d="M348,100 L348,72 L362,62 L376,72 L376,100 Z" />
        </g>
      </svg>
    ),
  },
  {
    num: "05",
    title: "AI 생성 & 결과 확인",
    desc: "건물 이미지 합성과 설계 제안서가 동시에 생성됩니다. PDF로 다운로드해 PF·인허가 자료로 바로 제출.",
    visual: (
      <svg viewBox="0 0 400 140" className="h-full w-full">
        <rect x="20" y="20" width="170" height="100" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.15)" strokeWidth="0.6" />
        <g stroke="rgba(255,255,255,.7)" strokeWidth="0.8" fill="none">
          <path d="M70,110 L70,55 L105,40 L140,55 L140,110 Z" />
          <line x1="70" y1="55" x2="140" y2="55" />
          <line x1="105" y1="40" x2="105" y2="110" />
          <line x1="70" y1="75" x2="140" y2="75" />
          <line x1="70" y1="95" x2="140" y2="95" />
        </g>
        <text x="105" y="128" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(255,255,255,.4)" letterSpacing="1">RENDER.PNG</text>
        <rect x="210" y="20" width="170" height="100" fill="#FAFAF7" stroke="#D4541F" strokeWidth="1" />
        <g fontFamily="serif" fontSize="6" fill="#0E0E0C">
          <text x="222" y="34" fontWeight="700">설계 제안서</text>
          <line x1="222" y1="38" x2="262" y2="38" stroke="#D4541F" />
          <line x1="222" y1="46" x2="370" y2="46" stroke="#9D9D95" strokeWidth="0.4" />
          <line x1="222" y1="51" x2="370" y2="51" stroke="#9D9D95" strokeWidth="0.4" />
          <line x1="222" y1="56" x2="360" y2="56" stroke="#9D9D95" strokeWidth="0.4" />
          <rect x="222" y="62" width="60" height="36" fill="#E1DED2" />
          <line x1="288" y1="66" x2="370" y2="66" stroke="#9D9D95" strokeWidth="0.4" />
          <line x1="288" y1="72" x2="370" y2="72" stroke="#9D9D95" strokeWidth="0.4" />
          <line x1="288" y1="78" x2="360" y2="78" stroke="#9D9D95" strokeWidth="0.4" />
          <line x1="288" y1="84" x2="368" y2="84" stroke="#9D9D95" strokeWidth="0.4" />
          <line x1="288" y1="90" x2="362" y2="90" stroke="#9D9D95" strokeWidth="0.4" />
          <line x1="288" y1="96" x2="358" y2="96" stroke="#9D9D95" strokeWidth="0.4" />
        </g>
        <text x="295" y="128" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(255,255,255,.4)" letterSpacing="1">PROPOSAL.PDF</text>
      </svg>
    ),
  },
];

export const HowItWorks = () => (
  <section className="relative overflow-hidden bg-ink py-[140px] text-paper before:absolute before:inset-0 before:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] before:bg-[length:80px_80px]">
    <div className="relative mx-auto max-w-[1280px] px-8">
      <header className="mb-[72px] flex max-w-[760px] flex-col gap-4">
        <div className="eyebrow flex items-center gap-2.5 text-burn-300 before:h-px before:w-6 before:bg-current before:content-['']">
          How it works
        </div>
        <h2 className="display-italic text-[56px] leading-[1.04] tracking-[-0.02em] text-paper">
          5스텝, <em className="not-italic display-italic text-burn-400">10분.</em>
        </h2>
        <p className="max-w-[580px] text-[17px] leading-relaxed text-ink-30">
          지도에서 필지를 찾고, 정보를 입력하고, 스타일을 고르면 끝입니다.
          설계 제안서 PDF까지 한 번에.
        </p>
      </header>

      <div className="flex flex-col">
        {STEPS.map((s, i) => (
          <Link
            key={s.num}
            href="/studio/new"
            className="group relative grid grid-cols-1 items-start gap-10 border-b border-white/10 py-9 transition-[padding] duration-500 ease-out-expo last:border-0 hover:pl-4 md:grid-cols-[80px_1fr_1.2fr]"
          >
            <span className="absolute -inset-x-8 inset-y-0 -z-10 rounded bg-burn-500/0 transition-colors duration-500 ease-out-expo group-hover:bg-burn-500/[0.04]" />
            <div className="display-italic text-[64px] leading-none text-burn-400 transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
              {s.num}
              <sup className="ml-1 align-super font-mono text-[12px] not-italic text-ink-30">/05</sup>
            </div>
            <div className="flex flex-col gap-2.5 pt-3">
              <h4 className="display-italic m-0 text-[28px] leading-snug tracking-[-0.015em] text-paper not-italic">
                {s.title}
              </h4>
              <p className="m-0 max-w-[380px] text-[15px] leading-[1.65] text-ink-30">{s.desc}</p>
            </div>
            <div className="hidden h-[140px] overflow-hidden rounded-md border border-white/10 bg-white/[0.03] transition-all duration-500 ease-out-expo group-hover:border-burn-500 group-hover:bg-burn-500/[0.04] md:block">
              {s.visual}
            </div>
            {/* hidden i so unused warn isn't an issue */}
            <span className="hidden">{i}</span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
