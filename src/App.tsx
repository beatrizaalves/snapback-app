import { BrowserRouter } from 'react-router-dom'
import { A11yEffect } from './components/common/A11yEffect'
import { AppProvider } from './contexts/AppContext'
import { AppRoutes } from './routes/AppRoutes'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <A11yEffect />
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}
