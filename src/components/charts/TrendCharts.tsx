import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { Point } from '../../data/series'

export function BalanceChart({ data, baseline }: { data: Point[]; baseline: number }) {
  return (
    <div style={{ width: '100%', height: 220 }} aria-label="Gráfico de equilíbrio">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#DEE6F4" />
          <XAxis dataKey="label" stroke="#6D7288" />
          <YAxis domain={[50, 100]} stroke="#6D7288" />
          <Tooltip />
          <ReferenceLine y={baseline} stroke="#A9793C" strokeDasharray="4 4" />
          <Line type="monotone" dataKey="balance" name="Equilíbrio" stroke="#596AB6" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PainChart({ data }: { data: Point[] }) {
  return (
    <div style={{ width: '100%', height: 220 }} aria-label="Gráfico de dor">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#DEE6F4" />
          <XAxis dataKey="label" stroke="#6D7288" />
          <YAxis domain={[0, 10]} stroke="#6D7288" />
          <Tooltip />
          <Line type="monotone" dataKey="pain" name="Dor" stroke="#E4726B" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function CadenceChart({ data }: { data: { label: string; cadence: number }[] }) {
  return (
    <div style={{ width: '100%', height: 220 }} aria-label="Gráfico de cadência">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid stroke="#DEE6F4" />
          <XAxis dataKey="label" stroke="#6D7288" />
          <YAxis stroke="#6D7288" />
          <Tooltip />
          <Line type="monotone" dataKey="cadence" name="Cadência" stroke="#37A7D0" strokeWidth={3} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
