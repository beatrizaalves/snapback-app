import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Battery, Banner, Button, Screen, SimNote } from '../../components/common/ui'
import { Modal } from '../../components/modals/Modal'
import { HELP_GUIDES } from '../../data/seed'
import { useApp } from '../../hooks/useApp'
import { formatDateTime } from '../../utils/format'

export function Insole() {
  const { state, dispatch } = useApp()
  const [buy, setBuy] = useState(false)
  const [care, setCare] = useState(false)
  const [syncNote, setSyncNote] = useState('')
  const guide = HELP_GUIDES[1]

  function sync() {
    if (!state.insoles.left.connected || !state.insoles.right.connected) {
      setSyncNote('As duas palmilhas precisam estar pareadas. A busca é simulada em Conectar.')
      return
    }
    dispatch({ type: 'SYNC_INSOLES' })
    setSyncNote('Sincronização simulada concluída neste navegador.')
  }

  return (
    <Screen title="Minha palmilha" lede="Cada pé tem a própria bateria. Os números não vêm de um aparelho ligado.">
      {(['left', 'right'] as const).map((side) => {
        const foot = state.insoles[side]
        return (
          <article key={side} className="card stack">
            <h2>{side === 'left' ? 'Pé esquerdo' : 'Pé direito'}</h2>
            <Battery value={foot.battery} label="Bateria" />
            <p>{foot.connected ? 'Pareada na simulação' : 'Desconectada na simulação'}</p>
            <p>Última sincronização: {foot.lastSync ? formatDateTime(foot.lastSync) : 'nenhuma'}</p>
          </article>
        )
      })}
      {state.insoles.right.battery < 30 && (
        <Banner tone="danger" title="Palmilha direita com bateria baixa">A atualização de software fica bloqueada abaixo de 30% nos dois pés.</Banner>
      )}
      {syncNote && <Banner tone="ok" title="Sincronização">{syncNote}</Banner>}
      <Button type="button" onClick={sync}>Sincronizar agora</Button>
      <article className="card">
        <p>Vida útil estimada: {state.insoles.lifespanMonths} meses de demonstração.</p>
        <p>Software atual: {state.insoles.firmwareCurrent}. Disponível: {state.insoles.firmwareAvailable}.</p>
      </article>
      <Link className="btn btn-secondary" to="/palmilha/atualizacao">Atualização de software</Link>
      <Button type="button" variant="secondary" onClick={() => setCare(true)}>Guia de cuidados</Button>
      <Button type="button" variant="ghost" onClick={() => setBuy(true)}>Comprar nova palmilha</Button>
      <Button type="button" variant="secondary" onClick={() => dispatch({ type: 'CHARGE_DEMO' })}>Simular carga das duas palmilhas</Button>
      <button type="button" className="btn btn-danger" onClick={() => dispatch({ type: 'DISCONNECT_INSOLES' })}>Desconectar palmilha</button>
      <SimNote>Carga, compra e Bluetooth são simulações para a apresentação.</SimNote>
      <Modal open={care} title={guide.title} onClose={() => setCare(false)}>
        <ol>{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol>
        <Button type="button" onClick={() => setCare(false)}>Fechar</Button>
      </Modal>
      <Modal open={buy} title="Compra não disponível" onClose={() => setBuy(false)}>
        <p>Nenhuma loja está conectada. Este botão não gera pedido nem pagamento.</p>
        <Button type="button" onClick={() => setBuy(false)}>Fechar</Button>
      </Modal>
    </Screen>
  )
}
