import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Screen } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'

export function Locked({ variant = 'pin' }: { variant?: 'pin' | 'session' }) {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const [left, setLeft] = useState(0)

  useEffect(() => {
    if (variant !== 'pin') return
    const tick = () => {
      const until = state.auth.lockedUntil ?? 0
      const seconds = Math.max(0, Math.ceil((until - Date.now()) / 1000))
      setLeft(seconds)
      if (until && seconds === 0) {
        dispatch({ type: 'CLEAR_LOCK' })
        navigate('/entrar')
      }
    }
    tick()
    const timer = window.setInterval(tick, 500)
    return () => window.clearInterval(timer)
  }, [dispatch, navigate, state.auth.lockedUntil, variant])

  if (variant === 'session') {
    return (
      <Screen title="Sessão encerrada" lede="Por segurança, o aplicativo saiu depois de dez minutos sem uso.">
        <p>Seus dados continuam neste navegador. Entre de novo para continuar.</p>
        <Link className="btn btn-primary" to="/entrar">Entrar novamente</Link>
        <Link className="btn btn-secondary" to="/suporte">Falar com o suporte</Link>
      </Screen>
    )
  }

  return (
    <Screen title="Acesso bloqueado" lede="Três tentativas de PIN não deram certo.">
      <p className="metric-value" aria-live="polite">{left}s</p>
      <p>O contador libera um novo PIN quando chegar a zero. Esta espera é de um minuto na demonstração.</p>
      <Button type="button" variant="secondary" onClick={() => { dispatch({ type: 'RESET_PIN' }); navigate('/entrar') }}>
        Redefinir PIN por e-mail
      </Button>
      <Link className="btn btn-ghost" to="/suporte">Acessar o suporte</Link>
    </Screen>
  )
}
