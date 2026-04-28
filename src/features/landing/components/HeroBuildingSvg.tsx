export const HeroBuildingSvg = () => (
  <svg
    viewBox="0 0 600 700"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
    className="draw block h-full w-full"
  >
    <defs>
      <pattern id="bp" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0 L0 0 0 40" fill="none" stroke="rgba(14,14,12,.04)" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="600" height="700" fill="#FAFAF7" />
    <rect width="600" height="700" fill="url(#bp)" />

    {/* Lot footprint */}
    <g className="fade-in">
      <path
        d="M180,580 L420,580 L440,640 L160,640 Z"
        fill="rgba(212,84,31,.06)"
        stroke="#D4541F"
        strokeWidth="1.2"
        strokeDasharray="4 3"
        className="d2 outline"
      />
      <text x="300" y="660" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="#5A5A52" letterSpacing="2">
        LOT · 1,240㎡
      </text>
    </g>

    {/* Tower */}
    <g stroke="#0E0E0C" strokeWidth="1.2" fill="none">
      <path className="d2" d="M225,580 L225,160 L375,160 L375,580" />
      <line className="d2" x1="225" y1="180" x2="375" y2="180" />
      <line className="d2" x1="225" y1="208" x2="375" y2="208" />
      <line className="d3" x1="225" y1="236" x2="375" y2="236" />
      <line className="d3" x1="225" y1="264" x2="375" y2="264" />
      <line className="d3" x1="225" y1="292" x2="375" y2="292" />
      <line className="d3" x1="225" y1="320" x2="375" y2="320" />
      <line className="d3" x1="225" y1="348" x2="375" y2="348" />
      <line className="d4" x1="225" y1="376" x2="375" y2="376" />
      <line className="d4" x1="225" y1="404" x2="375" y2="404" />
      <line className="d4" x1="225" y1="432" x2="375" y2="432" />
      <line className="d4" x1="225" y1="460" x2="375" y2="460" />
      <line className="d4" x1="225" y1="488" x2="375" y2="488" />
      <line className="d4" x1="225" y1="516" x2="375" y2="516" />
      <line className="d4" x1="225" y1="544" x2="375" y2="544" />
      <line className="d2" x1="262" y1="160" x2="262" y2="580" />
      <line className="d2" x1="300" y1="160" x2="300" y2="580" />
      <line className="d2" x1="338" y1="160" x2="338" y2="580" />
      <path className="d2" d="M225,160 L300,120 L375,160" />
      <line className="d2" x1="300" y1="120" x2="300" y2="80" />
      <circle cx="300" cy="80" r="3" fill="#D4541F" stroke="none" />
    </g>

    {/* Side annexes */}
    <g stroke="#0E0E0C" strokeWidth="1" fill="none">
      <path className="d4" d="M180,580 L180,420 L225,420" />
      <path className="d4" d="M375,420 L420,420 L420,580" />
      <line className="d4" x1="180" y1="500" x2="225" y2="500" />
      <line className="d4" x1="375" y1="500" x2="420" y2="500" />
    </g>

    <line className="d2" x1="80" y1="580" x2="520" y2="580" stroke="#0E0E0C" strokeWidth="1.2" />

    {/* Ground hatching */}
    <g stroke="#0E0E0C" strokeWidth="0.4" opacity="0.4">
      {[80, 100, 120, 140, 160, 440, 460, 480, 500, 520].map((x) => (
        <line key={x} className="d4" x1={x} y1="580" x2={x - 6} y2="588" />
      ))}
    </g>

    {/* Trees */}
    <g className="fade-in f3" stroke="#0E0E0C" strokeWidth="0.8" fill="none">
      <circle cx="110" cy="560" r="14" />
      <line x1="110" y1="574" x2="110" y2="580" />
      <circle cx="490" cy="560" r="14" />
      <line x1="490" y1="574" x2="490" y2="580" />
    </g>

    {/* Dimensions */}
    <g className="fade-in f2" stroke="#D4541F" strokeWidth="0.7" fill="none">
      <line x1="225" y1="640" x2="375" y2="640" strokeDasharray="2 2" />
      <line x1="225" y1="635" x2="225" y2="645" />
      <line x1="375" y1="635" x2="375" y2="645" />
      <line x1="430" y1="160" x2="430" y2="580" strokeDasharray="2 2" />
      <line x1="425" y1="160" x2="435" y2="160" />
      <line x1="425" y1="580" x2="435" y2="580" />
    </g>
    <g className="fade-in f3" fontFamily="ui-monospace, monospace" fontSize="9" fill="#D4541F" letterSpacing="1">
      <text x="300" y="654" textAnchor="middle">28.4m</text>
      <text x="446" y="372" transform="rotate(-90, 446, 372)" textAnchor="middle">62.0m</text>
    </g>

    {/* Compass */}
    <g className="fade-in f3" transform="translate(530, 70)" fontFamily="ui-monospace, monospace">
      <circle r="22" fill="none" stroke="#0E0E0C" strokeWidth="0.8" />
      <path d="M0,-14 L4,4 L0,0 L-4,4 Z" fill="#D4541F" />
      <text y="-26" textAnchor="middle" fontSize="10" fill="#0E0E0C">N</text>
    </g>

    {/* Title block */}
    <g className="fade-in f2" fontFamily="ui-monospace, monospace" fontSize="9" fill="#5A5A52" letterSpacing="1.5">
      <text x="40" y="60">PROJECT · AURORA</text>
      <text x="40" y="74">SCALE · 1:200</text>
      <text x="40" y="88">STYLE · ICONIC</text>
    </g>
  </svg>
);
