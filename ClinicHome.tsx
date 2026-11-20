import { useMemo, useState } from 'react'
import { Chip } from '../../components/common/ui'
import { Field } from '../../components/forms/Field'
import { useApp } from '../../hooks/useApp'
import { evolutionLabel, gaitLabel } from '../../utils/format'
import { visibleClinicPatients } from '../../utils/rules'
import type { EvolutionStatus } from '../../types'

export function ClinicHome() {
  const { state } = useApp()
  const [filter, setFilter] = useState<'todos' | EvolutionStatus>('todos')
  const [query, setQuery] = useState('')
  const rows = useMemo(() => {
    return visibleClinicPatients(state).filter((patient) => {
      const byStatus = filter === 'todos' || patient.evolution === filter
      const byName = patient.name.toLowerCase().includes(query.toLowerCase())
      return byStatus && byName
    })
  }, [filter, query, state])

  return (
    <section className="stack">
      <h1>Pacientes da clínica</h1>
      <p>Indicadores da amostra institucional. A tabela abaixo respeita o compartilhamento de cada pessoa.</p>
      <div className="stats">
        <article className="card"><span>Vinculados</span><strong className="metric-value">48</strong></article>
        <article className="card"><span>Melhorando</span><strong className="metric-value">31</strong></article>
        <article className="card"><span>Estáveis</span><strong className="metric-value">9</strong></article>
        <article className="card"><span>Atenção</span><strong className="metric-value">8</strong></article>
      </div>
      <Field label="Buscar" value={query} onChange={(event) => setQuery(event.target.value)} />
      <div className="filters">
        {(['todos', 'melhorando', 'estavel', 'atencao'] as const).map((item) => (
          <button key={item} type="button" className={filter === item ? 'on' : ''} onClick={() => setFilter(item)}>
            {item === 'todos' ? 'Todos' : evolutionLabel(item)}
          </button>
        ))}
      </div>
      <div className="card" style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Profissional</th>
              <th>Pisada</th>
              <th>Evolução</th>
              <th>Último registro</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}, {patient.age} anos</td>
                <td>{patient.professional}</td>
                <td>{gaitLabel(patient.id === 'maria' ? state.assessment.gait : patient.gait)}</td>
                <td><Chip tone={patient.evolution === 'atencao' ? 'danger' : patient.evolution === 'melhorando' ? 'ok' : 'warn'}>{evolutionLabel(patient.evolution)}</Chip></td>
                <td>{patient.lastRecord}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p>Nenhum paciente autorizado neste filtro. Paulo Nogueira não aparece porque não compartilhou os dados.</p>}
      </div>
    </section>
  )
}
