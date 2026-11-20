import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Chip, Screen } from '../../components/common/ui'
import { Field } from '../../components/forms/Field'
import { useApp } from '../../hooks/useApp'
import { evolutionLabel } from '../../utils/format'
import { mariaShared } from '../../utils/rules'

export function PhysioPatients() {
  const { state } = useApp()
  const [query, setQuery] = useState('')
  const others = state.clinicPatients.filter((patient) => patient.id !== 'maria' && patient.shared)
  const maria = state.clinicPatients.find((patient) => patient.id === 'maria')
  const authorized = [
    ...(maria && mariaShared(state) ? [maria] : []),
    ...others,
  ].filter((patient) => patient.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <Screen title="Olá, Helena" lede={`${authorized.length} pacientes com dados autorizados nesta amostra.`}>
      <Field label="Buscar paciente" value={query} onChange={(event) => setQuery(event.target.value)} />
      {state.physio.status === 'pending' && (
        <article className="card">
          <h2>Maria Aparecida</h2>
          <p>Solicitação enviada. Os dados abrem depois que ela aceitar.</p>
        </article>
      )}
      {state.physio.status === 'active' && !state.consents.sharePhysio && (
        <article className="card">
          <h2>Maria Aparecida</h2>
          <p>A paciente desligou o compartilhamento. O prontuário fica oculto.</p>
        </article>
      )}
      {state.physio.status === 'revoked' && (
        <article className="card">
          <h2>Maria Aparecida</h2>
          <p>Acesso revogado pela paciente.</p>
        </article>
      )}
      {authorized.map((patient) => (
        <Link key={patient.id} to={`/profissional/pacientes/${patient.id}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="between">
            <h2>{patient.name}</h2>
            <Chip tone={patient.evolution === 'atencao' ? 'danger' : patient.evolution === 'melhorando' ? 'ok' : 'warn'}>
              {evolutionLabel(patient.evolution)}
            </Chip>
          </div>
          <p>{patient.age} anos</p>
          <p>Último registro: {patient.lastRecord}</p>
        </Link>
      ))}
      {authorized.length === 0 && <p>Nenhum paciente autorizado com esse nome.</p>}
    </Screen>
  )
}
