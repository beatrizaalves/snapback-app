import { useEffect } from 'react'
import { Banner, Button, ProgressBar, Screen, SimNote } from '../../components/common/ui'
import { FIRMWARE_NOTES } from '../../data/seed'
import { useApp } from '../../hooks/useApp'
import { firmwareReady } from '../../utils/rules'

export function Firmware() {
  const { state, dispatch } = useApp()
  const ready = firmwareReady(state)
  const status = state.insoles.firmwareStatus

  useEffect(() => {
    if (status !== 'updating') return
    if (state.insoles.updateProgress >= 100) {
      dispatch({ type: 'SET_FIRMWARE', status: 'success', progress: 100 })
      return
    }
    const timer = window.setTimeout(() => {
      dispatch({ type: 'SET_FIRMWARE', status: 'updating', progress: state.insoles.updateProgress + 20 })
    }, 500)
    return () => window.clearTimeout(timer)
  }, [dispatch, state.insoles.updateProgress, status])

  const checks = [
    { label: `Esquerda com ${state.insoles.left.battery}%`, ok: state.insoles.left.battery >= 30 },
    { label: `Direita com ${state.insoles.right.battery}%`, ok: state.insoles.right.battery >= 30 },
    { label: 'As duas palmilhas pareadas', ok: state.insoles.left.connected && state.insoles.right.connected },
  ]

  return (
    <Screen title="Atualização" lede={`Versão disponível ${state.insoles.firmwareAvailable}. Instalada: ${state.insoles.firmwareCurrent}.`} backTo="/palmilha">
      <ul>
        {FIRMWARE_NOTES.map((note) => <li key={note}>{note}</li>)}
      </ul>
      <div className="stack">
        {checks.map((item) => (
          <p key={item.label}>{item.ok ? 'Pronto' : 'Pendente'}: {item.label}. Mínimo de 30% em cada pé.</p>
        ))}
      </div>
      {!ready && <Banner tone="warn" title="Atualização bloqueada">Recarregue as duas palmilhas na simulação da tela anterior e mantenha o par conectado.</Banner>}
      {status === 'updating' && <ProgressBar value={state.insoles.updateProgress} label="Progresso da atualização simulada" />}
      {status === 'success' && <Banner tone="ok" title="Atualização concluída">A versão instalada agora é a {state.insoles.firmwareAvailable}. Nenhum aparelho foi gravado.</Banner>}
      {status === 'error' && (
        <Banner tone="danger" title="A atualização não terminou">
          Aproxime as palmilhas, confira se a bateria segue acima de 30% e tente de novo. Esta falha foi escolhida na demonstração.
        </Banner>
      )}
      <Button type="button" disabled={!ready || status === 'updating'} onClick={() => dispatch({ type: 'SET_FIRMWARE', status: 'updating', progress: 10 })}>
        Atualizar
      </Button>
      <Button type="button" variant="secondary" onClick={() => dispatch({ type: 'SET_FIRMWARE', status: 'error', progress: 40 })}>
        Mostrar estado de erro
      </Button>
      <SimNote>Não há um servidor de firmware. A barra só existe para apresentar o fluxo.</SimNote>
    </Screen>
  )
}
