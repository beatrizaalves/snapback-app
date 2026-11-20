import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Banner, Button, Screen } from '../../components/common/ui'
import { Switch } from '../../components/forms/Switch'
import { Modal } from '../../components/modals/Modal'
import { useApp } from '../../hooks/useApp'
import { downloadUserData } from '../../services/pdf'

export function Privacy() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState('')

  return (
    <Screen title="Privacidade e meus dados" lede="Desligar uma permissão vale na hora. A análise da pisada continua obrigatória." backTo="/perfil">
      <Switch label="Análise da pisada" checked disabled hint="Obrigatória. Não pode ser desligada." onChange={() => undefined} />
      <Switch label="Compartilhar com fisioterapeuta" checked={state.consents.sharePhysio} onChange={(sharePhysio) => dispatch({ type: 'PATCH_CONSENTS', patch: { sharePhysio } })} />
      <Switch label="Avisar familiares em caso de queda" checked={state.consents.fallFamily} onChange={(fallFamily) => dispatch({ type: 'PATCH_CONSENTS', patch: { fallFamily } })} />
      <Switch label="Dados anônimos para melhorar o aplicativo" checked={state.consents.anonymousImprove} onChange={(anonymousImprove) => dispatch({ type: 'PATCH_CONSENTS', patch: { anonymousImprove } })} />
      <p>Se você revogar o compartilhamento, a clínica deixa de ver a Maria e o fisioterapeuta não altera o plano.</p>
      {done && <Banner tone="ok" title={done} />}
      <Button type="button" variant="secondary" onClick={() => { downloadUserData(state); setDone('Arquivo JSON baixado neste computador.') }}>
        Baixar meus dados
      </Button>
      <Button type="button" variant="danger" onClick={() => setOpen(true)}>Excluir conta</Button>
      <Modal open={open} title="Excluir a conta deste navegador?" onClose={() => setOpen(false)}>
        <p>Isso apaga o que está salvo no LocalStorage e volta aos dados iniciais da demonstração, sem entrar na conta.</p>
        <Button
          type="button"
          variant="danger"
          onClick={() => {
            dispatch({ type: 'DELETE_ACCOUNT' })
            setOpen(false)
            navigate('/boas-vindas')
          }}
        >
          Confirmar exclusão
        </Button>
        <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
      </Modal>
    </Screen>
  )
}
