export default function Logo({ size = 42 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="Ons logo"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="onsG" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#6D4AFF" />
          <stop offset="100%" stopColor="#9F6CFF" />
        </linearGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#6D4AFF" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Soft orb background */}
      <circle cx="100" cy="100" r="82" fill="rgba(109,74,255,0.10)" />
      <circle cx="86" cy="78" r="58" fill="rgba(159,108,255,0.12)" />

      {/* Crescent (part of the "أ" identity) */}
      <path
        d="M132 30
           A70 70 0 1 0 132 170
           A54 54 0 1 1 132 30"
        fill="url(#onsG)"
        filter="url(#soft)"
      />

      {/* Alef */}
      <text
        x="92"
        y="132"
        fontSize="120"
        fontWeight="700"
        fill="#111827"
        textAnchor="middle"
        fontFamily="inherit"
      >
        أ
      </text>

      {/* Star (hamza accent) */}
      <path
        d="M92 26
           l4 8 9 1-7 6 2 9-8-4-8 4 2-9-7-6 9-1z"
        fill="#FBBF24"
      />
    </svg>
  );
}
