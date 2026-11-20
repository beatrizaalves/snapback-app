import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { BalanceChart, PainChart } from '../../components/charts/TrendCharts'
import { Banner, Button, Screen, Stepper } from '../../components/common/ui'
import { TextArea } from '../../components/forms/Field'
import { SERIES } from '../../data/series'
import { SYSTEM_MAX_INTENSITY } from '../../data/seed'
import { useApp } from '../../hooks/useApp'
import { formatDateTime, gaitLabel, intensityLabel } from '../../utils/format'
import { physioCanEdit } from '../../utils/rules'
import type { MaxIntensity } from '../../types'

export function PhysioPatient() {
  const { id } = useParams()
  const { state, dispatch } = useApp()
  const patient = state.clinicPatients.find((item) => item.id === id)
  const isMaria = id === 'maria'
  const canEdit = isMaria && physioCanEdit(state)
  const [minutes, setMinutes] = useState(state.physio.dailyGoalMin)
  const [maxIntensity, setMax] = useState<MaxIntensity>(state.physio.maxIntensity)
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState('')

  if (!patient) return <Screen title="Paciente" backTo="/profissional"><p>Paciente não encontrado.</p></Screen>

  const hidden = isMaria && !canEdit

  return (
    <Screen title={patient.name} lede={`${patient.age} anos · ${patient.professional}`} backTo="/profissional">
      {hidden && <Banner tone="warn" title="Sem permissão de edição">O vínculo não está ativo ou a paciente não autorizou o compartilhamento.</Banner>}
      <article className="card">
        <p>Tipo de pisada: {gaitLabel(isMaria ? state.assessment.gait : patient.gait)}</p>
        {isMaria && <p>Equilíbrio atual: {state.assessment.balance}/100. Dor recente: {state.pain[0]?.intensity ?? '—'}/10.</p>}
      </article>
      {isMaria && !hidden && (
        <>
          <article className="card">
            <h2>Equilíbrio</h2>
            <BalanceChart data={SERIES.mes} baseline={state.assessment.baselineBalance} />
          </article>
          <article className="card">
            <h2>Dor</h2>
            <PainChart data={SERIES.mes.map((point, index) => index === SERIES.mes.length - 1 && state.pain[0] ? { ...point, pain: state.pain[0].intensity } : point)} />
          </article>
          <Stepper label="Meta diária de utilização" value={minutes} unit="min" min={20} max={180} step={10} onChange={setMinutes} />
          <div className="stack">
            <p>Intensidade máxima. O sistema não passa de {intensityLabel(SYSTEM_MAX_INTENSITY)}.</p>
            <div className="filters">
              {([1, 2, 3] as const).map((level) => (
                <button key={level} type="button" className={maxIntensity === level ? 'on' : ''} onClick={() => setMax(level)}>
                  {intensityLabel(level)}
                </button>
              ))}
            </div>
          </div>
          <TextArea label="Nota do ajuste" value={note} onChange={(event) => setNote(event.target.value)} />
          {saved && <Banner tone="ok" title={saved} />}
          <Button
            type="button"
            onClick={() => {
              dispatch({ type: 'SAVE_ADJUSTMENT', dailyGoalMin: minutes, maxIntensity, note })
              setSaved('Alterações salvas para a paciente.')
            }}
          >
            Salvar alterações
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              dispatch({ type: 'NOTIFY_PATIENT', message: note || `Nova meta diária: ${minutes} minutos. Intensidade máxima: ${intensityLabel(maxIntensity)}.` })
              setSaved('Aviso registrado. A Maria vê o recado no início.')
            }}
          >
            Avisar paciente
          </Button>
          <h2>Histórico de ajustes</h2>
          {state.physio.adjustments.map((item) => (
            <article key={item.id} className="card">
              <p>{formatDateTime(item.date)} · {item.author}</p>
              <p>{item.dailyGoalMin} min · {intensityLabel(item.maxIntensity)}</p>
              <p>{item.note}</p>
            </article>
          ))}
        </>
      )}
    </Screen>
  )
}
