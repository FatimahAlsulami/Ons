export default function Logo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" role="img" aria-label="Ons logo" style={{ display:"block" }}>
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#6D4AFF" />
          <stop offset="100%" stopColor="#9F6CFF" />
        </linearGradient>
        <radialGradient id="glow" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#1f114a" floodOpacity="0.22"/>
        </filter>
      </defs>

      {/* App-icon base */}
      <rect x="18" y="18" width="164" height="164" rx="44" fill="url(#g1)" filter="url(#shadow)" />
      <rect x="18" y="18" width="164" height="164" rx="44" fill="url(#glow)" />

      {/* Soft crescent cut */}
      <path
        d="M128 52
           A58 58 0 1 0 128 148
           A44 44 0 1 1 128 52"
        fill="rgba(255,255,255,0.26)"
      />

      {/* Arabic Alef 'أ' (simple, bold, centered) */}
      <text
        x="88"
        y="132"
        fontSize="98"
        fontWeight="800"
        fill="rgba(13,16,30,0.92)"
        textAnchor="middle"
        fontFamily="inherit"
      >
        أ
      </text>

      {/* Star accent */}
      <path
        d="M128 40
           l5 10 11 1-9 7 3 11-10-6-10 6 3-11-9-7 11-1z"
        fill="#FBBF24"
      />
    </svg>
  );
}
