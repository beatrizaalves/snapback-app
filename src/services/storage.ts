import type { AppState } from '../types'
import { createSeed } from '../data/seed'

const KEY = 'snapback-state-v1'

export function loadState(): AppState | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AppState
    if (!parsed?.profile?.name || !parsed.auth) return null
    return parsed
  } catch {
    return null
  }
}

export function saveState(state: AppState) {
  localStorage.setItem(KEY, JSON.stringify(state))
}

export function clearState() {
  localStorage.removeItem(KEY)
}

export function freshSeed() {
  clearState()
  return createSeed()
}
