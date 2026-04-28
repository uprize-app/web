/**
 * Mock 스타일 일러스트 (호텔 6종). 디자인 번들 SVG 그대로 React 컴포넌트화.
 */

const baseProps = {
  viewBox: "0 0 320 320",
  className: "h-full w-full",
} as const;

export const IconicSvg = () => (
  <svg {...baseProps}>
    <rect width="320" height="320" fill="#FAFAF7" />
    <g stroke="#0E0E0C" strokeWidth="1" fill="none">
      <path d="M160,60 Q210,100 220,280 L100,280 Q110,100 160,60 Z" />
      <line x1="160" y1="60" x2="160" y2="30" />
      <line x1="105" y1="130" x2="215" y2="130" />
      <line x1="103" y1="170" x2="217" y2="170" />
      <line x1="101" y1="210" x2="219" y2="210" />
      <line x1="99" y1="250" x2="221" y2="250" />
    </g>
    <circle cx="160" cy="30" r="3" fill="#D4541F" />
  </svg>
);

export const MinimalSvg = () => (
  <svg {...baseProps}>
    <rect width="320" height="320" fill="#FAFAF7" />
    <g stroke="#0E0E0C" strokeWidth="1" fill="none">
      <rect x="80" y="80" width="160" height="200" />
      <line x1="80" y1="140" x2="240" y2="140" />
      <line x1="80" y1="200" x2="240" y2="200" />
      <line x1="80" y1="260" x2="240" y2="260" />
      <line x1="135" y1="80" x2="135" y2="280" />
      <line x1="190" y1="80" x2="190" y2="280" />
    </g>
    <rect x="190" y="140" width="50" height="60" fill="rgba(212,84,31,.15)" />
  </svg>
);

export const BiophilicSvg = () => (
  <svg {...baseProps}>
    <rect width="320" height="320" fill="#FAFAF7" />
    <g stroke="#0E0E0C" strokeWidth="1" fill="none">
      <rect x="50" y="240" width="220" height="40" />
      <rect x="60" y="200" width="200" height="40" />
      <rect x="70" y="160" width="180" height="40" />
      <rect x="80" y="120" width="160" height="40" />
      <rect x="90" y="80" width="140" height="40" />
    </g>
    <g fill="#4F8A6E" opacity="0.6">
      <ellipse cx="60" cy="240" rx="12" ry="6" />
      <ellipse cx="260" cy="240" rx="12" ry="6" />
      <ellipse cx="70" cy="200" rx="10" ry="5" />
      <ellipse cx="250" cy="200" rx="10" ry="5" />
      <ellipse cx="160" cy="78" rx="40" ry="6" />
    </g>
  </svg>
);

export const FuturistSvg = () => (
  <svg {...baseProps}>
    <rect width="320" height="320" fill="#FAFAF7" />
    <g stroke="#0E0E0C" strokeWidth="1" fill="none">
      <path d="M80,280 Q60,160 140,90 Q220,30 240,90 Q260,160 240,280 Z" />
      <path d="M85,140 Q160,120 235,140" />
      <path d="M82,180 Q160,160 238,180" />
      <path d="M80,220 Q160,200 240,220" />
      <path d="M125,280 L125,90" />
      <path d="M195,280 L195,90" />
    </g>
  </svg>
);

export const HeritageSvg = () => (
  <svg {...baseProps}>
    <rect width="320" height="320" fill="#FAFAF7" />
    <g stroke="#0E0E0C" strokeWidth="1" fill="none">
      <rect x="60" y="160" width="200" height="120" />
      <path d="M50,160 L160,100 L270,160 Z" />
      <rect x="80" y="180" width="30" height="50" />
      <rect x="125" y="180" width="30" height="50" />
      <rect x="170" y="180" width="30" height="50" />
      <rect x="215" y="180" width="30" height="50" />
      <rect x="100" y="125" width="14" height="20" />
      <rect x="153" y="120" width="14" height="22" />
      <rect x="206" y="125" width="14" height="20" />
    </g>
  </svg>
);

export const ResortSvg = () => (
  <svg {...baseProps}>
    <rect width="320" height="320" fill="#FAFAF7" />
    <g stroke="#0E0E0C" strokeWidth="1" fill="none">
      <path d="M30,260 L80,260 L70,220 L20,220 L10,240 Z" />
      <path d="M20,220 L50,190 L70,220" />
      <path d="M90,270 L160,270 L150,225 L80,225 L70,245 Z" />
      <path d="M80,225 L120,185 L150,225" />
      <path d="M170,270 L240,270 L230,220 L160,220 L150,235 Z" />
      <path d="M160,220 L200,185 L230,220" />
      <path d="M250,260 L310,260 L300,220 L240,220 L230,235 Z" />
      <path d="M240,220 L275,190 L300,220" />
    </g>
  </svg>
);
