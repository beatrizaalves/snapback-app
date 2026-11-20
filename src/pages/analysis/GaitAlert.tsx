import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Banner, Button, Screen } from '../../components/common/ui'
import { Switch } from '../../components/forms/Switch'
import { Modal } from '../../components/modals/Modal'
import { useApp } from '../../hooks/useApp'
import { gaitAlertBlocked, minutesUntilGaitAlert } from '../../utils/rules'

export function GaitAlert() {
  const { state, dispatch } = useApp()
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState(false)
  const blocked = gaitAlertBlocked(state)

  function show() {
    if (blocked) return
    if (state.a11y.vibrationAlerts && navigator.vibrate) navigator.vibrate([80, 40, 80])
    setNotice(state.a11y.notificationAlerts)
    setOpen(true)
    dispatch({ type: 'MARK_GAIT_ALERT' })
  }

  return (
    <Screen title="Alerta de pisada" lede="O aviso aparece quando o peso fica tempo demais de um lado." backTo="/inicio">
      {notice && <Banner tone="warn" title="Notificação simulada">Peso mais forte no pé esquerdo. Abra o SnapBack para ver a postura.</Banner>}
      <article className="card">
        <h2>Distribuição deste momento</h2>
        <p>Esquerdo {state.assessment.weightLeft}% e direito {state.assessment.weightRight}%.</p>
        <p>Postura sugerida: joelhos para a frente e peso dividido entre os dois pés.</p>
      </article>
      <Switch
        label="No máximo um alerta a cada 30 minutos"
        checked={state.alertLimit30}
        onChange={(value) => dispatch({ type: 'SET_ALERT_LIMIT', value })}
      />
      {blocked && <p>Próximo alerta liberado em cerca de {minutesUntilGaitAlert(state)} minutos.</p>}
      <Button type="button" disabled={blocked} onClick={show}>Mostrar alerta simulado</Button>
      <Link className="text-link" to="/configuracoes">Ajustar vibração e notificação</Link>
      <Modal open={open} title="Apoio desigual" onClose={() => setOpen(false)}>
        <p>O peso está mais no pé esquerdo. Alongue o corpo e divida o apoio.</p>
        <p>Ilustração: tronco ereto, pés paralelos, joelhos alinhados com a ponta dos pés.</p>
        <Button type="button" onClick={() => setOpen(false)}>Entendi</Button>
      </Modal>
    </Screen>
  )
}
