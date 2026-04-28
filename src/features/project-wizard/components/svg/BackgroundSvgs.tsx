/**
 * Mock 배경 일러스트. 디자인 번들의 SVG 그대로 React 컴포넌트화.
 * 추후 fal.ai 생성 이미지 또는 Supabase Storage URL 로 교체 예정.
 */

const baseProps = {
  viewBox: "0 0 320 240",
  preserveAspectRatio: "xMidYMid slice",
  className: "h-full w-full",
} as const;

export const CitySvg = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="bg-c" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#D4D8DC" />
        <stop offset="1" stopColor="#9DA5AD" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" fill="url(#bg-c)" />
    <g fill="#5A5A52" opacity="0.7">
      <rect x="20" y="100" width="40" height="140" />
      <rect x="65" y="80" width="35" height="160" />
      <rect x="105" y="120" width="50" height="120" />
      <rect x="160" y="60" width="45" height="180" />
      <rect x="210" y="100" width="40" height="140" />
      <rect x="255" y="90" width="50" height="150" />
    </g>
    <g fill="#FFFFFF" opacity="0.5">
      <rect x="170" y="80" width="6" height="6" />
      <rect x="184" y="80" width="6" height="6" />
      <rect x="170" y="100" width="6" height="6" />
      <rect x="184" y="100" width="6" height="6" />
    </g>
  </svg>
);

export const OceanSvg = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="bg-o" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#D6E2EA" />
        <stop offset="1" stopColor="#7FA2BD" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" fill="url(#bg-o)" />
    <path
      d="M0,140 Q80,135 160,138 Q240,142 320,138 L320,240 L0,240 Z"
      fill="#5C7E99"
    />
    <path
      d="M0,150 Q80,145 160,148 Q240,152 320,148"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="0.8"
      opacity="0.5"
    />
    <path
      d="M0,170 Q80,166 160,168 Q240,172 320,168"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="0.8"
      opacity="0.4"
    />
    <circle cx="240" cy="60" r="22" fill="#FAFAF7" opacity="0.85" />
  </svg>
);

export const MountainSvg = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="bg-m" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E8E5DC" />
        <stop offset="1" stopColor="#A8A89C" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" fill="url(#bg-m)" />
    <path
      d="M0,180 L80,90 L160,150 L240,70 L320,140 L320,240 L0,240 Z"
      fill="#7B8273"
    />
    <path
      d="M40,200 L120,130 L200,170 L280,110 L320,150 L320,240 L0,240 Z"
      fill="#5C6555"
      opacity="0.7"
    />
  </svg>
);

export const RuralSvg = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="bg-r" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E2DDC9" />
        <stop offset="1" stopColor="#9FA47F" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" fill="url(#bg-r)" />
    <path
      d="M0,170 Q80,165 160,168 Q240,170 320,166 L320,240 L0,240 Z"
      fill="#8B9163"
    />
    <g stroke="#5C6F3D" strokeWidth="0.8" opacity="0.6">
      <line x1="0" y1="190" x2="320" y2="190" />
      <line x1="0" y1="210" x2="320" y2="210" />
    </g>
    <g fill="#7C8F50" opacity="0.5">
      <rect x="40" y="160" width="14" height="6" />
      <rect x="80" y="158" width="14" height="6" />
      <rect x="240" y="162" width="14" height="6" />
    </g>
  </svg>
);

export const RiverSvg = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="bg-rv" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#DCE4E0" />
        <stop offset="1" stopColor="#8FA59C" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" fill="url(#bg-rv)" />
    <path
      d="M0,160 Q80,140 160,150 Q240,160 320,150 L320,180 Q240,180 160,178 Q80,170 0,180 Z"
      fill="#6E8C99"
    />
    <g fill="#5A5A52" opacity="0.4">
      <rect x="30" y="120" width="22" height="40" />
      <rect x="270" y="115" width="22" height="45" />
    </g>
  </svg>
);

export const ParkSvg = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="bg-p" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E0EAD8" />
        <stop offset="1" stopColor="#869978" />
      </linearGradient>
    </defs>
    <rect width="320" height="240" fill="url(#bg-p)" />
    <path
      d="M0,180 Q80,175 160,178 Q240,180 320,176 L320,240 L0,240 Z"
      fill="#6F8462"
    />
    <g>
      <circle cx="60" cy="170" r="22" fill="#5C7050" />
      <line x1="60" y1="190" x2="60" y2="210" stroke="#3D3D38" strokeWidth="2" />
      <circle cx="260" cy="160" r="28" fill="#5C7050" />
      <line
        x1="260"
        y1="186"
        x2="260"
        y2="210"
        stroke="#3D3D38"
        strokeWidth="2"
      />
      <circle cx="160" cy="175" r="18" fill="#7A8E66" />
      <line
        x1="160"
        y1="190"
        x2="160"
        y2="206"
        stroke="#3D3D38"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);
