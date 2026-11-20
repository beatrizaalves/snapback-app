import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Screen, SimNote } from '../../components/common/ui'
import { Field } from '../../components/forms/Field'
import { Switch } from '../../components/forms/Switch'
import { Modal } from '../../components/modals/Modal'
import { useApp } from '../../hooks/useApp'
import type { Contact } from '../../types'
import { familyAlertsOn } from '../../utils/rules'

const EMPTY: Contact = { id: '', name: '', relation: '', phone: '', allowFall: true }

export function Contacts() {
  const { state, dispatch } = useApp()
  const [editing, setEditing] = useState<Contact | null>(null)
  const allowed = familyAlertsOn(state)

  function save() {
    if (!editing || editing.name.trim().length < 3 || editing.phone.replace(/\D/g, '').length < 10) return
    dispatch({
      type: 'SAVE_CONTACT',
      contact: { ...editing, id: editing.id || `ct-${Date.now()}` },
    })
    setEditing(null)
  }

  return (
    <Screen title="Contatos de emergência" lede="Até três pessoas. O aviso de queda só sai se você e o contato autorizarem." backTo="/perfil">
      <p>{allowed ? 'Familiares autorizados podem ver o alerta simulado.' : 'O alerta de queda não é enviado: falta o consentimento ou um contato autorizado.'}</p>
      {state.contacts.map((contact) => (
        <article key={contact.id} className="card stack">
          <div className="row">
            <svg width="56" height="56" viewBox="0 0 56 56" aria-hidden="true">
              <circle cx="28" cy="28" r="28" fill="#DEE6F4" />
              <circle cx="28" cy="22" r="8" fill="#596AB6" />
              <path d="M14 44c4-8 24-8 28 0" fill="#596AB6" />
            </svg>
            <div>
              <h2>{contact.name}</h2>
              <p>{contact.relation}</p>
              <p>{contact.phone}</p>
            </div>
          </div>
          <Switch
            label="Pode receber aviso de queda"
            checked={contact.allowFall}
            onChange={(allowFall) => dispatch({ type: 'SAVE_CONTACT', contact: { ...contact, allowFall } })}
          />
          <div className="grid-2">
            <button type="button" className="btn btn-secondary" onClick={() => setEditing(contact)}>Editar</button>
            <button type="button" className="btn btn-danger" onClick={() => dispatch({ type: 'DELETE_CONTACT', id: contact.id })}>Remover</button>
          </div>
        </article>
      ))}
      <Button type="button" disabled={state.contacts.length >= 3} onClick={() => setEditing({ ...EMPTY })}>
        Adicionar contato
      </Button>
      {allowed ? <Link className="btn btn-secondary" to="/alerta-queda">Ver alerta do familiar</Link> : <SimNote>Ligue o aviso à família e autorize pelo menos um contato para abrir a tela do familiar.</SimNote>}
      <Modal open={Boolean(editing)} title="Contato" onClose={() => setEditing(null)}>
        {editing && (
          <>
            <Field label="Nome" value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} />
            <Field label="Parentesco" value={editing.relation} onChange={(event) => setEditing({ ...editing, relation: event.target.value })} />
            <Field label="Telefone" value={editing.phone} onChange={(event) => setEditing({ ...editing, phone: event.target.value })} />
            <Button type="button" onClick={save}>Salvar contato</Button>
          </>
        )}
      </Modal>
    </Screen>
  )
}
