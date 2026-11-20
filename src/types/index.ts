export type Role = 'patient' | 'physio' | 'clinic'

export type GaitType = 'neutra' | 'pronada' | 'supinada'

export type Intensity = 0 | 1 | 2 | 3

export type MaxIntensity = 1 | 2 | 3

export type EvolutionStatus = 'melhorando' | 'estavel' | 'atencao'

export type ExerciseCategory = 'equilibrio' | 'postura' | 'alongamento'

export type ReminderKind = 'uso' | 'exercicio' | 'dor' | 'bateria'

export type PhysioStatus = 'none' | 'pending' | 'active' | 'revoked'

export interface Profile {
  name: string
  email: string
  phone: string
  city: string
  age: number
  weight: number
  height: number
  footSize: number
  pin: string
}

export interface Consents {
  gaitAnalysis: true
  sharePhysio: boolean
  fallFamily: boolean
  anonymousImprove: boolean
  acceptedAt: string | null
}

export interface A11ySettings {
  largeText: boolean
  highContrast: boolean
  readAloud: boolean
  simpleMode: boolean
  fontScale: number
  vibrationAlerts: boolean
  notificationAlerts: boolean
  healthConnect: boolean
}

export interface InsoleFoot {
  battery: number
  connected: boolean
  lastSync: string | null
}

export interface InsolesState {
  left: InsoleFoot
  right: InsoleFoot
  lifespanMonths: number
  firmwareCurrent: string
  firmwareAvailable: string
  firmwareStatus: 'idle' | 'updating' | 'success' | 'error'
  updateProgress: number
}

export interface Assessment {
  completed: boolean
  gait: GaitType
  baselineBalance: number
  balance: number
  weightLeft: number
  weightRight: number
  steps: number
  completedAt: string | null
  regions: string[]
}

export interface PainEntry {
  id: string
  date: string
  intensity: number
  regions: string[]
  note: string
}

export interface Exercise {
  id: string
  title: string
  category: ExerciseCategory
  durationMin: number
  difficulty: 'Leve' | 'Médio'
  inPlan: boolean
  steps: string[]
  safety: string
  done: boolean
}

export interface Reminder {
  id: string
  title: string
  time: string
  kind: ReminderKind
  enabled: boolean
}

export interface Workout {
  id: string
  mode: 'caminhada' | 'corrida'
  durationSec: number
  distanceKm: number
  cadence: number
  contactMs: number
  date: string
  series: { label: string; cadence: number }[]
}

export interface Contact {
  id: string
  name: string
  relation: string
  phone: string
  allowFall: boolean
}

export interface Adjustment {
  id: string
  date: string
  author: string
  dailyGoalMin: number
  maxIntensity: MaxIntensity
  note: string
}

export interface PhysioLink {
  status: PhysioStatus
  name: string
  specialty: string
  clinic: string
  dailyGoalMin: number
  maxIntensity: MaxIntensity
  adjustments: Adjustment[]
}

export interface ClinicPatient {
  id: string
  name: string
  age: number
  professional: string
  gait: GaitType
  evolution: EvolutionStatus
  lastRecord: string
  shared: boolean
}

export interface Professional {
  id: string
  name: string
  specialty: string
  patients: number
}

export interface CareAlert {
  id: string
  patientId: string
  patientName: string
  title: string
  detail: string
  time: string
  read: boolean
}

export interface SupportTicket {
  id: string
  date: string
  topic: string
  status: string
}

export interface AuthState {
  role: Role | null
  onboarded: boolean
  verified: boolean
  registered: boolean
  pinAttempts: number
  lockedUntil: number | null
}

export interface StimuliState {
  intensity: Intensity
  paused: boolean
  minutesUsed: number
}

export interface PlanState {
  week: number
  totalWeeks: number
  usageGoalHours: number
  usageHours: number
  balanceGoal: number
  exerciseGoal: number
  adjustedNote: string
}

export interface AppState {
  auth: AuthState
  profile: Profile
  consents: Consents
  a11y: A11ySettings
  insoles: InsolesState
  assessment: Assessment
  pain: PainEntry[]
  exercises: Exercise[]
  reminders: Reminder[]
  workouts: Workout[]
  pendingWorkout: Workout | null
  contacts: Contact[]
  physio: PhysioLink
  clinicPatients: ClinicPatient[]
  professionals: Professional[]
  careAlerts: CareAlert[]
  stimuli: StimuliState
  plan: PlanState
  stepsToday: number
  usageLabel: string
  streak: number
  lastStreakDate: string
  alertLimit30: boolean
  lastGaitAlertAt: number | null
  seenAchievements: string[]
  patientNotice: string | null
  fallResolved: boolean
  supportTickets: SupportTicket[]
  rating: { stars: number; comment: string; sent: boolean }
  chat: { from: 'user' | 'system'; text: string }[]
}
