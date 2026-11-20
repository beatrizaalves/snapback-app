import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BodyMap } from '../../components/charts/Maps'
import { Button, Screen } from '../../components/common/ui'
import { useApp } from '../../hooks/useApp'

export function PainMap() {
  const { dispatch } = useApp()
  const navigate = useNavigate()
  const [regions, setRegions] = useState<string[]>([])

  function toggle(region: string) {
    setRegions((current) => current.includes(region) ? current.filter((item) => item !== region) : [...current, region])
  }

  function go(next: string[]) {
    dispatch({ type: 'SET_REGIONS', regions: next })
    navigate('/avaliacao')
  }

  return (
    <Screen title="Onde dói" lede="Toque nas regiões. Pode marcar mais de uma. Se não houver dor, siga sem marcar.">
      <BodyMap selected={regions} onToggle={toggle} />
      <div className="card">
        <h2>Regiões escolhidas</h2>
        {regions.length === 0 && <p>Nenhuma região marcada.</p>}
        <div className="body-regions">
          {regions.map((region) => (
            <button key={region} type="button" className="chip chip-on" onClick={() => toggle(region)}>
              {region} — remover
            </button>
          ))}
        </div>
      </div>
      <Button type="button" variant="secondary" onClick={() => go([])}>Não sinto dor</Button>
      <Button type="button" onClick={() => go(regions)}>Salvar e continuar</Button>
    </Screen>
  )
}
