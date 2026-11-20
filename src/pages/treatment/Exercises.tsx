import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Chip, Screen } from '../../components/common/ui'
import type { ExerciseCategory } from '../../types'
import { useApp } from '../../hooks/useApp'

const FILTERS: { id: 'todos' | ExerciseCategory; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'equilibrio', label: 'Equilíbrio' },
  { id: 'postura', label: 'Postura' },
  { id: 'alongamento', label: 'Alongamento' },
]

export function Exercises() {
  const { state } = useApp()
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('todos')
  const list = state.exercises.filter((item) => filter === 'todos' || item.category === filter)

  return (
    <Screen title="Exercícios da semana" lede="Os marcados como plano entram na meta." backTo="/plano">
      <div className="filters">
        {FILTERS.map((item) => (
          <button key={item.id} type="button" className={filter === item.id ? 'on' : ''} onClick={() => setFilter(item.id)}>{item.label}</button>
        ))}
      </div>
      {list.map((item) => (
        <Link key={item.id} to={`/exercicios/${item.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="between">
            <h2>{item.title}</h2>
            <svg width="54" height="54" viewBox="0 0 54 54" aria-hidden="true">
              <rect width="54" height="54" rx="12" fill="#DEE6F4" />
              <circle cx="27" cy="16" r="6" fill="#596AB6" />
              <path d="M27 24 v12 M20 30 h14" stroke="#1F6AB4" strokeWidth="3" />
            </svg>
          </div>
          <p>{item.durationMin} min · {item.difficulty}</p>
          <div className="row">
            <Chip tone={item.done ? 'ok' : 'info'}>{item.done ? 'Concluído' : 'A fazer'}</Chip>
            {item.inPlan && <Chip>Do plano</Chip>}
          </div>
        </Link>
      ))}
    </Screen>
  )
}
