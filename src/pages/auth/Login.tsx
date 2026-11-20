import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Delete, ScanFace, Fingerprint } from 'lucide-react'
import { Banner, Button } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'
import { firstName } from '../../utils/format'

export function Login() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const [pin, setPin] = useState('')
  const [sensor, setSensor] = useState('')
  const [info, setInfo] = useState('')
  const locked = Boolean(state.auth.lockedUntil && state.auth.lockedUntil > Date.now())

  useEffect(() => {
    if (locked) navigate('/bloqueado', { replace: true })
  }, [locked, navigate])

  function enterPatient() {
    dispatch({ type: 'PIN_OK' })
    navigate(state.auth.onboarded ? '/inicio' : '/parear')
  }

  function addDigit(digit: string) {
    if (pin.length >= 4) return
    const next = pin + digit
    setPin(next)
    if (next.length === 4) {
      if (next === state.profile.pin) enterPatient()
      else {
        dispatch({ type: 'PIN_FAIL' })
        setPin('')
        if (state.auth.pinAttempts + 1 >= 3) navigate('/bloqueado')
      }
    }
  }

  function simulateSensor(kind: 'Biometria' | 'Rosto') {
    setSensor(`${kind} em leitura simulada...`)
    window.setTimeout(() => {
      setSensor('')
      enterPatient()
    }, 900)
  }

  const remaining = Math.max(0, 3 - state.auth.pinAttempts)

  return (
    <section className="screen">
      <h1>Olá, {firstName(state.profile.name)}</h1>
      <p className="lede">Entre com o PIN de quatro números. A biometria desta tela não usa a câmera nem o sensor do aparelho.</p>
      {state.auth.pinAttempts > 0 && (
        <Banner tone="danger" title="PIN incorreto">Restam {remaining} tentativas antes do bloqueio.</Banner>
      )}
      {sensor && <Banner title={sensor}>Nenhum dado biométrico foi lido.</Banner>}
      {info && <Banner title="PIN de demonstração">{info}</Banner>}
      <div className="pin-dots" aria-label={`${pin.length} de 4 dígitos`}>
        {[0, 1, 2, 3].map((index) => <i key={index} className={index < pin.length ? 'on' : ''} />)}
      </div>
      <div className="pin-pad">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
          <button key={digit} type="button" onClick={() => addDigit(digit)}>{digit}</button>
        ))}
        <button type="button" aria-label="Biometria simulada" onClick={() => simulateSensor('Biometria')}><Fingerprint aria-hidden="true" /></button>
        <button type="button" onClick={() => addDigit('0')}>0</button>
        <button type="button" aria-label="Apagar dígito" onClick={() => setPin((value) => value.slice(0, -1))}><Delete aria-hidden="true" /></button>
      </div>
      <Button type="button" variant="secondary" icon={<ScanFace aria-hidden="true" />} onClick={() => simulateSensor('Rosto')}>
        Reconhecimento facial simulado
      </Button>
      <button
        type="button"
        className="text-link"
        onClick={() => {
          dispatch({ type: 'RESET_PIN' })
          setInfo('Instruções fictícias enviadas para o e-mail da conta. O PIN voltou a ser 1234.')
        }}
      >
        Esqueci meu PIN
      </button>
      <Button type="button" onClick={() => { dispatch({ type: 'ENTER_DEMO', role: 'patient' }); navigate('/inicio') }}>
        Abrir demonstração da Maria
      </Button>
      <Button type="button" variant="secondary" onClick={() => { dispatch({ type: 'ENTER_DEMO', role: 'physio' }); navigate('/profissional') }}>
        Entrar como fisioterapeuta
      </Button>
      <Button type="button" variant="secondary" onClick={() => { dispatch({ type: 'ENTER_DEMO', role: 'clinic' }); navigate('/clinica') }}>
        Entrar como clínica
      </Button>
    </section>
  )
}
