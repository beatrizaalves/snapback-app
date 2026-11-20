import { useState } from 'react'
import { Button } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'
import { downloadReport } from '../../services/pdf'
import { visibleClinicPatients } from '../../utils/rules'
import { evolutionLabel } from '../../utils/format'

export function Reports() {
  const { state } = useApp()
  const [period, setPeriod] = useState('30 dias')
  const rows = visibleClinicPatients(state)
  return (
    <section className="stack">
      <h1>Relatórios</h1>
      <div className="filters">
        {['7 dias', '30 dias', 'Desde o início'].map((item) => (
          <button key={item} type="button" className={period === item ? 'on' : ''} onClick={() => setPeriod(item)}>{item}</button>
        ))}
      </div>
      <article className="card">
        <p>Período {period}. Pacientes visíveis com consentimento: {rows.length}.</p>
        <ul>
          {rows.map((patient) => (
            <li key={patient.id}>{patient.name} — {evolutionLabel(patient.evolution)} — {patient.professional}</li>
          ))}
        </ul>
      </article>
      <Button type="button" onClick={() => downloadReport(state, { indicators: true, charts: true, pain: true, pressure: false })}>
        Baixar resumo PDF da Maria
      </Button>
      <p>O PDF traz a paciente da demonstração. Os totais 48, 31, 9 e 8 são indicadores da clínica, não a soma desta tabela.</p>
    </section>
  )
}
