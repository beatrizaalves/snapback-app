import { useState } from 'react'
import { Button, Chip, Screen } from '../../components/common/ui'
import { Field } from '../../components/forms/Field'
import { Switch } from '../../components/forms/Switch'
import { Modal } from '../../components/modals/Modal'
import { useApp } from '../../hooks/useApp'
import type { Reminder, ReminderKind } from '../../types'
import { reminderLabel } from '../../utils/format'

const EMPTY: Reminder = { id: '', title: '', time: '08:00', kind: 'uso', enabled: true }

export function Reminders() {
  const { state, dispatch } = useApp()
  const [editing, setEditing] = useState<Reminder | null>(null)

  function save() {
    if (!editing || editing.title.trim().length < 3) return
    dispatch({
      type: 'SAVE_REMINDER',
      reminder: { ...editing, id: editing.id || `rem-${Date.now()}` },
    })
    setEditing(null)
  }

  return (
    <Screen title="Lembretes" lede="Eles ficam salvos neste navegador. O celular não recebe um alarme externo." backTo="/perfil">
      {state.reminders.map((item) => (
        <article key={item.id} className="card stack">
          <div className="between">
            <div>
              <h2>{item.title}</h2>
              <p>{item.time}</p>
            </div>
            <Chip>{reminderLabel(item.kind)}</Chip>
          </div>
          <Switch
            label={item.enabled ? 'Lembrete ligado' : 'Lembrete desligado'}
            checked={item.enabled}
            onChange={(enabled) => dispatch({ type: 'SAVE_REMINDER', reminder: { ...item, enabled } })}
          />
          <div className="grid-2">
            <button type="button" className="btn btn-secondary" onClick={() => setEditing(item)}>Editar</button>
            <button type="button" className="btn btn-danger" onClick={() => dispatch({ type: 'DELETE_REMINDER', id: item.id })}>Excluir</button>
          </div>
        </article>
      ))}
      <Button type="button" onClick={() => setEditing({ ...EMPTY })}>Criar lembrete</Button>
      <Modal open={Boolean(editing)} title={editing?.id ? 'Editar lembrete' : 'Novo lembrete'} onClose={() => setEditing(null)}>
        {editing && (
          <>
            <Field label="Nome" value={editing.title} onChange={(event) => setEditing({ ...editing, title: event.target.value })} />
            <Field label="Horário" type="time" value={editing.time} onChange={(event) => setEditing({ ...editing, time: event.target.value })} />
            <label className="field">
              <span>Tipo</span>
              <select value={editing.kind} onChange={(event) => setEditing({ ...editing, kind: event.target.value as ReminderKind })}>
                <option value="uso">Utilização</option>
                <option value="exercicio">Exercícios</option>
                <option value="dor">Dor</option>
                <option value="bateria">Bateria</option>
              </select>
            </label>
            <Button type="button" onClick={save}>Salvar lembrete</Button>
          </>
        )}
      </Modal>
    </Screen>
  )
}
