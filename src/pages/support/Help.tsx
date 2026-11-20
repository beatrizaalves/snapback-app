import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Banner, Button, Screen, SimNote } from '../../components/common/ui'
import { TextArea } from '../../components/forms/Field'
import { FAQ, HELP_GUIDES } from '../../data/seed'
import { useApp } from '../../hooks/useApp'
import { formatDateTime } from '../../utils/format'

export function Help() {
  const { state, dispatch } = useApp()
  const [openGuide, setOpenGuide] = useState<string | null>(HELP_GUIDES[0].id)
  const [faq, setFaq] = useState<number | null>(0)
  const [chatText, setChatText] = useState('')
  const [stars, setStars] = useState(state.rating.stars)
  const [comment, setComment] = useState(state.rating.comment)
  const [tech, setTech] = useState(false)

  return (
    <Screen title="Ajuda e suporte" lede="Os guias funcionam sem internet. O chat não chega a um atendente.">
      {HELP_GUIDES.map((guide) => (
        <article key={guide.id} className="card">
          <button type="button" className="text-link" onClick={() => setOpenGuide(openGuide === guide.id ? null : guide.id)}>{guide.title}</button>
          {openGuide === guide.id && <ol>{guide.steps.map((step) => <li key={step}>{step}</li>)}</ol>}
        </article>
      ))}
      <h2>Perguntas frequentes</h2>
      {FAQ.map((item, index) => (
        <div key={item.q}>
          <button type="button" className="faq-q" aria-expanded={faq === index} onClick={() => setFaq(faq === index ? null : index)}>{item.q}</button>
          {faq === index && <p className="card">{item.a}</p>}
        </div>
      ))}
      <article className="card stack">
        <h2>Chat</h2>
        {state.chat.map((message, index) => (
          <p key={`${message.from}-${index}`}><strong>{message.from === 'user' ? 'Você' : 'Sistema'}: </strong>{message.text}</p>
        ))}
        <TextArea label="Mensagem" value={chatText} onChange={(event) => setChatText(event.target.value)} />
        <Button type="button" onClick={() => { if (chatText.trim()) { dispatch({ type: 'ADD_CHAT', text: chatText.trim() }); setChatText('') } }}>Enviar mensagem</Button>
      </article>
      <div className="stack">
        <a className="btn btn-secondary" href="mailto:suporte@snapback.demo">E-mail de demonstração</a>
        <a className="btn btn-secondary" href="tel:08000000000">Telefone de demonstração</a>
      </div>
      <Button
        type="button"
        variant="secondary"
        onClick={() => {
          setTech(true)
          dispatch({ type: 'ADD_TICKET', topic: 'Dados técnicos da palmilha simulada' })
        }}
      >
        Enviar dados técnicos
      </Button>
      {tech && <Banner tone="ok" title="Dados técnicos registrados só neste navegador">Versão {state.insoles.firmwareCurrent}. Baterias {state.insoles.left.battery}% e {state.insoles.right.battery}%.</Banner>}
      <h2>Histórico</h2>
      {state.supportTickets.map((ticket) => (
        <article key={ticket.id} className="card">
          <p>{formatDateTime(ticket.date)}</p>
          <p>{ticket.topic}</p>
          <p>{ticket.status}</p>
        </article>
      ))}
      <article className="card stack">
        <h2>Avaliar o aplicativo</h2>
        <div className="star-row" role="group" aria-label="Nota de 1 a 5">
          {[1, 2, 3, 4, 5].map((value) => (
            <button key={value} type="button" className={stars >= value ? 'on' : ''} aria-label={`${value} estrelas`} onClick={() => setStars(value)}>{value}</button>
          ))}
        </div>
        <TextArea label="Comentário" value={comment} onChange={(event) => setComment(event.target.value)} />
        <Button type="button" disabled={stars < 1 || state.rating.sent} onClick={() => dispatch({ type: 'SET_RATING', stars, comment })}>
          {state.rating.sent ? 'Avaliação enviada' : 'Enviar avaliação'}
        </Button>
        {state.rating.sent && <Banner tone="ok" title="Obrigado">A nota ficou salva neste navegador. Não foi para um servidor.</Banner>}
      </article>
      <SimNote>E-mail e telefone são endereços de demonstração.</SimNote>
      <Link className="text-link" to="/inicio">Voltar ao início, se você já entrou</Link>
    </Screen>
  )
}
