import type { EvolutionStatus, GaitType, ReminderKind } from '../types'

export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(iso))
}

export function formatToday(date = new Date()) {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)
}

export function formatClock(totalSec: number) {
  const minutes = Math.floor(totalSec / 60)
  const seconds = totalSec % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function formatDistance(km: number) {
  return `${km.toFixed(2).replace('.', ',')} km`
}

export function gaitLabel(gait: GaitType) {
  if (gait === 'pronada') return 'Pronada'
  if (gait === 'supinada') return 'Supinada'
  return 'Neutra'
}

export function evolutionLabel(status: EvolutionStatus) {
  if (status === 'melhorando') return 'Melhorando'
  if (status === 'atencao') return 'Atenção'
  return 'Estável'
}

export function reminderLabel(kind: ReminderKind) {
  if (kind === 'uso') return 'Utilização'
  if (kind === 'exercicio') return 'Exercícios'
  if (kind === 'dor') return 'Dor'
  return 'Bateria'
}

export function intensityLabel(level: number) {
  if (level === 0) return 'Desligado'
  if (level === 1) return 'Leve'
  if (level === 2) return 'Médio'
  return 'Forte'
}

export function phoneHref(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return `tel:+55${digits}`
}

export function firstName(name: string) {
  return name.trim().split(' ')[0] || name
}

export function exercisesDone(exercises: { done: boolean; inPlan: boolean }[]) {
  return exercises.filter((item) => item.done && item.inPlan).length
}
