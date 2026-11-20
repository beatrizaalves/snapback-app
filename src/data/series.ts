export interface Point {
  label: string
  balance: number
  pain: number
}

export const SERIES: Record<'semana' | 'mes' | 'inicio', Point[]> = {
  semana: [
    { label: 'Seg', balance: 69, pain: 5 },
    { label: 'Ter', balance: 70, pain: 5 },
    { label: 'Qua', balance: 70, pain: 4 },
    { label: 'Qui', balance: 71, pain: 4 },
    { label: 'Sex', balance: 71, pain: 4 },
    { label: 'Sáb', balance: 72, pain: 4 },
    { label: 'Dom', balance: 72, pain: 4 },
  ],
  mes: [
    { label: 'S1', balance: 68, pain: 7 },
    { label: 'S2', balance: 69, pain: 6 },
    { label: 'S3', balance: 70, pain: 5 },
    { label: 'S4', balance: 72, pain: 4 },
  ],
  inicio: [
    { label: 'Out', balance: 68, pain: 7 },
    { label: 'Nov 1', balance: 69, pain: 6 },
    { label: 'Nov 2', balance: 71, pain: 5 },
    { label: 'Nov 3', balance: 72, pain: 4 },
  ],
}

export interface Spot {
  id: string
  label: string
  x: number
  y: number
  r: number
  level: number
}

export const PRESSURE: Record<'hoje' | '7' | '30', { left: Spot[]; right: Spot[] }> = {
  hoje: {
    left: [
      { id: 'le-c', label: 'Calcanhar esquerdo', x: 60, y: 210, r: 22, level: 2 },
      { id: 'le-a', label: 'Arco esquerdo', x: 78, y: 140, r: 20, level: 3 },
      { id: 'le-f', label: 'Antepé esquerdo', x: 62, y: 70, r: 24, level: 3 },
    ],
    right: [
      { id: 'ld-c', label: 'Calcanhar direito', x: 60, y: 210, r: 20, level: 1 },
      { id: 'ld-a', label: 'Arco direito', x: 48, y: 140, r: 16, level: 1 },
      { id: 'ld-f', label: 'Antepé direito', x: 60, y: 72, r: 18, level: 2 },
    ],
  },
  '7': {
    left: [
      { id: 'le-c', label: 'Calcanhar esquerdo', x: 60, y: 210, r: 22, level: 2 },
      { id: 'le-a', label: 'Arco esquerdo', x: 76, y: 140, r: 18, level: 2 },
      { id: 'le-f', label: 'Antepé esquerdo', x: 62, y: 70, r: 22, level: 3 },
    ],
    right: [
      { id: 'ld-c', label: 'Calcanhar direito', x: 60, y: 210, r: 20, level: 1 },
      { id: 'ld-a', label: 'Arco direito', x: 50, y: 140, r: 16, level: 1 },
      { id: 'ld-f', label: 'Antepé direito', x: 60, y: 72, r: 18, level: 2 },
    ],
  },
  '30': {
    left: [
      { id: 'le-c', label: 'Calcanhar esquerdo', x: 60, y: 210, r: 24, level: 3 },
      { id: 'le-a', label: 'Arco esquerdo', x: 78, y: 140, r: 20, level: 3 },
      { id: 'le-f', label: 'Antepé esquerdo', x: 62, y: 70, r: 22, level: 2 },
    ],
    right: [
      { id: 'ld-c', label: 'Calcanhar direito', x: 60, y: 210, r: 18, level: 1 },
      { id: 'ld-a', label: 'Arco direito', x: 48, y: 140, r: 14, level: 1 },
      { id: 'ld-f', label: 'Antepé direito', x: 60, y: 72, r: 16, level: 1 },
    ],
  },
}

export const PRESSURE_COLORS = ['#37A7D0', '#596AB6', '#A9793C', '#E4726B']

export function pressureColor(level: number) {
  return PRESSURE_COLORS[Math.max(0, Math.min(3, level))]
}

export function overloadSpots(spots: Spot[]) {
  return spots.filter((spot) => spot.level >= 3)
}
