import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  icon?: ReactNode
}

export function Button({ variant = 'primary', icon, children, className = '', ...props }: ButtonProps) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...props}>
      {icon}
      <span>{children}</span>
    </button>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <article className={`card ${className}`}>{children}</article>
}

export function Chip({
  children,
  tone = 'info',
  on,
}: {
  children: ReactNode
  tone?: 'info' | 'ok' | 'warn' | 'danger'
  on?: boolean
}) {
  return <span className={`chip chip-${tone} ${on ? 'chip-on' : ''}`}>{children}</span>
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const width = Math.max(0, Math.min(100, value))
  return (
    <div>
      <div className="progress" role="progressbar" aria-valuenow={width} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
        <b style={{ width: `${width}%` }} />
      </div>
    </div>
  )
}

export function Banner({
  tone = 'info',
  title,
  children,
}: {
  tone?: 'info' | 'ok' | 'warn' | 'danger'
  title: string
  children?: ReactNode
}) {
  return (
    <div className={`banner banner-${tone}`} role="status">
      <strong>{title}</strong>
      {children}
    </div>
  )
}

export function Battery({ value, label }: { value: number; label: string }) {
  const tone = value < 30 ? 'baixa' : 'ok'
  return (
    <div className="stack" style={{ gap: 6 }}>
      <div className="between">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>
      <ProgressBar value={value} label={`${label}: ${value} por cento, carga ${tone}`} />
      {value < 30 && <span className="field-error">Bateria baixa. Recarregue esta palmilha.</span>}
    </div>
  )
}

export function SimNote({ children }: { children: ReactNode }) {
  return <p className="sim-note">{children}</p>
}

export function Screen({
  title,
  lede,
  children,
  actions,
  backTo,
}: {
  title: string
  lede?: string
  children: ReactNode
  actions?: ReactNode
  backTo?: string
}) {
  const navigate = useNavigate()
  return (
    <section className="screen">
      <div className="screen-top">
        {backTo && (
          <button type="button" className="back-link" onClick={() => navigate(backTo)}>
            <ChevronLeft aria-hidden="true" /> Voltar
          </button>
        )}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
      <div className="stack">{children}</div>
      {actions && <div className="screen-actions stack">{actions}</div>}
    </section>
  )
}

export function Stepper({
  label,
  value,
  unit,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string
  value: number
  unit: string
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
}) {
  return (
    <div className="field">
      <span>{label}</span>
      <div className="stepper">
        <button type="button" aria-label={`Diminuir ${label}`} onClick={() => onChange(Math.max(min, value - step))}>
          −
        </button>
        <strong>
          {value} {unit}
        </strong>
        <button type="button" aria-label={`Aumentar ${label}`} onClick={() => onChange(Math.min(max, value + step))}>
          +
        </button>
      </div>
    </div>
  )
}
