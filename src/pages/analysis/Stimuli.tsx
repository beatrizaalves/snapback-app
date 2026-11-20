import { Pause } from 'lucide-react'
import { Banner, Button, Screen, SimNote } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'
import { intensityLabel } from '../../utils/format'

const LEVELS = [
  { value: 0, label: 'Desligado' },
  { value: 1, label: 'Leve' },
  { value: 2, label: 'Médio' },
  { value: 3, label: 'Forte' },
] as const

export function Stimuli() {
  const { state, dispatch } = useApp()
  const max = state.physio.maxIntensity
  return (
    <Screen title="Estímulos" lede="A vibração lembra a postura. O nível Forte só abre se a fisioterapeuta autorizar." backTo="/inicio">
      <Button
        type="button"
        variant="danger"
        icon={<Pause aria-hidden="true" />}
        onClick={() => dispatch({ type: 'SET_STIMULI', paused: true, intensity: 0 })}
      >
        Pausar agora
      </Button>
      {state.stimuli.paused && <Banner tone="warn" title="Estímulos pausados">Escolha um nível para ligar de novo, dentro do limite autorizado.</Banner>}
      <div className="stack">
        {LEVELS.map((level) => {
          const blocked = level.value > max
          const selected = state.stimuli.intensity === level.value && !state.stimuli.paused
          return (
            <button
              key={level.label}
              type="button"
              className={`choice ${selected ? 'on' : ''}`}
              disabled={blocked}
              onClick={() => dispatch({ type: 'SET_STIMULI', intensity: level.value, paused: false })}
            >
              {level.label}{blocked ? ' — bloqueado' : ''}{selected ? ' — em uso' : ''}
            </button>
          )
        })}
      </div>
      <article className="card">
        <p>Limite do fisioterapeuta: {intensityLabel(max)}.</p>
        <p>O sistema não passa de Forte.</p>
        <p>Tempo de estímulos hoje: {state.stimuli.minutesUsed} minutos.</p>
      </article>
      <Banner tone="warn" title="Segurança">Pare se a vibração incomodar ou se a pele ficar sensível. Não aumente o nível por conta própria.</Banner>
      <SimNote>A palmilha não vibra de verdade. A escolha fica salva neste navegador.</SimNote>
    </Screen>
  )
}
