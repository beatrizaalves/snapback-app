import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'

interface BaseProps {
  label: string
  error?: string
  hint?: string
  children?: ReactNode
}

export function Field({
  label,
  error,
  hint,
  ...props
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} aria-invalid={Boolean(error)} />
      {hint && <small className="muted">{hint}</small>}
      {error && <strong className="field-error">{error}</strong>}
    </label>
  )
}

export function TextArea({
  label,
  error,
  ...props
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea {...props} aria-invalid={Boolean(error)} />
      {error && <strong className="field-error">{error}</strong>}
    </label>
  )
}
