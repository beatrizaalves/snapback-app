import type { AppState, Intensity } from '../types'

export function mariaShared(state: AppState) {
  return state.consents.sharePhysio && state.physio.status === 'active'
}

export function familyAlertsOn(state: AppState) {
  return state.consents.fallFamily && state.contacts.some((contact) => contact.allowFall)
}

export function visibleClinicPatients(state: AppState) {
  return state.clinicPatients.filter((patient) => {
    if (patient.id === 'maria') return mariaShared(state)
    return patient.shared
  })
}

export function physioCanEdit(state: AppState) {
  return state.physio.status === 'active' && state.consents.sharePhysio
}

export function firmwareReady(state: AppState) {
  const { left, right } = state.insoles
  return left.connected && right.connected && left.battery >= 30 && right.battery >= 30
}

export function clampIntensity(value: number, max: number): Intensity {
  const next = Math.max(0, Math.min(max, value))
  return next as Intensity
}

export function gaitAlertBlocked(state: AppState, now = Date.now()) {
  if (!state.alertLimit30 || !state.lastGaitAlertAt) return false
  return now - state.lastGaitAlertAt < 30 * 60 * 1000
}

export function minutesUntilGaitAlert(state: AppState, now = Date.now()) {
  if (!state.lastGaitAlertAt) return 0
  const left = 30 * 60 * 1000 - (now - state.lastGaitAlertAt)
  return Math.max(0, Math.ceil(left / 60000))
}

export interface Achievement {
  id: string
  title: string
  detail: string
  unlocked: boolean
}

export function achievements(state: AppState): Achievement[] {
  const done = state.exercises.some((item) => item.done)
  const planDone = state.exercises.filter((item) => item.inPlan && item.done).length
  return [
    {
      id: 'avaliacao',
      title: 'Avaliação inicial',
      detail: 'Você concluiu a primeira leitura da pisada.',
      unlocked: state.assessment.completed,
    },
    {
      id: 'sequencia',
      title: 'Cinco dias seguidos',
      detail: 'A palmilha foi usada em uma sequência de cinco dias.',
      unlocked: state.streak >= 5,
    },
    {
      id: 'exercicio',
      title: 'Primeiro exercício',
      detail: 'Um exercício do plano foi marcado como feito.',
      unlocked: done,
    },
    {
      id: 'meta',
      title: 'Meta de exercícios',
      detail: 'Os exercícios do plano desta semana foram concluídos.',
      unlocked: planDone >= state.plan.exerciseGoal,
    },
    {
      id: 'dor',
      title: 'Dor registrada',
      detail: 'O registro ajuda o fisioterapeuta a acompanhar você.',
      unlocked: state.pain.length > 0,
    },
    {
      id: 'treino',
      title: 'Treino salvo',
      detail: 'Uma caminhada ou corrida entrou no histórico.',
      unlocked: state.workouts.length > 2,
    },
    {
      id: 'uso',
      title: 'Uso do dia',
      detail: 'O uso de hoje já passou de cinco horas.',
      unlocked: state.plan.usageHours >= 5,
    },
    {
      id: 'semana',
      title: 'Semana 3',
      detail: 'O plano de reeducação chegou à terceira semana.',
      unlocked: state.plan.week >= 3,
    },
  ]
}
