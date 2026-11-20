import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Screen } from '../../components/common/ui'
import { Switch } from '../../components/forms/Switch'
import { Modal } from '../../components/modals/Modal'
import { useApp } from '../../hooks/useApp'

export function Consent() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const [sharePhysio, setShare] = useState(state.consents.sharePhysio)
  const [fallFamily, setFall] = useState(state.consents.fallFamily)
  const [anonymousImprove, setAnon] = useState(state.consents.anonymousImprove)
  const [open, setOpen] = useState(false)

  return (
    <Screen title="Seus dados" lede="A análise da pisada é necessária para o aplicativo funcionar. O restante é escolha sua.">
      <Switch label="Análise da pisada" checked hint="Obrigatório para mostrar equilíbrio e pressão." disabled onChange={() => undefined} />
      <Switch label="Compartilhar com fisioterapeuta" checked={sharePhysio} onChange={setShare} hint="A clínica só vê você se esta opção estiver ligada." />
      <Switch label="Avisar familiares em caso de queda" checked={fallFamily} onChange={setFall} />
      <Switch label="Ajudar a melhorar o aplicativo com dados anônimos" checked={anonymousImprove} onChange={setAnon} hint="Não identifica você. Não aparece no aplicativo de uso." />
      <button type="button" className="text-link" onClick={() => setOpen(true)}>Ler o termo completo</button>
      <Button
        type="button"
        onClick={() => {
          dispatch({ type: 'ACCEPT_CONSENTS', patch: { sharePhysio, fallFamily, anonymousImprove } })
          navigate('/parear')
        }}
      >
        Aceitar e continuar
      </Button>
      <Modal open={open} title="Termo de uso e privacidade" onClose={() => setOpen(false)}>
        <p>O SnapBack guarda, neste navegador, nome, medidas, pisada, dor, exercícios e contatos que você informar.</p>
        <p>A análise da pisada não pode ser desligada enquanto a conta existir, porque o aplicativo depende dela.</p>
        <p>Compartilhar com o fisioterapeuta e avisar a família são autorizações separadas. Você pode revogá-las em Privacidade.</p>
        <p>Este texto é uma demonstração acadêmica, não um contrato de uma empresa real.</p>
        <Button type="button" onClick={() => setOpen(false)}>Fechar termo</Button>
      </Modal>
    </Screen>
  )
}
