/**
 * Step 1 의 약식 SVG 지도 — 카카오맵 도입 전 placeholder.
 */
export const MapMockSvg = () => (
  <svg
    viewBox="0 0 800 480"
    preserveAspectRatio="xMidYMid slice"
    className="absolute inset-0 h-full w-full"
  >
    <defs>
      <pattern id="mp" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M40 0 L0 0 0 40"
          fill="none"
          stroke="rgba(14,14,12,.05)"
          strokeWidth="0.6"
        />
      </pattern>
    </defs>
    <rect width="800" height="480" fill="#F2F1EC" />
    <rect width="800" height="480" fill="url(#mp)" />

    {/* roads */}
    <g stroke="#FFFFFF" strokeWidth="22" fill="none">
      <line x1="0" y1="200" x2="800" y2="220" />
      <line x1="380" y1="0" x2="400" y2="480" />
    </g>
    <g
      stroke="#E1DED2"
      strokeWidth="22"
      fill="none"
      strokeDasharray="14 14"
    >
      <line x1="0" y1="200" x2="800" y2="220" />
      <line x1="380" y1="0" x2="400" y2="480" />
    </g>
    <text
      x="200"
      y="194"
      fontFamily="ui-monospace, monospace"
      fontSize="9"
      fill="#9D9D95"
      letterSpacing="2"
    >
      테헤란로
    </text>
    <text
      x="408"
      y="80"
      fontFamily="ui-monospace, monospace"
      fontSize="9"
      fill="#9D9D95"
      letterSpacing="2"
    >
      강남대로
    </text>

    {/* lots */}
    <g stroke="#9D9D95" strokeWidth="0.7" fill="#FAFAF7">
      <rect x="60" y="60" width="120" height="120" />
      <rect x="190" y="60" width="100" height="120" />
      <rect x="60" y="240" width="80" height="80" />
      <rect x="150" y="240" width="100" height="80" />
      <rect x="60" y="330" width="190" height="120" />
      <rect x="430" y="60" width="160" height="120" />
      <rect x="600" y="60" width="180" height="120" />
      <rect x="430" y="240" width="120" height="100" />
      <rect x="560" y="240" width="100" height="100" />
      <rect x="670" y="240" width="110" height="100" />
      <rect x="430" y="350" width="200" height="100" />
      <rect x="640" y="350" width="140" height="100" />
    </g>

    {/* selected lot */}
    <rect
      x="430"
      y="240"
      width="120"
      height="100"
      fill="rgba(212,84,31,.18)"
      stroke="#D4541F"
      strokeWidth="1.6"
    />
    <text
      x="490"
      y="294"
      textAnchor="middle"
      fontFamily="ui-monospace, monospace"
      fontSize="10"
      fill="#8A3A0F"
      letterSpacing="1.5"
    >
      123-4
    </text>

    {/* pin */}
    <g transform="translate(490, 270)">
      <circle r="22" fill="rgba(212,84,31,.18)">
        <animate
          attributeName="r"
          values="20;28;20"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle r="12" fill="rgba(212,84,31,.5)" />
      <circle r="5" fill="#D4541F" />
    </g>

    {/* landmarks */}
    <text
      x="120"
      y="120"
      textAnchor="middle"
      fontFamily="serif"
      fontStyle="italic"
      fontSize="11"
      fill="#5A5A52"
    >
      강남파이낸스센터
    </text>
    <text
      x="690"
      y="120"
      textAnchor="middle"
      fontFamily="serif"
      fontStyle="italic"
      fontSize="11"
      fill="#5A5A52"
    >
      한국지능정보사회진흥원
    </text>

    {/* compass */}
    <g
      transform="translate(750, 60)"
      fontFamily="ui-monospace, monospace"
    >
      <circle r="18" fill="#FFFFFF" stroke="#9D9D95" strokeWidth="0.7" />
      <path d="M0,-12 L4,4 L0,0 L-4,4 Z" fill="#D4541F" />
      <text y="-22" textAnchor="middle" fontSize="9" fill="#0E0E0C">
        N
      </text>
    </g>

    {/* scale */}
    <g
      transform="translate(640, 440)"
      fontFamily="ui-monospace, monospace"
      fontSize="9"
      fill="#5A5A52"
    >
      <line x1="0" y1="0" x2="100" y2="0" stroke="#0E0E0C" strokeWidth="1" />
      <line x1="0" y1="-3" x2="0" y2="3" stroke="#0E0E0C" strokeWidth="1" />
      <line x1="50" y1="-3" x2="50" y2="3" stroke="#0E0E0C" strokeWidth="1" />
      <line x1="100" y1="-3" x2="100" y2="3" stroke="#0E0E0C" strokeWidth="1" />
      <text x="50" y="-8" textAnchor="middle" letterSpacing="1">
        50m
      </text>
    </g>
  </svg>
);
