import { Volume2 } from 'lucide-react'
import { GAIT_COPY } from '../../data/seed'
import { Banner, Button, Screen } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'
import { speak } from '../../services/speech'
import { gaitLabel } from '../../utils/format'

const ORDER = ['neutra', 'pronada', 'supinada'] as const

export function Gait() {
  const { state } = useApp()
  const current = state.assessment.gait
  const text = `${GAIT_COPY[current].title}. ${GAIT_COPY[current].text} ${GAIT_COPY[current].effect} A PalmAlign avisa quando o peso fica tempo demais de um lado e o plano treina o apoio.`

  return (
    <Screen title="Meu tipo de pisada" lede="A avaliação inicial marcou este padrão. Ele continua salvo como linha de base." backTo="/analise">
      <Banner tone="info" title={`Identificado: ${gaitLabel(current)}`}>{GAIT_COPY[current].text}</Banner>
      {ORDER.map((key) => (
        <article key={key} className="card" style={{ outline: key === current ? '3px solid #596AB6' : undefined }}>
          <h2>{GAIT_COPY[key].title}</h2>
          <p>{GAIT_COPY[key].text}</p>
          <p>{GAIT_COPY[key].effect}</p>
          {key === current && <strong>Este é o seu tipo na demonstração.</strong>}
        </article>
      ))}
      <article className="card">
        <h2>Como a PalmAlign ajuda</h2>
        <p>Ela mostra o apoio e pode vibrar, dentro do limite do fisioterapeuta, para lembrar de distribuir o peso.</p>
      </article>
      <Button type="button" icon={<Volume2 aria-hidden="true" />} onClick={() => { if (!speak(text)) window.alert('A leitura em voz alta não está disponível neste navegador.') }}>
        Ouvir explicação
      </Button>
    </Screen>
  )
}
