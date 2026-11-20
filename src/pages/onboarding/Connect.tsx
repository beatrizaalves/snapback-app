import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PairIllustration } from '../../components/brand/Logo'
import { Button, Screen, SimNote } from '../../components/common/ui'
import { Modal } from '../../components/modals/Modal'

export function Connect() {
  const [help, setHelp] = useState(false)
  return (
    <Screen title="Conectar palmilha" lede="Passo 1 de 3. Ligue as duas palmilhas antes de seguir.">
      <PairIllustration />
      <ol>
        <li>Pressione o botão de cada palmilha por dois segundos.</li>
        <li>A luz azul indica que ela está pronta para o pareamento.</li>
        <li>Mantenha o par perto do celular.</li>
      </ol>
      <SimNote>O Bluetooth deste computador não será usado. A busca seguinte é uma simulação.</SimNote>
      <Link className="btn btn-primary" to="/parear/buscando">Procurar palmilhas</Link>
      <Button type="button" variant="secondary" onClick={() => setHelp(true)}>Ver vídeo de ajuda</Button>
      <Modal open={help} title="Como ligar a PalmAlign" onClose={() => setHelp(false)}>
        <p>Não há um arquivo de vídeo nesta versão. Os passos ficam disponíveis mesmo sem internet.</p>
        <ol>
          <li>A palmilha esquerda tem a marca E.</li>
          <li>A palmilha direita tem a marca D.</li>
          <li>Se a luz não acender, coloque o par para carregar.</li>
        </ol>
        <Button type="button" onClick={() => setHelp(false)}>Entendi</Button>
      </Modal>
    </Screen>
  )
}
