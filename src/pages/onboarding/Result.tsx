import { Link, useLocation } from 'react-router-dom'
import { Banner, SimNote } from '../../components/common/ui'
import { PressureMap } from '../../components/charts/Maps'
import { useApp } from '../../hooks/useApp'
import { gaitLabel } from '../../utils/format'

export function Result() {
  const { state, dispatch } = useApp()
  const location = useLocation()
  const steps = (location.state as { steps?: number } | null)?.steps ?? 186

  return (
    <section className="screen">
      <Banner tone="ok" title="Avaliação concluída">Estes números são a linha de base da demonstração, não uma medição sua.</Banner>
      <h1>Sua linha de base</h1>
      <article className="card">
        <p>Tipo de pisada: {gaitLabel(state.assessment.completed ? state.assessment.gait : 'pronada')}</p>
        <p>Equilíbrio: 72/100</p>
        <p>Peso: esquerdo 55% e direito 45%</p>
        <p>Passos lidos na simulação: {steps}</p>
      </article>
      <PressureMap period="hoje" />
      <SimNote>O mapa usa o padrão pronado da persona Maria Aparecida.</SimNote>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => dispatch({ type: 'COMPLETE_ASSESSMENT', steps })}
      >
        Salvar como linha de base
      </button>
      {state.auth.onboarded && (
        <>
          <Link className="btn btn-secondary" to="/analise">Ver detalhes</Link>
          <Link className="btn btn-ghost" to="/plano">Ir para o plano</Link>
        </>
      )}
    </section>
  )
}
