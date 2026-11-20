import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Screen } from '../../components/common/ui'
import { Stepper } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'

export function ProfileSetup() {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const [age, setAge] = useState(state.profile.age)
  const [weight, setWeight] = useState(state.profile.weight)
  const [height, setHeight] = useState(state.profile.height)
  const [foot, setFoot] = useState(state.profile.footSize)
  const [error, setError] = useState('')

  function save() {
    if (age < 18 || weight < 35 || height < 140 || foot < 34) {
      setError('Confira idade, peso, altura e tamanho do pé. Os valores precisam estar na faixa indicada.')
      return
    }
    dispatch({ type: 'PATCH_PROFILE', patch: { age, weight, height, footSize: foot } })
    navigate('/mapa-dor')
  }

  return (
    <Screen title="Seu perfil" lede="Passo 3 de 3. Esses dados ajudam a ler a pisada. Não são uma medição médica.">
      <Stepper label="Idade" value={age} unit="anos" min={18} max={100} onChange={setAge} />
      <Stepper label="Peso" value={weight} unit="kg" min={35} max={200} onChange={setWeight} />
      <Stepper label="Altura" value={height} unit="cm" min={140} max={210} onChange={setHeight} />
      <Stepper label="Tamanho do pé" value={foot} unit="" min={34} max={46} onChange={setFoot} />
      {error && <p className="field-error">{error}</p>}
      <Button type="button" onClick={save}>Próximo</Button>
    </Screen>
  )
}
