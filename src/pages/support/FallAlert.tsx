import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Banner, Button, Screen, SimNote } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'
import { phoneHref } from '../../utils/format'
import { familyAlertsOn } from '../../utils/rules'

export function FallAlert() {
  const { state, dispatch } = useApp()
  const [asNotice, setAsNotice] = useState(true)
  const allowed = familyAlertsOn(state)

  if (!allowed) {
    return (
      <Screen title="Alerta de queda" lede="Esta tela é a visão do familiar." backTo="/contatos">
        <Banner tone="warn" title="Aviso não enviado">A Maria não autorizou a família ou nenhum contato aceitou receber o alerta.</Banner>
      </Screen>
    )
  }

  return (
    <Screen title="Possível queda" lede="Visão simulada do familiar. Nenhuma ligação começa sozinha.">
      {asNotice && (
        <Banner tone="danger" title="Notificação">SnapBack: possível queda de Maria Aparecida agora.</Banner>
      )}
      <article className="card">
        <p>Hoje, no horário em que você abriu esta tela.</p>
        <p>Última atividade: caminhada com a palmilha, uso do dia {state.usageLabel}.</p>
        <p>{state.fallResolved ? 'Marcado como resolvido nesta demonstração.' : 'Ainda não resolvido.'}</p>
      </article>
      <a className="btn btn-primary" href={phoneHref(state.profile.phone)}>Ligar para Maria</a>
      <a className="btn btn-danger" href="tel:192">Ligar para o SAMU (192)</a>
      <Button type="button" variant="secondary" onClick={() => dispatch({ type: 'RESOLVE_FALL' })}>Marcar como resolvido</Button>
      <button type="button" className="text-link" onClick={() => setAsNotice((value) => !value)}>
        {asNotice ? 'Ocultar variante de notificação' : 'Mostrar variante de notificação'}
      </button>
      <SimNote>Os botões usam o discador do aparelho. Este navegador não completa a chamada.</SimNote>
      <Link className="text-link" to="/contatos">Voltar aos contatos</Link>
    </Screen>
  )
}
