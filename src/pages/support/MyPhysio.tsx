import { Banner, Button, Screen } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'
import { formatDateTime, intensityLabel } from '../../utils/format'

export function MyPhysio() {
  const { state, dispatch } = useApp()
  const { physio, consents } = state

  return (
    <Screen title="Meu fisioterapeuta" lede="Você aceita, recusa ou cancela o acesso quando quiser." backTo="/perfil">
      {physio.status === 'pending' && (
        <article className="card stack">
          <h2>Solicitação de vínculo</h2>
          <p>{physio.name} · {physio.specialty}</p>
          <p>{physio.clinic}</p>
          <Button type="button" onClick={() => dispatch({ type: 'SET_PHYSIO_STATUS', status: 'active' })}>Aceitar</Button>
          <Button type="button" variant="secondary" onClick={() => dispatch({ type: 'SET_PHYSIO_STATUS', status: 'revoked' })}>Recusar</Button>
        </article>
      )}
      {physio.status === 'active' && (
        <>
          <Banner tone="ok" title="Acompanhamento ativo">
            {consents.sharePhysio ? 'A clínica também pode ver os dados autorizados.' : 'A clínica não vê você enquanto o compartilhamento estiver desligado.'}
          </Banner>
          <article className="card">
            <h2>{physio.name}</h2>
            <p>{physio.specialty}</p>
            <p>{physio.clinic}</p>
            <p>Meta diária: {physio.dailyGoalMin} minutos. Intensidade máxima: {intensityLabel(physio.maxIntensity)}.</p>
          </article>
          <h2>Ajustes</h2>
          {physio.adjustments.map((item) => (
            <article key={item.id} className="card">
              <p>{formatDateTime(item.date)} · {item.author}</p>
              <p>{item.note}</p>
            </article>
          ))}
          <Button type="button" variant="danger" onClick={() => dispatch({ type: 'SET_PHYSIO_STATUS', status: 'revoked' })}>Cancelar acesso</Button>
        </>
      )}
      {(physio.status === 'revoked' || physio.status === 'none') && (
        <article className="card stack">
          <p>{physio.status === 'revoked' ? 'O acesso foi revogado.' : 'Nenhum profissional vinculado.'}</p>
          <Button type="button" onClick={() => dispatch({ type: 'SET_PHYSIO_STATUS', status: 'pending' })}>Pedir acompanhamento</Button>
        </article>
      )}
      {physio.status === 'active' && (
        <button type="button" className="text-link" onClick={() => dispatch({ type: 'SET_PHYSIO_STATUS', status: 'pending' })}>
          Simular uma nova solicitação
        </button>
      )}
    </Screen>
  )
}
