/**
 * Mock 프로젝트 썸네일.
 */

const baseProps = {
  viewBox: "0 0 320 240",
  preserveAspectRatio: "xMidYMid slice",
  className: "h-full w-full transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]",
} as const;

export const AuroraThumb = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="sk1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E9E7DF" />
        <stop offset="1" stopColor="#F2F1EC" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" fill="url(#sk1)" />
    <g stroke="#0E0E0C" strokeWidth="0.4" opacity="0.3" fill="#FFFFFF">
      <rect x="10" y="170" width="40" height="60" />
      <rect x="55" y="155" width="30" height="75" />
      <rect x="240" y="160" width="35" height="70" />
      <rect x="280" y="175" width="35" height="55" />
    </g>
    <g stroke="#0E0E0C" strokeWidth="1" fill="#FFFFFF">
      <rect x="110" y="50" width="100" height="180" />
      <rect x="118" y="50" width="84" height="180" fill="rgba(212,84,31,.08)" />
      <line x1="110" y1="80" x2="210" y2="80" />
      <line x1="110" y1="105" x2="210" y2="105" />
      <line x1="110" y1="130" x2="210" y2="130" />
      <line x1="110" y1="155" x2="210" y2="155" />
      <line x1="110" y1="180" x2="210" y2="180" />
      <line x1="110" y1="205" x2="210" y2="205" />
      <line x1="135" y1="50" x2="135" y2="230" />
      <line x1="160" y1="50" x2="160" y2="230" />
      <line x1="185" y1="50" x2="185" y2="230" />
      <path d="M110,50 L160,30 L210,50" />
      <line x1="160" y1="30" x2="160" y2="14" />
      <circle cx="160" cy="14" r="2.5" fill="#D4541F" stroke="none" />
    </g>
    <line x1="0" y1="230" x2="320" y2="230" stroke="#0E0E0C" strokeWidth="1" />
  </svg>
);

export const SayanBayThumb = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="sk2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E5E8EB" />
        <stop offset="1" stopColor="#F2F1EC" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" fill="url(#sk2)" />
    <path
      d="M0,200 Q80,190 160,195 Q240,200 320,195 L320,240 L0,240 Z"
      fill="#D4D8DC"
      opacity="0.6"
    />
    <g stroke="#0E0E0C" strokeWidth="1" fill="#FFFFFF">
      <path d="M40,180 L40,140 Q80,120 120,140 L120,180 Z" />
      <path d="M120,180 L120,120 Q170,100 220,120 L220,180 Z" />
      <path d="M220,180 L220,140 Q260,125 290,140 L290,180 Z" />
      <line x1="40" y1="155" x2="120" y2="155" />
      <line x1="120" y1="135" x2="220" y2="135" />
      <line x1="120" y1="155" x2="220" y2="155" />
      <line x1="220" y1="155" x2="290" y2="155" />
      <line x1="80" y1="130" x2="80" y2="180" />
      <line x1="160" y1="110" x2="160" y2="180" />
      <line x1="180" y1="110" x2="180" y2="180" />
      <line x1="255" y1="130" x2="255" y2="180" />
    </g>
    <line x1="0" y1="180" x2="320" y2="180" stroke="#0E0E0C" strokeWidth="1" />
  </svg>
);

export const CurveThumb = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="sk3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FBEFE5" />
        <stop offset="1" stopColor="#F2F1EC" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" fill="url(#sk3)" />
    <g stroke="#0E0E0C" strokeWidth="1" fill="#FFFFFF" opacity="0.85">
      <path d="M120,40 Q160,40 200,80 Q210,140 200,220 L120,220 Q110,140 120,80 Q120,40 120,40 Z" />
      <line x1="115" y1="80" x2="205" y2="80" />
      <line x1="113" y1="110" x2="207" y2="110" />
      <line x1="111" y1="140" x2="209" y2="140" />
      <line x1="111" y1="170" x2="209" y2="170" />
      <line x1="113" y1="200" x2="207" y2="200" />
      <line x1="160" y1="40" x2="160" y2="220" />
    </g>
    <line x1="0" y1="220" x2="320" y2="220" stroke="#0E0E0C" strokeWidth="1" />
    <rect x="40" y="100" width="240" height="36" fill="rgba(250,250,247,.95)" stroke="#D4541F" strokeWidth="1" />
    <text x="160" y="116" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="#5A5A52" letterSpacing="2">
      RENDERING · 64%
    </text>
    <rect x="60" y="122" width="200" height="4" fill="#E1DED2" />
    <rect x="60" y="122" width="128" height="4" fill="#D4541F" />
  </svg>
);

export const StoneLodgeThumb = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="sk4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#EAEDE6" />
        <stop offset="1" stopColor="#F2F1EC" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" fill="url(#sk4)" />
    <path
      d="M0,180 L60,130 L120,170 L180,110 L240,150 L320,120 L320,240 L0,240 Z"
      fill="#C8CFC1"
      opacity="0.5"
    />
    <g stroke="#0E0E0C" strokeWidth="1" fill="#FFFFFF">
      <path d="M80,205 L80,160 L130,140 L130,205 Z" />
      <path d="M130,205 L130,135 L200,115 L200,205 Z" />
      <path d="M200,205 L200,150 L240,135 L240,205 Z" />
      <line x1="80" y1="180" x2="240" y2="180" />
      <line x1="105" y1="150" x2="105" y2="205" />
      <line x1="160" y1="125" x2="160" y2="205" />
      <line x1="220" y1="142" x2="220" y2="205" />
    </g>
    <line x1="0" y1="205" x2="320" y2="205" stroke="#0E0E0C" strokeWidth="1" />
  </svg>
);

export const BlackCubeThumb = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="sk5" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E9E7DF" />
        <stop offset="1" stopColor="#F2F1EC" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" fill="url(#sk5)" />
    <g stroke="#0E0E0C" strokeWidth="1" fill="#FFFFFF">
      <rect x="80" y="60" width="160" height="170" />
      <line x1="80" y1="90" x2="240" y2="90" />
      <line x1="80" y1="120" x2="240" y2="120" />
      <line x1="80" y1="150" x2="240" y2="150" />
      <line x1="80" y1="180" x2="240" y2="180" />
      <line x1="80" y1="210" x2="240" y2="210" />
      <line x1="120" y1="60" x2="120" y2="230" />
      <line x1="160" y1="60" x2="160" y2="230" />
      <line x1="200" y1="60" x2="200" y2="230" />
      <rect x="160" y="120" width="40" height="60" fill="rgba(212,84,31,.08)" />
    </g>
    <line x1="0" y1="230" x2="320" y2="230" stroke="#0E0E0C" strokeWidth="1" />
  </svg>
);

export const DraftThumb = () => (
  <svg {...baseProps}>
    <rect width="320" height="240" fill="#F2F1EC" />
    <g stroke="rgba(14,14,12,.2)" strokeWidth="0.6" fill="none">
      <path d="M40 0 L40 240 M80 0 L80 240 M120 0 L120 240 M160 0 L160 240 M200 0 L200 240 M240 0 L240 240 M280 0 L280 240" />
      <path d="M0 40 L320 40 M0 80 L320 80 M0 120 L320 120 M0 160 L320 160 M0 200 L320 200" />
    </g>
    <g fill="none" stroke="#D4541F" strokeWidth="1" strokeDasharray="3 2">
      <path d="M100,160 L220,160 L220,100 L100,100 Z" />
    </g>
    <text x="160" y="135" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="#5A5A52" letterSpacing="2">
      DRAFT
    </text>
    <text x="160" y="150" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="11" fill="#9D9D95">
      필지 정보 입력 대기
    </text>
  </svg>
);
