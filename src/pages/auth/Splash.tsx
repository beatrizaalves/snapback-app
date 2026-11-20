import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '../../components/brand/Logo'
import { useApp } from '../../hooks/useApp'

export function Splash() {
  const { state } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const { role, onboarded } = state.auth
      if (role === 'patient' && onboarded) navigate('/inicio', { replace: true })
      else if (role === 'patient') navigate('/parear', { replace: true })
      else if (role === 'physio') navigate('/profissional', { replace: true })
      else if (role === 'clinic') navigate('/clinica', { replace: true })
      else navigate('/boas-vindas', { replace: true })
    }, 1600)
    return () => window.clearTimeout(timer)
  }, [navigate, state.auth])

  return (
    <section className="splash">
      <Logo light />
      <p>Reeducação postural e de pisada</p>
      <div className="loader" role="status" aria-label="Carregando o SnapBack" />
    </section>
  )
}
