import { useState } from 'react'
import { PRESSURE, overloadSpots, pressureColor, type Spot } from '../../data/series'

function Foot({
  title,
  spots,
  selected,
  onSelect,
}: {
  title: string
  spots: Spot[]
  selected: string | null
  onSelect: (spot: Spot) => void
}) {
  return (
    <div className="stack">
      <strong>{title}</strong>
      <svg viewBox="0 0 120 260" role="img" aria-label={title}>
        <path
          d="M60 18c22 0 34 18 32 40 12 8 16 28 8 46 10 28 4 70-18 92-28 16-48-8-40-40-12-16-10-36 2-48-2-22 4-90 16-90z"
          fill="#DEE6F4"
          stroke="#596AB6"
          strokeWidth="2"
        />
        {spots.map((spot) => (
          <circle
            key={spot.id}
            cx={spot.x}
            cy={spot.y}
            r={selected === spot.id ? spot.r + 3 : spot.r}
            fill={pressureColor(spot.level)}
            opacity={0.92}
            style={{ cursor: 'pointer' }}
            onClick={() => onSelect(spot)}
          >
            <title>{spot.label}</title>
          </circle>
        ))}
      </svg>
    </div>
  )
}

export function PressureMap({ period }: { period: 'hoje' | '7' | '30' }) {
  const data = PRESSURE[period]
  const [selected, setSelected] = useState<Spot | null>(null)
  const hot = [...overloadSpots(data.left), ...overloadSpots(data.right)]

  return (
    <div className="stack">
      <div className="foot-wrap">
        <Foot title="Pé esquerdo" spots={data.left} selected={selected?.id ?? null} onSelect={setSelected} />
        <Foot title="Pé direito" spots={data.right} selected={selected?.id ?? null} onSelect={setSelected} />
      </div>
      <div className="between">
        <span>Menos pressão</span>
        <span aria-hidden="true" style={{ display: 'flex', gap: 4 }}>
          {['#37A7D0', '#596AB6', '#A9793C', '#E4726B'].map((color) => (
            <i key={color} style={{ width: 28, height: 12, background: color, display: 'block', borderRadius: 6 }} />
          ))}
        </span>
        <span>Mais pressão</span>
      </div>
      <p>Escala: ciano, azul, atenção e alerta. A cor vem acompanhada do nome da região.</p>
      {selected && (
        <article className="card">
          <strong>{selected.label}</strong>
          <p>{selected.level >= 3 ? 'Pressão elevada nesta região.' : 'Pressão dentro do esperado para o período.'}</p>
        </article>
      )}
      {hot.length > 0 && (
        <article className="card">
          <h2>Sobrecarga</h2>
          <ul>
            {hot.map((spot) => (
              <li key={spot.id}>{spot.label}</li>
            ))}
          </ul>
        </article>
      )}
    </div>
  )
}

const FRONT = ['Pescoço', 'Ombro esquerdo', 'Ombro direito', 'Joelho esquerdo', 'Joelho direito', 'Tornozelo esquerdo', 'Tornozelo direito']
const BACK = ['Lombar', 'Quadril esquerdo', 'Quadril direito', 'Panturrilha esquerda', 'Panturrilha direita']

export function BodyMap({
  selected,
  onToggle,
}: {
  selected: string[]
  onToggle: (region: string) => void
}) {
  const [side, setSide] = useState<'frente' | 'costas'>('frente')
  const regions = side === 'frente' ? FRONT : BACK
  return (
    <div className="stack">
      <div className="seg" role="group" aria-label="Lado do corpo">
        <button type="button" className={side === 'frente' ? 'on' : ''} onClick={() => setSide('frente')}>Frente</button>
        <button type="button" className={side === 'costas' ? 'on' : ''} onClick={() => setSide('costas')}>Costas</button>
      </div>
      <svg viewBox="0 0 200 280" role="img" aria-label={`Corpo visto de ${side}`}>
        <circle cx="100" cy="28" r="18" fill="#DEE6F4" stroke="#596AB6" />
        <rect x="78" y="48" width="44" height="70" rx="16" fill="#DEE6F4" stroke="#596AB6" />
        <rect x="70" y="118" width="26" height="70" rx="10" fill="#DEE6F4" stroke="#596AB6" />
        <rect x="104" y="118" width="26" height="70" rx="10" fill="#DEE6F4" stroke="#596AB6" />
        <rect x="72" y="188" width="22" height="64" rx="10" fill="#DEE6F4" stroke="#1F6AB4" />
        <rect x="106" y="188" width="22" height="64" rx="10" fill="#DEE6F4" stroke="#1F6AB4" />
        {selected.length > 0 && <circle cx="100" cy="90" r="8" fill="#596AB6" />}
      </svg>
      <div className="body-regions">
        {regions.map((region) => {
          const on = selected.includes(region)
          return (
            <button key={region} type="button" className={`chip ${on ? 'chip-on' : ''}`} aria-pressed={on} onClick={() => onToggle(region)}>
              {region}
            </button>
          )
        })}
      </div>
    </div>
  )
}
