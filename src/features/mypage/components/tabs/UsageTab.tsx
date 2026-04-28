import { SectionHeader } from "../SectionHeader";

type Stat = {
  label: string;
  value: React.ReactNode;
  suffix: string;
  delta?: string;
  warn?: boolean;
};

const STATS: ReadonlyArray<Stat> = [
  { label: "총 프로젝트",  value: <em className="display-italic text-burn-500">12</em>, suffix: "건",    delta: "+3 이번 달" },
  { label: "합성 면적",    value: "142,830",                                              suffix: "㎡",    delta: "+24,400㎡" },
  { label: "렌더 횟수",    value: "28",                                                   suffix: "회",    delta: "한도 50회" },
  { label: "스토리지",     value: "38.2",                                                 suffix: "GB",    delta: "76% · 정리 권장", warn: true },
];

export const UsageTab = () => (
  <div>
    <SectionHeader
      title={<>사용량 <em className="not-italic display-italic text-burn-500">리포트.</em></>}
      sub="2026.04 · 26일째 / 30일"
    />

    <div className="mb-7 grid grid-cols-2 gap-5 md:grid-cols-4">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="rounded-md border border-line bg-white px-6 py-5"
        >
          <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-50">
            {s.label}
          </div>
          <div className="display-italic flex items-baseline text-[28px] leading-none tracking-[-0.015em] not-italic">
            {s.value}
            <sup className="ml-1 align-top text-xs text-ink-50">{s.suffix}</sup>
          </div>
          {s.delta ? (
            <div
              className={`mt-2.5 font-mono text-[11px] tracking-[0.04em] ${
                s.warn ? "text-burn-500" : "text-[#4F8A6E]"
              }`}
            >
              {s.delta}
            </div>
          ) : null}
        </div>
      ))}
    </div>

    <div className="rounded-lg border border-line bg-white px-8 py-7">
      <h3 className="display-italic m-0 mb-1 text-[22px] tracking-[-0.01em] not-italic">
        월별 프로젝트 생성
      </h3>
      <div className="mb-2 font-mono text-[12px] tracking-[0.04em] text-ink-50">
        2025.11 — 2026.04 · 6개월
      </div>
      <svg
        className="mt-2 h-60 w-full"
        viewBox="0 0 720 240"
        preserveAspectRatio="none"
      >
        <g stroke="#E1DED2" strokeWidth="0.8" strokeDasharray="3 3">
          <line x1="40" y1="40" x2="720" y2="40" />
          <line x1="40" y1="100" x2="720" y2="100" />
          <line x1="40" y1="160" x2="720" y2="160" />
        </g>
        <g fontFamily="ui-monospace, monospace" fontSize="9" fill="#7C7C73" letterSpacing="1">
          <text x="20" y="44" textAnchor="end">12</text>
          <text x="20" y="104" textAnchor="end">8</text>
          <text x="20" y="164" textAnchor="end">4</text>
          <text x="20" y="220" textAnchor="end">0</text>
        </g>
        <g fill="#0E0E0C">
          <rect x="80" y="160" width="60" height="60" />
          <rect x="180" y="130" width="60" height="90" />
          <rect x="280" y="100" width="60" height="120" />
          <rect x="380" y="115" width="60" height="105" />
          <rect x="480" y="85" width="60" height="135" />
        </g>
        <rect x="580" y="40" width="60" height="180" fill="#D4541F" />
        <g fontFamily="ui-monospace, monospace" fontSize="10" fill="#7C7C73" letterSpacing="1">
          <text x="110" y="234" textAnchor="middle">11월</text>
          <text x="210" y="234" textAnchor="middle">12월</text>
          <text x="310" y="234" textAnchor="middle">01월</text>
          <text x="410" y="234" textAnchor="middle">02월</text>
          <text x="510" y="234" textAnchor="middle">03월</text>
          <text x="610" y="234" textAnchor="middle" fill="#D4541F" fontWeight="700">
            04월
          </text>
        </g>
        <line x1="40" y1="220" x2="720" y2="220" stroke="#0E0E0C" strokeWidth="1" />
      </svg>
    </div>
  </div>
);
