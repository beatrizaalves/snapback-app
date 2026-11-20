import { useState } from 'react'
import { BodyMap } from '../../components/charts/Maps'
import { Banner, Button, Screen } from '../../components/common/ui'
import { TextArea } from '../../components/forms/Field'
import { useApp } from '../../hooks/useApp'
import { formatDateTime } from '../../utils/format'

export function PainLog() {
  const { state, dispatch } = useApp()
  const [intensity, setIntensity] = useState<number | null>(null)
  const [regions, setRegions] = useState<string[]>([])
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState(false)

  function toggle(region: string) {
    setRegions((current) => current.includes(region) ? current.filter((item) => item !== region) : [...current, region])
  }

  return (
    <Screen title="Registro de dor" lede="Zero é nenhuma dor. Dez é a pior dor que você já sentiu." backTo="/perfil">
      <div className="scale" role="group" aria-label="Intensidade de 0 a 10">
        {Array.from({ length: 11 }, (_, value) => (
          <button key={value} type="button" className={`choice ${intensity === value ? 'on' : ''}`} aria-pressed={intensity === value} onClick={() => setIntensity(value)}>
            {value}
          </button>
        ))}
      </div>
      {intensity !== null && <p>{intensity <= 3 ? 'Dor leve' : intensity <= 6 ? 'Dor moderada' : 'Dor forte'} — valor {intensity} de 10.</p>}
      <BodyMap selected={regions} onToggle={toggle} />
      <TextArea label="Observações" value={note} onChange={(event) => setNote(event.target.value)} />
      {saved && <Banner tone="ok" title="Registro salvo">Ele entra no histórico, no gráfico e no relatório.</Banner>}
      <Button
        type="button"
        disabled={intensity === null}
        onClick={() => {
          if (intensity === null) return
          dispatch({ type: 'ADD_PAIN', intensity, regions, note })
          setSaved(true)
          setNote('')
        }}
      >
        Salvar registro
      </Button>
      <div className="stack">
        {state.pain.map((entry) => (
          <article key={entry.id} className="card">
            <strong>{entry.intensity}/10</strong>
            <p>{formatDateTime(entry.date)}</p>
            <p>{entry.regions.join(', ') || 'Sem região marcada'}</p>
            {entry.note && <p>{entry.note}</p>}
          </article>
        ))}
      </div>
    </Screen>
  )
}
