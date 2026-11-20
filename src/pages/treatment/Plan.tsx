import { Link } from 'react-router-dom'
import { ProgressBar, Screen } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'
import { exercisesDone } from '../../utils/format'

export function Plan() {
  const { state } = useApp()
  const done = exercisesDone(state.exercises)
  const usage = Math.round((state.plan.usageHours / state.plan.usageGoalHours) * 100)
  return (
    <Screen title="Plano de reeducação" lede={`Semana ${state.plan.week} de ${state.plan.totalWeeks}. Meta diária da fisioterapeuta: ${state.physio.dailyGoalMin} minutos.`}>
      <div className="week-line" aria-label="Linha do tempo das semanas">
        {Array.from({ length: state.plan.totalWeeks }, (_, index) => {
          const week = index + 1
          const className = week < state.plan.week ? 'done' : week === state.plan.week ? 'now' : ''
          return <span key={week} className={className} title={`Semana ${week}`} />
        })}
      </div>
      <article className="card">
        <h2>Utilização</h2>
        <p>{state.usageLabel} de {state.plan.usageGoalHours} horas nesta semana.</p>
        <ProgressBar value={usage} label="Progresso de utilização" />
      </article>
      <article className="card">
        <h2>Equilíbrio</h2>
        <p>Agora {state.assessment.balance}/100. Meta: {state.plan.balanceGoal}/100.</p>
        <ProgressBar value={(state.assessment.balance / state.plan.balanceGoal) * 100} label="Progresso da meta de equilíbrio" />
      </article>
      <article className="card">
        <h2>Exercícios</h2>
        <p>{done} de {state.plan.exerciseGoal} exercícios do plano concluídos.</p>
        <ProgressBar value={(done / state.plan.exerciseGoal) * 100} label="Progresso dos exercícios" />
      </article>
      <article className="card">
        <h2>Meta ajustada</h2>
        <p>{state.plan.adjustedNote}</p>
      </article>
      <Link className="btn btn-primary" to="/exercicios">Ver exercícios</Link>
    </Screen>
  )
}
