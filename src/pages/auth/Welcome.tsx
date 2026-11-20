import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoeIllustration } from '../../components/brand/Logo'
import { Button } from '../../components/common/ui'

const PAGES = [
  {
    title: 'Caminhe melhor, todos os dias',
    text: 'A palmilha PalmAlign acompanha o apoio dos pés e ajuda você a corrigir a pisada com calma.',
  },
  {
    title: 'Um passo de cada vez',
    text: 'O aplicativo mostra equilíbrio, pressão e um plano simples de exercícios, no seu ritmo.',
  },
  {
    title: 'Você decide quem acompanha',
    text: 'O fisioterapeuta só vê seus dados se você autorizar. Dá para cancelar esse acesso quando quiser.',
  },
]

export function Welcome() {
  const [page, setPage] = useState(0)
  const current = PAGES[page]
  return (
    <section className="screen">
      <ShoeIllustration />
      <h1>{current.title}</h1>
      <p>{current.text}</p>
      <div className="dots" aria-label={`Página ${page + 1} de 3`}>
        {PAGES.map((item, index) => (
          <i key={item.title} className={index === page ? 'on' : ''} />
        ))}
      </div>
      {page < 2 && (
        <Button type="button" onClick={() => setPage((value) => value + 1)}>
          Continuar lendo
        </Button>
      )}
      <Link className="btn btn-primary" to="/cadastro">Criar minha conta</Link>
      <Link className="btn btn-secondary" to="/entrar">Já tenho conta</Link>
      <Link className="text-link" to="/suporte">Preciso de ajuda</Link>
    </section>
  )
}
