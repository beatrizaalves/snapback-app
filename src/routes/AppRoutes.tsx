import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'
import { ClinicLayout } from '../layouts/ClinicLayout'
import { PatientLayout } from '../layouts/PatientLayout'
import { PhysiotherapistLayout } from '../layouts/PhysiotherapistLayout'
import { Consent } from '../pages/auth/Consent'
import { Locked } from '../pages/auth/Locked'
import { Login } from '../pages/auth/Login'
import { Signup } from '../pages/auth/Signup'
import { Splash } from '../pages/auth/Splash'
import { Verify } from '../pages/auth/Verify'
import { Welcome } from '../pages/auth/Welcome'
import { Evolution } from '../pages/analysis/Evolution'
import { Gait } from '../pages/analysis/Gait'
import { GaitAlert } from '../pages/analysis/GaitAlert'
import { PainLog } from '../pages/analysis/PainLog'
import { Pressure } from '../pages/analysis/Pressure'
import { Stimuli } from '../pages/analysis/Stimuli'
import { ClinicHome } from '../pages/clinic/ClinicHome'
import { Professionals } from '../pages/clinic/Professionals'
import { Reports } from '../pages/clinic/Reports'
import { Home } from '../pages/dashboard/Home'
import { Firmware } from '../pages/insole/Firmware'
import { Insole } from '../pages/insole/Insole'
import { Assessment } from '../pages/onboarding/Assessment'
import { Connect } from '../pages/onboarding/Connect'
import { PainMap } from '../pages/onboarding/PainMap'
import { ProfileSetup } from '../pages/onboarding/ProfileSetup'
import { Result } from '../pages/onboarding/Result'
import { Scanning } from '../pages/onboarding/Scanning'
import { Privacy } from '../pages/profile/Privacy'
import { ProfileHub } from '../pages/profile/ProfileHub'
import { Settings } from '../pages/profile/Settings'
import { PhysioAlerts } from '../pages/physiotherapist/Alerts'
import { PhysioPatient } from '../pages/physiotherapist/PatientDetail'
import { PhysioPatients } from '../pages/physiotherapist/Patients'
import { PhysioProfile } from '../pages/physiotherapist/Profile'
import { Contacts } from '../pages/support/Contacts'
import { FallAlert } from '../pages/support/FallAlert'
import { Help } from '../pages/support/Help'
import { MyPhysio } from '../pages/support/MyPhysio'
import { Achievements } from '../pages/treatment/Achievements'
import { ExerciseDetail } from '../pages/treatment/ExerciseDetail'
import { Exercises } from '../pages/treatment/Exercises'
import { Plan } from '../pages/treatment/Plan'
import { Reminders } from '../pages/treatment/Reminders'
import { Report } from '../pages/treatment/Report'
import { Workout } from '../pages/treatment/Workout'
import { WorkoutSummary } from '../pages/treatment/WorkoutSummary'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Splash />} />
        <Route path="/boas-vindas" element={<Welcome />} />
        <Route path="/cadastro" element={<Signup />} />
        <Route path="/verificar" element={<Verify />} />
        <Route path="/consentimento" element={<Consent />} />
        <Route path="/entrar" element={<Login />} />
        <Route path="/bloqueado" element={<Locked />} />
        <Route path="/sessao-encerrada" element={<Locked variant="session" />} />
        <Route path="/parear" element={<Connect />} />
        <Route path="/parear/buscando" element={<Scanning />} />
        <Route path="/perfil-inicial" element={<ProfileSetup />} />
        <Route path="/mapa-dor" element={<PainMap />} />
        <Route path="/avaliacao" element={<Assessment />} />
        <Route path="/avaliacao/resultado" element={<Result />} />
        <Route path="/alerta-queda" element={<FallAlert />} />
        <Route path="/suporte" element={<Help />} />
      </Route>

      <Route element={<PatientLayout />}>
        <Route path="/inicio" element={<Home />} />
        <Route path="/analise" element={<Pressure />} />
        <Route path="/analise/pisada" element={<Gait />} />
        <Route path="/estimulos" element={<Stimuli />} />
        <Route path="/alerta-pisada" element={<GaitAlert />} />
        <Route path="/evolucao" element={<Evolution />} />
        <Route path="/dor" element={<PainLog />} />
        <Route path="/configuracoes" element={<Settings />} />
        <Route path="/perfil" element={<ProfileHub />} />
        <Route path="/plano" element={<Plan />} />
        <Route path="/exercicios" element={<Exercises />} />
        <Route path="/exercicios/:id" element={<ExerciseDetail />} />
        <Route path="/lembretes" element={<Reminders />} />
        <Route path="/conquistas" element={<Achievements />} />
        <Route path="/treino" element={<Workout />} />
        <Route path="/treino/resumo" element={<WorkoutSummary />} />
        <Route path="/relatorio" element={<Report />} />
        <Route path="/palmilha" element={<Insole />} />
        <Route path="/palmilha/atualizacao" element={<Firmware />} />
        <Route path="/privacidade" element={<Privacy />} />
        <Route path="/contatos" element={<Contacts />} />
        <Route path="/fisioterapeuta" element={<MyPhysio />} />
        <Route path="/ajuda" element={<Help />} />
      </Route>

      <Route element={<PhysiotherapistLayout />}>
        <Route path="/profissional" element={<PhysioPatients />} />
        <Route path="/profissional/pacientes/:id" element={<PhysioPatient />} />
        <Route path="/profissional/alertas" element={<PhysioAlerts />} />
        <Route path="/profissional/perfil" element={<PhysioProfile />} />
      </Route>

      <Route element={<ClinicLayout />}>
        <Route path="/clinica" element={<ClinicHome />} />
        <Route path="/clinica/profissionais" element={<Professionals />} />
        <Route path="/clinica/relatorios" element={<Reports />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
