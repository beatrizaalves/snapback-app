import type { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

export function AuthLayout({ children }: { children?: ReactNode }) {
  return <div className="phone-frame auth-frame">{children ?? <Outlet />}</div>
}
