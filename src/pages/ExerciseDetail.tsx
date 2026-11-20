import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Pause, Play } from 'lucide-react'
import { Banner, Button, Screen, SimNote } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'

export function ExerciseDetail() {
  const { id } = useParams()
  const { state, dispatch } = useApp()
  const exercise = state.exercises.find((item) => item.id === id)
  const [playing, setPlaying] = useState(false)
  const [step, setStep] = useState(0)
  const [captions, setCaptions] = useState(true)

  useEffect(() => {
    if (!playing || !exercise) return
    const timer = window.setTimeout(() => setStep((value) => (value + 1) % exercise.steps.length), 2500)
    return () => window.clearTimeout(timer)
  }, [exercise, playing, step])

  if (!exercise) {
    return (
      <Screen title="Exercício" backTo="/exercicios">
        <p>Este exercício não está na lista.</p>
      </Screen>
    )
  }

  const progress = ((step + 1) / exercise.steps.length) * 100

  return (
    <Screen title={exercise.title} lede={`${exercise.durationMin} minutos · ${exercise.difficulty}`} backTo="/exercicios">
      <div className="player">
        <h2>Demonstração do movimento</h2>
        <svg viewBox="0 0 280 120" aria-hidden="true">
          <rect width="280" height="120" rx="16" fill="#1F6AB4" />
          <circle cx={70 + step * 30} cy="58" r="16" fill="#FFFCF6" />
          <path d={`M${60 + step * 30} 78 L${90 + step * 20} 108`} stroke="#37A7D0" strokeWidth="6" />
        </svg>
        <div className="progress" aria-label="Andamento da demonstração"><b style={{ width: `${progress}%` }} /></div>
        {captions && <p>Legenda: {exercise.steps[step]}</p>}
        <div className="grid-2">
          <button type="button" className="btn btn-secondary" onClick={() => setPlaying((value) => !value)}>
            {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            {playing ? 'Pausar' : 'Reproduzir'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setCaptions((value) => !value)}>
            {captions ? 'Ocultar legendas' : 'Mostrar legendas'}
          </button>
        </div>
      </div>
      <SimNote>Não há um arquivo de vídeo. A figura e os passos substituem o player para a demonstração.</SimNote>
      <ol>
        {exercise.steps.map((item) => <li key={item}>{item}</li>)}
      </ol>
      <Banner tone="warn" title="Segurança">{exercise.safety}</Banner>
      <Button type="button" onClick={() => dispatch({ type: 'TOGGLE_EXERCISE', id: exercise.id })}>
        {exercise.done ? 'Desmarcar conclusão' : 'Marcar como feito'}
      </Button>
      <Link className="text-link" to="/conquistas">Ver conquistas</Link>
    </Screen>
  )
}
