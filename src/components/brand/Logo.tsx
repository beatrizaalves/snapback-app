export function Logo({ light = false }: { light?: boolean }) {
  const color = light ? '#FFFCF6' : '#596AB6'
  return (
    <div className="stack" style={{ justifyItems: 'center', gap: 8 }}>
      <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
        <path d="M36 12c12-4 24 2 26 14 6 2 10 12 8 20-4 16-8 22-16 30-12 8-22 2-24-10-2-8 4-12 4-20 0-8-8-14-6-22 2-8 4-10 8-12z" fill="#DEE6F4" stroke="#1F6AB4" strokeWidth="2" />
        <circle cx="48" cy="30" r="3.5" fill="#37A7D0" />
        <circle cx="46" cy="44" r="3.5" fill="#596AB6" />
        <circle cx="50" cy="58" r="3.5" fill="#37A7D0" />
        <path d="M72 26c5 5 5 11 0 16" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <path d="M78 20c8 7 8 18 0 26" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>
      <strong className="brand" style={{ color, fontSize: '2rem' }}>SNAPBACK</strong>
    </div>
  )
}

export function ShoeIllustration() {
  return (
    <svg viewBox="0 0 320 160" role="img" aria-label="Palmilha PalmAlign dentro de um tênis">
      <path d="M30 110c40-10 70-40 110-40 50 0 80 16 140 16 18 0 20 18 8 24H40c-16 0-22-14-10-20z" fill="#596AB6" />
      <path d="M70 96c30-6 54-24 86-24 36 0 60 10 96 12" fill="none" stroke="#37A7D0" strokeWidth="8" strokeLinecap="round" />
      <circle cx="150" cy="78" r="4" fill="#FFFCF6" />
      <circle cx="176" cy="80" r="4" fill="#FFFCF6" />
      <circle cx="202" cy="84" r="4" fill="#FFFCF6" />
    </svg>
  )
}

export function PairIllustration() {
  return (
    <svg viewBox="0 0 280 140" role="img" aria-label="Par de palmilhas, pé esquerdo e pé direito">
      <ellipse cx="80" cy="74" rx="36" ry="58" fill="#DEE6F4" stroke="#596AB6" strokeWidth="3" />
      <ellipse cx="190" cy="74" rx="36" ry="58" fill="#DEE6F4" stroke="#1F6AB4" strokeWidth="3" />
      <circle cx="80" cy="40" r="5" fill="#37A7D0" />
      <circle cx="190" cy="40" r="5" fill="#37A7D0" />
      <text x="68" y="128" fill="#4D4F50" fontSize="16">E</text>
      <text x="178" y="128" fill="#4D4F50" fontSize="16">D</text>
    </svg>
  )
}

export function WalkIllustration() {
  return (
    <svg viewBox="0 0 220 160" role="img" aria-label="Pessoa caminhando">
      <circle cx="108" cy="28" r="16" fill="#596AB6" />
      <path d="M108 46 L108 96 L78 132 M108 96 L146 128 M108 62 L70 84 M108 62 L148 78" fill="none" stroke="#1F6AB4" strokeWidth="6" strokeLinecap="round" />
    </svg>
  )
}
