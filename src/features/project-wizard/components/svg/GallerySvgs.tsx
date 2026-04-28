/**
 * Mock 결과 렌더 5컷.
 * 추후 fal.ai 가 생성한 실 이미지로 교체.
 */

const baseProps = {
  viewBox: "0 0 800 600",
  preserveAspectRatio: "xMidYMid slice",
  className: "block h-full w-full",
} as const;

export const ExteriorDaySvg = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="rs1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E5E2D6" />
        <stop offset="1" stopColor="#C9C4B0" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#rs1)" />
    <g fill="#A09B85" opacity="0.5">
      <rect x="0" y="380" width="60" height="220" />
      <rect x="60" y="360" width="50" height="240" />
      <rect x="700" y="370" width="50" height="230" />
      <rect x="750" y="350" width="50" height="250" />
    </g>
    <g stroke="#0E0E0C" strokeWidth="1" fill="#FAFAF7">
      <path d="M280,560 Q330,280 400,180 Q470,280 520,560 Z" />
      <line x1="285" y1="280" x2="515" y2="280" />
      <line x1="290" y1="320" x2="510" y2="320" />
      <line x1="295" y1="360" x2="505" y2="360" />
      <line x1="300" y1="400" x2="500" y2="400" />
      <line x1="305" y1="440" x2="495" y2="440" />
      <line x1="310" y1="480" x2="490" y2="480" />
      <line x1="315" y1="520" x2="485" y2="520" />
      <line x1="400" y1="180" x2="400" y2="560" />
      <line x1="350" y1="240" x2="350" y2="560" />
      <line x1="450" y1="240" x2="450" y2="560" />
      <line x1="400" y1="180" x2="400" y2="120" />
      <circle cx="400" cy="120" r="4" fill="#D4541F" stroke="none" />
    </g>
    <line
      x1="0"
      y1="560"
      x2="800"
      y2="560"
      stroke="#0E0E0C"
      strokeWidth="1"
    />
  </svg>
);

export const ExteriorDuskSvg = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="rs2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#3D2D2A" />
        <stop offset="0.5" stopColor="#8A4A2F" />
        <stop offset="1" stopColor="#D4541F" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#rs2)" />
    <circle cx="600" cy="380" r="50" fill="#FCDFCC" opacity="0.7" />
    <g fill="#1A1A17" opacity="0.85">
      <rect x="0" y="400" width="80" height="200" />
      <rect x="80" y="380" width="60" height="220" />
      <rect x="680" y="390" width="60" height="210" />
      <rect x="740" y="370" width="60" height="230" />
    </g>
    <g stroke="#FAFAF7" strokeWidth="1" fill="#1A1A17">
      <path d="M280,560 Q330,280 400,180 Q470,280 520,560 Z" />
    </g>
    <g fill="#FCDFCC" opacity="0.85">
      <rect x="310" y="290" width="6" height="6" />
      <rect x="330" y="330" width="6" height="6" />
      <rect x="380" y="260" width="6" height="6" />
      <rect x="410" y="310" width="6" height="6" />
      <rect x="440" y="280" width="6" height="6" />
      <rect x="470" y="340" width="6" height="6" />
      <rect x="320" y="380" width="6" height="6" />
      <rect x="380" y="410" width="6" height="6" />
      <rect x="440" y="380" width="6" height="6" />
      <rect x="480" y="450" width="6" height="6" />
      <rect x="360" y="470" width="6" height="6" />
      <rect x="420" y="500" width="6" height="6" />
    </g>
    <line
      x1="0"
      y1="560"
      x2="800"
      y2="560"
      stroke="#FAFAF7"
      strokeWidth="1"
    />
  </svg>
);

export const AerialSvg = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="rs3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#E9E7DF" />
        <stop offset="1" stopColor="#A8A89C" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#rs3)" />
    <g stroke="#0E0E0C" strokeWidth="0.6" fill="#FAFAF7" opacity="0.7">
      <rect x="60" y="100" width="100" height="100" />
      <rect x="170" y="100" width="80" height="100" />
      <rect x="540" y="100" width="90" height="100" />
      <rect x="640" y="100" width="100" height="100" />
      <rect x="60" y="410" width="110" height="90" />
      <rect x="600" y="420" width="140" height="100" />
    </g>
    <g stroke="#FFFFFF" strokeWidth="32">
      <line x1="0" y1="300" x2="800" y2="310" />
      <line x1="380" y1="0" x2="400" y2="600" />
    </g>
    <g stroke="#0E0E0C" strokeWidth="1.5" fill="#D4541F" fillOpacity="0.25">
      <rect x="320" y="230" width="160" height="140" />
    </g>
    <g stroke="#0E0E0C" strokeWidth="1" fill="#FAFAF7">
      <rect x="360" y="260" width="80" height="80" />
      <line x1="360" y1="285" x2="440" y2="285" />
      <line x1="360" y1="310" x2="440" y2="310" />
      <line x1="385" y1="260" x2="385" y2="340" />
      <line x1="415" y1="260" x2="415" y2="340" />
    </g>
    <text
      x="400"
      y="395"
      textAnchor="middle"
      fontFamily="ui-monospace, monospace"
      fontSize="10"
      fill="#8A3A0F"
      letterSpacing="2"
    >
      123-4 · 1,240㎡
    </text>
  </svg>
);

export const LobbySvg = () => (
  <svg {...baseProps}>
    <defs>
      <linearGradient id="rs4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F2F1EC" />
        <stop offset="1" stopColor="#D4D0C2" />
      </linearGradient>
    </defs>
    <rect width="800" height="600" fill="url(#rs4)" />
    <g stroke="#0E0E0C" strokeWidth="1" fill="none">
      <path d="M0,560 L800,560" />
      <path d="M0,80 L800,80" />
      <path d="M0,80 L260,180 L260,500 L0,560 Z" fill="#E1DED2" />
      <path d="M800,80 L540,180 L540,500 L800,560 Z" fill="#E1DED2" />
      <path d="M260,180 L540,180" />
      <path d="M260,500 L540,500" />
      <path d="M260,500 L260,180" />
      <path d="M540,500 L540,180" />
      <path d="M310,180 L310,500" opacity="0.4" />
      <path d="M360,180 L360,500" opacity="0.4" />
      <path d="M440,180 L440,500" opacity="0.4" />
      <path d="M490,180 L490,500" opacity="0.4" />
    </g>
    <g fill="#0E0E0C">
      <rect x="340" y="380" width="120" height="120" opacity="0.85" />
    </g>
    <g fill="#FCDFCC" opacity="0.6">
      <circle cx="400" cy="230" r="3" />
      <circle cx="400" cy="260" r="3" />
      <circle cx="400" cy="290" r="3" />
    </g>
    <text
      x="400"
      y="540"
      textAnchor="middle"
      fontFamily="ui-monospace, monospace"
      fontSize="10"
      fill="#5A5A52"
      letterSpacing="3"
    >
      LOBBY · LEVEL 01
    </text>
  </svg>
);

export const SectionSvg = () => (
  <svg {...baseProps}>
    <rect width="800" height="600" fill="#FAFAF7" />
    <g stroke="#E1DED2" strokeWidth="0.5">
      <path d="M0 80 L800 80 M0 160 L800 160 M0 240 L800 240 M0 320 L800 320 M0 400 L800 400 M0 480 L800 480" />
      <path d="M80 0 L80 600 M200 0 L200 600 M320 0 L320 600 M440 0 L440 600 M560 0 L560 600 M680 0 L680 600" />
    </g>
    <g stroke="#0E0E0C" strokeWidth="1" fill="none">
      <rect x="260" y="100" width="280" height="420" />
      <line x1="260" y1="140" x2="540" y2="140" />
      <line x1="260" y1="180" x2="540" y2="180" />
      <line x1="260" y1="220" x2="540" y2="220" />
      <line x1="260" y1="260" x2="540" y2="260" />
      <line x1="260" y1="300" x2="540" y2="300" />
      <line x1="260" y1="340" x2="540" y2="340" />
      <line x1="260" y1="380" x2="540" y2="380" />
      <line x1="260" y1="420" x2="540" y2="420" />
      <line x1="260" y1="460" x2="540" y2="460" />
      <line x1="320" y1="100" x2="320" y2="520" />
      <line x1="400" y1="100" x2="400" y2="520" />
      <line x1="480" y1="100" x2="480" y2="520" />
      <rect
        x="260"
        y="460"
        width="280"
        height="60"
        fill="#0E0E0C"
        fillOpacity="0.05"
      />
    </g>
    <g
      stroke="#D4541F"
      strokeWidth="1"
      fill="none"
      strokeDasharray="3 3"
    >
      <line x1="560" y1="100" x2="600" y2="100" />
      <line x1="560" y1="520" x2="600" y2="520" />
      <line x1="595" y1="100" x2="595" y2="520" />
    </g>
    <text
      x="610"
      y="315"
      fontFamily="ui-monospace, monospace"
      fontSize="10"
      fill="#8A3A0F"
      letterSpacing="1.5"
    >
      H = 84m
    </text>
    <g
      fontFamily="ui-monospace, monospace"
      fontSize="9"
      fill="#5A5A52"
      letterSpacing="1"
    >
      <text x="245" y="144" textAnchor="end">
        18F
      </text>
      <text x="245" y="224" textAnchor="end">
        14F
      </text>
      <text x="245" y="304" textAnchor="end">
        10F
      </text>
      <text x="245" y="384" textAnchor="end">
        06F
      </text>
      <text x="245" y="464" textAnchor="end">
        02F
      </text>
    </g>
    <text
      x="400"
      y="560"
      textAnchor="middle"
      fontFamily="ui-monospace, monospace"
      fontSize="10"
      fill="#5A5A52"
      letterSpacing="3"
    >
      SECTION · EAST-WEST
    </text>
  </svg>
);
