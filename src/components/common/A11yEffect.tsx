import { useEffect } from 'react'
import { useApp } from '../../hooks/useApp'

export function A11yEffect() {
  const { state } = useApp()
  useEffect(() => {
    const root = document.documentElement
    const scale = state.a11y.fontScale * (state.a11y.largeText ? 1.12 : 1)
    root.style.fontSize = `${18 * scale}px`
    root.dataset.contrast = state.a11y.highContrast ? 'high' : 'normal'
    root.dataset.simple = state.a11y.simpleMode ? 'true' : 'false'
  }, [state.a11y])
  return null
}
