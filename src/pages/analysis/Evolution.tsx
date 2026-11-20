import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BalanceChart, PainChart } from '../../components/charts/TrendCharts'
import { Banner, Screen } from '../../components/common/ui'
import { SERIES } from '../../data/series'
import { useApp } from '../../hooks/useApp'

export function Evolution() {
  const { state } = useApp()
  const [period, setPeriod] = useState<keyof typeof SERIES>('semana')
  const data = useMemo(() => {
    const base = SERIES[period].map((point) => ({ ...point }))
    const latest = state.pain[0]
    if (latest) base[base.length - 1] = { ...base[base.length - 1], pain: latest.intensity }
    base[base.length - 1] = { ...base[base.length - 1], balance: state.assessment.balance }
    return base
  }, [period, state.assessment.balance, state.pain])

  const painDrop = 7 - (state.pain[0]?.intensity ?? 4)

  return (
    <Screen title="Minha evolução" lede="A linha tracejada é a avaliação inicial. Os pontos seguintes são a demonstração da Maria." backTo="/analise">
      <div className="filters">
        {([['semana', 'Semana'], ['mes', 'Mês'], ['inicio', 'Desde o início']] as const).map(([id, label]) => (
          <button key={id} type="button" className={period === id ? 'on' : ''} onClick={() => setPeriod(id)}>{label}</button>
        ))}
      </div>
      <article className="card">
        <h2>Equilíbrio</h2>
        <BalanceChart data={data} baseline={state.assessment.baselineBalance} />
        <p>Linha de referência: {state.assessment.baselineBalance}/100. Atual: {state.assessment.balance}/100.</p>
      </article>
      <article className="card">
        <h2>Dor</h2>
        <PainChart data={data} />
      </article>
      <div className="grid-2">
        <article className="card"><strong>+{state.assessment.balance - state.assessment.baselineBalance}</strong><p>pontos de equilíbrio</p></article>
        <article className="card"><strong>{painDrop > 0 ? `−${painDrop}` : '0'}</strong><p>na dor desde o início</p></article>
      </div>
      {state.assessment.weightLeft - state.assessment.weightRight >= 10 && (
        <Banner tone="warn" title="Atenção ao apoio">A diferença entre os pés ainda passa de 10 pontos. O plano desta semana trabalha esse equilíbrio.</Banner>
      )}
      <Link className="btn btn-primary" to="/relatorio">Gerar relatório PDF</Link>
    </Screen>
  )
}
