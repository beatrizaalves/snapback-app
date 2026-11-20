import { useApp } from '../../hooks/useApp'

export function Professionals() {
  const { state } = useApp()
  return (
    <section className="stack">
      <h1>Profissionais</h1>
      <p>Equipe de demonstração da Clínica Palma Campinas.</p>
      {state.professionals.map((person) => (
        <article key={person.id} className="card">
          <h2>{person.name}</h2>
          <p>{person.specialty}</p>
          <p>{person.patients} pacientes no painel institucional</p>
        </article>
      ))}
    </section>
  )
}
