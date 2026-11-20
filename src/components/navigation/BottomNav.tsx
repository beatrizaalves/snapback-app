import { CalendarCheck, Footprints, House, Activity, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const ITEMS = [
  { to: '/inicio', label: 'Início', icon: House },
  { to: '/analise', label: 'Análise', icon: Activity },
  { to: '/plano', label: 'Plano', icon: CalendarCheck },
  { to: '/palmilha', label: 'Palmilha', icon: Footprints },
  { to: '/perfil', label: 'Perfil', icon: UserRound },
]

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Principal">
      {ITEMS.map((item) => {
        const Icon = item.icon
        return (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Icon aria-hidden="true" size={22} />
            <span>{item.label}</span>
          </NavLink>
        )
      })}
    </nav>
  )
}

export function PhysioNav() {
  const items = [
    { to: '/profissional', label: 'Pacientes' },
    { to: '/profissional/alertas', label: 'Alertas' },
    { to: '/profissional/perfil', label: 'Perfil' },
  ]
  return (
    <nav className="bottom-nav" aria-label="Fisioterapeuta" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/profissional'}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
