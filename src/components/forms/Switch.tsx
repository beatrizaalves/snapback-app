export function Switch({
  label,
  checked,
  disabled,
  onChange,
  hint,
}: {
  label: string
  checked: boolean
  disabled?: boolean
  onChange: (value: boolean) => void
  hint?: string
}) {
  return (
    <button
      type="button"
      className="switch-line"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
    >
      <span>
        <strong>{label}</strong>
        {hint && <span className="muted" style={{ display: 'block' }}>{hint}</span>}
      </span>
      <span className={`switch ${checked ? 'on' : ''}`} aria-hidden="true">
        <i />
      </span>
    </button>
  )
}
