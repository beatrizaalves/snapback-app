import { useState } from 'react'
import { Award, Lock } from 'lucide-react'
import { Button, Screen } from '../../components/common/ui'
import { Modal } from '../../components/modals/Modal'
import { useApp } from '../../hooks/useApp'
import { achievements } from '../../utils/rules'

export function Achievements() {
  const { state, dispatch } = useApp()
  const items = achievements(state)
  const fresh = items.find((item) => item.unlocked && !state.seenAchievements.includes(item.id))
  const [shareNote, setShareNote] = useState('')

  async function share(title: string) {
    const text = `Conquista no SnapBack: ${title}. Demonstração da persona Maria Aparecida.`
    try {
      if (navigator.share) {
        await navigator.share({ title: 'SnapBack', text })
        return
      }
      await navigator.clipboard.writeText(text)
      setShareNote('Texto copiado. O compartilhamento do sistema não está disponível aqui.')
    } catch {
      setShareNote('Não foi possível compartilhar neste navegador.')
    }
  }

  return (
    <Screen title="Conquistas" lede={`Sequência atual: ${state.streak} dias de uso na demonstração.`} backTo="/perfil">
      <div className="grid-2">
        {items.map((item) => (
          <article key={item.id} className={`medal ${item.unlocked ? '' : 'locked'}`}>
            {item.unlocked ? <Award aria-hidden="true" color="#1F6AB4" /> : <Lock aria-hidden="true" />}
            <strong>{item.title}</strong>
            <span>{item.unlocked ? 'Desbloqueada' : 'Bloqueada'}</span>
          </article>
        ))}
      </div>
      {shareNote && <p>{shareNote}</p>}
      <Modal open={Boolean(fresh)} title="Nova conquista" onClose={() => fresh && dispatch({ type: 'SEE_ACHIEVEMENT', id: fresh.id })}>
        {fresh && (
          <>
            <p>{fresh.title}. {fresh.detail}</p>
            <Button type="button" onClick={() => share(fresh.title)}>Compartilhar</Button>
            <Button type="button" variant="secondary" onClick={() => dispatch({ type: 'SEE_ACHIEVEMENT', id: fresh.id })}>Fechar</Button>
          </>
        )}
      </Modal>
    </Screen>
  )
}
