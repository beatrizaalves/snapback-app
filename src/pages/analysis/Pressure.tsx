import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PressureMap } from '../../components/charts/Maps'
import { Screen, SimNote } from '../../components/common/ui'

const FILTERS = [
  { id: 'hoje', label: 'Hoje' },
  { id: '7', label: '7 dias' },
  { id: '30', label: '30 dias' },
] as const

export function Pressure() {
  const [period, setPeriod] = useState<(typeof FILTERS)[number]['id']>('hoje')
  return (
    <Screen title="Mapa de pressão" lede="Toque em uma mancha para ler a região. A cor sozinha não é o aviso.">
      <div className="filters" role="group" aria-label="Período">
        {FILTERS.map((item) => (
          <button key={item.id} type="button" className={period === item.id ? 'on' : ''} onClick={() => setPeriod(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <PressureMap period={period} />
      <article className="card">
        <h2>Como ler</h2>
        <p>O lado esquerdo apoia mais, sobretudo no arco e no antepé. Isso combina com a pisada pronada da avaliação.</p>
      </article>
      <SimNote>Mapa fixo de demonstração. Não muda com o seu passo real.</SimNote>
      <Link className="btn btn-secondary" to="/analise/pisada">Ver meu tipo de pisada</Link>
      <Link className="text-link" to="/evolucao">Abrir minha evolução</Link>
    </Screen>
  )
}
