import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IDLE_MS } from '../data/seed'
import { useApp } from './useApp'

export function useIdleTimeout(enabled: boolean) {
  const { dispatch } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    if (!enabled) return
    let timer = 0
    const reset = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        dispatch({ type: 'END_SESSION' })
        navigate('/sessao-encerrada')
      }, IDLE_MS)
    }
    const events = ['pointerdown', 'keydown'] as const
    events.forEach((eventName) => window.addEventListener(eventName, reset))
    reset()
    return () => {
      window.clearTimeout(timer)
      events.forEach((eventName) => window.removeEventListener(eventName, reset))
    }
  }, [dispatch, enabled, navigate])
}
