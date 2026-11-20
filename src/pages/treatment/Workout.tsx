import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PressureMap } from '../../components/charts/Maps'
import { Button, SimNote } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'
import { formatClock, formatDistance } from '../../utils/format'
import type { Workout as WorkoutType } from '../../types'

export function Workout() {
  const navigate = useNavigate()
  const { dispatch } = useApp()
  const [mode, setMode] = useState<'caminhada' | 'corrida'>('caminhada')
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const timer = window.setTimeout(() => setSeconds((value) => value + 1), 1000)
    return () => window.clearTimeout(timer)
  }, [running, seconds])

  const speed = mode === 'caminhada' ? 4.2 : 8
  const distance = (speed * seconds) / 3600
  const cadence = (mode === 'caminhada' ? 96 : 164) + (seconds % 5)
  const contact = mode === 'caminhada' ? 280 : 210

  function finish() {
    const series = Array.from({ length: 8 }, (_, index) => ({
      label: `${index + 1}`,
      cadence: (mode === 'caminhada' ? 96 : 164) + ((index * 3) % 7) - 3,
    }))
    const workout: WorkoutType = {
      id: `wk-${Date.now()}`,
      mode,
      durationSec: seconds,
      distanceKm: distance,
      cadence,
      contactMs: contact,
      date: new Date().toISOString(),
      series,
    }
    dispatch({ type: 'SET_PENDING_WORKOUT', workout })
    navigate('/treino/resumo')
  }

  return (
    <section className="screen">
      <div className="sport">
        <p>Modo atividade</p>
        <h1>{mode === 'caminhada' ? 'Caminhada' : 'Corrida'}</h1>
        <p className="metric-value">{formatClock(seconds)}</p>
      </div>
      <div className="seg">
        <button type="button" className={mode === 'caminhada' ? 'on' : ''} onClick={() => setMode('caminhada')}>Caminhada</button>
        <button type="button" className={mode === 'corrida' ? 'on' : ''} onClick={() => setMode('corrida')}>Corrida</button>
      </div>
      <div className="grid-2">
        <article className="card"><span>Distância</span><strong>{formatDistance(distance)}</strong></article>
        <article className="card"><span>Cadência</span><strong>{cadence} ppm</strong></article>
        <article className="card"><span>Contato com o solo</span><strong>{contact} ms</strong></article>
      </div>
      <PressureMap period="hoje" />
      <SimNote>Distância e cadência são calculadas pelo cronômetro, não por GPS nem pela palmilha.</SimNote>
      <Button type="button" variant="secondary" onClick={() => setRunning((value) => !value)}>{running ? 'Pausar' : 'Começar'}</Button>
      <Button type="button" onClick={finish}>Finalizar</Button>
    </section>
  )
}
