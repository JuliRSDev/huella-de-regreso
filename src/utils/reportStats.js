import { findSpecies, findStatus } from '../constants/pets.js'

const DAY_MS = 24 * 60 * 60 * 1000

const toDate = (value) => {
  if (!value) return null
  const date = value?.toDate ? value.toDate() : new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

const countBy = (items, keyOf) => {
  const counts = new Map()
  for (const item of items) {
    const key = keyOf(item)
    counts.set(key, (counts.get(key) ?? 0) + 1)
  }
  return counts
}

const sortedEntries = (counts) =>
  Array.from(counts, ([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))

const monthKey = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

/**
 * Turns the stored reports into the figures shown on the statistics page.
 * Reunion time is measured from publication to the moment the owner marked the report as reunited.
 */
export function computeReportStats(reports, { months = 6, now = new Date() } = {}) {
  const total = reports.length
  const statusOf = (r) => findStatus(r.estado)?.value ?? 'otro'

  const byStatus = { perdida: 0, encontrada: 0, reencontrada: 0 }
  for (const [key, count] of countBy(reports, statusOf)) {
    if (key in byStatus) byStatus[key] = count
  }

  const bySpecies = sortedEntries(countBy(reports, (r) => findSpecies(r.especie)?.label ?? 'Sin especificar'))
  const byCity = sortedEntries(countBy(reports.filter((r) => r.city), (r) => r.city)).slice(0, 8)

  const reunionDays = reports
    .filter((r) => statusOf(r) === 'reencontrada')
    .map((r) => {
      const created = toDate(r.createdAt)
      const reunited = toDate(r.reunitedAt)
      return created && reunited ? (reunited - created) / DAY_MS : null
    })
    .filter((days) => days !== null && days >= 0)

  const avgDaysToReunion = reunionDays.length
    ? Math.round((reunionDays.reduce((a, b) => a + b, 0) / reunionDays.length) * 10) / 10
    : null

  const monthCounts = countBy(reports.map((r) => toDate(r.createdAt)).filter(Boolean), monthKey)
  const byMonth = Array.from({ length: months }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (months - 1 - i), 1)
    const key = monthKey(date)
    return { key, label: date.toLocaleDateString('es-CO', { month: 'short', year: '2-digit' }), count: monthCounts.get(key) ?? 0 }
  })

  return {
    total,
    byStatus,
    bySpecies,
    byCity,
    byMonth,
    reunionRate: total ? Math.round((byStatus.reencontrada / total) * 100) : 0,
    avgDaysToReunion,
  }
}
