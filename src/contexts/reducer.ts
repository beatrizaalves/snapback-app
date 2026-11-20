import { createSeed, LOCK_MS, SYSTEM_MAX_INTENSITY } from '../data/seed'
import type {
  A11ySettings,
  AppState,
  Contact,
  Intensity,
  MaxIntensity,
  PhysioStatus,
  Reminder,
  Role,
  Workout,
} from '../types'
import { clampIntensity } from '../utils/rules'

export type Action =
  | { type: 'ENTER_DEMO'; role: Role }
  | { type: 'LOGOUT' }
  | { type: 'RESET_DEMO' }
  | { type: 'DELETE_ACCOUNT' }
  | { type: 'SIGNUP'; name: string; email: string; phone: string }
  | { type: 'PIN_FAIL' }
  | { type: 'PIN_OK' }
  | { type: 'CLEAR_LOCK' }
  | { type: 'RESET_PIN' }
  | { type: 'END_SESSION' }
  | { type: 'PATCH_CONSENTS'; patch: Partial<AppState['consents']> }
  | { type: 'ACCEPT_CONSENTS'; patch: Partial<AppState['consents']> }
  | { type: 'PATCH_PROFILE'; patch: Partial<AppState['profile']> }
  | { type: 'SET_REGIONS'; regions: string[] }
  | { type: 'COMPLETE_ASSESSMENT'; steps: number }
  | { type: 'PATCH_A11Y'; patch: Partial<A11ySettings> }
  | { type: 'SYNC_INSOLES' }
  | { type: 'CHARGE_DEMO' }
  | { type: 'DISCONNECT_INSOLES' }
  | { type: 'CONNECT_INSOLES' }
  | { type: 'SET_FIRMWARE'; status: AppState['insoles']['firmwareStatus']; progress?: number }
  | { type: 'SET_STIMULI'; intensity?: Intensity; paused?: boolean }
  | { type: 'ADD_PAIN'; intensity: number; regions: string[]; note: string }
  | { type: 'TOGGLE_EXERCISE'; id: string }
  | { type: 'SAVE_REMINDER'; reminder: Reminder }
  | { type: 'DELETE_REMINDER'; id: string }
  | { type: 'SET_PENDING_WORKOUT'; workout: Workout | null }
  | { type: 'SAVE_PENDING_WORKOUT' }
  | { type: 'SAVE_CONTACT'; contact: Contact }
  | { type: 'DELETE_CONTACT'; id: string }
  | { type: 'SET_PHYSIO_STATUS'; status: PhysioStatus }
  | { type: 'SAVE_ADJUSTMENT'; dailyGoalMin: number; maxIntensity: MaxIntensity; note: string }
  | { type: 'NOTIFY_PATIENT'; message: string }
  | { type: 'CLEAR_NOTICE' }
  | { type: 'SET_ALERT_LIMIT'; value: boolean }
  | { type: 'MARK_GAIT_ALERT' }
  | { type: 'SEE_ACHIEVEMENT'; id: string }
  | { type: 'SET_RATING'; stars: number; comment: string }
  | { type: 'ADD_TICKET'; topic: string }
  | { type: 'ADD_CHAT'; text: string }
  | { type: 'RESOLVE_FALL' }
  | { type: 'READ_ALERT'; id: string }

function todayKey() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function withActivity(state: AppState): AppState {
  const today = todayKey()
  if (state.lastStreakDate === today) return state
  return { ...state, streak: state.streak + 1, lastStreakDate: today }
}

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ENTER_DEMO':
      return {
        ...state,
        auth: {
          ...state.auth,
          role: action.role,
          onboarded: action.role === 'patient' ? true : state.auth.onboarded,
          registered: true,
          pinAttempts: 0,
          lockedUntil: null,
        },
      }
    case 'LOGOUT':
      return { ...state, auth: { ...state.auth, role: null, pinAttempts: 0, lockedUntil: null } }
    case 'RESET_DEMO': {
      const next = createSeed()
      next.auth.role = 'patient'
      next.auth.onboarded = true
      return next
    }
    case 'DELETE_ACCOUNT':
      return createSeed()
    case 'SIGNUP':
      return {
        ...state,
        profile: { ...state.profile, name: action.name, email: action.email, phone: action.phone },
        auth: { ...state.auth, registered: true, verified: false, onboarded: false, role: null, pinAttempts: 0 },
      }
    case 'PIN_FAIL': {
      const pinAttempts = state.auth.pinAttempts + 1
      const locked = pinAttempts >= 3
      return {
        ...state,
        auth: {
          ...state.auth,
          pinAttempts,
          lockedUntil: locked ? Date.now() + LOCK_MS : state.auth.lockedUntil,
        },
      }
    }
    case 'PIN_OK':
      return {
        ...state,
        auth: { ...state.auth, role: 'patient', pinAttempts: 0, lockedUntil: null },
      }
    case 'CLEAR_LOCK':
      return { ...state, auth: { ...state.auth, pinAttempts: 0, lockedUntil: null } }
    case 'RESET_PIN':
      return {
        ...state,
        profile: { ...state.profile, pin: '1234' },
        auth: { ...state.auth, pinAttempts: 0, lockedUntil: null },
      }
    case 'END_SESSION':
      return { ...state, auth: { ...state.auth, role: null } }
    case 'PATCH_CONSENTS':
      return { ...state, consents: { ...state.consents, ...action.patch, gaitAnalysis: true } }
    case 'ACCEPT_CONSENTS':
      return {
        ...state,
        consents: {
          ...state.consents,
          ...action.patch,
          gaitAnalysis: true,
          acceptedAt: new Date().toISOString(),
        },
        auth: { ...state.auth, role: 'patient', verified: true, onboarded: false },
      }
    case 'PATCH_PROFILE':
      return { ...state, profile: { ...state.profile, ...action.patch } }
    case 'SET_REGIONS':
      return { ...state, assessment: { ...state.assessment, regions: action.regions } }
    case 'COMPLETE_ASSESSMENT':
      return {
        ...state,
        auth: { ...state.auth, role: 'patient', onboarded: true },
        assessment: {
          ...state.assessment,
          completed: true,
          gait: 'pronada',
          baselineBalance: 68,
          balance: 72,
          weightLeft: 55,
          weightRight: 45,
          steps: action.steps,
          completedAt: new Date().toISOString(),
        },
      }
    case 'PATCH_A11Y':
      return { ...state, a11y: { ...state.a11y, ...action.patch } }
    case 'SYNC_INSOLES': {
      const stamp = new Date().toISOString()
      return {
        ...state,
        insoles: {
          ...state.insoles,
          left: { ...state.insoles.left, lastSync: stamp, connected: true },
          right: { ...state.insoles.right, lastSync: stamp, connected: true },
        },
      }
    }
    case 'CHARGE_DEMO':
      return {
        ...state,
        insoles: {
          ...state.insoles,
          left: { ...state.insoles.left, battery: 86 },
          right: { ...state.insoles.right, battery: 80 },
        },
      }
    case 'DISCONNECT_INSOLES':
      return {
        ...state,
        insoles: {
          ...state.insoles,
          left: { ...state.insoles.left, connected: false },
          right: { ...state.insoles.right, connected: false },
        },
      }
    case 'CONNECT_INSOLES':
      return {
        ...state,
        insoles: {
          ...state.insoles,
          left: { ...state.insoles.left, connected: true },
          right: { ...state.insoles.right, connected: true },
        },
      }
    case 'SET_FIRMWARE': {
      const success = action.status === 'success'
      return {
        ...state,
        insoles: {
          ...state.insoles,
          firmwareStatus: action.status,
          updateProgress: action.progress ?? state.insoles.updateProgress,
          firmwareCurrent: success ? state.insoles.firmwareAvailable : state.insoles.firmwareCurrent,
        },
      }
    }
    case 'SET_STIMULI': {
      const max = state.physio.maxIntensity
      const intensity =
        action.intensity === undefined ? state.stimuli.intensity : clampIntensity(action.intensity, max)
      return { ...state, stimuli: { ...state.stimuli, intensity, paused: action.paused ?? state.stimuli.paused } }
    }
    case 'ADD_PAIN':
      return {
        ...state,
        pain: [
          {
            id: `pain-${Date.now()}`,
            date: new Date().toISOString(),
            intensity: action.intensity,
            regions: action.regions,
            note: action.note,
          },
          ...state.pain,
        ],
      }
    case 'TOGGLE_EXERCISE':
      return withActivity({
        ...state,
        exercises: state.exercises.map((item) =>
          item.id === action.id ? { ...item, done: !item.done } : item,
        ),
      })
    case 'SAVE_REMINDER': {
      const exists = state.reminders.some((item) => item.id === action.reminder.id)
      return {
        ...state,
        reminders: exists
          ? state.reminders.map((item) => (item.id === action.reminder.id ? action.reminder : item))
          : [...state.reminders, action.reminder],
      }
    }
    case 'DELETE_REMINDER':
      return { ...state, reminders: state.reminders.filter((item) => item.id !== action.id) }
    case 'SET_PENDING_WORKOUT':
      return { ...state, pendingWorkout: action.workout }
    case 'SAVE_PENDING_WORKOUT':
      if (!state.pendingWorkout) return state
      return withActivity({
        ...state,
        workouts: [state.pendingWorkout, ...state.workouts],
        pendingWorkout: null,
      })
    case 'SAVE_CONTACT': {
      if (!state.contacts.some((item) => item.id === action.contact.id) && state.contacts.length >= 3) {
        return state
      }
      const exists = state.contacts.some((item) => item.id === action.contact.id)
      return {
        ...state,
        contacts: exists
          ? state.contacts.map((item) => (item.id === action.contact.id ? action.contact : item))
          : [...state.contacts, action.contact],
      }
    }
    case 'DELETE_CONTACT':
      return { ...state, contacts: state.contacts.filter((item) => item.id !== action.id) }
    case 'SET_PHYSIO_STATUS':
      return { ...state, physio: { ...state.physio, status: action.status } }
    case 'SAVE_ADJUSTMENT': {
      if (state.physio.status !== 'active' || !state.consents.sharePhysio) return state
      const maxIntensity = Math.min(SYSTEM_MAX_INTENSITY, Math.max(1, action.maxIntensity)) as MaxIntensity
      const dailyGoalMin = Math.min(180, Math.max(20, action.dailyGoalMin))
      const intensity = clampIntensity(state.stimuli.intensity, maxIntensity)
      return {
        ...state,
        stimuli: { ...state.stimuli, intensity },
        plan: {
          ...state.plan,
          usageGoalHours: Math.round(((dailyGoalMin * 7) / 60) * 10) / 10,
        },
        physio: {
          ...state.physio,
          dailyGoalMin,
          maxIntensity,
          adjustments: [
            {
              id: `adj-${Date.now()}`,
              date: new Date().toISOString(),
              author: state.physio.name,
              dailyGoalMin,
              maxIntensity,
              note: action.note || 'Ajuste salvo pelo fisioterapeuta.',
            },
            ...state.physio.adjustments,
          ],
        },
      }
    }
    case 'NOTIFY_PATIENT':
      return { ...state, patientNotice: action.message }
    case 'CLEAR_NOTICE':
      return { ...state, patientNotice: null }
    case 'SET_ALERT_LIMIT':
      return { ...state, alertLimit30: action.value }
    case 'MARK_GAIT_ALERT':
      return { ...state, lastGaitAlertAt: Date.now() }
    case 'SEE_ACHIEVEMENT':
      if (state.seenAchievements.includes(action.id)) return state
      return { ...state, seenAchievements: [...state.seenAchievements, action.id] }
    case 'SET_RATING':
      return { ...state, rating: { stars: action.stars, comment: action.comment, sent: true } }
    case 'ADD_TICKET':
      return {
        ...state,
        supportTickets: [
          {
            id: `tk-${Date.now()}`,
            date: new Date().toISOString(),
            topic: action.topic,
            status: 'Registrado neste navegador',
          },
          ...state.supportTickets,
        ],
      }
    case 'ADD_CHAT':
      return {
        ...state,
        chat: [
          ...state.chat,
          { from: 'user', text: action.text },
          {
            from: 'system',
            text: 'Recebemos o texto só nesta simulação. Nenhum atendente foi acionado.',
          },
        ],
      }
    case 'RESOLVE_FALL':
      return { ...state, fallResolved: true }
    case 'READ_ALERT':
      return {
        ...state,
        careAlerts: state.careAlerts.map((item) =>
          item.id === action.id ? { ...item, read: true } : item,
        ),
      }
    default:
      return state
  }
}
