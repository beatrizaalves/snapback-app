import { Building2, FileBarChart, Stethoscope, Users } from 'lucide-react'
import { NavLink, Navigate, Outlet } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

export function ClinicLayout() {
  const { state } = useApp()
  if (state.auth.role !== 'clinic') return <Navigate to="/entrar" replace />
  return (
    <div className="clinic-shell">
      <aside className="clinic-side">
        <h1>SnapBack</h1>
        <p>Clínica Palma Campinas</p>
        <NavLink to="/clinica" end>
          <Users aria-hidden="true" /> Pacientes
        </NavLink>
        <NavLink to="/clinica/profissionais">
          <Stethoscope aria-hidden="true" /> Profissionais
        </NavLink>
        <NavLink to="/clinica/relatorios">
          <FileBarChart aria-hidden="true" /> Relatórios
        </NavLink>
        <NavLink to="/entrar">
          <Building2 aria-hidden="true" /> Trocar perfil
        </NavLink>
      </aside>
      <div className="clinic-main">
        <Outlet />
      </div>
    </div>
  )
}
