import { Button, Chip, Screen } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'
import { mariaShared } from '../../utils/rules'

export function PhysioAlerts() {
  const { state, dispatch } = useApp()
  const alerts = state.careAlerts.filter((alert) => alert.patientId !== 'maria' || mariaShared(state) || state.physio.status === 'active')
  const visible = alerts.filter((alert) => {
    if (alert.patientId !== 'maria') return true
    return state.consents.sharePhysio && state.physio.status === 'active'
  })

  return (
    <Screen title="Alertas" lede="Somente pacientes que autorizaram o compartilhamento.">
      {visible.length === 0 && <p>Nenhum alerta disponível com as permissões atuais.</p>}
      {visible.map((alert) => (
        <article key={alert.id} className="card stack">
          <div className="between">
            <h2>{alert.title}</h2>
            <Chip tone={alert.read ? 'ok' : 'warn'}>{alert.read ? 'Lido' : 'Novo'}</Chip>
          </div>
          <p>{alert.patientName}</p>
          <p>{alert.detail}</p>
          <p>{alert.time}</p>
          {!alert.read && <Button type="button" variant="secondary" onClick={() => dispatch({ type: 'READ_ALERT', id: alert.id })}>Marcar como lido</Button>}
        </article>
      ))}
    </Screen>
  )
}
