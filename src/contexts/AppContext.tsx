import { createContext, useEffect, useReducer, type Dispatch, type ReactNode } from 'react'
import { createSeed } from '../data/seed'
import { loadState, saveState } from '../services/storage'
import type { AppState } from '../types'
import { reducer, type Action } from './reducer'

interface AppContextValue {
  state: AppState
  dispatch: Dispatch<Action>
}

export const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, () => loadState() ?? createSeed())

  useEffect(() => {
    saveState(state)
  }, [state])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}
