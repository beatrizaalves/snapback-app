import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext'

export function useApp() {
  const value = useContext(AppContext)
  if (!value) throw new Error('useApp precisa estar dentro do AppProvider')
  return value
}
