import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Banner, Screen } from '../../components/common/ui'
import { DEMO_CODE } from '../../data/seed'
import { useApp } from '../../hooks/useApp'

export function Verify() {
  const { state } = useApp()
  const navigate = useNavigate()
  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [info, setInfo] = useState(`Código de demonstração: ${DEMO_CODE}. Nenhum SMS ou e-mail foi enviado.`)
  const refs = useRef<Array<HTMLInputElement | null>>([])

  function update(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    if (digit && refs.current[index + 1]) refs.current[index + 1]?.focus()
  }

  function submit() {
    if (digits.join('') === DEMO_CODE) navigate('/consentimento')
    else setError('Código incorreto. Use 123456 nesta simulação.')
  }

  return (
    <Screen title="Verificar conta" lede={`Enviamos um código fictício para ${state.profile.email || 'o contato informado'}.`} backTo="/cadastro">
      <Banner title="Simulação">{info}</Banner>
      <div className="grid-3" style={{ gridTemplateColumns: 'repeat(6, 1fr)' }}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(node) => { refs.current[index] = node }}
            className="choice"
            inputMode="numeric"
            aria-label={`Dígito ${index + 1}`}
            value={digit}
            onChange={(event) => update(index, event.target.value)}
          />
        ))}
      </div>
      {error && <p className="field-error">{error}</p>}
      <Button type="button" onClick={submit}>Confirmar código</Button>
      <button type="button" className="btn btn-secondary" onClick={() => setInfo('Código reenviado só na tela. Continue com 123456.')}>
        Reenviar código
      </button>
      <button type="button" className="text-link" onClick={() => navigate('/cadastro')}>Trocar e-mail</button>
    </Screen>
  )
}
