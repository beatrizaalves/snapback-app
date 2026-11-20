import { jsPDF } from 'jspdf'
import type { AppState } from '../types'
import { formatDateTime, gaitLabel } from '../utils/format'

export interface ReportSections {
  indicators: boolean
  charts: boolean
  pain: boolean
  pressure: boolean
}

export function reportPlainText(state: AppState, sections: ReportSections) {
  const lines = [
    'SnapBack — relatório para o profissional',
    `Paciente: ${state.profile.name}, ${state.profile.age} anos`,
    `Cidade: ${state.profile.city}`,
    `Gerado em: ${formatDateTime(new Date().toISOString())}`,
    'Documento de demonstração. Não é um laudo clínico.',
    '',
  ]
  if (sections.indicators) {
    lines.push(
      `Tipo de pisada: ${gaitLabel(state.assessment.gait)}`,
      `Equilíbrio inicial: ${state.assessment.baselineBalance}/100`,
      `Equilíbrio atual: ${state.assessment.balance}/100`,
      `Distribuição de peso: esquerdo ${state.assessment.weightLeft}% / direito ${state.assessment.weightRight}%`,
      `Uso hoje: ${state.usageLabel}. Passos: ${state.stepsToday}.`,
      `Plano: semana ${state.plan.week} de ${state.plan.totalWeeks}.`,
      '',
    )
  }
  if (sections.charts) {
    lines.push(
      'Evolução: o equilíbrio subiu da linha de base da avaliação inicial para o valor atual.',
      `Meta de equilíbrio: ${state.plan.balanceGoal}/100.`,
      '',
    )
  }
  if (sections.pain) {
    lines.push('Registro de dor:')
    state.pain.forEach((entry) => {
      lines.push(
        `- ${formatDateTime(entry.date)}: ${entry.intensity}/10. Regiões: ${entry.regions.join(', ') || 'não informadas'}. ${entry.note}`,
      )
    })
    lines.push('')
  }
  if (sections.pressure) {
    lines.push(
      'Mapa de pressão: sobrecarga no arco e no antepé esquerdos, compatível com a pisada pronada.',
      '',
    )
  }
  return lines.join('\n')
}

export function downloadReport(state: AppState, sections: ReportSections) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  doc.setTextColor(31, 106, 180)
  doc.setFontSize(18)
  doc.text('SnapBack', 15, 18)
  doc.setTextColor(77, 79, 80)
  doc.setFontSize(12)
  const body = reportPlainText(state, sections)
  const lines = doc.splitTextToSize(body, 180)
  doc.text(lines, 15, 28)
  doc.save('snapback-relatorio-maria.pdf')
}

export function downloadUserData(state: AppState) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'snapback-meus-dados.json'
  link.click()
  URL.revokeObjectURL(url)
}
