import { Link, useNavigate } from 'react-router-dom'
import { Button, Screen } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'

const LINKS = [
  ['/dor', 'Registrar dor'],
  ['/evolucao', 'Minha evolução'],
  ['/lembretes', 'Lembretes'],
  ['/conquistas', 'Conquistas'],
  ['/treino', 'Caminhada e corrida'],
  ['/relatorio', 'Relatório'],
  ['/contatos', 'Contatos de emergência'],
  ['/fisioterapeuta', 'Meu fisioterapeuta'],
  ['/privacidade', 'Privacidade e meus dados'],
  ['/configuracoes', 'Acessibilidade'],
  ['/alerta-pisada', 'Alertas de pisada'],
  ['/ajuda', 'Ajuda e suporte'],
] as const

export function ProfileHub() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  return (
    <Screen title="Perfil" lede={`${state.profile.name}, ${state.profile.age} anos, ${state.profile.city}.`}>
      {LINKS.map(([to, label]) => (
        <Link key={to} className="btn btn-secondary" to={to}>{label}</Link>
      ))}
      <Button type="button" variant="secondary" onClick={() => dispatch({ type: 'RESET_DEMO' })}>Restaurar dados demonstrativos</Button>
      <Button type="button" variant="ghost" onClick={() => { dispatch({ type: 'LOGOUT' }); navigate('/entrar') }}>Sair e trocar perfil</Button>
    </Screen>
  )
}
