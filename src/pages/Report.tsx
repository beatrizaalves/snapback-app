import { useState } from 'react'
import { Mail, MessageCircle } from 'lucide-react'
import { Button, Screen, SimNote } from '../../components/common/ui'
import { Switch } from '../../components/forms/Switch'
import { downloadReport, reportPlainText, type ReportSections } from '../../services/pdf'
import { useApp } from '../../hooks/useApp'
import { formatDateTime, gaitLabel } from '../../utils/format'

export function Report() {
  const { state } = useApp()
  const [period, setPeriod] = useState('30 dias')
  const [sections, setSections] = useState<ReportSections>({
    indicators: true,
    charts: true,
    pain: true,
    pressure: true,
  })

  function share(channel: 'whatsapp' | 'email') {
    const text = reportPlainText(state, sections)
    if (channel === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer')
      return
    }
    window.location.href = `mailto:?subject=${encodeURIComponent('Relatório SnapBack')}&body=${encodeURIComponent(text)}`
  }

  return (
    <Screen title="Relatório" lede="Escolha o que entra no PDF. O arquivo é gerado neste navegador." backTo="/perfil">
      <div className="filters">
        {['7 dias', '30 dias', 'Desde o início'].map((item) => (
          <button key={item} type="button" className={period === item ? 'on' : ''} onClick={() => setPeriod(item)}>{item}</button>
        ))}
      </div>
      <article className="a4" aria-label="Prévia em formato de página">
        <h2>SnapBack</h2>
        <p>{state.profile.name} · {state.profile.age} anos · {state.profile.city}</p>
        <p>Período: {period}</p>
        <p>Gerado em {formatDateTime(new Date().toISOString())}</p>
        {sections.indicators && <p>Pisada {gaitLabel(state.assessment.gait)}. Equilíbrio {state.assessment.balance}/100. Peso E {state.assessment.weightLeft}% / D {state.assessment.weightRight}%.</p>}
        {sections.charts && <p>Evolução: da linha de base {state.assessment.baselineBalance} para {state.assessment.balance}.</p>}
        {sections.pain && <p>Dor mais recente: {state.pain[0] ? `${state.pain[0].intensity}/10` : 'sem registro'}.</p>}
        {sections.pressure && <p>Pressão: sobrecarga no arco e no antepé esquerdos.</p>}
      </article>
      <Switch label="Indicadores" checked={sections.indicators} onChange={(indicators) => setSections({ ...sections, indicators })} />
      <Switch label="Gráficos de evolução" checked={sections.charts} onChange={(charts) => setSections({ ...sections, charts })} />
      <Switch label="Registro de dor" checked={sections.pain} onChange={(pain) => setSections({ ...sections, pain })} />
      <Switch label="Mapa de pressão" checked={sections.pressure} onChange={(pressure) => setSections({ ...sections, pressure })} />
      <Button type="button" onClick={() => downloadReport(state, sections)}>Baixar PDF</Button>
      <Button type="button" variant="secondary" icon={<MessageCircle aria-hidden="true" />} onClick={() => share('whatsapp')}>WhatsApp</Button>
      <Button type="button" variant="secondary" icon={<Mail aria-hidden="true" />} onClick={() => share('email')}>E-mail</Button>
      <SimNote>WhatsApp e e-mail abrem o aplicativo do celular com o texto. Nada é enviado sozinho.</SimNote>
    </Screen>
  )
}
