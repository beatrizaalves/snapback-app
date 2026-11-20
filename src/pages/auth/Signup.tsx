import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Button, Screen } from '../../components/common/ui'
import { Field } from '../../components/forms/Field'
import { useApp } from '../../hooks/useApp'

export function Signup() {
  const { dispatch } = useApp()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'email' | 'phone'>('email')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function submit() {
    const next: Record<string, string> = {}
    if (name.trim().length < 3) next.name = 'Informe o nome completo.'
    if (mode === 'email' && !email.includes('@')) next.email = 'Informe um e-mail válido.'
    if (mode === 'phone' && phone.replace(/\D/g, '').length < 10) next.phone = 'Informe o telefone com DDD.'
    if (password.length < 8) next.password = 'A senha precisa ter pelo menos 8 caracteres.'
    if (password !== confirm) next.confirm = 'A confirmação precisa ser igual à senha.'
    setErrors(next)
    if (Object.keys(next).length) return
    dispatch({
      type: 'SIGNUP',
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    })
    navigate('/verificar')
  }

  return (
    <Screen title="Criar conta" lede="Leva poucos minutos. A senha fica só neste aparelho." backTo="/boas-vindas">
      <div className="seg" role="group" aria-label="Forma de cadastro">
        <button type="button" className={mode === 'email' ? 'on' : ''} onClick={() => setMode('email')}>E-mail</button>
        <button type="button" className={mode === 'phone' ? 'on' : ''} onClick={() => setMode('phone')}>Telefone</button>
      </div>
      <Field label="Nome completo" value={name} onChange={(event) => setName(event.target.value)} error={errors.name} autoComplete="name" />
      {mode === 'email' ? (
        <Field label="E-mail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} error={errors.email} autoComplete="email" />
      ) : (
        <Field label="Telefone" inputMode="tel" value={phone} onChange={(event) => setPhone(event.target.value)} error={errors.phone} autoComplete="tel" />
      )}
      <Field
        label="Senha"
        type={show ? 'text' : 'password'}
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={errors.password}
        hint="Mínimo de oito caracteres."
        autoComplete="new-password"
      />
      <button type="button" className="text-link" onClick={() => setShow((value) => !value)}>
        {show ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
        {show ? 'Ocultar senha' : 'Mostrar senha'}
      </button>
      <Field
        label="Confirmação de senha"
        type={show ? 'text' : 'password'}
        value={confirm}
        onChange={(event) => setConfirm(event.target.value)}
        error={errors.confirm}
        autoComplete="new-password"
      />
      <Button type="button" onClick={submit}>Continuar</Button>
    </Screen>
  )
}
