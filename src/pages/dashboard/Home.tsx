import { Link } from 'react-router-dom'
import { RefreshCw, Zap } from 'lucide-react'
import { Banner, ProgressBar } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'
import { familyAlertsOn } from '../../utils/rules'
import { firstName, formatDateTime, formatToday } from '../../utils/format'

export function Home() {
  const { state, dispatch } = useApp()
  const goal = Math.round((state.plan.usageHours / state.plan.usageGoalHours) * 100)
  const sync = state.insoles.left.lastSync

  return (
    <section className="screen home-screen">
      <div className="between">
        <div>
          <h1>Olá, {firstName(state.profile.name)}</h1>
          <p className="lede">{formatToday()}</p>
        </div>
        <button type="button" className="chip" onClick={() => dispatch({ type: 'SYNC_INSOLES' })}>
          <RefreshCw aria-hidden="true" size={18} /> Sincronizar
        </button>
      </div>
      <p>Última sincronização simulada: {sync ? formatDateTime(sync) : 'ainda não feita'}.</p>
      {state.patientNotice && (
        <Banner tone="info" title="Recado da fisioterapeuta">
          {state.patientNotice}
          <button type="button" className="text-link" onClick={() => dispatch({ type: 'CLEAR_NOTICE' })}>Marcar como lido</button>
        </Banner>
      )}
      {state.insoles.right.battery < 30 && (
        <Banner tone="warn" title="Bateria da palmilha direita">
          Está em {state.insoles.right.battery}%. <Link to="/palmilha">Ver palmilha</Link>
        </Banner>
      )}
      {familyAlertsOn(state) && !state.fallResolved && (
        <Banner tone="danger" title="Simulação de queda disponível">
          <Link to="/alerta-queda">Abrir a tela que o familiar veria</Link>
        </Banner>
      )}
      <div className="grid-2">
        <article className="card stack"><span>Tempo de uso</span><strong className="metric-value">{state.usageLabel}</strong></article>
        <article className="card stack"><span>Passos</span><strong className="metric-value">{state.stepsToday.toLocaleString('pt-BR')}</strong></article>
        <article className="card stack"><span>Equilíbrio</span><strong className="metric-value">{state.assessment.balance}/100</strong></article>
        <article className="card stack">
          <span>Distribuição</span>
          <strong>E {state.assessment.weightLeft}% / D {state.assessment.weightRight}%</strong>
        </article>
      </div>
      <article className="card">
        <div className="between">
          <h2>Meta da semana</h2>
          <span>{state.usageLabel} de {state.plan.usageGoalHours}h</span>
        </div>
        <ProgressBar value={goal} label="Progresso da meta semanal de utilização" />
      </article>
      <Link className="fab" to="/estimulos">
        <Zap aria-hidden="true" /> Estímulos
      </Link>
    </section>
  )
}
