const partners = [
  "천지 디앤씨",
  "한우리 PF",
  "세종 자산운용",
  "K-Land 캐피탈",
  "다온 리얼티",
  "현대 부동산투자",
  "대신 인베스트먼트",
  "플레이스파크",
];

export const MarqueeStrip = () => (
  <div className="overflow-hidden border-y border-line bg-paper py-6">
    <div className="flex w-max animate-[marquee_40s_linear_infinite] items-center gap-20">
      {[...partners, ...partners].map((p, i) => (
        <span
          key={`${p}-${i}`}
          className="display-italic flex items-center gap-20 whitespace-nowrap text-[22px] text-ink-30"
        >
          {p}
          <span className="not-italic text-xs text-burn-500">✦</span>
        </span>
      ))}
    </div>
  </div>
);
