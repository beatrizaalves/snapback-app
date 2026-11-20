import { Navigate, Outlet } from 'react-router-dom'
import { PhysioNav } from '../components/navigation/BottomNav'
import { useApp } from '../hooks/useApp'

export function PhysiotherapistLayout() {
  const { state } = useApp()
  if (state.auth.role !== 'physio') return <Navigate to="/entrar" replace />
  return (
    <div className="phone-frame">
      <Outlet />
      <PhysioNav />
    </div>
  )
}
