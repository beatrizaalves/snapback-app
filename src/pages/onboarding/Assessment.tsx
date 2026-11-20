import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { WalkIllustration } from '../../components/brand/Logo'
import { Banner, Button, Screen, SimNote } from '../../components/common/ui'
import { formatClock } from '../../utils/format'

const TOTAL = 120

export function Assessment() {
  const navigate = useNavigate()
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running || elapsed >= TOTAL) return
    const timer = window.setTimeout(() => setElapsed((value) => value + 1), 1000)
    return () => window.clearTimeout(timer)
  }, [elapsed, running])

  const steps = 40 + elapsed
  const quality = elapsed > 10 ? 'Sinal bom' : 'Aguardando passos'

  return (
    <Screen title="Avaliação inicial" lede="Etapa 2 de 3. Caminhe em linha reta por dois minutos, em um lugar seguro.">
      <WalkIllustration />
      <p className="metric-value" aria-live="polite">{formatClock(TOTAL - elapsed)}</p>
      <div className="grid-2">
        <article className="card"><span>Passos</span><strong className="metric-value">{steps}</strong></article>
        <article className="card"><span>Sinal</span><strong>{quality}</strong></article>
      </div>
      <Banner tone="warn" title="Segurança">Use um corredor livre. Pare se sentir tontura ou dor forte.</Banner>
      <SimNote>Os passos sobem em um relógio local. Não há sensor lendo o seu movimento.</SimNote>
      <Button type="button" variant="secondary" onClick={() => setRunning((value) => !value)}>
        {running ? 'Pausar' : 'Continuar'}
      </Button>
      <Button type="button" onClick={() => navigate('/avaliacao/resultado', { state: { steps } })}>
        {elapsed >= TOTAL ? 'Ver resultado' : 'Encerrar com dados simulados'}
      </Button>
    </Screen>
  )
}
