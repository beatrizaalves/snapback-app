import { useNavigate } from 'react-router-dom'
import { Button, Screen } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'

export function PhysioProfile() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  return (
    <Screen title={state.physio.name} lede={`${state.physio.specialty} · ${state.physio.clinic}`}>
      <p>Este acesso é uma demonstração. Não há conselho de classe nem agenda real conectados.</p>
      <Button type="button" variant="secondary" onClick={() => { dispatch({ type: 'LOGOUT' }); navigate('/entrar') }}>
        Trocar perfil
      </Button>
    </Screen>
  )
}
