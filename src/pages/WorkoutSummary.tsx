import { Link } from 'react-router-dom'
import { CadenceChart } from '../../components/charts/TrendCharts'
import { Banner, Button, Screen } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'
import { formatClock, formatDateTime, formatDistance } from '../../utils/format'

export function WorkoutSummary() {
  const { state, dispatch } = useApp()
  const workout = state.pendingWorkout ?? state.workouts[0]

  if (!workout) {
    return <Screen title="Treino" backTo="/treino"><p>Nenhum treino para mostrar.</p></Screen>
  }

  return (
    <Screen title="Treino concluído" lede={state.pendingWorkout ? 'Revise e salve para entrar no histórico.' : 'Este treino já está no histórico.'} backTo="/treino">
      <article className="card stack">
        <p>Tipo: {workout.mode}</p>
        <p>Duração: {formatClock(workout.durationSec)}</p>
        <p>Distância: {formatDistance(workout.distanceKm)}</p>
        <p>Cadência média: {workout.cadence} passos por minuto</p>
        <p>Contato com o solo: {workout.contactMs} ms</p>
      </article>
      <article className="card">
        <h2>Cadência</h2>
        <CadenceChart data={workout.series} />
      </article>
      {state.pendingWorkout && (
        <Button type="button" onClick={() => dispatch({ type: 'SAVE_PENDING_WORKOUT' })}>Salvar treino</Button>
      )}
      {!state.pendingWorkout && <Banner tone="ok" title="Treino salvo">A conquista de treino considera os treinos além da demonstração inicial.</Banner>}
      <h2>Histórico</h2>
      {state.workouts.map((item) => (
        <article key={item.id} className="card">
          <strong>{item.mode}</strong>
          <p>{formatDateTime(item.date)} · {formatClock(item.durationSec)} · {formatDistance(item.distanceKm)}</p>
        </article>
      ))}
      <Link className="text-link" to="/treino">Novo treino</Link>
    </Screen>
  )
}
