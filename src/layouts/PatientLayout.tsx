import { Navigate, Outlet } from 'react-router-dom'
import { BottomNav } from '../components/navigation/BottomNav'
import { useIdleTimeout } from '../hooks/useIdleTimeout'
import { useApp } from '../hooks/useApp'
import { speak } from '../services/speech'

export function PatientLayout() {
  const { state } = useApp()
  useIdleTimeout(state.auth.role === 'patient' && state.auth.onboarded)

  if (state.auth.role !== 'patient') return <Navigate to="/entrar" replace />
  if (!state.auth.onboarded) return <Navigate to="/parear" replace />

  return (
    <div className="phone-frame">
      {state.a11y.readAloud && (
        <div style={{ padding: '8px 16px 0' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              const title = document.querySelector('h1')?.textContent ?? 'SnapBack'
              const text = document.querySelector('.lede, .screen p')?.textContent ?? ''
              const ok = speak(`${title}. ${text}`)
              if (!ok) window.alert('A leitura em voz alta não está disponível neste navegador.')
            }}
          >
            Ouvir texto da tela
          </button>
        </div>
      )}
      <Outlet />
      <BottomNav />
    </div>
  )
}
