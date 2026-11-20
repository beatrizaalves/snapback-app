import { Banner, Screen, SimNote } from '../../components/common/ui'
import { Switch } from '../../components/forms/Switch'
import { useApp } from '../../hooks/useApp'

export function Settings() {
  const { state, dispatch } = useApp()
  const { a11y } = state
  const patch = (partial: Partial<typeof a11y>) => dispatch({ type: 'PATCH_A11Y', patch: partial })

  return (
    <Screen title="Acessibilidade" lede="As opções abaixo mudam o aplicativo neste navegador e continuam salvas." backTo="/perfil">
      <Switch label="Letras grandes" checked={a11y.largeText} onChange={(largeText) => patch({ largeText })} />
      <Switch label="Alto contraste" checked={a11y.highContrast} onChange={(highContrast) => patch({ highContrast })} />
      <Switch label="Leitura de textos em voz alta" checked={a11y.readAloud} onChange={(readAloud) => patch({ readAloud })} hint="Mostra o botão Ouvir nas telas do paciente." />
      <Switch label="Modo simples" checked={a11y.simpleMode} onChange={(simpleMode) => patch({ simpleMode })} hint="Esconde textos secundários marcados para o modo simples." />
      <div className="card">
        <h2>Tamanho da fonte</h2>
        <div className="filters">
          {[1, 1.15, 1.3].map((scale) => (
            <button key={scale} type="button" className={a11y.fontScale === scale ? 'on' : ''} onClick={() => patch({ fontScale: scale })}>
              {scale === 1 ? 'Padrão' : scale === 1.15 ? 'Maior' : 'Máximo'}
            </button>
          ))}
        </div>
        <p style={{ fontSize: `${18 * a11y.fontScale}px` }}>Prévia: caminhe melhor, todos os dias.</p>
      </div>
      <Switch label="Alertas por vibração" checked={a11y.vibrationAlerts} onChange={(vibrationAlerts) => patch({ vibrationAlerts })} />
      <Switch label="Alertas por notificação" checked={a11y.notificationAlerts} onChange={(notificationAlerts) => patch({ notificationAlerts })} hint="A notificação aparece dentro do aplicativo." />
      <Switch label="Apple Saúde e Health Connect" checked={a11y.healthConnect} onChange={(healthConnect) => patch({ healthConnect })} />
      {a11y.healthConnect && (
        <Banner title="Integração simulada">Nenhum passo foi enviado à Apple Saúde nem ao Health Connect.</Banner>
      )}
      <SimNote>Vibração depende do navegador. Em computadores, o aviso visual continua valendo.</SimNote>
    </Screen>
  )
}
