import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Chip, Screen, SimNote } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'

type FootStatus = 'conectando' | 'conectado' | 'falha'

export function Scanning() {
  const navigate = useNavigate()
  const { dispatch } = useApp()
  const [left, setLeft] = useState<FootStatus>('conectando')
  const [right, setRight] = useState<FootStatus>('conectando')
  const [failNext, setFailNext] = useState(false)
  const [run, setRun] = useState(0)

  useEffect(() => {
    setLeft('conectando')
    setRight('conectando')
    const a = window.setTimeout(() => setLeft(failNext ? 'falha' : 'conectado'), 900)
    const b = window.setTimeout(() => setRight(failNext ? 'falha' : 'conectado'), 1600)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
    }
  }, [failNext, run])

  const ready = left === 'conectado' && right === 'conectado'

  return (
    <Screen title="Buscando palmilhas" lede="Passo 2 de 3. Cada pé aparece com o próprio status.">
      <div className={`card ${left === 'conectando' ? 'pulse' : ''}`}>
        <div className="between">
          <strong>Pé esquerdo</strong>
          <Chip tone={left === 'falha' ? 'danger' : 'ok'}>{left}</Chip>
        </div>
      </div>
      <div className={`card ${right === 'conectando' ? 'pulse' : ''}`}>
        <div className="between">
          <strong>Pé direito</strong>
          <Chip tone={right === 'falha' ? 'danger' : 'ok'}>{right}</Chip>
        </div>
      </div>
      {(left === 'falha' || right === 'falha') && (
        <div className="card">
          <h2>Se não conectar</h2>
          <p>Confira a carga, aproxime o par e tente de novo. Nenhum rádio Bluetooth foi aberto.</p>
        </div>
      )}
      <SimNote>Simulação de pareamento. Não existe uma palmilha conectada a este navegador.</SimNote>
      <Button
        type="button"
        disabled={!ready}
        onClick={() => {
          dispatch({ type: 'CONNECT_INSOLES' })
          navigate('/perfil-inicial')
        }}
      >
        Continuar
      </Button>
      <Button type="button" variant="secondary" onClick={() => setRun((value) => value + 1)}>Tentar novamente</Button>
      <button type="button" className="text-link" onClick={() => { setFailNext((value) => !value); setRun((value) => value + 1) }}>
        {failNext ? 'Próxima busca com sucesso' : 'Simular falha na próxima busca'}
      </button>
    </Screen>
  )
}
